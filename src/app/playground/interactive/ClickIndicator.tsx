"use client";

import { motion } from "motion/react";

type Props = {
  top: number | string;
  left: number | string;
  delay?: number;
  label?: string;
  ringOnly?: boolean;
  size?: number;
};

export function ClickIndicator({ top, left, delay = 0, label, ringOnly, size = 36 }: Props) {
  if (ringOnly) {
    return (
      <div
        className="pointer-events-none absolute z-50"
        style={{ top, left, transform: "translate(-50%, -50%)" }}
      >
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border-2 border-[#00926e]"
            style={{ left: -size / 2, top: -size / 2, width: size, height: size }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 1.9], opacity: [0, 0.85, 0] }}
            transition={{
              duration: 2,
              delay: delay + i * 1,
              repeat: Infinity,
              times: [0, 0.1, 1],
              ease: "easeOut",
            }}
          />
        ))}
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
          className="absolute rounded-full border-2 border-[#00926e]"
          style={{ left: -18, top: -18, width: 36, height: 36 }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 2.2], opacity: [0, 0.8, 0] }}
          transition={{
            duration: 2,
            delay: delay + i * 1,
            repeat: Infinity,
            times: [0, 0.1, 1],
            ease: "easeOut",
          }}
        />
      ))}
      <motion.span
        className="block rounded-full bg-[#00926e] shadow-[0_0_18px_rgba(0,146,110,0.55)]"
        style={{ width: 18, height: 18, marginLeft: -9, marginTop: -9 }}
        initial={{ scale: 0.85, opacity: 0.6 }}
        animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 1.6,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {label && (
        <motion.span
          className="absolute left-1/2 top-[18px] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#161513] px-2 py-[3px] text-[10px] uppercase tracking-[0.5px] text-white"
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
