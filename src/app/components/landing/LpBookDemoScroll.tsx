"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import { CTAButton } from "@/app/components/CTAButton";
import { useTheme } from "@/app/components/ThemeProvider";

/**
 * Landing CTA pattern aligned with common high-converting SaaS LP behavior:
 * - One obvious primary CTA in-flow (hero area); it scrolls away naturally with content.
 * - A persistent dock appears only after that primary scrolls above the viewport — avoids
 *   duplicate CTAs and twitchy “sticky on first pixel” behavior.
 * - Dock chrome stays readable (blur + border); the **sticky pill itself** carries visual
 *   weight (size, glow, hierarchy) so mobile and desktop both feel deliberate.
 */

type ShellCtx = {
  registerPrimaryCta: (el: HTMLElement | null) => void;
  href: string;
  label: string;
};

const BookDemoScrollContext = createContext<ShellCtx | null>(null);

function useBookDemoShell() {
  return useContext(BookDemoScrollContext);
}

type ShellProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

export function LpBookDemoScrollShell({ href, label, children }: ShellProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [docked, setDocked] = useState(false);

  const registerPrimaryCta = useCallback((el: HTMLElement | null) => {
    setAnchorEl(el);
  }, []);

  useEffect(() => {
    if (!anchorEl || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const scrolledPastPrimary =
          !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setDocked(scrolledPastPrimary);
      },
      { threshold: [0, 0.01, 1], rootMargin: "0px" }
    );

    obs.observe(anchorEl);
    return () => obs.disconnect();
  }, [anchorEl]);

  const value = useMemo(
    () => ({ registerPrimaryCta, href, label }),
    [registerPrimaryCta, href, label]
  );

  return (
    <BookDemoScrollContext.Provider value={value}>
      {children}
      <LpBookDemoDock docked={docked} href={href} label={label} />
    </BookDemoScrollContext.Provider>
  );
}

/** Primary in-flow CTA — register its wrapper so the dock only appears once this leaves upward. */
export function LpBookDemoInline({
  className,
  id,
}: {
  className?: string;
  /** Anchor for in-page jumps (e.g. hero “Book a demo”). */
  id?: string;
} = {}) {
  const ctx = useBookDemoShell();

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      ctx?.registerPrimaryCta(node);
    },
    [ctx]
  );

  if (!ctx) return null;

  const { href, label } = ctx;

  return (
    <div ref={ref} id={id} className={cn("w-full scroll-mt-8", className)}>
      <div className="w-full pt-4 pb-2 md:pt-6 md:pb-4">
        <CTAButton
          href={href}
          variant="primary"
          className="w-full max-w-none justify-center rounded-full py-6 sm:py-7 md:py-8 px-8 sm:px-12 md:px-14 gap-3 sm:gap-4 font-inter font-extrabold text-[14px] sm:text-[17px] md:text-[19px] uppercase tracking-[0.14em] sm:tracking-[0.15em] shadow-[0_0_52px_rgba(25,173,125,0.42)] hover:!opacity-100 active:scale-[0.99]"
        >
          {label}{" "}
          <ArrowRight className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={2.25} aria-hidden />
        </CTAButton>
      </div>
    </div>
  );
}

function LpBookDemoDock({
  docked,
  href,
  label,
}: {
  docked: boolean;
  href: string;
  label: string;
}) {
  const { isLightMode } = useTheme();
  const reduceMotion = useReducedMotion();

  const dockBg = isLightMode
    ? "bg-[#faf9f6]/92 supports-[backdrop-filter]:bg-[#faf9f6]/78"
    : "bg-[#0b0f14]/92 supports-[backdrop-filter]:bg-[#0b0f14]/78";

  const border = isLightMode ? "border-black/[0.08]" : "border-white/[0.10]";

  return (
    <AnimatePresence>
      {docked ? (
        <motion.div
          key="lp-demo-dock"
          role="region"
          aria-label={`${label} — sticky action`}
          initial={reduceMotion ? false : { y: 56, opacity: 0 }}
          animate={reduceMotion ? {} : { y: 0, opacity: 1 }}
          exit={reduceMotion ? {} : { y: 56, opacity: 0 }}
          transition={
            reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34, mass: 0.85 }
          }
          className={cn(
            "fixed bottom-0 left-0 right-0 z-[100] pointer-events-none",
            "flex flex-col items-center px-4 sm:px-8",
            "pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:pt-5",
            "border-t backdrop-blur-xl backdrop-saturate-150",
            dockBg,
            border
          )}
        >
          {/* Accent strip — draws the eye without competing with content */}
          <div
            className="pointer-events-none mb-3 sm:mb-4 h-[3px] w-[min(100%,420px)] shrink-0 rounded-full bg-gradient-to-r from-transparent via-[#19ad7d]/85 to-transparent opacity-95 sm:w-[min(100%,520px)] md:w-[min(100%,680px)]"
            aria-hidden
          />

          <div className="pointer-events-none relative w-full max-w-xl md:max-w-2xl lg:max-w-[42rem]">
            {/* Halo behind pill — reads strong on light + dark */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[140%] w-[108%] rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(25,173,125,0.42)_0%,rgba(25,173,125,0.12)_45%,transparent_72%)] blur-xl sm:h-[145%] sm:w-[112%] md:blur-2xl"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-x-[8%] -bottom-6 top-[55%] rounded-[999px] bg-[#19ad7d]/25 blur-3xl opacity-70 md:inset-x-[12%] md:opacity-90" aria-hidden />

            <CTAButton
              href={href}
              variant="primary"
              className={cn(
                "relative z-[1] pointer-events-auto w-full justify-center rounded-full font-inter font-extrabold uppercase hover:!opacity-100 active:scale-[0.99]",
                /* Impact: hero-adjacent glow + crisp ring */
                "shadow-[0_0_0_1px_rgba(255,255,255,0.35)_inset,0_12px_40px_-10px_rgba(25,173,125,0.55),0_0_56px_-8px_rgba(25,173,125,0.45)]",
                "ring-[1.5px] ring-[#19ad7d]/35 ring-offset-2 md:ring-2 md:ring-[#19ad7d]/40",
                isLightMode ? "ring-offset-[#faf9f6]" : "ring-offset-[#0b0f14]",
                /* Mobile: wide + thumb-friendly */
                "gap-2.5 sm:gap-3 px-10 py-[17px] text-[13px] tracking-[0.12em] sm:px-12 sm:py-[18px] sm:text-[14px] sm:tracking-[0.13em]",
                /* Desktop: wider pill, slightly larger type */
                "md:gap-3.5 md:px-14 md:py-5 md:text-[15px] md:tracking-[0.14em] lg:py-[22px] lg:text-base lg:tracking-[0.145em]"
              )}
            >
              {label}{" "}
              <ArrowRight
                className="shrink-0 w-[18px] h-[18px] sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]"
                strokeWidth={2.35}
                aria-hidden
              />
            </CTAButton>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
