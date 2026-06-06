import type { LandingPageConfig } from "./types";

/**
 * Landing pages keyed by URL slug (`/lp/<slug>`).
 *
 * Duplicate quickly:
 * 1. Copy `meta` (home-style) or define a marketing block with `hero` + optional `productVideo`
 *    (see `LandingPageTemplate`).
 * 2. Use `layout: "home"` when you want the same stack as `/` plus LP hero (video placeholder,
 *    oversized Book demo — no playground, no site nav/footer shell on `/lp/*`).
 */

export const LANDING_PAGES: Record<string, LandingPageConfig> = {
  meta: {
    layout: "home",
    slug: "meta",
    seo: {
      title: "Field Sales Coaching Software & Execution Platform | Enzy",
      description:
        "Field sales execution for route-based teams: visibility between visits, daily coaching, and playbooks that turn CRM signal into rep action — without another dashboard. Book a demo.",
      type: "website",
    },
    disclaimer:
      "This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.",
  },

  /*
  // Example — long-form marketing LP (alternate template):
  other: {
    slug: "other",
    seo: { title: "…", description: "…", type: "website" },
    hero: {
      eyebrow: "…",
      headline: "…",
      highlight: "…",
      subhead: "…",
      primaryCta: { label: "Book a demo", href: BOOK_DEMO_HREF },
    },
    socialProof: { eyebrow: "…", line: "…" },
    productVideo: { title: "…", embedSrc: "https://www.youtube.com/embed/…" },
  },
  */
};

export function getLandingPageConfig(slug: string): LandingPageConfig | null {
  return LANDING_PAGES[slug] ?? null;
}
