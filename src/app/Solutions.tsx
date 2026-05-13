"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useTheme } from "./components/ThemeProvider";
import { BlurReveal } from "./components/BlurReveal";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { CheckCircle2 } from "lucide-react";

type SalesMode = "field" | "virtual";

type Play = {
  title: string;
  description: string;
  steps: string[];
};

type PainItem = {
  id: string;
  label: string;
  summary: string;
  pains: string[];
  outcomes: { value: string; label: string }[];
  plays: Play[];
  placeholderImage: string;
};

type ModeContent = {
  mode: SalesMode;
  title: string;
  subhead: string;
  pains: PainItem[];
};

const MODE_CONTENT: Record<SalesMode, ModeContent> = {
  field: {
    mode: "field",
    title: "Field Sales",
    subhead: "Route-based execution, in-the-moment coaching, and visibility between visits.",
    pains: [
      {
        id: "territory",
        label: "Territory execution",
        summary: "Make the route obvious. Keep the day moving.",
        placeholderImage: "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjB0ZXJyaXRvcnklMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
        pains: [
          "Plans live in heads (or spreadsheets)",
          "Missed stops and inconsistent coverage",
          "No clean view of what actually happened",
        ],
        outcomes: [
          { value: "Clear", label: "daily route + priorities" },
          { value: "Live", label: "activity visibility" },
          { value: "Less admin", label: "after-hours logging" },
        ],
        plays: [
          {
            title: "Daily route briefing",
            description: "AI turns your data into a simple plan reps will follow.",
            steps: [
              "Pull visits, opportunities, and priorities",
              "Rank stops by revenue impact",
              "Generate a route brief + talking points",
            ],
          },
          {
            title: "Coverage gaps",
            description: "Flag missed accounts and auto-recommend next stops.",
            steps: [
              "Detect low-touch territories",
              "Suggest the next best accounts",
              "Message a plan to the rep and manager",
            ],
          },
        ],
      },
      {
        id: "coaching",
        label: "In-field coaching",
        summary: "Coach in minutes—without chasing updates.",
        placeholderImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhkYXNoYm9hcmR8ZW58MXx8fHwxNzc1Njc3NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        pains: [
          "Managers get updates late",
          "Coaching is reactive, not daily",
          "Wins and risks are missed between meetings",
        ],
        outcomes: [
          { value: "Signal", label: "what changed + why" },
          { value: "Faster", label: "coaching loops" },
          { value: "Aligned", label: "rep + manager priorities" },
        ],
        plays: [
          {
            title: "Morning manager brief",
            description: "A quick snapshot of who needs help today.",
            steps: [
              "Summarize KPI movement by rep",
              "Highlight risks and stalled deals",
              "Draft 3 coaching messages",
            ],
          },
          {
            title: "Visit follow-up autopilot",
            description: "Auto-draft follow-ups based on context.",
            steps: [
              "Detect visit completion",
              "Suggest next action + message",
              "Log outcomes automatically",
            ],
          },
        ],
      },
      {
        id: "motivation",
        label: "Momentum + incentives",
        summary: "Keep energy high across the week.",
        placeholderImage: "https://images.unsplash.com/photo-1642104744809-14b986179927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnRpdmV8ZW58MXx8fHwxNzc1Njc3NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        pains: [
          "Kickoffs fade by Wednesday",
          "Recognition is inconsistent",
          "Incentives are hard to manage",
        ],
        outcomes: [
          { value: "Weekly", label: "momentum cadence" },
          { value: "More", label: "positive behaviors" },
          { value: "Visible", label: "progress + leaderboard" },
        ],
        plays: [
          {
            title: "Weekly territory competition",
            description: "Launch a simple leaderboard tied to your KPIs.",
            steps: [
              "Pick KPI + date range",
              "Auto-create rules + rewards",
              "Publish to reps + managers",
            ],
          },
        ],
      },
    ],
  },
  virtual: {
    mode: "virtual",
    title: "Virtual Sales",
    subhead: "High-volume activity, fast follow-up, and consistent messaging across teams.",
    pains: [
      {
        id: "followup",
        label: "Speed to lead",
        summary: "Respond fast. Don’t lose winnable deals.",
        placeholderImage: "https://images.unsplash.com/photo-1591467454366-fb32b72b20e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0fGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
        pains: [
          "Leads sit too long",
          "Follow-up is inconsistent",
          "Managers can’t see the real bottleneck",
        ],
        outcomes: [
          { value: "Faster", label: "first response" },
          { value: "Clear", label: "next-best action" },
          { value: "Less admin", label: "manual routing" },
        ],
        plays: [
          {
            title: "Lead triage + routing",
            description: "Auto-prioritize, assign, and message the right rep.",
            steps: [
              "Score lead intent + fit",
              "Route to the right owner",
              "Draft first-touch message",
            ],
          },
          {
            title: "Stale lead rescue",
            description: "Revive leads before they churn out.",
            steps: [
              "Detect inactivity windows",
              "Queue a rescue sequence",
              "Notify the manager if needed",
            ],
          },
        ],
      },
      {
        id: "messaging",
        label: "Consistent messaging",
        summary: "Standardize the playbook without killing personalization.",
        placeholderImage: "https://images.unsplash.com/photo-1695144244472-a4543101ef35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFzc2lzdGFudHxlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        pains: [
          "Messaging varies rep-to-rep",
          "Objections aren’t handled consistently",
          "Updates are hard to roll out",
        ],
        outcomes: [
          { value: "Consistent", label: "playbooks + talk tracks" },
          { value: "Better", label: "conversion quality" },
          { value: "Fewer", label: "rework loops" },
        ],
        plays: [
          {
            title: "Objection handling pack",
            description: "Create short scripts reps can reuse instantly.",
            steps: [
              "Collect top objections",
              "Generate responses by persona",
              "Publish into the Library",
            ],
          },
          {
            title: "Announcement → rollout",
            description: "Ship a messaging update in minutes.",
            steps: [
              "Draft announcement",
              "Target the right groups",
              "Track adoption signals",
            ],
          },
        ],
      },
      {
        id: "visibility",
        label: "Manager visibility",
        summary: "Know what’s happening without another dashboard.",
        placeholderImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmR8ZW58MXx8fHwxNzc1Njc3NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        pains: [
          "Forecast calls feel like guesses",
          "Activity spikes don’t map to outcomes",
          "Coaching happens too late",
        ],
        outcomes: [
          { value: "Signal", label: "daily summary" },
          { value: "Live", label: "team progress" },
          { value: "Faster", label: "intervention" },
        ],
        plays: [
          {
            title: "Daily manager digest",
            description: "A short read: what changed and what to do about it.",
            steps: [
              "Summarize KPIs and trends",
              "Highlight risks + wins",
              "Recommend 3 actions",
            ],
          },
        ],
      },
    ],
  },
};

