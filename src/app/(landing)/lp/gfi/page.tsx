import React from "react";
import type { Metadata } from "next";

import { buildMetadata } from "@/app/lib/seo";
import { GfiLandingShell } from "./GfiLandingShell";

/**
 * Dedicated /lp/gfi route — the GFI × Enzy partner opt-in page.
 *
 * It lives as its own folder (like /lp/meta) rather than a LANDING_PAGES config
 * entry because it's a bespoke layout (partnership explainer + tiered pricing +
 * HubSpot opt-in form), not the shared `home`/`marketing` LP stack. Static — no
 * cookies/searchParams — so it prerenders.
 */

export const metadata: Metadata = buildMetadata({
  title: "Enzy for GFI Agency Owners",
  description:
    "GFI has partnered with Enzy, the performance operating system for sales teams. Opt in at exclusive partner pricing and run your agency like a high-performance team.",
  path: "/lp/gfi",
  hiddenFromSearchEngines: true,
});

export default function GfiLandingPage() {
  return <GfiLandingShell />;
}
