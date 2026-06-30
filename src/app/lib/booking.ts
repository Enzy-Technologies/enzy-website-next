/** Single booking / demo destination for conversion attribution — use everywhere CTAs say “Book a demo”. */
export const BOOK_DEMO_HREF = "/book-a-demo";

/**
 * Shared *visual style* for every "Book a Demo" CTA — the cohesive look defined by the hero button.
 * Sizing stays per-placement (height, padding, text size, width, gap, arrow size); this constant only
 * carries the look: semibold Inter, pill radius, and the brand-green drop glow that deepens on hover.
 * Compose it AFTER the per-site sizing classes so the style wins any conflicts (twMerge keeps the last).
 */
export const BOOK_DEMO_CTA_STYLE =
  "font-inter font-semibold rounded-full shadow-[0_8px_24px_rgba(25,173,125,0.25)] hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)] transition-all duration-300";

/** HubSpot region + portal shared by all embedded forms. */
export const HS_REGION = "na2";
export const HS_PORTAL_ID = "39823762";

/** Standard Book-a-Demo HubSpot form (e.g. /book-a-demo and the homepage flow). */
export const DEMO_FORM_ID = "94576c22-2aa4-4888-9b5a-c8a3b0313152";

/** HubSpot form used on /lp/* landing pages — separate form for ad/landing-page attribution. */
export const LP_DEMO_FORM_ID = "8bde40f5-6ad5-4c18-b277-f47fd96297ca";

/**
 * GFI partner opt-in form (/lp/gfi). Its own HubSpot form so submissions are
 * cleanly attributable to the GFI partnership and carry the tier / add-on
 * selections used to generate the DocuSign agreement.
 */
export const GFI_FORM_ID = "9376b087-0028-4102-98ac-74f2359a9f07";
