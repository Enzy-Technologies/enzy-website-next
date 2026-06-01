"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useTheme } from "@/app/components/ThemeProvider";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

type LogoEntry = {
  /** Display name (also used as alt text). */
  name: string;
  /** Remote SVG URL. */
  src: string;
  /** One-line highlight revealed when the logo passes through center.
   *  Omit to keep the logo in the marquee but render no caption. */
  caption?: string;
};

// Add `caption` for any brand we want to call out as it scrolls through
// the center. Logos without a caption still appear, but pass through
// at normal speed and do not trigger the slow-down/highlight.
const LOGOS: LogoEntry[] = [
  {
    name: "SPWR",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/SPWR.svg",
    caption: "Publicly Traded (NASDAQ: SPWR)",
  },
  {
    name: "Aptive",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/aptive.svg",
    caption: "Top 5 Pest Control Company in the US",
  },
  {
    name: "Young Living",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/Young%20Living.svg",
    caption: "Top 10 Direct Sales Company in the World",
  },
  {
    name: "Nusun",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/Nusun.svg",
  },
  {
    name: "EcoShield",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/Ecoshield.svg",
  },
  {
    name: "Quick Roofing",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/Quick%20Roofing.svg",
  },
  {
    name: "Moxie",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/Moxie.svg",
    caption: "Top 10 Pest Control Company in the US",
  },
  {
    name: "Spartan Solar",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/CH1DX3.svg",
  },
  {
    name: "Grit",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/Grit.svg",
    caption: "105 Lifetime Golden Door Awards",
  },
  {
    name: "Chipr",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/Chipr.svg",
  },
  {
    name: "Fox Pest Control",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/FOX.svg",
  },
  {
    name: "Space",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/Space.svg",
  },
  {
    name: "Greenix",
    src: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/SVG%20Logos/Greenix.svg",
    caption: "Top 20 Pest Control Company in the US",
  },
];

