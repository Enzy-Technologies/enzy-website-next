import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function BenefitsSection() {
  const { isLightMode } = useTheme();

  const primaryStat = {
    value: "27%",
    label: "Lift in sales",
    desc: "When teams use competitions, incentives, and leaderboards.",
  };

  const secondaryStats = [
    {
      value: "180+",
      label: "Daily interactions",
      desc: "Performance stays visible across reps, teams, and managers.",
    },
    {
      value: "170%",
      label: "More positive outcomes",
      desc: "Driven by consistent activity in Enzy.",
    },
  ];

  const cardBase = `relative rounded-[28px] p-7 md:p-8 transition-colors duration-500 liquid-glass`;

  const cardAccent = "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/40 to-transparent";

  return (
    <section
      className={`relative z-10 w-full flex flex-col items-center ${isLightMode ? "border-black/10" : "border-white/10"} px-4 py-16 md:py-24`}
    >
      <div className="w-full max-w-[1280px] mx-auto flex flex-col gap-12 md:gap-16">
        {/* Header — always 3 rows on desktop (one sentence per row) */}
        <div className="flex flex-col gap-6 max-w-[900px] mx-auto items-center text-center">
          <h2 className="eyebrow text-[#19ad7d]">
            Benefits
          </h2>
          <p
            className={`font-medium text-[32px] sm:text-[40px] md:text-[60px] lg:text-[72px] tracking-[-2px] leading-[1.05] md:leading-[0.9] ${isLightMode ? "text-brand-dark" : "text-brand-light"} font-[IvyOra_Text] w-full`}
          >
            <span className="block md:whitespace-nowrap">Visibility drives action.</span>
            <span className="block md:whitespace-nowrap">Action creates momentum.</span>
            <span className="block md:whitespace-nowrap">Momentum builds revenue.</span>
          </p>
          <p
            className={`font-['Inter'] text-[16px] md:text-[18px] max-w-[620px] leading-relaxed ${isLightMode ? "text-black/60" : "text-white/60"}`}
          >
            Enzy provides real insights, without the data overload.
          </p>
        </div>

        {/* Stats: primary (highlighted) + two secondary — desktop: primary left (wide), two stacked right */}
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
            {/* Primary stat — spans 7 cols, stronger emphasis */}
            <div
              className={`lg:col-span-7 ${cardBase} ring-1 ${
                isLightMode ? "ring-[#19ad7d]/25 border-[#19ad7d]/20" : "ring-[#19ad7d]/30 border-[#19ad7d]/25"
              }`}
            >
              <div className={cardAccent} />
              <div className="flex flex-col gap-4 md:gap-5">
                <div
                  className={`font-['Inter'] font-extrabold tracking-[-2px] leading-none ${
                    isLightMode ? "text-brand-dark" : "text-brand-light"
                  } text-[56px] sm:text-[64px] md:text-[72px] lg:text-[80px]`}
                >
                  {primaryStat.value}
                </div>
                <div className={`font-['Inter'] font-medium text-[17px] md:text-[18px] ${isLightMode ? "text-black" : "text-white"}`}>
                  {primaryStat.label}
                </div>
                <div className={`font-['Inter'] text-[15px] md:text-[16px] leading-relaxed max-w-[480px] ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                  {primaryStat.desc}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6">
              {secondaryStats.map((s) => (
                <div key={s.value} className={cardBase}>
                  <div className={cardAccent} />
                  <div className="flex flex-col gap-3">
                    <div
                      className={`font-['Inter'] font-extrabold tracking-[-2px] leading-none ${
                        isLightMode ? "text-brand-dark" : "text-brand-light"
                      } text-[48px] md:text-[52px] lg:text-[56px]`}
                    >
                      {s.value}
                    </div>
                    <div className={`font-['Inter'] font-medium text-[16px] ${isLightMode ? "text-black" : "text-white"}`}>
                      {s.label}
                    </div>
                    <div className={`font-['Inter'] text-[14px] md:text-[15px] leading-relaxed ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 md:mt-12 flex justify-center">
            <Link
              href="/features"
              className={`group inline-flex items-center gap-2 font-['Inter'] text-sm font-semibold transition-opacity hover:opacity-90 ${
                isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"
              }`}
            >
              Explore the full system
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
