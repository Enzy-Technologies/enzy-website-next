"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useTheme } from "./ThemeProvider";

export function LeadingLine() {
  const { isLightMode } = useTheme();
  const { scrollYProgress } = useScroll();
  
  // Smooth the scroll progress to avoid jitter
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed left-4 md:left-8 top-0 bottom-0 w-[1px] z-50 pointer-events-none mix-blend-screen hidden lg:block">
      {/* Background track */}
      <div 
        className={`absolute inset-0 w-full h-full ${
          isLightMode ? "bg-black/5" : "bg-white/5"
        }`} 
      />
      
      {/* Animated glowing line */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-[#19ad7d] origin-top"
        style={{ 
          scaleY,
          boxShadow: "0 0 12px 1px rgba(25,173,125,0.6)"
        }}
      />
      
      {/* Glowing tip at the bottom of the line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-1 h-4 rounded-full bg-white shadow-[0_0_12px_2px_rgba(25,173,125,0.8)]"
        style={{
          top: useTransform(scaleY, [0, 1], ["0%", "100%"]),
          marginTop: "-16px"
        }}
      />
    </div>
  );
}
