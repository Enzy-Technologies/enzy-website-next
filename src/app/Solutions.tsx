"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./components/ThemeProvider";
import { QuickJumpFAB } from "./components/QuickJumpFAB";

const SOLUTIONS_DATA = [
  {
    id: 'sales-teams',
    role: 'Sales Teams',
    tagline: 'Daily visibility + AI-guided action.',
    title: 'Turn activity into outcomes',
    description: 'Enzy connects your sales data, flags what changed, and suggests next-best actions—then reinforces execution with competitions and incentives.',
    stats: [
      { value: 'Live', label: 'Performance visibility across reps and teams' },
      { value: 'Faster', label: 'Suggested actions when KPIs move' },
      { value: 'Less admin', label: 'More time spent selling' }
    ]
  },
  {
    id: 'operations',
    role: 'Operations',
    tagline: 'One system. Fewer handoffs.',
    title: 'Run operations with clarity',
    description: 'Make goals, performance, and communication easy to see. Enzy keeps teams aligned with messaging, dashboards, and AI summaries.',
    stats: [
      { value: 'Aligned', label: 'Shared visibility across teams and leaders' },
      { value: 'Engaged', label: 'Clear goals + friendly competition' },
      { value: 'Actionable', label: 'Feedback you can use' }
    ]
  },
  {
    id: 'executive-leadership',
    role: 'Executive Leadership',
    tagline: 'Less reporting. More direction.',
    title: 'Lead with signal, not noise',
    description: 'Get AI summaries, trends, and risks—plus the actions to move the numbers. Keep strategy tied to execution.',
    stats: [
      { value: 'Signal', label: 'What changed + why it matters' },
      { value: 'Now', label: 'Real-time KPIs across the org' },
      { value: 'Aligned', label: 'Teams pulling in the same direction' }
    ]
  }
];

