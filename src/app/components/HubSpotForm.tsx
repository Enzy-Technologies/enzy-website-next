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

/**
 * Set an input's value through React's native setter so HubSpot's controlled
 * phone component actually re-renders from it (a plain `el.value = ...` is
 * silently ignored by React-controlled inputs). Then fire input + change so
 * HubSpot re-parses and updates its hidden submit field.
 */
function setNativeValue(el: HTMLInputElement, value: string, fireChange = true) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )?.set;
  setter?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  // `change` is what makes HubSpot re-parse into its hidden submit field. Skip
  // it for purely cosmetic prefix tweaks (clear/restore of "+1") so we don't
  // trip validation on an empty field the user is still working in.
  if (fireChange) el.dispatchEvent(new Event("change", { bubbles: true }));
}

// WebKit/Blink fire a CSS animationstart when a field gets autofilled, even in
// the cases (notably Safari) where they fire no input/change event until blur.
// We hang a no-op keyframe off `:-webkit-autofill` so we can listen for it and
// normalize the moment autofill lands, rather than waiting for the user to tab
// out of the field.
const AUTOFILL_KEYFRAME = "enzyAutofillStart";
function ensureAutofillKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("enzy-autofill-kf")) return;
  const style = document.createElement("style");
  style.id = "enzy-autofill-kf";
  style.textContent =
    `@keyframes ${AUTOFILL_KEYFRAME}{from{}to{}}` +
    `input:-webkit-autofill{animation-name:${AUTOFILL_KEYFRAME};animation-duration:1ms}`;
  document.head.appendChild(style);
}

/**
 * Coerce a US phone value into canonical E.164 (`+1XXXXXXXXXX`), or return null
 * to mean "leave it alone".
 *
 * Why: HubSpot's phone field (hsfc-PhoneInput) parses some autofill shapes
 * correctly but mangles others. Browser autofill commonly injects a number with
 * a bare leading country code and no plus (`18015551234`, typical of iOS
 * Contacts) which HubSpot turns into `+118015551234`, or — on Chrome, because
 * the field is pre-seeded with `+1` — a doubled `+1+18015551234`. Both submit a
 * broken number and can flip the detected country off the US. Feeding HubSpot a
 * clean `+1XXXXXXXXXX` is the one shape it always parses correctly.
 *
 * We deliberately return null (no change) for anything that isn't an
 * unambiguous, complete US number so we never fight a user mid-type or rewrite a
 * value HubSpot has already formatted. US area codes never start with 1, so a
 * 10-digit national part beginning with 1 is an incomplete entry, not a number.
 */
function normalizeUsPhone(raw: string): string | null {
  const digits = (raw || "").replace(/\D/g, "");
  if (!digits) return null;
  let national = digits;
  // Strip a displaced country-code "1" from the LEADING end — covers
  // `1XXXXXXXXXX` and the doubled `+1+1XXXXXXXXXX` case.
  while (national.length > 10 && national.startsWith("1")) {
    national = national.slice(1);
  }
  // ...and from the TRAILING end — covers Chrome on iOS, where autofill inserts
  // the number *before* the pre-seeded `+1`, pushing the country code to the end
  // (`XXXXXXXXXX1`). Only ever runs while we still have excess digits, so a real
  // 10-digit number that happens to end in 1 is never touched.
  while (national.length > 10 && national.endsWith("1")) {
    national = national.slice(0, -1);
  }
  if (national.length !== 10) return null; // incomplete / not a US number
  if (national.startsWith("1")) return null; // invalid US area code → mid-type
  return `+1${national}`;
}

/**
 * Normalize one phone input in place, but only if it's actually broken. The
 * digit-equality guard means a value that's already `+1` + the same 10 digits
 * (in any of HubSpot's display formats) is left untouched, so we never loop with
 * HubSpot's formatter.
 */
