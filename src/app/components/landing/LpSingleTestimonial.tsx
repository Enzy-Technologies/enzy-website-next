"use client";

import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import type { Testimonial } from "@/app/components/TestimonialsSection";

type Props = {
  testimonial: Testimonial;
};

export function LpSingleTestimonial({ testimonial }: Props) {
  return (
    <section className="relative w-full px-4 py-16 md:py-20 lg:py-24 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[900px] mx-auto liquid-glass relative overflow-hidden rounded-[28px] rounded-tl-[12px] rounded-br-[44px] md:rounded-[34px] md:rounded-tl-[16px] md:rounded-br-[52px] p-8 md:p-12 text-left ring-1 ring-[#19ad7d]/20 dark:ring-[#19ad7d]/25"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-24 h-52 w-52 rounded-full bg-[#19ad7d]/12 blur-3xl md:h-64 md:w-64"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-[#19ad7d]/10 blur-3xl"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute left-8 md:left-12 right-8 md:right-12 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/45 to-transparent"
          aria-hidden
        />

        <div className="mb-6 flex items-center gap-1.5" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-[#19ad7d]/90 text-[#19ad7d]" strokeWidth={0} />
          ))}
          <span
            className="ml-2 font-inter text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40 dark:text-white/45"
          >
            Verified customer
          </span>
        </div>

        <blockquote className="m-0 relative z-10">
          <p
            className="font-ivyora italic text-[22px] md:text-[28px] lg:text-[32px] leading-[1.35] tracking-[-0.4px] text-brand-dark dark:text-brand-light"
          >
            {testimonial.quote}
          </p>
        </blockquote>

        <footer
          className="flex flex-row items-center gap-4 mt-8 md:mt-10 pt-6 md:pt-8 border-t relative z-10 border-black/10 dark:border-white/10"
        >
          <div className="relative h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-full overflow-hidden border border-[#19ad7d]/25">
            <ImageWithFallback
              src={testimonial.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p
              className="font-inter text-[15px] md:text-[17px] font-semibold tracking-tight m-0 text-brand-dark dark:text-brand-light"
            >
              {testimonial.name}
            </p>
            <p
              className="font-inter text-[13px] md:text-[14px] mt-1 m-0 text-black/55 dark:text-white/55"
            >
              {testimonial.title}
            </p>
          </div>
        </footer>
      </motion.div>
    </section>
  );
}
