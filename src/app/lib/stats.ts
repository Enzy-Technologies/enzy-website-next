export type SiteStat = {
  /** The big number, e.g. "21" or "7,000". */
  value: string;
  /** The small unit/suffix shown after the value, e.g. "%", "+", "K". */
  unit: string;
  /** The supporting label beneath the number. */
  label: string;
};

/**
 * Single source of truth for the headline performance stat cards.
 *
 * Rendered on the About page (§002) and the Book a Demo page (both the
 * desktop and mobile grids). Every surface imports this array, so updating a
 * value or label here propagates everywhere the cards appear — don't redefine
 * these inline in a page.
 */
export const SITE_STATS: SiteStat[] = [
  { value: "50", unit: "+", label: "Daily engagements per user" },
  { value: "21", unit: "%", label: "Increase in sales per rep after adopting Enzy" },
  { value: "7,000", unit: "+", label: "Incentives launched" },
  { value: "180", unit: "K", label: "Active Enzy users" },
];
