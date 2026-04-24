import { SITE_FAQS } from "@/app/lib/faq-data";
import { siteUrl } from "@/app/lib/site";
import type { LandingPageConfig } from "../config/types";

/** FAQ + Video + WebPage graph for landing routes (Organization/SoftwareApplication live in root layout). */
export function buildLandingJsonLd(config: LandingPageConfig): Record<string, unknown> {
  const pageUrl = `${siteUrl}/lp/${config.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: config.seo.title,
      description: config.seo.description,
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
  ];

  if (config.sections.includes("faq")) {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: SITE_FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  if (config.productVideo?.embedSrc?.trim()) {
    const v = config.productVideo;
    const src = v.embedSrc.trim();
    const yt = src.match(/\/embed\/([^?&/]+)/);
    const thumbnailUrl = yt?.[1]
      ? `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`
      : undefined;
    graph.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: v.title,
      description: v.description ?? "",
      embedUrl: src,
      ...(thumbnailUrl ? { thumbnailUrl } : {}),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
