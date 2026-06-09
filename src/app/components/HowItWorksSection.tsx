"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { BlurReveal } from "./BlurReveal";
import { useScrollPin } from "@/app/lib/useScrollPin";
import { useIsPhone } from "@/app/lib/useMediaQuery";

type Step = {
  title: string;
  body: React.ReactNode;
  icon: string;
};

// While the stage is pinned, clip it this many px short of the bottom edge.
// iOS Safari flattens its translucent bottom bar whenever a composited layer
// (here, a card) reaches the bottom viewport edge. Clipping keeps composited
// content off that edge, AND the clip's presence makes the flattened bar
// SELF-CLEAR when you scroll past instead of staying opaque until a refresh.
// Cards sit ~88px above the bottom (pb-12 + pb-10), so this only clips empty
// padding. Matches the Playground's STAGE_BOTTOM_CLIP.
const STAGE_BOTTOM_CLIP = 4; // px

const STEPS: Step[] = [
  {
    title: "Connect",
    body: (
      <>
        Enzy integrates with your existing CRM/data sources pulling your team&apos;s data into one real-time feed. Everything happening on your team — <span className="text-[#19ad7d]">visible to everyone</span>, all in one place.
      </>
    ),
    icon: "/icons/live-data-foundation.png",
  },
  {
    title: "Engage",
    body: (
      <>
        We bring social media-like dynamics to your sales team — profiles, badges, public leaderboards, group messaging, and live competitions. The mechanics that create momentum, drive behavior, and build a <span className="text-[#19ad7d]">high-performance culture that compounds</span>.
      </>
    ),
    icon: "/icons/social-engagement.png",
  },
  {
    title: "Perform",
    body: (
      <>
        <span className="text-[#19ad7d]">Our AI doesn&apos;t guess.</span> It&apos;s trained on real performance outcomes from tens of thousands of sales reps — so every competition, coaching moment, and incentive it surfaces is grounded in what&apos;s actually worked, at exactly the right time.
      </>
    ),
    icon: "/icons/ai-performance-intelligence.png",
  },
];

function Card({ step, index, totalSteps, scrollYProgress }: { step: Step, index: number, totalSteps: number, scrollYProgress: any }) {
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
      className="absolute top-0 left-0 w-full h-full rounded-[32px] border py-10 px-8 sm:py-16 sm:px-12 md:py-20 md:px-16 lg:py-24 lg:px-20 flex flex-col md:flex-row gap-5 sm:gap-8 md:gap-12 items-start md:items-center justify-between overflow-hidden transition-colors duration-500 origin-top bg-white border-black/10 text-black dark:bg-[#0a0a0c] dark:border-white/10 dark:text-white shadow-[0_-15px_40px_rgba(0,0,0,0.08),0_25px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_-15px_40px_rgba(0,0,0,0.4),0_25px_50px_-12px_rgba(0,0,0,0.4)]"
      style={{
        y,
        scale,
        visibility,
        zIndex: index + 10,
        willChange: "transform",
      }}
    >
      <div className="relative z-10 flex flex-col gap-4 sm:gap-6 max-w-2xl shrink-0 md:shrink">
        <h3 className="font-ivyora font-medium text-[26px] sm:text-[36px] md:text-[44px] leading-[1.1] tracking-[-1px] text-black dark:text-white">
          {step.title}
        </h3>
        <p className="font-inter text-[15px] sm:text-[18px] md:text-[20px] font-medium leading-snug text-black/70 dark:text-white/70">
          {step.body}
        </p>
      </div>

      <div className="relative z-10 w-full md:w-[44%] mx-auto flex-1 min-h-0 md:flex-none md:aspect-[3/4] flex items-center justify-center overflow-hidden md:overflow-visible">
        <Image
          src={step.icon}
          alt={step.title}
          width={1254}
          height={1254}
          sizes="(max-width: 768px) 220px, 320px"
          className="relative w-auto h-full max-h-[180px] max-w-full sm:max-h-[280px] md:w-full md:h-full md:max-w-[80%] md:max-h-[80%] object-contain"
        />
      </div>
    </motion.div>
  );
}

export function HowItWorksSection() {
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

  // Pin the stage with a `position: fixed` toggle instead of `position: sticky`.
  // A sticky stage with content becomes a persistent composited layer that
  // flattens iOS Safari's translucent safe-area bars page-wide; `fixed` does
  // not. See useScrollPin for the full rationale.
  const pin = useScrollPin(containerRef);

  // STAGE_BOTTOM_CLIP is PHONE-ONLY (Rule 3): an iPhone Safari toolbar quirk
  // iPadOS doesn't have. Tablets share the touch pin but skip the clip.
  const isPhone = useIsPhone();

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative w-full h-[400vh]"
    >
      {/* Full-width pinner (replaces position: sticky). Layout/centering lives
          on the inner div so it's unaffected by the fixed/absolute toggle. */}
      <div
        className="w-full"
        style={{
          position: pin.position,
          top: pin.top,
          bottom: pin.bottom,
          left: pin.left,
          // overflow:hidden contains the pinned cards for the whole touch tier;
          // only the 4px height clip is phone-only (Rule 3 — iOS Safari bar).
          height:
            pin.position === "fixed" && isPhone
              ? `calc(100dvh - ${STAGE_BOTTOM_CLIP}px)`
              : "100dvh",
          overflow: pin.position === "fixed" ? "hidden" : "visible",
        }}
      >
      {/* Size the card layout to the STABLE small viewport (svh), not the
          dynamic one (dvh). With dvh, scrolling back up makes iOS Safari's bottom
          toolbar slide in, which shrinks dvh and visibly shrinks the (flex-filled)
          card — so the last card looked shorter coming back up than it did at the
          end of the downward scroll (toolbar minimized). svh ignores the toolbar
          toggle, so the cards keep a constant height regardless of scroll
          direction. (The pinner height + 4px clip above stay on dvh — that's the
          separate iOS bottom-bar mitigation.) */}
      <div className="h-[100svh] w-full flex flex-col items-center justify-start max-w-6xl mx-auto px-4 pt-24 lg:pt-32 pb-12 lg:pb-20">
        <div className="flex flex-col items-center justify-center text-center mb-8 shrink-0 max-w-[1000px] px-4">
          <p className="font-inter text-[12px] md:text-[14px] tracking-[0.2em] uppercase font-bold text-[#19ad7d] mb-6">
            The Methodology
          </p>
          <h2
            className="font-ivyora font-medium text-5xl md:text-7xl lg:text-[80px] leading-[1.05] tracking-[-2px] transition-colors duration-500 text-black dark:text-white"
          >
            <BlurReveal as="span" delay={0.1}>
              How it{" "}
            </BlurReveal>
            <BlurReveal as="span" delay={0.5} className="italic">
              works
            </BlurReveal>
          </h2>
          <p
            className="font-inter text-[16px] md:text-[20px] font-medium mt-5 text-black/60 dark:text-white/60"
          >
            Three layers. One operating system.
          </p>
        </div>

        <div className="relative w-full flex-1 flex items-start justify-center max-w-[1000px] mx-auto pb-10">
          {STEPS.map((step, idx) => (
            <Card
              key={step.title}
              step={step}
              index={idx}
              totalSteps={STEPS.length}
              scrollYProgress={smoothScrollYProgress}
            />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

