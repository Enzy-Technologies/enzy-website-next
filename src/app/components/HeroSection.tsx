"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "motion/react";
import { Sparkles, ArrowRight, ArrowDown, CornerDownRight, Star, X, CheckCircle2 } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { BOOK_DEMO_HREF, BOOK_DEMO_CTA_STYLE, LP_DEMO_FORM_ID } from "@/app/lib/booking";
import { SimpleLogosMarquee } from "@/app/components/SimpleLogosMarquee";
import {
  PhoneInHand,
  IMAGE_ASPECT,
  PHONE_BEZEL_WIDTH_FRAC,
  PHONE_CENTER_X_FRAC,
  PHONE_CENTER_Y_FRAC,
  PHONE_HEIGHT_FRAC,
} from "@/app/playground/PhoneInHand";
import { InteractivePhoneV2 } from "@/app/playground/interactive/InteractivePhoneV2";
import { LpBookDemoInline } from "@/app/components/landing/LpBookDemoScroll";
import { BookDemoPage } from "@/app/components/BookDemo/BookDemoPage";
import { LpHeroVideo } from "@/app/components/landing/LpHeroVideo";
import type { LpVariant } from "@/app/lib/lpExperiment";

import { BlurReveal } from "./BlurReveal";

// Time (seconds) at which a char-mode BlurReveal starting at `startDelay` fully
// settles, matching BlurReveal's internal timing (0.03s per-character stagger +
// 0.8s per-character duration). Used to start the italic phrase exactly when the
// lead line finishes, so the reveal reads as one continuous motion.
// NOTE: HERO_LEAD_ALT must mirror the lead text rendered below.
const charRevealEnd = (text: string, startDelay = 0.1) =>
  startDelay + Math.max(0, text.replace(/\s+/g, "").length - 1) * 0.03 + 0.8;

const HERO_LEAD_ALT = "Performance has never had an operating system. ";

// How early (in seconds) the italic phrase starts before the lead line fully
// settles. 0 = waits for the lead to completely finish (feels gappy); higher =
// more overlap (feels rushed). ~0.5 overlaps just the lead's final settle tail
// so the two reveals flow as one continuous motion.
const LEAD_OVERLAP = 0.8;






function useCountUp(target: number, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, durationMs, prefersReducedMotion]);

  return { value, ref };
}

const LP_VALUE_BULLETS = [
  "Live visibility between touches — managers coach what matters, reps act faster.",
  "Turn CRM signal into playbooks, nudges, and competitions without another dashboard.",
  "Teams report measurable lift while reps stay in their existing workflows.",
];

// Target on-screen width of the phone bezel inside the LP hero. The Playground
// zooms its phone to fill the viewport; the static LP version can't, so we size
// the composition from a fixed, readable phone width (capped, but shrinking a
// little on very narrow phones) and let the hand/arm bleed past and clip.
const LP_PHONE_BEZEL_W = 260;
// Render the composition for a desktop-ish width on the server + first paint so
// hydration matches; the effect corrects to the real width on mount (the phone
// size only changes below ~383px wide, so there's effectively no layout shift).
const LP_DEFAULT_VW = 1280;
// Fraction of the hand-image height at which the phone bezel's top edge sits.
const PHONE_BEZEL_TOP_FRAC = 0.123;
// Target vertical gap (px) between the subtext and the top of the phone bezel.
const LP_PHONE_GAP = 60;

/**
 * Inline iPhone-in-hand for the `/lp/*` hero. Renders the SAME `PhoneInHand`
 * composition the home-page Playground uses — referenced, not copied — so the
 * hand artwork, bezel calibration, and live phone UI all update here whenever
 * they change on home. (The scroll-driven zoom/pin stays exclusive to the
 * Playground; this is the at-rest composition on its own.)
 */
