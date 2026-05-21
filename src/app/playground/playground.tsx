"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { InteractivePhone, PHONE_W, PHONE_H } from "./interactive/InteractivePhone";

const HAND_IMAGE =
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone-Recovered.png";

const IMAGE_ASPECT = 8000 / 5772;

const PHONE_CENTER_X_FRAC = 0.4922;
const PHONE_CENTER_Y_FRAC = 0.4567;
const PHONE_HEIGHT_FRAC = 0.6684;

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
      const vh = window.innerHeight;

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
        startY = vh * 0.45 - 0.1225 * ch;
      } else {
        startY = vh * 0.5 - 0.1225 * ch;
      }

      let endScale = Math.min(
        (vh * 0.78) / phoneH_image,
        (vw * 0.85) / (cw * 0.2294)
      );
      if (endScale > 6) endScale = 6;

      const endX = vw / 2 - phoneCenterX_image * endScale;
      const endY = vh / 2 + vh * 0.06 - phoneCenterY_image * endScale;

      setAnimValues({ startX, startY, endX, endY, endScale, cw, ch });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phases:
  // 0.00 -> 0.08  : zoom in
  // 0.08 -> 0.92  : HOLD at zoom — phone is fully interactive
  // 0.92 -> 1.00  : zoom out
  const x = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1.0],
    [animValues.startX, animValues.endX, animValues.endX, animValues.startX]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1.0],
    [animValues.startY, animValues.endY, animValues.endY, animValues.startY]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1.0],
    [1, animValues.endScale, animValues.endScale, 1]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.08, 0.88, 0.9],
    [0, 1, 1, 0]
  );
  const textY = useTransform(
    scrollYProgress,
    [0.06, 0.08, 0.88, 0.9],
    [12, 0, 0, -8]
  );

  const [isInteractive, setIsInteractive] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = progress >= 0.1 && progress <= 0.9;
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
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ pointerEvents: isInteractive ? "auto" : "none" }}
      >
        <motion.div
          className="absolute top-[9vh] md:top-[10vh] left-0 w-full text-center flex justify-center pointer-events-none z-40 px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          <h2 className="font-ivyora font-medium text-[#0b0f14] text-5xl md:text-7xl lg:text-[80px] leading-[0.95] tracking-[-2px]">
            Enzy Goes <span className="italic">Agentic</span>
          </h2>
        </motion.div>

        <motion.div
          className="absolute origin-top-left"
          style={{
            width: animValues.cw,
            height: animValues.ch,
            x,
            y,
            scale,
            opacity: isMounted ? 1 : 0,
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
              borderRadius: 0,
            }}
          >
            <InteractivePhone interactive={isInteractive} />
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HAND_IMAGE}
            alt="Hand holding phone"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-20"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            draggable={false}
          />

          <div
            className="absolute inset-0 pointer-events-none z-50"
            style={{
              background:
                "linear-gradient(to bottom, transparent 80%, var(--color-surface-light) 98%)",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
