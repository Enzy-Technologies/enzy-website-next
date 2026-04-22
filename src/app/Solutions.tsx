"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "./components/ThemeProvider";
import { QuickJumpFAB } from "./components/QuickJumpFAB";

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
      className={`w-full max-w-[520px] rounded-full p-1 border backdrop-blur-md transition-colors duration-500 liquid-glass ${
        isLightMode ? "border-black/10 bg-white/60" : "border-white/10 bg-white/5"
      }`}
      role="tablist"
      aria-label="Select sales motion"
    >
      <div className="grid grid-cols-2 gap-1">
        {[{ id: "field" as const, label: "Field Sales" }, { id: "virtual" as const, label: "Virtual Sales" }].map((t) => {
          const active = value === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={`relative rounded-full px-4 py-2.5 text-[13px] md:text-[14px] font-['Inter'] font-semibold tracking-tight transition-colors duration-300 ${
                active
                  ? isLightMode
                    ? "bg-black text-white"
                    : "bg-white text-black"
                  : isLightMode
                    ? "text-black/60 hover:text-black"
                    : "text-white/60 hover:text-white"
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
      className={`relative rounded-[28px] p-7 md:p-8 transition-colors duration-500 liquid-glass ${
        isLightMode ? "hover:bg-[#19ad7d]/10" : "hover:bg-[rgba(25,173,125,0.06)]"
      }`}
    >
      <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/35 to-transparent" />

      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col">
          <div className={`font-['Inter'] text-[18px] md:text-[20px] font-semibold tracking-tight ${isLightMode ? "text-black" : "text-white"}`}>
            {play.title}
          </div>
          <div className={`mt-2 font-['Inter'] text-[14px] md:text-[15px] leading-relaxed ${isLightMode ? "text-black/60" : "text-white/60"}`}>
            {play.description}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`shrink-0 px-4 py-2 rounded-full border font-['Inter'] text-[12px] md:text-[13px] font-semibold transition-colors duration-300 ${
            isLightMode
              ? "border-black/10 bg-white/70 text-black/70 hover:text-black"
              : "border-white/10 bg-white/5 text-white/70 hover:text-white"
          }`}
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"} steps
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
            <ul className="mt-6 flex flex-col gap-2.5">
              {play.steps.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#19ad7d] shrink-0 shadow-[0_0_10px_rgba(25,173,125,0.55)]" />
                  <span className={`font-['Inter'] text-[13px] md:text-[14px] leading-snug ${isLightMode ? "text-black/75" : "text-white/75"}`}>
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
  const [activePainId, setActivePainId] = useState<string>(content.pains[0]?.id ?? "");

  useEffect(() => {
    setActivePainId(MODE_CONTENT[mode].pains[0]?.id ?? "");
  }, [mode]);

  const activePain = useMemo(() => {
    return content.pains.find((p) => p.id === activePainId) ?? content.pains[0];
  }, [content.pains, activePainId]);

  // Hash support: #field:territory or #virtual:followup
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const raw = hash.replace("#", "");
      const [hashMode, hashPain] = raw.split(":");
      if (!hashMode || !hashPain) return;

      if (hashMode !== "field" && hashMode !== "virtual") return;

      const nextMode = hashMode as SalesMode;
      const painExists = MODE_CONTENT[nextMode].pains.some((p) => p.id === hashPain);
      if (!painExists) return;

      setMode(nextMode);
      setActivePainId(hashPain);

      const el = document.getElementById("solutions-interactive");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const jumpItems = content.pains.map((p, i) => ({
    id: p.id,
    label: p.label,
    meta: (i + 1).toString().padStart(2, "0"),
  }));

  return (
    <>
      <section className="relative flex flex-col items-center justify-start w-full px-4 pt-8 md:pt-16 lg:pt-24 pb-12 md:pb-16 max-w-7xl mx-auto z-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center w-full mb-10 md:mb-14"
        >
          <div
            className={`px-5 py-2 rounded-full border backdrop-blur-sm mb-8 transition-colors duration-500 ${
              isLightMode
                ? "border-black/10 bg-black/5 text-black/60"
                : "border-white/10 bg-white/5 text-white/60"
            } eyebrow`}
          >
            Tailored Solutions
          </div>

          <h1
            className={`font-['IvyOra_Text'] font-medium text-5xl md:text-7xl lg:text-[92px] leading-[0.95] tracking-[-2px] text-center max-w-4xl transition-colors duration-500 ${
              isLightMode ? "text-black" : "text-[#f5f7fa]"
            }`}
          >
            Built for how your team <span className="text-[#19ad7d]">sells</span>
          </h1>

          <p
            className={`font-['Inter'] text-base md:text-lg mt-6 max-w-2xl text-center leading-relaxed transition-colors duration-500 ${
              isLightMode ? "text-black/60" : "text-white/50"
            }`}
          >
            Toggle the motion. Explore the pains. See the playbooks.
          </p>

          <div className="mt-8 w-full flex justify-center">
            <ModeToggle value={mode} onChange={setMode} isLightMode={isLightMode} />
          </div>

          <div className={`mt-6 font-['Inter'] text-[13px] md:text-[14px] tracking-tight ${isLightMode ? "text-black/55" : "text-white/55"}`}>
            <span className="font-semibold text-[#19ad7d]">{content.title}</span> — {content.subhead}
          </div>
        </motion.div>

        {/* Interactive section */}
        <div id="solutions-interactive" className="w-full flex flex-col lg:flex-row gap-6 md:gap-10">
          {/* Left: pain nav */}
          <div className="w-full lg:w-[35%] flex flex-col gap-4">
            <div className={`mb-2 border-b pb-4 pl-2 transition-colors duration-500 ${isLightMode ? "text-black/40 border-black/10" : "text-white/40 border-white/10"} eyebrow`}>
              Pain points
            </div>

            <div className="flex flex-col gap-3">
              {content.pains.map((p) => {
                const isActive = p.id === activePainId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setActivePainId(p.id);
                      const el = document.getElementById("solutions-interactive");
                      if (el && window.innerWidth < 1024) {
                        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                      }
                      const nextHash = `#${mode}:${p.id}`;
                      if (window.location.hash !== nextHash) window.history.replaceState(null, "", nextHash);
                    }}
                    className={`group relative text-left w-full p-6 rounded-2xl transition-all duration-500 overflow-hidden liquid-glass ${
                      isActive
                        ? isLightMode
                          ? "bg-[#19ad7d]/10 border border-[#19ad7d]/40 shadow-[0_8px_32px_rgba(25,173,125,0.15)]"
                          : "bg-[linear-gradient(189.6deg,rgba(25,173,125,0.15)_25.1%,rgba(20,144,103,0.05)_64.2%)] border border-[#19ad7d]/40 shadow-[0_8px_32px_rgba(25,173,125,0.15)]"
                        : isLightMode
                          ? "bg-black/5 border border-black/10 hover:border-black/30 hover:bg-black/10"
                          : "bg-[rgba(255,255,255,0.03)] border border-white/10 hover:border-white/30 hover:bg-[rgba(255,255,255,0.08)]"
                    }`}
                  >
                    {isActive ? (
                      <div className="absolute inset-0 bg-[#19ad7d]/10 blur-xl rounded-2xl pointer-events-none" />
                    ) : null}

                    <div className="relative z-10 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-['Inter'] text-[18px] md:text-[20px] font-semibold transition-colors duration-300 ${
                            isActive
                              ? "text-[#19ad7d]"
                              : isLightMode
                                ? "text-black group-hover:text-black/80"
                                : "text-white group-hover:text-white/90"
                          }`}
                        >
                          {p.label}
                        </span>
                        <ArrowRight
                          size={20}
                          className={`transition-all duration-500 ${
                            isActive
                              ? "text-[#19ad7d] translate-x-1 opacity-100"
                              : isLightMode
                                ? "text-black/30 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                : "text-white/30 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          }`}
                        />
                      </div>
                      <p className={`text-sm mt-3 transition-colors duration-300 ${isActive ? (isLightMode ? "text-black/80" : "text-white/80") : (isLightMode ? "text-black/50" : "text-white/50")}`}>
                        {p.summary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: dynamic content */}
          <div className="w-full lg:w-[65%] mt-2 lg:mt-0 flex flex-col">
            <div className="text-transparent mb-4 border-b border-transparent pb-4 hidden lg:block select-none eyebrow">Spacer</div>

            <div className="relative w-full flex-1 rounded-[32px] overflow-hidden min-h-[560px] flex items-stretch transition-colors duration-500 liquid-glass">
              <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(25,173,125,0.15)_0%,transparent_70%)] rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-[radial-gradient(ellipse_at_center,rgba(25,173,125,0.06)_0%,transparent_70%)] rounded-full blur-[60px] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${mode}:${activePain?.id}`}
                  initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  className="relative z-10 w-full h-full p-8 md:p-12 lg:p-14 flex flex-col"
                >
                  <div className="flex flex-col gap-6">
                    <div className={`font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.14em] ${isLightMode ? "text-black/45" : "text-white/40"}`}>
                      Selected pain
                    </div>
                    <div className={`font-['IvyOra_Text'] font-medium text-3xl md:text-4xl lg:text-[46px] leading-[1.05] tracking-[-1.5px] ${isLightMode ? "text-black" : "text-white"}`}>
                      {activePain?.label}
                    </div>
                    <div className={`font-['Inter'] text-[15px] md:text-[16px] leading-relaxed max-w-2xl ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                      {activePain?.summary}
                    </div>
                  </div>

                  <div className={`w-full h-px bg-gradient-to-r from-transparent to-transparent my-10 ${isLightMode ? "via-black/10" : "via-white/10"}`} />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    <div className="lg:col-span-6">
                      <div className="eyebrow text-[#19ad7d] mb-4">What teams feel</div>
                      <ul className="flex flex-col gap-2.5">
                        {(activePain?.pains ?? []).map((x) => (
                          <li key={x} className="flex items-start gap-3">
                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#19ad7d] shrink-0 shadow-[0_0_10px_rgba(25,173,125,0.55)]" />
                            <span className={`font-['Inter'] text-[14px] md:text-[15px] leading-snug ${isLightMode ? "text-black/75" : "text-white/75"}`}>
                              {x}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="lg:col-span-6">
                      <div className="eyebrow text-[#19ad7d] mb-4">What Enzy changes</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {(activePain?.outcomes ?? []).map((o) => (
                          <div key={o.label} className={`relative rounded-[22px] p-5 transition-colors duration-500 liquid-glass ${isLightMode ? "hover:bg-[#19ad7d]/10" : "hover:bg-[rgba(25,173,125,0.06)]"}`}>
                            <div className="pointer-events-none absolute left-5 right-5 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/35 to-transparent" />
                            <div className={`font-['Inter'] font-extrabold tracking-[-2px] leading-none text-[34px] ${isLightMode ? "text-black" : "text-white"}`}>
                              {o.value}
                            </div>
                            <div className={`mt-2 font-['Inter'] text-[13px] leading-snug ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                              {o.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`w-full h-px bg-gradient-to-r from-transparent to-transparent my-10 ${isLightMode ? "via-black/10" : "via-white/10"}`} />

                  <div className="flex flex-col gap-6">
                    <div className="flex items-end justify-between gap-6 flex-wrap">
                      <div>
                        <div className="eyebrow text-[#19ad7d]">Playbooks</div>
                        <div className={`mt-2 font-['Inter'] text-[14px] md:text-[15px] ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                          Click into a playbook to see the steps.
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                      {(activePain?.plays ?? []).map((pl) => (
                        <PlaybookCard key={pl.title} play={pl} isLightMode={isLightMode} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <QuickJumpFAB
        title={mode === "field" ? "Field Sales" : "Virtual Sales"}
        items={jumpItems}
        onJump={(id) => {
          setActivePainId(id);
          const el = document.getElementById("solutions-interactive");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          const nextHash = `#${mode}:${id}`;
          if (window.location.hash !== nextHash) window.history.replaceState(null, "", nextHash);
        }}
      />
    </>
  );
}
