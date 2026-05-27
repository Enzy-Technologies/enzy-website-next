"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  cubicBezier,
} from "motion/react";
import { InteractivePhone, PHONE_W, PHONE_H } from "./interactive/InteractivePhone";

const HAND_IMAGE =
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone%20(2).png";

const IMAGE_ASPECT = 8000 / 5772;

const PHONE_CENTER_X_FRAC = 0.4978;
const PHONE_CENTER_Y_FRAC = 0.4567;
const PHONE_HEIGHT_FRAC = 0.6684;

// iPhone-style inner screen radius (in PHONE_W=393 coordinate space).
// Scales with the phone via the same transform applied to the screen overlay.
const PHONE_SCREEN_RADIUS = 56;

// Extra transparent space appended below the hand image inside the
// scroll/zoom container so the PNG's natural alpha fade at the wrist
// has room to fall off — instead of meeting a hard horizontal container
// edge as the user scrolls out of the zoomed-in state.
const CONTAINER_BOTTOM_PAD = 0.18; // fraction of ch

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
        vw < 1024
          ? Math.min(
              window.visualViewport?.height ?? window.innerHeight,
              window.innerHeight
            )
          : window.innerHeight;

      const isMobile = vw < 768;
      const isDesktop = vw >= 1024;

      let ch;
      if (isDesktop) {
        ch = Math.min(vh * 0.95, (vw * 0.55) / IMAGE_ASPECT);
      } else if (isMobile) {
        ch = vh * 0.6;
      } else {
        ch = Math.min(vh * 0.75, (vw * 0.8) / IMAGE_ASPECT);
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
        startY = vh * 0.55 - ch / 2;
      } else if (isMobile) {
        // Position phone in the lower half of the hero with breathing
        // room between the logo marquee caption above and the phone.
        startY = vh * 0.38 - 0.1225 * ch;
      } else {
        startY = vh * 0.5 - 0.1225 * ch;
      }

      // Phone-bezel target fills at full zoom. The wrist below the
      // phone is allowed to extend past the viewport bottom at full
      // zoom (we don't render a hard cutoff — see CONTAINER_BOTTOM_PAD
      // below, which extends the motion container further down so the
      // image's natural transparent fade never butts up against a
      // container edge during the zoom-out).
      const heightBudget = isMobile ? 0.78 : 0.78;
      const widthBudget = isMobile ? 0.84 : 0.85;

      let endScale = Math.min(
        (vh * heightBudget) / phoneH_image,
        (vw * widthBudget) / (cw * 0.2294)
      );
      if (endScale > 6) endScale = 6;

      const endX = vw / 2 - phoneCenterX_image * endScale;
      // Mobile: center the phone vertically (no downward bias) so the
      // bottom bezel sits safely above the visible viewport. Desktop:
      // keep the existing slight downward offset.
      const endYOffset = isMobile ? 0 : vh * 0.06;
      const endY = vh / 2 + endYOffset - phoneCenterY_image * endScale;

      setAnimValues({ startX, startY, endX, endY, endScale, cw, ch });
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
  // 0.00 -> 0.35  : zoom in  (gradual, ease-in-out)
  // 0.35 -> 0.75  : HOLD at zoom — phone is fully interactive
  // 0.75 -> 1.00  : zoom out (gradual, ease-in-out)
  const phaseStops = [0, 0.35, 0.75, 1.0] as const;
  const phaseEase = [zoomEase, linearHold, zoomEase];

  const x = useTransform(
    smoothedProgress,
    [...phaseStops],
    [animValues.startX, animValues.endX, animValues.endX, animValues.startX],
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
    const next = progress >= 0.4 && progress <= 0.72;
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
      className="relative w-full z-40 -mt-[45vh] lg:-mt-[100vh]"
      style={{ height: "200vh" }}
    >
      <div
        className="sticky top-0 w-full h-[100dvh]"
        style={{ pointerEvents: isInteractive ? "auto" : "none" }}
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
              bottom of the wrist has room to fall off cleanly. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HAND_IMAGE}
            alt="Hand holding phone"
            className="absolute top-0 left-0 pointer-events-none select-none z-20"
            style={{
              width: animValues.cw,
              height: animValues.ch,
              objectFit: "cover",
            }}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            draggable={false}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
