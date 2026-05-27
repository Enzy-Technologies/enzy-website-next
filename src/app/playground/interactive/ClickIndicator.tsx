"use client";

import { motion } from "motion/react";

// High-contrast "tap here" color — vivid warm coral that pops against
// the cream phone UI and the dark bezel, and reads as a wayfinding cue
// rather than a brand element (so it doesn't blend with the brand green).
const INDICATOR_COLOR = "#FF5A36";
const INDICATOR_GLOW = "rgba(255, 90, 54, 0.65)";

type Props = {
  top: number | string;
  left: number | string;
  delay?: number;
  label?: string;
  ringOnly?: boolean;
  size?: number;
};

export function ClickIndicator({ top, left, delay = 0, label, ringOnly, size = 44 }: Props) {
  if (ringOnly) {
    const coreSize = Math.max(10, Math.round(size * 0.32));
    return (
      <div
        className="pointer-events-none absolute z-50"
        style={{ top, left, transform: "translate(-50%, -50%)" }}
      >
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: -size / 2,
              top: -size / 2,
              width: size,
              height: size,
              border: `3px solid ${INDICATOR_COLOR}`,
              boxShadow: `0 0 14px ${INDICATOR_GLOW}`,
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 2.0], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.8,
              delay: delay + i * 0.9,
              repeat: Infinity,
              times: [0, 0.12, 1],
              ease: "easeOut",
            }}
          />
        ))}
        {/* Always-on pulsing core dot so the indicator is visible even
            between ring sweeps. */}
        <motion.span
          className="block rounded-full"
          style={{
            width: coreSize,
            height: coreSize,
            marginLeft: -coreSize / 2,
            marginTop: -coreSize / 2,
            background: INDICATOR_COLOR,
            boxShadow: `0 0 16px ${INDICATOR_GLOW}, inset 0 0 0 2px rgba(255,255,255,0.55)`,
          }}
          initial={{ scale: 0.85, opacity: 0.85 }}
          animate={{ scale: [0.85, 1.18, 0.85], opacity: [0.85, 1, 0.85] }}
          transition={{
            duration: 1.4,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute z-30"
      style={{ top, left, transform: "translate(-50%, -50%)" }}
    >
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: -22,
            top: -22,
            width: 44,
            height: 44,
            border: `3px solid ${INDICATOR_COLOR}`,
            boxShadow: `0 0 14px ${INDICATOR_GLOW}`,
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 2.3], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.8,
            delay: delay + i * 0.9,
            repeat: Infinity,
            times: [0, 0.12, 1],
            ease: "easeOut",
          }}
        />
      ))}
      <motion.span
        className="block rounded-full"
        style={{
          width: 20,
          height: 20,
          marginLeft: -10,
          marginTop: -10,
          background: INDICATOR_COLOR,
          boxShadow: `0 0 22px ${INDICATOR_GLOW}, inset 0 0 0 2px rgba(255,255,255,0.6)`,
        }}
        initial={{ scale: 0.85, opacity: 0.85 }}
        animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.85, 1, 0.85] }}
        transition={{
          duration: 1.4,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {label && (
        <motion.span
          className="absolute left-1/2 top-[22px] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#161513] px-2 py-[3px] text-[10px] uppercase tracking-[0.5px] text-white"
          style={{ fontFamily: "'Roboto Mono', monospace" }}
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
