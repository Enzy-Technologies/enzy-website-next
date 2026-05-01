"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { Sparkles, ArrowRight, CornerDownRight, Star, X } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { BOOK_DEMO_HREF } from "@/app/lib/booking";
import { SimpleLogosMarquee } from "@/app/components/SimpleLogosMarquee";

type Question = {
  id: string;
  prompt: string;
  answer: string;
  followups: string[];
};

const QUESTIONS: Question[] = [
  {
    id: "revenue-drop",
    prompt: "Why did revenue drop in the West region this week?",
    answer:
      "Revenue is down 18% WoW in West. Three drivers:\n\n• Two enterprise deals stalled in Marcus Hill's territory ($84K combined)\n• Demos booked dropped 22% Tue–Thu after the new pricing rolled out\n• Jenna Cole was out Wed–Fri; her pipeline didn't get covered\n\nSuggested next moves: nudge the two stalled deals (drafts ready), run a 30-min pricing-objection refresher, redistribute Jenna's pipeline.",
    followups: ["Draft the nudges", "Show me the deals", "Build the refresher"],
  },
  {
    id: "top-performer",
    prompt: "What is Marcus doing that the rest of the team isn't?",
    answer:
      "Three patterns separate Marcus from team median:\n\n• 4.2× more multi-threaded deals (avg 3.1 contacts vs 0.7)\n• Responds to inbound in 8 min vs team median of 1h 12m\n• Sends a recap email after every demo — 100% rate vs 34% team avg\n\nThe recap habit alone correlates with a 31% higher close rate across the team. Want to turn it into a workflow?",
    followups: ["Build the recap workflow", "Show the data", "Coach the team"],
  },
  {
    id: "next-competition",
    prompt: "What competition would actually move the needle right now?",
    answer:
      "Based on this week's data, your highest-leverage play is a 5-day demo sprint, individual format.\n\nWhy: demos are your weakest stage (37% conversion vs 52% benchmark) and the team has bandwidth — call volume is down 14% WoW. A demo sprint with $250 / $150 / $100 incentives would cost ~$500 and projects to add ~$42K in pipeline.\n\nReady to launch with banners + announcement copy?",
    followups: ["Launch the sprint", "Adjust the rewards", "See the projection"],
  },
  {
    id: "what-changed",
    prompt: "What changed since yesterday that I should care about?",
    answer:
      "Three things worth your attention:\n\n• 14 deals went 48h+ without activity (up from 9 yesterday)\n• Devin Park dropped from #2 to #4 on the leaderboard — his demos halved\n• A new prospect from your ICP (FieldOps Inc., 340 employees) hit the pricing page 6 times in the last 18 hours — no rep has reached out\n\nThe FieldOps signal is your highest-priority action. Want me to assign and draft outreach?",
    followups: ["Assign FieldOps", "Check on Devin", "Nudge the stalled deals"],
  },
];

const TYPING_SPEED_MS = 14;
const ROTATE_INTERVAL_MS = 18000;

