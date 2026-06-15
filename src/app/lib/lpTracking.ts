import { LP_VARIANT_PARAM, type LpVariant } from "@/app/lib/lpExperiment";

/**
 * Fire a variant-tagged GA4 event for the /lp/meta A/B test. Client-only —
 * call from event handlers / effects. No-ops when GA4 isn't loaded.
 *
 * `lp_variant` is also set as a default param on page load (see lp/meta/page),
 * so it rides along automatically; we pass it explicitly here for robustness.
 */
type Gtag = (...args: unknown[]) => void;

export function trackLpConversion(event: "lp_form_submit" | "lp_booking", variant: LpVariant) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", event, { [LP_VARIANT_PARAM]: variant });
}
