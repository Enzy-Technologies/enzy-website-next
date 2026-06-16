"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/**
 * Mostly-static rep profile, framed in a phone. The two captures (Badges and
 * Reports) share an identical top half — photo, name, Challenge/Settings, and
 * the tab row — so crossfading between them reads as a tab switch while the top
 * stays perfectly still. A tap pulse lands on the target tab just before each
 * switch, looping Badges → Reports → Badges.
 */

const SCREEN_BG = "#faf9f6";

// Only the region below the tab row (~56% down) crossfades; everything above
// — photo, name, Challenge/Settings — stays on the static base layer.
const BOTTOM_MASK = "linear-gradient(to bottom, transparent 53%, #000 56%)";

// Tab centers as fractions of the 393×852 screen (measured from the capture).
const TAB_Y = 488 / 852;
const TAB_X: Record<Tab, number> = {
  badges: 53.5 / 393,
  reports: 134.5 / 393,
};

type Tab = "badges" | "reports";

/** Expanding tap ripple shown over a tab just before it's selected. */
function TapPulse({ x, y }: { x: number; y: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute z-20 rounded-full border-2 border-[#0DA071]"
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        width: 40,
        height: 40,
        marginLeft: -20,
        marginTop: -20,
        background: "rgba(13,160,113,0.16)",
      }}
      initial={{ scale: 0.5, opacity: 0.9 }}
      animate={{ scale: 1.7, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
}

export function ProfileMockup() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [tab, setTab] = useState<Tab>("badges");
  const [tap, setTap] = useState<Tab | null>(null);

  // Only run the toggle while on screen.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTab("badges");
      setTap(null);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        timers.push(window.setTimeout(res, ms));
      });

    async function run() {
      // Always start on Badges.
      setTab("badges");
      setTap(null);
      while (!cancelled) {
        await sleep(2400);
        if (cancelled) return;
        setTap("reports"); // tap pulse on the Reports tab
        await sleep(520);
        if (cancelled) return;
        setTab("reports");
        setTap(null);

        await sleep(2400);
        if (cancelled) return;
        setTap("badges"); // tap pulse on the Badges tab
        await sleep(520);
        if (cancelled) return;
        setTab("badges");
        setTap(null);
      }
    }

    run();
    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, [inView]);

  return (
    <div className="flex justify-center">
      <div
        ref={hostRef}
        className="relative w-full max-w-[300px] aspect-[393/852] overflow-hidden rounded-[44px]"
        style={{ background: SCREEN_BG }}
      >
        {/* Static base — the badges screen always holds the (identical) top
            half at full opacity, so the photo/name never dip during a swap. */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/system/profile-badges.png"
            alt="Rep profile — badges"
            sizes="(max-width: 768px) 90vw, 300px"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </div>
        {/* Reports content crossfades in over only the region below the tabs;
            the top half is masked out so just the content area swaps. */}
        <motion.div
          className="absolute inset-0"
          style={{ maskImage: BOTTOM_MASK, WebkitMaskImage: BOTTOM_MASK }}
          animate={{ opacity: tab === "reports" ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <ImageWithFallback
            src="/system/profile-reports.png"
            alt="Rep profile — reports"
            sizes="(max-width: 768px) 90vw, 300px"
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        </motion.div>

        {/* Soften the very bottom edge (the Reports capture cuts mid-content). */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[8%]"
          style={{
            background: `linear-gradient(to top, ${SCREEN_BG}, rgba(250,249,246,0))`,
          }}
        />

        {tap && <TapPulse x={TAB_X[tap]} y={TAB_Y} />}

        {/* Device edge — matches the leaderboard preview's border. Rendered on
            top so the bottom fade can't break the line. */}
        <div className="pointer-events-none absolute inset-0 z-30 rounded-[44px] border border-black/12 dark:border-white/15" />
      </div>
    </div>
  );
}

export default ProfileMockup;
