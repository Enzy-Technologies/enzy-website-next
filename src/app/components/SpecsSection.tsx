import React from "react";
import { Check, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

import { CTAButton } from "./CTAButton";

export function SpecsSection() {
  const { isLightMode } = useTheme();

  return (
    <section className={`relative z-10 w-full px-4 md:px-12 lg:px-20 py-24 md:py-32 flex flex-col items-center border-t ${isLightMode ? 'border-black/10' : 'border-white/10'}`}>
      <div className="w-full max-w-[1500px] flex flex-col items-center">

        {/* Header content */}
        <div className="flex flex-col items-center w-full max-w-[800px] gap-6 md:gap-8 mb-16 md:mb-20">
          <h2 className="eyebrow-lg text-[#19ad7d] text-center">
            Specs
          </h2>
          <h3 className={`font-['Inter'] font-bold text-4xl sm:text-5xl md:text-[60px] tracking-[-2px] md:tracking-[-3px] leading-[1.1] md:leading-[0.9] text-center ${isLightMode ? 'text-[#0b0f14]' : 'text-[#f5f7fa]'}`}>
            Built for daily execution
          </h3>
          <p className={`font-['Inter'] text-[13px] md:text-[15px] text-center leading-relaxed max-w-[600px] ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
            Not another dashboard. Enzy is a system for action—visibility, competition, and AI guidance.
          </p>
          <div className="mt-2 md:mt-4">
            <CTAButton href="#" variant="primary">
              Discover More
            </CTAButton>
          </div>
        </div>

        {/* Comparison Table — frosted panel */}
        <div
          className="relative w-full max-w-[700px] px-4 pb-12 rounded-[28px] p-6 md:p-8 liquid-glass"
        >
          <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/40 to-transparent rounded-full" />
          <table className="w-full" style={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <colgroup>
              <col style={{ width: '46%' }} />
              <col style={{ width: '27%' }} />
              <col style={{ width: '27%' }} />
            </colgroup>
            <thead>
              <tr className={`border-b ${isLightMode ? 'border-black/10' : 'border-white/10'}`}>
                <th className={`pb-4 text-left font-['Inter'] font-semibold text-[12px] md:text-[13px] uppercase tracking-wider ${isLightMode ? 'text-black/40' : 'text-white/40'}`}>Feature</th>
                <th className="pb-4 text-center font-['Inter'] font-semibold text-[12px] md:text-[13px] uppercase tracking-wider text-[#19ad7d]">Enzy</th>
                <th className={`pb-4 text-center font-['Inter'] font-semibold text-[12px] md:text-[13px] uppercase tracking-wider ${isLightMode ? 'text-black/40' : 'text-white/40'}`}>Other Tools</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Real-time behavior visibility",
                "Built-in competition",
                "Momentum system",
                "Daily engagement",
                "Manager control",
                "System integration",
              ].map((feature, i, arr) => (
                <tr key={i} className={i !== arr.length - 1 ? (isLightMode ? 'border-b border-black/5' : 'border-b border-white/5') : ''}>
                  <td className={`py-[20px] md:py-[24px] font-['Inter'] font-medium text-[15px] md:text-[17px] leading-snug ${isLightMode ? 'text-[#0b0f14]' : 'text-white'}`}>
                    {feature}
                  </td>
                  <td className="py-[20px] md:py-[24px] text-center">
                    <Check size={22} strokeWidth={3} className="text-[#19ad7d] inline-block drop-shadow-[0_0_8px_rgba(25,173,125,0.4)]" />
                  </td>
                  <td className="py-[20px] md:py-[24px] text-center">
                    <X size={18} strokeWidth={2.5} className={`inline-block ${isLightMode ? 'text-black/20' : 'text-white/20'}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}