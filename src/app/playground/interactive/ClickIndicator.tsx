"use client";

import { motion } from "motion/react";

// High-contrast "tap here" color — vivid orange that pops against the
// cream phone UI and the dark bezel, and reads as a wayfinding cue
// rather than a brand element (so it doesn't blend with the brand green).
const INDICATOR_COLOR = "rgba(255, 138, 0, 0.45)";
const INDICATOR_GLOW = "rgba(255, 138, 0, 0.55)";

type Props = {
  top: number | string;
  left: number | string;
  delay?: number;
  label?: string;
  ringOnly?: boolean;
  size?: number;
};

export function ClickIndicator({ top, left, delay = 0, label, ringOnly, size = 44 }: Props) {
  return (
    <div
      className={`pointer-events-none absolute ${ringOnly ? "z-50" : "z-30"}`}
      style={{ top, left, transform: "translate(-50%, -50%)" }}
    >
      {/* Seamless loop: start and end keyframes match exactly, so the
          repeat never visually jumps. Scale + opacity wash together
          read as a soft breathing pulse. */}
      <motion.span
        className="absolute rounded-full"
        style={{
          left: -size / 2,
          top: -size / 2,
          width: size,
          height: size,
          background: INDICATOR_COLOR,
          boxShadow: `0 0 20px ${INDICATOR_GLOW}`,
        }}
        animate={{
          scale: [0.8, 1.5, 0.8],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {label && (
        <motion.span
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#161513] px-2 py-[3px] text-[10px] uppercase tracking-[0.5px] text-white"
          style={{
            fontFamily: "'Roboto Mono', monospace",
            top: size / 2 + 6,
          }}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3, duration: 0.4 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  );
}
