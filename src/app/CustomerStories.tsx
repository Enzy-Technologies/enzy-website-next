"use client";

import React from "react";
import { motion } from "motion/react";
import { BlurReveal } from "./components/BlurReveal";
import { CTAButton } from "./components/CTAButton";

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
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Placeholder stories until real case studies are wired in.
const STORIES = [
  {
    industry: "Solar",
    title: "Cutting admin time so reps sell more",
    blurb:
      "How a field solar team unified activity and incentives to free up selling hours.",
  },
  {
    industry: "Pest Control",
    title: "Turning daily activity into momentum",
    blurb:
      "A multi-branch operator used leaderboards and competitions to lift consistency.",
  },
  {
    industry: "Direct Sales",
    title: "Making coaching a daily habit",
    blurb:
      "Managers moved from weekly check-ins to real-time signal and faster coaching loops.",
  },
];

export function CustomerStories() {
  return (
    <main className="relative w-full pb-24 md:pb-32">
      {/* Hero */}
      <section className="relative w-full px-4 pt-7 md:pt-10 pb-10 md:pb-12 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div className="enzy-hero-reveal flex flex-col items-center max-w-4xl">
            <h1 className="font-ivyora font-medium text-[40px] sm:text-[50px] md:text-[64px] leading-[1.05] tracking-[-2px] text-center transition-colors duration-500 text-brand-dark dark:text-brand-light">
              <BlurReveal as="span" delay={0.1}>Numbers they&apos;d </BlurReveal>
              <BlurReveal as="span" delay={0.46} className="italic">never seen before.</BlurReveal>
            </h1>

            <p className="font-inter text-lg md:text-xl mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 text-black/60 dark:text-white/60">
              How real teams use Enzy to turn activity into momentum, and
              momentum into revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Placeholder story grid */}
      <section className="relative w-full px-4 max-w-6xl mx-auto pt-8 md:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {STORIES.map((s, i) => (
            <FadeInSection key={s.title} delay={i * 0.08} className="flex">
              <div className="flex w-full flex-col gap-4 rounded-[24px] border p-7 transition-colors border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.03]">
                <span className="font-inter text-[11px] font-bold uppercase tracking-[0.18em] text-[#19ad7d]">
                  {s.industry}
                </span>
                <h3 className="font-ivyora font-medium text-[22px] tracking-tight text-black dark:text-white">
                  {s.title}
                </h3>
                <p className="font-inter text-[15px] leading-relaxed text-black/65 dark:text-white/65">
                  {s.blurb}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 font-inter text-[13px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
                  Case study coming soon
                </span>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Closing CTA */}
        <FadeInSection className="mt-16 flex flex-col items-center text-center">
          <h2 className="font-ivyora font-medium text-3xl md:text-4xl tracking-[-1px] text-black dark:text-white">
            Want to be our next story?
          </h2>
          <p className="font-inter text-base md:text-lg mt-4 max-w-xl leading-relaxed text-black/60 dark:text-white/60">
            See what Enzy can do for your team.
          </p>
          <div className="mt-8">
            <CTAButton
              href="/book-a-demo"
              variant="primary"
              className="px-8 py-4 font-semibold text-[14px]"
            >
              Book a Demo
            </CTAButton>
          </div>
        </FadeInSection>
      </section>
    </main>
  );
}
