"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BlurReveal } from "./components/BlurReveal";
import { CTAButton } from "./components/CTAButton";
import { BOOK_DEMO_HREF, BOOK_DEMO_CTA_STYLE } from "./lib/booking";

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
        <FadeInSection className="flex items-center justify-center py-20 md:py-28">
          <p className="font-ivyora font-medium text-2xl md:text-3xl tracking-[-0.5px] text-center text-black/70 dark:text-white/70">
            Customer stories coming soon.
          </p>
        </FadeInSection>

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
              href={BOOK_DEMO_HREF}
              variant="primary"
              className={`px-8 py-4 gap-2 text-[14px] ${BOOK_DEMO_CTA_STYLE}`}
            >
              Book a Demo <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
            </CTAButton>
          </div>
        </FadeInSection>
      </section>
    </main>
  );
}
