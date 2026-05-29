"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "./components/ThemeProvider";
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

type Partner = {
  name: string;
  /** Brand domain used to fetch the logo. */
  domain: string;
  url: string;
  category: string;
  blurb: string;
};

const PARTNERS: Partner[] = [
  {
    name: "Sequifi",
    domain: "sequifi.com",
    url: "https://sequifi.com/",
    category: "HR & Payroll",
    blurb:
      "An all-in-one HR, payroll, and commission platform built to help commission-driven sales teams hire, pay, and scale.",
  },
  {
    name: "Stakt",
    domain: "stakt.io",
    url: "https://stakt.io/",
    category: "Commissions",
    blurb:
      "Commission automation software that calculates, tracks, and pays out complex field-sales commissions accurately and on time.",
  },
  {
    name: "Truwear",
    domain: "truwear.com",
    url: "https://www.truwear.com/",
    category: "Apparel",
    blurb:
      "Performance menswear and custom-branded apparel that keeps your team looking sharp on the doors and in the office.",
  },
  {
    name: "The Poser Company",
    domain: "posercompany.com",
    url: "https://www.posercompany.com/",
    category: "Gear & Swag",
    blurb:
      "A brand marketing agency that designs and fulfills premium custom merch, swag, and gear to power your company culture.",
  },
  {
    name: "Victig",
    domain: "victig.com",
    url: "https://victig.com/",
    category: "Background Checks",
    blurb:
      "Fast, top-rated background screening and drug testing so you can onboard new reps with confidence.",
  },
];

function openPartnerModal() {
  window.dispatchEvent(new CustomEvent("open-partner-modal"));
}

function PartnerLogo({
  partner,
  isLightMode,
}: {
  partner: Partner;
  isLightMode: boolean;
}) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <span
      className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-105 ${
        isLightMode
          ? "bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
          : "bg-white shadow-[0_4px_14px_rgba(0,0,0,0.35)] ring-1 ring-white/10"
      }`}
    >
      {logoFailed ? (
        <span className="font-inter text-xl font-bold text-[#19ad7d]">
          {partner.name.charAt(0)}
        </span>
      ) : (
        // Plain <img> (not next/image) so a missing logo degrades to the
        // monogram fallback via onError — no broken-image icon and no
        // next.config remote-host setup required.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`}
          alt={`${partner.name} logo`}
          width={36}
          height={36}
          loading="lazy"
          className="h-9 w-9 object-contain"
          onError={() => setLogoFailed(true)}
        />
      )}
    </span>
  );
}

function PartnerCard({
  partner,
  isLightMode,
  index,
}: {
  partner: Partner;
  isLightMode: boolean;
  index: number;
}) {
  return (
    <FadeInSection delay={Math.min(index, 6) * 0.06} className="flex">
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex w-full flex-col gap-5 rounded-[24px] border p-7 transition-all duration-300 ${
          isLightMode
            ? "border-black/10 bg-[#f4f2ec]/85 hover:border-black/20 hover:bg-[#f1eee7]/90"
            : "border-white/10 bg-[#0f151c]/85 hover:border-white/25 hover:bg-[#131b24]/90"
        }`}
      >
        <ArrowUpRight
          size={18}
          className={`absolute right-6 top-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
            isLightMode ? "text-black/30 group-hover:text-[#19ad7d]" : "text-white/30 group-hover:text-[#19ad7d]"
          }`}
        />

        <PartnerLogo partner={partner} isLightMode={isLightMode} />

        <div className="flex flex-col gap-2">
          <span className="font-inter text-[11px] font-bold uppercase tracking-[0.18em] text-[#19ad7d]">
            {partner.category}
          </span>
          <h3
            className={`font-inter text-[20px] font-semibold tracking-tight ${
              isLightMode ? "text-black" : "text-white"
            }`}
          >
            {partner.name}
          </h3>
          <p
            className={`font-inter text-[14px] leading-relaxed ${
              isLightMode ? "text-black/65" : "text-white/65"
            }`}
          >
            {partner.blurb}
          </p>
        </div>
      </a>
    </FadeInSection>
  );
}

export function PartnersAffiliates() {
  const { isLightMode } = useTheme();

  return (
    <main className="relative w-full pb-24 md:pb-32">
      {/* Hero */}
      <section className="relative w-full px-4 pt-4 md:pt-8 lg:pt-12 pb-12 md:pb-16 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center max-w-4xl"
          >
            <BlurReveal
              as="h1"
              className={`font-ivyora font-medium text-5xl md:text-7xl lg:text-[90px] leading-[1.05] tracking-[-2px] text-center transition-colors duration-500 ${
                isLightMode ? "text-brand-dark" : "text-brand-light"
              }`}
            >
              Partners &amp; Affiliates
            </BlurReveal>

            <p
              className={`font-inter text-lg md:text-xl mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 ${
                isLightMode ? "text-black/60" : "text-white/60"
              }`}
            >
              We team up with the best companies in the field to help our
              customers hire, pay, equip, and grow their teams. Meet the
              partners we trust—and apply to become one.
            </p>

            <div className="mt-10">
              <CTAButton
                variant="primary"
                onClick={openPartnerModal}
                className="px-8 py-4 font-semibold text-[14px]"
              >
                Become a Partner
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner directory */}
      <section className="relative w-full px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PARTNERS.map((partner, i) => (
            <PartnerCard
              key={partner.name}
              partner={partner}
              isLightMode={isLightMode}
              index={i}
            />
          ))}
        </div>
      </section>

    </main>
  );
}
