"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/app/components/CTAButton";
import {
  HERO_SCENARIOS,
  type HeroScenarioKey,
  initialDemoState,
  HeroPhoneFrame,
  HeroPhoneScreenContent,
  AiAssistantModal,
  type AssistantDemoState,
} from "@/app/playground/playgroundShared";

export function HeroPlaygroundExperience({
  isLightMode,
  scenarioKey,
  stack,
}: {
  isLightMode: boolean;
  scenarioKey: HeroScenarioKey;
  stack: "salesforce" | "hubspot" | "other";
}) {
  const scenario = HERO_SCENARIOS.find((s) => s.key === scenarioKey) ?? HERO_SCENARIOS[0];

  const seeded = useMemo(() => {
    const s = initialDemoState(scenario);
    // Seed CRM choice for the "today's stats" flow if the user enters it.
    return {
      ...s,
      selections: { ...s.selections, crm: stack },
    } satisfies AssistantDemoState;
  }, [scenarioKey, stack]);

  const [demoState, setDemoState] = useState<AssistantDemoState>(seeded);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isPhoneExpanded, setIsPhoneExpanded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);
  useEffect(() => setDemoState(seeded), [seeded]);

  useEffect(() => {
    if (!isPhoneExpanded) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPhoneExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPhoneExpanded]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Category toggles live here now */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pointer-events-auto px-2">
        {HERO_SCENARIOS.map((s) => {
          const active = s.key === scenarioKey;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => {
                // Playground page owns the key; this button is informational here.
                // Keep it non-interactive to avoid conflicting state.
              }}
              className={`rounded-full px-4 py-2 text-[13px] md:text-[14px] font-['Inter'] font-semibold tracking-tight border backdrop-blur-md ${
                active
                  ? "border-[#19ad7d]/35 bg-[#19ad7d]/15 text-[#19ad7d]"
                  : isLightMode
                    ? "border-black/10 bg-white/70 text-black/50"
                    : "border-white/10 bg-white/5 text-white/50"
              }`}
              aria-pressed={active}
              disabled
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="flex w-full max-w-3xl flex-col gap-1.5 z-30 pointer-events-auto px-2">
        <p className={`text-center font-['Inter'] text-[14px] md:text-[15px] font-medium tracking-tight ${isLightMode ? "text-black/60" : "text-white/65"}`}>
          {scenario.outcomeLine}
        </p>
        <p className={`text-center text-[12px] md:text-[13px] font-['Inter'] leading-snug ${isLightMode ? "text-black/45" : "text-white/50"}`}>
          Tap a prompt to explore. Use Expand for the full workflow.
        </p>
      </div>

      {/* Device */}
      <div className="w-full flex justify-center">
        <div className="relative w-[min(92vw,420px)] md:w-[min(92vw,520px)]">
          <div className="relative mx-auto cursor-pointer" style={{ aspectRatio: "402 / 874" }}>
            <div className="absolute inset-0 min-h-0 transition-[filter] duration-300">
              <HeroPhoneFrame isLightMode={isLightMode} productLabel="iPhone 17">
                <HeroPhoneScreenContent demoState={demoState} scenario={scenario} setDemoState={setDemoState} />
              </HeroPhoneFrame>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-3">
            <CTAButton
              type="button"
              variant="secondary"
              className="rounded-full px-6 py-3 text-[14px] font-semibold tracking-tight"
              onClick={() => setDemoState(initialDemoState(scenario))}
            >
              Reset
            </CTAButton>
            <CTAButton
              type="button"
              variant="primary"
              className="rounded-full px-6 py-3 text-[14px] font-semibold tracking-tight"
              onClick={() => setIsAiModalOpen(true)}
            >
              Expand <ArrowRight size={16} strokeWidth={2.25} />
            </CTAButton>
          </div>
        </div>
      </div>

      <AiAssistantModal
        open={isAiModalOpen}
        onOpenChange={setIsAiModalOpen}
        isLightMode={isLightMode}
        scenario={scenario}
        demoState={demoState}
        setDemoState={setDemoState}
      />

      {/* Simple fullscreen expand for mobile */}
      <AnimatePresence>
        {hasMounted && isPhoneExpanded && (
          <motion.div className="fixed inset-0 z-[9999] md:hidden pointer-events-auto" />
        )}
      </AnimatePresence>
    </div>
  );
}

