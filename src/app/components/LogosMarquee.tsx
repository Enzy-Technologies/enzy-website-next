"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "motion/react";

export type LogoSlide = {
  url: string;
  summary: string;
};

const PAUSE_MS = 2000;
const COOLDOWN_MS = 600;
const PROXIMITY_PX = 8;

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
    () => logos.map((l, i) => ({ ...l, _id: `logo-${i}` })),
    [logos],
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const originalsRef = useRef<HTMLElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const cooldownUntilRef = useRef(new WeakMap<HTMLElement, number>());
  const pausedRef = useRef(false);

  const [paused, setPaused] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [hiddenKey, setHiddenKey] = useState<string | null>(null);
  const [spotlight, setSpotlight] = useState<{
    url: string;
    html: string;
  } | null>(null);

  const isNusunSpotlight = useMemo(() => {
    const url = spotlight?.url ?? "";
    return /\/Nusun\.svg(\?.*)?$/i.test(url) || /nusun/i.test(url);
  }, [spotlight?.url]);

  const clearRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const showSpotlight = useCallback(
    (item: HTMLElement) => {
      const slideIndex = Number(item.dataset.slideIndex);
      const logoId = item.dataset.logoId ?? "";
      const meta = slides.find((s) => s._id === logoId);
      if (!meta || Number.isNaN(slideIndex)) return;

      pausedRef.current = true;
      setPaused(true);
      setHiddenKey(String(item.dataset.marqueeKey ?? ""));

      setSpotlight({
        url: meta.url,
        html: meta.summary,
      });
      setSpotlightOpen(true);

      // Close and resume
      window.setTimeout(() => {
        setSpotlightOpen(false);
        window.setTimeout(() => {
          setSpotlight(null);
        }, 250);

        setPaused(false);
        pausedRef.current = false;
        setHiddenKey(null);

        // cooldown for this item
        cooldownUntilRef.current.set(item, Date.now() + COOLDOWN_MS);
      }, PAUSE_MS);
    },
    [slides],
  );

  const checkCenter = useCallback(() => {
    if (!pausedRef.current) {
      const viewportCenter = window.innerWidth / 2;
      const items = originalsRef.current;
      for (const item of items) {
        const until = cooldownUntilRef.current.get(item) ?? 0;
        if (until && Date.now() < until) continue;

        const r = item.getBoundingClientRect();
        const itemCenter = r.left + r.width / 2;
        if (Math.abs(itemCenter - viewportCenter) <= PROXIMITY_PX) {
          showSpotlight(item);
          break;
        }
      }
    }

    rafRef.current = requestAnimationFrame(checkCenter);
  }, [showSpotlight]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    // Capture the first half only (originals)
    const nodes = Array.from(
      track.querySelectorAll<HTMLElement>("[data-marquee-item='true']"),
    );
    originalsRef.current = nodes.slice(0, slides.length);

    rafRef.current = requestAnimationFrame(checkCenter);

    const onVis = () => {
      if (document.hidden) {
        clearRaf();
      } else {
        rafRef.current = requestAnimationFrame(checkCenter);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      clearRaf();
    };
  }, [prefersReducedMotion, slides.length, checkCenter, clearRaf]);

  if (prefersReducedMotion) {
    return (
      <div className="marquee" aria-label="Partner logos">
        <div className="marquee__track" style={{ animation: "none" }}>
          {slides.map((logo) => (
            <div
              key={logo._id}
              className={`marquee__item ${
                isLightMode ? "brightness-0" : "brightness-0 invert"
              }`}
            >
              <img
                src={logo.url}
                alt=""
                className="h-full w-full object-contain pointer-events-none"
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
    <>
      <div
        className={`marquee ${paused ? "is-paused" : ""}`}
        aria-label="Partner logos"
      >
        <div className="marquee__mask">
          <div ref={trackRef} className="marquee__track">
            {[...slides, ...slides].map((logo, i) => (
              <div
                key={`${logo._id}-${i}`}
                data-marquee-item="true"
                data-marquee-key={`${logo._id}-${i}`}
                data-slide-index={i}
                data-logo-id={logo._id}
                className={`marquee__item ${isLightMode ? "brightness-0" : "brightness-0 invert"} ${paused && hiddenKey === `${logo._id}-${i}` ? "opacity-0" : ""}`}
              >
                <img
                  src={logo.url}
                  alt=""
                  className="h-full w-full object-contain pointer-events-none select-none"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Spotlight card (anchored to marquee, no scrim) */}
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 z-20 w-[min(340px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            spotlightOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!spotlightOpen}
        >
          <motion.div
            initial={false}
            animate={
              spotlightOpen
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.97 }
            }
            transition={
              spotlightOpen
                ? { type: "spring", stiffness: 280, damping: 26, mass: 0.9 }
                : { duration: 0.22, ease: [0.4, 0, 0.2, 1] }
            }
            style={{ transformOrigin: "50% 50%" }}
            className={`liquid-glass w-full rounded-[18px] border px-7 py-7 text-center ${
              isLightMode
                ? "border-black/10 text-[#0b0f14]"
                : "border-white/12 text-white"
            }`}
          >
            {spotlight ? (
              <>
                <div className="mb-4 flex items-center justify-center">
                  <img
                    src={spotlight.url}
                    alt=""
                    className={`h-11 w-[min(176px,70%)] object-contain ${
                      isLightMode ? "brightness-0" : "brightness-0 invert"
                    }`}
                    draggable={false}
                  />
                </div>
                <p
                  className={`m-0 font-['Inter'] text-[14px] ${
                    isNusunSpotlight ? "leading-snug" : "leading-relaxed"
                  } ${isLightMode ? "text-black/65" : "text-white/70"}`}
                  dangerouslySetInnerHTML={{ __html: spotlight.html }}
                />
              </>
            ) : null}
          </motion.div>
        </div>
      </div>
    </>
  );
}
