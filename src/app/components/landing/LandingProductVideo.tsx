"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";
import { CTAButton } from "@/app/components/CTAButton";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Full iframe `src` from the host’s “Embed” share (YouTube, Vimeo, Mux, etc.). */
  embedSrc: string;
  cta?: { label: string; href: string };
};

export function LandingProductVideo({ id = "product-video", eyebrow, title, description, embedSrc, cta }: Props) {
  const { isLightMode } = useTheme();
  if (!embedSrc?.trim()) return null;

  return (
    <section
      id={id}
      className="relative z-20 w-full flex justify-center px-4 py-10 md:py-14"
      aria-labelledby={`${id}-heading`}
    >
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        {eyebrow ? <p className="eyebrow text-[#19ad7d] mb-2">{eyebrow}</p> : null}
        <h2
          id={`${id}-heading`}
          className={`font-['IvyOra_Text'] font-medium text-2xl sm:text-3xl md:text-4xl tracking-[-1.2px] leading-[1.12] ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-3 max-w-lg font-['Inter'] text-[15px] md:text-base leading-relaxed ${
              isLightMode ? "text-black/60" : "text-white/60"
            }`}
          >
            {description}
          </p>
        ) : null}

        <div
          className={`mt-8 w-full overflow-hidden rounded-2xl border shadow-2xl aspect-video ${
            isLightMode ? "border-black/10 bg-black/5" : "border-white/10 bg-black/20"
          }`}
        >
          <iframe
            className="h-full w-full"
            src={embedSrc}
            title={title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>

        {cta ? (
          <div className="mt-8 flex justify-center w-full">
            <CTAButton
              href={cta.href}
              variant="primary"
              className="justify-center rounded-full px-7 py-3.5 gap-3 font-bold text-sm uppercase tracking-widest hover:scale-[1.02] hover:!opacity-100"
            >
              {cta.label} <ArrowRight size={18} aria-hidden />
            </CTAButton>
          </div>
        ) : null}
      </div>
    </section>
  );
}
