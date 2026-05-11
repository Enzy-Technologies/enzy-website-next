"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
}

/**
 * A highly cinematic text reveal that staggers character by character,
 * fading in from 0 opacity and a heavy blur (10px) to fully sharp.
 */
export function BlurReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  as: Component = "span",
}: BlurRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 10,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Safely extract string from children
  let text = "";
  if (typeof children === "string") {
    text = children;
  } else if (Array.isArray(children)) {
    text = children.filter(c => typeof c === "string").join("");
  } else {
    text = String(children);
  }
  // Split text by words, then by characters to preserve word wrapping
  const words = text.split(" ");

  return (
    <Component ref={ref} className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ display: "inline" }}
      >
        {words.map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={itemVariants}
                  style={{ display: "inline-block", willChange: "filter, opacity, transform" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {/* Add a real breakable space between words */}
            {wordIndex < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </motion.span>
    </Component>
  );
}
