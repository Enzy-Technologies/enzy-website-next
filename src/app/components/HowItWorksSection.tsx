"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "@/app/components/ThemeProvider";

type Step = {
  numeral: string;
  title: string;
  body: string;
  timing: string;
  placeholderImage: string;
  imageAlt: string;
};

const STEPS: Step[] = [
  {
    numeral: "01",
    title: "Integrate",
    body: "Connect your CRM, comms, and ops stack in days. Keep your sources. Enzy sits on top — no rip-and-replace.",
    timing: "Days 1–7",
    placeholderImage: "https://placehold.co/800x480/f5f5f0/19ad7d?text=Integrate",
    imageAlt: "Integrate your stack",
  },
  {
    numeral: "02",
    title: "Activate",
    body: "Make activity visible across reps, teams, and managers. Real-time, every level. No spreadsheet tax.",
    timing: "Week 2",
    placeholderImage: "https://placehold.co/800x480/f0f4f2/19ad7d?text=Activate",
    imageAlt: "Activate your teams",
  },
  {
    numeral: "03",
    title: "Accelerate",
    body: "AI suggests next actions. Competitions reinforce habits. Results compound, week over week.",
    timing: "Ongoing",
    placeholderImage: "https://placehold.co/800x480/e8f5f0/19ad7d?text=Accelerate",
    imageAlt: "Accelerate results",
  },
];

function Card({ step, index, totalSteps, isLightMode, scrollYProgress }: { step: Step, index: number, totalSteps: number, isLightMode: boolean, scrollYProgress: any }) {
  // Create distinct phases: Read -> Transition -> Read -> Transition -> Read
  const totalUnits = totalSteps * 2 - 1;
  const stepSize = 1 / totalUnits;
  
  const startProgress = index > 0 ? Number(((index * 2 - 1) * stepSize).toFixed(4)) : 0;
  const endProgress = index > 0 ? Number(((index * 2) * stepSize).toFixed(4)) : 0;

  const yPoints = [0];
  const yValues = [index > 0 ? "100%" : "0%"];
  const scalePoints = [0];
  const scaleValues = [1];
  
  if (index > 0) {
    yPoints.push(startProgress, endProgress);
    yValues.push("100%", "0%");
    scalePoints.push(startProgress, endProgress);
    scaleValues.push(1, 1);
  }
  
  for (let i = index + 1; i < totalSteps; i++) {
    const i_start = Number(((i * 2 - 1) * stepSize).toFixed(4));
    const i_end = Number(((i * 2) * stepSize).toFixed(4));
    
    // Wait until the next card is 60% up before starting to scale this one
    const delayStart = Number((i_start + (i_end - i_start) * 0.6).toFixed(4));
    
    // If delayStart is not the last point, push it to anchor the flat region
    if (yPoints[yPoints.length - 1] < delayStart) {
      yPoints.push(delayStart);
      yValues.push(`-${(i - index - 1) * 2.5}vh`);
      
      scalePoints.push(delayStart);
      scaleValues.push(1 - (i - index - 1) * 0.05);
    }
    
    yPoints.push(i_end);
    yValues.push(`-${(i - index) * 2.5}vh`);
    
    scalePoints.push(i_end);
    scaleValues.push(1 - (i - index) * 0.05);
  }

  // Ensure arrays end at 1 to satisfy WAAPI scroll timelines
  if (yPoints[yPoints.length - 1] < 1) {
    yPoints.push(1);
    yValues.push(yValues[yValues.length - 1]);
    scalePoints.push(1);
    scaleValues.push(scaleValues[scaleValues.length - 1]);
  }
  
  const y = useTransform(scrollYProgress, yPoints, yValues);
  const scale = useTransform(scrollYProgress, scalePoints, scaleValues);

  // Hide upcoming cards with visibility (not opacity) so they don't stack on
  // Integrate while staying fully opaque once they enter.
  const visibility = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [Math.max(0, startProgress - 0.001), startProgress],
    index === 0 ? ["visible", "visible"] : ["hidden", "visible"]
  );

  return (
      <motion.div
      className={`absolute top-0 left-0 w-full h-full rounded-[32px] border py-12 px-8 sm:py-16 sm:px-12 md:py-20 md:px-16 lg:py-24 lg:px-20 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-start justify-between overflow-hidden transition-colors duration-500 origin-top ${
        isLightMode
          ? "bg-white border-black/10 text-black"
          : "bg-[#0a0a0c] border-white/10 text-white"
      }`}
      style={{ 
        y,
        scale,
        visibility,
        zIndex: index + 10,
        boxShadow: isLightMode 
          ? "0 -15px 40px rgba(0,0,0,0.08), 0 25px 50px -12px rgba(0,0,0,0.1)" 
          : "0 -15px 40px rgba(0,0,0,0.4), 0 25px 50px -12px rgba(0,0,0,0.4)"
      }}
    >
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

        <div
          className={`relative w-full aspect-[5/3] rounded-2xl overflow-hidden border ${
            isLightMode ? "border-black/10 bg-black/5" : "border-white/10 bg-white/5"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={step.placeholderImage}
            alt={step.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      
      <div className={`relative z-10 shrink-0 self-center md:self-start md:mt-2 flex items-center justify-center w-28 h-28 md:w-40 md:h-40 rounded-full border ${isLightMode ? "border-black/10 bg-black/5" : "border-white/10 bg-white/5"}`}>
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

