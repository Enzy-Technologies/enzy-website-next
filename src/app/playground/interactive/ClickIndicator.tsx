"use client";

import { motion } from "motion/react";

// Default "tap here" hue — vivid orange that pops against the cream phone UI.
// Callers can override `rgb` (e.g. the home Playground uses brand
// green). All the tones below are derived from this single "r, g, b" string.
const DEFAULT_RGB = "255, 138, 0";

type Props = {
  top: number | string;
  left: number | string;
  delay?: number;
  label?: string;
  ringOnly?: boolean;
  size?: number;
  /**
   * "breathe" (default): soft scaling glow — the original at-rest cue.
   * "ping": a solid center dot with concentric rings radiating outward,
   * a more legible "this is tappable" affordance for the landing hero.
   */
  variant?: "breathe" | "ping";
  /** Base color as an "r, g, b" string. Defaults to the orange tap hue. */
  rgb?: string;
};

export function ClickIndicator({
  top,
  left,
  delay = 0,
  label,
  ringOnly,
  size = 44,
  variant = "breathe",
  rgb = DEFAULT_RGB,
}: Props) {
  const INDICATOR_COLOR = `rgba(${rgb}, 0.45)`;
  const INDICATOR_GLOW = `rgba(${rgb}, 0.55)`;
  // "ping" variant tones. The center stays translucent so the icon it sits on
  // remains visible through it; the hollow rings carry the attention instead.
  const PING_DOT = `rgba(${rgb}, 0.55)`;
  const PING_RING = `rgba(${rgb}, 0.78)`;

  return (
    <div
      className={`pointer-events-none absolute ${ringOnly ? "z-50" : "z-30"}`}
      style={{ top, left, transform: "translate(-50%, -50%)" }}
    >
      {variant === "ping" ? (
        <>
          {/* Two staggered rings expand outward like a sonar ping. Each fades
              IN from 0 and back OUT to 0 within its own loop (opacity
              [0, peak, 0]), so the keyframe that wraps is always invisible —
              no hard scale-reset flash at the loop boundary. */}
          {[0, 1.3].map((offset, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: -size / 2,
                top: -size / 2,
                width: size,
                height: size,
                border: `1.5px solid ${PING_RING}`,
              }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 1.8], opacity: [0, 0.8, 0] }}
              transition={{
                duration: 2.6,
                delay: delay + offset,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
          {/* Soft translucent center — marks the spot but lets the icon
              underneath read through it. */}
          <motion.span
            className="absolute rounded-full"
            style={{
              left: -size * 0.26,
              top: -size * 0.26,
              width: size * 0.52,
              height: size * 0.52,
              background: PING_DOT,
              boxShadow: `0 0 12px ${INDICATOR_GLOW}`,
            }}
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.6, delay, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      ) : (
        // Seamless loop: start and end keyframes match exactly, so the
        // repeat never visually jumps. Scale + opacity wash together
        // read as a soft breathing pulse.
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
      )}
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
