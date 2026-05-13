"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "@/app/components/ThemeProvider";

type Step = {
  numeral: string;
  title: string;
  body: string;
  timing: string;
};

const STEPS: Step[] = [
  {
    numeral: "01",
    title: "Integrate",
    body: "Connect your CRM, comms, and ops stack in days. Keep your sources. Enzy sits on top — no rip-and-replace.",
    timing: "Days 1–7",
  },
  {
    numeral: "02",
    title: "Activate",
    body: "Make activity visible across reps, teams, and managers. Real-time, every level. No spreadsheet tax.",
    timing: "Week 2",
  },
  {
    numeral: "03",
    title: "Accelerate",
    body: "AI suggests next actions. Competitions reinforce habits. Results compound, week over week.",
    timing: "Ongoing",
  },
];

function Card({ step, index, totalSteps, isLightMode, scrollYProgress }: { step: Step, index: number, totalSteps: number, isLightMode: boolean, scrollYProgress: any }) {
  // Add an extra step to the total so the final card has a chance to stay on screen
  // before the section unpins.
  const animationSteps = totalSteps; 
  const stepSize = 1 / animationSteps;
  const startProgress = Math.max(0, (index - 1) * stepSize);
  const endProgress = index * stepSize;

  const yPoints = [];
  const yValues = [];
  const scalePoints = [];
  const scaleValues = [];
  const overlayPoints = [];
  const overlayValues = [];
  
  if (index > 0) {
    if (startProgress > 0) {
      yPoints.push(0, startProgress, endProgress);
      yValues.push("100vh", "100vh", "0vh");
      scalePoints.push(0, startProgress, endProgress);
      scaleValues.push(1, 1, 1);
      overlayPoints.push(0, startProgress, endProgress);
      overlayValues.push(0, 0, 0);
    } else {
      yPoints.push(0, endProgress);
      yValues.push("100vh", "0vh");
      scalePoints.push(0, endProgress);
      scaleValues.push(1, 1);
      overlayPoints.push(0, endProgress);
      overlayValues.push(0, 0);
    }
  } else {
    yPoints.push(0);
    yValues.push("0vh");
    scalePoints.push(0);
    scaleValues.push(1);
    overlayPoints.push(0);
    overlayValues.push(0);
  }
  
  for (let i = index + 1; i < totalSteps; i++) {
    const i_start = (i - 1) * stepSize;
    const i_end = i * stepSize;
    const delayStart = i_start + (i_end - i_start) * 0.85; // Wait until next card is 85% up
    
    yPoints.push(delayStart, i_end);
    yValues.push(`-${(i - index - 1) * 2.5}vh`, `-${(i - index) * 2.5}vh`);
    
    scalePoints.push(delayStart, i_end);
    scaleValues.push(1 - (i - index - 1) * 0.05, 1 - (i - index) * 0.05);
    
    overlayPoints.push(delayStart, i_end);
    overlayValues.push((i - index - 1) * 0.3, (i - index) * 0.3);
  }
  
  const y = useTransform(scrollYProgress, yPoints, yValues);
  const scale = useTransform(scrollYProgress, scalePoints, scaleValues);
  const overlayOpacity = useTransform(scrollYProgress, overlayPoints, overlayValues);

  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full rounded-[32px] border py-16 px-8 sm:py-20 sm:px-12 md:py-24 md:px-16 lg:py-28 lg:px-20 flex flex-col md:flex-row gap-10 md:gap-20 items-start md:items-center justify-between transition-colors duration-500 origin-top ${
        isLightMode
          ? "bg-[#f5f7fa] border-black/10 text-black"
          : "bg-[#0a0a0c] border-white/10 text-white"
      }`}
      style={{ 
        y,
        scale,
        zIndex: index + 10,
        boxShadow: isLightMode 
          ? "0 -15px 40px rgba(0,0,0,0.08), 0 25px 50px -12px rgba(0,0,0,0.1)" 
          : "0 -15px 40px rgba(0,0,0,0.4), 0 25px 50px -12px rgba(0,0,0,0.4)"
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-black rounded-[32px] pointer-events-none z-0"
        style={{ opacity: overlayOpacity }}
        initial={{ opacity: 0 }}
      />
      
      <div className="relative z-10 flex flex-col gap-6 max-w-xl">
        <div className={`font-inter text-[11px] font-bold uppercase tracking-[0.25em] ${isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"}`}>
          PHASE {step.numeral}
        </div>
        <h3 className={`font-ivyora font-medium text-[40px] sm:text-[56px] md:text-[64px] leading-[0.95] tracking-[-2px] ${isLightMode ? "text-black" : "text-white"}`}>
          {step.title}
        </h3>
        <p className={`font-inter text-[16px] sm:text-[18px] md:text-[20px] font-medium leading-snug mt-2 ${isLightMode ? "text-black/70" : "text-white/70"}`}>
          {step.body}
        </p>
      </div>
      
      <div className={`relative z-10 shrink-0 flex items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full border ${isLightMode ? "border-black/10 bg-black/5" : "border-white/10 bg-white/5"}`}>
        <div className={`font-inter text-[14px] md:text-[16px] font-bold uppercase tracking-widest text-center ${isLightMode ? "text-black/50" : "text-white/40"}`}>
          {step.timing.split(" ").map((word, i) => (
            <React.Fragment key={i}>
              {word}<br />
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorksSection() {
  const { isLightMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative w-full px-4 h-[400vh]"
    >
      <div className="sticky top-[env(safe-area-inset-top,0px)] h-[100dvh] w-full flex flex-col items-center justify-start max-w-6xl mx-auto pt-24 lg:pt-32">
        <div className="flex flex-col items-center justify-center text-center mb-8 shrink-0">
          <div className={`px-5 py-2 rounded-full border backdrop-blur-sm mb-6 transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-black/5 text-black/60' : 'border-white/10 bg-white/5 text-white/60'} eyebrow font-bold uppercase tracking-[0.25em] text-[11px]`}>
            THE METHODOLOGY
          </div>
          <h2 className={`font-ivyora font-medium text-5xl md:text-7xl lg:text-[80px] leading-[0.95] tracking-[-2px] transition-colors duration-500 ${isLightMode ? "text-black" : "text-white"}`}>
            How it works
          </h2>
        </div>

        <div className="relative w-full flex-1 flex items-start justify-center max-w-[1000px] mx-auto pb-10">
          {STEPS.map((step, idx) => (
            <Card 
              key={step.title} 
              step={step} 
              index={idx} 
              totalSteps={STEPS.length} 
              isLightMode={isLightMode} 
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

