"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TESTIMONIALS, TestimonialsMarquee } from "./TestimonialsSection";

const FEATURED_QUOTE = {
  text: "Before Enzy, we were reacting to results. Now we're anticipating them. It turned data into decision velocity, visibility into alignment, and motivation into momentum.",
  name: "Ashleigh Pepper",
  role: "CEO, Kaizen Promittere",
  image:
    "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/697a960ca83443bd4afd2051_Screenshot%202026-01-28%20at%204.04.32%E2%80%AFPM.png",
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

export function EvidenceSection() {
  const { isLightMode } = useTheme();
  const { value: count, ref: countRef } = useCountUp(27);
  const additional = useMemo(() => TESTIMONIALS.filter((t) => t.id !== 1), []);

  return (
    <section className="relative w-full px-4 pt-12 pb-20 md:pt-16 md:pb-28 max-w-7xl mx-auto">
      <p className="font-['Inter'] text-[11px] tracking-[0.18em] uppercase font-semibold text-[#19ad7d] mb-10">
        Evidence
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <motion.div
          ref={countRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-5 liquid-glass relative rounded-[28px] p-8 md:p-10 flex flex-col justify-between min-h-[340px] ring-1 overflow-hidden ${
            isLightMode ? "ring-[#19ad7d]/20" : "ring-[#19ad7d]/25"
          }`}
        >
          <div
            className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/45 to-transparent"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute -top-8 -right-8 w-[280px] h-[280px] rounded-full opacity-[0.07]"
            style={{
              background:
                "radial-gradient(circle, rgba(25,173,125,1) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative">
            <p
              className={`font-['IvyOra_Text'] font-medium tracking-[-3px] leading-[0.9] tabular-nums ${
                isLightMode ? "text-brand-dark" : "text-brand-light"
              } text-[96px] md:text-[120px] lg:text-[140px]`}
            >
              {count}
              <span className="text-[#19ad7d]">%</span>
            </p>
            <p
              className={`font-['Inter'] text-[18px] md:text-[20px] font-medium mt-3 ${
                isLightMode ? "text-black" : "text-white"
              }`}
            >
              Median sales lift, year one
            </p>
          </div>

          <p
            className={`font-['Inter'] text-[14px] leading-relaxed mt-6 max-w-[360px] relative ${
              isLightMode ? "text-black/55" : "text-white/55"
            }`}
          >
            Measured across 140+ deployments running competitions, incentives,
            and AI-driven coaching.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="lg:col-span-7 liquid-glass relative rounded-[28px] p-8 md:p-10 flex flex-col justify-between min-h-[340px] overflow-hidden"
        >
          <div
            className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/45 to-transparent"
            aria-hidden
          />

          <span
            className="pointer-events-none absolute -top-8 -left-2 font-['IvyOra_Text'] text-[200px] md:text-[260px] leading-none text-[#19ad7d] opacity-[0.10] select-none"
            aria-hidden
          >
            "
          </span>

          <blockquote className="m-0 relative">
            <p
              className={`font-['IvyOra_Text'] italic text-[22px] md:text-[26px] lg:text-[28px] leading-[1.4] tracking-[-0.5px] ${
                isLightMode ? "text-brand-dark" : "text-brand-light"
              }`}
            >
              {FEATURED_QUOTE.text}
            </p>
          </blockquote>

          <footer
            className={`flex items-center gap-3 mt-8 pt-6 border-t relative ${
              isLightMode ? "border-black/10" : "border-white/10"
            }`}
          >
            <div className="w-11 h-11 rounded-full overflow-hidden border border-[#19ad7d]/30 shrink-0">
              <ImageWithFallback
                src={FEATURED_QUOTE.image}
                alt={FEATURED_QUOTE.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`font-['Inter'] text-[14px] font-semibold tracking-tight m-0 ${
                  isLightMode ? "text-brand-dark" : "text-brand-light"
                }`}
              >
                {FEATURED_QUOTE.name}
              </p>
              <p
                className={`font-['Inter'] text-[12px] m-0 ${
                  isLightMode ? "text-black/55" : "text-white/50"
                }`}
              >
                {FEATURED_QUOTE.role}
              </p>
            </div>
            <Link
              href="/customers"
              className="group inline-flex items-center gap-1.5 font-['Inter'] text-[13px] font-semibold whitespace-nowrap text-[#19ad7d] hover:opacity-90"
            >
              More stories
              <ArrowRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </footer>
        </motion.div>
      </div>

      <div className="mt-6 md:mt-10">
        <TestimonialsMarquee testimonials={additional} sets={3} />
      </div>
    </section>
  );
}

