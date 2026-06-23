"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ClickIndicator } from "./ClickIndicator";
import { PHONE_W, PHONE_H } from "./InteractivePhone";
import { AiSessionPlayground } from "./AiSessionPlayground";

/**
 * The screenshot-driven interactive phone for the home `Playground` (and
 * `/playground`). Instead of rebuilding each Enzy screen in React (the older
 * `InteractivePhone`, still used by the `/lp/*` hero), it renders real app
 * screenshots inside the phone bezel and swaps them on tap, so the demo
 * "navigates" with no per-screen logic.
 *
 * The screenshots are 786×1704 — exactly 2× the phone's logical 393×852 — so
 * every hotspot below is authored directly in 393×852 space and the image fills
 * the screen 1:1.
 *
 * The one piece that is more than a screenshot swap is Enzy AI: tapping the
 * bottom-right sparkle mounts `AiSessionPlayground` — the playground's own
 * tap-to-start AI session, a separate experience from the Systems-page mockup.
 */


type Screen = "home" | "leaderboard" | "messaging" | "incentives" | "bracket" | "ai";
type BaseScreen = Exclude<Screen, "ai">;

const IMG: Record<BaseScreen, string> = {
  home: "/playground/home.png",
  leaderboard: "/playground/leaderboard.png",
  messaging: "/playground/messaging.png",
  incentives: "/playground/incentives.png",
  bracket: "/playground/bracket.png",
};

type Rect = { left: number; top: number; width: number; height: number };

type Hotspot = {
  id: string;
  /** Where a tap navigates. */
  to: Screen;
  /** Tap target, in 393×852 logical space. */
  rect: Rect;
  /** Show a pulsing "tap here" indicator centered on the rect. */
  indicate?: boolean;
  indicatorSize?: number;
  /** Override where the pulse sits (defaults to the rect's center). */
  indicatorCenter?: { x: number; y: number };
  /**
   * Pulse style: "dot" (default) shows a ClickIndicator at a point; "card"
   * pulses the whole rect (a breathing green outline) so the entire element
   * reads as tappable.
   */
  pulse?: "dot" | "card";
  /** Corner radius for the "card" pulse outline (logical px). */
  pulseRadius?: number;
  /**
   * Inset the "card" pulse outline per edge (logical px) without shrinking the
   * tap target.
   */
  pulseInset?: { left?: number; right?: number; top?: number; bottom?: number };
  delay?: number;
  ariaLabel?: string;
};

// Pulse-indicator hue for the playground. Amber-orange #FF9F0A for visibility.
const GREEN_RGB = "255, 159, 10";

// Mirrors TOP_OFFSET in AiSessionPlayground — how far the AI header drops to
// clear the notch. Used to keep the close-button overlay aligned with it.
const AI_TOP_OFFSET = 30;

type MainScreen = Exclude<BaseScreen, "bracket">;

// ── Static nav overlay ────────────────────────────────────────────────────────
// The bottom rounded nav is NOT baked into the screenshots anymore — it's a
// separate transparent PNG (752×164) overlaid on top, one per active page. It
// renders as a fixed layer that does NOT slide with the screenshot crossfade;
// only the highlighted tab changes when you navigate. Placed centered near the
// bottom (376×82 logical). The bracket has no nav.
const NAV_SRC: Record<MainScreen, string> = {
  home: "/playground/nav-home.png",
  leaderboard: "/playground/nav-leaderboard.png",
  messaging: "/playground/nav-messaging.png",
  incentives: "/playground/nav-incentives.png",
};
const NAV_OVERLAY = { left: 8.5, top: 764, w: 376, h: 82 };
// The nav PNG for a screen, or null where there is no bottom nav (bracket).
const navSrcFor = (s: BaseScreen): string | null =>
  s === "bracket" ? null : NAV_SRC[s];

