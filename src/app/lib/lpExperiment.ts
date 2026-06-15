/**
 * /lp/meta A/B experiment — single source of truth.
 *
 * Shared by the edge middleware (variant assignment) and the page/client
 * (hero render + GA4/HubSpot tracking). Keep this file dependency-free so it
 * stays importable from the Edge runtime.
 */

export type LpVariant = "A" | "B";

/** Cookie that pins a visitor to one variant (sticky attribution). */
export const LP_META_VARIANT_COOKIE = "lp_meta_variant";

/** Sticky for 30 days so a returning visitor always sees the same hero. */
export const LP_META_VARIANT_MAX_AGE = 60 * 60 * 24 * 30;

/**
 * Probability of bucket A, 0–1. The split lives here: change this one number
 * (e.g. 0.9 for 90/10) and redeploy. 0.5 = even 50/50.
 */
export const LP_META_SPLIT_A = 0.5;

/** GA4 event-parameter / custom-dimension name (must match the GA4 setup). */
export const LP_VARIANT_PARAM = "lp_variant";

/** Narrow an arbitrary string to a valid variant, or null if it isn't one. */
export function parseVariant(value: string | undefined | null): LpVariant | null {
  return value === "A" || value === "B" ? value : null;
}

/** A → playground hero, B → product video hero. */
export function heroMediaForVariant(variant: LpVariant): "playground" | "video" {
  return variant === "B" ? "video" : "playground";
}
