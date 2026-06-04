"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
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

// Opens the dedicated affiliate modal (AffiliateFormModal). It currently reuses
// the partner HubSpot form, but lives in its own component so the real affiliate
// form can be dropped in without touching the "Become a Partner" modal.
function openAffiliateModal() {
  window.dispatchEvent(new CustomEvent("open-affiliate-modal"));
}

const STEPS = [
  {
    n: "1",
    title: "Apply",
    desc: "Fill out the form below and tell us about your audience or network. We'll review your application within 2 business days.",
  },
  {
    n: "2",
    title: "Get Approved",
    desc: "Once approved, you'll get everything you need to start sharing Enzy with your network.",
  },
  {
    n: "3",
    title: "Send Referrals",
    desc: "Refer sales organizations to Enzy and earn 10% on the first-year ARR for every referral that signs.",
  },
];

const FIELD_SALES = [
  "Solar",
  "Pest Control",
  "Roofing & Construction",
  "Home Services",
  "Real Estate",
];

const VIRTUAL_SALES = [
  "Call Centers",
  "Direct Sales",
  "Insurance Sales",
  "Financial Services",
  "Real Estate Brokerages",
];

function AudienceColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-[24px] border p-7 transition-colors border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.03]">
      <h3 className="font-inter text-[13px] font-bold uppercase tracking-[0.18em] text-[#19ad7d]">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#19ad7d]" />
            <span className="font-inter text-[15px] font-medium leading-snug text-black/80 dark:text-white/80">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AffiliateProgram() {
  return (
    <main className="relative w-full pb-24 md:pb-32">
      {/* Hero */}
      <section className="relative w-full px-4 pt-7 md:pt-10 pb-10 md:pb-12 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div className="enzy-hero-reveal flex flex-col items-center max-w-4xl">
            <BlurReveal
              as="h1"
              className="font-ivyora font-medium text-[40px] sm:text-[50px] md:text-[64px] leading-[1.05] tracking-[-2px] text-center transition-colors duration-500 text-brand-dark dark:text-brand-light"
            >
              Affiliate Program
            </BlurReveal>

            <p className="font-inter text-lg md:text-xl mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 text-black/60 dark:text-white/60">
              We team up with the tools, services, and companies that our
              customers rely on to grow their sales organization. If you have a
              strong network of sales leaders and an understanding of tools that
              help teams grow, apply to be an affiliate today.
            </p>

            <div className="mt-10">
              <CTAButton
                variant="primary"
                onClick={openAffiliateModal}
                className="px-8 py-4 font-semibold text-[14px]"
              >
                Become an Affiliate
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative w-full px-4 max-w-6xl mx-auto pt-12 md:pt-16">
        <FadeInSection>
          <h2 className="font-ivyora font-medium text-3xl md:text-5xl tracking-[-1px] text-center text-black dark:text-white">
            How it Works
          </h2>
        </FadeInSection>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {STEPS.map((step, i) => (
            <FadeInSection key={step.title} delay={i * 0.08} className="flex">
              <div className="flex w-full flex-col gap-4 rounded-[24px] border p-7 transition-colors border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.03]">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-[#19ad7d]/12 border-[#19ad7d]/30 font-inter text-[18px] font-bold text-[#19ad7d]">
                  {step.n}
                </span>
                <h3 className="font-inter text-[18px] font-bold tracking-tight text-black dark:text-white">
                  {step.title}
                </h3>
                <p className="font-inter text-[15px] leading-relaxed text-black/70 dark:text-white/70">
                  {step.desc}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Who we sell to */}
      <section className="relative w-full px-4 max-w-6xl mx-auto pt-20 md:pt-28">
        <FadeInSection>
          <h2 className="font-ivyora font-medium text-3xl md:text-5xl tracking-[-1px] text-center text-black dark:text-white">
            Who we sell to
          </h2>
        </FadeInSection>

        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          <FadeInSection className="flex">
            <AudienceColumn title="Field Sales" items={FIELD_SALES} />
          </FadeInSection>
          <FadeInSection delay={0.08} className="flex">
            <AudienceColumn title="Virtual Sales" items={VIRTUAL_SALES} />
          </FadeInSection>
        </div>

        <FadeInSection>
          <p className="mt-8 text-center font-inter text-[15px] font-bold uppercase tracking-[0.18em] text-black/50 dark:text-white/50">
            & More
          </p>
        </FadeInSection>

        <FadeInSection className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={openAffiliateModal}
            className="group inline-flex items-center gap-2 font-inter text-[16px] font-semibold text-[#19ad7d] transition-colors hover:text-[#148a64]"
          >
            Become an Affiliate Today
            <ArrowRight
              size={16}
              strokeWidth={2.25}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </FadeInSection>
      </section>
    </main>
  );
}