function LpHeroPhone() {
  const [vw, setVw] = useState(LP_DEFAULT_VW);

  useEffect(() => {
    const measure = () => setVw(window.innerWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const phoneBezelW = Math.min(LP_PHONE_BEZEL_W, vw * 0.68);
  const cw = phoneBezelW / PHONE_BEZEL_WIDTH_FRAC;
  const ch = cw / IMAGE_ASPECT;
  // Sit the phone a fixed distance below the subtext. The phone bezel begins
  // ~12.3% down the hand image (the rest is transparent), so pulling the
  // composition up by (that offset − the target gap) lands the bezel exactly
  // LP_PHONE_GAP px under the subtext, regardless of the composition's height.
  // The overlapped region is transparent, so it never covers the copy above.
  const topPull = Math.max(0, ch * PHONE_BEZEL_TOP_FRAC - LP_PHONE_GAP);

  // Phone-screen geometry within the composition (mirrors PhoneInHand's math),
  // so the "Tap to try" cue can anchor just above the live screen's top edge.
  const screenCenterX = cw * PHONE_CENTER_X_FRAC;
  const screenTop = ch * (PHONE_CENTER_Y_FRAC - PHONE_HEIGHT_FRAC / 2);

  return (
    // No `overflow-hidden`: when the composition is wider than the frame (narrow
    // screens), the hand/arm bleeds past the viewport edges and is clipped
    // off-screen by SiteShell's `overflow-x-clip` — so it reads as running off
    // the screen rather than cut at a hard inner edge. The frame still reserves
    // the vertical space (height: ch); the composition is taken out of flow and
    // centered so the phone stays centered on the viewport.
    <div
      className="relative mx-auto"
      style={{ width: "100%", maxWidth: cw, height: ch, marginTop: -topPull }}
    >
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{ width: cw, height: ch }}
      >
        <PhoneInHand
          cw={cw}
          ch={ch}
          interactive
          tapHint
          showUnderlay={false}
          screenOffsetX={-1}
          screenOffsetY={2}
          screenGrow={1}
        >
          <InteractivePhoneV2 interactive tapHint />
        </PhoneInHand>

        {/* "Tap to try" cue: a solid white pill with an amber border (matching
            the phone's pulse indicators). Floats in the gap above the phone with
            a gentle bob; a downward arrow points at the live UI. */}
        <motion.div
          className="pointer-events-none absolute z-40"
          style={{ left: screenCenterX, top: screenTop - 16, transform: "translate(-50%, -100%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.6 },
            y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span className="flex items-center gap-1 rounded-full border border-[#FF9F0A]/45 bg-white px-2 py-1 shadow-[0_10px_28px_rgba(11,15,20,0.14)]">
            <span className="font-[ui-monospace,'SF_Mono','Menlo',monospace] text-[13px] uppercase leading-none tracking-[-0.4px] [word-spacing:-3px] text-brand-dark">
              Tap to try
            </span>
            <ArrowDown size={14} strokeWidth={2.25} className="text-[#FF9F0A]" aria-hidden />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function HeroSectionLp({ experimentVariant }: { experimentVariant?: LpVariant }) {
  const showVideo = experimentVariant === "B";
  return (
    <section className="relative w-full">
      {/* No opaque background here on purpose: the page-wide cream + PixelCanvas
          (from SiteShell) show through, so the hero blends into the sections
          below with no white→cream seam — matching the main site hero. */}
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-12 md:pb-12 md:pt-16 lg:pt-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6 md:gap-8">
          <h1
            className="font-inter font-bold tracking-[-0.05em] leading-[1.02] text-brand-dark dark:text-brand-light text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px]"
          >
            <BlurReveal as="span" delay={0.1}>
              Performance has never had an operating system.{" "}
            </BlurReveal>
            <BlurReveal as="span" delay={charRevealEnd(HERO_LEAD_ALT) - LEAD_OVERLAP} className="font-ivyora font-medium italic">
              Until now.
            </BlurReveal>
          </h1>

          <p
            className="max-w-[640px] font-inter text-[17px] leading-[1.55] md:text-[19px] text-black/72 dark:text-white/68"
          >
            The platform your sales team actually wants to open. Live business intelligence meets social media — where high-performance culture builds in real time and AI tells you what to do next, backed by more sales performance data than any tool in existence.
          </p>
        </div>
        
        <div className={`w-full ${showVideo ? "mt-16 md:mt-24" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="relative mx-auto w-full max-w-[1120px]"
          >
            {/* Wide ambient glow for the playground phone (variant A). The video
                (variant B) carries its own green-tinted frame shadow, so it skips
                this to avoid a double glow. */}
            {!showVideo && (
              <div
                className="pointer-events-none absolute inset-x-[6%] -inset-y-[3%] lg:inset-x-[22%] lg:-inset-y-[4%] rounded-[44%] opacity-95 blur-3xl md:blur-[64px]"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 54%, rgba(25,173,125,0.42), transparent 70%)",
                }}
                aria-hidden
              />
            )}
            {showVideo ? <LpHeroVideo /> : <LpHeroPhone />}
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24 w-full max-w-3xl mx-auto">
          <div id="lp-demo" className="scroll-mt-8 w-full">
            <BookDemoPage hideTestimonials hideText formId={LP_DEMO_FORM_ID} lpVariant={experimentVariant} />
          </div>
        </div>

        <div className="mt-12 md:mt-16 w-full max-w-4xl mx-auto text-center">
          <p
            className="mb-4 font-inter text-[15px] font-semibold uppercase tracking-[0.18em] md:text-[15px] text-black/55 dark:text-white/55"
          >
            Serving 236k users
          </p>
          <div className="-mx-1 [&_.simple-logo-marquee]:mt-0">
            <SimpleLogosMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSectionDefault() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full pt-[12px] pb-6 lg:pt-[28px] lg:pb-0 lg:h-[calc(100vh-88px)] flex items-center">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Column: Content. On desktop the column spans to the page's
              horizontal center (lg:w-1/2, shrink-0 so the gap eats into the
              spacer, not the text) and drops its max-width cap so the headline
              fills the width instead of wrapping tightly. */}
          <div className="mobile-hero-reveal flex flex-col gap-6 lg:gap-[clamp(0.75rem,2svh,1.75rem)] text-center lg:text-left items-center lg:items-start max-w-3xl mx-auto lg:mx-0 lg:max-w-none w-full lg:w-1/2 lg:shrink-0 lg:pl-8 xl:pl-12 z-20">
            <h1
              className="font-inter font-bold tracking-[-0.05em] leading-[1.02] text-brand-dark dark:text-brand-light text-[40px] sm:text-[52px] md:text-[64px] lg:text-[clamp(2.25rem,calc(3.4vw_+_0.8svh),6rem)]"
            >
              <BlurReveal as="span" delay={0.1}>Performance has never had an operating system. </BlurReveal>
              <BlurReveal as="span" delay={charRevealEnd(HERO_LEAD_ALT) - LEAD_OVERLAP} className="font-ivyora font-medium italic">Until now.</BlurReveal>
            </h1>

            <p
              className="font-inter text-[16px] md:text-[18px] lg:text-[clamp(1rem,calc(0.4vw_+_0.7svh),1.25rem)] leading-[1.55] max-w-[640px] mx-auto lg:mx-0 text-black/70 dark:text-white/65"
            >
              The platform your sales team actually wants to open. Live business intelligence meets social media — where high-performance culture builds in real time and AI tells you what to do next, backed by more sales performance data than any tool in existence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1 pb-2 w-full">
              <CTAButton
                href={BOOK_DEMO_HREF}
                variant="primary"
                className={`book-demo-cta-marker w-full max-w-[260px] sm:max-w-none sm:w-auto text-[15px] md:text-[16px] h-[48px] md:h-[52px] pl-7 md:pl-8 pr-6 md:pr-7 gap-2 ${BOOK_DEMO_CTA_STYLE}`}
              >
                Book a Demo
                <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
              </CTAButton>
            </div>

            <div className="w-full lg:max-w-[560px] mx-auto lg:mx-0">
              <p
                className="font-inter text-[15px] md:text-[15px] tracking-[0.18em] uppercase font-semibold mb-3 text-black/55 dark:text-white/55"
              >
                Serving 236k users
              </p>
              <SimpleLogosMarquee />
            </div>
          </div>
          
          {/* Right Column: Spacer for Playground Phone. Takes the remaining
              width after the text column + gap so the phone overlay has the
              right half of the page to itself. */}
          <div className="hidden lg:block lg:flex-1">
          </div>

        </div>
      </div>
    </section>
  );
}

export function HeroSection({
  variant = "default",
  experimentVariant,
}: { variant?: "default" | "lp"; experimentVariant?: LpVariant } = {}) {
  if (variant === "lp") return <HeroSectionLp experimentVariant={experimentVariant} />;
  return <HeroSectionDefault />;
}



