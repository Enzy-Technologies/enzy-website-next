# Enzy Full-Funnel Dashboard — Build Plan

**Status as of 2026-06-29.** Goal: a custom dashboard tracking the funnel end-to-end, **page view → Closed Won ARR**, for two inbound entry points tracked separately — plus **replacing Hyros** with a self-built attribution stack.

---

## 1. Goal & scope

- **End-to-end funnel:** impression → page view → form → demo → opportunity → Closed Won → ARR + pipeline.
- **Two entry points, tracked separately:**
  - `/lp/meta` — primarily paid Meta traffic
  - main Book-a-Demo page — primarily organic, sometimes paid
- **Replace Hyros** — reproduce its one real job (feeding high-quality conversions to Meta) with our own Meta Conversions API (CAPI) pipeline + first-party identity layer. (Validation in §9 shows this is safe.)
- **Free / low-maintenance path:** no paid connectors; hand-rolled syncs. Trade money for maintenance.

## 2. Funnel stages → source of truth

| # | Stage | Primary source | Cross-check |
|---|-------|---------------|-------------|
| 1 | Page views (per entry point) | GA4 | Vercel Web Analytics |
| 2 | Landing page variant | GA4 (`lp_variant`) | — |
| 3 | Hero video plays + % watched (variant B) | GA4 video events | — |
| 4 | Form starts | GA4 + HubSpot | — |
| 5 | Form submissions | **HubSpot** | GA4 |
| 6 | Demos booked | **HubSpot** (meetings) | — |
| 7 | Demo outcomes | **HubSpot** meeting object (`meeting outcome`) | — |
| 8 | Completed demo → opportunity | **HubSpot** | — |
| 9 | Closed Won / Lost | **HubSpot** | — |
| 10 | Revenue (ARR) | **HubSpot** deal `amount` | finance |
| 11 | Total pipeline | **HubSpot** | — |

**Split:** GA4 owns top-of-funnel behavior (1–4); HubSpot is system of record for 5–11; Meta = ad delivery only; the self-built CAPI replaces Hyros for the Meta feed.

## 3. Source priority (cleanest → supporting)

1. **HubSpot** — system of record, everything from form submit → ARR.
2. **Self-built CAPI + first-party capture** — attribution spine for paid (replaces Hyros).
3. **GA4** — top-of-funnel behavior; directional, not person-level.
4. **Vercel Web Analytics** — server-side pageview cross-check (ad-blocker resilient) + Core Web Vitals.
5. **Meta Ads** — spend & delivery only (spend, impressions, clicks, CTR, CPC/CPM, hook rate). Trust for *delivery*, never for *conversion attribution*.

## 4. What combines vs. stays separate

- **Spend (Meta) × attribution (our capture) × revenue (HubSpot)** join on **UTMs at campaign level** + **`adset_id`/`ad_id`** to compute CAC/ROAS. Never sum Meta conversions and HubSpot deals — double counting.
- **GA4 + Vercel** both do pageviews — GA4 primary for behavior, Vercel as the reconciliation number (report the gap, don't average).
- **Two entry points = one dimension, not two dashboards** — same model filtered by entry point so paid LP vs organic Book-a-Demo compare side by side.

## 5. Locked decisions

- **Revenue = ARR** (HubSpot deal `amount` holds ARR). Pipeline + Closed Won in ARR, deal counts alongside.
- **Attribution:** last-touch primary (defines the two entry points), first-touch + (during parallel run) Hyros as side-by-side cross-checks.
- **AE = deal owner; BDR = "business development representative" custom property on the deal** (both on deal object — one fetch).
- **Demo outcome** lives on the HubSpot **meeting/engagement object** (`meeting outcome`), not contact/deal → requires association stitching (meeting ↔ contact ↔ deal).
- **Slice by:** vertical/ICP, lead status (contact), deal stage (deal), lifecycle stage (company), demo outcome (meeting), AE/BDR (deal), ad set (`adset_id`), campaign, source/medium.
- **Dashboard is layered (one model, three views):** L1 Overview (exec/you), L2 Acquisition (marketing), L3 Pipeline (sales/RevOps).
- **Goals:** goal-vs-actual layer scaffolded in L1 but targets left null for now.
- **All free tooling, hand-rolled syncs.**

## 6. Architecture

```
  Meta Ads ──Insights API (cron)──┐
  (spend/impr/clicks/hook rate)    │
                                   │
  Your site ──/api/collect────────►│      BigQuery
  (visitor_id, utm, fbclid,        │   raw → staging → marts   ──► Next.js + Tremor
   ga_client_id, pageviews)        │   funnel_fact (the join)       dashboard (Vercel)
                                   │                                L1 / L2 / L3
  HubSpot ──CRM API (cron)────────►│
  (contacts/companies/deals/       │
   meetings/owners/associations)   │
                                   │
  GA4 ──native BQ export (free)────┘
       ▲
  HubSpot stage change ──► CAPI sender ──► Meta Conversions API   (replaces Hyros)
```

- **Warehouse: BigQuery.** Decisive reason — GA4 → BigQuery is a native, free export. Free tier (10GB storage / 1TB queries-per-month) is ample with a pre-aggregated marts layer.
- **Ingestion (hand-rolled, free):** GA4 native export (no code); HubSpot / Meta / our site events via Vercel Cron jobs hitting their APIs incrementally.
- **Modeling:** dbt Core or scheduled SQL views; `raw → staging → marts`; one wide **`funnel_fact`** keyed on the identity join, carrying every stage timestamp + every slice dimension + attributed spend.
- **Dashboard:** Next.js + **Tremor** on existing Vercel, querying pre-aggregated marts (never raw) to stay in the free tier.

## 7. First-party CDP (Hyros replacement, part 1 — capture & identity)

- **Server-set `visitor_id`** via Next.js middleware (HTTP `Set-Cookie` from the edge) — resists Safari ITP's 7-day cap on JS cookies; genuinely first-party (better than Hyros's blocked third-party cookie — see §9).
- **`/api/collect`** — client posts every pageview (`visitor_id`, url, referrer, utm_*, fbclid, ga_client_id, lp_variant, ts) → `raw.pageviews`. Durable click-stream.
- **Identity resolution:** at form submit `visitor_id → email → HubSpot contact`; look back across the visitor's sessions for earliest paid touch (first-touch) and last touch before submit (last-touch). Recovers same-browser "organic-looking return" deterministically; cross-device via hashed email backfill.

