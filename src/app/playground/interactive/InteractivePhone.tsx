"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import Homepage from "../interactive-imports/Homepage/Homepage";
import { PhoneViewContext } from "./PhoneViewContext";
import RoundedNavHome from "../interactive-imports/RoundedNavHome/RoundedNavHome";
import RoundedNavLeaderboard from "../interactive-imports/RoundedNavLeaderboard/RoundedNavLeaderboard";
import RoundedNavChats from "../interactive-imports/RoundedNavChats/RoundedNavChats";
import { ClickIndicator } from "./ClickIndicator";

// Lazy-load the inner phone screens that only mount after a tap. Homepage
// stays eagerly imported because it's the default screen, but Leaderboard,
// Chats, and AiChat together account for ~3.4k lines of JSX which we can
// keep out of the initial bundle until the user actually clicks through.
const Leaderboard = dynamic(
  () => import("../interactive-imports/11LeaderboardPodiumLightMode/11LeaderboardPodiumLightMode"),
  { ssr: false }
);
const Chats = dynamic(
  () => import("../interactive-imports/ChatsLightMode/ChatsLightMode"),
  { ssr: false }
);
const AiChatInteractive = dynamic(
  () => import("./AiChatInteractive"),
  { ssr: false }
);

type Screen = "home" | "ai" | "leaderboard" | "chats";

export const PHONE_W = 393;
export const PHONE_H = 852;

const NAV_Y = 802;
const NAV_LEFT = (PHONE_W - (278 + 16 + 52)) / 2;
const SPARKLE_CX = NAV_LEFT + 278 + 16 + 26;

const navConfig: Record<
  Screen,
  { Nav: React.ComponentType<{ className?: string }>; activeSlot: number; targets: { slot: number; to: Screen | "ai" }[] }
> = {
  home: {
    Nav: RoundedNavHome,
    activeSlot: 0,
    targets: [
      { slot: 1, to: "leaderboard" },
      { slot: 2, to: "chats" },
    ],
  },
  leaderboard: {
    Nav: RoundedNavLeaderboard,
    activeSlot: 1,
    targets: [
      { slot: 0, to: "home" },
      { slot: 2, to: "chats" },
    ],
  },
  chats: {
    Nav: RoundedNavChats,
    activeSlot: 2,
    targets: [
      { slot: 0, to: "home" },
      { slot: 1, to: "leaderboard" },
    ],
  },
  ai: {
    Nav: RoundedNavHome,
    activeSlot: 0,
    targets: [],
  },
};

const screens: Record<Exclude<Screen, "ai">, React.ComponentType> = {
  home: Homepage,
  leaderboard: Leaderboard,
  chats: Chats,
};

const navLabels = ["HOME", "Leaderboard", "CHATS", "", ""];

type NavTarget = { slot: number; to: Screen | "ai" };

function NavOverlay({
  activeSlot,
  targets,
  setScreen,
  enableIndicators,
  indicatorVariant = "breathe",
}: {
  activeSlot: number;
  targets: NavTarget[];
  setScreen: (s: Screen) => void;
  enableIndicators: boolean;
  indicatorVariant?: "breathe" | "ping";
}) {
  return (
    <div className="absolute left-0 top-0 flex h-[52px] w-[278px] items-center justify-between p-[8px]">
      {[0, 1, 2, 3, 4].map((slot) => {
        const isActive = slot === activeSlot;
        const target = targets.find((t) => t.slot === slot);
        return (
          <div
            key={slot}
            className={
              isActive
                ? "flex shrink-0 items-center justify-center gap-[8px] px-[8px] py-[10px]"
                : "relative h-[38px] min-w-px flex-[1_0_0]"
            }
          >
            {isActive && (
              <>
                <div className="size-[16px] shrink-0" />
                <p className="font-[ui-monospace,'SF_Mono','Menlo',monospace] text-[11px] uppercase tracking-[0.5px] whitespace-nowrap opacity-0">
                  {navLabels[slot]}
                </p>
              </>
            )}
            {target && (
              <>
                <button
                  aria-label={String(target.to)}
                  onClick={() => setScreen(target.to as Screen)}
                  className="absolute inset-0 z-40 cursor-pointer"
                />
                {enableIndicators && (
                  <ClickIndicator
                    top="50%"
                    left="50%"
                    delay={0.4 + targets.indexOf(target) * 0.4}
                    ringOnly
                    size={32}
                    variant={indicatorVariant}
                  />
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function InteractivePhone({
  interactive,
  tapHint = false,
}: {
  interactive: boolean;
  /** Use the louder "ping" indicator style (landing hero only). */
  tapHint?: boolean;
}) {
  const indicatorVariant = tapHint ? "ping" : "breathe";
  const [screen, setScreen] = useState<Screen>("home");
  const baseScreen: Exclude<Screen, "ai"> = screen === "ai" ? "home" : screen;
  const ScreenComp = screens[baseScreen];
  const cfg = navConfig[screen];

  return (
    <PhoneViewContext.Provider value={{ inView: interactive }}>
    <div
      className="relative bg-[#faf9f6] overflow-hidden"
      style={{
        width: PHONE_W,
        height: PHONE_H,
        pointerEvents: interactive ? "auto" : "none",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={baseScreen}
          className="absolute inset-0"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <ScreenComp />
        </motion.div>
      </AnimatePresence>

      {screen === "ai" && <AiChatInteractive onClose={() => setScreen("home")} />}

      {screen !== "ai" && (
        <>
          <div
            className="pointer-events-none absolute left-0 right-0 z-20 bg-[#faf9f6]"
            style={{ top: 760, height: 92 }}
          />
          <div
            className="absolute z-30"
            style={{
              left: NAV_LEFT,
              top: NAV_Y - 26,
              width: 278 + 16 + 52,
              height: 52,
            }}
          >
            <cfg.Nav className="content-stretch flex gap-[16px] items-center relative" />
            <NavOverlay
              activeSlot={cfg.activeSlot}
              targets={cfg.targets}
              setScreen={setScreen}
              enableIndicators={interactive}
              indicatorVariant={indicatorVariant}
            />
          </div>
        </>
      )}

      {screen === "home" && (
        <>
          <button
            aria-label="Ask AI"
            onClick={() => setScreen("ai")}
            className="absolute z-40 cursor-pointer rounded-2xl"
            style={{ top: 240, left: 24, width: 345, height: 40 }}
          />
          {interactive && (
            <ClickIndicator top={241} left={52} delay={0.5} ringOnly size={36} variant={indicatorVariant} />
          )}
        </>
      )}

      {screen !== "ai" && (
        <>
          <button
            aria-label="ai"
            onClick={() => setScreen("ai")}
            className="absolute z-40 cursor-pointer rounded-full"
            style={{ top: NAV_Y - 26, left: SPARKLE_CX - 26, width: 52, height: 52 }}
          />
          {interactive && (
            <ClickIndicator
              top={NAV_Y}
              left={SPARKLE_CX}
              delay={0.8}
              ringOnly
              size={36}
              variant={indicatorVariant}
            />
          )}
        </>
      )}

      {screen === "ai" && (
        <>
          <button
            aria-label="close"
            onClick={() => setScreen("home")}
            className="absolute z-40 cursor-pointer rounded-full"
            style={{ top: 24, left: 333, width: 44, height: 44 }}
          />
          {interactive && (
            <ClickIndicator top={46} left={355} delay={0.4} ringOnly size={48} variant={indicatorVariant} />
          )}
        </>
      )}
    </div>
    </PhoneViewContext.Provider>
  );
}

export default InteractivePhone;