function normalizePhoneInput(el: HTMLInputElement) {
  const next = normalizeUsPhone(el.value);
  if (!next) return;
  // Already canonical? Only if it carries the leading "+" AND the same digits.
  // The "+" matters: HubSpot reads `+18015551234` as country-code + national,
  // but `18015551234` (identical digits, no plus) as a bare national number and
  // prepends another 1 → `+118015551234`. Comparing digits alone would wrongly
  // treat the broken no-plus form as already-correct and skip it. The "+" test
  // also lets HubSpot's own display formats (`+1 (801) 555-1234`) pass through
  // untouched, so we never loop with its formatter.
  if (el.value.trim().startsWith("+") && el.value.replace(/\D/g, "") === next.replace(/\D/g, "")) {
    return;
  }
  setNativeValue(el, next);
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

    // Keep phone fields submittable as clean US E.164 regardless of how the
    // browser autofills them (see normalizeUsPhone). Attached once, on ready.
    let phoneCleanup: (() => void) | null = null;
    const setupPhoneNormalization = () => {
      if (phoneCleanup || !container) return;
      const inputs = Array.from(
        container.querySelectorAll<HTMLInputElement>('input[type="tel"]')
      );
      if (inputs.length === 0) return;

      ensureAutofillKeyframes();

      // On touch devices the pre-seeded "+1" makes iOS/Chrome treat the field as
      // non-empty and skip the phone autofill prompt (Chrome on iOS won't offer
      // it at all unless you move the caret before the "+1"). We clear the
      // untouched prefix on focus so autofill engages and inserts cleanly, then
      // restore it on blur if the field went unused. Desktop — already working —
      // is left exactly as-is.
      const isTouch =
        typeof window !== "undefined" &&
        !!window.matchMedia?.("(pointer: coarse)").matches;
      // "Pristine" = nothing but the prefix (no digits, or just the country 1).
      const isPristinePrefix = (v: string) => {
        const d = v.replace(/\D/g, "");
        return d === "" || d === "1";
      };

      // Normalize on input/change/blur. `input` is what makes autofill correct
      // itself instantly: Chrome fires it on autofill, and HubSpot validates on
      // it too. Crucially this does NOT disturb manual typing — normalizeUsPhone
      // only rewrites a complete, broken US number, and a hand-typed value always
      // carries HubSpot's leading "+", so the guard leaves it untouched.
      const handlers = inputs.map((el) => {
        const originalPlaceholder = el.placeholder;
        const fn = () => normalizePhoneInput(el);
        // Safari often fires no input/change on autofill until blur; the
        // :-webkit-autofill animation is the reliable signal there. Defer one
        // frame so the autofilled value is readable before we normalize.
        const onAutofill = (e: AnimationEvent) => {
          if (e.animationName === AUTOFILL_KEYFRAME) {
            requestAnimationFrame(() => normalizePhoneInput(el));
          }
        };
        const onFocus = () => {
          if (isTouch && isPristinePrefix(el.value)) {
            // Hide the field's placeholder ("*") while we blank it — otherwise
            // clearing "+1" leaves an empty field showing the required-marker.
            el.placeholder = "";
            setNativeValue(el, "", false);
          }
        };
        const onBlur = () => {
          fn();
          // Restore the cosmetic "+1" if the user focused but left it empty.
          if (isTouch && el.value.replace(/\D/g, "") === "") {
            setNativeValue(el, "+1", false);
          }
          if (isTouch) el.placeholder = originalPlaceholder;
        };
        el.addEventListener("input", fn);
        el.addEventListener("change", fn);
        el.addEventListener("focus", onFocus);
        el.addEventListener("blur", onBlur);
        el.addEventListener("animationstart", onAutofill);
        return { el, fn, onFocus, onBlur, onAutofill };
      });

      // Backstop for any browser that autofills silently before the user ever
      // touches the field. We skip a focused field so we don't fight typing.
      const sweeps = [250, 700, 1500].map((ms) =>
        window.setTimeout(() => {
          for (const el of inputs) {
            if (document.activeElement !== el) normalizePhoneInput(el);
          }
        }, ms)
      );

      phoneCleanup = () => {
        for (const { el, fn, onFocus, onBlur, onAutofill } of handlers) {
          el.removeEventListener("input", fn);
          el.removeEventListener("change", fn);
          el.removeEventListener("focus", onFocus);
          el.removeEventListener("blur", onBlur);
          el.removeEventListener("animationstart", onAutofill);
        }
        for (const t of sweeps) window.clearTimeout(t);
      };
    };

    const markReady = () => {
      if (cancelled) return;
      setStatus("ready");
      applyHiddenFields();
      setupPhoneNormalization();
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
      phoneCleanup?.();
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
