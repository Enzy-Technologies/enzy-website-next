const fs = require('fs');
const path = './src/app/About.tsx';

const newContent = `"use client";

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
        className={\`absolute top-[8%] right-[-10%] w-[620px] h-[620px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.10)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none \${
          isLightMode ? "opacity-45" : "opacity-100"
        }\`}
        style={{ y: backgroundY }}
      />
      <motion.div
        className={\`absolute top-[55%] left-[-12%] w-[560px] h-[560px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.07)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none \${
          isLightMode ? "opacity-45" : "opacity-100"
        }\`}
        style={{ y: backgroundY2 }}
      />

      <div className="w-full max-w-6xl px-5 sm:px-6 md:px-8">
        {/* 001 — Who we are */}
        <FadeInSection>
          <section className="pt-2 pb-16 md:pb-24" data-section="001">
            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-black/45" : "text-white/40"
              }\`}
            >
              001 — Who we are
            </p>
            <BlurReveal
              as="h1"
              delay={0.1}
              className={\`mt-5 font-ivyora font-medium tracking-[-2px] leading-[0.95] text-[44px] sm:text-[56px] md:text-[72px] \${pageTitle}\`}
            >
              Performance is the largest untapped lever in your business.
            </BlurReveal>
            <p
              className={\`mt-6 font-inter text-[16px] md:text-[18px] leading-relaxed max-w-2xl \${pageBody}\`}
            >
              EnzyAI is the AI operating layer that turns scattered work data
              into decisions that compound. Built for companies who measure
              themselves by outcomes, not activity.
            </p>
          </section>
        </FadeInSection>

        {/* 002 — What we've learned */}
        <FadeInSection className="pb-16 md:pb-24">
          <section data-section="002">
            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"
              }\`}
            >
              002 — What we've learned
            </p>

            <div className={\`mt-8 p-8 md:p-12 lg:p-16 rounded-[40px] border transition-all duration-500 liquid-glass \${
              isLightMode
                ? "border-[#19ad7d]/20 bg-[#19ad7d]/[0.03]"
                : "border-[#19ad7d]/30 bg-[linear-gradient(189.6deg,rgba(25,173,125,0.08)_25.1%,rgba(20,144,103,0.02)_64.2%)]"
            }\`}>
              <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
                {[
                  { value: "2.4", unit: "B", label: "Behavioral signals processed" },
                  { value: "31", unit: "%", label: "Median revenue lift, year one" },
                  { value: "140", unit: "+", label: "Enterprise deployments" },
                  { value: "9", unit: "mo", label: "Average payback period" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt
                      className={\`font-inter font-extrabold tracking-[-2px] leading-none \${
                        isLightMode ? "text-black" : "text-white"
                      } text-[56px] md:text-[64px]\`}
                    >
                      {s.value}
                      <span
                        className={\`ml-1 text-[20px] font-bold tracking-tight \${
                          isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"
                        }\`}
                      >
                        {s.unit}
                      </span>
                    </dt>
                    <dd
                      className={\`mt-4 font-inter text-[14px] md:text-[15px] font-medium leading-relaxed \${
                        isLightMode ? "text-black/70" : "text-white/70"
                      }\`}
                    >
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </FadeInSection>

        {/* 003 — Our System (Slide Content) */}
        <FadeInSection className="pb-20 md:pb-32">
          <section data-section="003">
            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-black/45" : "text-white/40"
              }\`}
            >
              003 — Our System
            </p>

            <div className="mt-8 max-w-4xl">
              <h2 className={\`font-ivyora font-medium text-[36px] sm:text-[48px] md:text-[56px] leading-[1.1] tracking-[-1px] \${isLightMode ? "text-black" : "text-white"}\`}>
                We provide intelligent, real-time performance systems that improve execution, increase accountability, and help teams drive measurable sales growth.
              </h2>
              
              <div className={\`mt-12 mb-12 h-[1px] w-full max-w-2xl \${isLightMode ? "bg-black/10" : "bg-white/10"}\`} />

              <div className="max-w-3xl">
                <h3 className={\`font-inter text-[20px] md:text-[24px] font-bold tracking-tight mb-8 \${isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"}\`}>
                  Key Solutions :
                </h3>
                
                <div className="flex flex-col gap-6">
                  <div className={\`pb-6 border-b \${isLightMode ? "border-black/10" : "border-white/10"}\`}>
                    <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                      <strong className={isLightMode ? "text-black font-bold" : "text-white font-bold"}>Integrate:</strong> Bring your systems into an intelligent ecosystem.
                    </p>
                  </div>
                  <div className={\`pb-6 border-b \${isLightMode ? "border-black/10" : "border-white/10"}\`}>
                    <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                      <strong className={isLightMode ? "text-black font-bold" : "text-white font-bold"}>Activate:</strong> EnzyAI provides actionable insight & performance recommendations.
                    </p>
                  </div>
                  <div className={\`pb-6 border-b \${isLightMode ? "border-black/10" : "border-white/10"}\`}>
                    <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                      <strong className={isLightMode ? "text-black font-bold" : "text-white font-bold"}>Accelerate:</strong> Turn momentum into sustained performance and revenue growth.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-16">
                <p className={\`font-inter text-[12px] font-bold tracking-widest uppercase \${isLightMode ? "text-black/50" : "text-white/50"}\`}>
                  Create Momentum™
                </p>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* 004 — The people */}
        <FadeInSection className="pb-16 md:pb-24">
          <section data-section="004">
            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-black/45" : "text-white/40"
              }\`}
            >
              004 — The people
            </p>

            <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
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
                    className={\`pt-1\`}
                  >
                    <div
                      className={\`w-16 h-16 rounded-full flex items-center justify-center ring-1 ring-inset \${portraitBg} \${portraitRing}\`}
                    >
                      <span
                        className={\`font-inter font-extrabold tracking-[0.12em] \${
                          isLightMode ? "text-black/75" : "text-white/75"
                        }\`}
                      >
                        {p.initials}
                      </span>
                    </div>

                    <p
                      className={\`mt-5 font-inter text-[16px] font-semibold \${
                        isLightMode ? "text-black" : "text-white"
                      }\`}
                    >
                      {p.name}
                    </p>
                    <p
                      className={\`mt-1 font-inter text-[12px] font-semibold tracking-[0.18em] uppercase \${
                        isLightMode ? "text-black/50" : "text-white/45"
                      }\`}
                    >
                      {p.role}
                    </p>
                    <p
                      className={\`mt-4 font-inter text-[14px] leading-relaxed \${
                        isLightMode ? "text-black/65" : "text-white/65"
                      }\`}
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
        <FadeInSection className="pb-16 md:pb-24">
          <section>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="eyebrow text-[#19ad7d] m-0">Backed by</p>
              <ul className="flex flex-wrap gap-3">
                {["Sequoia", "Index Ventures", "Lightspeed", "Y Combinator"].map(
                  (i) => (
                    <li
                      key={i}
                      className={\`px-4 py-2 rounded-full border text-[12px] font-inter font-semibold tracking-tight \${
                        isLightMode
                          ? "border-black/10 bg-white/60 text-black/70"
                          : "border-white/12 bg-white/[0.05] text-white/70"
                      }\`}
                    >
                      {i}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </section>
        </FadeInSection>

        {/* 005 — Next */}
        <FadeInSection className="pb-12 md:pb-16">
          <section data-section="005">
            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-black/45" : "text-white/40"
              }\`}
            >
              005 — Next
            </p>

            <div
              className={\`mt-7 relative rounded-[40px] p-10 md:p-16 text-center flex flex-col items-center overflow-hidden group transition-all duration-500 liquid-glass \${
                isLightMode
                  ? "border-[#19ad7d]/20 bg-[#19ad7d]/5"
                  : "border-[#19ad7d]/30 bg-[linear-gradient(189.6deg,rgba(25,173,125,0.15)_25.1%,rgba(20,144,103,0.05)_64.2%)]"
              }\`}
            >
              <div
                className={\`absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(25,173,125,0.2)_0%,transparent_70%)] transition-opacity duration-700 pointer-events-none \${
                  isLightMode
                    ? "opacity-20 group-hover:opacity-40"
                    : "opacity-50 group-hover:opacity-100"
                }\`}
              />

              <h2
                className={\`relative z-10 font-ivyora font-medium tracking-[-2px] leading-[0.95] text-3xl md:text-5xl \${
                  isLightMode ? "text-black" : "text-white"
                }\`}
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
                  className={\`w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 font-inter text-sm font-semibold rounded-full transition-colors \${
                    isLightMode
                      ? "text-black/70 hover:text-black hover:bg-black/5 border border-black/10"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06] border border-white/10"
                  }\`}
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
            className={\`flex flex-col md:flex-row md:items-center md:justify-between gap-2 font-inter text-[12px] tracking-tight \${
              isLightMode ? "text-black/45" : "text-white/40"
            }\`}
          >
            <p className="m-0">© EnzyAI 2026</p>
            <p className="m-0">San Francisco · London</p>
          </div>
        </footer>

      </div>
    </div>
  );
}
`;

fs.writeFileSync(path, newContent);
console.log('Updated About.tsx');
