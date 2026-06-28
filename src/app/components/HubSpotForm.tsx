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

// Don't flash the "Loading form…" hint on fast (warmed/cached) loads. The form
// usually paints well under this threshold, so the hint never appears and the
// user just sees the form; it only shows if loading genuinely drags.
const LOADING_HINT_DELAY_MS = 450;

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
  /**
   * Values to write into matching hidden inputs once the form renders, keyed by
   * the HubSpot property's internal name (e.g. `{ lp_variant: "B" }`). The
   * field must already exist on the form as a hidden field in HubSpot; if it
   * doesn't, this is a harmless no-op.
   */
  hiddenFields?: Record<string, string>;
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
  hiddenFields,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");
  // Only true once loading has dragged past LOADING_HINT_DELAY_MS — keeps the
  // hint from flashing on fast loads (see constant above).
  const [showLoadingHint, setShowLoadingHint] = useState(false);

  // Keep the latest callbacks in refs so the main effect can depend only on
  // `formId` (callbacks are often inline/unstable and would otherwise force the
  // form to tear down and re-render on every parent render).
  const onReadyRef = useRef(onReady);
  const onSubmittedRef = useRef(onSubmitted);
  const hiddenFieldsRef = useRef(hiddenFields);
  useEffect(() => {
    onReadyRef.current = onReady;
    onSubmittedRef.current = onSubmitted;
    hiddenFieldsRef.current = hiddenFields;
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    setStatus("loading");

    // Write any hidden-field values into the rendered form. HubSpot's developer
    // embed renders inline (not a cross-origin iframe), so the inputs are real
    // DOM nodes we can set directly; dispatching input/change lets HubSpot's
    // own form state pick the value up before submit.
    const applyHiddenFields = () => {
      const fields = hiddenFieldsRef.current;
      if (!fields || !container) return;
      for (const [name, value] of Object.entries(fields)) {
        const input = container.querySelector<HTMLInputElement>(
          `input[name="${name}"]`
        );
        if (input && input.value !== value) {
          input.value = value;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    };

    const markReady = () => {
      if (cancelled) return;
      setStatus("ready");
      applyHiddenFields();
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

  // Re-apply hidden fields if they arrive or change AFTER the form is ready
  // (e.g. ad params read from storage asynchronously). markReady() applies them
  // once at ready; this catches later updates. Idempotent — only writes inputs
  // whose value actually differs.
  useEffect(() => {
    if (status !== "ready") return;
    const container = containerRef.current;
    if (!container || !hiddenFields) return;
    for (const [name, value] of Object.entries(hiddenFields)) {
      const input = container.querySelector<HTMLInputElement>(
        `input[name="${name}"]`
      );
      if (input && input.value !== value) {
        input.value = value;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  }, [hiddenFields, status]);

  // Reveal the loading hint only if loading outlasts the delay; cancel the
  // moment status changes (e.g. the form became ready first).
  useEffect(() => {
    if (status !== "loading") {
      setShowLoadingHint(false);
      return;
    }
    const t = window.setTimeout(
      () => setShowLoadingHint(true),
      LOADING_HINT_DELAY_MS
    );
    return () => window.clearTimeout(t);
  }, [status]);

  const muted = "text-black/60 dark:text-white/60";
  const strong = "text-black dark:text-white";

  return (
    <div className={`relative ${className ?? ""}`}>
      {status === "loading" && showLoadingHint ? (
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
