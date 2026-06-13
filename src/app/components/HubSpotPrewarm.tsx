"use client";

import { useEffect } from "react";
import { BOOK_DEMO_HREF } from "../lib/booking";

/**
 * HubSpotPrewarm
 * --------------
 * Shaves the last chunk off the Book-a-Demo form's time-to-paint.
 *
 * After the layout's preconnect + prefetch hints, the only thing left on the
 * form's critical path is HubSpot booting its OWN React runtime: when the form
 * container mounts, the embed still has to download + parse + execute these
 * module bundles from static.hsappstatic.net before it can render. That work
 * can't start until the user is already on the page.
 *
 * This warms those bundles *on intent* — the first time a visitor hovers,
 * focuses, or taps a "Book a demo" link — by injecting `modulepreload` hints so
 * the modules are fetched and compiled before navigation. By the time the page
 * mounts the form, HubSpot's React is hot and the form paints almost instantly.
 *
 * Why on intent and not globally: loading HubSpot's React on every page would
 * regress site-wide (especially mobile) performance for everyone who never
 * books a demo. And we deliberately preload the MODULES rather than pre-render
 * a hidden form — rendering one would fire HubSpot's form-view counter and
 * pollute form-impression analytics; preloading the JS does not.
 */

// Version-pinned (v18 / v1) HubSpot embed runtime modules — stable across
// deploys. If HubSpot ever bumps a version a stale preload just 404s harmlessly
// (the real render still loads the current module); update the paths then.
const HS_RUNTIME_MODULES = [
  "https://static.hsappstatic.net/cms-js-static/ex/js/react/v18/react-combined.mjs",
  "https://static.hsappstatic.net/cms-js-static/ex/js/island-runtime/v1/island-runtime.mjs",
];

function isBookDemoLink(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  const anchor = target.closest("a[href]");
  if (!anchor) return false;
  const href = anchor.getAttribute("href") ?? "";
  // Match the canonical path whether the href is relative or absolute.
  return href === BOOK_DEMO_HREF || href.endsWith(BOOK_DEMO_HREF);
}

export function HubSpotPrewarm() {
  useEffect(() => {
    let warmed = false;

    const warm = () => {
      if (warmed) return;
      warmed = true;
      for (const href of HS_RUNTIME_MODULES) {
        const link = document.createElement("link");
        link.rel = "modulepreload";
        link.href = href;
        link.crossOrigin = "";
        document.head.appendChild(link);
      }
      teardown();
    };

    const onIntent = (e: Event) => {
      if (isBookDemoLink(e.target)) warm();
    };

    const opts = { capture: true, passive: true } as const;
    const teardown = () => {
      document.removeEventListener("pointerover", onIntent, opts);
      document.removeEventListener("focusin", onIntent, opts);
      document.removeEventListener("touchstart", onIntent, opts);
    };

    document.addEventListener("pointerover", onIntent, opts);
    document.addEventListener("focusin", onIntent, opts);
    document.addEventListener("touchstart", onIntent, opts);

    return teardown;
  }, []);

  return null;
}
