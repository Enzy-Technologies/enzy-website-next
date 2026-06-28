/**
 * Ad-attribution capture for the paid funnel.
 * --------------------------------------------
 * Stamps every inbound ad click's identity onto the visitor so it can be carried
 * into HubSpot at form submit (and, later, fed back to Meta via the Conversions
 * API). Pairs with the Meta-side dynamic URL parameters set at the ad level:
 *
 *   utm_source / utm_medium / utm_campaign / utm_content / utm_term
 *   campaign_id / adset_id / ad_id        ← stable join keys to the Meta Insights API
 *   fbclid                                 ← Meta appends this automatically on click
 *
 * The IDs (not the names) are what the dashboard joins on — names change and
 * break joins, so `adset_id` is the real key for slicing the funnel by ad set.
 *
 * Why cookie + localStorage, first- AND last-touch:
 *  - The demo form is usually on a DIFFERENT page than the ad-landing page, so we
 *    can't rely on the query string still being present at submit. We persist the
 *    params and read them back wherever the form lives.
 *  - last-touch = the converting touch (overwrites). first-touch = the original
 *    acquiring touch (write-once). The dashboard reports both.
 *  - The cookie copy is what a future server/edge worker (CAPI, identity stitch)
 *    can read; localStorage is the durable client copy.
 *
 * Dependency-free on purpose so it can also be imported from the Edge runtime.
 */

/** The params we capture, in HubSpot-property-name form. */
export const AD_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "campaign_id",
  "adset_id",
  "ad_id",
  "fbclid",
] as const;

export type AdParamKey = (typeof AD_PARAM_KEYS)[number];
export type AdParams = Partial<Record<AdParamKey, string>>;

/**
 * Where each canonical field can be sourced from in the URL, in priority order.
 * Our ads already carry the IDs — just under HubSpot Ads (`hsa_*`) and Hyros
 * (`fbc_id`/`h_ad_id`) names rather than clean ones — so we alias them onto our
 * own property names. First present, non-macro value wins:
 *   1. our clean macro name (if the media buyer adds {{campaign.id}} etc.)
 *   2. HubSpot Ads auto-appended param (hsa_cam / hsa_grp / hsa_ad, utm_id)
 *   3. Hyros macro param (fbc_id = {{adset.id}}, h_ad_id = {{ad.id}})
 * This means NO ad-side changes are required to capture the join keys.
 */
const PARAM_SOURCES: Record<AdParamKey, readonly string[]> = {
  utm_source: ["utm_source"],
  utm_medium: ["utm_medium"],
  utm_campaign: ["utm_campaign"],
  utm_content: ["utm_content"], // ad set NAME — optional; names come from the Meta API join
  utm_term: ["utm_term"], //       ad NAME — optional; same
  campaign_id: ["campaign_id", "utm_id", "hsa_cam"],
  adset_id: ["adset_id", "hsa_grp", "fbc_id"],
  ad_id: ["ad_id", "hsa_ad", "h_ad_id"],
  fbclid: ["fbclid"],
};

/** Stored shape: the params plus the capture time (ms) for later fbc rebuild. */
type StoredAttr = { p: AdParams; t: number };

const LAST_TOUCH_KEY = "enzy_attr_last";
const FIRST_TOUCH_KEY = "enzy_attr_first";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 90; // 90 days

/** First-touch fields land on `ft_`-prefixed HubSpot properties. */
const FIRST_TOUCH_PREFIX = "ft_";

function readUrlParams(): AdParams {
  if (typeof window === "undefined") return {};
  const out: AdParams = {};
  try {
    const sp = new URLSearchParams(window.location.search);
    for (const key of AD_PARAM_KEYS) {
      for (const src of PARAM_SOURCES[key]) {
        const v = sp.get(src);
        // Skip empties and unfilled macros ({{adset.id}} / [SITE_SOURCE_NAME]).
        if (v && v.trim() && !v.includes("{{") && !v.includes("[")) {
          out[key] = v.trim();
          break; // first source wins
        }
      }
    }
  } catch {
    /* malformed URL — nothing to capture */
  }
  return out;
}

function readStore(key: string): StoredAttr | null {
  if (typeof window === "undefined") return null;
  // Prefer localStorage (durable); fall back to the cookie copy.
  try {
    const ls = window.localStorage.getItem(key);
    if (ls) return JSON.parse(ls) as StoredAttr;
  } catch {
    /* storage blocked — fall through to cookie */
  }
  try {
    const match = document.cookie.match(
      new RegExp("(?:^|; )" + key + "=([^;]*)")
    );
    if (match) return JSON.parse(decodeURIComponent(match[1])) as StoredAttr;
  } catch {
    /* no cookie / parse error */
  }
  return null;
}

function writeStore(key: string, value: StoredAttr): void {
  if (typeof window === "undefined") return;
  const json = JSON.stringify(value);
  try {
    window.localStorage.setItem(key, json);
  } catch {
    /* storage blocked — cookie below is still set */
  }
  try {
    document.cookie =
      `${key}=${encodeURIComponent(json)}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax`;
  } catch {
    /* cookie write blocked */
  }
}

/**
 * Read ad params off the current URL and persist them. Idempotent and safe to
 * call on every page/route change — it only writes when params are present, so
 * organic navigations never clobber a stored touch.
 */
export function captureAdParams(): void {
  const captured = readUrlParams();
  if (Object.keys(captured).length === 0) return;

  const now = Date.now();

  // last-touch: merge captured over existing so a partial touch (e.g. fbclid
  // only) keeps the most recent value per key without wiping the rest.
  const prevLast = readStore(LAST_TOUCH_KEY);
  writeStore(LAST_TOUCH_KEY, { p: { ...prevLast?.p, ...captured }, t: now });

  // first-touch: write-once per key (existing values win), preserve original ts.
  const prevFirst = readStore(FIRST_TOUCH_KEY);
  writeStore(FIRST_TOUCH_KEY, {
    p: { ...captured, ...prevFirst?.p },
    t: prevFirst?.t ?? now,
  });
}

/** Raw stored params for a touch (used by the future CAPI / stitch layer). */
export function getAdParams(which: "first" | "last"): StoredAttr | null {
  return readStore(which === "first" ? FIRST_TOUCH_KEY : LAST_TOUCH_KEY);
}

/**
 * Flatten stored attribution into HubSpot hidden-field values: last-touch on the
 * primary property names, first-touch on `ft_`-prefixed names. Keys for touches
 * we never captured are simply omitted (so they don't overwrite anything).
 */
export function getHiddenFieldsForForm(): Record<string, string> {
  const fields: Record<string, string> = {};
  const last = readStore(LAST_TOUCH_KEY)?.p;
  const first = readStore(FIRST_TOUCH_KEY)?.p;
  if (last) for (const k of AD_PARAM_KEYS) if (last[k]) fields[k] = last[k]!;
  if (first)
    for (const k of AD_PARAM_KEYS)
      if (first[k]) fields[`${FIRST_TOUCH_PREFIX}${k}`] = first[k]!;
  return fields;
}
