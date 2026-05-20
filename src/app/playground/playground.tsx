
"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

const BASE_IMAGES = [
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone-leaderboard.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20Messaging.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhoneAI.png",
];

export function Playground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
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

      const imageAspect = 8000 / 5772;

      const isMobile = vw < 768;
      const isDesktop = vw >= 1024;

      let ch;
      if (isDesktop) {
        ch = Math.min(vh * 0.95, (vw * 0.55) / imageAspect);
      } else if (isMobile) {
        ch = vh * 0.6;
      } else {
        ch = Math.min(vh * 0.75, (vw * 0.8) / imageAspect);
      }

      let cw = ch * imageAspect;

      if (!isDesktop && cw * 0.2294 < vw * 0.4) {
        cw = (vw * 0.4) / 0.2294;
        ch = cw / imageAspect;
      }

      const phoneCenterX_image = cw * 0.4922;
      const phoneCenterY_image = ch * 0.4567;
      const phoneH_image = ch * 0.6684;

      let startX = isDesktop ? vw * 0.72 - cw / 2 : vw / 2 - cw / 2;

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

  useEffect(() => {
    BASE_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phases:
  // 0.00 -> 0.05: zoom in
  // 0.05 -> 0.20: home
  // 0.20 -> 0.40: leaderboard
  // 0.40 -> 0.60: messaging
  // 0.60 -> 0.88: AI chat
  // 0.93 -> 1.00: zoom out

  const x = useTransform(
    scrollYProgress,
    [0, 0.05, 0.93, 1.0],
    [animValues.startX, animValues.endX, animValues.endX, animValues.startX]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.05, 0.88, 1.0],
    [
      animValues.startY,
      animValues.endY + animValues.ch * 0.02,
      animValues.endY - animValues.ch * 0.02,
      animValues.startY,
    ]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.93, 1.0],
    [1, animValues.endScale, animValues.endScale, 1]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.09, 0.84, 0.9],
    [0, 1, 1, 0]
  );

  const getImageIndex = (progress: number) => {
    if (progress < 0.2) return 0;
    if (progress < 0.4) return 1;
    if (progress < 0.6) return 2;
    return 3;
  };

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextIndex = getImageIndex(progress);
    setActiveImageIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full z-40 -mt-[45vh] lg:-mt-[100vh]"
      style={{ height: "600vh" }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-8 md:top-12 left-0 w-full text-center flex justify-center pointer-events-none z-40"
          style={{ opacity: textOpacity }}
        >
          <h2 className="font-inter font-semibold text-[#111111] text-3xl md:text-5xl tracking-tight">
            Enzy Goes Agentic
          </h2>
        </motion.div>

        <motion.div
          className="absolute origin-top-left overflow-hidden"
          style={{
            width: animValues.cw,
            height: animValues.ch,
            x,
            y,
            scale,
            opacity: isMounted ? 1 : 0,
          }}
        >
          <img
            src={BASE_IMAGES[activeImageIndex]}
            alt="Phone screen"
            className="absolute inset-0 w-full h-full object-cover z-40"
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
