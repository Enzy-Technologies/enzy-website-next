"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FEATURED_QUOTE = {
  text: "Before Enzy, we were reacting to results. Now we're anticipating them. It turned data into decision velocity, visibility into alignment, and motivation into momentum.",
  name: "Ashleigh Pepper",
  role: "CEO of Kaizen Promittere",
};


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

import { BlurReveal } from "./BlurReveal";

type EvidenceVariant = "default" | "lp";

export function EvidenceSection({ variant = "default" }: { variant?: EvidenceVariant } = {}) {
  const showQuoteCard = variant !== "lp";
  const { value: count, ref: countRef } = useCountUp(21);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={containerRef}
      // Tablet-only gap (768–1023): the playground hero above is z-40 and, on a
      // tablet's wide viewport, the hand image's wrist extends several hundred px
      // below the runway (the 40%-width clause makes the image tall). Push this
      // section — and everything after it — down so the phone has room to finish
      // clear of the stats. Phones don't need it (narrower image); desktop has
      // its own layout. This is a cosmetic layout-fit gap, not a structural line.
      className="relative w-full px-4 py-20 md:py-28 max-w-7xl mx-auto overflow-hidden md:mt-[26vh] lg:mt-0"
    >
      <div className="flex flex-col items-center justify-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <p className="font-inter text-[12px] md:text-[14px] tracking-[0.2em] uppercase font-bold text-[#19ad7d] mb-6">
            The Enzy Effect
          </p>

          <div className="relative">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-[0.15] blur-[80px]"
              style={{
                background: "radial-gradient(circle, rgba(25,173,125,1) 0%, transparent 70%)",
                y
              }}
              aria-hidden
            />
            <p
              className="font-ivyora font-medium tracking-[-15px] md:tracking-[-25px] leading-[0.8] tabular-nums flex items-center justify-center text-brand-dark dark:text-brand-light text-[160px] sm:text-[220px] md:text-[320px] lg:text-[400px]"
            >
              <span ref={countRef}>{count}</span>
              <span className="text-[#19ad7d]">%</span>
            </p>
          </div>

          <BlurReveal
            as="p"
            delay={0.1}
            className="font-inter text-[24px] md:text-[32px] lg:text-[40px] font-bold mt-6 md:mt-8 tracking-tight text-black dark:text-white"
          >
            Increase in sales per rep after implementing Enzy
          </BlurReveal>

          <p
            className="font-inter text-[15px] md:text-[17px] leading-relaxed mt-4 max-w-[640px] mx-auto text-black/55 dark:text-white/55"
          >
            Across 25,000 sales reps controlling for company size, pre-existing growth trajectory, and industry trends.
          </p>
        </motion.div>

        {showQuoteCard ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-16 md:mt-24 w-full max-w-[900px] liquid-glass relative rounded-[32px] p-8 md:p-12 text-left ring-1 ring-[#19ad7d]/20 dark:ring-[#19ad7d]/25"
        >
          <div
            className="pointer-events-none absolute left-12 right-12 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/45 to-transparent"
            aria-hidden
          />

          <span
            className="pointer-events-none absolute -top-6 -left-4 font-ivyora text-[160px] md:text-[200px] leading-none text-[#19ad7d] opacity-[0.10] select-none"
            aria-hidden
          >
            &quot;
          </span>

          <blockquote className="m-0 relative z-10">
            <p
              className="font-ivyora italic text-[24px] md:text-[32px] lg:text-[36px] leading-[1.3] tracking-[-0.5px] text-brand-dark dark:text-brand-light"
            >
              {FEATURED_QUOTE.text}
            </p>
          </blockquote>

          <footer
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 md:mt-10 pt-6 md:pt-8 border-t relative z-10 border-black/10 dark:border-white/10"
          >
            <div className="flex-1 min-w-0">
              <p
                className="font-inter text-[16px] md:text-[18px] font-semibold tracking-tight m-0 text-brand-dark dark:text-brand-light"
              >
                {FEATURED_QUOTE.name}, {FEATURED_QUOTE.role}
              </p>
            </div>
            <Link
              href="/customer-stories"
              className="group hidden sm:inline-flex items-center gap-2 font-inter text-[15px] font-semibold whitespace-nowrap text-[#19ad7d] hover:opacity-90"
            >
              More stories
              <ArrowRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </footer>
        </motion.div>
        ) : null}
      </div>
    </section>
  );
}

