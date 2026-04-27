"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";

export type LogoSlide = {
  url: string;
  summary: string;
};

const MARQUEE_HIGHLIGHT_MS = 2800;
const MARQUEE_CARD_EXIT_MS = 320;
const MARQUEE_COOLDOWN_MS = 600;

/** Trigger when this slide’s horizontal midpoint is within ALIGN_PX of viewport center. */
const ALIGN_PX = 26;
/** After a highlight, wait until every slide is farther than this from center before arming again (prevents duplicate fires). */
const REARM_MIN_DIST_PX = 130;

export function LogosMarquee({
  logos,
  isLightMode,
  prefersReducedMotion,
}: {
  logos: LogoSlide[];
  isLightMode: boolean;
  prefersReducedMotion: boolean;
}) {
  const slides = useMemo(
    () => logos.map((l, i) => ({ ...l, _id: `logo-${i}` as const })),
    [logos]
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const sessionActiveRef = useRef(false);
  /** Next allowed trigger time after a session ends (extra debounce). */
  const cooldownUntilRef = useRef(0);
  /** False after firing until the track “clears” the center zone (see REARM_MIN_DIST_PX). */
  const armedRef = useRef(true);
  const rafRef = useRef<number | null>(null);
  const highlightTimerRef = useRef<number | null>(null);
  const dismissTimerRef = useRef<number | null>(null);

  const [marqueePaused, setMarqueePaused] = useState(false);
  const [session, setSession] = useState<{
    slideIndex: number;
    url: string;
    summary: string;
  } | null>(null);
  const [cardShown, setCardShown] = useState(false);

  const clearTimers = useCallback(() => {
    if (highlightTimerRef.current !== null) {
      window.clearTimeout(highlightTimerRef.current);
      highlightTimerRef.current = null;
    }
    if (dismissTimerRef.current !== null) {
      window.clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const endSession = () => {
      setCardShown(false);
      dismissTimerRef.current = window.setTimeout(() => {
        dismissTimerRef.current = null;
        sessionActiveRef.current = false;
        setSession(null);
        setMarqueePaused(false);
        cooldownUntilRef.current = Date.now() + MARQUEE_COOLDOWN_MS;
        armedRef.current = false;
      }, MARQUEE_CARD_EXIT_MS);
    };

    const startSession = (slideIndex: number, logoId: string) => {
      const meta = slides.find((s) => s._id === logoId);
      if (!meta) return;

      sessionActiveRef.current = true;
      clearTimers();

      setMarqueePaused(true);
      setSession({
        slideIndex,
        url: meta.url,
        summary: meta.summary,
      });
      requestAnimationFrame(() => setCardShown(true));

      highlightTimerRef.current = window.setTimeout(() => {
        highlightTimerRef.current = null;
        endSession();
      }, MARQUEE_HIGHLIGHT_MS);
    };

    const tick = () => {
      if (!sessionActiveRef.current && Date.now() >= cooldownUntilRef.current) {
        const root = rootRef.current;
        if (root) {
          const centerX = window.innerWidth / 2;
          const nodes = root.querySelectorAll<HTMLElement>("[data-marquee-slide]");
          let bestDist = Number.POSITIVE_INFINITY;
          let bestSlideIndex = -1;
          let bestLogoId = "";

          nodes.forEach((node) => {
            const rect = node.getBoundingClientRect();
            const cx = (rect.left + rect.right) / 2;
            const dist = Math.abs(cx - centerX);
            const slideIndex = Number(node.dataset.marqueeSlide);
            const logoId = node.dataset.logoId ?? "";
            if (dist < bestDist && !Number.isNaN(slideIndex) && logoId) {
              bestDist = dist;
              bestSlideIndex = slideIndex;
              bestLogoId = logoId;
            }
          });

          if (bestDist > REARM_MIN_DIST_PX) {
            armedRef.current = true;
          }

          if (armedRef.current && bestSlideIndex >= 0 && bestDist <= ALIGN_PX) {
            armedRef.current = false;
            startSession(bestSlideIndex, bestLogoId);
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      clearTimers();
    };
  }, [prefersReducedMotion, slides, clearTimers]);

  if (prefersReducedMotion) {
    const sample = slides[0]?.summary ?? "Connects to your stack.";
    const firstLogo = slides[0];
    return (
      <div className="enzy-marquee relative w-full max-w-[100vw] overflow-visible px-4 pb-12 pt-4 sm:px-6">
        <div className="pointer-events-none absolute left-1/2 top-0 z-20 flex w-[min(72vw,260px)] -translate-x-1/2 justify-center sm:w-[min(64vw,280px)]">
          <div
            className={`liquid-glass mt-1 flex min-h-[112px] max-w-full flex-col items-center justify-center gap-2.5 rounded-2xl border px-4 pb-6 pt-5 text-center shadow-lg sm:px-5 ${
              isLightMode
                ? "border-black/10 text-[#0b0f14] shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
                : "border-white/10 text-white/95 shadow-[0_14px_50px_rgba(0,0,0,0.45)]"
            }`}
          >
            {firstLogo ? (
              <img
                src={firstLogo.url}
                alt=""
                className={`max-h-8 w-auto object-contain md:max-h-10 ${
                  isLightMode ? "brightness-0" : "brightness-0 invert"
                }`}
                draggable={false}
              />
            ) : null}
            <div className="flex w-full items-center justify-center gap-2">
              <span className="text-[#19ad7d]">•</span>
              <span className="font-['Inter'] text-[12px] font-semibold tracking-tight">{sample}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 whitespace-normal px-4 py-8">
          {slides.map((logo) => (
            <div
              key={logo._id}
              className={`relative flex items-center justify-center opacity-80 ${
                isLightMode ? "brightness-0" : "brightness-0 invert"
              }`}
            >
              <img
                src={logo.url}
                alt=""
                className="max-h-6 md:max-h-10 w-auto object-contain pointer-events-none"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className="enzy-marquee relative w-full max-w-[100vw] overflow-visible px-4 pb-14 pt-4 sm:px-6"
      style={{ ["--enzy-marquee-duration" as string]: "180s" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 z-20 flex w-[min(72vw,260px)] -translate-x-1/2 justify-center sm:w-[min(64vw,280px)]">
        {session ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={
              cardShown
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.94, y: 10 }
            }
            transition={
              cardShown
                ? { type: "spring", stiffness: 280, damping: 24, mass: 0.85 }
                : { duration: 0.28, ease: [0.4, 0, 0.2, 1] }
            }
            style={{ transformOrigin: "50% 50%" }}
            className="w-full"
            aria-live="polite"
          >
            <div
              className={`overflow-visible rounded-2xl border shadow-lg ${
                isLightMode
                  ? "border-black/12 bg-black/[0.02] shadow-[0_14px_44px_rgba(0,0,0,0.1)]"
                  : "border-white/12 bg-white/[0.03] shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
              }`}
            >
              <div
                className={`liquid-glass flex min-h-[112px] flex-col items-center justify-center gap-2.5 rounded-2xl border-0 px-4 pb-6 pt-5 sm:px-5 ${
                  isLightMode ? "text-[#0b0f14]" : "text-white/95"
                }`}
              >
                <img
                  src={session.url}
                  alt=""
                  className={`max-h-9 w-auto object-contain md:max-h-11 ${
                    isLightMode ? "brightness-0" : "brightness-0 invert"
                  }`}
                  draggable={false}
                />
                <div className="flex w-full max-w-[15rem] items-center justify-center gap-2 px-0.5 text-center leading-snug">
                  <span className="shrink-0 text-[#19ad7d]" aria-hidden>
                    •
                  </span>
                  <p className="font-['Inter'] text-[12px] font-semibold tracking-tight">{session.summary}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>

      <div
        className="relative w-full overflow-x-clip"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className={`enzy-marquee-track items-center whitespace-nowrap py-6 ${marqueePaused ? "is-paused" : ""}`}>
          {[...slides, ...slides].map((logo, i) => (
            <div
              key={`${logo._id}-${i}`}
              data-marquee-slide={i}
              data-logo-id={logo._id}
              className={`relative flex items-center justify-center mr-16 transition-opacity duration-200 md:mr-32 ${
                marqueePaused && session?.slideIndex === i ? "opacity-0" : "opacity-80"
              } ${isLightMode ? "brightness-0" : "brightness-0 invert"}`}
            >
              <img
                src={logo.url}
                alt=""
                className="max-h-6 md:max-h-10 w-auto object-contain pointer-events-none select-none"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