export function SimpleLogosMarquee() {
  const { isLightMode } = useTheme();

  const items = useMemo(() => [...LOGOS, ...LOGOS], []);
  const maskRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const logoClass = isLightMode
    ? "max-h-full max-w-full h-auto w-auto object-contain opacity-70 brightness-0"
    : "max-h-full max-w-full h-auto w-auto object-contain opacity-90 brightness-0 invert";

  useEffect(() => {
    const mask = maskRef.current;
    const track = trackRef.current;
    if (!mask || !track) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Stop CSS animation; drive via WAAPI so we can slow + highlight.
    track.style.animation = "none";

    const readSeconds = (v: string) => {
      const s = v.trim();
      if (!s) return 0;
      if (s.endsWith("ms")) return parseFloat(s) / 1000;
      if (s.endsWith("s")) return parseFloat(s);
      const n = parseFloat(s);
      return Number.isFinite(n) ? n : 0;
    };

    const cs = getComputedStyle(track);
    const speedSeconds = readSeconds(cs.getPropertyValue("--speed")) || 72;
    const durationMs = Math.max(1000, speedSeconds * 1000);

    const animation = track.animate(
      [
        { transform: "translate3d(0,0,0)" },
        { transform: "translate3d(-50%,0,0)" },
      ],
      { duration: durationMs, iterations: Infinity, easing: "linear" }
    );

    const children = Array.from(track.children) as HTMLElement[];
    const N = Math.floor(children.length / 2) || children.length;
    if (!N) return;

    // Measure one item + gap to compute the centered index deterministically.
    const first = children[0];
    const second = children[1];
    const firstRect = first.getBoundingClientRect();
    const secondRect = second ? second.getBoundingClientRect() : null;
    const itemW = Math.max(1, firstRect.width);
    const step = secondRect ? Math.max(itemW, secondRect.left - firstRect.left) : itemW;

    let rafId = 0;
    // `activeApprox` is the *physical* child index (0..2N-1) currently
    // featured; `lastFeaturedLogo` is the folded logo index (0..N-1) so we
    // don't re-fire the same brand on back-to-back passes.
    let activeApprox = -1;
    let lastFeaturedLogo = -1;
    let hasExitedCenter = true;
    let rate = 1;

    const NORMAL_RATE = 1;
    const SLOW_RATE = 0.32;
    // Activate only when *very* close to center; clear after it leaves.
    const ENTER_DIST = Math.min(14, step * 0.1);
    const EXIT_DIST = Math.max(ENTER_DIST * 2.6, 38);

    // Toggle the highlight on *both* copies of a brand so it stays lit
    // regardless of which copy is physically on screen.
    const setActive = (logoIdx: number, on: boolean) => {
      children[logoIdx]?.classList.toggle("is-active", on);
      children[logoIdx + N]?.classList.toggle("is-active", on);
    };

    // Screen-space center of a given physical child index.
    const centerOf = (childIdx: number, offsetPx: number) =>
      childIdx * step + itemW / 2 - offsetPx;

    const tick = (now: number) => {
      void now; // keeps the signature compatible with requestAnimationFrame without using `now`
      const maskRect = mask.getBoundingClientRect();
      const centerX = maskRect.width / 2;

      // Progress in one loop (0..1). Use currentTime to avoid layout thrash.
      const t = (animation.currentTime ?? 0) as number;
      const loopT = (t % durationMs) / durationMs;
      const offsetPx = loopT * (step * N); // track shifts by N items for -50%

      // Which *physical* item is closest to the viewport center? Keep this
      // as the unfolded index so the distance below is measured against the
      // copy that's actually on screen — folding it into 0..N-1 first would
      // mis-measure any logo currently rendered by the second copy (e.g. the
      // left-most brands once they wrap back through center).
      const approx = Math.round((centerX + offsetPx - itemW / 2) / step);
      const logoIdx = ((approx % N) + N) % N;

      const dist = Math.abs(centerOf(approx, offsetPx) - centerX);
      if (dist > EXIT_DIST) hasExitedCenter = true;

      // Clear active once it leaves the center zone.
      if (activeApprox !== -1) {
        const activeDist = Math.abs(centerOf(activeApprox, offsetPx) - centerX);
        if (activeDist > EXIT_DIST) {
          setActive(((activeApprox % N) + N) % N, false);
          activeApprox = -1;
        }
      }

      // Activate only once per pass, right at center — and only for logos
      // that actually have a caption to reveal. Caption-less logos pass
      // through at full speed without the slow-down/highlight, since
      // there'd be nothing to draw attention to.
      const hasCaption = !!LOGOS[logoIdx]?.caption;
      if (
        activeApprox === -1 &&
        hasExitedCenter &&
        logoIdx !== lastFeaturedLogo &&
        dist < ENTER_DIST &&
        hasCaption
      ) {
        setActive(logoIdx, true);
        activeApprox = approx;
        lastFeaturedLogo = logoIdx;
        hasExitedCenter = false;
      }

      // Slow exactly while active (pass-through).
      const targetRate = activeApprox !== -1 ? SLOW_RATE : NORMAL_RATE;
      rate += (targetRate - rate) * 0.22;
      animation.playbackRate = rate;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      animation.cancel();
      if (activeApprox !== -1) {
        setActive(((activeApprox % N) + N) % N, false);
      }
    };
  }, [isLightMode]);

  return (
    <div className="w-full mt-5 md:mt-6" aria-label="Logos">
      <div className="simple-logo-marquee" style={{ ["--speed" as any]: "72s" }}>
        <div className="simple-logo-marquee__mask" ref={maskRef}>
          <div className="simple-logo-marquee__track" ref={trackRef}>
            {items.map((logo, idx) => (
              <div
                className="simple-logo-marquee__item"
                key={`${logo.src}-${idx}`}
              >
                <ImageWithFallback
                  src={logo.src}
                  alt={logo.name}
                  className={logoClass}
                />
                {logo.caption ? (
                  <div className="simple-logo-marquee__caption" aria-hidden>
                    {logo.caption}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

