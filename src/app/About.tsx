"use client";

import React from "react";
import { ArrowRight, BarChart2, Zap, Users, ShieldCheck, Trophy, Target } from "lucide-react";
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
        <FadeInSection className="flex flex-col items-center w-full mb-32">
          <div className={`px-5 py-2 rounded-full border backdrop-blur-sm text-xs font-bold tracking-[0.2em] uppercase mb-8 transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-black/5 text-black/60' : 'border-white/10 bg-white/5 text-white/60'}`}>
            The Engagement Problem
          </div>
          <h1 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-[-2px] max-w-3xl mb-8 transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
            You don't have a data problem. You have an <span className="text-[#19ad7d]">engagement</span> problem.
          </h1>
          <p className={`font-['Inter'] text-lg md:text-xl max-w-2xl leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
            Sales teams are drowning in dashboards, yet still missing targets. Managers spend half their week chasing updates instead of coaching. You don't need another clunky tool your team hates—you need a system that actually drives behavior.
          </p>
        </FadeInSection>

        {/* 2. The Problem */}
        <FadeInSection className="w-full flex flex-col md:flex-row gap-12 text-left items-start mb-32">
          <div className="w-full md:w-1/3">
            <h2 className={`font-['Inter'] text-2xl md:text-3xl font-bold leading-tight transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
              The gap between strategy & execution.
            </h2>
          </div>
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <p className={`font-['Inter'] text-lg leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/70' : 'text-white/70'}`}>
              Most enterprise software feels like a tax on your team's time. Reps are forced to log data into disjointed systems, draining their energy and pulling them away from what matters: selling.
            </p>
            <p className={`font-['Inter'] text-lg leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/70' : 'text-white/70'}`}>
              The result? High turnover, low morale, and leadership flying blind because the data is always two weeks old. Strategy gets lost in translation between the boardroom and the frontline.
            </p>
          </div>
        </FadeInSection>

        {/* 3. Our Story (Condensed) */}
        <FadeInSection className="w-full mb-32">
          <div className={`relative w-full rounded-[32px] border backdrop-blur-[32px] overflow-hidden flex flex-col md:flex-row items-stretch transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-white/60 shadow-[0_16px_64px_rgba(0,0,0,0.05)]' : 'border-white/10 bg-[rgba(11,15,20,0.65)] shadow-[0_16px_64px_rgba(0,0,0,0.4)]'}`}>
            <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center text-left">
              <div className="text-[#19ad7d] text-xs font-bold tracking-[0.2em] uppercase mb-6">
                Our Story
              </div>
              <h3 className={`font-['Inter'] text-3xl font-bold mb-6 leading-tight transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
                Built by people who felt the pain.
              </h3>
              <p className={`font-['Inter'] text-base leading-relaxed mb-4 transition-colors duration-500 ${isLightMode ? 'text-black/70' : 'text-white/70'}`}>
                We spent years leading sales and operations teams. We bought all the expensive software, hoping it would fix our pipeline and motivate our reps. It didn't.
              </p>
              <p className={`font-['Inter'] text-base leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/70' : 'text-white/70'}`}>
                The turning point came when we realized the tools were designed for compliance, not performance. So we stopped looking for a better dashboard and decided to build an engine that actually powers human motivation.
              </p>
            </div>
            <div className="w-full md:w-1/2 min-h-[300px] relative bg-black/50">
              <img 
                src="https://images.unsplash.com/photo-1614643738701-b3e3b4245dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWFtJTIwd29ya2luZyUyMGRhcmslMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzc1NjgwMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Our Story" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity"
              />
              <div className={`absolute inset-0 bg-gradient-to-r md:bg-gradient-to-l transition-colors duration-500 ${isLightMode ? 'from-white/60 to-transparent' : 'from-[rgba(11,15,20,0.65)] to-transparent'}`} />
            </div>
          </div>
        </FadeInSection>

        {/* 4. What We Do Now */}
        <FadeInSection className="w-full text-center max-w-3xl mx-auto mb-32">
          <h2 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-5xl mb-8 tracking-[-2px] transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
            An engine for high-performance cultures.
          </h2>
          <p className={`font-['Inter'] text-lg md:text-xl leading-relaxed mb-6 transition-colors duration-500 ${isLightMode ? 'text-black/70' : 'text-white/70'}`}>
            Enzy transforms your daily operations from a chore into a competitive advantage. We give your teams the exact insights, leaderboards, and incentives they need—right when they need them.
          </p>
          <p className={`font-['Inter'] text-lg md:text-xl leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/70' : 'text-white/70'}`}>
            No more nagging for updates. No more guessing what's working. Just a clear, intuitive platform that your team will actually want to open every morning.
          </p>
        </FadeInSection>

        {/* 5. Proof / Credibility */}
        <FadeInSection className="w-full mb-32">
          <div className="text-center mb-12">
            <h2 className={`font-['Inter'] text-3xl font-bold mb-4 transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>The results speak for themselves.</h2>
            <p className={`font-['Inter'] text-base max-w-2xl mx-auto transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
              We measure our success by your team's output. This isn't just theory—it's driving measurable revenue growth for companies managing thousands of daily interactions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { stat: "35%", label: "Increase in active selling time" },
              { stat: "40%", label: "Reduction in manual entry tasks" },
              { stat: "2.5x", label: "Faster response to critical leads" }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-3xl border backdrop-blur-xl flex flex-col items-center justify-center text-center group transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-black/5 hover:bg-[#19ad7d]/10' : 'border-white/10 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(25,173,125,0.05)]'}`}>
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
        <FadeInSection className="w-full mb-32 text-left">
          <h2 className={`font-['Inter'] text-3xl font-bold mb-12 text-center transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>Why this actually works.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={24} className="text-[#19ad7d]" />,
                title: "Built for the user first.",
                desc: "If your reps hate it, they won't use it. Enzy feels like the modern, fast consumer apps they already love."
              },
              {
                icon: <Zap size={24} className="text-[#19ad7d]" />,
                title: "Zero manual entry.",
                desc: "We pull the data you already have and turn it into actionable, real-time insights without the busywork."
              },
              {
                icon: <Trophy size={24} className="text-[#19ad7d]" />,
                title: "Engineered motivation.",
                desc: "We don't just show numbers. We drive action through targeted competitions and intelligent incentives."
              }
            ].map((diff, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors duration-500 ${isLightMode ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'}`}>
                  {diff.icon}
                </div>
                <h3 className={`font-['Inter'] text-xl font-bold transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>{diff.title}</h3>
                <p className={`font-['Inter'] text-base leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>{diff.desc}</p>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* 7. Vision / Future */}
        <FadeInSection className="w-full flex flex-col md:flex-row gap-12 text-left items-center mb-40">
          <div className="w-full md:w-1/2">
            <div className={`w-full aspect-square rounded-[32px] overflow-hidden relative border shadow-[0_16px_64px_rgba(0,0,0,0.4)] transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-white/60' : 'border-white/10 bg-[rgba(11,15,20,0.65)]'}`}>
               <img 
                 src="https://images.unsplash.com/photo-1754039984985-ef607d80113a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwbW9uaXRvciUyMGRhcmslMjBvZmZpY2V8ZW58MXx8fHwxNzc1NjgwMjY5fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                 alt="Future Vision" 
                 className={`w-full h-full object-cover mix-blend-luminosity transition-all duration-500 ${isLightMode ? 'opacity-80' : 'opacity-40'}`}
               />
               <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,100%)] transition-colors duration-500 ${isLightMode ? 'from-transparent to-white/40' : 'from-transparent to-[rgba(11,15,20,0.8)]'}`} />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className={`font-['Inter'] text-3xl font-bold leading-tight mb-2 transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
              Where we're going.
            </h2>
            <p className={`font-['Inter'] text-lg leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/70' : 'text-white/70'}`}>
              The future of work isn't just about remote vs. office. It's about giving people the clarity, focus, and recognition they deserve, no matter where they sit. 
            </p>
            <p className={`font-['Inter'] text-lg leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/70' : 'text-white/70'}`}>
              We're building the infrastructure that will power the next generation of world-class sales and operational cultures. We're creating a world where every action is acknowledged, and every target is within reach.
            </p>
          </div>
        </FadeInSection>

        {/* 8. Call to Action */}
        <FadeInSection className="w-full">
          <div className={`relative w-full rounded-[40px] border backdrop-blur-2xl p-12 md:p-20 text-center flex flex-col items-center overflow-hidden group transition-all duration-500 ${isLightMode ? 'border-[#19ad7d]/20 bg-[#19ad7d]/5 shadow-[0_16px_64px_rgba(25,173,125,0.05)]' : 'border-[#19ad7d]/30 bg-[linear-gradient(189.6deg,rgba(25,173,125,0.15)_25.1%,rgba(20,144,103,0.05)_64.2%)] shadow-[0_16px_64px_rgba(25,173,125,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)]'}`}>
            
            {/* CTA Background Effects */}
            <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(25,173,125,0.2)_0%,transparent_70%)] transition-opacity duration-700 pointer-events-none ${isLightMode ? 'opacity-20 group-hover:opacity-40' : 'opacity-50 group-hover:opacity-100'}`} />
            
            <Target size={48} className="text-[#19ad7d] mb-8 relative z-10" />
            <h2 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-5xl mb-6 tracking-[-2px] relative z-10 transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
              Ready to change how your team works?
            </h2>
            <p className={`font-['Inter'] text-lg max-w-xl mx-auto mb-10 relative z-10 leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/70' : 'text-white/70'}`}>
              Stop paying for software that slows you down. Let's talk about what Enzy can do for your numbers this quarter.
            </p>
            <Link
              href="/solutions"
              className={`relative z-10 flex items-center gap-3 px-8 py-4 rounded-full font-['Inter'] font-bold text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_32px_rgba(25,255,255,0.2)] ${isLightMode ? 'bg-black text-white' : 'bg-white text-black'}`}
            >
              Book a Strategy Call <ArrowRight size={18} />
            </Link>
          </div>
        </FadeInSection>

      </div>

      <TestimonialsSection />
      </div>
    </>
  );
}