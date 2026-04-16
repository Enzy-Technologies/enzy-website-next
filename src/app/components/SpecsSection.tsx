import React from "react";
import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "./ThemeProvider";

import { CTAButton } from "./CTAButton";

export function SpecsSection() {
  const { isLightMode } = useTheme();

  return (
    <section className={`relative z-10 w-full px-4 md:px-12 lg:px-20 py-24 md:py-32 flex flex-col items-center border-t ${isLightMode ? 'border-black/10' : 'border-white/10'}`}>
      <div className="w-full max-w-[1500px] flex flex-col items-center">
        
        {/* Large Liquid Glass Pill Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-[1400px] w-full mb-20 md:mb-32 aspect-[347/116] @container"
        >
          {/* Pill-shaped glass container */}
          <div
            className="relative overflow-hidden transition-all duration-500 w-full h-full"
            style={{
              borderRadius: '25cqw',
              background: 'rgba(255,255,255,0.21)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
            }}
          >
            {/* Inner gradient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(25, 173, 125, 0.05), rgba(60, 217, 163, 0.03))',
                borderRadius: 'inherit',
              }}
            />

            {/* Right blur accent inside pill */}
            <div
              className="absolute rounded-full blur-[80px] opacity-40"
              style={{
                background: 'rgba(60, 217, 163, 0.15)',
                width: '360px',
                height: '360px',
                right: '10%',
                top: '-10%',
              }}
            />

            {/* Left blur accent inside pill */}
            <div
              className="absolute rounded-full blur-[80px] opacity-30"
              style={{
                background: 'rgba(25, 173, 125, 0.12)',
                width: '320px',
                height: '320px',
                left: '5%',
                bottom: '-15%',
              }}
            />

            {/* Left hand image inside pill */}
            <div className="absolute h-[96.79%] left-[-0.75%] top-[7.2%] w-[31.57%] pointer-events-none z-10">
              <ImageWithFallback 
                alt="Left Hand" 
                className="absolute h-full w-auto object-contain object-top left-0" 
                src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Untitled-2%201.png"
                style={{
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
                }}
              />
            </div>

            {/* Right hand image inside pill */}
            <div className="absolute h-[96.79%] right-[-2.3%] top-[3%] w-[31.3%] pointer-events-none z-10">
              <ImageWithFallback 
                alt="Right Hand" 
                className="absolute h-full w-auto object-contain object-top right-0" 
                src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Untitled-2%201-1.png"
                style={{
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
                }}
              />
            </div>

            {/* Content container - centered */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: "10cqw" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                style={{
                  top: '40%',
                }}
              >
                <div 
                  className="text-[#f5f7fa]"
                  style={{ 
                    fontFamily: "'IvyOra_Text', serif",
                    fontWeight: 500,
                    fontSize: '3.03cqw',
                    lineHeight: '3.79cqw',
                    letterSpacing: "-2px"
                  }}
                >
                  <p className="mb-0">“Makes other platforms look</p>
                  <p className="mb-0">elementary. It really stands out.”</p>
                </div>
              </motion.div>

              {/* CTA Button with gradient border */}
              <motion.div
                initial={{ opacity: 0, y: "5cqw" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute left-1/2 -translate-x-1/2 pointer-events-auto cursor-pointer"
                style={{
                  top: '77.6%',
                  width: '7.12cqw',
                  height: '2.74cqw'
                }}
                onClick={() => console.log('View More clicked')}
              >
                <div className="relative w-full h-full rounded-[0.76cqw] overflow-hidden group">
                  <div 
                    className="absolute inset-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-80" 
                    style={{ backgroundImage: "linear-gradient(189.625deg, rgba(25, 173, 125, 0.39) 25.113%, rgba(20, 144, 103, 0.39) 64.165%)" }} 
                  />
                  <div className="absolute inset-0 border-[0.05cqw] border-[rgba(255,255,255,0.76)] border-solid rounded-[inherit] shadow-[0_0.19cqw_0.19cqw_0_rgba(0,0,0,0.25)] pointer-events-none" />
                  <p className="absolute inset-0 flex items-center justify-center font-['Inter'] font-medium text-[#f5f7fa] whitespace-nowrap transition-transform duration-300 group-hover:scale-105"
                     style={{ fontSize: '0.76cqw' }}>
                    View More
                  </p>
                  <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0.14cqw_0.14cqw_0.28cqw_0_rgba(255,255,255,0.25)] pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Outer glow effect around pill */}
          <div
            className="absolute -inset-[2px] rounded-[392px] opacity-30 pointer-events-none -z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(25, 173, 125, 0.2), rgba(60, 217, 163, 0.15))',
              filter: 'blur(40px)',
            }}
          />
        </motion.div>

        {/* Header content */}
        <div className="flex flex-col items-center w-full max-w-[800px] gap-6 md:gap-8 mb-16 md:mb-20">
          <h2 className="font-['Roboto_Mono'] text-[#19ad7d] text-xs md:text-sm uppercase tracking-[0.2em] text-center">
            Specs
          </h2>
          <h3 className={`font-['Inter'] font-bold text-4xl sm:text-5xl md:text-[60px] tracking-[-2px] md:tracking-[-3px] leading-[1.1] md:leading-[0.9] text-center ${isLightMode ? 'text-[#0b0f14]' : 'text-[#f5f7fa]'}`}>
            Why Choose Enzy?
          </h3>
          <p className={`font-['Roboto_Mono'] text-[13px] md:text-[15px] uppercase tracking-[-0.075px] text-center leading-relaxed max-w-[600px] ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
            Not just another sales tool. Enzy is built for daily use — real behavior, real competition, real results.
          </p>
          <div className="mt-2 md:mt-4">
            <CTAButton href="#">
              Discover More
            </CTAButton>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="w-full max-w-[700px] px-4 pb-12">
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