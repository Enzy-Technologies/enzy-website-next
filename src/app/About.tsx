"use client";

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { CTAButton } from "./components/CTAButton";
import { useTheme } from "./components/ThemeProvider";
import { BOOK_DEMO_HREF } from "./lib/booking";
import Link from "next/link";
import { BlurReveal } from "./components/BlurReveal";

const FadeInSection = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const ENZY_LOOP_STEPS = [
  {
    numeral: "01",
    title: "Unify",
    body: "Behavioral, organizational, and transactional data flow into one connected performance graph.",
    tag: "Data",
  },
  {
    numeral: "02",
    title: "Decide",
    body: "AI agents identify what top performers do differently — and surface the actions that move the metric.",
    tag: "AI",
  },
  {
    numeral: "03",
    title: "Compound",
    body: "Coaching, workflows, and incentives adapt in real time. Every cycle, the system gets sharper.",
    tag: "Loop",
  },
];

function LoopCard({ step, index, totalSteps, isLightMode, scrollYProgress }: { step: any, index: number, totalSteps: number, isLightMode: boolean, scrollYProgress: any }) {
  // Add an extra step to the total so the final card has a chance to stay on screen
  // before the section unpins.
  const animationSteps = totalSteps + 1;
  const stepSize = 1 / animationSteps;
  const startProgress = index * stepSize;
  const endProgress = (index + 1) * stepSize;

  const yPoints = [];
  const yValues = [];
  const scalePoints = [];
  const scaleValues = [];
  const overlayPoints = [];
  const overlayValues = [];
  
  if (index > 0) {
    if (startProgress > 0) {
      yPoints.push(0, startProgress, endProgress);
      yValues.push("100vh", "100vh", "0vh");
      scalePoints.push(0, startProgress, endProgress);
      scaleValues.push(1, 1, 1);
      overlayPoints.push(0, startProgress, endProgress);
      overlayValues.push(0, 0, 0);
    } else {
      yPoints.push(0, endProgress);
      yValues.push("100vh", "0vh");
      scalePoints.push(0, endProgress);
      scaleValues.push(1, 1);
      overlayPoints.push(0, endProgress);
      overlayValues.push(0, 0);
    }
  } else {
    yPoints.push(0);
    yValues.push("0vh");
    scalePoints.push(0);
    scaleValues.push(1);
    overlayPoints.push(0);
    overlayValues.push(0);
  }
  
  for (let i = index + 1; i < totalSteps; i++) {
    const i_start = i * stepSize;
    const i_end = (i + 1) * stepSize;
    const delayStart = i_start + (i_end - i_start) * 0.7; // Wait until next card is 70% up
    
    yPoints.push(delayStart, i_end);
    yValues.push(`-${(i - index - 1) * 4}vh`, `-${(i - index) * 4}vh`);
    
    scalePoints.push(delayStart, i_end);
    scaleValues.push(1 - (i - index - 1) * 0.05, 1 - (i - index) * 0.05);
    
    overlayPoints.push(delayStart, i_end);
    overlayValues.push((i - index - 1) * 0.3, (i - index) * 0.3);
  }
  
  const y = useTransform(scrollYProgress, yPoints, yValues);
  const scale = useTransform(scrollYProgress, scalePoints, scaleValues);
  const overlayOpacity = useTransform(scrollYProgress, overlayPoints, overlayValues);

  return (
    <motion.div
      className={`absolute w-full rounded-[32px] border p-8 sm:p-12 md:p-16 flex flex-col md:flex-row gap-10 md:gap-16 items-start md:items-center justify-between transition-colors duration-500 origin-top overflow-hidden ${
        isLightMode
          ? "bg-[#f5f7fa] border-black/10 text-black"
          : "bg-[#0a0a0c] border-white/10 text-white"
      }`}
      style={{ 
        y,
        scale,
        zIndex: index + 10,
        boxShadow: isLightMode 
          ? "0 -30px 80px -20px rgba(0,0,0,0.15), 0 25px 50px -12px rgba(0,0,0,0.1)" 
          : "0 -30px 80px -20px rgba(0,0,0,0.6), 0 25px 50px -12px rgba(0,0,0,0.4)"
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-black pointer-events-none z-0"
        style={{ opacity: overlayOpacity }}
        initial={{ opacity: 0 }}
      />
      
      <div className="relative z-10 flex flex-col gap-6 max-w-xl">
        <div className={`font-['Inter'] text-[11px] font-bold uppercase tracking-[0.25em] ${isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"}`}>
          PHASE {step.numeral}
        </div>
        <h3 className={`font-['Inter'] font-black uppercase text-[40px] sm:text-[56px] leading-[0.9] tracking-[-1.5px] ${isLightMode ? "text-black" : "text-white"}`}>
          {step.title}
        </h3>
        <p className={`font-['Inter'] text-[16px] sm:text-[18px] md:text-[20px] font-medium leading-snug mt-2 ${isLightMode ? "text-black/70" : "text-white/70"}`}>
          {step.body}
        </p>
      </div>
      
      <div className={`relative z-10 shrink-0 flex items-center justify-center w-28 h-28 md:w-40 md:h-40 rounded-full border ${isLightMode ? "border-black/10 bg-black/5" : "border-white/10 bg-white/5"}`}>
        <span
          className={`font-['Inter'] text-[12px] md:text-[14px] font-bold tracking-[0.18em] uppercase ${
            isLightMode
              ? "text-black/60"
              : "text-white/60"
          }`}
        >
          {step.tag}
        </span>
      </div>
    </motion.div>
  );
}

function TheEnzyLoop({ isLightMode }: { isLightMode: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative w-full h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center mb-10 md:mb-16 shrink-0 mt-20">
          <p
            className={`font-['Inter'] text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase ${
              isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"
            } mb-6`}
          >
            003 — How it works
          </p>
          <h2 className={`font-['IvyOra_Text'] font-medium text-5xl md:text-7xl leading-[0.95] tracking-[-2px] ${isLightMode ? "text-black" : "text-white"}`}>
            The Enzy Loop
          </h2>
        </div>

        <div className="relative w-full flex-1 flex items-center justify-center min-h-[400px] mb-20 max-w-[1000px] mx-auto">
          {ENZY_LOOP_STEPS.map((step, idx) => (
            <LoopCard 
              key={step.title} 
              step={step} 
              index={idx} 
              totalSteps={ENZY_LOOP_STEPS.length} 
              isLightMode={isLightMode} 
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function About() {
  const { isLightMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const pageTitle = isLightMode ? "text-black" : "text-[#f5f7fa]";
  const pageBody = isLightMode ? "text-black/65" : "text-white/65";

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center justify-start pt-8 md:pt-16 lg:pt-24 pb-16 md:pb-20 z-20 transition-colors duration-500">
      {/* Background glows */}
      <motion.div
        className={`absolute top-[8%] right-[-10%] w-[620px] h-[620px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.10)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none ${
          isLightMode ? "opacity-45" : "opacity-100"
        }`}
        style={{ y: backgroundY }}
      />
      <motion.div
        className={`absolute top-[55%] left-[-12%] w-[560px] h-[560px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.07)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none ${
          isLightMode ? "opacity-45" : "opacity-100"
        }`}
        style={{ y: backgroundY2 }}
      />

      <div className="w-full max-w-6xl px-5 sm:px-6 md:px-8">
        {/* 001 — Who we are */}
        <FadeInSection>
          <section className="pt-2 pb-12 md:pb-16" data-section="001">
            <p
              className={`font-['Inter'] text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase ${
                isLightMode ? "text-black/45" : "text-white/40"
              }`}
            >
              001 — Who we are
            </p>
            <BlurReveal
              as="h1"
              delay={0.1}
              className={`mt-5 font-['IvyOra_Text'] font-medium tracking-[-2px] leading-[1.03] text-[44px] sm:text-[56px] md:text-[72px] ${pageTitle}`}
            >
              Performance is the largest untapped lever in your business.
            </BlurReveal>
            <p
              className={`mt-6 font-['Inter'] text-[16px] md:text-[18px] leading-relaxed max-w-2xl ${pageBody}`}
            >
              EnzyAI is the AI operating layer that turns scattered work data
              into decisions that compound. Built for companies who measure
              themselves by outcomes, not activity.
            </p>

          </section>
        </FadeInSection>

        {/* 002 — The problem */}
        <FadeInSection className="pb-12 md:pb-16">
          <section data-section="002">
            <p
              className={`font-['Inter'] text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase ${
                isLightMode ? "text-black/45" : "text-white/40"
              }`}
            >
              002 — The problem
            </p>

            <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
              <div
                className={`lg:col-span-7 relative rounded-[18px] p-7 md:p-8 border overflow-hidden backdrop-blur-xl liquid-glass ${
                  isLightMode ? "border-black/10 bg-white/55" : "border-white/10 bg-white/[0.05]"
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, rgba(25,173,125,0.18), transparent 58%), radial-gradient(circle at 85% 75%, rgba(25,173,125,0.10), transparent 60%)",
                  }}
                  aria-hidden
                />
                <p className="eyebrow text-[#19ad7d] mb-3">Today</p>
                <p
                  className={`font-['Inter'] text-[20px] md:text-[24px] font-semibold tracking-tight ${
                    isLightMode ? "text-black" : "text-white"
                  }`}
                >
                  Performance data lives in 14 disconnected systems.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {[
                    "CRM",
                    "HRIS",
                    "Field app",
                    "Comp tool",
                    "Spreadsheets",
                    "Slack",
                    "BI dash",
                    "Tickets",
                    "+6 more",
                  ].map((chip) => (
                    <li
                      key={chip}
                      className={`px-3 py-2 rounded-full border text-[12px] font-['Inter'] font-semibold tracking-tight ${
                        isLightMode
                          ? "border-black/10 bg-white/70 text-black/70"
                          : "border-white/12 bg-white/[0.07] text-white/70"
                      }`}
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`lg:col-span-5 relative rounded-[18px] p-7 md:p-8 border overflow-hidden backdrop-blur-xl liquid-glass ${
                  isLightMode ? "border-black/10 bg-white/55" : "border-white/10 bg-white/[0.05]"
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 28%, rgba(25,173,125,0.20), transparent 58%), radial-gradient(circle at 70% 70%, rgba(25,173,125,0.12), transparent 62%)",
                  }}
                  aria-hidden
                />
                <p className="eyebrow text-[#19ad7d] mb-3">With EnzyAI</p>
                <p
                  className={`font-['Inter'] text-[20px] md:text-[24px] font-semibold tracking-tight ${
                    isLightMode ? "text-black" : "text-white"
                  }`}
                >
                  One intelligence layer. Every signal. Every outcome.
                </p>

                <div
                  className={`mt-6 rounded-[18px] h-[220px] md:h-[260px] flex items-center justify-center relative overflow-hidden border ${
                    isLightMode
                      ? "bg-[#19ad7d]/8 border-[#19ad7d]/25"
                      : "bg-[#19ad7d]/12 border-[#19ad7d]/30"
                  }`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.22)_0%,transparent_60%)]" />
                  <span
                    className={`relative font-['Inter'] text-[14px] md:text-[15px] font-extrabold tracking-[0.22em] uppercase ${
                      isLightMode ? "text-black/70" : "text-white/70"
                    }`}
                  >
                    Unified
                  </span>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* Quote */}
        <FadeInSection className="pb-12 md:pb-16">
          <section>
            <blockquote
              className={`relative rounded-[24px] p-8 md:p-10 border transition-colors duration-500 ${
                isLightMode ? "border-black/10 bg-white/40" : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <p
                className={`font-['IvyOra_Text'] text-[28px] md:text-[40px] leading-[1.08] tracking-[-1.2px] ${
                  isLightMode ? "text-black" : "text-white"
                }`}
              >
                “We don&apos;t show you performance — we change it.”
              </p>
              <cite className="mt-6 not-italic flex items-center gap-3">
                <span className="h-px w-10 bg-[#19ad7d]/60" />
                <span
                  className={`font-['Inter'] text-[12px] font-semibold tracking-[0.18em] uppercase ${
                    isLightMode ? "text-black/50" : "text-white/45"
                  }`}
                >
                  Founding principle, 2023
                </span>
              </cite>
            </blockquote>
          </section>
        </FadeInSection>

        {/* 003 — How it works */}
        <FadeInSection className="pb-[20vh] max-w-none px-0">
          <TheEnzyLoop isLightMode={isLightMode} />
        </FadeInSection>

        {/* 004 — What we've learned */}
        <FadeInSection className="pb-12 md:pb-16">
          <section data-section="004">
            <p
              className={`font-['Inter'] text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase ${
                isLightMode ? "text-black/45" : "text-white/40"
              }`}
            >
              004 — What we&apos;ve learned
            </p>

            <dl className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
              {[
                { value: "2.4", unit: "B", label: "Behavioral signals processed" },
                { value: "31", unit: "%", label: "Median revenue lift, year one" },
                { value: "140", unit: "+", label: "Enterprise deployments" },
                { value: "9", unit: "mo", label: "Average payback period" },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`pb-6 border-b ${
                    isLightMode ? "border-black/10" : "border-white/10"
                  }`}
                >
                  <dt
                    className={`font-['Inter'] font-extrabold tracking-[-2px] leading-none ${
                      isLightMode ? "text-black" : "text-white"
                    } text-[48px] md:text-[56px]`}
                  >
                    {s.value}
                    <span
                      className={`ml-1 text-[16px] md:text-[18px] font-bold tracking-tight ${
                        isLightMode ? "text-black/60" : "text-white/55"
                      }`}
                    >
                      {s.unit}
                    </span>
                  </dt>
                  <dd
                    className={`mt-3 font-['Inter'] text-[13px] md:text-[14px] leading-relaxed ${
                      isLightMode ? "text-black/60" : "text-white/60"
                    }`}
                  >
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </FadeInSection>

        {/* 005 — The people */}
        <FadeInSection className="pb-12 md:pb-16">
          <section data-section="005">
            <p
              className={`font-['Inter'] text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase ${
                isLightMode ? "text-black/45" : "text-white/40"
              }`}
            >
              005 — The people
            </p>

            <ul className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  initials: "SK",
                  color: "purple",
                  name: "Sarah Kavanagh",
                  role: "Co-founder, CEO",
                  bio: "12 years building enterprise data systems. Previously led performance analytics at Salesforce.",
                },
                {
                  initials: "DM",
                  color: "teal",
                  name: "Daniel Moreno",
                  role: "Co-founder, CTO",
                  bio: "Ex-Google DeepMind. Built ML pipelines for ranking and personalization at scale.",
                },
                {
                  initials: "PR",
                  color: "coral",
                  name: "Priya Raman",
                  role: "Head of Research",
                  bio: "PhD organizational behavior, MIT. Published on incentive design and team performance.",
                },
              ].map((p) => {
                const portraitBg =
                  p.color === "purple"
                    ? "bg-[linear-gradient(180deg,rgba(128,90,213,0.22),rgba(128,90,213,0.08))]"
                    : p.color === "teal"
                      ? "bg-[linear-gradient(180deg,rgba(25,173,125,0.22),rgba(25,173,125,0.08))]"
                      : "bg-[linear-gradient(180deg,rgba(255,107,107,0.20),rgba(255,107,107,0.07))]";
                const portraitRing =
                  p.color === "purple"
                    ? "ring-[rgba(128,90,213,0.35)]"
                    : p.color === "teal"
                      ? "ring-[#19ad7d]/35"
                      : "ring-[rgba(255,107,107,0.32)]";

                return (
                  <li
                    key={p.name}
                    className={`pt-1`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ring-1 ring-inset ${portraitBg} ${portraitRing}`}
                    >
                      <span
                        className={`font-['Inter'] font-extrabold tracking-[0.12em] ${
                          isLightMode ? "text-black/75" : "text-white/75"
                        }`}
                      >
                        {p.initials}
                      </span>
                    </div>

                    <p
                      className={`mt-5 font-['Inter'] text-[16px] font-semibold ${
                        isLightMode ? "text-black" : "text-white"
                      }`}
                    >
                      {p.name}
                    </p>
                    <p
                      className={`mt-1 font-['Inter'] text-[12px] font-semibold tracking-[0.18em] uppercase ${
                        isLightMode ? "text-black/50" : "text-white/45"
                      }`}
                    >
                      {p.role}
                    </p>
                    <p
                      className={`mt-4 font-['Inter'] text-[14px] leading-relaxed ${
                        isLightMode ? "text-black/65" : "text-white/65"
                      }`}
                    >
                      {p.bio}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        </FadeInSection>

        {/* Backed by */}
        <FadeInSection className="pb-12 md:pb-16">
          <section>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="eyebrow text-[#19ad7d] m-0">Backed by</p>
              <ul className="flex flex-wrap gap-3">
                {["Sequoia", "Index Ventures", "Lightspeed", "Y Combinator"].map(
                  (i) => (
                    <li
                      key={i}
                      className={`px-4 py-2 rounded-full border text-[12px] font-['Inter'] font-semibold tracking-tight ${
                        isLightMode
                          ? "border-black/10 bg-white/60 text-black/70"
                          : "border-white/12 bg-white/[0.05] text-white/70"
                      }`}
                    >
                      {i}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </section>
        </FadeInSection>

        {/* 006 — Next */}
        <FadeInSection className="pb-12 md:pb-16">
          <section data-section="006">
            <p
              className={`font-['Inter'] text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase ${
                isLightMode ? "text-black/45" : "text-white/40"
              }`}
            >
              006 — Next
            </p>

            <div
              className={`mt-7 relative rounded-[40px] p-10 md:p-16 text-center flex flex-col items-center overflow-hidden group transition-all duration-500 liquid-glass ${
                isLightMode
                  ? "border-[#19ad7d]/20 bg-[#19ad7d]/5"
                  : "border-[#19ad7d]/30 bg-[linear-gradient(189.6deg,rgba(25,173,125,0.15)_25.1%,rgba(20,144,103,0.05)_64.2%)]"
              }`}
            >
              <div
                className={`absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(25,173,125,0.2)_0%,transparent_70%)] transition-opacity duration-700 pointer-events-none ${
                  isLightMode
                    ? "opacity-20 group-hover:opacity-40"
                    : "opacity-50 group-hover:opacity-100"
                }`}
              />

              <h2
                className={`relative z-10 font-['IvyOra_Text'] font-medium tracking-[-2px] leading-[1.05] text-3xl md:text-5xl ${
                  isLightMode ? "text-black" : "text-white"
                }`}
              >
                See what your performance data is{" "}
                <em className="not-italic text-[#19ad7d]">trying to tell you.</em>
              </h2>

              <div className="relative z-10 mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto max-w-md sm:max-w-none">
                <CTAButton
                  href={BOOK_DEMO_HREF}
                  variant="primary"
                  className="w-full sm:w-auto justify-center px-8 py-4 gap-3 font-bold text-sm uppercase tracking-widest hover:scale-[1.02] hover:!opacity-100 shadow-[0_0_28px_rgba(25,173,125,0.35)]"
                >
                  Book a demo <ArrowRight size={18} aria-hidden />
                </CTAButton>
                <Link
                  href="/resources"
                  className={`w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 font-['Inter'] text-sm font-semibold rounded-full transition-colors ${
                    isLightMode
                      ? "text-black/70 hover:text-black hover:bg-black/5 border border-black/10"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06] border border-white/10"
                  }`}
                >
                  Read customer stories →
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* About footer */}
        <footer className="pt-2 pb-6">
          <div
            className={`flex flex-col md:flex-row md:items-center md:justify-between gap-2 font-['Inter'] text-[12px] tracking-tight ${
              isLightMode ? "text-black/45" : "text-white/40"
            }`}
          >
            <p className="m-0">© EnzyAI 2026</p>
            <p className="m-0">San Francisco · London</p>
          </div>
        </footer>

      </div>
    </div>
  );
}

