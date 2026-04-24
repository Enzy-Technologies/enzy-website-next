"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, Signal, Wifi, Battery } from "lucide-react";
import { createPortal } from "react-dom";
import imgInnerScreen from "@/assets/2b19803f6c5e3c26b39f607fe129d1919300df81.png";
import userScreen from "@/assets/61beea51a9bcfe1555d356d42bbc0ef63df8b0d3.png";
import { useTheme } from "./ThemeProvider";
import * as Dialog from "@radix-ui/react-dialog";
import { CTAButton } from "./CTAButton";
import { BOOK_DEMO_HREF } from "@/app/lib/booking";

/** iPhone 17 class (6.3") — logical points per Apple / iOS layout (402×874). */
const IPHONE_17_W = 402;
const IPHONE_17_H = 874;
const IPHONE_17_ASPECT = `${IPHONE_17_W} / ${IPHONE_17_H}` as const;

type AssistantPrompt = {
  id: "build-competition" | "todays-sales-stats" | "automated-event-messaging";
  label: string;
};

type AssistantFlowId = AssistantPrompt["id"];

type QuickReply = {
  id: string;
  label: string;
};

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
  quickReplies?: QuickReply[];
};

type AssistantDemoState =
  | {
      mode: "start";
      messages: ChatMessage[];
    }
  | {
      mode: "flow";
      flowId: AssistantFlowId;
      step: number;
      selections: Record<string, string>;
      messages: ChatMessage[];
    };

type HeroScenarioKey = "field" | "virtual" | "ops";

type HeroScenario = {
  key: HeroScenarioKey;
  label: string;
  /** Outcome-led line shown under the hero CTAs. */
  outcomeLine: string;
  /** AI demo's first assistant message. */
  assistantStart: string;
  /** Copy for the 3 quick-reply prompts (flow ids stay the same). */
  promptLabels: Record<AssistantFlowId, string>;
  /** Connected source labels shown in the mock UI. */
  sources: readonly { id: string; label: string; status: "connected" }[];
};

const HERO_SCENARIOS: readonly HeroScenario[] = [
  {
    key: "field",
    label: "Field sales",
    outcomeLine: "Between visits → daily plan + coaching nudges.",
    assistantStart: "What changed since yesterday, and what should reps do next?",
    promptLabels: {
      "build-competition": "Launch a rep sprint for stops + demos",
      "todays-sales-stats": "Summarize today’s field activity",
      "automated-event-messaging": "Draft a post-visit follow-up message",
    },
    sources: [
      { id: "crm", label: "Salesforce", status: "connected" },
      { id: "maps", label: "Territory/Maps", status: "connected" },
      { id: "warehouse", label: "Warehouse", status: "connected" },
      { id: "calendar", label: "Calendar", status: "connected" },
    ],
  },
  {
    key: "virtual",
    label: "Virtual sales",
    outcomeLine: "Pipeline signal → follow-ups + next steps.",
    assistantStart: "What should we do today to move pipeline forward?",
    promptLabels: {
      "build-competition": "Run a pipeline-builder sprint",
      "todays-sales-stats": "Show today’s pipeline movement",
      "automated-event-messaging": "Write a 3-touch follow-up sequence",
    },
    sources: [
      { id: "crm", label: "HubSpot/CRM", status: "connected" },
      { id: "email", label: "Email", status: "connected" },
      { id: "calendar", label: "Calendar", status: "connected" },
      { id: "warehouse", label: "Warehouse", status: "connected" },
    ],
  },
  {
    key: "ops",
    label: "Sales ops",
    outcomeLine: "What changed → actions + assets shipped.",
    assistantStart: "What changed across the team, and what actions should we trigger?",
    promptLabels: {
      "build-competition": "Generate a new incentive plan",
      "todays-sales-stats": "Summarize KPIs and deltas",
      "automated-event-messaging": "Draft a manager coaching message",
    },
    sources: [
      { id: "crm", label: "CRM", status: "connected" },
      { id: "slack", label: "Slack", status: "connected" },
      { id: "bi", label: "BI/Sheets", status: "connected" },
      { id: "warehouse", label: "Warehouse", status: "connected" },
    ],
  },
] as const;

function newId(prefix: string) {
  return `${prefix}-${Math.random().toString(16).slice(2)}`;
}

type ActionCard = {
  id: string;
  title: string;
  status: "ready" | "in_progress" | "queued";
  detail: string;
};

