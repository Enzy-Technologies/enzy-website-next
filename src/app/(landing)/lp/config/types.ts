export type LandingSectionKey =
  | "socialProof"
  | "productVideo"
  | "howItWorks"
  | "features"
  | "benefits"
  | "integrations"
  | "specs"
  | "testimonials"
  | "faq";

export type LandingHeroConfig = {
  eyebrow: string;
  headline: string;
  highlight?: string;
  subhead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export type LandingSeoConfig = {
  title: string;
  description: string;
  imagePath?: string;
  type?: "website" | "article";
};

export type LandingMarketingSocialProof = {
  eyebrow: string;
  line: string;
  /** Short brand labels (replace with logo assets later if needed). */
  logos?: readonly string[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
};

export type LandingMarketingProductVideo = {
  eyebrow?: string;
  title: string;
  description?: string;
  embedSrc: string;
  /** Repeat the demo CTA after the watch (improves conversion for “booked demos” LPs). */
  cta?: { label: string; href: string };
};

/**
 * Duplicates the main site home flow (Hero + How it works + Evidence + Features preview + Closing CTA).
 * Renders with `HeroSection` in LP mode (video placeholder instead of playground, single large demo CTA).
 * Use for fast, consistent paid/vertical LPs; add a new slug in `pages.ts` with `layout: "home"`.
 */
export type LandingPageConfigHome = {
  layout: "home";
  slug: string;
  seo: LandingSeoConfig;
};

/** Marketing landing: fixed stack (hero → optional embed video → evidence → testimonial → features) + sticky demo CTA. */
export type LandingPageConfigMarketing = {
  slug: string;
  seo: LandingSeoConfig;
  layout?: "marketing";
  hero: LandingHeroConfig;
  /** @deprecated Ignored; section order is fixed. Kept for backward compatibility with older configs. */
  sections?: LandingSectionKey[];
  socialProof?: LandingMarketingSocialProof;
  productVideo?: LandingMarketingProductVideo;
};

export type LandingPageConfig = LandingPageConfigHome | LandingPageConfigMarketing;

export function isLandingHomeConfig(config: LandingPageConfig): config is LandingPageConfigHome {
  return config.layout === "home";
}
