import React from "react";
import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "./ThemeProvider";

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
          className="relative max-w-[1400px] w-full mb-20 md:mb-32"
          style={{ aspectRatio: '16 / 7' }}
        >
          {/* Pill-shaped glass container */}
          <div
            className="relative overflow-hidden transition-all duration-500 w-full h-full"
            style={{
              borderRadius: '392px',
              background: 'rgba(11, 15, 20, 0.4)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(25, 173, 125, 0.15)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
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
            <div className="absolute h-[70%] left-0 bottom-0 w-[32%] pointer-events-none z-10">
              <ImageWithFallback 
                alt="Left Hand" 
                className="absolute h-full w-auto object-contain object-bottom-left" 
                src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Untitled-2%201.png"
                style={{
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
                }}
              />
            </div>

            {/* Right hand image inside pill */}
            <div className="absolute h-[70%] right-0 bottom-0 w-[32%] pointer-events-none z-10">
              <ImageWithFallback 
                alt="Right Hand" 
                className="absolute h-full w-auto object-contain object-bottom-right right-0" 
                src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Untitled-2%201-1.png"
                style={{
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
                }}
              />
            </div>

            {/* Content container - centered */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full px-8 md:px-20 py-12 md:py-16">
              {/* Quote */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center max-w-3xl"
              >
                <h2 
                  className="text-3xl md:text-4xl lg:text-[56px] font-medium leading-tight md:leading-[70px] tracking-[-2px] mb-6 text-[#f5f7fa]"
                  style={{ fontFamily: "'IvyOra_Text', serif", fontWeight: 500, letterSpacing: "-2px" }}
                >
                  "Makes other platforms<br />look elementary. It really stands out."
                </h2>
              </motion.div>

              {/* Attribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-8"
              >
                <p className="text-base md:text-[18px] leading-[26px] text-[#a3adb8]">
                  Code Mangeltron, CEO of All
                </p>
              </motion.div>

              {/* CTA Button with gradient border */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <button
                  className="relative flex items-center justify-center px-6 py-3 rounded-[13px] border-[0.8px] border-[rgba(255,255,255,0.76)] backdrop-blur-[2px] bg-[linear-gradient(189.6deg,rgba(25,173,125,0.39)_25.1%,rgba(20,144,103,0.39)_64.2%)] shadow-[0px_3px_3px_0px_rgba(0,0,0,0.25),inset_2px_2px_5px_0px_rgba(255,255,255,0.25)] text-[#f5f7fa] font-['Inter'] font-medium text-[13px] transition-opacity hover:opacity-90 whitespace-nowrap"
                  onClick={() => console.log('View More clicked')}
                >
                  View More
                </button>
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
        <div className="flex flex-col items-center w-full max-w-[800px] gap-8 mb-20">
          <h2 className="font-['Roboto_Mono'] text-[#19ad7d] text-xs uppercase tracking-widest text-center">
            Specs
          </h2>
          <h3 className={`font-['Inter'] font-bold text-5xl md:text-[60px] tracking-[-3px] leading-[0.9] text-center ${isLightMode ? 'text-[#0b0f14]' : 'text-[#f5f7fa]'}`}>
            Why Choose Enzy?
          </h3>
          <p className="font-['Roboto_Mono'] text-[#6f6f6f] text-[15px] uppercase tracking-[-0.075px] text-center leading-relaxed max-w-[600px]">
            Not just another sales tool. Enzy is built for daily use — real behavior, real competition, real results.
          </p>
          <a href="#" className="relative flex items-center justify-center px-6 py-3 mt-4 rounded-[13px] border-[0.8px] border-[rgba(255,255,255,0.76)] backdrop-blur-[2px] bg-[linear-gradient(189.6deg,rgba(25,173,125,0.39)_25.1%,rgba(20,144,103,0.39)_64.2%)] shadow-[0px_3px_3px_0px_rgba(0,0,0,0.25),inset_2px_2px_5px_0px_rgba(255,255,255,0.25)] text-[#f5f7fa] font-['Inter'] font-medium text-[13px] transition-opacity hover:opacity-90 whitespace-nowrap w-max">
            Discover More
          </a>
        </div>

        {/* Comparison Table */}
        <div className="w-full max-w-[500px] px-4 pb-12">
          <table className="w-full" style={{ tableLayout: 'fixed', borderCollapse: 'collapse' }}>
            <colgroup>
              <col style={{ width: '44%' }} />
              <col style={{ width: '28%' }} />
              <col style={{ width: '28%' }} />
            </colgroup>
            <thead>
              <tr className={`border-b ${isLightMode ? 'border-black/10' : 'border-white/10'}`}>
                <th className={`pb-3 text-left font-['Inter'] font-semibold text-[13px] ${isLightMode ? 'text-black/50' : 'text-white/50'}`}>Feature</th>
                <th className="pb-3 text-center font-['Inter'] font-semibold text-[13px] text-[#19ad7d]">Enzy</th>
                <th className={`pb-3 text-center font-['Inter'] font-semibold text-[13px] ${isLightMode ? 'text-black/50' : 'text-white/50'}`}>Other Tools</th>
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
                  <td className={`py-[18px] font-['Inter'] font-semibold text-[16px] leading-snug ${isLightMode ? 'text-[#1a202c]' : 'text-white'}`}>
                    {feature}
                  </td>
                  <td className="py-[18px] text-center">
                    <Check size={22} strokeWidth={2.5} className="text-[#19ad7d] inline-block" />
                  </td>
                  <td className="py-[18px] text-center">
                    <X size={18} strokeWidth={2} className={`inline-block ${isLightMode ? 'text-black/40' : 'text-white/40'}`} />
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