function downloadTextFile(filename: string, text: string) {
  try {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {
    // no-op (demo-only affordance)
  }
}

function initialDemoState(scenario: HeroScenario): AssistantDemoState {
  const prompts: AssistantPrompt[] = [
    { id: "build-competition", label: scenario.promptLabels["build-competition"] },
    { id: "todays-sales-stats", label: scenario.promptLabels["todays-sales-stats"] },
    { id: "automated-event-messaging", label: scenario.promptLabels["automated-event-messaging"] },
  ];

  return {
    mode: "start",
    messages: [
      {
        id: newId("m"),
        role: "assistant",
        text: scenario.assistantStart,
        quickReplies: prompts.map((p) => ({ id: p.id, label: p.label })),
      },
    ],
  };
}

function getActionCards(demoState: AssistantDemoState): ActionCard[] {
  if (demoState.mode === "start") {
    return [
      {
        id: "insights",
        title: "Insight summary",
        status: "queued",
        detail: "Ask a question to summarize today’s performance.",
      },
      {
        id: "actions",
        title: "Suggested actions",
        status: "queued",
        detail: "Get next-best steps, nudges, and alerts.",
      },
      {
        id: "generate",
        title: "Generated outputs",
        status: "queued",
        detail: "Competitions, incentives, messages, and assets.",
      },
    ];
  }

  const { flowId, step, selections } = demoState;

  if (flowId === "build-competition") {
    const kpi = selections.kpi ?? "revenue";
    const duration = selections.duration ?? "7";
    const mode = selections.mode ?? "individual";
    const title =
      kpi === "demos"
        ? "Demo Sprint"
        : kpi === "close_rate"
          ? "Close Rate Challenge"
          : kpi === "leads"
            ? "Pipeline Builder"
            : "Revenue Sprint";

    return [
      {
        id: "draft",
        title: "Competition draft",
        status: step >= 3 ? "ready" : "in_progress",
        detail:
          step >= 3
            ? `“${title}” · ${duration} days · ${mode === "team" ? "Teams" : "Individual"}`
            : "Selecting KPI, duration, and format…",
      },
      {
        id: "incentives",
        title: "Incentives",
        status: step >= 3 ? "ready" : "queued",
        detail: step >= 3 ? "Default: $250 · $150 · $100" : "Will recommend rewards once draft is ready.",
      },
      {
        id: "assets",
        title: "Launch assets",
        status: step >= 4 ? "ready" : "queued",
        detail: step >= 4 ? "Banners, badges, and announcement copy" : "Generate after confirmation.",
      },
    ];
  }

  if (flowId === "todays-sales-stats") {
    const crm = selections.crm ?? "salesforce";
    const scope = selections.scope ?? "company";
    return [
      {
        id: "stats",
        title: "Today’s stats",
        status: step >= 2 ? "ready" : "in_progress",
        detail:
          step >= 2
            ? `${crm === "hubspot" ? "HubSpot" : crm === "other" ? "Your CRM" : "Salesforce"} · ${
                scope === "region" ? "By region" : scope === "team" ? "By team" : "Company-wide"
              }`
            : "Choosing CRM + scope…",
      },
      {
        id: "levers",
        title: "Biggest levers",
        status: step >= 3 ? "ready" : "queued",
        detail: step >= 3 ? "Nudges, mini-competition, manager alerts" : "Unlock after the snapshot.",
      },
      {
        id: "execute",
        title: "Execute next step",
        status: step >= 3 ? "in_progress" : "queued",
        detail: step >= 3 ? "Pick: draft messages / build mini-comp / alerts" : "—",
      },
    ];
  }

  // automated-event-messaging
  const trigger = selections.trigger ?? "demo_booked";
  const channel = selections.channel ?? "slack";
  const audience = selections.audience ?? "both";
  const triggerLabel =
    trigger === "stage_proposal"
      ? "Moved to Proposal"
      : trigger === "no_activity_48h"
        ? "No activity 48h"
        : "Demo booked";

  return [
    {
      id: "automation",
      title: "Automation",
      status: step >= 3 ? "ready" : "in_progress",
      detail: step >= 3 ? `${triggerLabel} → ${channel.toUpperCase()} → ${audience}` : "Choosing trigger, channel, and recipients…",
    },
    {
      id: "copy",
      title: "Message copy",
      status: step >= 4 ? "ready" : "queued",
      detail: step >= 4 ? "AI-drafted with context + next step" : "Generate after automation draft.",
    },
    {
      id: "go_live",
      title: "Go live",
      status: step >= 4 ? "in_progress" : "queued",
      detail: step >= 4 ? "Choose tone, test, and enable" : "—",
    },
  ];
}

function flowStepPrompt(flowId: AssistantFlowId, step: number, selections: Record<string, string>) {
  if (flowId === "build-competition") {
    if (step === 0) {
      return {
        assistant: "Great. What should we optimize for?",
        quickReplies: [
          { id: "kpi:revenue", label: "Revenue ($ collected)" },
          { id: "kpi:demos", label: "Demos booked" },
          { id: "kpi:close_rate", label: "Close rate" },
          { id: "kpi:leads", label: "Leads created" },
        ],
      };
    }
    if (step === 1) {
      return {
        assistant: "Nice. How long should the sprint run?",
        quickReplies: [
          { id: "duration:3", label: "3 days" },
          { id: "duration:7", label: "7 days" },
          { id: "duration:14", label: "14 days" },
        ],
      };
    }
    if (step === 2) {
      return {
        assistant: "Should this be individual or team-based?",
        quickReplies: [
          { id: "mode:individual", label: "Individual" },
          { id: "mode:team", label: "Teams" },
        ],
      };
    }
    if (step === 3) {
      const kpi = selections.kpi ?? "revenue";
      const duration = selections.duration ?? "7";
      const mode = selections.mode ?? "individual";
      const title =
        kpi === "demos"
          ? "Demo Sprint"
          : kpi === "close_rate"
            ? "Close Rate Challenge"
            : kpi === "leads"
              ? "Pipeline Builder"
              : "Revenue Sprint";
      const scoring =
        kpi === "demos"
          ? "1 point per demo booked"
          : kpi === "close_rate"
            ? "win rate uplift vs baseline"
            : kpi === "leads"
              ? "1 point per qualified lead"
              : "$ collected";
      return {
        assistant:
          `Done. Here’s a launch-ready draft:\n\n` +
          `- Competition: “${title}” (${duration} days)\n` +
          `- Format: ${mode === "team" ? "Teams" : "Individual"}\n` +
          `- Scoring: ${scoring}\n` +
          `- Guardrails: minimum 10 opportunities touched\n` +
          `- Incentives (default): 1st $250 · 2nd $150 · 3rd $100\n\n` +
          `Want me to generate the announcement message + banner images next?`,
        quickReplies: [
          { id: "next:assets_yes", label: "Generate assets" },
          { id: "next:assets_no", label: "Skip for now" },
        ],
      };
    }
    // step 4 (assets)
    return {
      assistant:
        "Awesome — I’ll generate:\n- 3 banner image options\n- 6 achievement badges\n- A launch announcement message\n- A Slack/Teams nudge template\n\nAnything you want the theme to be (e.g., “Spring sprint”, “Beat last week”, “Team vs team”)?",
      quickReplies: [
        { id: "theme:spring", label: "Spring sprint" },
        { id: "theme:beat_last_week", label: "Beat last week" },
        { id: "theme:team_vs_team", label: "Team vs team" },
      ],
    };
  }

  if (flowId === "todays-sales-stats") {
    if (step === 0) {
      return {
        assistant: "Which system should I pull today’s stats from?",
        quickReplies: [
          { id: "crm:salesforce", label: "Salesforce" },
          { id: "crm:hubspot", label: "HubSpot" },
          { id: "crm:other", label: "Other CRM" },
        ],
      };
    }
    if (step === 1) {
      return {
        assistant: "Got it. What scope should I summarize?",
        quickReplies: [
          { id: "scope:company", label: "Company-wide" },
          { id: "scope:region", label: "By region" },
          { id: "scope:team", label: "By team" },
        ],
      };
    }
    if (step === 2) {
      const scope = selections.scope ?? "company";
      return {
        assistant:
          `Here’s today so far (${scope === "company" ? "company-wide" : scope === "region" ? "by region" : "by team"}):\n\n` +
          `- Revenue: $128,450 (64% to goal)\n` +
          `- Demos booked: 19 (+12% WoW)\n` +
          `- New opps: 31\n` +
          `- Stalled deals (48h no activity): 14\n\n` +
          `Want suggested actions for the biggest levers?`,
        quickReplies: [
          { id: "actions:yes", label: "Suggest actions" },
          { id: "actions:no", label: "Not now" },
        ],
      };
    }
    // step 3 actions
    return {
      assistant:
        "Top suggested actions:\n\n1) Nudge reps with stalled deals (48h+) — I can draft messages.\n2) Launch a 48-hour “Demo Push” mini-competition.\n3) Alert managers about 3 at-risk regions/teams.\n\nWhat should I do first?",
      quickReplies: [
        { id: "do:draft_messages", label: "Draft the messages" },
        { id: "do:mini_comp", label: "Build mini-competition" },
        { id: "do:manager_alerts", label: "Set manager alerts" },
      ],
    };
  }

  // automated-event-messaging
  if (step === 0) {
    return {
      assistant: "Which event should trigger the automation?",
      quickReplies: [
        { id: "trigger:demo_booked", label: "Demo booked" },
        { id: "trigger:stage_proposal", label: "Moved to Proposal" },
        { id: "trigger:no_activity_48h", label: "No activity in 48h" },
      ],
    };
  }
  if (step === 1) {
    return {
      assistant: "Where should I send it?",
      quickReplies: [
        { id: "channel:slack", label: "Slack" },
        { id: "channel:teams", label: "Teams" },
        { id: "channel:sms", label: "SMS" },
      ],
    };
  }
  if (step === 2) {
    return {
      assistant: "Who should receive the message?",
      quickReplies: [
        { id: "audience:rep", label: "Rep" },
        { id: "audience:manager", label: "Manager" },
        { id: "audience:both", label: "Both" },
      ],
    };
  }
  if (step === 3) {
    const trigger = selections.trigger ?? "demo_booked";
    const channel = selections.channel ?? "slack";
    const audience = selections.audience ?? "both";
    const triggerLabel =
      trigger === "stage_proposal"
        ? "Deal moved to Proposal"
        : trigger === "no_activity_48h"
          ? "No activity in 48 hours"
          : "Demo booked";
    const channelLabel = channel.toUpperCase();
    const audienceLabel = audience === "rep" ? "Rep" : audience === "manager" ? "Manager" : "Rep + Manager";
    return {
      assistant:
        `Perfect. Here’s the automation draft:\n\n` +
        `- Trigger: ${triggerLabel}\n` +
        `- Channel: ${channelLabel}\n` +
        `- Recipients: ${audienceLabel}\n` +
        `- Message: AI-drafted with deal context + next step suggestion\n\n` +
        `Want me to generate the exact message copy now?`,
      quickReplies: [
        { id: "copy:yes", label: "Generate copy" },
        { id: "copy:no", label: "Skip" },
      ],
    };
  }

  return {
    assistant:
      "Here’s a first message draft:\n\n“Quick update: I noticed {event}. Suggested next step: {action}. Reply YES to confirm, or I can adjust.”\n\nWant it more direct, more upbeat, or more formal?",
    quickReplies: [
      { id: "tone:direct", label: "Direct" },
      { id: "tone:upbeat", label: "Upbeat" },
      { id: "tone:formal", label: "Formal" },
    ],
  };
}

const HERO_LOGOS = [
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08e93f61e6330bcf4e263_foxpest.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08e5a7a4765b5ee346ab1_romexpest.webp",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08e3e811ba85123d46adc_havenhub.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68c4729a6080214d0bee190e_Untitled%20(470%20x%2090%20px)%20(1891%20x%20520%20px).png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08dd1a5b82a5a689be395_winchoice.webp",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08db50cb805e17c39d2ad_proforcepest.webp",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b8b5d68f20b871744635e9_7.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68c47343ec9289ba30088423_9.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68c4734c773169b356937966_11.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68c472777c2a9c63fb5117a6_3.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68c47282ae2e931a5229466f_4.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b8b5fdb6107f11480c8c4d_5.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08111c2e6d5f9674443ae_yllogo.svg",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/669b2b066df43231dc8bdd59_new-logo-web.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/669b2acf64ca930d24f7eab4_logo.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66e3824f31bafe55e898a2dc_11.webp",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66d09af7f06506e2753f9c86_347453294_946834439851674_7275672262835633761_n%20copy.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66870fdbd686e745128cc8ce_flo-energy-white.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/669b2dcc7e37592ea4753ace_Moxie-Pest-Control-Logo-Transparent.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66871064558fde06d1c61393_siegfried-jensen.svg",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66871073eae768d7c043fe60_Official-Horizontal.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/6687114aa00a5ffa6b3bec96_1661955499668-removebg-preview.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/668710822d3fe7df4093cc48_greenixpccom_886359809.svg",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66e3811e8298a733522c48b3_GR_socialimage%20copy.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/6696fd7217fea3ef6ec9c7e3_Aptive%20Logo%202021%201.avif"
];

const SUMMARIES = [
  "Boosted sales by 40%",
  "Saved 20 hours a week",
  "Increased ROI by 150%",
  "Streamlined operations",
  "Enhanced team productivity",
  "Scaled revenue 3x",
  "Optimized workflows",
  "Cut costs by 25%",
  "Drove 50% more leads",
  "Improved conversion rates"
];

const HERO_LOGOS_WITH_SUMMARY = HERO_LOGOS.map((url, i) => ({
  url,
  summary: SUMMARIES[i % SUMMARIES.length]
}));

export function HeroSection() {
  const { isLightMode } = useTheme();
  const [scenarioKey, setScenarioKey] = useState<HeroScenarioKey>("field");
  const scenario = HERO_SCENARIOS.find((s) => s.key === scenarioKey) ?? HERO_SCENARIOS[0];
  const [isHovered, setIsHovered] = useState(false);
  const [isPhoneExpanded, setIsPhoneExpanded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [demoState, setDemoState] = useState<AssistantDemoState>(() => initialDemoState(scenario));
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPrefersReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    // When the user chooses a scenario, retarget the AI demo to feel purpose-built.
    setDemoState(initialDemoState(scenario));
    // Close any expanded views so the user sees the refreshed prompts.
    setIsAiModalOpen(false);
    setIsPhoneExpanded(false);
  }, [scenarioKey]);

  const scrollToExplore = () => {
    document.getElementById("hero-explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      window.setTimeout(() => setIsPhoneExpanded(true), 450);
    }
  };

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

  const phoneOverlay =
    hasMounted && isPhoneExpanded
      ? createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-[9999] md:hidden pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPhoneExpanded(false)}
            >
              <div className="absolute inset-0 bg-black/55 backdrop-blur-md" />

              <div className="absolute top-4 right-4 z-20">
                <CloseButton onClick={() => setIsPhoneExpanded(false)} />
              </div>

              {/* Fits any screen: height-first so short phones & notches stay inside the viewport */}
              <div
                className="absolute inset-0 box-border flex items-center justify-center px-2"
              >
                <motion.div
                  className="relative w-auto max-w-[100%] max-h-full min-h-0"
                  style={{
                    aspectRatio: IPHONE_17_ASPECT,
                    // Use width-first sizing but cap by viewport height (no safe-area math; avoids iOS quirks).
                    width:
                      "min(92vw, 460px, calc((100svh - 8rem) * 402 / 874))",
                    height: "auto",
                  }}
                  initial={{ scale: 0.98, opacity: 0.96 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.98, opacity: 0.96 }}
                  transition={{ type: "spring", stiffness: 280, damping: 32 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0 min-h-0">
                    <HeroPhoneFrame isLightMode={isLightMode} productLabel="iPhone 17">
                      <HeroPhoneScreenContent
                        key={scenarioKey}
                        demoState={demoState}
                        scenario={scenario}
                        setDemoState={setDemoState}
                      />
                    </HeroPhoneFrame>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <>
      <section className="relative flex flex-col items-center w-full px-4 pt-8 md:pt-16 lg:pt-24 max-w-7xl mx-auto pointer-events-none">
        {/* Header Content */}
        <div className="flex flex-col items-center w-full gap-6 md:gap-10">
        <h1 className={`font-['IvyOra_Text'] font-medium leading-[1.05] tracking-[-2px] text-center pointer-events-auto max-w-[1200px] mx-auto ${isLightMode ? 'text-brand-dark' : 'text-brand-light'} text-[40px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] px-[16px] py-[0px] mx-[4px] my-[0px]`}>
          Your AI operating system<br />
          for high-performance<br />
          sales teams
        </h1>

        <p className={`font-['Inter'] tracking-[-0.03em] text-center pointer-events-auto max-w-2xl mx-auto px-4 ${isLightMode ? "text-black/75" : "text-white/60"} text-[17px] sm:text-[18px] md:text-[19px] leading-relaxed`}>
          Connect your data. Get insights. Take action — fast.
        </p>

        {/* Demo-first: primary = Enzy green (Specs), secondary = outline */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-lg sm:max-w-none pointer-events-auto px-4 mt-2">
          <CTAButton
            href={BOOK_DEMO_HREF}
            variant="primary"
            className="w-full sm:w-auto justify-center rounded-[22px] px-10 sm:px-12 py-4 sm:py-[18px] gap-2.5 font-semibold tracking-tight text-[16px] sm:text-[17px] hover:scale-[1.02] hover:!opacity-100 shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
          >
            Book a demo <ArrowRight size={18} strokeWidth={2.25} aria-hidden />
          </CTAButton>
          <CTAButton
            type="button"
            variant="secondary"
            onClick={scrollToExplore}
            className="w-full sm:w-auto justify-center rounded-[22px] px-10 sm:px-12 py-4 sm:py-[18px] font-semibold text-[16px] sm:text-[17px] tracking-tight"
          >
            Try {scenario.label} scenario
          </CTAButton>
        </div>

        {/* Brands Partnerships Section (directly under CTAs) */}
        <div className="w-full mt-5 mb-2 md:mt-7 md:mb-6 z-20 flex flex-col items-center pointer-events-auto">
          {prefersReducedMotion ? (
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-12 py-8 px-2 max-w-5xl">
              {HERO_LOGOS_WITH_SUMMARY.slice(0, 10).map((logo, i) => (
                <LogoItem
                  key={`static-${i}`}
                  logo={logo}
                  index={i}
                  isLightMode={isLightMode}
                  row={i % 2 === 0 ? "top" : "bottom"}
                />
              ))}
            </div>
          ) : (
            <div
              className="w-full max-w-[100vw] overflow-hidden relative px-[0px] py-[10px]"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              }}
            >
              <motion.div
                className="flex items-center whitespace-nowrap min-w-max py-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 100 }}
              >
                {[...HERO_LOGOS_WITH_SUMMARY, ...HERO_LOGOS_WITH_SUMMARY].map((logo, i) => (
                  <LogoItem
                    key={`row-${i}`}
                    logo={logo}
                    index={i}
                    isLightMode={isLightMode}
                    row={i % 2 === 0 ? "top" : "bottom"}
                  />
                ))}
              </motion.div>
            </div>
          )}
        </div>

        <p
          className={`mt-2 font-['Inter'] text-center text-[13px] md:text-[14px] max-w-2xl px-4 ${
            isLightMode ? "text-black/45" : "text-white/45"
          }`}
        >
          Connects to your CRM + comms stack. Live in 1–2 weeks for most teams.
        </p>

        {/* Guided choice (Redo-style): pick a scenario, then explore the AI with relevant prompts */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 pointer-events-auto px-4">
          {HERO_SCENARIOS.map((s) => {
            const active = s.key === scenarioKey;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setScenarioKey(s.key)}
                className={`rounded-full px-4 py-2 text-[13px] md:text-[14px] font-['Inter'] font-semibold tracking-tight transition-colors border backdrop-blur-md ${
                  active
                    ? "border-[#19ad7d]/35 bg-[#19ad7d]/15 text-[#19ad7d]"
                    : isLightMode
                      ? "border-black/10 bg-white/70 text-black/65 hover:text-black hover:border-black/20"
                      : "border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-white/20"
                }`}
                aria-pressed={active}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        
        {/* Master feature copy (single concept: AI Playground) */}
        <div className="flex w-full max-w-3xl flex-col gap-1.5 z-30 pointer-events-auto px-4">
          <p className={`text-center font-['Inter'] text-[14px] md:text-[15px] font-medium tracking-tight ${isLightMode ? "text-black/60" : "text-white/65"}`}>
            {scenario.outcomeLine}
          </p>
          <p className={`text-center text-[12px] md:text-[13px] font-['Inter'] leading-snug ${isLightMode ? "text-black/45" : "text-white/50"}`}>
            Tap a prompt to explore. Use Expand for the full workflow.
          </p>
        </div>

        {/* Device Mockup - Responsive */}
        <motion.div
          id="hero-explore"
          initial={{ opacity: 0, y: 50, zIndex: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            zIndex: isHovered ? 50 : 10 
          }}
          transition={{ 
            delay: 0.4, 
            duration: 1,
            zIndex: { delay: isHovered ? 0 : 0.6 }
          }}
          className="relative w-full transition-all duration-300 pointer-events-auto m-[0px] scroll-mt-24 md:scroll-mt-28"
          onMouseEnter={() => { if (window.innerWidth > 768) setIsHovered(true); }}
          onMouseLeave={() => { if (window.innerWidth > 768) setIsHovered(false); }}
        >
          {/* Desktop/Tablet - iPad */}
          <motion.div
            animate={{
              y: isHovered ? -300 : 0,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mx-auto hidden md:block cursor-pointer"
            style={{
              width: 'min(90vw, 900px)',
              aspectRatio: '907 / 644',
            }}
            onClick={() => setIsHovered(!isHovered)}
          >
            {/* iPad Frame */}
            <div
              className={`relative w-full h-full rounded-[24px] lg:rounded-[32px] border-2 lg:border-[3px] border-solid overflow-hidden group/screen ${isLightMode ? 'border-black/20 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]' : 'border-white/50 bg-black'}`}
              style={{ 
                boxShadow: isHovered 
                  ? (isLightMode ? '0px -8px 40px 0px rgba(0, 0, 0, 0.1), 0px 0px 60px 0px rgba(25, 173, 125, 0.15)' : '0px -8px 40px 0px rgba(0, 0, 0, 0.3), 0px 0px 60px 0px rgba(25, 173, 125, 0.2)')
                  : (isLightMode ? '0px -4px 20px 0px rgba(0, 0, 0, 0.05)' : '0px -4px 20px 0px rgba(0, 0, 0, 0.2)'),
                transition: 'box-shadow 0.4s ease-out'
              }}
            >
              {/* Inner Screen */}
              <div className={`absolute left-1/2 top-[16px] lg:top-[20px] -translate-x-1/2 w-[95%] h-[92%] rounded-[16px] lg:rounded-[20px] overflow-hidden ${isLightMode ? 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05)]' : 'bg-black'}`}>
                <div className="absolute inset-0">
                  <img
                    src={userScreen.src}
                    alt=""
                    className="h-full w-full object-cover opacity-40"
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/70" aria-hidden />
                </div>

                <div className="relative h-full w-full">
                  <div className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-white/90 backdrop-blur-md">
                    <Sparkles size={14} className="text-[#19ad7d]" />
                    <span className="font-['Inter'] text-[11px] font-medium tracking-tight">AI Playground</span>
                  </div>

                  <div className="absolute right-4 top-4 z-20">
                    <CTAButton
                      variant="primary"
                      type="button"
                      className="!px-3 !py-2 !text-[12px]"
                      onClick={(e: any) => {
                        e?.stopPropagation?.();
                        setDemoState((s) => (s.mode === "start" ? s : s));
                        setIsAiModalOpen(true);
                      }}
                    >
                      Expand
                    </CTAButton>
                  </div>

                  <div className="absolute left-4 right-4 top-14 z-20 flex flex-wrap gap-2">
                    {scenario.sources.map((s) => (
                      <div
                        key={s.id}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#19ad7d]" />
                        <span className="font-['Inter'] text-[10px] tracking-tight text-white/80">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-x-4 bottom-4 top-[92px] z-10 overflow-hidden rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md">
                    <HeroAssistantDemo
                      demoState={demoState}
                      scenario={scenario}
                      isLightMode={false}
                      setDemoState={setDemoState}
                      showActionPanel
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile - Phone */}
          <AnimatePresence initial={false}>
            {!isPhoneExpanded ? (
              <motion.div
                animate={{
                  y: isHovered ? -150 : 10,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative mx-auto mb-8 w-[min(88vw,402px)] cursor-pointer md:hidden"
                style={{ aspectRatio: IPHONE_17_ASPECT }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPhoneExpanded(true);
                }}
              >
                <div
                  className="absolute inset-0 min-h-0 transition-[filter] duration-300"
                  style={{
                    filter: isHovered
                      ? "drop-shadow(0 -12px 36px rgba(25, 173, 125, 0.22))"
                      : "none",
                  }}
                >
                  <HeroPhoneFrame isLightMode={isLightMode} productLabel="iPhone 17">
                    <HeroPhoneScreenContent
                      key={scenarioKey}
                      demoState={demoState}
                      scenario={scenario}
                      setDemoState={setDemoState}
                    />
                  </HeroPhoneFrame>
                </div>
              </motion.div>
            ) : (
              <div
                className="relative mx-auto mb-8 md:hidden"
                style={{ width: "min(88vw, 402px)", aspectRatio: IPHONE_17_ASPECT }}
                aria-hidden
              />
            )}
          </AnimatePresence>
        </motion.div>

        </div>
      </section>
      <AiAssistantModal
        open={isAiModalOpen}
        onOpenChange={setIsAiModalOpen}
        isLightMode={isLightMode}
        scenario={scenario}
        demoState={demoState}
        setDemoState={setDemoState}
      />
      {phoneOverlay}
    </>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="pointer-events-auto inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 hover:bg-black/70 active:bg-black/80 transition-colors"
      aria-label="Close"
    >
      <span className="text-[20px] leading-none select-none">×</span>
    </button>
  );
}

/**
 * iPhone 17–class hardware chrome: titanium-style rail, Dynamic Island, thin bezels,
 * camera-control ridge hint, home indicator. Proportions follow 402×874 pt.
 */
function HeroPhoneFrame({
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
      {/* Side volume / Camera Control ridge (iPhone 16/17 family) */}
      <div
        className="pointer-events-none absolute left-0 top-[22%] z-0 h-16 w-[3px] -translate-x-[1px] rounded-full bg-gradient-to-b from-white/35 via-white/12 to-white/5 shadow-[2px_0_6px_rgba(0,0,0,0.35)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-0 top-[38%] z-0 h-10 w-[3px] -translate-x-[1px] rounded-full bg-gradient-to-b from-white/30 via-white/10 to-white/5 shadow-[2px_0_6px_rgba(0,0,0,0.3)]"
        aria-hidden
      />

      <div className="relative h-full w-full overflow-hidden rounded-[45px] bg-[#0a0a0a] ring-1 ring-inset ring-white/[0.16]">
        <div
          className="pointer-events-none absolute inset-0 rounded-[45px] bg-[radial-gradient(120%_85%_at_50%_-25%,rgba(255,255,255,0.14),transparent_58%)]"
          aria-hidden
        />

        {/* Status row + Dynamic Island */}
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

function HeroPhoneScreenContent({
  demoState,
  scenario,
  setDemoState,
}: {
  demoState: AssistantDemoState;
  scenario: HeroScenario;
  setDemoState: React.Dispatch<React.SetStateAction<AssistantDemoState>>;
}) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        <img
          src={imgInnerScreen.src}
          alt=""
          className="h-full w-full object-cover opacity-55"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/70" aria-hidden />
      </div>

      <div className="absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-white/90 backdrop-blur-md">
        <Sparkles size={13} className="text-[#19ad7d]" />
        <span className="font-['Inter'] text-[10px] font-medium tracking-tight">AI Playground</span>
      </div>

      <div className="absolute inset-x-3 bottom-3 top-12 z-10 overflow-hidden rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md">
        <HeroAssistantDemo demoState={demoState} scenario={scenario} isLightMode={false} setDemoState={setDemoState} />
      </div>
    </div>
  );
}

function HeroAssistantDemo({
  demoState,
  scenario,
  isLightMode,
  setDemoState,
  showActionPanel = false,
  variant = "full",
}: {
  demoState: AssistantDemoState;
  scenario: HeroScenario;
  isLightMode: boolean;
  setDemoState: React.Dispatch<React.SetStateAction<AssistantDemoState>>;
  showActionPanel?: boolean;
  variant?: "full" | "phone";
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const onQuickReply = (qr: QuickReply) => {
    setDemoState((prev) => {
      // Start a new flow
      if (prev.mode === "start") {
        const flowId = qr.id as AssistantFlowId;
        const step0 = flowStepPrompt(flowId, 0, {});
        return {
          mode: "flow",
          flowId,
          step: 0,
          selections: {},
          messages: [
            ...prev.messages.map((m) => ({ ...m, quickReplies: undefined })), // lock the initial choices once selected
            { id: newId("m"), role: "user", text: scenario.promptLabels[flowId] ?? qr.label },
            {
              id: newId("m"),
              role: "assistant",
              text: step0.assistant,
              quickReplies: step0.quickReplies,
            },
          ],
        };
      }

      // Flow mode
      if (prev.mode === "flow") {
        // global actions
        if (qr.id === "action:start_over") return initialDemoState(scenario);

        const [key, raw] = qr.id.split(":");
        const nextSelections =
          raw && key
            ? {
                ...prev.selections,
                [key]: raw,
              }
            : { ...prev.selections };

        const nextStep = prev.step + 1;
        const prompt = flowStepPrompt(prev.flowId, nextStep, nextSelections);

        return {
          ...prev,
          step: nextStep,
          selections: nextSelections,
          messages: [
            ...prev.messages.map((m) => ({ ...m, quickReplies: undefined })), // lock previous options
            { id: newId("m"), role: "user", text: qr.label },
            {
              id: newId("m"),
              role: "assistant",
              text: prompt.assistant,
              quickReplies: [
                ...(prompt.quickReplies ?? []),
                { id: "action:start_over", label: "Start over" },
              ],
            },
          ],
        };
      }

      return prev;
    });
  };

  useEffect(() => {
    if (!copiedId) return;
    const t = window.setTimeout(() => setCopiedId(null), 1100);
    return () => window.clearTimeout(t);
  }, [copiedId]);

  const copyCard = async (c: ActionCard) => {
    const text = `${c.title}\n${c.detail}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(c.id);
    } catch {
      // fallback: select-copy isn’t worth it for this demo
    }
  };

  const isPhone = variant === "phone";
  const messages = isPhone ? demoState.messages.slice(-5) : demoState.messages;

  return (
    <div className="absolute inset-0">
      {/* subtle “app” background (phone shell already supplies a background) */}
      {!isPhone ? (
        <div className="absolute inset-0">
          <img
            src={imgInnerScreen.src}
            alt=""
            className="h-full w-full object-cover opacity-55"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/60" aria-hidden />
        </div>
      ) : null}

      <div className={`relative h-full w-full ${isPhone ? "p-3" : "p-4 md:p-6"}`}>
        {isPhone ? (
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-white/90 backdrop-blur-md">
              <Sparkles size={13} className="text-[#19ad7d]" />
              <span className="font-['Inter'] text-[10px] font-medium tracking-tight">Enzy AI</span>
            </div>
            <div className="font-['Inter'] text-[10px] font-semibold tracking-tight text-white/55">{scenario.label}</div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-white/90 backdrop-blur-md">
              <Sparkles size={14} className="text-[#19ad7d]" />
              <span className="font-['Inter'] text-[11px] font-medium tracking-tight">AI Assistant</span>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-white/75 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#19ad7d]" />
              <span className="font-['Inter'] text-[10px] tracking-tight">Connected data</span>
            </div>
          </div>
        )}

        <div className={`${isPhone ? "mt-2 h-[calc(100%-2.25rem)]" : "mt-4 flex h-[calc(100%-3.25rem)] gap-4"}`}>
          {/* Chat */}
          <div className={`${isPhone ? "h-full" : `min-w-0 flex-1 ${showActionPanel ? "md:flex-[1.6]" : ""}`}`}>
            <div className="h-full overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className={`flex flex-col ${isPhone ? "gap-2.5 pb-3" : "gap-3 pb-4"}`}>
                {messages.map((m) => {
                  const isUser = m.role === "user";
                  const bubbleBase =
                    `max-w-[92%] rounded-2xl ${isPhone ? "px-3 py-2.5" : "px-3.5 py-3"} text-left backdrop-blur-md`;
                  const bubbleClass = isUser
                    ? "ml-auto bg-[#19ad7d] text-white shadow-[0_10px_30px_rgba(25,173,125,0.22)]"
                    : "border border-white/10 bg-white/10 text-white/90";

                  return (
                    <div key={m.id} className={`${bubbleBase} ${bubbleClass}`}>
                      <div className={`font-['Inter'] ${isPhone ? "text-[11px] leading-snug" : "text-[12px] leading-relaxed"} tracking-tight whitespace-pre-line`}>
                        {m.text}
                      </div>

                      {m.quickReplies && m.quickReplies.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {m.quickReplies.map((qr) => (
                            <button
                              key={qr.id}
                              type="button"
                              onClick={() => onQuickReply(qr)}
                              className={`pointer-events-auto rounded-full border border-white/12 bg-black/25 px-3 py-1.5 text-left font-['Inter'] ${isPhone ? "text-[10px]" : "text-[11px]"} tracking-tight text-white/85 transition-colors hover:bg-black/35 active:bg-[#19ad7d]/80`}
                            >
                              {qr.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Panel */}
          {showActionPanel && !isPhone && (
            <div className="hidden md:flex w-[280px] lg:w-[320px] shrink-0 flex-col gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/25 p-3 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="font-['Inter'] text-[12px] font-semibold tracking-tight text-white/90">
                    Outputs
                  </div>
                  <button
                    type="button"
                    onClick={() => setDemoState(initialDemoState(scenario))}
                    className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 font-['Inter'] text-[10px] tracking-tight text-white/75 hover:bg-black/30 active:bg-black/40"
                  >
                    Reset
                  </button>
                </div>
                <div className="mt-2 space-y-2">
                  {getActionCards(demoState).map((c) => (
                    <motion.div
                      key={`${c.id}-${c.status}`}
                      initial={
                        c.status === "ready"
                          ? { opacity: 0, y: 6, boxShadow: "0 0 0 rgba(25,173,125,0)" }
                          : { opacity: 1, y: 0 }
                      }
                      animate={
                        c.status === "ready"
                          ? {
                              opacity: 1,
                              y: 0,
                              boxShadow: "0 0 0 rgba(25,173,125,0)",
                            }
                          : { opacity: 1, y: 0 }
                      }
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`rounded-2xl border p-3 ${
                        c.status === "ready"
                          ? "border-[#19ad7d]/30 bg-[#19ad7d]/[0.08]"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            c.status === "ready"
                              ? "bg-[#19ad7d]"
                              : c.status === "in_progress"
                                ? "bg-[#19ad7d]/60"
                                : "bg-white/25"
                          }`}
                        />
                        <div className="font-['Inter'] text-[11px] font-semibold tracking-tight text-white/90">
                          {c.title}
                        </div>
                        {c.status === "ready" && (
                          <span className="ml-auto rounded-full border border-white/10 bg-black/20 px-2 py-0.5 font-['Inter'] text-[10px] tracking-tight text-white/70">
                            Ready
                          </span>
                        )}
                      </div>
                      <div className="mt-1 font-['Inter'] text-[11px] leading-snug tracking-tight text-white/70">
                        {c.detail}
                      </div>

                      {c.status === "ready" && (
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => copyCard(c)}
                            className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 font-['Inter'] text-[10px] tracking-tight text-white/80 hover:bg-black/35 active:bg-black/45"
                          >
                            {copiedId === c.id ? "Copied" : "Copy"}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              downloadTextFile(
                                `${c.id}.txt`,
                                `${c.title}\n\n${c.detail}\n\n(Generated in Enzy AI Playground demo)`
                              )
                            }
                            className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 font-['Inter'] text-[10px] tracking-tight text-white/80 hover:bg-black/35 active:bg-black/45"
                          >
                            Download
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-3 backdrop-blur-md">
                <div className="font-['Inter'] text-[11px] font-semibold tracking-tight text-white/90">
                  Why it converts
                </div>
                <div className="mt-1 font-['Inter'] text-[11px] leading-snug tracking-tight text-white/70">
                  Users can see tangible artifacts appear — not just chat. The panel updates as the AI drafts real work.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AiAssistantModal({
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
        <Dialog.Content
          className={`fixed left-1/2 top-1/2 z-[9999] w-[min(94vw,860px)] -translate-x-1/2 -translate-y-1/2 rounded-[28px] border shadow-[0_30px_120px_rgba(0,0,0,0.55)] outline-none ${
            isLightMode ? "bg-[#0b0f14] border-white/10" : "bg-[#0b0f14] border-white/10"
          }`}
        >
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#19ad7d]/15 ring-1 ring-inset ring-[#19ad7d]/35">
                <Sparkles size={16} className="text-[#19ad7d]" />
              </span>
              <div className="flex flex-col">
                <Dialog.Title className="font-['Inter'] text-sm font-semibold tracking-tight text-white">
                  Meet your new AI Assistant
                </Dialog.Title>
                <Dialog.Description className="font-['Inter'] text-xs tracking-tight text-white/60">
                  Pick prompts and continue the workflow end-to-end.
                </Dialog.Description>
              </div>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/80 transition-colors hover:bg-white/10 active:bg-white/15"
                aria-label="Close"
              >
                ×
              </button>
            </Dialog.Close>
          </div>

          <div className="relative h-[min(72vh,640px)]">
            <HeroAssistantDemo
              demoState={demoState}
              scenario={scenario}
              isLightMode={false}
              setDemoState={setDemoState}
              showActionPanel
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function LogoItem({ logo, index, isLightMode, row }: { logo: { url: string, summary: string }, index: number, isLightMode: boolean, row: 'top' | 'bottom' }) {
  return (
    <div className="relative flex flex-col items-center justify-center mr-16 md:mr-32">
      <div
        className={`absolute ${row === 'top' ? '-top-9' : '-bottom-9'} px-3.5 py-1.5 rounded-full text-[11px] md:text-[12px] font-['Inter'] font-semibold tracking-tight whitespace-nowrap z-10 border backdrop-blur-md pointer-events-none
          ${isLightMode ? 'bg-white/90 text-[#0b0f14] border-black/10 shadow-[0_8px_22px_rgba(0,0,0,0.08)]' : 'bg-black/60 text-white/95 border-white/10 shadow-[0_10px_28px_rgba(0,0,0,0.45)]'}
        `}
      >
        <span className="text-[#19ad7d]">•</span>{" "}
        <span className="text-inherit">{logo.summary}</span>
      </div>
      <div
        className={`marquee-logo-item relative flex items-center justify-center opacity-80 ${isLightMode ? 'brightness-0' : 'brightness-0 invert'} hover:!opacity-100 transition-opacity duration-200`}
      >
        <img
          src={logo.url}
          alt={`Partner Logo ${index}`}
          className="max-h-6 md:max-h-10 w-auto object-contain pointer-events-none"
          loading="lazy"
        />
      </div>
    </div>
  );
}