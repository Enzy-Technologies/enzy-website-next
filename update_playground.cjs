const fs = require('fs');

const content = `
"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PlaygroundHomeScreen } from "./PlaygroundHomeScreen";
import screenAiChat from "@/assets/playground-screen-ai-chat.png";
import screenLeaderboard from "@/assets/playground-screen-leaderboard.png";
import screenMessaging from "@/assets/playground-screen-messaging.png";

const BASE_IMAGES = {
  home: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png",
  chat: "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhoneAI.png",
} as const;

const SCREEN_LEFT = "37.75%";
const SCREEN_TOP = "12.25%";
const SCREEN_WIDTH = "22.94%";
const SCREEN_HEIGHT = "66.84%";
const SCREEN_RADIUS = "14%";
const SCREEN_ROTATE = "-0.35deg";

const screenContainerStyle: React.CSSProperties = {
  left: SCREEN_LEFT,
  top: SCREEN_TOP,
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  borderRadius: SCREEN_RADIUS,
  transform: \`rotate(\${SCREEN_ROTATE})\`,
  transformOrigin: "center center",
};

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
    Object.values(BASE_IMAGES).forEach((src) => {
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
  // 0.05 -> 0.20: hold home
  // 0.20 -> 0.30: leaderboard slides up
  // 0.30 -> 0.45: hold leaderboard
  // 0.45 -> 0.55: messaging slides up
  // 0.55 -> 0.70: hold messaging
  // 0.70 -> 0.80: chat slides up
  // 0.80 -> 0.90: hold chat
  // 0.90 -> 1.00: zoom out

  const x = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1.0],
    [animValues.startX, animValues.endX, animValues.endX, animValues.startX]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1.0],
    [animValues.startY, animValues.endY, animValues.endY, animValues.startY]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1.0],
    [1, animValues.endScale, animValues.endScale, 1]
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.09, 0.86, 0.9],
    [0, 1, 1, 0]
  );

  // Base image crossfade (home -> chat hand)
  const baseHomeOpacity = useTransform(scrollYProgress, [0.7, 0.8], [1, 0]);
  const baseChatOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

  // Screen slide animations
  const leaderboardY = useTransform(scrollYProgress, [0.2, 0.3], ["100%", "0%"]);
  const messagingY = useTransform(scrollYProgress, [0.45, 0.55], ["100%", "0%"]);
  const chatY = useTransform(scrollYProgress, [0.7, 0.8], ["100%", "0%"]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full z-10 -mt-[45vh] lg:-mt-[100vh]"
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
          <motion.img
            src={BASE_IMAGES.home}
            alt="Hand holding phone"
            className="absolute inset-0 w-full h-full object-cover z-30"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            draggable={false}
            style={{ opacity: baseHomeOpacity }}
          />
          <motion.img
            src={BASE_IMAGES.chat}
            alt="Hand holding phone AI"
            className="absolute inset-0 w-full h-full object-cover z-30"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            draggable={false}
            style={{ opacity: baseChatOpacity }}
          />

          {/* Screen Overlay Container */}
          <div
            className="absolute z-40 overflow-hidden bg-[#F7F9FC]"
            style={screenContainerStyle}
          >
            {/* 1. Home Screen (Figma Design) */}
            <div className="absolute inset-0 origin-top-left" style={{ width: 393, height: 852, transform: \`scale(\${(animValues.cw * 0.2294) / 393})\` }}>
               <PlaygroundHomeScreen />
            </div>

            {/* 2. Leaderboard Screen */}
            <motion.img
              src={screenLeaderboard.src}
              alt="Leaderboard"
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ y: leaderboardY }}
            />

            {/* 3. Messaging Screen */}
            <motion.img
              src={screenMessaging.src}
              alt="Messaging"
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ y: messagingY }}
            />

            {/* 4. AI Chat Screen */}
            <motion.img
              src={screenAiChat.src}
              alt="AI Chat"
              className="absolute inset-0 w-full h-full object-cover object-top"
              style={{ y: chatY }}
            />
          </div>

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
`;

fs.writeFileSync('/Users/cademangelson/Projects/Code.js/enzy-website-next/src/app/playground/playground.tsx', content);
