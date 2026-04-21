"use client";

import React from "react";
import { ArrowRight, Target } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useTheme } from "./components/ThemeProvider";
import { TestimonialsSection } from "./components/TestimonialsSection";

// Helper for smooth scroll fade-in sections
const FadeInSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export function About() {
  const { isLightMode } = useTheme();

  return (
    <>
      <div className="relative w-full flex flex-col items-center justify-start pt-8 md:pt-16 lg:pt-24 pb-24 md:pb-32 overflow-hidden z-20 transition-colors duration-500">
      
      {/* Background Glows */}
      <div className={`absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.08)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none ${isLightMode ? 'opacity-50' : 'opacity-100'}`} />
      <div className={`absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.06)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none ${isLightMode ? 'opacity-50' : 'opacity-100'}`} />

      <div className="max-w-4xl w-full px-6 flex flex-col items-center text-center">
        
        {/* 1. Opening Hook */}
        <FadeInSection className="flex flex-col items-center w-full mb-20 md:mb-24">
          <div className={`px-5 py-2 rounded-full border backdrop-blur-sm mb-8 transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-black/5 text-black/60' : 'border-white/10 bg-white/5 text-white/60'} eyebrow`}>
            About Enzy
          </div>
          <h1 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-[-2px] max-w-3xl mb-8 transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
            You don’t have a data problem. You have an <span className="text-[#19ad7d]">execution</span> problem.
          </h1>
          <p className={`font-['Inter'] text-lg md:text-xl max-w-2xl leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
            Enzy connects your data, highlights what changed, and helps your team take action—fast.
          </p>
        </FadeInSection>

        {/* Core: what Enzy does */}
        <FadeInSection className="w-full mb-20 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "Connect", desc: "Plug into your tools and data sources." },
              { title: "Understand", desc: "AI summarizes what changed and why it matters." },
              { title: "Act", desc: "Launch competitions, incentives, and messaging—fast." },
            ].map((x) => (
              <div key={x.title} className="relative rounded-[28px] p-7 md:p-8 liquid-glass">
                <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/35 to-transparent" />
                <h3 className={`font-['Inter'] text-[18px] md:text-[20px] font-semibold tracking-tight ${isLightMode ? "text-black" : "text-white"}`}>
                  {x.title}
                </h3>
                <p className={`mt-2 font-['Inter'] text-[14px] md:text-[15px] leading-relaxed ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                  {x.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* 5. Proof / Credibility */}
        <FadeInSection className="w-full mb-20 md:mb-24">
          <div className="text-center mb-12">
            <h2 className={`font-['Inter'] text-3xl font-bold mb-4 transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
              Results teams feel daily
            </h2>
            <p className={`font-['Inter'] text-base max-w-2xl mx-auto transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
              Less admin work. More focus. More execution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "35%", label: "Increase in active selling time" },
              { stat: "40%", label: "Reduction in manual entry tasks" },
              { stat: "2.5x", label: "Faster response to critical leads" }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-3xl flex flex-col items-center justify-center text-center group transition-colors duration-500 liquid-glass ${isLightMode ? 'hover:bg-[#19ad7d]/10' : 'hover:bg-[rgba(25,173,125,0.05)]'}`}>
                <span className={`font-['Inter'] text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b mb-3 transition-all duration-500 ${isLightMode ? 'from-black to-black/50 group-hover:from-[#19ad7d] group-hover:to-[#19ad7d]/80' : 'from-white to-white/50 group-hover:from-[#19ad7d] group-hover:to-[#19ad7d]/50'}`}>
                  {item.stat}
                </span>
                <span className={`font-['Inter'] text-sm font-medium leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* 6. How We're Different */}
        <FadeInSection className="w-full mb-20 md:mb-24 text-left">
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <div className="eyebrow text-[#19ad7d]">Why it works</div>
            <h2 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-5xl tracking-[-2px] transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
              Designed for adoption and action
            </h2>
            <p className={`font-['Inter'] text-[15px] md:text-[16px] leading-relaxed max-w-2xl transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
              Three reasons teams keep Enzy open every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Built for adoption",
                desc: "Fast, simple, and designed for daily use.",
                bullets: ["Modern UI reps like", "Clear goals and progress", "Mobile-first"],
              },
              {
                title: "Connected data → clear signal",
                desc: "AI highlights what changed and what to do next.",
                bullets: ["Real-time visibility", "Summaries and suggestions", "Less admin work"],
              },
              {
                title: "Momentum that sticks",
                desc: "Competitions and incentives reinforce behavior.",
                bullets: ["Launch in minutes", "Team or individual", "Rewards and recognition"],
              },
            ].map((diff, i) => (
              <div
                key={i}
                className={`relative rounded-[28px] p-7 md:p-8 transition-colors duration-500 liquid-glass ${
                  isLightMode ? "hover:bg-[#19ad7d]/10" : "hover:bg-[rgba(25,173,125,0.06)]"
                }`}
              >
                <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/35 to-transparent" />

                <h3 className={`font-['Inter'] text-[18px] md:text-[20px] font-semibold tracking-tight transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
                  {diff.title}
                </h3>
                <p className={`mt-2 font-['Inter'] text-[14px] md:text-[15px] leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                  {diff.desc}
                </p>

                <ul className="mt-5 flex flex-col gap-2.5">
                  {diff.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#19ad7d] shrink-0 shadow-[0_0_10px_rgba(25,173,125,0.55)]" />
                      <span className={`font-['Inter'] text-[13px] md:text-[14px] leading-snug ${isLightMode ? "text-black/70" : "text-white/70"}`}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* 8. Call to Action */}
        <FadeInSection className="w-full">
          <div className={`relative w-full rounded-[40px] p-12 md:p-20 text-center flex flex-col items-center overflow-hidden group transition-all duration-500 liquid-glass ${isLightMode ? 'border-[#19ad7d]/20 bg-[#19ad7d]/5' : 'border-[#19ad7d]/30 bg-[linear-gradient(189.6deg,rgba(25,173,125,0.15)_25.1%,rgba(20,144,103,0.05)_64.2%)]'}`}>
            
            {/* CTA Background Effects */}
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(25,173,125,0.2)_0%,transparent_70%)] transition-opacity duration-700 pointer-events-none ${isLightMode ? 'opacity-20 group-hover:opacity-40' : 'opacity-50 group-hover:opacity-100'}`} />
            
            <Target size={48} className="text-[#19ad7d] mb-8 relative z-10" />
            <h2 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-5xl mb-6 tracking-[-2px] relative z-10 transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
              Ready to change how your team works?
            </h2>
            <p className={`font-['Inter'] text-lg max-w-xl mx-auto mb-10 relative z-10 leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/70' : 'text-white/70'}`}>
              See the system live. Get a plan for your team this quarter.
            </p>
            <Link
              href="/solutions"
              className={`relative z-10 flex items-center gap-3 px-8 py-4 rounded-full font-['Inter'] font-bold text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_32px_rgba(25,255,255,0.2)] ${isLightMode ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              Book a demo <ArrowRight size={18} />
            </Link>
          </div>
        </FadeInSection>

      </div>

      <TestimonialsSection />
      </div>
    </>
  );
}