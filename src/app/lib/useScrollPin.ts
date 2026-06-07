"use client";

import { useEffect, useState, type RefObject } from "react";

export type PinStyle = {
  position: "absolute" | "fixed" | "sticky";
  top: number | "auto";
  bottom: number | "auto";
  left: number;
};

// Below this width we use the mobile JS pin; at/above it we use native sticky.
const MOBILE_MAX = 1023;

const DESKTOP_PIN: PinStyle = {
  position: "sticky",
  top: 0,
  bottom: "auto",
  left: 0,
};

/**
 * A MOBILE-ONLY JS stand-in for `position: sticky` on a full-viewport "stage"
 * that pins inside a tall scroll runway (e.g. the Playground zoom, the
 * How-It-Works cards).
 *
 * WHY THIS EXISTS — iOS Safari safe-area bars: with `viewport-fit: cover` the
 * page draws behind Safari's translucent top status bar and bottom toolbar.
 * Those strips stay see-through UNLESS a persistent composited layer is present.
 * `position: sticky`, once it contains ANY content, gets promoted to exactly
 * such a layer and flattens both bars to opaque — page-wide, regardless of
 * scroll position. `position: fixed` does NOT trigger this. So on MOBILE we
 * replicate sticky's pinning by toggling the stage between:
 *   - `absolute top:0`     before the runway reaches the top of the viewport
 *   - `fixed top:0`        while the runway spans the viewport (the "pinned" leg)
 *   - `absolute bottom:0`  after the runway has scrolled past
 * This keeps the visual identical to sticky while never creating the
 * bar-flattening sticky layer.
 *
 * DESKTOP (>= 1024px) has no Safari safe-area bars, so it just returns
 * `position: sticky` — i.e. the original, native behavior, unchanged. Callers
 * key any mobile-only tweaks (e.g. a bottom clip) off `position === "fixed"`,
 * which therefore never applies on desktop.
 *
 * The stage is assumed to be one viewport tall (`h-[100dvh]`) and pinned to the
 * top, matching how the sticky stages were authored.
 *
 * @param runwayRef ref to the tall scroll container (the runway), NOT the stage
 */
export function useScrollPin(
  runwayRef: RefObject<HTMLElement | null>
): PinStyle {
  // Start in the mobile "before" state. Never start as `sticky`: on mobile that
  // would flatten the bars (and can latch) for the frame before the effect runs.
  // Desktop's brief absolute→sticky correction is invisible (the stage is at the
  // runway top either way when unscrolled).
  const [pin, setPin] = useState<PinStyle>({
    position: "absolute",
    top: 0,
    bottom: "auto",
    left: 0,
  });

  useEffect(() => {
    const el = runwayRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;

      // Desktop: native sticky, exactly as before this work. No JS pinning.
      if (window.innerWidth > MOBILE_MAX) {
        setPin((p) => (p.position === "sticky" ? p : DESKTOP_PIN));
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.top > 0) {
        // Runway hasn't reached the top of the viewport yet → rest at its top.
        setPin((p) =>
          p.position === "absolute" && p.top === 0
            ? p
            : { position: "absolute", top: 0, bottom: "auto", left: 0 }
        );
      } else if (rect.bottom <= vh) {
        // Runway has scrolled past → rest at its bottom.
        setPin((p) =>
          p.position === "absolute" && p.bottom === 0
            ? p
            : { position: "absolute", top: "auto", bottom: 0, left: 0 }
        );
      } else {
        // Runway spans the viewport → pin to the top of the viewport.
        setPin((p) =>
          p.position === "fixed"
            ? p
            : { position: "fixed", top: 0, bottom: "auto", left: 0 }
        );
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.visualViewport?.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.visualViewport?.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [runwayRef]);

  return pin;
}
