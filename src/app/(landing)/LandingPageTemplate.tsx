"use client";

import React from "react";
import { motion } from "motion/react";

import type { LandingPageConfigMarketing } from "./lp/config/types";
import { LandingProductVideo } from "../components/landing/LandingProductVideo";
import { LpBookDemoInline, LpBookDemoScrollShell } from "../components/landing/LpBookDemoScroll";
import { LpSingleTestimonial } from "../components/landing/LpSingleTestimonial";
import { EvidenceSection } from "../components/EvidenceSection";
import { ClosingCTASection } from "../components/ClosingCTASection";
import { TESTIMONIALS } from "../components/TestimonialsSection";

function LandingHero({ config }: { config: LandingPageConfigMarketing }) {
  const hero = config.hero;

  return (
    <section className="relative w-full flex flex-col items-center pt-8 md:pt-16 lg:pt-20 pb-8 md:pb-10 overflow-hidden">
      <div className="max-w-3xl w-full px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div
            className="px-5 py-2 rounded-full border backdrop-blur-sm mb-6 md:mb-8 transition-colors duration-500 eyebrow border-black/10 bg-black/5 text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60"
          >
            {hero.eyebrow}
          </div>

          <h1
            className="font-ivyora font-medium text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.05] tracking-[-2px] text-center transition-colors duration-500 text-black dark:text-[#f5f7fa]"
          >
            <span className="block">{hero.headline}</span>
            {hero.highlight ? (
              <span className="block mt-1 text-[#19ad7d]">{hero.highlight}</span>
            ) : null}
          </h1>

          <p
            className="font-inter text-base md:text-lg mt-6 max-w-xl text-center leading-relaxed transition-colors duration-500 text-black/60 dark:text-white/55"
          >
            {hero.subhead}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function LandingPageTemplate({ config }: { config: LandingPageConfigMarketing }) {
  return (
    <LpBookDemoScrollShell href="#lp-demo" label="Book a Demo">
      <div className="relative w-full pb-32 md:pb-36 lg:pb-40">
        <LandingHero config={config} />
        {config.productVideo ? <LandingProductVideo {...config.productVideo} /> : null}
        
        {/* Confidence Boosters */}
        <EvidenceSection variant="lp" />
        <LpSingleTestimonial testimonial={TESTIMONIALS[1]} />
      </div>
    </LpBookDemoScrollShell>
  );
}
