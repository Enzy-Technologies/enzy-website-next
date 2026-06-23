"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MEDIA } from "../lib/breakpoints";

/**
 * Auto-playing, looping walkthrough of the Competitions & Incentives feature,
 * framed in a phone (mobile) or iPad (desktop). It threads three real app
 * screens together as one screen with iOS-style push navigation:
 *
 *   Incentives list → (tap the Milestone card) → Milestone detail
 *     → (tap back) → list → (tap the Tournament card) → Bracket
 *     → (tap back) → list → repeat
 *
 * All three screens are static captures; the motion is the tap pulse + the
 * push/pop transition between them. Tap targets are positioned as fractions of
 * the capture, so a pulse lands on the same spot at any rendered size. The
 * card centers were measured directly off each list capture — and because the
 * iPad list is a two-column grid (tournament top-left, milestone top-right)
 * rather than the phone's single stacked column, the targets differ per form
 * factor.
 */

const SHOTS = {
  phone: {
    list: "/system/incentives-list.png",
    milestone: "/system/incentives-milestone.png",
    bracket: "/system/incentives-bracket.png",
  },
  ipad: {
    list: "/system/incentives-list-ipad.png",
    milestone: "/system/incentives-milestone-ipad.png",
    bracket: "/system/incentives-bracket-ipad.png",
  },
} as const;

const GREEN = "#0DA071";

type Screen = "list" | "milestone" | "bracket";
type Tap = "milestone-card" | "tournament-card" | "back" | null;

// Tap targets as fractions of the screen: the two list cards (centered on each
// card's artwork) + the detail back button (top-left). Phone stacks the cards
// in one column; iPad lays them out as a two-column grid on the first row.
const TAP = {
  phone: {
    "tournament-card": { x: 0.5, y: 0.305 },
    "milestone-card": { x: 0.5, y: 0.612 },
    back: { x: 0.1, y: 0.05 },
  },
  ipad: {
    "tournament-card": { x: 0.255, y: 0.225 },
    "milestone-card": { x: 0.745, y: 0.225 },
    back: { x: 0.05, y: 0.04 },
  },
} as const;

/** Tracks whether the viewport is at the desktop breakpoint. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MEDIA.desktop);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/** Expanding tap ripple shown at a screen-fraction position before a nav. */
function TapPulse({ x, y }: { x: number; y: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute z-30 rounded-full border-2"
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        width: 46,
        height: 46,
        marginLeft: -23,
        marginTop: -23,
        borderColor: GREEN,
        background: "rgba(13,160,113,0.18)",
      }}
      initial={{ scale: 0.5, opacity: 0.9 }}
      animate={{ scale: 1.7, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
}

export function CompetitionsMockup() {
  const hostRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const [inView, setInView] = useState(false);
  const [screen, setScreen] = useState<Screen>("list");
  const [tap, setTap] = useState<Tap>(null);

  // On desktop, frame the iPad captures in a roomier tablet shell; on mobile
  // keep the phone. Each form factor has its own captures + tap targets.
  const shots = isDesktop ? SHOTS.ipad : SHOTS.phone;
  const taps = isDesktop ? TAP.ipad : TAP.phone;

  // Run the loop only while on screen.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setScreen("list");
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
      while (!cancelled) {
        // --- Incentives list ---
        setScreen("list");
        setTap(null);
        await sleep(1600);
        if (cancelled) return;

        // Tap the Milestone card → push the milestone detail.
        setTap("milestone-card");
        await sleep(560);
        if (cancelled) return;
        setTap(null);
        setScreen("milestone");
        await sleep(3000);
        if (cancelled) return;

        // Tap back → pop to the list.
        setTap("back");
        await sleep(560);
        if (cancelled) return;
        setTap(null);
        setScreen("list");
        await sleep(1000);
        if (cancelled) return;

        // Tap the Tournament card → push the bracket.
        setTap("tournament-card");
        await sleep(560);
        if (cancelled) return;
        setTap(null);
        setScreen("bracket");
        await sleep(3000);
        if (cancelled) return;

        // Tap back → pop to the list, then loop.
        setTap("back");
        await sleep(560);
        if (cancelled) return;
        setTap(null);
        setScreen("list");
        await sleep(400);
      }
    }

    run();
    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, [inView]);

  const detail = screen === "list" ? null : screen;
  const frame = isDesktop
    ? "max-w-[440px] aspect-[1668/2388] rounded-[28px]"
    : "max-w-[300px] aspect-[393/852] rounded-[44px]";
  const sizes = isDesktop ? "440px" : "(max-width: 768px) 90vw, 300px";

  return (
    <div className="flex justify-center">
      <div
        ref={hostRef}
        className={`relative w-full overflow-hidden bg-white ${frame}`}
      >
        {/* Root: the incentives list. Always mounted; detail screens push over it. */}
        <ImageWithFallback
          src={shots.list}
          alt="Competitions & incentives list"
          sizes={sizes}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        {/* Detail screen pushes in from the right and out to the right. */}
        <AnimatePresence>
          {detail && (
            <motion.div
              key={detail}
              className="absolute inset-0 bg-white"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
            >
              <ImageWithFallback
                src={shots[detail]}
                alt={detail === "milestone" ? "Milestone incentive detail" : "Tournament bracket"}
                sizes={sizes}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap pulse, positioned per target. Rendered last so it sits on top. */}
        {tap && <TapPulse x={taps[tap].x} y={taps[tap].y} />}

        {/* Device edge — matches the other previews. */}
        <div
          className={`pointer-events-none absolute inset-0 z-40 border border-black/12 dark:border-white/15 ${
            isDesktop ? "rounded-[28px]" : "rounded-[44px]"
          }`}
        />
      </div>
    </div>
  );
}

export default CompetitionsMockup;
