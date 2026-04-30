"use client";

import React from "react";
import type { StaticImageData } from "next/image";
import integrateImgLight from "@/assets/how-it-works-integrate-light.png";
import integrateImgDark from "@/assets/how-it-works-integrate-dark.png";
import engageImg from "@/assets/34d961d0ab311afc7564d03f49aed88b4a54a35f.png";
import analyzeImg from "@/assets/818a5b0370e47250af5f3233218b98f9533f97ef.png";
import { useTheme } from "@/app/components/ThemeProvider";

type HowItWorksStep = {
  step: string;
  title: string;
  body: React.ReactNode;
  img: StaticImageData;
  imgDark?: StaticImageData;
  alt: string;
  withBorderBottom: boolean;
};

const steps: HowItWorksStep[] = [
  {
    step: "Step 1",
    title: "Integrate",
    body: (
      <>
        Most organizations sit on valuable data, but it’s scattered across
        systems and teams. Enzy brings it all together into a connected
        performance data lake: a complete view of how work actually gets done.
      </>
    ),
    img: integrateImgLight,
    imgDark: integrateImgDark,
    alt: "Connect your stack",
    withBorderBottom: false,
  },
  {
    step: "Step 2",
    title: "Activate",
    body: (
      <>
        Enzy makes activity visible across reps, teams, and managers — in real
        time, at every level, without the spreadsheet tax.
        <ul className="mt-4 flex flex-col gap-2.5">
          <li className="flex items-start gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#19ad7d]" />
            <span>
              Reps get a live view of where they stand — and what to do next.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#19ad7d]" />
            <span>
              Managers get real-time coaching signals — not last week’s results.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#19ad7d]" />
            <span>
              Leaders get a single source of truth across teams and territories.
            </span>
          </li>
        </ul>
      </>
    ),
    img: engageImg,
    alt: "Make activity visible",
    withBorderBottom: false,
  },
  {
    step: "Step 3",
    title: "Create momentum",
    body: (
      <>
        AI suggests next actions. Competitions reinforce habits. Incentives drive
        follow-through. Results compound week over week — and the team builds a
        culture that sustains it.
      </>
    ),
    img: analyzeImg,
    alt: "Compound results",
    withBorderBottom: false,
  },
];

export function HowItWorksSectionLegacy({
  variant = "default",
}: {
  variant?: "default" | "landing";
}) {
  const { isLightMode } = useTheme();

  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-10 md:mb-14">
          <p className="font-['Inter'] text-[11px] tracking-[0.18em] uppercase font-semibold text-[#19ad7d]">
            How it works
          </p>
          {variant === "landing" ? null : (
            <h2
              className={`mt-3 font-['IvyOra_Text'] text-[34px] md:text-[44px] leading-[1.05] tracking-[-1px] ${
                isLightMode ? "text-brand-dark" : "text-brand-light"
              }`}
            >
              Connect. Activate. Compound.
            </h2>
          )}
        </div>

        <div className="flex flex-col gap-10 md:gap-14">
          {steps.map((step) => (
            <HowItWorksRow key={step.title} step={step} isLightMode={isLightMode} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksRow({
  step,
  isLightMode,
}: {
  step: HowItWorksStep;
  isLightMode: boolean;
}) {
  // Note: this file is a preserved legacy section. Keep its structure stable
  // for landing pages that still reference it.
  const imgSrc = isLightMode ? step.img : step.imgDark ?? step.img;

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center ${
        step.withBorderBottom ? "border-b border-current/10 pb-10 md:pb-14" : ""
      }`}
    >
      <div className="md:col-span-6">
        <p className="font-['Inter'] text-[11px] tracking-[0.18em] uppercase font-semibold text-[#19ad7d]">
          {step.step}
        </p>
        <h3
          className={`mt-3 font-['Inter'] text-[22px] md:text-[26px] font-medium tracking-[-0.5px] ${
            isLightMode ? "text-brand-dark" : "text-brand-light"
          }`}
        >
          {step.title}
        </h3>
        <div
          className={`mt-3 font-['Inter'] text-[15px] md:text-[16px] leading-[1.65] ${
            isLightMode ? "text-black/70" : "text-white/65"
          }`}
        >
          {step.body}
        </div>
      </div>

      <div className="md:col-span-6">
        {/* Use a plain <img> because these are local static assets already optimized by Next. */}
        <img src={imgSrc.src} alt={step.alt} className="w-full h-auto rounded-2xl" />
      </div>
    </div>
  );
}

