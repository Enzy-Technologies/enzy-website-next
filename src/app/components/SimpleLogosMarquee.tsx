"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useTheme } from "@/app/components/ThemeProvider";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const LOGOS = [
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/SVG%20Logos/Young%20Living.svg",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/SVG%20Logos/Quick%20Roofing.svg",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/SVG%20Logos/Chipr.svg",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/SVG%20Logos/Ecoshield.svg",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/SVG%20Logos/Moxie.svg",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/SVG%20Logos/Space.svg",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/SVG%20Logos/CH1DX3.svg",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/SVG%20Logos/SPWR.svg",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/SVG%20Logos/Greenix.svg",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/SVG%20Logos/Nusun.svg",
];

export function SimpleLogosMarquee() {
  const { isLightMode } = useTheme();

  const items = useMemo(() => [...LOGOS, ...LOGOS], []);
  const maskRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const logoClass = isLightMode
    ? "h-full w-full object-contain opacity-70 brightness-0"
    : "h-full w-full object-contain opacity-90 brightness-0 invert";

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
    let activeIdx = -1;
    let lastFeaturedIdx = -1;
    let hasExitedCenter = true;
    let rate = 1;

    const NORMAL_RATE = 1;
    const SLOW_RATE = 0.32;
    // Activate only when *very* close to center; clear after it leaves.
    const ENTER_DIST = Math.min(14, step * 0.1);
    const EXIT_DIST = Math.max(ENTER_DIST * 2.6, 38);

    const tick = (now: number) => {
      const maskRect = mask.getBoundingClientRect();
      const centerX = maskRect.width / 2;

      // Progress in one loop (0..1). Use currentTime to avoid layout thrash.
      const t = (animation.currentTime ?? 0) as number;
      const loopT = (t % durationMs) / durationMs;
      const offsetPx = loopT * (step * N); // track shifts by N items for -50%

      // Which item center is closest to the viewport center?
      const approx = Math.round((centerX + offsetPx - itemW / 2) / step);
      const idx = ((approx % N) + N) % N;

      // Compute current distance-from-center for hysteresis gating.
      const itemCenterX = (idx * step + itemW / 2) - offsetPx;
      const dist = Math.abs(itemCenterX - centerX);
      if (dist > EXIT_DIST) hasExitedCenter = true;

      // Clear active once it leaves the center zone.
      if (activeIdx !== -1) {
        const activeCenterX = (activeIdx * step + itemW / 2) - offsetPx;
        const activeDist = Math.abs(activeCenterX - centerX);
        if (activeDist > EXIT_DIST) {
        children[activeIdx]?.classList.remove("is-active");
        children[activeIdx + N]?.classList.remove("is-active");
        activeIdx = -1;
        }
      }

      // Activate only once per pass, right at center.
      if (activeIdx === -1 && hasExitedCenter && idx !== lastFeaturedIdx && dist < ENTER_DIST) {
        children[idx]?.classList.add("is-active");
        children[idx + N]?.classList.add("is-active");
        activeIdx = idx;
        lastFeaturedIdx = idx;
        hasExitedCenter = false;
      }

      // Slow exactly while active (pass-through).
      const targetRate = activeIdx !== -1 ? SLOW_RATE : NORMAL_RATE;
      rate += (targetRate - rate) * 0.22;
      animation.playbackRate = rate;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      animation.cancel();
      if (activeIdx !== -1) {
        children[activeIdx]?.classList.remove("is-active");
        children[activeIdx + N]?.classList.remove("is-active");
      }
    };
  }, [isLightMode]);

  return (
    <div className="w-full mt-5 md:mt-6" aria-label="Logos">
      <div className="simple-logo-marquee" style={{ ["--speed" as any]: "72s" }}>
        <div className="simple-logo-marquee__mask" ref={maskRef}>
          <div className="simple-logo-marquee__track" ref={trackRef}>
            {items.map((src, idx) => (
              <div className="simple-logo-marquee__item" key={`${src}-${idx}`}>
                <ImageWithFallback
                  src={src}
                  alt=""
                  className={logoClass}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

