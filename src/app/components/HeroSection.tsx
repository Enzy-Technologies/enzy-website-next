"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useTheme } from "./ThemeProvider";
import { Sparkles, ArrowRight, CornerDownRight, Star, X, CheckCircle2 } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { BOOK_DEMO_HREF } from "@/app/lib/booking";
import { SimpleLogosMarquee } from "@/app/components/SimpleLogosMarquee";
import { HeroVideoPlaceholder } from "@/app/components/HeroVideoPlaceholder";
import { LpBookDemoInline } from "@/app/components/landing/LpBookDemoScroll";
import { BookDemoPage } from "@/app/components/BookDemo/BookDemoPage";

import { BlurReveal } from "./BlurReveal";

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

const LP_VALUE_BULLETS = [
  "Live visibility between touches — managers coach what matters, reps act faster.",
  "Turn CRM signal into playbooks, nudges, and competitions without another dashboard.",
  "Teams report measurable lift while reps stay in their existing workflows.",
];

function HeroSectionLp() {
  const { isLightMode } = useTheme();

  return (
    <section className="relative w-full">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className={`absolute inset-0 ${
            isLightMode
              ? "bg-[radial-gradient(120%_90%_at_50%_-28%,rgba(25,173,125,0.14),transparent_52%),linear-gradient(180deg,var(--color-surface-light)_0%,#ffffff_58%)]"
              : "bg-[radial-gradient(95%_72%_at_88%_-8%,rgba(25,173,125,0.17),transparent_56%),radial-gradient(72%_58%_at_4%_58%,rgba(25,173,125,0.09),transparent_62%),linear-gradient(180deg,#0b0f14_0%,#060809_100%)]"
          }`}
        />
        <div
          className="absolute inset-x-0 top-0 h-[min(460px,50vh)] opacity-[0.42] [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(25,173,125,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(25,173,125,0.065) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-12 md:pb-12 md:pt-16 lg:pt-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6 md:gap-8">
          <span
            className={`inline-flex items-center rounded-full border px-4 py-2 font-inter text-[11px] font-semibold uppercase tracking-[0.14em] md:text-[12px] ${
              isLightMode
                ? "border-black/10 bg-black/[0.03] text-black/55"
                : "border-white/12 bg-white/[0.06] text-white/60"
            }`}
          >
            Built for route-based &amp; field sales orgs
          </span>

          <h1
            className={`font-inter font-bold tracking-[-0.05em] leading-[1.02] ${
              isLightMode ? "text-brand-dark" : "text-brand-light"
            } text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px]`}
          >
            <BlurReveal as="span" delay={0.1}>
              More revenue from the team you{" "}
            </BlurReveal>
            <BlurReveal as="span" delay={0.85} className="font-ivyora font-medium italic">
              already
            </BlurReveal>
            <BlurReveal as="span" delay={1.05}>
              {" "}
              have.
            </BlurReveal>
          </h1>

          <p
            className={`max-w-[640px] font-inter text-[17px] leading-[1.55] md:text-[19px] ${
              isLightMode ? "text-black/72" : "text-white/68"
            }`}
          >
            Intelligent performance systems that tighten execution between visits — coaching,
            accountability, and incentives grounded in live CRM signal.
          </p>
        </div>
        
        <div className="mt-12 md:mt-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="relative mx-auto w-full max-w-[min(100%,1000px)]"
          >
            <div
              className="pointer-events-none absolute -inset-[12%] rounded-[44%] opacity-80 blur-3xl md:blur-[56px]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 42%, rgba(25,173,125,0.24), transparent 72%)",
              }}
              aria-hidden
            />
            <div className="relative rounded-[28px] border border-[#19ad7d]/25 bg-gradient-to-br from-[#19ad7d]/20 via-transparent to-[#19ad7d]/10 p-[1px] shadow-[0_24px_80px_-24px_rgba(25,173,125,0.55)] sm:rounded-[32px] md:rounded-[36px]">
              <div
                className={`overflow-hidden rounded-[27px] sm:rounded-[31px] md:rounded-[35px] ${
                  isLightMode ? "bg-[#faf9f6]" : "bg-[#07090c]"
                }`}
              >
                <HeroVideoPlaceholder
                  variant="lp"
                  embedded
                  id="product-video"
                  label="2-minute overview — full walkthrough lands here soon"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24 w-full max-w-3xl mx-auto">
          <div id="lp-demo" className="scroll-mt-8 w-full">
            <BookDemoPage hideTestimonials hideText />
          </div>
        </div>

        <div className="mt-12 md:mt-16 w-full max-w-4xl mx-auto text-center">
          <p
            className={`mb-4 font-inter text-[10px] font-semibold uppercase tracking-[0.18em] md:text-[11px] ${
              isLightMode ? "text-black/45" : "text-white/45"
            }`}
          >
            Trusted by revenue teams worldwide
          </p>
          <div className="-mx-1 [&_.simple-logo-marquee]:mt-0">
            <SimpleLogosMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSectionDefault() {
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

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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
    <section ref={containerRef} className="relative w-full px-4 pt-4 md:pt-8 lg:pt-12 pb-16 md:pb-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
        <div className="lg:col-span-7 flex flex-col gap-7 text-center items-center lg:text-left lg:items-start max-w-4xl lg:max-w-none mx-auto lg:mx-0 w-full">
          <h1
            className={`font-inter font-bold tracking-[-0.05em] leading-[1.02] ${
              isLightMode ? "text-brand-dark" : "text-brand-light"
            } text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px]`}
          >
            <BlurReveal as="span" delay={0.1}>More revenue from the team you </BlurReveal>
            <BlurReveal as="span" delay={0.85} className="font-ivyora font-medium italic">already</BlurReveal>
            <BlurReveal as="span" delay={1.05}> have.</BlurReveal>
          </h1>

          <p
            className={`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[540px] mx-auto lg:mx-0 ${
              isLightMode ? "text-black/70" : "text-white/65"
            }`}
          >
            We provide intelligent, real-time performance systems that improve
            execution, increase accountability, and help teams drive measurable
            sales growth.
          </p>


          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-6 pb-4 w-full">
            <CTAButton
              href={BOOK_DEMO_HREF}
              variant="primary"
              className="w-full sm:w-auto max-w-[320px] sm:max-w-none justify-center rounded-full px-10 py-5 sm:py-6 sm:px-12 gap-3 font-extrabold text-[16px] sm:text-[18px] uppercase tracking-[0.1em] hover:scale-[1.02] active:scale-[0.99] shadow-[0_0_40px_rgba(25,173,125,0.45)]"
            >
              Book a demo <ArrowRight size={22} strokeWidth={2.25} aria-hidden />
            </CTAButton>
            <CTAButton
              variant="secondary"
              href="#playground"
              className="w-full sm:w-auto max-w-[320px] sm:max-w-none justify-center rounded-full px-10 py-5 sm:py-6 sm:px-12 font-extrabold text-[16px] sm:text-[18px] uppercase tracking-[0.1em] hover:scale-[1.02] active:scale-[0.99]"
            >
              Try the playground
            </CTAButton>
          </div>

          <div className="w-full lg:max-w-[560px]">
            <SimpleLogosMarquee />
          </div>
        </div>

        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end" id="playground">
          <PlaygroundSurface
            isLightMode={isLightMode}
            activeQuestion={activeQuestion}
            typedAnswer={typedAnswer}
            isTyping={isTyping}
            questions={QUESTIONS}
            onPickQuestion={onPickQuestion}
            pulseChipId={pulseChipId}
            backgroundY={backgroundY}
          />
        </div>
      </div>
    </section>
  );
}

