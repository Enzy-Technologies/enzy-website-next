"use client";

import React from "react";
import { useTheme } from "@/app/components/ThemeProvider";

type Step = {
  numeral: string;
  title: string;
  body: string;
  timing: string;
};

const STEPS: Step[] = [
  {
    numeral: "I.",
    title: "Integrate",
    body: "Connect your CRM, comms, and ops stack in days. Keep your sources. Enzy sits on top — no rip-and-replace.",
    timing: "Days 1–7",
  },
  {
    numeral: "II.",
    title: "Activate",
    body: "Make activity visible across reps, teams, and managers. Real-time, every level. No spreadsheet tax.",
    timing: "Week 2",
  },
  {
    numeral: "III.",
    title: "Create momentum",
    body: "AI suggests next actions. Competitions reinforce habits. Results compound, week over week.",
    timing: "Ongoing",
  },
];

export function HowItWorksSection() {
  const { isLightMode } = useTheme();

  const labelMuted = isLightMode ? "text-black/45" : "text-white/40";
  const titleColor = isLightMode ? "text-brand-dark" : "text-brand-light";
  const bodyColor = isLightMode ? "text-black/65" : "text-white/60";
  const ruleColor = isLightMode ? "border-black/10" : "border-white/10";

  return (
    <section
      id="how-it-works"
      className="relative w-full px-4 py-20 md:py-28 max-w-7xl mx-auto"
    >
      <p className="font-['Inter'] text-[11px] tracking-[0.18em] uppercase font-semibold text-[#19ad7d] mb-10">
        How it works
      </p>

      <div className={`flex flex-col border-t ${ruleColor}`}>
        {STEPS.map((step, idx) => (
          <div
            key={step.title}
            className={`grid grid-cols-[86px_1fr] md:grid-cols-[140px_1fr_120px] gap-x-6 gap-y-3 py-10 md:py-12 items-stretch ${
              idx < STEPS.length - 1 ? `border-b ${ruleColor}` : ""
            }`}
          >
            <div className="flex items-center self-stretch">
              <span
                className={`font-['IvyOra_Text'] italic font-semibold text-[58px] md:text-[88px] leading-[0.82] tracking-[-1.5px] ${titleColor}`}
              >
                {step.numeral}
              </span>
            </div>
            <div className="min-w-0">
              <h3
                className={`font-['Inter'] text-[22px] md:text-[26px] font-bold tracking-[-1px] ${titleColor} mb-2`}
              >
                {step.title}
              </h3>
              <p
                className={`font-['Inter'] text-[15px] md:text-[16px] leading-[1.6] max-w-[540px] ${bodyColor}`}
              >
                {step.body}
              </p>
            </div>
            <span
              className={`hidden md:block font-['Inter'] text-[11px] tracking-[0.12em] uppercase text-right ${labelMuted}`}
            >
              {step.timing}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