export function Solutions() {
  const { isLightMode } = useTheme();
  const [activeId, setActiveId] = useState(SOLUTIONS_DATA[0].id);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const hashId = hash.replace("#", "");
      if (!SOLUTIONS_DATA.some((s) => s.id === hashId)) return;

      setActiveId(hashId);
      const el = document.getElementById("solutions-interactive");
      if (!el) return;

      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const activeData = SOLUTIONS_DATA.find(s => s.id === activeId) || SOLUTIONS_DATA[0];
  const jumpItems = SOLUTIONS_DATA.map((s, i) => ({
    id: s.id,
    label: s.role,
    meta: (i + 1).toString().padStart(2, "0"),
  }));

  return (
    <>
      <section className="relative flex flex-col items-center justify-start w-full px-4 pt-8 md:pt-16 lg:pt-24 pb-12 md:pb-16 max-w-7xl mx-auto z-20">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center w-full mb-16 md:mb-24"
      >
        <div className={`px-5 py-2 rounded-full border backdrop-blur-sm mb-8 transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-black/5 text-black/60' : 'border-white/10 bg-white/5 text-white/60'} eyebrow`}>
          Platform Adaptability
        </div>
        <h1 className={`font-['IvyOra_Text'] font-medium text-5xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-[-2px] text-center max-w-4xl transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
          Tailored <span className="text-[#19ad7d]">Solutions</span>
        </h1>
        <p className={`font-['Inter'] text-base md:text-lg mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/50'}`}>
          Pick your role. See how Enzy turns connected data into actions you can launch.
        </p>
      </motion.div>

      {/* Interactive Solutions By Role Section */}
      <div id="solutions-interactive" className="w-full flex flex-col lg:flex-row gap-6 md:gap-10">
        
        {/* Left Column: Navigation Cards */}
        <div className="w-full lg:w-[35%] flex flex-col gap-4">
          <div className={`mb-4 border-b pb-4 pl-2 transition-colors duration-500 ${isLightMode ? 'text-black/40 border-black/10' : 'text-white/40 border-white/10'} eyebrow`}>
            Solutions By Role
          </div>
          
          <div className="flex flex-col gap-3">
            {SOLUTIONS_DATA.map((solution) => {
              const isActive = activeId === solution.id;
              
              return (
                <button
                  key={solution.id}
                  onClick={() => setActiveId(solution.id)}
                  className={`group relative text-left w-full p-6 rounded-2xl transition-all duration-500 overflow-hidden liquid-glass ${
                    isActive 
                      ? isLightMode 
                        ? 'bg-[#19ad7d]/10 border border-[#19ad7d]/40 shadow-[0_8px_32px_rgba(25,173,125,0.15)]'
                        : 'bg-[linear-gradient(189.6deg,rgba(25,173,125,0.15)_25.1%,rgba(20,144,103,0.05)_64.2%)] border border-[#19ad7d]/40 shadow-[0_8px_32px_rgba(25,173,125,0.15)]' 
                      : isLightMode
                        ? 'bg-black/5 border border-black/10 hover:border-black/30 hover:bg-black/10'
                        : 'bg-[rgba(255,255,255,0.03)] border border-white/10 hover:border-white/30 hover:bg-[rgba(255,255,255,0.08)]'
                  }`}
                >
                  {/* Subtle active glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#19ad7d]/10 blur-xl rounded-2xl pointer-events-none" />
                  )}
                  
                  <div className="relative z-10 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className={`font-['Inter'] text-[18px] md:text-[20px] font-semibold transition-colors duration-300 ${isActive ? 'text-[#19ad7d]' : isLightMode ? 'text-black group-hover:text-black/80' : 'text-white group-hover:text-white/90'}`}>
                        {solution.role}
                      </span>
                      <ArrowRight 
                        size={20} 
                        className={`transition-all duration-500 ${isActive ? 'text-[#19ad7d] translate-x-1 opacity-100' : isLightMode ? 'text-black/30 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100' : 'text-white/30 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} 
                      />
                    </div>
                    <p className={`text-sm mt-3 transition-colors duration-300 ${isActive ? (isLightMode ? 'text-black/80' : 'text-white/80') : (isLightMode ? 'text-black/50' : 'text-white/50')}`}>
                      {solution.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Content Area */}
        <div className="w-full lg:w-[65%] mt-8 lg:mt-0 flex flex-col">
          <div className="text-transparent mb-4 border-b border-transparent pb-4 hidden lg:block select-none eyebrow">
            Spacer
          </div>
          
          <div className="relative w-full flex-1 rounded-[32px] overflow-hidden min-h-[500px] flex items-center transition-colors duration-500 liquid-glass">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(25,173,125,0.15)_0%,transparent_70%)] rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(25,173,125,0.05)_0%,transparent_70%)] rounded-full blur-[60px] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 w-full h-full p-8 md:p-12 lg:p-16 flex flex-col justify-center"
              >
                <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 items-start w-full">
                  {/* Left Block: Title */}
                  <div className="w-full xl:w-1/2">
                    <h2 className={`font-['Inter'] text-3xl md:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.1] mb-6 transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
                      {activeData.title}
                    </h2>
                  </div>
                  
                  {/* Right Block: Description */}
                  <div className="w-full xl:w-1/2">
                    <p className={`font-['Inter'] text-base md:text-[17px] leading-[1.7] transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                      {activeData.description}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className={`w-full h-[1px] bg-gradient-to-r from-transparent to-transparent my-12 transition-colors duration-500 ${isLightMode ? 'via-black/10' : 'via-white/10'}`} />

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 w-full">
                  {activeData.stats.map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                      className="flex flex-col items-center md:items-start text-center md:text-left"
                    >
                      <span className={`font-['Inter'] text-6xl md:text-[72px] lg:text-[96px] font-bold tracking-tighter mb-4 leading-[1] bg-clip-text text-transparent bg-gradient-to-b inline-block transition-colors duration-500 ${isLightMode ? 'from-black to-black/60' : 'from-white to-white/60'}`}>
                        {stat.value}
                      </span>
                      <p className={`font-['Inter'] text-[15px] font-medium leading-[1.6] max-w-[280px] transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Solutions By Industry (Placeholder for future) */}
      <div className="w-full mt-32 flex flex-col items-center">
        <div className="text-white/40 mb-8 eyebrow">
          Solutions By Industry
        </div>
        <div className="w-full max-w-4xl h-[200px] flex items-center justify-center rounded-3xl border border-dashed border-white/20 bg-[rgba(255,255,255,0.02)] backdrop-blur-md relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.05)_0%,transparent_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="px-6 py-3 rounded-full bg-[#19ad7d]/10 border border-[#19ad7d]/20 text-[#19ad7d] shadow-[0_0_20px_rgba(25,173,125,0.1)] eyebrow">
            Coming Soon
          </div>
        </div>
      </div>

      </section>

      <QuickJumpFAB
        title="Quick Jump"
        items={jumpItems}
        onJump={(id) => {
          setActiveId(id);
          const el = document.getElementById("solutions-interactive");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
          if (window.location.hash !== `#${id}`) window.history.replaceState(null, "", `#${id}`);
        }}
      />
    </>
  );
}