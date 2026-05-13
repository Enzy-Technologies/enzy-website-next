"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { useTheme } from "./components/ThemeProvider";
import { BlurReveal } from "./components/BlurReveal";

type FeatureGroup = "Work" | "Perform" | "AI";

type Feature = {
  id: string;
  title: string;
  desc: string;
  group: FeatureGroup;
  images: string[];
};

const FEATURES_DATA: Feature[] = [
  {
    group: "Work",
    id: "map",
    title: "Map",
    desc: "Plan territories and routes. See the field clearly.",
    images: [
      "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjB0ZXJyaXRvcnklMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Work",
    id: "leads",
    title: "Leads",
    desc: "Keep pipelines organized and priorities obvious.",
    images: [
      "https://images.unsplash.com/photo-1702479743967-3dcccd4a671d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwY3JtJTIwZGFya3xlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Work",
    id: "calendar",
    title: "Calendar",
    desc: "Scheduling that keeps the week on track.",
    images: [
      "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMGFwcCUyMGRhcmslMjBVSXxlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Work",
    id: "tasks",
    title: "Tasks",
    desc: "Daily actions, owners, and follow-ups—clear.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbGlzdCUyMGFwcCUyMGRhcmslMjBVSXxlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Work",
    id: "library",
    title: "Library",
    desc: "Store and share approved assets—fast.",
    images: [
      "https://images.unsplash.com/photo-1650338996177-674884e51683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpYSUyMGxpYnJhcnklMjBmb2xkZXIlMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Work",
    id: "recruit",
    title: "Recruit",
    desc: "Recruiting and onboarding—simplified.",
    images: [
      "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNydWl0aW5nJTIwb25ib2FyZGluZyUyMHRlY2glMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Perform",
    id: "leaderboards",
    title: "Leaderboards",
    desc: "Real-time rankings that keep focus high and goals clear.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJib2FyZCUyMGRhc2hib2FyZCUyMGRhcmt8ZW58MXx8fHwxNzc1Njc3NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Perform",
    id: "incentives",
    title: "Incentives",
    desc: "Rewards that reinforce the right behavior.",
    images: [
      "https://images.unsplash.com/photo-1642104744809-14b986179927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnRpdmUlMjByZXdhcmQlMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Perform",
    id: "goals",
    title: "Goals",
    desc: "Targets that stay visible all week.",
    images: [
      "https://images.unsplash.com/photo-1587400563263-e77a5590bfe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrJTIwcGklMjBnb2FsJTIwZGFzaGJvYXJkJTIwZGFya3xlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Perform",
    id: "profiles",
    title: "Profiles",
    desc: "One place for performance, progress, and recognition.",
    images: [
      "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMGRhcmslMjBVSXxlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Perform",
    id: "chat",
    title: "Chat",
    desc: "Announcements and nudges without switching tools.",
    images: [
      "https://images.unsplash.com/photo-1591467454366-fb32b72b20e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0JTIwbWVzc2FnaW5nJTIwYXBwJTIwZGFya3xlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "AI",
    id: "ai",
    title: "AI Assistant",
    desc: "Ask about connected data. Get insights and next actions.",
    images: [
      "https://images.unsplash.com/photo-1695144244472-a4543101ef35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFzc2lzdGFudCUyMHRlY2glMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];

const ITEM_HEIGHT = 100;

function FeatureWord({ index, activeIndex, feature, isLightMode }: { index: number, activeIndex: number, feature: Feature, isLightMode: boolean }) {
  const distance = Math.abs(activeIndex - index);
  
  const opacity = distance === 0 ? 1 : distance === 1 ? 0.25 : 0.05;
  const scale = distance === 0 ? 1 : distance === 1 ? 0.75 : 0.6;
  
  // Scribble animation
  const scribblePathLength = distance === 0 ? 1 : 0;
  const scribbleOpacity = distance === 0 ? 1 : 0;
  
  return (
    <motion.div
      className="absolute left-0 w-full flex items-center justify-center lg:justify-start origin-center lg:origin-left"
      style={{
        top: index * ITEM_HEIGHT,
        height: ITEM_HEIGHT,
      }}
      initial={false}
      animate={{
        opacity,
        scale,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative inline-block">
        <h2 className={`relative z-10 font-ivyora font-medium text-[48px] sm:text-[64px] lg:text-[80px] leading-[0.95] tracking-[-2px] ${isLightMode ? 'text-black' : 'text-white'}`}>
          {feature.title}
        </h2>
        {/* Dynamic Green Scribble Underline */}
        <motion.svg 
          viewBox="0 0 100 20" 
          preserveAspectRatio="none" 
          className="absolute -bottom-2 left-0 w-full h-[15px] lg:h-[20px] text-[#19ad7d] z-0"
          initial={false}
          animate={{ opacity: scribbleOpacity }}
          transition={{ duration: 0.3 }}
        >
          <motion.path 
            d="M 2 12 Q 25 2 50 10 T 98 8" 
            fill="transparent" 
            stroke="currentColor" 
            strokeWidth="4" 
            strokeLinecap="round" 
            initial={false}
            animate={{ pathLength: scribblePathLength }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}

function FeatureBrowser({ isLightMode }: { isLightMode: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const TOTAL_ITEMS = FEATURES_DATA.length;
  // Make the float index scrub across the exact number of items
  const floatIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_ITEMS - 1]);

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(floatIndex, "change", (latest) => {
    const idx = Math.round(latest);
    if (idx !== activeIndex && idx >= 0 && idx < TOTAL_ITEMS) {
      setActiveIndex(idx);
    }
  });

  const activeFeature = FEATURES_DATA[activeIndex];

  return (
    <section ref={containerRef} className="relative w-full h-[600vh]">
      <div className="sticky top-[env(safe-area-inset-top,0px)] h-[100dvh] w-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4 pt-20 lg:pt-32 pb-8 gap-6 lg:gap-12">
        
        {/* Header (always on screen while scrolling this section) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center relative z-10 shrink-0"
        >
          <div className={`px-4 py-1.5 rounded-full border backdrop-blur-sm mb-4 lg:mb-6 transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-black/5 text-black/60' : 'border-white/10 bg-white/5 text-white/60'} font-bold uppercase tracking-[0.25em] text-[10px] lg:text-[11px]`}>
            Platform Overview
          </div>
          <h1 className={`font-ivyora font-medium text-4xl md:text-5xl lg:text-[80px] leading-[0.95] tracking-[-2px] lg:tracking-[-2px] text-center max-w-4xl transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
            <BlurReveal as="span" delay={0.1}>Everything you need.</BlurReveal><br/>
            <span className={isLightMode ? "text-black/40" : "text-white/40"}>
              <BlurReveal as="span" delay={0.3}>Nothing you don&apos;t.</BlurReveal>
            </span>
          </h1>
        </motion.div>

        {/* Content Panes */}
        <div className="w-full flex-1 flex flex-col lg:flex-row items-center justify-center min-h-0 gap-6 lg:gap-16">
          
          {/* Left pane: Scrubbing Words */}
          <div className="w-full lg:w-[45%] h-[30vh] lg:h-full flex items-center justify-center relative shrink-0">
            <div 
              className="relative w-full h-full"
              style={{ 
                maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)"
              }}
            >
              <div className="absolute top-1/2 left-0 w-full" style={{ marginTop: -ITEM_HEIGHT / 2 }}>
                <motion.div 
                  className="relative w-full"
                  initial={false}
                  animate={{ y: -(activeIndex * ITEM_HEIGHT) }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  {FEATURES_DATA.map((f, i) => (
                    <FeatureWord key={f.id} index={i} activeIndex={activeIndex} feature={f} isLightMode={isLightMode} />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right pane: Active Content */}
          <div className="w-full lg:w-[55%] flex-1 lg:h-full relative flex flex-col justify-center min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 flex flex-col justify-start lg:justify-center"
              >
                <div className={`relative w-full aspect-video lg:aspect-[4/3] rounded-[24px] lg:rounded-[32px] overflow-hidden border shadow-2xl shrink-0 ${isLightMode ? "border-black/10 shadow-black/5" : "border-white/10 shadow-black/50"}`}>
                  <ImageWithFallback
                    src={activeFeature.images[0]}
                    alt={activeFeature.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
                
                <div className="mt-4 lg:mt-8 flex flex-col gap-1 lg:gap-3 px-2 text-center lg:text-left shrink-0">
                <div className={`font-inter text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.25em] ${isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"}`}>
                  {activeFeature.group}
                </div>
                  <p className={`font-inter text-[15px] md:text-[18px] lg:text-[24px] font-medium leading-snug ${isLightMode ? "text-black/80" : "text-white/80"}`}>
                    {activeFeature.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

export function Features() {
  const { isLightMode } = useTheme();

  return (
    <FeatureBrowser isLightMode={isLightMode} />
  );
}
