import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { JsonLd } from "@/app/components/JsonLd";
import { buildMetadata } from "@/app/lib/seo";
import { getLandingPageConfig } from "@/app/(landing)/lp/config/pages";
import { isLandingHomeConfig } from "@/app/(landing)/lp/config/types";
import { buildLandingJsonLd } from "@/app/(landing)/lp/lib/buildLandingJsonLd";
import { LpHomeShell } from "@/app/(landing)/lp/templates/LpHomeShell";
import {
  LP_META_VARIANT_COOKIE,
  LP_VARIANT_PARAM,
  parseVariant,
} from "@/app/lib/lpExperiment";

/**
 * Dedicated /lp/meta route — overrides the shared `lp/[slug]` page for this one
 * slug so that ONLY this page goes dynamic (it reads the variant cookie).
 * Every other /lp/* slug keeps rendering statically through [slug].
 */

const META_CONFIG = getLandingPageConfig("meta");

export function generateMetadata(): Metadata {
  if (!META_CONFIG) return buildMetadata({ title: "Not found", description: "", path: "/lp/meta", hiddenFromSearchEngines: true });
  return buildMetadata({
    title: META_CONFIG.seo.title,
    description: META_CONFIG.seo.description,
    path: "/lp/meta",
    imagePath: META_CONFIG.seo.imagePath,
    type: META_CONFIG.seo.type,
    hiddenFromSearchEngines: true,
  });
}

export default async function MetaLandingPage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string; variant?: string }>;
}) {
  const config = META_CONFIG;
  if (!config || !isLandingHomeConfig(config)) notFound();

  const store = await cookies();
  const sp = await searchParams;
  // Preview override: ?v=a / ?v=b (or ?variant=) forces a variant for QA without
  // touching the sticky cookie, so it doesn't affect real bucketing/attribution.
  // Real ad traffic hits the clean /lp/meta with no param, so it's unaffected.
  const override = parseVariant((sp.v ?? sp.variant)?.toUpperCase());
  // Otherwise the middleware-assigned, cookie-pinned variant. Default to "A" if
  // a request somehow arrives without the cookie (e.g. middleware skipped a bot).
  const variant = override ?? parseVariant(store.get(LP_META_VARIANT_COOKIE)?.value) ?? "A";

  return (
    <>
      {/*
        Runs during HTML parse — ahead of every afterInteractive script — so it
        does two things before anything else reads them:
          1. Sets the GA4 variant dimension before the layout's gtag('config')
             fires its page_view, so page_view (and later events) carry lp_variant.
          2. Writes lp_variant into the URL query string so HubSpot's form picks
             it up via its NATIVE query-param prefill. We populate the hidden
             field this way (not by setting the input + dispatching events), which
             left HubSpot's React form untouched and avoided breaking submission.
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('set',{'${LP_VARIANT_PARAM}':'${variant}'});try{var _u=new URL(window.location.href);if(_u.searchParams.get('${LP_VARIANT_PARAM}')!=='${variant}'){_u.searchParams.set('${LP_VARIANT_PARAM}','${variant}');window.history.replaceState(window.history.state,'',_u);}}catch(e){}`,
        }}
      />
      <JsonLd data={buildLandingJsonLd(config)} />
      <LpHomeShell variant={variant} />
    </>
  );
}
