"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  cubicBezier,
} from "motion/react";
import { InteractivePhone, PHONE_W, PHONE_H } from "./interactive/InteractivePhone";
import { useScrollPin } from "@/app/lib/useScrollPin";
import { BREAKPOINTS, DESKTOP_MIN } from "@/app/lib/breakpoints";
import { useIsPhone } from "@/app/lib/useMediaQuery";

// Self-hosted from /public (was a HubSpot CDN URL). Source downscaled to
// 4000×2886 — the same composition/aspect as the 8000×5772 original, but no
// larger than next/image's 3840px max variant, so output quality is identical
// while the committed asset is ~3.7MB instead of 12MB. next/image serves
// right-sized AVIF/WebP variants from this.
const HAND_IMAGE = "/playground/hand-holding-iphone.png";

// Aspect of the hand PNG (4000/2886 === 8000/5772). The phone-overlay
// calibration fractions below depend on this exact ratio.
const IMAGE_ASPECT = 4000 / 2886;

const PHONE_CENTER_X_FRAC = 0.4978;
const PHONE_CENTER_Y_FRAC = 0.4567;
const PHONE_HEIGHT_FRAC = 0.6684;

// iPhone-style inner screen radius (in PHONE_W=393 coordinate space).
// Scales with the phone via the same transform applied to the screen overlay.
const PHONE_SCREEN_RADIUS = 56;

// Color of the Enzy UI's outer surface (matches `bg-[#faf9f6]` set inside
// `InteractivePhone`). Painted on the screen rect itself so any hairline
// gap between the UI's content and the inner bezel of the iPhone PNG shows
// the same off-white as the surrounding UI — never the page background.
const PHONE_SCREEN_BG = "#faf9f6";

// Extra transparent space appended below the hand image inside the
// scroll/zoom container so the PNG's natural alpha fade at the wrist
// has room to fall off — instead of meeting a hard horizontal container
// edge as the user scrolls out of the zoomed-in state.
const CONTAINER_BOTTOM_PAD = 0.18; // fraction of ch

// While the stage is pinned, clip it this many px short of the bottom edge.
// iOS Safari flattens its translucent bottom bar whenever a composited layer
// (here, the zoomed phone) reaches the bottom viewport edge. Clipping keeps the
// composited content off that edge, AND — critically — the clip's presence makes
// the flattened bar SELF-CLEAR when you scroll past (the overflow/height change
// on the fixed→absolute transition forces iOS to re-evaluate), instead of
// staying opaque until a refresh. The residual bar is ~this tall; 4px is the
// smallest value that still reliably self-clears on-device.
const STAGE_BOTTOM_CLIP = 4; // px

// Gentle ease-in-out for both zoom phases: starts and ends with near-zero
// velocity so the transition from "in motion" → "held" and "held" → "in motion"
// is seamless, and so each unit of scroll produces a small, predictable change
// in scale (rather than the steep snap of a hard ease-out).
const zoomEase = cubicBezier(0.4, 0, 0.6, 1);
const linearHold = (t: number) => t;

