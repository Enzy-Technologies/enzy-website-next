"use client";

// Shared Playground primitives sourced from the existing hero implementation.
// This keeps the landing page lightweight while reusing the demo logic.

import React, { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { Battery, Signal, Sparkles, Wifi } from "lucide-react";

export type HeroScenarioKey = "field" | "leaders" | "ops";

type ScenarioSource = { id: string; label: string };
export type HeroScenario = {
  key: HeroScenarioKey;
  label: string;
  outcomeLine: string;
  sources: ScenarioSource[];
};

export const HERO_SCENARIOS: readonly HeroScenario[] = [
  {
    key: "field",
    label: "Field reps",
    outcomeLine: "Spot stalled deals, compete daily, and keep activity consistent.",
    sources: [
      { id: "crm", label: "CRM activity" },
      { id: "comms", label: "Team comms" },
      { id: "calendar", label: "Calendar" },
    ],
  },
  {
    key: "leaders",
    label: "Leaders",
    outcomeLine: "Coach with real-time clarity, nudges, and the next best action.",
    sources: [
      { id: "crm", label: "CRM pipeline" },
      { id: "performance", label: "Performance" },
      { id: "teams", label: "Teams" },
    ],
  },
  {
    key: "ops",
    label: "Ops",
    outcomeLine: "Automate reporting, alerts, and workflows across tools.",
    sources: [
      { id: "crm", label: "CRM" },
      { id: "warehouse", label: "Data" },
      { id: "automations", label: "Automations" },
    ],
  },
] as const;

export type QuickReply = { id: string; label: string };
export type ChatMessage = { id: string; role: "assistant" | "user"; text: string; quickReplies?: QuickReply[] };

export type AssistantDemoState =
  | {
      mode: "start";
      flowId?: undefined;
      step?: undefined;
      selections: Record<string, string>;
      messages: ChatMessage[];
    }
  | {
      mode: "flow";
      flowId: "build-competition" | "todays-sales-stats" | "automated-event-messaging";
      step: number;
      selections: Record<string, string>;
      messages: ChatMessage[];
    };

export function initialDemoState(_scenario: HeroScenario): AssistantDemoState {
  return {
    mode: "start",
    selections: {},
    messages: [
      {
        id: "m1",
        role: "assistant",
        text: "Pick a workflow and I’ll generate a tailored draft you can use right now.",
        quickReplies: [
          { id: "flow:build-competition", label: "Build a competition" },
          { id: "flow:todays-sales-stats", label: "Today’s sales stats" },
          { id: "flow:automated-event-messaging", label: "Automate event messaging" },
        ],
      },
    ],
  };
}

export function HeroPhoneFrame({
  isLightMode,
  children,
  className = "",
  productLabel = "iPhone 17",
}: {
  isLightMode: boolean;
  children: React.ReactNode;
  className?: string;
  productLabel?: string;
}) {
  return (
    <div
      data-device-mockup={productLabel}
      className={`relative h-full w-full rounded-[48px] bg-gradient-to-b from-[#f2f2f3] via-[#c9c9cd] to-[#a1a1a8] p-[2.5px] shadow-[0_32px_100px_rgba(0,0,0,0.48),0_12px_36px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.5)] dark:from-[#63636d] dark:via-[#45454f] dark:to-[#1f1f23] dark:shadow-[0_32px_100px_rgba(0,0,0,0.75),0_12px_36px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[45px] bg-[#0a0a0a] ring-1 ring-inset ring-white/[0.16]">
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-40 grid grid-cols-3 items-center px-[5.25%] pt-[3.6%]">
          <span
            className="justify-self-start font-['Inter'] text-[13px] font-semibold tabular-nums tracking-tight text-white"
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.95)" }}
          >
            9:41
          </span>
          <div
            className="justify-self-center h-[31px] w-[118px] rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_3px_14px_rgba(0,0,0,0.55)]"
            aria-hidden
          />
          <div className="justify-self-end flex items-center gap-0.5 pr-1 text-white">
            <Signal size={14} strokeWidth={2.35} className="opacity-95" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.85))" }} />
            <Wifi size={14} strokeWidth={2.35} className="opacity-95" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.85))" }} />
            <Battery size={17} strokeWidth={2.35} className="opacity-95" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.85))" }} />
          </div>
        </div>

        <div
          className={`absolute inset-x-[2.1%] bottom-[2.1%] top-[1.1%] overflow-hidden rounded-[32px] ${
            isLightMode
              ? "bg-[#050505] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_12px_40px_rgba(0,0,0,0.45)]"
              : "bg-[#030303] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_16px_48px_rgba(0,0,0,0.72)]"
          }`}
        >
          {children}
        </div>

        <div
          className="pointer-events-none absolute bottom-[1.6%] left-1/2 z-40 h-[5px] w-[140px] -translate-x-1/2 rounded-full bg-white/[0.4] shadow-[0_1px_3px_rgba(0,0,0,0.65)]"
          aria-hidden
        />
      </div>
    </div>
  );
}

function FlowChip({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-[#19ad7d]" />
      <span className="font-['Inter'] text-[10px] tracking-tight text-white/80">{label}</span>
    </div>
  );
}

export function HeroPhoneScreenContent({
  demoState,
  scenario,
  setDemoState,
}: {
  demoState: AssistantDemoState;
  scenario: HeroScenario;
  setDemoState: React.Dispatch<React.SetStateAction<AssistantDemoState>>;
}) {
  const isPhone = true;
  const messages = isPhone ? demoState.messages.slice(-5) : demoState.messages;

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-white/90 backdrop-blur-md">
        <Sparkles size={14} className="text-[#19ad7d]" />
        <span className="font-['Inter'] text-[11px] font-medium tracking-tight">AI Playground</span>
      </div>

      <div className="absolute left-4 right-4 top-14 z-20 flex flex-wrap gap-2">
        {scenario.sources.map((s) => (
          <FlowChip key={s.id} label={s.label} />
        ))}
      </div>

      <div className="absolute inset-x-4 bottom-4 top-[92px] z-10 overflow-hidden rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md">
        <HeroAssistantDemo demoState={demoState} scenario={scenario} setDemoState={setDemoState} isLightMode={false} />
      </div>
    </div>
  );
}

export function HeroAssistantDemo({
  demoState,
  scenario,
  setDemoState,
  isLightMode,
}: {
  demoState: AssistantDemoState;
  scenario: HeroScenario;
  setDemoState: React.Dispatch<React.SetStateAction<AssistantDemoState>>;
  isLightMode: boolean;
}) {
  const isStart = demoState.mode === "start";

  return (
    <div className="h-full w-full p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <div className="font-['Inter'] text-[12px] font-semibold text-white/90">Curated prompts</div>
        <div className="flex flex-col gap-2">
          {(isStart ? demoState.messages[0].quickReplies ?? [] : []).map((q) => (
            <button
              key={q.id}
              type="button"
              onClick={() => {
                setDemoState((prev) => {
                  if (prev.mode !== "start") return prev;
                  return {
                    mode: "flow",
                    flowId: q.id.replace("flow:", "") as any,
                    step: 0,
                    selections: prev.selections,
                    messages: [
                      ...prev.messages,
                      { id: `u-${Date.now()}`, role: "user", text: q.label },
                      { id: `a-${Date.now() + 1}`, role: "assistant", text: "Great — let’s do it." },
                    ],
                  };
                });
              }}
              className="text-left rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 hover:bg-white/10 transition-colors"
            >
              <div className="font-['Inter'] text-[12px] font-semibold text-white/90">{q.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="font-['Inter'] text-[11px] text-white/60">
          Scenario: <span className="text-white/85 font-semibold">{scenario.label}</span>
        </div>
        <div className="font-['Inter'] text-[11px] text-white/45">
          (This is a lightweight demo. The full playground expands into a guided workflow.)
        </div>
      </div>
    </div>
  );
}

export function AiAssistantModal({
  open,
  onOpenChange,
  isLightMode,
  scenario,
  demoState,
  setDemoState,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  isLightMode: boolean;
  scenario: HeroScenario;
  demoState: AssistantDemoState;
  setDemoState: React.Dispatch<React.SetStateAction<AssistantDemoState>>;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9998] bg-black/55 backdrop-blur-md" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[9999] w-[min(92vw,860px)] -translate-x-1/2 -translate-y-1/2 rounded-[28px] liquid-glass p-4 md:p-6">
          <div className="flex items-center justify-between gap-4 px-2 py-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[#19ad7d]/15 border border-[#19ad7d]/25 flex items-center justify-center">
                <Sparkles size={16} className="text-[#19ad7d]" />
              </div>
              <div className="flex flex-col">
                <Dialog.Title className={`font-['Inter'] text-sm font-semibold tracking-tight ${isLightMode ? "text-black" : "text-white"}`}>
                  AI Playground
                </Dialog.Title>
                <Dialog.Description className={`font-['Inter'] text-xs tracking-tight ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                  Explore a curated workflow end-to-end.
                </Dialog.Description>
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                  isLightMode ? "border-black/10 bg-black/5 text-black/70 hover:bg-black/10" : "border-white/12 bg-white/5 text-white/80 hover:bg-white/10"
                }`}
                aria-label="Close"
              >
                ×
              </button>
            </Dialog.Close>
          </div>

          <div className="relative h-[min(70vh,640px)] mt-2 rounded-3xl overflow-hidden border border-white/10 bg-black/10">
            <HeroAssistantDemo demoState={demoState} scenario={scenario} setDemoState={setDemoState} isLightMode={isLightMode} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

