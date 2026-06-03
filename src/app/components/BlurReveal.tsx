"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
  /**
   * How to break the text into independently-animated pieces.
   *
   * - "char" (default): each glyph animates on its own stagger. Looks more
   *   cinematic, but every glyph is wrapped in an `inline-block` with a
   *   transient `filter: blur(...)` — and CSS `filter` paints into a box
   *   the size of the glyph's advance width. For italic faces the
   *   rightward overhang of a character (e.g. the swash on an italic
   *   "d" or "y") sits OUTSIDE that advance-width box and gets clipped
   *   by the filter layer's bounds. Combined with negative letter-spacing
   *   on parent headings, the slant of one character can also be visually
   *   overrun by the next character's box.
   * - "word": animates each whole word as a single unit. Kerning + italic
   *   overhang stay intact because the painted box covers the full word.
   *
   * If `splitBy` is unset, italic content is auto-detected from
   * `className` and switched to "word" to avoid the clipping above.
   */
  splitBy?: "char" | "word";
}

/**
 * A cinematic text reveal that staggers in either character-by-character
 * or word-by-word, fading in from 0 opacity and a heavy blur (10px) to
 * fully sharp.
 *
 * Italic text is auto-detected and rendered with word-level splitting so
 * the slanted glyphs aren't clipped by their own per-character paint box.
 */
export function BlurReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  as: Component = "span",
  splitBy,
}: BlurRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Italic faces have rightward overhang that doesn't fit inside a single
  // glyph's advance-width filter layer — fall back to word-level reveal so
  // the painted box always contains the full kerned word. The class must
  // appear as a standalone token in the className string (separated by
  // whitespace or string boundary) so that "not-italic" / "non-italic"
  // don't trip this on.
  const looksItalic = /(?:^|\s)italic(?:$|\s)/.test(className);
  const mode: "char" | "word" = splitBy ?? (looksItalic ? "word" : "char");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        // Word-level reveals are coarser, so tighten the stagger a bit
        // to keep total runtime in line with the per-char version.
        staggerChildren: mode === "word" ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  // Reveal animates opacity + a small vertical slide only. The original also
  // animated `filter: blur(10px) -> blur(0)` per glyph, but animated CSS filters
  // are very expensive on mobile GPUs and force a repaint every frame — and
  // because the element is the page heading, that delay was pushing back when
  // the largest text "settled," inflating LCP. Dropping the blur keeps the
  // staggered fade/slide reveal while removing the costly part.
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  let text = "";
  if (typeof children === "string") {
    text = children;
  } else if (Array.isArray(children)) {
    text = children.filter((c) => typeof c === "string").join("");
  } else {
    text = String(children);
  }
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
            {mode === "word" ? (
              // One inline-block per word — the filter layer is sized to
              // the kerned word, so italic overhang stays inside its
              // own paint box and is never clipped.
              <motion.span
                variants={itemVariants}
                style={{
                  display: "inline-block",
                  willChange: "opacity, transform",
                }}
              >
                {word}
              </motion.span>
            ) : (
              <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    variants={itemVariants}
                    style={{
                      display: "inline-block",
                      willChange: "opacity, transform",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            )}
            {wordIndex < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </motion.span>
    </Component>
  );
}
