import { BOOK_DEMO_HREF } from "@/app/lib/booking";
import type { LandingPageConfig } from "./types";

export const LANDING_PAGES: Record<string, LandingPageConfig> = {
  fieldsales: {
    slug: "fieldsales",
    seo: {
      title: "Field Sales Coaching Software & Execution Platform | Enzy",
      description:
        "Field sales execution for route-based teams: visibility between visits, daily coaching, and playbooks that turn CRM signal into rep action—without another dashboard. Book a demo.",
      type: "website",
    },
    socialProof: {
      eyebrow: "Trusted in the field",
      line: "Built for route-based teams who win on consistency—solar, roofing, telecom, and high-touch services.",
      logos: ["Solar & energy", "Roofing & exteriors", "Telco field", "Home services"],
      testimonial: {
        quote:
          "We stopped debating what happened last week. Managers coach the same day, and reps finally have a plan between visits.",
        name: "Jordan M.",
        role: "VP Sales Operations",
      },
    },
    productVideo: {
      eyebrow: "Overview",
      title: "See Enzy in the field in under two minutes",
      description:
        "Route signal, in-the-moment coaching, and one system your reps run—without living in spreadsheets after hours.",
      embedSrc: "https://www.youtube.com/embed/jNQXAC9IVRw",
      cta: { label: "Book a demo", href: BOOK_DEMO_HREF },
    },
    hero: {
      eyebrow: "Enzy for Field Sales",
      headline: "The operating system for",
      highlight: "Field Sales",
      subhead:
        "Between visits is where deals are won. Enzy connects your stack, surfaces what changed, and turns it into daily execution—so managers coach in the moment and reps move with a plan.",
      primaryCta: { label: "Book a demo", href: BOOK_DEMO_HREF },
      secondaryCta: { label: "Watch overview", href: "#product-video" },
    },
    sections: ["socialProof", "productVideo", "howItWorks", "testimonials", "faq"],
  },
};

export function getLandingPageConfig(slug: string): LandingPageConfig | null {
  return LANDING_PAGES[slug] ?? null;
}
