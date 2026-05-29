"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useTheme } from "@/app/components/ThemeProvider";
import { BlurReveal } from "./BlurReveal";

type Step = {
  title: string;
  body: string;
  placeholderImage: string;
  imageAlt: string;
};

const STEPS: Step[] = [
  {
    title: "Real Time Visibility",
    body: "Connect your data. Every rep, every metric, every trend — live and visible across the whole team. Most managers find out who's slipping at the end of the month. Yours will know in real-time.",
    placeholderImage:
      "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/1-1%20Leaderboard%20podium%20(light%20mode).png",
    imageAlt: "Live leaderboard close-up",
  },
  {
    title: "EnzyAI",
    body: "Enzy's AI runs in the background — watching signals, flagging problems, surfacing the right move. \u201CSales down 5% this week. Launch an incentive.\u201D \u201CThree reps haven't closed in two weeks.\u201D Not analysis requests. Answers.",
    placeholderImage:
      "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/AI%20Chat%201.png",
    imageAlt: "AI insights close-up",
  },
  {
    title: "An Immersive Experience",
    body: "Competitions drive urgency. Recognition builds loyalty. Habits form. The team stops feeling like a job and starts feeling like a team. High performers stay. New hires ramp faster. Results compound.",
    placeholderImage:
      "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Chats%20(light%20mode).png",
    imageAlt: "Live competition or recognition moment in messaging",
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
        willChange: "transform",
        boxShadow: isLightMode 
          ? "0 -15px 40px rgba(0,0,0,0.08), 0 25px 50px -12px rgba(0,0,0,0.1)" 
          : "0 -15px 40px rgba(0,0,0,0.4), 0 25px 50px -12px rgba(0,0,0,0.4)"
      }}
    >
      <div className="relative z-10 flex flex-col gap-6 max-w-2xl">
        <h3 className={`font-ivyora font-medium text-[40px] sm:text-[56px] md:text-[64px] leading-[1.05] tracking-[-2px] ${isLightMode ? "text-black" : "text-white"}`}>
          {step.title}
        </h3>
        <p className={`font-inter text-[16px] sm:text-[18px] md:text-[20px] font-medium leading-snug ${isLightMode ? "text-black/70" : "text-white/70"}`}>
          {step.body}
        </p>
      </div>

      <div
        className={`relative z-10 w-full md:w-[44%] shrink-0 aspect-[3/4] sm:aspect-[5/4] md:aspect-[3/4] rounded-2xl overflow-hidden border ${
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

  // Spring-smooth the progress so mobile's bursty scroll deltas become a
  // continuous stream — cards glide between phases instead of stepping.
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 120,
    mass: 0.4,
    restDelta: 0.0005,
  });

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative w-full px-4 h-[400vh]"
    >
      <div className="sticky top-[env(safe-area-inset-top,0px)] h-[100dvh] w-full flex flex-col items-center justify-start max-w-6xl mx-auto pt-24 lg:pt-32">
        <div className="flex flex-col items-center justify-center text-center mb-8 shrink-0 max-w-[1000px] px-4">
          <p className="font-inter text-[12px] md:text-[14px] tracking-[0.2em] uppercase font-bold text-[#19ad7d] mb-6">
            The Methodology
          </p>
          <h2
            className={`font-ivyora font-medium text-5xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-[-2px] transition-colors duration-500 ${
              isLightMode ? "text-black" : "text-white"
            }`}
          >
            <BlurReveal as="span" delay={0.1}>
              How Enzy creates{" "}
            </BlurReveal>
            <BlurReveal as="span" delay={0.5} className="italic">
              momentum
            </BlurReveal>
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
              scrollYProgress={smoothScrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