## 8. CAPI pipeline (Hyros replacement, part 2 — feed Meta)

A sender (Vercel Cron or HubSpot webhook → endpoint) fires server events to Meta's Conversions API on HubSpot state changes:

| Funnel event | Meta event | Payload |
|---|---|---|
| Form submit | `Lead` | `event_id` (dedupe vs Pixel), `fbc`, `fbp`, hashed email/phone |
| Demo booked | `Schedule` | hashed email, `fbc` |
| Demo completed | custom `DemoCompleted` | hashed email |
| Closed Won | `Purchase` | **`value` = ARR**, `currency=USD`, reconstructed `fbc` |

- **`fbc` reconstruction:** `fb.1.<click_ts_ms>.<fbclid>` — we store the original fbclid + capture timestamp (shipped, see §11), so we can attach the original click ID to a `Purchase` weeks later. That recovered, value-stamped conversion is the highest-value thing Hyros sends Meta.
- **Timing caveat (Meta constraint, not tooling):** `Lead`/`Schedule` fire fast → full optimization value; `Closed Won` lands later → feeds value-based lookalikes + measurement.
- **Send-gating — replicate Hyros's discipline (this is on us, not automatic).** Hyros only sends Meta its *tracked, attributed* conversion events, so the 90% of HubSpot-fed contacts (internal/test/bot pollution) never reach Meta. When we fire CAPI from HubSpot, that gate doesn't exist by default — we must build it: only fire for real, attributed, non-internal leads. Exclude `@enzy.co`/`@enzy.ai` and other internal/test emails, known office IPs, and unscored/spam submissions. (This exclusion list also keeps the dashboard funnel counts honest, independent of Meta.)

## 9. Hyros replacement — validation (decision evidence)

30-day API audit (1,706 leads, Jun 2026) showed Hyros, **as configured for this account**, recovers essentially no attribution we can't reproduce:

- **0%** of paid leads attributed **without** a tracked on-site session (135/1706 = 7.9% paid + `!clicked`; **0** paid-without-click).
- **90.3%** of leads have **no Hyros attribution** — they're just HubSpot-fed `!hubspot` contacts.
- Cross-device linking it does is **noisy IP/phone matching** (observed linking an employee + a test account + different people sharing an office IP).
- Config gaps that disable its edge: **no CNAME** (third-party cookie, browser-blocked on mobile Safari), **no ESP** (no email-link cross-device propagation), **email captured only at the demo form**.

**Conclusion:** every signal Hyros uses (on-site session, email, IP, phone, HubSpot data) is available to us; 90% of its leads come from HubSpot (our system of record) anyway. The feared "hard 10%" is ~0% unrecoverable here. **Safe to replace** — still run in parallel one cycle for empirical confirmation before cutting it.

> API access note: Hyros API base `https://api.hyros.com/v1`, auth header `API-Key`, leads at `/api/v1.0/leads?fromDate=&toDate=&pageSize=`. The bundled MCP connector (`plugin_hyros-attribution_hyros`) is misconfigured (404s on all paths incl. root) — needs its base URL + API-Key corrected, or pull via direct API call.

## 10. Data to ingest into BigQuery

| Source | Method | Objects / fields |
|---|---|---|
| GA4 | Native BQ export (free) | pageviews, video events (25/50/75/100%), form_start |
| Site CDP | `/api/collect` → BQ | sessions/pageviews keyed on `visitor_id` |
| HubSpot | CRM API, incremental | Contacts (lead status, ICP/vertical), Companies (lifecycle), Deals (stage, AE, BDR, ARR), Meetings (outcome), Owners, **association tables** |
| Meta | Insights API, daily, by `ad_id` | spend, impressions, clicks, CTR, CPC/CPM, 3-sec video views → hook rate, quartiles |
| Hyros | API (parallel-run only) | attribution for comparison during cutover |

