"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";
import { CTAButton } from "@/app/components/CTAButton";
import { HeroPlaygroundExperience } from "@/app/playground/playgroundExperience";

type Role = "rep" | "leader" | "ops";
type Goal = "visibility" | "competition" | "execution";
type Stack = "salesforce" | "hubspot" | "other";

function pickScenario(role: Role, goal: Goal): "field" | "leaders" | "ops" {
  if (role === "ops") return "ops";
  if (role === "leader") return "leaders";
  // reps
  if (goal === "competition") return "field";
  if (goal === "visibility") return "field";
  return "field";
}

export function Playground() {
  const { isLightMode } = useTheme();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [role, setRole] = useState<Role>("rep");
  const [goal, setGoal] = useState<Goal>("visibility");
  const [stack, setStack] = useState<Stack>("salesforce");

  const scenarioKey = useMemo(() => pickScenario(role, goal), [role, goal]);

  return (
    <section className="relative z-20 w-full px-4 md:px-12 lg:px-20 pt-10 md:pt-16 lg:pt-20 pb-16 md:pb-24 flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex flex-col gap-10">
        <div className="flex flex-col items-center text-center gap-4">
          <h1
            className={`font-['IvyOra_Text'] font-medium tracking-[-2px] leading-[1.05] text-[44px] sm:text-[56px] md:text-[72px] ${
              isLightMode ? "text-[#0b0f14]" : "text-[#f5f7fa]"
            }`}
          >
            AI Playground
          </h1>
          <p
            className={`font-['Inter'] text-[16px] md:text-[18px] leading-relaxed max-w-[720px] ${
              isLightMode ? "text-black/60" : "text-white/60"
            }`}
          >
            Answer a few questions and we’ll curate a hands-on experience that matches your team, goals, and stack.
          </p>
        </div>

        {/* Question flow */}
        <div className="w-full rounded-[28px] p-6 md:p-8 liquid-glass">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className={`font-['Inter'] text-sm font-semibold ${isLightMode ? "text-black/70" : "text-white/70"}`}>
              Setup
            </div>
            <div className={`font-['Inter'] text-xs ${isLightMode ? "text-black/40" : "text-white/40"}`}>
              Step {step + 1} of 4
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-role"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <div className={`font-['Inter'] text-lg font-semibold ${isLightMode ? "text-black" : "text-white"}`}>
                    Who are you setting this up for?
                  </div>
                  <div className={`font-['Inter'] text-sm mt-1 ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                    We’ll tailor the prompts and outputs to match how you work.
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "rep" as const, title: "Reps", desc: "Stay consistent and win daily." },
                    { id: "leader" as const, title: "Leaders", desc: "Coach with real-time clarity." },
                    { id: "ops" as const, title: "Ops", desc: "Automate visibility and alignment." },
                  ].map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setRole(o.id)}
                      className={`text-left rounded-2xl p-4 border transition-colors ${
                        role === o.id
                          ? "border-[#19ad7d]/40 bg-[#19ad7d]/10"
                          : isLightMode
                            ? "border-black/10 hover:border-black/20 hover:bg-black/5"
                            : "border-white/10 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <div className={`font-['Inter'] font-semibold ${isLightMode ? "text-black" : "text-white"}`}>
                        {o.title}
                      </div>
                      <div className={`font-['Inter'] text-sm mt-1 ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                        {o.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-goal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <div className={`font-['Inter'] text-lg font-semibold ${isLightMode ? "text-black" : "text-white"}`}>
                    What do you want to improve first?
                  </div>
                  <div className={`font-['Inter'] text-sm mt-1 ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                    We’ll prioritize the most relevant workflow.
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "visibility" as const, title: "Visibility", desc: "Live activity + KPIs." },
                    { id: "competition" as const, title: "Competition", desc: "Leaderboards + incentives." },
                    { id: "execution" as const, title: "Execution", desc: "Nudges + next steps." },
                  ].map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setGoal(o.id)}
                      className={`text-left rounded-2xl p-4 border transition-colors ${
                        goal === o.id
                          ? "border-[#19ad7d]/40 bg-[#19ad7d]/10"
                          : isLightMode
                            ? "border-black/10 hover:border-black/20 hover:bg-black/5"
                            : "border-white/10 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <div className={`font-['Inter'] font-semibold ${isLightMode ? "text-black" : "text-white"}`}>
                        {o.title}
                      </div>
                      <div className={`font-['Inter'] text-sm mt-1 ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                        {o.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-stack"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <div className={`font-['Inter'] text-lg font-semibold ${isLightMode ? "text-black" : "text-white"}`}>
                    What’s your primary CRM?
                  </div>
                  <div className={`font-['Inter'] text-sm mt-1 ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                    This changes the pre-filled demo and the language we use.
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "salesforce" as const, title: "Salesforce" },
                    { id: "hubspot" as const, title: "HubSpot" },
                    { id: "other" as const, title: "Other" },
                  ].map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setStack(o.id)}
                      className={`text-left rounded-2xl p-4 border transition-colors ${
                        stack === o.id
                          ? "border-[#19ad7d]/40 bg-[#19ad7d]/10"
                          : isLightMode
                            ? "border-black/10 hover:border-black/20 hover:bg-black/5"
                            : "border-white/10 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <div className={`font-['Inter'] font-semibold ${isLightMode ? "text-black" : "text-white"}`}>
                        {o.title}
                      </div>
                      <div className={`font-['Inter'] text-xs mt-1 ${isLightMode ? "text-black/50" : "text-white/50"}`}>
                        Used to seed the demo.
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-ready"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#19ad7d] mt-0.5" size={20} />
                  <div>
                    <div className={`font-['Inter'] text-lg font-semibold ${isLightMode ? "text-black" : "text-white"}`}>
                      Your experience is ready.
                    </div>
                    <div className={`font-['Inter'] text-sm mt-1 ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                      We curated prompts + outputs for <span className="text-[#19ad7d] font-semibold">{scenarioKey}</span> using{" "}
                      <span className="text-[#19ad7d] font-semibold">{stack}</span>.
                    </div>
                  </div>
                </div>
                <CTAButton
                  type="button"
                  variant="primary"
                  className="w-full sm:w-auto justify-center rounded-full px-8 py-4 font-semibold text-[15px] tracking-tight"
                  onClick={() => {
                    document.getElementById("playground-experience")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Start experience <ArrowRight size={18} strokeWidth={2.25} />
                </CTAButton>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-7 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep((s) => (s > 0 ? ((s - 1) as any) : s))}
              className={`text-sm font-['Inter'] font-semibold px-3 py-2 rounded-xl transition-colors ${
                isLightMode ? "text-black/60 hover:bg-black/5" : "text-white/60 hover:bg-white/5"
              }`}
              disabled={step === 0}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setStep((s) => (s < 3 ? ((s + 1) as any) : s))}
              className={`text-sm font-['Inter'] font-semibold px-3 py-2 rounded-xl transition-colors ${
                isLightMode ? "text-black/60 hover:bg-black/5" : "text-white/60 hover:bg-white/5"
              }`}
              disabled={step === 3}
            >
              Next
            </button>
          </div>
        </div>

        {/* Experience */}
        <div id="playground-experience" className="scroll-mt-28">
          <HeroPlaygroundExperience isLightMode={isLightMode} scenarioKey={scenarioKey} stack={stack} />
        </div>
      </div>
    </section>
  );
}

