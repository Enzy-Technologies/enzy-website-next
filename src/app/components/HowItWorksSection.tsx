"use client";

import React from "react";
import createImg from "@/assets/e66ef56f0b767b50b8860584a5fa19bd69be614e.png";
import engageImg from "@/assets/34d961d0ab311afc7564d03f49aed88b4a54a35f.png";
import analyzeImg from "@/assets/818a5b0370e47250af5f3233218b98f9533f97ef.png";
import { useTheme } from "@/app/components/ThemeProvider";

const steps = [
  {
    step: "Step 1",
    title: "Integrate",
    body: "Connect your stack in days. Keep your sources. Enzy sits on top.",
    img: createImg,
    alt: "Create Dashboard",
    withBorderBottom: false,
  },
  {
    step: "Step 2",
    title: "Activate",
    body: "Make activity visible—across reps, teams, and managers. No lag.",
    img: engageImg,
    alt: "Engage Audience",
    withBorderBottom: false,
  },
  {
    step: "Step 3",
    title: "Drive Momentum",
    body: "AI suggests actions. Competitions reinforce habits. Results compound.",
    img: analyzeImg,
    alt: "Analyze Results",
    withBorderBottom: true,
  },
] as const;

type HowItWorksVariant = "home" | "landing";

export function HowItWorksSection({ variant = "home" }: { variant?: HowItWorksVariant }) {
  const { isLightMode } = useTheme();
  const isLanding = variant === "landing";

  if (isLanding) {
    const textMuted = isLightMode ? "text-black/50" : "text-white/45";
    const textTitle = isLightMode ? "text-brand-dark" : "text-white";
    const textBody = isLightMode ? "text-black/70" : "text-white/70";
    const iconBtn = isLightMode
      ? "bg-white border border-black/5 text-brand-dark shadow-xl"
      : "bg-white/5 border border-white/10 text-white shadow-xl";
    const imageShell = isLightMode
      ? "bg-white/40 border-2 border-black/60 backdrop-blur-xl shadow-[inset_0_4px_24px_rgba(255,255,255,0.7)] group-hover:border-black group-hover:bg-white/50"
      : "bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-[inset_0_4px_24px_rgba(0,0,0,0.35)] group-hover:border-white/25 group-hover:bg-white/[0.07]";
    const sectionBorder = isLightMode ? "border-black/10" : "border-white/10";

    const insetGlass = isLightMode
      ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
      : "shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]";
    const outerLift = isLightMode
      ? "shadow-[0_28px_96px_rgba(0,0,0,0.10)]"
      : "shadow-[0_30px_110px_rgba(0,0,0,0.65)]";

    return (
      <section
        id="how-it-works"
        className="relative z-20 w-full flex justify-center px-4 py-16 md:py-24"
      >
        {/* Rounded wrapper clips composited backdrop/pseudo-layers so corners stay curved (backdrop-filter quirk). */}
        <div
          className={`w-full max-w-[1280px] rounded-[28px] md:rounded-[32px] overflow-hidden ${outerLift} ${
            isLightMode ? "ring-1 ring-black/5" : "ring-1 ring-white/10"
          }`}
        >
          <div
            className={`flex flex-col gap-12 md:gap-14 p-6 sm:p-8 md:p-10 lg:p-12 liquid-glass !shadow-none ${insetGlass}`}
          >
            <div className="text-center max-w-2xl mx-auto">
              <p className="eyebrow text-[#19ad7d] mb-3">How it works</p>
              <h2
                className={`font-['IvyOra_Text'] font-medium text-3xl md:text-4xl lg:text-[44px] tracking-[-1.5px] leading-[1.1] ${
                  isLightMode ? "text-black" : "text-white"
                }`}
              >
                Three moves. One system.
              </h2>
              <p className={`mt-4 font-['Inter'] text-[15px] md:text-[16px] leading-relaxed ${textBody}`}>
                No rip-and-replace. Enzy sits on your data and turns it into daily execution.
              </p>
            </div>

            {steps.map((s) => (
              <div
                key={s.title}
                className={`flex flex-col lg:flex-row items-center justify-between w-full gap-8 group p-0 ${
                  s.withBorderBottom ? `pb-12 border-b ${sectionBorder}` : ""
                }`}
              >
                <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[288px] shrink-0 text-left">
                  <span className={`font-['Inter'] text-lg ${textMuted} font-medium`}>{s.step}</span>
                  <div className="flex items-center gap-4">
                    <h3 className={`font-['Inter'] text-4xl sm:text-5xl md:text-[56px] ${textTitle} tracking-[-2px] font-bold`}>
                      {s.title}
                    </h3>
                    <div
                      className={`w-[72px] h-[72px] md:w-[80px] md:h-[80px] shrink-0 flex items-center justify-center rounded-full group-hover:scale-105 transition-transform duration-500 ${iconBtn}`}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </div>
                  </div>
                  <p className={`font-['Inter'] text-[15px] leading-relaxed ${textBody}`}>{s.body}</p>
                </div>
                <div
                  className={`w-full lg:w-[834px] lg:ml-auto h-[200px] md:h-[212px] rounded-full overflow-hidden relative transition-colors duration-500 ${imageShell}`}
                >
                  <img
                    src={s.img.src}
                    alt={s.alt}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Homepage: overlaps tall hero — liquid-glass adapts via theme.css `.dark .liquid-glass`; stop hardcoded light-only fills/text.
  const textMuted = isLightMode ? "text-black/50" : "text-white/45";
  const textTitle = isLightMode ? "text-brand-dark" : "text-white";
  const textBody = isLightMode ? "text-black/70" : "text-white/70";
  const iconBtn = isLightMode
    ? "bg-white border border-black/5 text-brand-dark shadow-xl"
    : "bg-white/5 border border-white/10 text-white shadow-xl";
  const imageShell = isLightMode
    ? "bg-white/40 border-2 border-black/60 backdrop-blur-xl shadow-[inset_0_4px_24px_rgba(255,255,255,0.7)] group-hover:border-black group-hover:bg-white/50"
    : "bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-[inset_0_4px_24px_rgba(0,0,0,0.35)] group-hover:border-white/25 group-hover:bg-white/[0.07]";
  const sectionBorder = isLightMode ? "border-black/10" : "border-white/10";
  const homeInset = isLightMode
    ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
    : "shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]";
  const homeOuterLift = isLightMode
    ? "shadow-[0_-20px_60px_rgba(0,0,0,0.1)]"
    : "shadow-[0_-28px_90px_rgba(0,0,0,0.55)] ring-1 ring-white/10";

  return (
    <section className="relative z-20 w-full flex justify-center mt-10 md:mt-14 lg:mt-16 px-[16px] py-0">
      <div
        className={`w-full rounded-[40px] md:rounded-[60px] lg:rounded-[80px] overflow-hidden ${homeOuterLift} transition-colors duration-500 ring-1 ${
          isLightMode ? "ring-[#19ad7d]/18" : "ring-[#19ad7d]/20"
        }`}
      >
        <div
          className={`relative liquid-glass !shadow-none ${homeInset} px-[16px] py-[64px] transition-colors duration-500 border ${
            isLightMode
              ? "!bg-white/25 border-[#19ad7d]/18"
              : "!bg-white/[0.05] border-[#19ad7d]/18"
          }`}
        >
          <div className="pointer-events-none absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/45 to-transparent rounded-full" />
          <div className="w-full max-w-[1280px] mx-auto flex flex-col items-start gap-12 relative">
            {steps.map((s) => (
              <div
                key={s.title}
                className={`flex flex-col lg:flex-row items-center justify-between w-full gap-8 group p-[0px] ${
                  s.withBorderBottom ? `pb-12 border-b ${sectionBorder}` : ""
                }`}
              >
                <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[288px] shrink-0">
                  <span className={`font-['Inter'] text-lg ${textMuted} font-medium`}>{s.step}</span>
                  <div className="flex items-center gap-4">
                    <h3 className={`font-['Inter'] text-5xl md:text-[59px] ${textTitle} tracking-[-2px] font-bold`}>{s.title}</h3>
                    <div
                      className={`w-[80px] h-[80px] shrink-0 flex items-center justify-center rounded-full group-hover:scale-105 transition-transform duration-500 ${iconBtn}`}
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </div>
                  </div>
                  <p className={`font-['Inter'] text-[15px] leading-relaxed ${textBody}`}>{s.body}</p>
                </div>
                <div
                  className={`w-full lg:w-[834px] lg:ml-auto h-[212px] rounded-full overflow-hidden relative transition-colors duration-500 ${imageShell}`}
                >
                  <img
                    src={s.img.src}
                    alt={s.alt}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