## 11. Build sequence & status

| Phase | What | Status |
|---|---|---|
| **1** | First-party ad-param capture (utm_*, campaign/adset/ad ids, fbclid; first+last touch; cross-page persistence) into HubSpot hidden fields, both forms | ✅ **SHIPPED & verified** (commit `7e3ba86`) — incl. capture timestamp for future `fbc` rebuild |
| **0** | Provision: BigQuery project + service account, HubSpot private-app token, Meta CAPI token + dataset, secrets in env | ⏭️ next |
| **2** | HubSpot → BQ sync (all objects + associations) | ⏭️ |
| **M** | Monitoring & status page — `ops.sync_runs` heartbeat, `/status` view, healthchecks.io dead-man's-switch, data-quality assertions (cross-cutting; start with Phase 2, extend per sync) | ⏭️ |
| **3** | First-party CDP: server-set `visitor_id`, `/api/collect`, session log + email-backfill identity resolution | ⏭️ |
| **4** | `funnel_fact` model (dbt/SQL) — the join | ⏭️ |
| **5** | Meta Insights sync + spend join (CAC/ROAS, ad-set slicing) | ⏭️ |
| **6** | CAPI pipeline (run in parallel with Hyros) | ⏭️ |
| **7** | Dashboard L1/L2/L3 (Next.js + Tremor) | ⏭️ |
| **8** | Validate vs Hyros → **sunset Hyros** (remove `fbc_id`/`h_ad_id` ad params; replace with clean `adset_id`/`ad_id` macros) | ⏭️ |

Phase 1 was built first deliberately — that data can't be backfilled.

## 12. Monitoring, heartbeat & status page

Because the syncs are hand-rolled crons, the biggest operational risk is a **silent failure → stale data nobody notices**. Four layers guard against it:

**1. Heartbeat table (`ops.sync_runs`).** Every job (HubSpot sync, Meta Insights sync, site-event rollup, CAPI sender) writes one row per run: `source`, `started_at`, `finished_at`, `status` (ok/error), `rows_ingested`, `error_message`, `watermark` (max record timestamp processed). GA4's native export freshness is derived by querying its latest `events_*` partition.

**2. Status page (`/status`).** A gated ops view in the dashboard reads `ops.sync_runs` and shows, per source:
- last successful run + **freshness vs its SLA** (green / amber / red)
- rows ingested last run + a sparkline of recent volume (catches "ran but returned 0")
- last error message
- a **CAPI panel**: events sent, accepted vs dropped by Meta, current Event Match Quality
- a top-line "all systems green / N stale" banner

**3. Dead-man's-switch alerting ([healthchecks.io](https://healthchecks.io), free tier).** Each cron pings a unique URL on success; if a ping is missed within its grace window, healthchecks emails/Slacks you. This is essential because it catches the **"the cron never ran at all"** case — which an in-app status page structurally *cannot* report, since the app can't know about a job that never fired. Backstop: a daily watchdog cron queries `ops.sync_runs` for any source past SLA or with anomalous row counts and posts to Slack.

**4. Data-quality assertions (not just liveness).** "It ran" is not "it's correct." The heartbeat also asserts sanity each run: lead count within an expected band, no spike in null join keys (`adset_id`/`email`), no duplicate-contact surge, spend present for active campaigns. A green "ran successfully" hiding silently-broken data is worse than an honest red.

SLA suggestions: HubSpot sync hourly (red if >3h stale), Meta Insights daily (red if >36h), site events near-real-time (red if >1h), GA4 export ~daily with known lag (red if >48h), CAPI sender within minutes of a HubSpot stage change.

## 13. Cost

All free recurring: BigQuery free tier · GA4 export free · HubSpot API free (private app) · Meta API free · dbt Core free · Tremor free · existing Vercel. **Only cost = maintenance time.** Hyros bill is removed at Phase 8.

## 14. Secrets / security

- All API keys (Hyros, HubSpot, Meta CAPI) live in **environment variables / Vercel secrets** — never in code or chat.
- Rotate any key that has been shared in plaintext.
- Privacy: US-only, currently under CCPA thresholds → no consent flow required for the server-set cookie + IP/hashed-PII used by CAPI. Revisit at the revenue/consumer thresholds.

## 15. Open items

- HubSpot: confirm exact `meeting outcome` enum values, `hs_lead_status` options, deal pipeline stages, lifecycle values (pull from API at Phase 2 to build `funnel_fact` on real strings).
- Confirm demo scheduling tool writes meetings to HubSpot (HubSpot Meetings assumed).
- Monthly lead volume (sets whether dbt is needed or plain SQL views suffice).
- Media buyer applied the combined macro string to ads (`utm_content`/`utm_term`/`campaign_id`/`adset_id`/`ad_id`); existing Hyros `fbc_id`/`h_ad_id` params retained until Phase 8 sunset.