export function HeroSection({ variant = "default" }: { variant?: "default" | "lp" } = {}) {
  if (variant === "lp") return <HeroSectionLp />;
  return <HeroSectionDefault />;
}

function PlaygroundSurface({
  isLightMode,
  activeQuestion,
  typedAnswer,
  isTyping,
  questions,
  onPickQuestion,
  pulseChipId,
  backgroundY,
}: {
  isLightMode: boolean;
  activeQuestion: Question;
  typedAnswer: string;
  isTyping: boolean;
  questions: Question[];
  onPickQuestion: (id: string) => void;
  pulseChipId: string | null;
  backgroundY?: any;
}) {
  const otherQuestions = questions.filter((q) => q.id !== activeQuestion.id);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative w-full max-w-[480px]">
      <motion.div
        className="pointer-events-none absolute -inset-4 rounded-[40px] opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(25,173,125,0.18), transparent 70%)",
          y: backgroundY,
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
                className={`font-inter text-[12px] font-semibold tracking-tight ${
                  isLightMode ? "text-brand-dark" : "text-white"
                }`}
              >
                Enzy AI
              </span>
              <span
                className={`font-inter text-[10px] tracking-tight ${
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
              className={`font-inter text-[10px] font-medium tracking-[0.06em] uppercase ${
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
                  <p className="font-inter text-[13px] leading-snug tracking-tight m-0">
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
                    className={`font-inter text-[13px] leading-[1.6] tracking-tight whitespace-pre-line m-0 ${
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
                          className={`rounded-full border px-2.5 py-0.5 font-inter text-[10.5px] tracking-tight ${
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
            className={`font-inter text-[10px] tracking-[0.14em] uppercase mb-2.5 font-medium ${
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
                    className={`font-inter text-[12px] leading-snug tracking-tight transition-colors m-0 ${
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

      {/* Tooltip removed */}
    </div>
  );
}

