import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/app/components/JsonLd";
import { buildMetadata } from "@/app/lib/seo";
import { getLandingPageConfig, LANDING_PAGES } from "@/app/(landing)/lp/config/pages";
import { LandingPageTemplate } from "@/app/(landing)/LandingPageTemplate";
import { isLandingHomeConfig } from "@/app/(landing)/lp/config/types";
import { buildLandingJsonLd } from "@/app/(landing)/lp/lib/buildLandingJsonLd";
import { LpHomeShell } from "@/app/(landing)/lp/templates/LpHomeShell";

// Prerender configured marketing LPs at build time. `meta` is intentionally
// excluded — it has its own route (/lp/meta) that must stay dynamic to read the
// A/B variant cookie. Today this yields no params (meta is the only config),
// but it future-proofs any non-meta LP added to LANDING_PAGES.
export function generateStaticParams() {
  return Object.keys(LANDING_PAGES)
    .filter((slug) => slug !== "meta")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getLandingPageConfig(slug);
  if (!config)
    return buildMetadata({
      title: "Not found",
      description: "",
      path: `/lp/${slug}`,
      hiddenFromSearchEngines: true,
    });

  return buildMetadata({
    title: config.seo.title,
    description: config.seo.description,
    path: `/lp/${slug}`,
    imagePath: config.seo.imagePath,
    type: config.seo.type,
    hiddenFromSearchEngines: true,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getLandingPageConfig(slug);
  if (!config) notFound();

  return (
    <>
      <JsonLd data={buildLandingJsonLd(config)} />
      {isLandingHomeConfig(config) ? <LpHomeShell /> : <LandingPageTemplate config={config} />}
    </>
  );
}
