"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Database,
  Link2,
  MessagesSquare,
  Network,
  Sparkles,
  Target,
  Trophy,
  Workflow,
} from "lucide-react";
import { motion } from "motion/react";
import { CTAButton } from "./components/CTAButton";
import { useTheme } from "./components/ThemeProvider";
import { BOOK_DEMO_HREF } from "./lib/booking";
import Link from "next/link";

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

function BulletList({
  items,
  isLightMode,
  columns = 1,
}: {
  items: string[];
  isLightMode: boolean;
  columns?: 1 | 2;
}) {
  return (
    <ul
      className={`mt-4 grid gap-x-10 gap-y-2.5 ${
        columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3">
          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#19ad7d] shrink-0 shadow-[0_0_10px_rgba(25,173,125,0.45)]" />
          <span
            className={`font-['Inter'] text-[14px] leading-snug ${
              isLightMode ? "text-black/75" : "text-white/75"
            }`}
          >
            {b}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function About() {
  const { isLightMode } = useTheme();

  const pageTitle = isLightMode ? "text-black" : "text-[#f5f7fa]";
  const pageBody = isLightMode ? "text-black/65" : "text-white/65";

  return (
    <div className="relative w-full flex flex-col items-center justify-start pt-8 md:pt-16 lg:pt-24 pb-16 md:pb-20 overflow-hidden z-20 transition-colors duration-500">
      {/* Background glows */}
      <div
        className={`absolute top-[8%] right-[-10%] w-[620px] h-[620px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.10)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none ${
          isLightMode ? "opacity-45" : "opacity-100"
        }`}
      />
      <div
        className={`absolute top-[55%] left-[-12%] w-[560px] h-[560px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.07)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none ${
          isLightMode ? "opacity-45" : "opacity-100"
        }`}
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
            <h1
              className={`mt-5 font-['IvyOra_Text'] font-medium tracking-[-2px] leading-[1.03] text-[44px] sm:text-[56px] md:text-[72px] ${pageTitle}`}
            >
              Performance is the largest{" "}
              <em className="not-italic text-[#19ad7d]">untapped lever</em> in
              your business.
            </h1>
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
                className={`lg:col-span-7 relative rounded-[18px] p-7 md:p-8 border ${
                  isLightMode ? "border-black/10 bg-white/40" : "border-white/10 bg-white/[0.03]"
                }`}
              >
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
                          ? "border-black/10 bg-white/60 text-black/70"
                          : "border-white/12 bg-white/[0.05] text-white/70"
                      }`}
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`lg:col-span-5 relative rounded-[18px] p-7 md:p-8 border ${
                  isLightMode ? "border-black/10 bg-white/40" : "border-white/10 bg-white/[0.03]"
                }`}
              >
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
        <FadeInSection className="pb-12 md:pb-16">
          <section data-section="003">
            <p
              className={`font-['Inter'] text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase ${
                isLightMode ? "text-black/45" : "text-white/40"
              }`}
            >
              003 — How it works
            </p>

            <ol className="mt-7 flex flex-col">
              {[
                {
                  numeral: "i.",
                  title: "Unify",
                  body: "Behavioral, organizational, and transactional data flow into one connected performance graph.",
                  tag: "Data",
                },
                {
                  numeral: "ii.",
                  title: "Decide",
                  body: "AI agents identify what top performers do differently — and surface the actions that move the metric.",
                  tag: "AI",
                },
                {
                  numeral: "iii.",
                  title: "Compound",
                  body: "Coaching, workflows, and incentives adapt in real time. Every cycle, the system gets sharper.",
                  tag: "Loop",
                },
              ].map((s) => (
                <li
                  key={s.title}
                  className={`py-8 md:py-10 border-b ${
                    isLightMode ? "border-black/10" : "border-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-start gap-5">
                      <span
                        className={`font-['Inter'] text-[14px] font-extrabold tracking-[0.22em] uppercase mt-1 ${
                          isLightMode ? "text-black/45" : "text-white/40"
                        }`}
                      >
                        {s.numeral}
                      </span>
                      <div>
                        <h3
                          className={`font-['Inter'] text-[22px] md:text-[26px] font-semibold tracking-tight ${
                            isLightMode ? "text-black" : "text-white"
                          }`}
                        >
                          {s.title}
                        </h3>
                        <p
                          className={`mt-2 font-['Inter'] text-[14px] md:text-[15px] leading-relaxed ${
                            isLightMode ? "text-black/65" : "text-white/65"
                          }`}
                        >
                          {s.body}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 px-3 py-2 rounded-full border text-[12px] font-['Inter'] font-bold tracking-[0.18em] uppercase ${
                        isLightMode
                          ? "border-black/10 bg-white/60 text-black/60"
                          : "border-white/12 bg-white/[0.05] text-white/60"
                      }`}
                    >
                      {s.tag}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </section>
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