export function HeroSection() {
  const { isLightMode } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState(QUESTIONS[0].id);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [pulseChipId, setPulseChipId] = useState<string | null>(null);
  const typingTimerRef = useRef<number | null>(null);
  const rotateTimerRef = useRef<number | null>(null);
  const pulseTimerRef = useRef<number | null>(null);

  const activeQuestion =
    QUESTIONS.find((q) => q.id === activeQuestionId) ?? QUESTIONS[0];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPrefersReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (typingTimerRef.current !== null) {
      window.clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    if (prefersReducedMotion) {
      setTypedAnswer(activeQuestion.answer);
      setIsTyping(false);
      return;
    }

    setTypedAnswer("");
    setIsTyping(true);
    let i = 0;

    typingTimerRef.current = window.setInterval(() => {
      i += 1;
      setTypedAnswer(activeQuestion.answer.slice(0, i));
      if (i >= activeQuestion.answer.length) {
        if (typingTimerRef.current !== null) {
          window.clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        setIsTyping(false);
      }
    }, TYPING_SPEED_MS);

    return () => {
      if (typingTimerRef.current !== null) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [activeQuestionId, activeQuestion.answer, prefersReducedMotion]);

  useEffect(() => {
    if (hasUserInteracted || prefersReducedMotion) return;
    if (rotateTimerRef.current !== null) {
      window.clearInterval(rotateTimerRef.current);
    }
    rotateTimerRef.current = window.setInterval(() => {
      setActiveQuestionId((prevId) => {
        const idx = QUESTIONS.findIndex((q) => q.id === prevId);
        return QUESTIONS[(idx + 1) % QUESTIONS.length].id;
      });
    }, ROTATE_INTERVAL_MS);

    return () => {
      if (rotateTimerRef.current !== null) {
        window.clearInterval(rotateTimerRef.current);
        rotateTimerRef.current = null;
      }
    };
  }, [hasUserInteracted, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (pulseTimerRef.current !== null) {
        window.clearTimeout(pulseTimerRef.current);
      }
    };
  }, []);

  const onPickQuestion = (id: string) => {
    if (id === activeQuestionId) return;
    setHasUserInteracted(true);
    setPulseChipId(id);
    if (pulseTimerRef.current !== null) {
      window.clearTimeout(pulseTimerRef.current);
    }
    pulseTimerRef.current = window.setTimeout(() => {
      setPulseChipId(null);
    }, 280);

    if (rotateTimerRef.current !== null) {
      window.clearInterval(rotateTimerRef.current);
      rotateTimerRef.current = null;
    }
    setActiveQuestionId(id);
  };

  return (
    <section className="relative w-full px-4 pt-12 md:pt-20 lg:pt-28 pb-16 md:pb-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col gap-7 text-center items-center lg:text-left lg:items-start">
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-colors ${
              isLightMode
                ? "border-black/10 bg-white text-black/70"
                : "border-white/10 bg-[#0b0f14] text-white/70"
            }`}
          >
            <span className="font-['Inter'] text-[11px] tracking-[0.18em] text-[#19ad7d] font-semibold">
              #1 Sales Performance App
            </span>
            <span className={isLightMode ? "text-black/30" : "text-white/30"} aria-hidden>
              |
            </span>
            <span className="inline-flex items-center gap-1.5" aria-label="4.5 out of 5 stars">
              <span className="inline-flex items-center gap-0.5 text-[#19ad7d]" aria-hidden>
                <Star size={14} className="fill-current" />
                <Star size={14} className="fill-current" />
                <Star size={14} className="fill-current" />
                <Star size={14} className="fill-current" />
                <span className="relative inline-block h-[14px] w-[14px]">
                  <Star size={14} className="absolute inset-0 text-[#19ad7d]/30" />
                  <span className="absolute inset-0 w-1/2 overflow-hidden">
                    <Star size={14} className="fill-current" />
                  </span>
                </span>
              </span>
              <span className="font-['Inter'] text-[11px] tracking-tight opacity-90">4.5</span>
            </span>
          </div>

          <h1
            className={`font-['IvyOra_Text'] font-medium leading-[1.02] tracking-[-2px] ${
              isLightMode ? "text-brand-dark" : "text-brand-light"
            } text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px]`}
          >
            More revenue from the team you{" "}
            <span className="italic font-normal">already have.</span>
          </h1>

          <p
            className={`font-['Inter'] text-[17px] md:text-[18px] leading-[1.55] max-w-[540px] mx-auto lg:mx-0 ${
              isLightMode ? "text-black/70" : "text-white/65"
            }`}
          >
            Enzy connects your CRM and comms stack, makes performance visible in
            real time, and uses competition + AI to drive the behaviors that
            actually close deals.
          </p>

          <p
            className={`font-['Inter'] text-[14px] ${
              isLightMode ? "text-black/65" : "text-white/55"
            }`}
          >
            Customers see a median{" "}
            <span
              className={`font-semibold ${
                isLightMode ? "text-brand-dark" : "text-brand-light"
              }`}
            >
              27% lift in sales
            </span>{" "}
            within the first year.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <CTAButton
              href={BOOK_DEMO_HREF}
              variant="primary"
              className="justify-center rounded-full px-9 py-[15px] gap-2 font-semibold text-[15px] w-full sm:w-auto max-w-[320px] sm:max-w-none"
            >
              Book a demo <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
            </CTAButton>
            <CTAButton
              variant="secondary"
              href="#playground"
              className="justify-center rounded-full px-9 py-[15px] font-semibold text-[15px] w-full sm:w-auto max-w-[320px] sm:max-w-none"
            >
              Try the playground
            </CTAButton>
          </div>

          <div className="w-full lg:max-w-[560px]">
            <SimpleLogosMarquee />
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end" id="playground">
          <PlaygroundSurface
            isLightMode={isLightMode}
            activeQuestion={activeQuestion}
            typedAnswer={typedAnswer}
            isTyping={isTyping}
            questions={QUESTIONS}
            onPickQuestion={onPickQuestion}
            pulseChipId={pulseChipId}
          />
        </div>
      </div>
    </section>
  );
}

function PlaygroundSurface({
  isLightMode,
  activeQuestion,
  typedAnswer,
  isTyping,
  questions,
  onPickQuestion,
  pulseChipId,
}: {
  isLightMode: boolean;
  activeQuestion: Question;
  typedAnswer: string;
  isTyping: boolean;
  questions: Question[];
  onPickQuestion: (id: string) => void;
  pulseChipId: string | null;
}) {
  const otherQuestions = questions.filter((q) => q.id !== activeQuestion.id);
  const [showHint, setShowHint] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const DISMISS_KEY = "enzy-bg-hint-dismissed-v2";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = Boolean(window.sessionStorage.getItem(DISMISS_KEY));
    } catch {}
    if (dismissed) return;

    // If we're already scrolled, show immediately.
    if (window.scrollY > 0) {
      setShowHint(true);
      return;
    }

    const onScroll = () => {
      if (window.scrollY > 0) {
        setShowHint(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const t = window.setTimeout(() => setShowHint(true), 2500);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
    };
  }, []);

  const dismissHint = () => {
    setShowHint(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
  };

  return (
    <div className="relative w-full max-w-[480px]">
      <div
        className="pointer-events-none absolute -inset-4 rounded-[40px] opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(25,173,125,0.18), transparent 70%)",
        }}
        aria-hidden
      />

      <div
        className={`relative rounded-[28px] overflow-hidden border shadow-[0_40px_120px_rgba(0,0,0,0.55),0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] ${
          isLightMode ? "border-black/10" : "border-white/[0.08]"
        }`}
        style={{
          background: isLightMode
            ? "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(248,250,252,0.92) 100%)"
            : "linear-gradient(180deg, rgba(18,20,24,0.94) 0%, rgba(10,11,14,0.96) 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          style={{
            background: isLightMode
              ? "radial-gradient(120% 70% at 50% -10%, rgba(25,173,125,0.10), transparent 55%)"
              : "radial-gradient(120% 70% at 50% -10%, rgba(25,173,125,0.10), transparent 55%)",
          }}
          aria-hidden
        />

        <div
          className={`relative flex items-center justify-between px-5 py-3.5 border-b ${
            isLightMode ? "border-black/10" : "border-white/[0.06]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#19ad7d]/15 ring-1 ring-inset ring-[#19ad7d]/30">
              <Sparkles size={13} className="text-[#19ad7d]" />
            </span>
            <div className="flex flex-col leading-tight">
              <span
                className={`font-['Inter'] text-[12px] font-semibold tracking-tight ${
                  isLightMode ? "text-brand-dark" : "text-white"
                }`}
              >
                Enzy AI
              </span>
              <span
                className={`font-['Inter'] text-[10px] tracking-tight ${
                  isLightMode ? "text-black/45" : "text-white/40"
                }`}
              >
                Live playground
              </span>
            </div>
          </div>

          <div
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${
              isLightMode ? "border-black/10 bg-black/[0.03]" : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#19ad7d] opacity-70 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#19ad7d]" />
            </span>
            <span
              className={`font-['Inter'] text-[10px] font-medium tracking-[0.06em] uppercase ${
                isLightMode ? "text-black/55" : "text-white/55"
              }`}
            >
              Connected
            </span>
          </div>
        </div>

        <div className="relative px-5 pt-5 pb-4 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuestion.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3 flex-1"
            >
              <div className="flex justify-end">
                <div className="max-w-[88%] rounded-2xl rounded-tr-md bg-[#19ad7d] text-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(25,173,125,0.32)]">
                  <p className="font-['Inter'] text-[13px] leading-snug tracking-tight m-0">
                    {activeQuestion.prompt}
                  </p>
                </div>
              </div>

              <div className="flex justify-start">
                <div
                  className={`max-w-[94%] rounded-2xl rounded-tl-md border px-3.5 py-3 backdrop-blur-md ${
                    isLightMode
                      ? "border-black/10 bg-black/[0.03]"
                      : "border-white/[0.08] bg-white/[0.04]"
                  }`}
                >
                  <p
                    className={`font-['Inter'] text-[13px] leading-[1.6] tracking-tight whitespace-pre-line m-0 ${
                      isLightMode ? "text-black/80" : "text-white/90"
                    }`}
                  >
                    {typedAnswer}
                    {isTyping && (
                      <span
                        className={`inline-block w-[6px] h-[12px] ml-[2px] align-middle animate-pulse ${
                          isLightMode ? "bg-black/55" : "bg-white/70"
                        }`}
                      />
                    )}
                  </p>

                  {!isTyping && activeQuestion.followups.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                      className={`mt-3 pt-3 border-t flex flex-wrap gap-1.5 ${
                        isLightMode ? "border-black/10" : "border-white/[0.06]"
                      }`}
                    >
                      <CornerDownRight
                        size={11}
                        className={isLightMode ? "text-black/35 mt-0.5 mr-0.5" : "text-white/35 mt-0.5 mr-0.5"}
                        aria-hidden
                      />
                      {activeQuestion.followups.map((label) => (
                        <span
                          key={label}
                          className={`rounded-full border px-2.5 py-0.5 font-['Inter'] text-[10.5px] tracking-tight ${
                            isLightMode
                              ? "border-black/10 bg-black/[0.03] text-black/60"
                              : "border-white/10 bg-white/[0.04] text-white/65"
                          }`}
                        >
                          {label}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className={`relative border-t px-5 py-4 ${
            isLightMode ? "border-black/10 bg-black/[0.02]" : "border-white/[0.06] bg-black/20"
          }`}
        >
          <p
            className={`font-['Inter'] text-[10px] tracking-[0.14em] uppercase mb-2.5 font-medium ${
              isLightMode ? "text-black/45" : "text-white/40"
            }`}
          >
            Try another question
          </p>
          <div className="flex flex-col gap-1.5">
            {otherQuestions.slice(0, 3).map((q) => {
              const isPulsing = pulseChipId === q.id;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => onPickQuestion(q.id)}
                  className={`group relative text-left rounded-lg border transition-all duration-200 px-3 py-2 ${
                    isPulsing
                      ? "border-[#19ad7d]/50 bg-[#19ad7d]/[0.12]"
                      : isLightMode
                        ? "border-black/10 bg-black/[0.02] hover:border-black/15 hover:bg-black/[0.04]"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.05]"
                  }`}
                >
                  <p
                    className={`font-['Inter'] text-[12px] leading-snug tracking-tight transition-colors m-0 ${
                      isLightMode
                        ? "text-black/65 group-hover:text-black/80"
                        : "text-white/75 group-hover:text-white/90"
                    }`}
                  >
                    {q.prompt}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {isMounted && showHint
        ? createPortal(
            <div className="fixed inset-x-0 bottom-0 z-[9999] px-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
              <div
                role="dialog"
                aria-label="Background tip"
                className={`mx-auto w-full max-w-[520px] rounded-2xl border px-4 py-3 shadow-[0_22px_80px_rgba(0,0,0,0.22)] backdrop-blur-md ${
                  isLightMode ? "border-black/10 bg-white/85" : "border-white/10 bg-black/60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p
                      className={`font-['Inter'] text-[12.5px] leading-[1.5] ${
                        isLightMode ? "text-black/75" : "text-white/75"
                      }`}
                    >
                      <span className="font-semibold">Background feeling busy?</span>{" "}
                      Hold on the dots to see Enzy pull scattered work into a clear, connected system.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={dismissHint}
                    className={`shrink-0 -mr-1 -mt-1 rounded-full p-2 transition-colors ${
                      isLightMode ? "hover:bg-black/5 text-black/60" : "hover:bg-white/10 text-white/60"
                    }`}
                    aria-label="Dismiss"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}