function PlaybookCard({ play, isLightMode }: { play: Play; isLightMode: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative py-5 md:py-6 border-b transition-all duration-300 ${
        isLightMode ? "border-black/10 last:border-0" : "border-white/10 last:border-0"
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className={`font-inter text-[13px] md:text-[14px] font-bold uppercase tracking-widest ${isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"}`}>
            {play.title}
          </div>
          <div className={`font-inter text-[13px] md:text-[14px] font-medium leading-relaxed max-w-sm lg:max-w-md ${isLightMode ? "text-black/70" : "text-white/70"}`}>
            {play.description}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`shrink-0 w-full md:w-auto px-4 py-2 rounded-xl border font-inter text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
            isLightMode
              ? "border-black/15 bg-transparent text-black hover:bg-black/5"
              : "border-white/15 bg-transparent text-white hover:bg-white/5"
          }`}
          aria-expanded={open}
        >
          {open ? "HIDE STEPS" : "VIEW STEPS"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-4 flex flex-col gap-3 pt-4 border-t border-black/5 dark:border-white/5">
              {play.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-3">
                  <div className={`flex items-center justify-center shrink-0 w-5 h-5 rounded-full border ${isLightMode ? "border-[#19ad7d]/30 bg-[#19ad7d]/10 text-[#19ad7d]" : "border-[#19ad7d]/30 bg-[#19ad7d]/10 text-[#19ad7d]"} font-bold text-[10px]`}>
                    {i + 1}
                  </div>
                  <span className={`font-inter text-[13px] md:text-[14px] font-medium leading-snug mt-0.5 ${isLightMode ? "text-black" : "text-white"}`}>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Solutions() {
  const { isLightMode } = useTheme();
  const [mode, setMode] = useState<SalesMode>("field");
  const content = MODE_CONTENT[mode];
  
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset index when mode (field vs virtual) changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [mode]);

  const activePain = content.pains[activeIndex];

  return (
    <section className="relative w-full min-h-[800px] bg-transparent pb-24">
      {/* Base Background */}
      <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden">
        <div className={`absolute inset-0 ${isLightMode ? 'bg-[#faf9f6]' : 'bg-[#0b0f14]'}`} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-20 lg:pt-32 flex flex-col items-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center relative z-10 shrink-0 w-full"
        >
          <div className={`px-4 py-1.5 rounded-full border backdrop-blur-sm mb-4 lg:mb-6 transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-black/5 text-black/60' : 'border-white/10 bg-white/5 text-white/60'} font-bold uppercase tracking-[0.25em] text-[10px] lg:text-[11px]`}>
            Tailored Solutions
          </div>
          <h1 className={`font-ivyora font-medium text-4xl md:text-5xl lg:text-[80px] leading-[0.95] tracking-[-2px] lg:tracking-[-2px] text-center max-w-4xl transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
            <BlurReveal as="span" delay={0.1}>Built for how</BlurReveal><br/>
            <span className={isLightMode ? "text-black/40" : "text-white/40"}>
              <BlurReveal as="span" delay={0.3}>your team sells</BlurReveal>
            </span>
          </h1>

          {/* Mode Tabs */}
          <div className="flex flex-row flex-wrap justify-center gap-6 md:gap-12 w-full max-w-5xl mx-auto mt-8 lg:mt-12">
             {[{ id: "field", label: "Field Sales" }, { id: "virtual", label: "Virtual Sales" }].map((t) => (
                <button 
                   key={t.id} 
                   onClick={() => setMode(t.id as SalesMode)}
                   className={`relative transition-all duration-300 px-2 py-1 cursor-pointer ${
                      mode === t.id 
                        ? (isLightMode ? "text-black scale-105" : "text-white scale-105") 
                        : (isLightMode ? "text-black/40 scale-100 hover:text-black/70" : "text-white/40 scale-100 hover:text-white/70")
                   }`}
                >
                   <span className="font-inter font-black uppercase text-[14px] md:text-[18px] lg:text-[20px] tracking-widest">
                     {t.label}
                   </span>
                   {mode === t.id && (
                      <motion.div 
                        layoutId="activeModeIndicator" 
                        className="absolute -bottom-2 left-0 right-0 h-[2px] md:h-[3px] bg-[#19ad7d]" 
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                   )}
                </button>
             ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-16 mt-12 lg:mt-20">
          
          {/* Left pane: Navigation / Focus Areas */}
          <div className="w-full lg:w-[35%] flex flex-col gap-4 shrink-0">
            <div className={`font-inter text-[11px] font-bold uppercase tracking-[0.25em] mb-2 pl-2 ${isLightMode ? "text-black/40" : "text-white/40"}`}>
              Select a focus area
            </div>
            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-4 lg:pb-0 snap-x snap-mandatory">
              {content.pains.map((p, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActiveIndex(i)}
                    className={`text-left px-5 py-4 lg:px-6 lg:py-5 rounded-[24px] transition-all duration-300 border snap-start shrink-0 w-[280px] lg:w-full ${
                      isActive 
                        ? (isLightMode ? "bg-white/80 border-black/10 shadow-sm backdrop-blur-md" : "bg-black/80 border-white/10 shadow-sm backdrop-blur-md") 
                        : (isLightMode ? "bg-white/20 border-transparent hover:bg-white/40" : "bg-black/20 border-transparent hover:bg-black/40")
                    }`}
                  >
                    <h3 className={`font-ivyora text-3xl lg:text-4xl tracking-tight mb-2 transition-colors ${isActive ? (isLightMode ? "text-black" : "text-white") : (isLightMode ? "text-black/60" : "text-white/60")}`}>
                      {p.label}
                    </h3>
                    <p className={`font-inter text-sm leading-snug transition-colors ${isActive ? (isLightMode ? "text-black/80" : "text-white/80") : (isLightMode ? "text-black/40" : "text-white/40")}`}>
                      {p.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right pane: Active Content */}
          <div className="w-full lg:w-[65%] flex flex-col min-h-0">
            <motion.div
              key={activePain.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-6 lg:gap-8 w-full"
            >
              {/* Problem & Outcome Row */}
                <div className={`flex flex-col sm:flex-row gap-8 lg:gap-12 w-full pb-8 border-b ${isLightMode ? "border-black/10" : "border-white/10"}`}>
                  <div className="flex-1 flex flex-col gap-4">
                    <div className={`font-inter text-[10px] font-bold uppercase tracking-[0.25em] ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                      The Problem
                    </div>
                    <ul className="flex flex-col gap-3">
                      {activePain.pains.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isLightMode ? "bg-[#19ad7d]" : "bg-[#19ad7d]"}`} />
                          <span className={`font-inter text-[14px] lg:text-[15px] font-medium leading-snug ${isLightMode ? "text-black/90" : "text-white/90"}`}>
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                    <div className={`font-inter text-[10px] font-bold uppercase tracking-[0.25em] ${isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"}`}>
                      The Outcome
                    </div>
                    <ul className="flex flex-col gap-3.5">
                      {activePain.outcomes.map((o) => (
                        <li key={o.value} className="flex items-center gap-3">
                          <CheckCircle2 size={18} strokeWidth={2.5} className={isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"} />
                          <div className={`font-inter text-[14px] lg:text-[15px] leading-snug ${isLightMode ? "text-black/90" : "text-white/90"}`}>
                            <span className="font-bold">{o.value}</span> {o.label}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Playbooks */}
                <div className="flex flex-col">
                  <div className={`font-inter text-[11px] font-bold uppercase tracking-[0.25em] mt-2 ${isLightMode ? "text-black/40" : "text-white/40"}`}>
                    Playbooks
                  </div>
                  {activePain.plays.map((play) => (
                    <PlaybookCard key={play.title} play={play} isLightMode={isLightMode} />
                  ))}
                </div>
              </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
