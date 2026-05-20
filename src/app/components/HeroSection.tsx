"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { Sparkles, ArrowRight, CornerDownRight, Star, X, CheckCircle2, TrendingUp } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { BOOK_DEMO_HREF } from "@/app/lib/booking";
import { SimpleLogosMarquee } from "@/app/components/SimpleLogosMarquee";
import { HeroVideoPlaceholder } from "@/app/components/HeroVideoPlaceholder";
import { LpBookDemoInline } from "@/app/components/landing/LpBookDemoScroll";
import { BookDemoPage } from "@/app/components/BookDemo/BookDemoPage";

import { BlurReveal } from "./BlurReveal";






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
  const { isLightMode } = useTheme();

  return (
    <section className="relative w-full">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className={`absolute inset-0 ${
            isLightMode
              ? "bg-[radial-gradient(120%_90%_at_50%_-28%,rgba(25,173,125,0.14),transparent_52%),linear-gradient(180deg,var(--color-surface-light)_0%,#ffffff_58%)]"
              : "bg-[radial-gradient(95%_72%_at_88%_-8%,rgba(25,173,125,0.17),transparent_56%),radial-gradient(72%_58%_at_4%_58%,rgba(25,173,125,0.09),transparent_62%),linear-gradient(180deg,#0b0f14_0%,#060809_100%)]"
          }`}
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
          <span
            className={`inline-flex items-center rounded-full border px-4 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.14em] md:text-[12px] ${
              isLightMode
                ? "border-black/10 bg-black/[0.03] text-black/55"
                : "border-white/12 bg-white/[0.06] text-white/60"
            }`}
          >
            Built for route-based &amp; field sales orgs
          </span>

          <h1
            className={`font-inter font-bold tracking-[-0.05em] leading-[1.02] ${
              isLightMode ? "text-brand-dark" : "text-brand-light"
            } text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px]`}
          >
            <BlurReveal as="span" delay={0.1}>
              More revenue from the team you{" "}
            </BlurReveal>
            <BlurReveal as="span" delay={0.85} className="font-ivyora font-medium italic">
              already
            </BlurReveal>
            <BlurReveal as="span" delay={1.05}>
              {" "}
              have.
            </BlurReveal>
          </h1>

          <p
            className={`max-w-[640px] font-inter text-[17px] leading-[1.55] md:text-[19px] ${
              isLightMode ? "text-black/72" : "text-white/68"
            }`}
          >
            Intelligent performance systems that tighten execution between visits — coaching,
            accountability, and incentives grounded in live CRM signal.
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
                className={`overflow-hidden rounded-[27px] sm:rounded-[31px] md:rounded-[35px] ${
                  isLightMode ? "bg-[#faf9f6]" : "bg-[#07090c]"
                }`}
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
            <BookDemoPage hideTestimonials hideText />
          </div>
        </div>

        <div className="mt-12 md:mt-16 w-full max-w-4xl mx-auto text-center">
          <p
            className={`mb-4 font-inter text-[10px] font-semibold uppercase tracking-[0.18em] md:text-[11px] ${
              isLightMode ? "text-black/45" : "text-white/45"
            }`}
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
  const { isLightMode } = useTheme();
  const { value: count, ref: countRef } = useCountUp(37);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full pt-16 pb-6 lg:pt-20 lg:pb-0 lg:min-h-[80vh] flex items-center">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Content */}
          <div className="flex flex-col gap-7 text-center lg:text-left items-center lg:items-start max-w-3xl mx-auto lg:mx-0 w-full lg:w-[55%] xl:w-[50%] lg:pl-8 xl:pl-12 z-20">
            <h1
              className={`font-inter font-bold tracking-[-0.05em] leading-[1.02] ${
                isLightMode ? "text-brand-dark" : "text-brand-light"
              } text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px]`}
            >
              <BlurReveal as="span" delay={0.1}>More revenue from the team you </BlurReveal>
              <BlurReveal as="span" delay={0.85} className="font-ivyora font-medium italic">already</BlurReveal>
              <BlurReveal as="span" delay={1.05}> have.</BlurReveal>
            </h1>

            <p
              className={`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[640px] mx-auto lg:mx-0 ${
                isLightMode ? "text-black/70" : "text-white/65"
              }`}
            >
              The Agentic engine for high performance sales teams that improves execution, increases accountability, and helps teams drive measurable sales growth.
            </p>

            <motion.div 
              ref={countRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-3 mt-2 mb-0"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#19ad7d]/10 text-[#19ad7d]">
                <TrendingUp size={20} strokeWidth={2.5} />
              </div>
              <span className={`font-inter text-[18px] md:text-[20px] font-medium ${isLightMode ? "text-black/80" : "text-white/80"}`}>
                Join teams seeing a <strong className="text-[#19ad7d] font-bold text-[22px] md:text-[24px]">{count}%</strong> median revenue lift
              </span>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 pb-4 w-full">
              <CTAButton
                href="/book-demo"
                variant="primary"
                className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[360px] font-inter font-normal text-[22px] sm:text-[26px] md:text-[30px] h-[64px] sm:h-[76px] md:h-[84px] px-8 sm:px-10 md:px-12 rounded-full shadow-[0_8px_24px_rgba(25,173,125,0.25)] hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)] transition-all duration-300"
              >
                Book a Demo
              </CTAButton>
            </div>

            <div className="w-full lg:max-w-[560px] mx-auto lg:mx-0">
              <SimpleLogosMarquee />
            </div>
          </div>
          
          {/* Right Column: Spacer for Playground Phone */}
          <div className="hidden lg:block lg:w-[50%] xl:w-[55%]">
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