// Frosted-glass backing behind the nav so it isn't see-through. The overlay
// PNG's pill is only ~40% white, so we sit a blurred, tinted layer underneath
// it — shaped to the pill (a stadium) and the sparkle (a circle). Geometry is
// identical across all four overlays (only the highlight/label changes), so one
// static shape works. Logical coords derived from the overlay pixels.
const FROST_PILL = { left: 23.5, top: 777, width: 277.5, height: 51.5 };
const FROST_SPARK = { left: 317.5, top: 777, size: 51.5 };
const frostStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.42)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
};
// Overlay-pixel x (0..752) → phone-logical x. Icons sit ~77px down the overlay,
// the sparkle ~78px; both map to a single nav row y via NAV_OVERLAY.top.
const ox2x = (ox: number) => NAV_OVERLAY.left + ox / 2;
const NAV_ICON_CY = NAV_OVERLAY.top + 77 / 2;
const AI_CY = NAV_OVERLAY.top + 78 / 2;

type NavTarget = { to: BaseScreen; ox: number };

// Per active page, the tappable destinations and the overlay-pixel x of each
// icon (measured from the four nav PNGs). The active tab's inline label shifts
// the others, so positions differ per overlay. The Calendar tab has no
// screenshot, so it's intentionally not mapped. Every destination pulses.
const NAV: Record<MainScreen, NavTarget[]> = {
  home: [
    { to: "leaderboard", ox: 230 },
    { to: "messaging", ox: 327 },
    { to: "incentives", ox: 521 },
  ],
  leaderboard: [
    { to: "home", ox: 82 },
    { to: "messaging", ox: 390 },
    { to: "incentives", ox: 534 },
  ],
  messaging: [
    { to: "home", ox: 88 },
    { to: "leaderboard", ox: 170 },
    { to: "incentives", ox: 530 },
  ],
  incentives: [
    { to: "home", ox: 84 },
    { to: "leaderboard", ox: 160 },
    { to: "messaging", ox: 235 },
  ],
};
const AI_OX = 670; // green sparkle, consistent across all overlays

// A square tap target centered on a point.
const squareAt = (cx: number, cy: number, size: number): Rect => ({
  left: cx - size / 2,
  top: cy - size / 2,
  width: size,
  height: size,
});

// Every available menu destination pulses at once (no sequential tour) so the
// user can hop between pages freely. Each tab is staggered slightly by index
// so the pulses don't beat in perfect unison.
const navTab = (t: NavTarget, i: number): Hotspot => ({
  id: `nav-${t.to}`,
  to: t.to,
  rect: squareAt(ox2x(t.ox), NAV_ICON_CY, 50),
  indicate: true,
  indicatorSize: 34,
  delay: 0.35 + i * 0.15,
  ariaLabel: `Go to ${t.to}`,
});

const aiTab: Hotspot = {
  id: "ai",
  to: "ai",
  rect: squareAt(ox2x(AI_OX) + 0.5, AI_CY, 56),
  indicate: true,
  indicatorSize: 40,
  delay: 0.85,
  ariaLabel: "Open Enzy AI",
};

function mainHotspots(s: MainScreen): Hotspot[] {
  return [...NAV[s].map((t, i) => navTab(t, i)), aiTab];
}

const HOTSPOTS: Record<BaseScreen, Hotspot[]> = {
  home: mainHotspots("home"),
  leaderboard: mainHotspots("leaderboard"),
  messaging: mainHotspots("messaging"),
  incentives: [
    ...mainHotspots("incentives"),
    // The "Champions Cup" tournament card → opens the bracket. The whole photo
    // card is the tap target and pulses as one.
    {
      id: "champions-cup",
      to: "bracket",
      rect: { left: 16, top: 185, width: 362, height: 205 },
      indicate: true,
      pulse: "card",
      pulseRadius: 16,
      pulseInset: { left: 8, right: 9, top: 3, bottom: 2.5 },
      delay: 0.45,
      ariaLabel: "Open Champions Cup bracket",
    },
  ],
  // Bracket: only the back arrow. No nav, and intentionally NO hotspot/pulse
  // over the green button.
  bracket: [
    {
      id: "back",
      to: "incentives",
      rect: squareAt(42, 74, 54),
      indicate: true,
      indicatorSize: 40,
      delay: 0.4,
      ariaLabel: "Back to incentives",
    },
  ],
};

