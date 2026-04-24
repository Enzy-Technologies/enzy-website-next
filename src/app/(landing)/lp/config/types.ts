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

export type LandingPageConfig = {
  slug: string;
  seo: LandingSeoConfig;
  hero: LandingHeroConfig;
  /** Shown when `socialProof` is in `sections` */
  socialProof?: {
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
  /** Shown when `productVideo` is in `sections` — use the host’s embed URL (`src` for the iframe). */
  productVideo?: {
    eyebrow?: string;
    title: string;
    description?: string;
    embedSrc: string;
    /** Repeat the demo CTA after the watch (improves conversion for “booked demos” LPs). */
    cta?: { label: string; href: string };
  };
  sections: LandingSectionKey[];
};
