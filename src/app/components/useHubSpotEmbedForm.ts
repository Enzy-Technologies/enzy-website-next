"use client";

import { useEffect } from "react";

const HUBSPOT_EMBED_SRC =
  "https://js-na2.hsforms.net/forms/embed/developer/39823762.js";

/**
 * HubSpot's auto-embed script renders forms by scanning the DOM for
 * `.hs-form-html` containers, but it only does that scan once — when the
 * script first executes. It never re-scans for containers that appear later.
 *
 * `next/script` (and the browser's module cache) de-dupes by `src`, so once
 * the embed has loaded it is never re-run. That means any form mounted after
 * the first one — reopening the modal, or a client-side navigation to
 * /book-demo — gets an empty container that never renders, leaving it stuck on
 * "Loading form…" until a hard refresh re-runs everything from scratch.
 *
 * To work around that we inject a *fresh* <script> element on every mount.
 * Re-inserting a script element re-executes it (served from cache, so there's
 * no network cost), which forces HubSpot to re-scan and render into whichever
 * `.hs-form-html` container is currently on the page.
 */
export function useHubSpotEmbedForm(active: boolean) {
  useEffect(() => {
    if (!active) return;

    // The container that HubSpot renders into is part of the same render pass
    // as this effect, so it is guaranteed to be in the DOM by the time the
    // injected script executes.
    const script = document.createElement("script");
    script.src = HUBSPOT_EMBED_SRC;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [active]);
}
