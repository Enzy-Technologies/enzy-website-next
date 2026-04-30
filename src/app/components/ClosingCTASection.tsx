"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { useTheme } from "./ThemeProvider";
import { BOOK_DEMO_HREF } from "@/app/lib/booking";

export function ClosingCTASection() {
  const { isLightMode } = useTheme();

  return (
    <section className="relative w-full px-4 py-20 md:py-28 max-w-7xl mx-auto">
      <div
        className={`liquid-glass relative rounded-[32px] md:rounded-[40px] px-6 py-14 md:px-16 md:py-20 text-center ring-1 ${
          isLightMode ? "ring-[#19ad7d]/20" : "ring-[#19ad7d]/25"
        }`}
      >
        <div
          className="pointer-events-none absolute left-12 right-12 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/45 to-transparent"
          aria-hidden
        />

        <h2
          className={`font-['IvyOra_Text'] font-medium leading-[1.05] tracking-[-2px] ${
            isLightMode ? "text-brand-dark" : "text-brand-light"
          } text-[36px] sm:text-[48px] md:text-[60px] lg:text-[68px] mx-auto max-w-[820px]`}
        >
          See what your sales team could be{" "}
          <span className="italic font-normal">closing.</span>
        </h2>

        <p
          className={`font-['Inter'] text-[15px] md:text-[16px] leading-relaxed mt-6 max-w-[520px] mx-auto ${
            isLightMode ? "text-black/65" : "text-white/60"
          }`}
        >
          Live in 1–2 weeks for most teams. Connects to your CRM and comms stack
          out of the box.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10">
          <CTAButton
            href={BOOK_DEMO_HREF}
            variant="primary"
            className="justify-center rounded-full px-9 py-[15px] gap-2 font-semibold text-[15px] w-full sm:w-auto max-w-[320px] sm:max-w-none"
          >
            Book a demo <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
          </CTAButton>
          <CTAButton
            variant="secondary"
            href="/pricing"
            className="justify-center rounded-full px-9 py-[15px] font-semibold text-[15px] w-full sm:w-auto max-w-[320px] sm:max-w-none"
          >
            See pricing
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

