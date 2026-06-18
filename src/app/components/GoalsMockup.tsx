"use client";

import React from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/**
 * Goals collage. Unlike the other feature previews this isn't a single framed
 * capture or a rebuilt animation — it's a composition of three real in-app
 * screenshots, kept 100% intact and arranged so they read as one "Goals" story:
 *
 *   1. goals-commit — the rep's "What will you commit to?" screen (Week / Month
 *      / Quarter goal cards). Framed as the top of a phone: rounded top, device
 *      edge on the top + sides, lower edge dissolving into the panel so the
 *      screen reads as continuing below.
 *   2. goals-month — the "How it ended" month-goal recap card (% of goal ring).
 *      A wide, short landscape card.
 *   3. goals-year — the year-goal pace gauge with the funnel progress bars.
 *      A taller portrait card.
 *
 * Cards 2 and 3 are transparent PNGs that already carry their own rounded
 * corners and soft drop shadow, so they're dropped in as free-floating pieces —
 * no extra frame, just position and a slight rotation for the collage feel. The
 * two now have different aspect ratios, so each gets its own.
 *
 * Two hand-tuned layouts: an overlapping fan on desktop (phone left, the wide
 * month card up top-right, the tall year card dropping below it) and a stacked
 * column on mobile. The structural switch is the single 1024px (`lg`) line the
 * rest of the site uses. Each piece gets its own positioning wrapper so the
 * framing element keeps its `relative` context (Tailwind's `.relative` would
 * otherwise win over a passed `.absolute`).
 */

const COMMIT = "/system/goals-commit.png"; // 786 × 1159
const MONTH = "/system/goals-month.png"; //   592 × 456  (landscape)
const YEAR = "/system/goals-year.png"; //     600 × 804  (portrait)

const COMMIT_AR = 786 / 1159;
const MONTH_AR = 592 / 456;
const YEAR_AR = 600 / 804;

// Bottom dissolve for the phone-framed commit screen — the content and the
// device edge fade out together over an eased band so neither ends on a hard
// line. Mirrors the treatment used by the other phone mockups in System.tsx.
function easedMask(start: number, end: number, reverse = false): string {
  const STEPS = 8;
  const stops = Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    const s = t * t * (3 - 2 * t); // smoothstep
    const a = reverse ? s : 1 - s;
    const pos = start + (end - start) * t;
    return `rgba(0,0,0,${a.toFixed(3)}) ${pos.toFixed(2)}%`;
  });
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

const FADE = easedMask(80, 97);
const BLUR = easedMask(74, 95, true);

/** The commit screen framed as the top of a phone, lower edge dissolving out. */
function CommitPhone() {
  return (
    <div
      className="relative w-full overflow-hidden rounded-t-[34px]"
      style={{ aspectRatio: COMMIT_AR }}
    >
      <ImageWithFallback
        src={COMMIT}
        alt="Goal commitment screen — Week, Month, and Quarter sales-funnel goals"
        className="absolute inset-0 h-full w-full object-cover object-top"
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      />
      {/* Progressive blur strengthening toward the bottom edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-[5px]"
        style={{ maskImage: BLUR, WebkitMaskImage: BLUR }}
      />
      {/* Device edge — top + sides only, faded out with the same band. */}
      <div
        className="pointer-events-none absolute inset-0 rounded-t-[34px] border border-b-0 border-black/12 dark:border-white/15"
        style={{ maskImage: FADE, WebkitMaskImage: FADE }}
      />
    </div>
  );
}

/**
 * A free-floating card. The source PNGs are just the card *content* on a
 * transparent background, so we back each one with a white rounded panel and a
 * soft drop shadow to make it read as a real card. A hair of padding keeps the
 * content off the rounded edge, and the white stays white in dark mode (the
 * shadow deepens) so it floats cleanly on the dark panel too.
 */
function FloatCard({
  src,
  alt,
  ar,
  rotate = 0,
}: {
  src: string;
  alt: string;
  ar: number;
  rotate?: number;
}) {
  return (
    <div
      className="rounded-[18px] bg-white p-[7%] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.20)] ring-1 ring-black/[0.05] dark:shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)] dark:ring-white/[0.06]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative w-full" style={{ aspectRatio: ar }}>
        <ImageWithFallback
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

export function GoalsMockup() {
  return (
    <div className="w-full">
      {/* ---------------- Desktop: overlapping fan ---------------- */}
      <div className="mx-auto hidden lg:block w-full max-w-[820px]">
        <div className="relative w-full" style={{ aspectRatio: "100 / 60" }}>
          {/* Phone — anchored left */}
          <div className="absolute left-[1%] top-[8%] w-[33%]">
            <CommitPhone />
          </div>
          {/* Month recap card (wide) — top, bridging the phone and the year card */}
          <div className="absolute left-[33%] top-[5%] w-[41%]">
            <FloatCard
              src={MONTH}
              alt="Month goal recap — percent of sales-funnel goal reached"
              ar={MONTH_AR}
              rotate={1.5}
            />
          </div>
          {/* Year pace card (tall) — drops below the month card, far right */}
          <div className="absolute left-[60%] top-[26%] w-[31%]">
            <FloatCard
              src={YEAR}
              alt="Year goal — quarterly pace gauge and funnel progress"
              ar={YEAR_AR}
              rotate={-1.5}
            />
          </div>
        </div>
      </div>

      {/* ---------------- Mobile: stacked column ---------------- */}
      {/* The cards have different shapes (wide month, tall year), so they're
          stacked into a fan with the year card overlapping the month card's
          lower-right. Cards are centered and nudged with translate (not pushed
          to the column edges) so their drop shadows aren't clipped by the
          accordion's overflow-hidden wrapper. */}
      <div className="lg:hidden flex flex-col items-center w-full max-w-[340px] mx-auto">
        <div className="w-[68%] max-w-[260px]">
          <CommitPhone />
        </div>
        {/* Wide month card tucks under the phone's faded foot, nudged left */}
        <div className="relative z-10 -mt-[12%] w-[82%] -translate-x-[3%]">
          <FloatCard
            src={MONTH}
            alt="Month goal recap — percent of sales-funnel goal reached"
            ar={MONTH_AR}
            rotate={-2}
          />
        </div>
        {/* Tall year card overlaps up onto the month card's lower-right */}
        <div className="relative z-20 -mt-[8%] w-[56%] translate-x-[12%]">
          <FloatCard
            src={YEAR}
            alt="Year goal — quarterly pace gauge and funnel progress"
            ar={YEAR_AR}
            rotate={2}
          />
        </div>
      </div>
    </div>
  );
}

export default GoalsMockup;
