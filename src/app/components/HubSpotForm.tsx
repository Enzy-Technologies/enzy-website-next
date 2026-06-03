"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * HubSpotForm
 * -----------
 * Renders a HubSpot "developer" embed form reliably inside a Next.js
 * single-page app.
 *
 * Why this exists:
 * The HubSpot developer embed script (js-na2.hsforms.net/forms/embed/developer)
 * scans the DOM for `.hs-form-html` containers *once, when the script executes*,
 * and injects forms into whatever it finds at that moment. On a static page this
 * always works because a full page load lines up the script and the container.
 *
 * In a SPA that breaks: client-side navigation (and modals that mount their
 * container later) never re-trigger that one-time scan, so the container sits
 * empty and shows "Loading form…" until a hard refresh. To make this
 * deterministic we re-inject a fresh copy of the embed script every time a form
 * container actually mounts, which re-runs the scan against the live DOM — the
 * same effect as a fresh page load. On unmount we tear the script and rendered
 * markup down so a later remount renders cleanly (no duplicate forms).
 *
 * Ready/submitted detection uses HubSpot's global postMessage callbacks
 * (`hsFormCallback`) with a DOM-polling fallback. We intentionally do NOT rely
 * on `window.hbspt`, because the current embed script no longer sets it.
 */

const HS_REGION = "na2";
const HS_PORTAL_ID = "39823762";
const HS_SCRIPT_SRC = `https://js-${HS_REGION}.hsforms.net/forms/embed/developer/${HS_PORTAL_ID}.js`;

const BLOCKED_TIMEOUT_MS = 12_000;

type Status = "loading" | "ready" | "blocked";

type Props = {
  /** HubSpot form id (the GUID from the embed code). */
  formId: string;
  /** Alignment of the "Loading form…" message. */
  loadingAlign?: "left" | "center";
  /** Fires once the form markup is rendered and interactive. */
  onReady?: () => void;
  /** Fires when the embedded form is submitted. */
  onSubmitted?: () => void;
  /** Optional extra classes for the outer wrapper. */
  className?: string;
};

function hasRenderedForm(container: HTMLElement | null): boolean {
  if (!container) return false;
  return !!container.querySelector(
    ".hs-form, form.hs-form, form, input, select, textarea, iframe"
  );
}

export function HubSpotForm({
  formId,
  loadingAlign = "left",
  onReady,
  onSubmitted,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  // Keep the latest callbacks in refs so the main effect can depend only on
  // `formId` (callbacks are often inline/unstable and would otherwise force the
  // form to tear down and re-render on every parent render).
  const onReadyRef = useRef(onReady);
  const onSubmittedRef = useRef(onSubmitted);
  useEffect(() => {
    onReadyRef.current = onReady;
    onSubmittedRef.current = onSubmitted;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    setStatus("loading");

    const markReady = () => {
      if (cancelled) return;
      setStatus("ready");
      onReadyRef.current?.();
    };

    // HubSpot fires global form lifecycle events via postMessage.
    const onMessage = (event: MessageEvent) => {
      const data = event?.data as
        | { type?: string; eventName?: string }
        | undefined;
      if (!data || data.type !== "hsFormCallback") return;
      if (data.eventName === "onFormReady") markReady();
      if (data.eventName === "onFormSubmitted") onSubmittedRef.current?.();
    };
    window.addEventListener("message", onMessage);

    // Fallback for inline (non-iframe) forms: catch the native submit.
    const onSubmit = (e: Event) => {
      const el = e.target;
      if (el instanceof HTMLFormElement && container.contains(el)) {
        onSubmittedRef.current?.();
      }
    };
    document.addEventListener("submit", onSubmit, true);

    // Re-inject the embed script so it re-scans the DOM and renders THIS
    // freshly-mounted container, mirroring a full page load.
    const script = document.createElement("script");
    script.src = HS_SCRIPT_SRC;
    script.defer = true;
    script.dataset.enzyHubspotEmbed = formId;
    document.body.appendChild(script);

    // Polling fallback in case the postMessage path doesn't fire.
    const poll = window.setInterval(() => {
      if (hasRenderedForm(container)) {
        markReady();
        window.clearInterval(poll);
      }
    }, 200);

    // If nothing renders in time, surface a helpful message instead of an
    // endless spinner (usually an ad blocker / privacy extension / network
    // policy blocking hsforms.net).
    const blockedTimer = window.setTimeout(() => {
      if (!cancelled && !hasRenderedForm(container)) setStatus("blocked");
    }, BLOCKED_TIMEOUT_MS);

    return () => {
      cancelled = true;
      window.removeEventListener("message", onMessage);
      document.removeEventListener("submit", onSubmit, true);
      window.clearInterval(poll);
      window.clearTimeout(blockedTimer);
      script.remove();
      // Clear rendered markup so a remount renders cleanly.
      container.innerHTML = "";
    };
  }, [formId]);

  const muted = "text-black/60 dark:text-white/60";
  const strong = "text-black dark:text-white";

  return (
    <div className={`relative ${className ?? ""}`}>
      {status === "loading" ? (
        <div
          className={
            loadingAlign === "center"
              ? "absolute inset-0 flex items-center justify-center"
              : ""
          }
        >
          <p className={`m-0 font-inter text-[13px] ${muted}`}>Loading form…</p>
        </div>
      ) : null}

      {status === "blocked" ? (
        <div className="text-left">
          <p className={`m-0 font-inter text-[13px] font-semibold ${strong}`}>
            The form didn’t load.
          </p>
          <p className={`m-0 mt-1 font-inter text-[12px] ${muted}`}>
            This is usually caused by an ad blocker or privacy extension blocking
            <code className="mx-1">js-na2.hsforms.net</code>. Try disabling
            extensions for this site and refresh.
          </p>
        </div>
      ) : null}

      <div
        ref={containerRef}
        className={status === "blocked" ? "hidden" : "hs-form-html"}
        data-region={HS_REGION}
        data-form-id={formId}
        data-portal-id={HS_PORTAL_ID}
      />
    </div>
  );
}
