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

function ModeToggle({
  value,
  onChange,
  isLightMode,
}: {
  value: SalesMode;
  onChange: (v: SalesMode) => void;
  isLightMode: boolean;
}) {
  return (
    <div
      className={`w-full max-w-[520px] rounded-2xl p-1.5 border ${
        isLightMode ? "border-black/10 bg-[#f5f7fa]" : "border-white/10 bg-[#0a0a0c]"
      }`}
      role="tablist"
    >
      <div className="grid grid-cols-2 gap-2">
        {[{ id: "field" as const, label: "Field Sales" }, { id: "virtual" as const, label: "Virtual Sales" }].map((t) => {
          const active = value === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={`relative rounded-xl px-4 py-3 md:py-4 text-[14px] md:text-[16px] font-inter font-bold uppercase tracking-widest transition-all duration-300 ${
                active
                  ? isLightMode
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-black shadow-md"
                  : isLightMode
                    ? "text-black/60 hover:text-black hover:bg-black/5"
                    : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
              role="tab"
              aria-selected={active}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PlaybookCard({ play, isLightMode }: { play: Play; isLightMode: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative rounded-[24px] p-6 md:p-8 border transition-all duration-300 ${
        isLightMode ? "border-black/10 hover:border-black/30 bg-white" : "border-white/10 hover:border-white/30 bg-black"
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className={`font-inter text-[14px] md:text-[16px] font-bold uppercase tracking-widest ${isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"}`}>
            {play.title}
          </div>
          <div className={`font-inter text-[14px] md:text-[15px] font-medium leading-relaxed max-w-sm lg:max-w-md ${isLightMode ? "text-black/70" : "text-white/70"}`}>
            {play.description}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`shrink-0 w-full md:w-auto px-5 py-2.5 rounded-xl border font-inter text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${
            isLightMode
              ? "border-black/15 bg-[#f5f7fa] text-black hover:bg-black hover:text-white"
              : "border-white/15 bg-[#0a0a0c] text-white hover:bg-white hover:text-black"
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
            <ul className="mt-6 flex flex-col gap-4 pt-6 border-t border-black/5 dark:border-white/5">
              {play.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-4">
                  <div className={`flex items-center justify-center shrink-0 w-6 h-6 rounded-full border ${isLightMode ? "border-[#19ad7d]/30 bg-[#19ad7d]/10 text-[#19ad7d]" : "border-[#19ad7d]/30 bg-[#19ad7d]/10 text-[#19ad7d]"} font-bold text-[11px]`}>
                    {i + 1}
                  </div>
                  <span className={`font-inter text-[14px] md:text-[15px] font-medium leading-snug mt-0.5 ${isLightMode ? "text-black" : "text-white"}`}>
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

function SolutionWord({ index, activeIndex, title, isLightMode, onClick }: { index: number, activeIndex: number, title: string, isLightMode: boolean, onClick: () => void }) {
  const distance = Math.abs(activeIndex - index);
  
  // Replicating the Grit effect:
  // Active is fully opaque. Neighbors are progressively more transparent and blurred.
  const opacity = distance === 0 ? 1 : distance === 1 ? 0.4 : distance === 2 ? 0.15 : 0;
  const filter = distance === 0 ? "blur(0px)" : distance === 1 ? "blur(4px)" : distance === 2 ? "blur(8px)" : "blur(12px)";
  
  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center origin-center cursor-pointer"
      onClick={onClick}
      style={{
        height: ITEM_HEIGHT,
      }}
      initial={false}
      animate={{
        opacity,
        filter,
        scale: distance === 0 ? 1 : 0.95,
        zIndex: distance === 0 ? 10 : 0
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative inline-flex flex-col items-center justify-center w-full px-4 hover:opacity-80 transition-opacity">
        <h2 className={`relative z-10 font-ivyora font-medium text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] leading-[0.95] tracking-[-2px] text-center w-full transition-colors duration-300 ${isLightMode ? 'text-black' : 'text-white'}`}>
          {title}
        </h2>
      </div>
    </motion.div>
  );
}

const ITEM_HEIGHT = 90; // Tighter stacking

function SolutionsBrowser({ content, isLightMode }: { content: ModeContent, isLightMode: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const TOTAL_ITEMS = content.pains.length;
  const floatIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_ITEMS - 1]);

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(floatIndex, "change", (latest) => {
    const idx = Math.round(latest);
    if (idx !== activeIndex && idx >= 0 && idx < TOTAL_ITEMS) {
      setActiveIndex(idx);
    }
  });

  // Reset index when mode (field vs virtual) changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [content.mode]);

  const activePain = content.pains[activeIndex];

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-transparent">
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col pt-[env(safe-area-inset-top,0px)] overflow-hidden">
        
        {/* Full Edge-to-Edge Image Background layer for Active Pain */}
        <div className="absolute inset-0 w-full h-full -z-20 bg-[#0a0a0c]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePain.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <ImageWithFallback 
                src={activePain.placeholderImage} 
                alt={activePain.label} 
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity" 
              />
              <div className={`absolute inset-0 ${isLightMode ? 'bg-gradient-to-b from-[#faf9f6]/90 via-[#faf9f6]/80 to-[#faf9f6]/95' : 'bg-gradient-to-b from-[#0b0f14]/90 via-[#0b0f14]/80 to-[#0b0f14]/95'}`} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Row of Tabs at Top */}
        <div className="relative z-20 w-full px-4 pt-20 md:pt-28 pb-4 shrink-0 flex flex-col items-center">
          <div className="flex flex-row flex-wrap justify-center gap-4 md:gap-12 w-full max-w-5xl mx-auto">
             {content.pains.map((p, i) => (
                <div 
                   key={p.id} 
                   className={`relative transition-all duration-300 px-2 py-1 ${
                      activeIndex === i 
                        ? (isLightMode ? "text-black scale-105" : "text-white scale-105") 
                        : (isLightMode ? "text-black/40 scale-100" : "text-white/40 scale-100")
                   }`}
                >
                   <span className="font-inter font-black uppercase text-[13px] md:text-[18px] lg:text-[20px] tracking-widest">
                     {p.label}
                   </span>
                   {/* Green underline for active */}
                   {activeIndex === i && (
                      <motion.div 
                        layoutId="activeTabIndicator" 
                        className="absolute -bottom-2 left-0 right-0 h-[2px] md:h-[3px] bg-[#19ad7d]" 
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                   )}
                </div>
             ))}
          </div>
        </div>

        {/* Active Content Pane - Positioned Below Tabs */}
        <div className="w-full flex-1 max-w-5xl mx-auto relative flex flex-col justify-start md:justify-center min-h-0 z-10 px-4 pb-8 pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePain.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col gap-6 lg:gap-8 w-full h-full"
            >
              {/* Summary */}
              <div className="text-center max-w-3xl mx-auto px-4 shrink-0">
                <p className={`font-inter text-[18px] md:text-[28px] font-medium leading-snug drop-shadow-sm ${isLightMode ? "text-black" : "text-white"}`}>
                  {activePain.summary}
                </p>
              </div>

              {/* Data & Playbooks Grid */}
              <div className="w-full flex flex-col lg:flex-row gap-6 mt-2 shrink-0">
                
                {/* Left: Problem / Outcome */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className={`p-5 rounded-[24px] border backdrop-blur-xl ${isLightMode ? "bg-white/40 border-black/10" : "bg-black/40 border-white/10"}`}>
                    <div className={`font-inter text-[10px] font-bold uppercase tracking-[0.25em] mb-4 ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                      The Problem
                    </div>
                    <ul className="flex flex-col gap-3">
                      {activePain.pains.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isLightMode ? "bg-[#19ad7d]" : "bg-[#19ad7d]"}`} />
                          <span className={`font-inter text-[13px] md:text-[15px] font-medium leading-snug ${isLightMode ? "text-black/90" : "text-white/90"}`}>
                            {p}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`p-5 rounded-[24px] border backdrop-blur-xl ${isLightMode ? "bg-white/60 border-[#19ad7d]/20" : "bg-black/60 border-[#19ad7d]/20"}`}>
                    <div className={`font-inter text-[10px] font-bold uppercase tracking-[0.25em] mb-4 ${isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"}`}>
                      The Outcome
                    </div>
                    <ul className="flex flex-col gap-4">
                      {activePain.outcomes.map((o) => (
                        <li key={o.value} className="flex items-center gap-3">
                          <CheckCircle2 size={18} strokeWidth={2.5} className={isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"} />
                          <div className={`font-inter text-[13px] md:text-[15px] leading-snug ${isLightMode ? "text-black/90" : "text-white/90"}`}>
                            <span className="font-bold">{o.value}</span> {o.label}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Playbooks */}
                <div className="flex-1 flex flex-col gap-4">
                  {activePain.plays.map((play) => (
                    <PlaybookCard key={play.title} play={play} isLightMode={isLightMode} />
                  ))}
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function Solutions() {
  const { isLightMode } = useTheme();
  const [mode, setMode] = useState<SalesMode>("field");
  const content = MODE_CONTENT[mode];

  return (
    <>
      <section className="relative flex flex-col items-center justify-start w-full px-4 pt-16 md:pt-24 lg:pt-32 pb-8 max-w-7xl mx-auto z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center w-full relative z-10"
        >
          <div className={`px-5 py-2 rounded-full border backdrop-blur-sm mb-8 transition-colors duration-500 ${isLightMode ? "border-black/10 bg-black/5 text-black/60" : "border-white/10 bg-white/5 text-white/60"} font-bold uppercase tracking-[0.25em] text-[11px]`}>
            Tailored Solutions
          </div>

          <h1 className={`font-ivyora font-medium text-5xl md:text-7xl lg:text-[92px] leading-[0.95] tracking-[-2px] text-center max-w-4xl transition-colors duration-500 ${isLightMode ? "text-black" : "text-[#f5f7fa]"}`}>
            <BlurReveal as="span" delay={0.1}>Built for how</BlurReveal><br/>
            <span className={isLightMode ? "text-black/40" : "text-white/40"}>
              <BlurReveal as="span" delay={0.3}>your team sells</BlurReveal>
            </span>
          </h1>

          <div className="mt-12 w-full flex justify-center">
            <ModeToggle value={mode} onChange={setMode} isLightMode={isLightMode} />
          </div>
        </motion.div>
      </section>

      {/* Solutions content layout using the new Browser */}
      <SolutionsBrowser key={mode} content={content} isLightMode={isLightMode} />
    </>
  );
}