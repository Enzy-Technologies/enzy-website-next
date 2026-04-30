"use client";

import React, { Suspense, lazy } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import type { LandingPageConfig, LandingSectionKey } from "./lp/config/types";
import { useTheme } from "../components/ThemeProvider";
import { CTAButton } from "../components/CTAButton";
import { LandingSocialProofStrip } from "../components/landing/LandingSocialProofStrip";
import { LandingProductVideo } from "../components/landing/LandingProductVideo";
import { LandingStickyDemoCta } from "../components/landing/LandingStickyDemoCta";

const HowItWorksSection = lazy(() =>
  import("../components/HowItWorksSectionLegacy").then((m) => ({
    default: m.HowItWorksSectionLegacy,
  }))
);
const FeaturesSection = lazy(() =>
  import("../components/FeaturesSection").then((m) => ({ default: m.FeaturesSection }))
);
const BenefitsSection = lazy(() =>
  import("../components/BenefitsSection").then((m) => ({ default: m.BenefitsSection }))
);
const IntegrationsSection = lazy(() =>
  import("../components/IntegrationsSection").then((m) => ({ default: m.IntegrationsSection }))
);
const SpecsSection = lazy(() =>
  import("../components/SpecsSection").then((m) => ({ default: m.SpecsSection }))
);
const TestimonialsSection = lazy(() =>
  import("../components/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection }))
);
const FAQSection = lazy(() => import("../components/FAQSection").then((m) => ({ default: m.FAQSection })));

const SectionFallback = () => <div className="min-h-[280px] w-full animate-pulse bg-transparent" />;

function LandingHero({ config }: { config: LandingPageConfig }) {
  const { isLightMode } = useTheme();
  const hero = config.hero;

  return (
    <section className="relative w-full flex flex-col items-center pt-8 md:pt-16 lg:pt-20 pb-10 md:pb-14 overflow-hidden">
      <div className="max-w-3xl w-full px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div
            className={`px-5 py-2 rounded-full border backdrop-blur-sm mb-6 md:mb-8 transition-colors duration-500 eyebrow ${
              isLightMode ? "border-black/10 bg-black/5 text-black/60" : "border-white/10 bg-white/5 text-white/60"
            }`}
          >
            {hero.eyebrow}
          </div>

          <h1
            className={`font-['IvyOra_Text'] font-medium text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[80px] leading-[0.98] tracking-[-2px] text-center transition-colors duration-500 ${
              isLightMode ? "text-black" : "text-[#f5f7fa]"
            }`}
          >
            <span className="block">{hero.headline}</span>
            {hero.highlight ? (
              <span className="block mt-1 text-[#19ad7d]">{hero.highlight}</span>
            ) : null}
          </h1>

          <p
            className={`font-['Inter'] text-base md:text-lg mt-6 max-w-xl text-center leading-relaxed transition-colors duration-500 ${
              isLightMode ? "text-black/60" : "text-white/55"
            }`}
          >
            {hero.subhead}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto max-w-md sm:max-w-none">
            <CTAButton
              href={hero.primaryCta.href}
              variant="primary"
              className="w-full sm:w-auto justify-center rounded-full px-7 py-3.5 gap-3 font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 hover:!opacity-100 shadow-[0_0_28px_rgba(25,173,125,0.3)]"
            >
              {hero.primaryCta.label} <ArrowRight size={18} aria-hidden />
            </CTAButton>

            {hero.secondaryCta ? (
              <CTAButton
                href={hero.secondaryCta.href}
                variant="secondary"
                className="w-full sm:w-auto justify-center rounded-full px-6 py-3.5 text-sm font-semibold"
              >
                {hero.secondaryCta.label}
              </CTAButton>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function renderSection(key: LandingSectionKey, config: LandingPageConfig): React.ReactNode {
  switch (key) {
    case "socialProof":
      if (!config.socialProof) return null;
      return <LandingSocialProofStrip {...config.socialProof} />;
    case "productVideo":
      if (!config.productVideo) return null;
      return <LandingProductVideo {...config.productVideo} />;
    case "howItWorks":
      return <HowItWorksSection variant="landing" />;
    case "features":
      return <FeaturesSection />;
    case "benefits":
      return <BenefitsSection />;
    case "integrations":
      return <IntegrationsSection />;
    case "specs":
      return <SpecsSection />;
    case "testimonials":
      return <TestimonialsSection />;
    case "faq":
      return <FAQSection />;
    default:
      return null;
  }
}

export function LandingPageTemplate({ config }: { config: LandingPageConfig }) {
  const demo = config.hero.primaryCta;

  return (
    <>
      <LandingHero config={config} />
      <Suspense fallback={<SectionFallback />}>
        {config.sections.map((s) => (
          <React.Fragment key={s}>{renderSection(s, config)}</React.Fragment>
        ))}
      </Suspense>
      <LandingStickyDemoCta href={demo.href} label={demo.label} />
    </>
  );
}
