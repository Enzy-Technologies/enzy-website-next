"use client";

import { useEffect, useState } from "react";
import { MEDIA } from "./breakpoints";

/**
 * SSR-safe `matchMedia` hook for render-time responsive branching.
 *
 * Defaults to `false` (touch-first) on the server / first paint, then syncs to
 * the real value on mount and stays live via a `change` listener. Use this for
 * React render branches; imperative (non-render) code should read
 * `window.innerWidth >= DESKTOP_MIN` or `window.matchMedia(MEDIA.desktop)`
 * against the shared constants instead.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** `true` at >= 1024px — the single structural desktop line. */
export const useIsDesktop = () => useMediaQuery(MEDIA.desktop);

/** `true` at <= 767px — phone only. Used for the iOS-Safari clip (Rule 3). */
export const useIsPhone = () => useMediaQuery(MEDIA.phone);