export function Playground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [animValues, setAnimValues] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    exitX: 0,
    endScale: 1,
    cw: 1024,
    ch: 683,
  });

  useEffect(() => {
    setIsMounted(true);
    const update = () => {
      const vw = window.innerWidth;
      // On mobile, use the SMALLEST visible viewport (visualViewport
      // when available, otherwise innerHeight) so the phone always fits
      // even with the URL bar showing. On desktop, innerHeight is fine.
      const vh =
        vw < DESKTOP_MIN
          ? Math.min(
              window.visualViewport?.height ?? window.innerHeight,
              window.innerHeight
            )
          : window.innerHeight;

      // 1024 is the desktop/touch structural line (Rule 1). WITHIN the touch tier
      // we still split phone (<768) from tablet (768–1023) for the hero's START
      // position only: the phone-tuned higher start (vh*0.38) crowds the logo
      // carousel on a tablet's taller/squarer viewport, so tablet starts lower
      // (vh*0.5). Everything else — size, zoom, and the zero end-bias that keeps
      // the zoomed-out phone clear of the section below — is shared across touch.
      const isDesktop = vw >= DESKTOP_MIN;
      const isMobile = vw < BREAKPOINTS.md; // phone (<768); the `else` branches below are tablet (768–1023)

      let ch;
      if (isDesktop) {
        // Slightly larger on desktop (was vw * 0.55) so the phone has more
        // presence in the hero's right half.
        ch = Math.min(vh * 0.98, (vw * 0.62) / IMAGE_ASPECT);
      } else {
        // Phone + tablet share the phone size — the 40% width clause below sets
        // the real on-screen size, and this gives the clean full-bleed zoom.
        ch = vh * 0.6;
      }

      let cw = ch * IMAGE_ASPECT;

      if (!isDesktop && cw * 0.2294 < vw * 0.4) {
        cw = (vw * 0.4) / 0.2294;
        ch = cw / IMAGE_ASPECT;
      }

      const phoneCenterX_image = cw * PHONE_CENTER_X_FRAC;
      const phoneCenterY_image = cw === 0 ? 0 : ch * PHONE_CENTER_Y_FRAC;
      const phoneH_image = ch * PHONE_HEIGHT_FRAC;

      const startX = isDesktop ? vw * 0.72 - cw / 2 : vw / 2 - cw / 2;

      let startY;
      if (isDesktop) {
        // Center the phone BODY (not the whole image) on the viewport's
        // vertical midline. The phone sits at PHONE_CENTER_Y_FRAC down the
        // image, so offset by that fraction rather than half the image height
        // — otherwise the wrist/hand below the phone drags the phone too low.
        startY = vh * 0.5 - PHONE_CENTER_Y_FRAC * ch;
      } else if (isMobile) {
        // Phone: sits a touch higher — its narrow viewport leaves room above.
        startY = vh * 0.38 - 0.1225 * ch;
      } else {
        // Tablet: start lower than phone so the at-rest phone clears the logo
        // carousel above on the taller/squarer tablet viewport.
        startY = vh * 0.5 - 0.1225 * ch;
      }

      // Phone-bezel target fills at full zoom. The wrist below the
      // phone is allowed to extend past the viewport bottom at full
      // zoom (we don't render a hard cutoff — see CONTAINER_BOTTOM_PAD
      // below, which extends the motion container further down so the
      // image's natural transparent fade never butts up against a
      // container edge during the zoom-out).
      const heightBudget = 0.78;
      // Touch (phone + tablet) fills a hair less width than desktop.
      const widthBudget = isDesktop ? 0.85 : 0.84;

      let endScale = Math.min(
        (vh * heightBudget) / phoneH_image,
        (vw * widthBudget) / (cw * 0.2294)
      );
      if (endScale > 6) endScale = 6;

      const endX = vw / 2 - phoneCenterX_image * endScale;
      // Touch (phone + tablet): no downward bias, so the zoomed-out phone's
      // bottom bezel stays above the section below (this is what keeps the
      // tablet phone off the "21%" stats). Desktop keeps its slight offset.
      const endYOffset = isDesktop ? vh * 0.06 : 0;
      const endY = vh / 2 + endYOffset - phoneCenterY_image * endScale;

      // Desktop EXIT x: on the way back out the phone zooms to scale 1 but stays
      // horizontally CENTERED (vw/2) instead of sliding back to its right-side
      // hero position. Computed for scale 1 (not endScale), so paired with the
      // scale→1 keyframe the phone center stays pinned at vw/2 through the whole
      // zoom-out. Touch tiers already start centered, so they keep startX (no-op).
      const exitX = isDesktop ? vw / 2 - phoneCenterX_image : startX;

      setAnimValues({ startX, startY, endX, endY, exitX, endScale, cw, ch });
    };

    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Pin the stage via a `position: fixed` toggle instead of `position: sticky`.
  // A sticky stage with content becomes a persistent composited layer that
  // flattens iOS Safari's translucent safe-area bars page-wide; `fixed` does
  // not. See useScrollPin for the full rationale.
  const pin = useScrollPin(containerRef);

  // The STAGE_BOTTOM_CLIP mitigation is PHONE-ONLY (Rule 3): it fixes an iPhone
  // Safari translucent-toolbar quirk iPadOS doesn't have. Tablets share the touch
  // pin (fixed) but must NOT get the clip — they behave like desktop here.
  const isPhone = useIsPhone();

  // Smooth out chunky scroll deltas on mobile (iOS momentum scrolling delivers
  // scrollY updates in bursts). The spring interpolates between bursts so each
  // animation frame sees a small, continuous progress step — which translates
  // directly into a small, continuous scale change.
  const smoothedProgress = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 110,
    mass: 0.45,
    restDelta: 0.0005,
  });

  // Phases:
  // 0.00 -> 0.22  : zoom in  (snappier — gets the user to the action faster)
  // 0.22 -> 0.85  : HOLD at zoom — phone is fully interactive (~63% of scroll
  //                 runway, up from 40%, so the click indicators have time to
  //                 cycle a few times and the user can actually engage)
  // 0.85 -> 1.00  : zoom out (gradual, ease-in-out)
  const phaseStops = [0, 0.22, 0.85, 1.0] as const;
  const phaseEase = [zoomEase, linearHold, zoomEase];

  const x = useTransform(
    smoothedProgress,
    [...phaseStops],
    [animValues.startX, animValues.endX, animValues.endX, animValues.exitX],
    { ease: phaseEase }
  );
  const y = useTransform(
    smoothedProgress,
    [...phaseStops],
    [animValues.startY, animValues.endY, animValues.endY, animValues.startY],
    { ease: phaseEase }
  );
  const scale = useTransform(
    smoothedProgress,
    [...phaseStops],
    [1, animValues.endScale, animValues.endScale, 1],
    { ease: phaseEase }
  );
  const [isInteractive, setIsInteractive] = useState(false);
  useMotionValueEvent(smoothedProgress, "change", (progress) => {
    // Widened to align with the longer HOLD phase (phaseStops above).
    const next = progress >= 0.26 && progress <= 0.82;
    setIsInteractive((cur) => (cur === next ? cur : next));
  });

  const screenScale = (animValues.ch * PHONE_HEIGHT_FRAC) / PHONE_H;
  const screenW = PHONE_W * screenScale;
  const screenH = PHONE_H * screenScale;
  const screenLeft = animValues.cw * PHONE_CENTER_X_FRAC - screenW / 2;
  const screenTop = animValues.ch * PHONE_CENTER_Y_FRAC - screenH / 2;

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full z-40 -mt-[45vh] lg:-mt-[100vh] pointer-events-none"
      style={{ height: "200vh" }}
    >
      <div
        className="w-full"
        style={{
          position: pin.position,
          top: pin.top,
          bottom: pin.bottom,
          left: pin.left,
          // overflow:hidden contains the zooming phone within the stage for the
          // whole touch tier (phone + tablet) — it is NOT the iOS mitigation.
          // Only the 4px height clip is phone-only (Rule 3): tablets get full
          // 100dvh, phones shave 4px to keep iOS Safari's bottom bar from latching.
          height:
            pin.position === "fixed" && isPhone
              ? `calc(100dvh - ${STAGE_BOTTOM_CLIP}px)`
              : "100dvh",
          overflow: pin.position === "fixed" ? "hidden" : "visible",
          pointerEvents: isInteractive ? "auto" : "none",
        }}
      >
        <motion.div
          className="absolute origin-top-left"
          style={{
            width: animValues.cw,
            height: animValues.ch * (1 + CONTAINER_BOTTOM_PAD),
            x,
            y,
            scale,
            opacity: isMounted ? 1 : 0,
            willChange: "transform",
          }}
        >
          {/* Beige underlay sits behind the interactive screen and a hair
              outside its bounds. The iPhone bezel PNG (z-20) covers it
              everywhere except inside the screen cutout — so any hairline
              gap between the rendered Enzy UI (z-10, exact phone-screen
              size) and the inner edge of the bezel shows the same off-white
              as the UI, never the page background. The expansion is kept
              very small (~1% on each side) so the underlay never bleeds
              past the bezel hardware around the screen. */}
          <div
            className="absolute z-[5]"
            style={{
              left: screenLeft - screenW * 0.01,
              top: screenTop - screenH * 0.008,
              width: screenW * 1.02,
              height: screenH * 1.016,
              backgroundColor: PHONE_SCREEN_BG,
              borderRadius: PHONE_SCREEN_RADIUS * screenScale * 1.05,
            }}
            aria-hidden
          />

          <div
            className="absolute origin-top-left z-10 overflow-hidden"
            style={{
              left: screenLeft,
              top: screenTop,
              width: PHONE_W,
              height: PHONE_H,
              transform: `scale(${screenScale})`,
              borderRadius: PHONE_SCREEN_RADIUS,
            }}
          >
            <InteractivePhone interactive={isInteractive} />
          </div>

          {/* Image is pinned to the TOP of the motion container at its
              natural cw × ch size. The motion container is taller (see
              CONTAINER_BOTTOM_PAD), so the PNG's own alpha fade at the
              bottom of the wrist has room to fall off cleanly.

              Uses next/image so Next's optimizer compresses the self-hosted
              4000×2886 source PNG into right-sized AVIF/WebP variants
              cached on the edge. `sizes` mirrors the runtime layout:
              ~85vw on mobile, ~55vw on desktop, capped at 1400px. */}
          <Image
            src={HAND_IMAGE}
            alt="Hand holding phone"
            width={2000}
            height={1443}
            priority
            // The hand image is scaled up far beyond the viewport on small
            // screens — the phone fills the screen, but the phone is only ~23%
            // of the image width, so the full image renders at ~175vw at rest
            // and zooms to ~300vw on scroll. `sizes` must reflect that real
            // rendered width (not the viewport) or the browser under-fetches a
            // tiny variant and it looks pixelated. These values push mobile to
            // the largest (3840px) variant so the phone stays sharp through the
            // zoom. Desktop is left modest (it renders near 1:1).
            sizes="(max-width: 767px) 300vw, (max-width: 1023px) 220vw, (max-width: 1440px) 60vw, 1400px"
            quality={90}
            className="absolute top-0 left-0 pointer-events-none select-none z-20"
            style={{
              width: animValues.cw,
              height: animValues.ch,
              objectFit: "cover",
            }}
            draggable={false}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
