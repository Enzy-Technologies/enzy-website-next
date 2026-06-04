"use client";

import React from "react";

interface BlurRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
  /**
   * How to break the text into independently-animated pieces.
   *
   * - "word" (default): animates each whole word on its own stagger. Fewer
   *   animated nodes than per-char, so it's smooth on mobile, and kerning +
   *   italic overhang stay intact because the painted box covers the full word.
   * - "char": each glyph animates on its own stagger for a more cinematic feel.
   *
   * Italic content is auto-detected from `className` and always uses "word" so
   * the slanted glyphs aren't clipped by their own per-character paint box.
   */
  splitBy?: "char" | "word";
}

/**
 * A staggered entrance reveal (fade + small upward slide).
 *
 * Implemented as a PURE CSS animation (see `.enzy-reveal` in globals.css)
 * rather than Framer Motion. CSS animations run at first paint on the
 * compositor, so the text appears and animates immediately without waiting
 * for React to hydrate — this is what keeps hero headings from sitting blank
 * and then animating in late/janky on heavier pages. Each piece gets its
 * stagger via a per-element `animation-delay` (set with a CSS variable), and
 * `animation-fill-mode: both` holds the hidden state during that delay.
 */
export function BlurReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  as: Component = "span",
  splitBy,
}: BlurRevealProps) {
  // Italic faces have rightward overhang that doesn't fit inside a single
  // glyph's paint box — fall back to word-level reveal. The class must appear
  // as a standalone token so "not-italic" / "non-italic" don't trip this on.
  const looksItalic = /(?:^|\s)italic(?:$|\s)/.test(className);
  const mode: "char" | "word" = splitBy ?? (looksItalic ? "word" : "char");

  let text = "";
  if (typeof children === "string") {
    text = children;
  } else if (Array.isArray(children)) {
    text = children.filter((c) => typeof c === "string").join("");
  } else {
    text = String(children);
  }
  const words = text.split(" ");

  // Word-level reveals are coarser, so tighten the stagger a bit to keep total
  // runtime in line with the per-char version.
  const stagger = mode === "word" ? 0.08 : 0.03;

  const durationStyle = { ["--enzy-reveal-duration" as string]: `${duration}s` };

  // Running index across all animated pieces so the stagger is continuous
  // even when split per-character across multiple words.
  let pieceIndex = 0;

  return (
    <Component className={className} style={durationStyle as React.CSSProperties}>
      {words.map((word, wordIndex) => (
        <React.Fragment key={wordIndex}>
          {mode === "word" ? (
            <span
              className="enzy-reveal"
              style={
                {
                  ["--enzy-reveal-delay" as string]: `${delay + pieceIndex++ * stagger}s`,
                } as React.CSSProperties
              }
            >
              {word}
            </span>
          ) : (
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
              {word.split("").map((char, charIndex) => (
                <span
                  key={charIndex}
                  className="enzy-reveal"
                  style={
                    {
                      ["--enzy-reveal-delay" as string]: `${delay + pieceIndex++ * stagger}s`,
                    } as React.CSSProperties
                  }
                >
                  {char}
                </span>
              ))}
            </span>
          )}
          {wordIndex < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </Component>
  );
}
