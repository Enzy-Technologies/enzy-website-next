"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { BOOK_DEMO_HREF, BOOK_DEMO_CTA_STYLE } from "@/app/lib/booking";

type ClosingCTASectionProps = {
  demoHref?: string;
};

export function ClosingCTASection({ demoHref = BOOK_DEMO_HREF }: ClosingCTASectionProps = {}) {
  return (
    <section className="relative w-full px-4 py-20 md:py-28 max-w-7xl mx-auto">
      <div
        className="liquid-glass relative rounded-[32px] md:rounded-[40px] px-6 py-14 md:px-16 md:py-20 text-center ring-1 ring-[#19ad7d]/20 dark:ring-[#19ad7d]/25"
      >
        <div
          className="pointer-events-none absolute left-12 right-12 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/45 to-transparent"
          aria-hidden
        />

        <h2
          className="font-ivyora font-medium leading-[1.05] tracking-[-2px] text-brand-dark dark:text-brand-light text-[36px] sm:text-[48px] md:text-[60px] lg:text-[68px] mx-auto max-w-[820px]"
        >
          Your team doesn&rsquo;t need multiple apps.{" "}
          <span className="italic font-normal">They need Enzy.</span>
        </h2>

        <p
          className="font-inter text-[15px] md:text-[16px] leading-relaxed mt-6 max-w-[640px] mx-auto text-black/65 dark:text-white/60"
        >
          Replace your spreadsheet leaderboards, scattered group texts, manual
          incentives, scattered training docs, and more.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10">
          <CTAButton
            href={demoHref}
            variant="primary"
            className={`book-demo-cta-marker justify-center px-9 py-[15px] gap-2 text-[15px] w-full sm:w-auto max-w-[320px] sm:max-w-none ${BOOK_DEMO_CTA_STYLE}`}
          >
            Book a Demo <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

