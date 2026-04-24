"use client";

import React from "react";
import { useTheme } from "@/app/components/ThemeProvider";

type Props = {
  eyebrow: string;
  line: string;
  logos?: readonly string[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
};

/** Trust strip + optional logo labels + short quote — reduces anxiety before scroll depth. */
export function LandingSocialProofStrip({ eyebrow, line, logos, testimonial }: Props) {
  const { isLightMode } = useTheme();

  return (
    <section
      className={`w-full max-w-5xl mx-auto px-5 sm:px-6 md:px-8 pb-2 md:pb-4 -mt-2 md:-mt-4`}
      aria-label="Social proof"
    >
      <div
        className={`relative rounded-2xl px-5 py-5 md:px-7 md:py-6 text-center liquid-glass ${
          isLightMode ? "ring-1 ring-black/5" : "ring-1 ring-white/10"
        }`}
      >
        <p className="eyebrow text-[#19ad7d] mb-1.5">{eyebrow}</p>
        <p
          className={`font-['Inter'] text-[14px] md:text-[15px] font-medium tracking-tight ${
            isLightMode ? "text-black/70" : "text-white/70"
          }`}
        >
          {line}
        </p>

        {logos && logos.length > 0 ? (
          <div
            className={`mt-5 flex flex-wrap items-center justify-center gap-2 md:gap-3 border-t pt-5 ${
              isLightMode ? "border-black/10" : "border-white/10"
            }`}
            aria-label="Teams and industries"
          >
            {logos.map((name) => (
              <span
                key={name}
                className={`font-['Inter'] text-[11px] md:text-[12px] font-semibold tracking-tight px-3 py-1.5 rounded-full border ${
                  isLightMode ? "border-black/10 bg-black/[0.03] text-black/55" : "border-white/10 bg-white/[0.04] text-white/55"
                }`}
              >
                {name}
              </span>
            ))}
          </div>
        ) : null}

        {testimonial ? (
          <blockquote
            className={`mt-6 text-left border-t pt-6 ${isLightMode ? "border-black/10" : "border-white/10"}`}
          >
            <p
              className={`font-['Inter'] text-[14px] md:text-[15px] leading-relaxed italic ${
                isLightMode ? "text-black/75" : "text-white/75"
              }`}
            >
              “{testimonial.quote}”
            </p>
            <footer className={`mt-3 font-['Inter'] text-[12px] md:text-[13px] ${isLightMode ? "text-black/45" : "text-white/45"}`}>
              <span className="font-semibold text-[#19ad7d]">{testimonial.name}</span>
              <span className="mx-2">·</span>
              <span>{testimonial.role}</span>
            </footer>
          </blockquote>
        ) : null}
      </div>
    </section>
  );
}
