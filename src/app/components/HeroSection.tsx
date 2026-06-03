"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "motion/react";
import { Sparkles, ArrowRight, CornerDownRight, Star, X, CheckCircle2 } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { BOOK_DEMO_HREF, LP_DEMO_FORM_ID } from "@/app/lib/booking";
import { SimpleLogosMarquee } from "@/app/components/SimpleLogosMarquee";
import { HeroVideoPlaceholder } from "@/app/components/HeroVideoPlaceholder";
import { LpBookDemoInline } from "@/app/components/landing/LpBookDemoScroll";
import { BookDemoPage } from "@/app/components/BookDemo/BookDemoPage";

import { BlurReveal } from "./BlurReveal";

// Time (seconds) at which a char-mode BlurReveal starting at `startDelay` fully
// settles, matching BlurReveal's internal timing (0.03s per-character stagger +
// 0.8s per-character duration). Used to start the italic phrase exactly when the
// lead line finishes, so the reveal reads as one continuous motion.
// NOTE: HERO_LEAD / HERO_LEAD_ALT must mirror the lead text rendered below.
const charRevealEnd = (text: string, startDelay = 0.1) =>
  startDelay + Math.max(0, text.replace(/\s+/g, "").length - 1) * 0.03 + 0.8;

const HERO_LEAD = "Performance has always been a game. ";
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

function HeroSectionLp() {
  return (
    <section className="relative w-full">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-28%,rgba(25,173,125,0.14),transparent_52%),linear-gradient(180deg,var(--color-surface-light)_0%,#ffffff_58%)] dark:bg-[radial-gradient(95%_72%_at_88%_-8%,rgba(25,173,125,0.17),transparent_56%),radial-gradient(72%_58%_at_4%_58%,rgba(25,173,125,0.09),transparent_62%),linear-gradient(180deg,#0b0f14_0%,#060809_100%)]"
        />
        <div
          className="absolute inset-x-0 top-0 h-[min(460px,50vh)] opacity-[0.42] [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(25,173,125,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(25,173,125,0.065) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-12 md:pb-12 md:pt-16 lg:pt-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6 md:gap-8">
          <h1
            className="font-inter font-bold tracking-[-0.05em] leading-[1.02] text-brand-dark dark:text-brand-light text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px]"
          >
            <BlurReveal as="span" delay={0.1}>
              Performance has always been a game.{" "}
            </BlurReveal>
            <BlurReveal as="span" delay={charRevealEnd(HERO_LEAD) - LEAD_OVERLAP} className="font-ivyora font-medium italic">
              Now there&rsquo;s an operating system for it.
            </BlurReveal>
          </h1>

          <p
            className="max-w-[640px] font-inter text-[17px] leading-[1.55] md:text-[19px] text-black/72 dark:text-white/68"
          >
            Enzy is the performance operating system for field sales — one that doesn&rsquo;t just visualize your data but tells you what to do with it. Live competitions, public leaderboards, real-time recognition, and AI backed by more sales performance data than any tool in existence.
          </p>
        </div>
        
        <div className="mt-12 md:mt-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="relative mx-auto w-full max-w-[min(100%,1000px)]"
          >
            <div
              className="pointer-events-none absolute -inset-[12%] rounded-[44%] opacity-80 blur-3xl md:blur-[56px]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 42%, rgba(25,173,125,0.24), transparent 72%)",
              }}
              aria-hidden
            />
            <div className="relative rounded-[28px] border border-[#19ad7d]/25 bg-gradient-to-br from-[#19ad7d]/20 via-transparent to-[#19ad7d]/10 p-[1px] shadow-[0_24px_80px_-24px_rgba(25,173,125,0.55)] sm:rounded-[32px] md:rounded-[36px]">
              <div
                className="overflow-hidden rounded-[27px] sm:rounded-[31px] md:rounded-[35px] bg-[#faf9f6] dark:bg-[#07090c]"
              >
                <HeroVideoPlaceholder
                  variant="lp"
                  embedded
                  id="product-video"
                  label="2-minute overview — full walkthrough lands here soon"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24 w-full max-w-3xl mx-auto">
          <div id="lp-demo" className="scroll-mt-8 w-full">
            <BookDemoPage hideTestimonials hideText formId={LP_DEMO_FORM_ID} />
          </div>
        </div>

        <div className="mt-12 md:mt-16 w-full max-w-4xl mx-auto text-center">
          <p
            className="mb-4 font-inter text-[10px] font-semibold uppercase tracking-[0.18em] md:text-[11px] text-black/45 dark:text-white/45"
          >
            Trusted by revenue teams worldwide
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
          <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start max-w-3xl mx-auto lg:mx-0 lg:max-w-none w-full lg:w-1/2 lg:shrink-0 lg:pl-8 xl:pl-12 z-20">
            <h1
              className="font-inter font-bold tracking-[-0.05em] leading-[1.02] text-brand-dark dark:text-brand-light text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px]"
            >
              <BlurReveal as="span" delay={0.1}>Performance has never had an operating system. </BlurReveal>
              <BlurReveal as="span" delay={charRevealEnd(HERO_LEAD_ALT) - LEAD_OVERLAP} className="font-ivyora font-medium italic">Until now.</BlurReveal>
            </h1>

            <p
              className="font-inter text-[16px] md:text-[18px] leading-[1.55] max-w-[640px] mx-auto lg:mx-0 text-black/70 dark:text-white/65"
            >
              The platform your sales team actually wants to open. Live business intelligence meets social media — where high-performance culture builds in real time and AI tells you what to do next, backed by more field sales performance data than any tool in existence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1 pb-2 w-full">
              <CTAButton
                href={BOOK_DEMO_HREF}
                variant="primary"
                className="book-demo-cta-marker w-full max-w-[260px] sm:max-w-none sm:w-auto font-inter font-semibold text-[15px] md:text-[16px] h-[48px] md:h-[52px] pl-7 md:pl-8 pr-6 md:pr-7 gap-2 rounded-full shadow-[0_8px_24px_rgba(25,173,125,0.25)] hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)] transition-all duration-300"
              >
                Book a Demo
                <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
              </CTAButton>
            </div>

            <div className="w-full lg:max-w-[560px] mx-auto lg:mx-0">
              <p
                className="font-inter text-[11px] md:text-[12px] tracking-[0.18em] uppercase font-semibold mb-3 text-black/55 dark:text-white/55"
              >
                Serving 180k users
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

export function HeroSection({ variant = "default" }: { variant?: "default" | "lp" } = {}) {
  if (variant === "lp") return <HeroSectionLp />;
  return <HeroSectionDefault />;
}



