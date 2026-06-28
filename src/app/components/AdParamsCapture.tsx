"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAdParams } from "@/app/lib/adTracking";

/**
 * AdParamsCapture
 *
 * Persists inbound Meta ad params (utm_*, campaign/adset/ad ids, fbclid) to
 * cookie + localStorage so they survive the hop from the ad-landing page to
 * wherever the demo form lives. See `lib/adTracking`.
 *
 * Unlike RouteChangeTracking, this does NOT skip its first run — the initial
 * load is exactly when ad params are in the URL. It re-runs on every SPA nav
 * too, but captureAdParams is a no-op when no params are present, so organic
 * navigation never clobbers a stored touch.
 */
export function AdParamsCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    captureAdParams();
  }, [pathname, searchParams]);

  return null;
}