export function InteractivePhoneV2({
  interactive,
  tapHint = true,
}: {
  /** Enables tapping + pulsing indicators (true once the phone is zoomed in). */
  interactive: boolean;
  /** Use the louder "ping" indicators (matches the landing/meta hero). */
  tapHint?: boolean;
}) {
  const indicatorVariant = tapHint ? "ping" : "breathe";
  const [screen, setScreen] = useState<Screen>("home");
  // Remember where the AI session was opened from, so closing returns there.
  const [returnTo, setReturnTo] = useState<BaseScreen>("home");
  // The AI session is tap-to-start and plays once; this flips true when it
  // finishes, which reveals the close (X) hint.
  const [aiDone, setAiDone] = useState(false);
  // The screen sitting opaque at the bottom of the cross-fade. When baseScreen
  // differs, the new one fades in on TOP of this — so the phone never flashes
  // its background between pages. Becomes the new settled screen on completion.
  const [settled, setSettled] = useState<BaseScreen>("home");
  // Track which screen screenshots have actually painted. Tap indicators are
  // withheld until the underlying screen image has loaded, so a pulse never
  // floats over a not-yet-painted screen on the first visit to a heavy
  // screenshot (e.g. incentives.png). See the indicator gate below.
  const [loaded, setLoaded] = useState<Partial<Record<BaseScreen, boolean>>>({});
  const markLoaded = (s: BaseScreen) =>
    setLoaded((prev) => (prev[s] ? prev : { ...prev, [s]: true }));

  const baseScreen: BaseScreen = screen === "ai" ? returnTo : screen;

  const go = (to: Screen) => {
    if (to === "ai") {
      setReturnTo(baseScreen);
      setAiDone(false); // fresh session each open
      setScreen("ai");
    } else {
      setScreen(to);
    }
  };

  return (
    <div
      className="relative overflow-hidden bg-[#faf9f6]"
      style={{
        width: PHONE_W,
        height: PHONE_H,
        pointerEvents: interactive ? "auto" : "none",
      }}
    >
      {/* Screenshots cross-fade: the settled screen sits opaque underneath while
          the incoming screen fades in on top, so the phone never flashes its
          background (no fade-to-white) when toggling pages. */}
      <Image
        src={IMG[settled]}
        alt={`${settled} screen`}
        width={PHONE_W}
        height={PHONE_H}
        priority={settled === "home"}
        onLoad={() => markLoaded(settled)}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />
      {baseScreen !== settled && (
        <motion.div
          key={baseScreen}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onAnimationComplete={() => setSettled(baseScreen)}
        >
          <Image
            src={IMG[baseScreen]}
            alt={`${baseScreen} screen`}
            width={PHONE_W}
            height={PHONE_H}
            onLoad={() => markLoaded(baseScreen)}
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          />
        </motion.div>
      )}

      {/* Frosted glass behind the nav (z-20, under the nav PNG) so the pill and
          sparkle read as solid frosted glass rather than see-through. Shown only
          where there's a nav. */}
      {screen !== "ai" && navSrcFor(baseScreen) && (
        <>
          <div
            className="pointer-events-none absolute z-20"
            style={{
              left: FROST_PILL.left,
              top: FROST_PILL.top,
              width: FROST_PILL.width,
              height: FROST_PILL.height,
              borderRadius: FROST_PILL.height / 2,
              ...frostStyle,
            }}
          />
          <div
            className="pointer-events-none absolute z-20"
            style={{
              left: FROST_SPARK.left,
              top: FROST_SPARK.top,
              width: FROST_SPARK.size,
              height: FROST_SPARK.size,
              borderRadius: 9999,
              ...frostStyle,
            }}
          />
        </>
      )}

      {/* Static nav overlay. Unlike the screenshot it does NOT slide — only the
          highlighted tab cross-fades when you navigate. Sits above the
          screenshot, below the hotspots. Hidden on the bracket and while AI is
          open. */}
      {screen !== "ai" && (
        <AnimatePresence>
          {navSrcFor(baseScreen) && (
            <motion.img
              key={baseScreen}
              src={navSrcFor(baseScreen) as string}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              draggable={false}
              className="pointer-events-none absolute z-30 select-none"
              style={{
                left: NAV_OVERLAY.left,
                top: NAV_OVERLAY.top,
                width: NAV_OVERLAY.w,
                height: NAV_OVERLAY.h,
              }}
            />
          )}
        </AnimatePresence>
      )}

      {/* Hotspots for the current base screen (hidden while AI is open). */}
      {screen !== "ai" &&
        HOTSPOTS[baseScreen].map((h) => (
          <React.Fragment key={h.id}>
            <button
              aria-label={h.ariaLabel ?? h.id}
              onClick={() => go(h.to)}
              className="absolute z-40 cursor-pointer"
              style={{
                left: h.rect.left,
                top: h.rect.top,
                width: h.rect.width,
                height: h.rect.height,
              }}
            />
            {interactive &&
              h.indicate &&
              loaded[baseScreen] &&
              (h.pulse === "card" ? (
                // Whole-rect pulse: an always-present green outline + glow that
                // breathes between lighter and stronger (never disappears). No
                // size change. The whole rect is the tap target.
                <motion.div
                  className="pointer-events-none absolute z-40"
                  style={{
                    left: h.rect.left + (h.pulseInset?.left ?? 0),
                    top: h.rect.top + (h.pulseInset?.top ?? 0),
                    width:
                      h.rect.width -
                      (h.pulseInset?.left ?? 0) -
                      (h.pulseInset?.right ?? 0),
                    height:
                      h.rect.height -
                      (h.pulseInset?.top ?? 0) -
                      (h.pulseInset?.bottom ?? 0),
                    borderRadius: h.pulseRadius ?? 12,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 0 1.5px rgba(${GREEN_RGB}, 0.65), 0 0 8px 1px rgba(${GREEN_RGB}, 0.45)`,
                      `0 0 0 2px rgba(${GREEN_RGB}, 1), 0 0 18px 3px rgba(${GREEN_RGB}, 0.8)`,
                      `0 0 0 1.5px rgba(${GREEN_RGB}, 0.65), 0 0 8px 1px rgba(${GREEN_RGB}, 0.45)`,
                    ],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: h.delay ?? 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ) : (
                <ClickIndicator
                  top={h.indicatorCenter ? h.indicatorCenter.y : h.rect.top + h.rect.height / 2}
                  left={h.indicatorCenter ? h.indicatorCenter.x : h.rect.left + h.rect.width / 2}
                  delay={h.delay ?? 0.5}
                  ringOnly
                  size={h.indicatorSize ?? 36}
                  variant={indicatorVariant}
                  rgb={GREEN_RGB}
                />
              ))}
          </React.Fragment>
        ))}

      {/* Enzy AI — the tap-to-start session. It stays MOUNTED so the first open
          has no cold mount-time jank, and the wrapper cross-fades via a
          compositor-driven CSS opacity transition (smooth even while the heavy
          subtree is busy — Framer's JS-driven fade was getting starved on the
          first open, which made it pop instead of fade). Hidden + inert when
          closed; AiSessionPlayground resets to its landing each time it opens. */}
      <div
        className="absolute inset-0 z-50"
        style={{
          opacity: screen === "ai" ? 1 : 0,
          pointerEvents: screen === "ai" ? "auto" : "none",
          transition: "opacity 0.35s ease-out",
          // Keep the layer composited while hidden so the first open paints
          // smoothly (no cold rasterization stutter mid-fade).
          willChange: "opacity",
        }}
        aria-hidden={screen !== "ai"}
      >
        <AiSessionPlayground open={screen === "ai"} onComplete={() => setAiDone(true)} />
        {/* Close button. Its y tracks the header, which is pushed down by the
            AI header's top offset (see AI_TOP_OFFSET). */}
        <button
          aria-label="Close Enzy AI"
          onClick={() => setScreen(returnTo)}
          className="absolute z-50 cursor-pointer rounded-full"
          style={{ left: 334, top: 23 + AI_TOP_OFFSET, width: 40, height: 40 }}
        />
        {interactive && screen === "ai" && aiDone && (
          <ClickIndicator
            top={43 + AI_TOP_OFFSET}
            left={354}
            delay={0.2}
            ringOnly
            size={40}
            variant={indicatorVariant}
            rgb={GREEN_RGB}
          />
        )}
      </div>
    </div>
  );
}

export default InteractivePhoneV2;
