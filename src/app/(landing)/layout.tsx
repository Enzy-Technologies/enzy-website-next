import React from "react";

/**
 * Layout for the (landing) route group — applies to every `/lp/*` page.
 *
 * The Meta Pixel is intentionally NOT here. It must fire ONLY on `/lp/meta`
 * (the paid Meta-ad landing page), so it lives in that route's own page.tsx.
 * Adding ad/analytics tracking that should cover every /lp/* page would go
 * here; anything page-specific stays in that page's route.
 *
 * Note: Hyros loads site-wide from the root layout (which already covers /lp),
 * so it must not be added here — that would double-fire on landing pages.
 */

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
