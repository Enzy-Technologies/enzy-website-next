"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, HeartPulse, type LucideIcon } from "lucide-react";
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
  /** Optional local logo overrides (used instead of the favicon when set). */
  /** Full-colour square icon shown in the marketplace card's white slot. */
  cardLogo?: string;
  /** Transparent wordmark for the monochrome logo carousel. */
  marqueeLogo?: string;
  /** Render this generic icon in the card slot instead of fetching a favicon
   *  (used when the brand favicon is too low-res / poor quality). */
  cardIcon?: LucideIcon;
  /** Exclude from the monochrome logo carousel (e.g. no usable mono mark). */
  hideFromMarquee?: boolean;
};

const PARTNERS: Partner[] = [
  {
    name: "Sequifi",
    domain: "sequifi.com",
    url: "https://sequifi.com/partners/enzy",
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
    url: "https://www.posercompany.com/fulfillment.htm",
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
  {
    name: "Bips",
    domain: "trybips.com",
    url: "https://www.trybips.com/enzy",
    category: "Taxes & Finance",
    blurb:
      "A financial tracking app built for 1099 reps that automates mileage and expense tracking so they capture every tax deduction all year long.",
    cardLogo: "/logos/bips-icon.png",
    marqueeLogo: "/logos/bips-mark.png",
  },
  {
    name: "Hire Advantage",
    domain: "d2dhire.com",
    url: "https://d2dhire.com/",
    category: "Recruiting",
    blurb:
      "A high-impact recruiting engine that helps door-to-door and field-sales teams source, screen, and hire quality reps at scale.",
  },
  {
    name: "Enerflo",
    domain: "enerflo.com",
    url: "https://enerflo.com/",
    category: "Solar Software",
    blurb:
      "The only lead-to-PTO solar platform, unifying sales, contracting, financing, and project tracking so solar teams close more deals and install faster.",
  },
  {
    name: "MF9",
    domain: "mf9.world",
    url: "https://mf9.world/",
    category: "Merch & Fulfillment",
    blurb:
      "A multi-disciplinary creative studio offering product design, manufacturing, and fulfillment to bring premium branded merch and gear to life.",
    marqueeLogo: "/logos/mf9-mark.png",
  },
  {
    name: "HailTrace",
    domain: "hailtrace.com",
    url: "https://hailtrace.com/",
    category: "Storm Data",
    blurb:
      "Meteorologist-verified, real-time hail and storm mapping that pinpoints damaged neighborhoods so roofing and restoration teams reach leads first.",
  },
  {
    name: "Friendly Health Co",
    domain: "friendlyhealthco.com",
    url: "https://friendlyhealthco.com/",
    category: "Health Insurance",
    blurb:
      "Personalized ACA health insurance guidance that helps 1099 reps and their families find affordable coverage and maximize subsidies.",
    // Favicon is only 16px (a faint globe) — use a generic icon on the card and
    // keep it out of the monochrome carousel where it'd render as a blurry blob.
    cardIcon: HeartPulse,
    hideFromMarquee: true,
  },
];

const BENEFITS = [
  {
    title: "Reach new customers",
    desc: "Get in front of the sales operators actively buying to grow their teams.",
  },
  {
    title: "Grow revenue",
    desc: "Co-sell into a network built on performance — and close more deals together.",
  },
  {
    title: "Serve customers better",
    desc: "Give shared customers a tighter stack — better integrations, cleaner workflows, fewer tools to juggle.",
  },
];

function openPartnerModal() {
  window.dispatchEvent(new CustomEvent("open-partner-modal"));
}

function PartnerLogo({ partner }: { partner: Partner }) {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-105 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.35)] ring-1 ring-black/5 dark:ring-white/10">
      {partner.cardIcon ? (
        <partner.cardIcon size={24} strokeWidth={1.75} className="text-[#19ad7d]" />
      ) : logoFailed ? (
        <span className="font-inter text-xl font-bold text-[#19ad7d]">
          {partner.name.charAt(0)}
        </span>
      ) : (
        // Plain <img> (not next/image) so a missing logo degrades to the
        // monogram fallback via onError — no broken-image icon and no
        // next.config remote-host setup required.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={
            partner.cardLogo ??
            `https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`
          }
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

/** A single marquee logo: the partner's favicon rendered monochrome +
 *  semi-transparent (same treatment as the home-page customer logos), with a
 *  grey monogram fallback if the favicon fails to load. */
function PartnerMarqueeLogo({ partner }: { partner: Partner }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="font-inter text-2xl font-bold opacity-60 text-black dark:text-white">
        {partner.name.charAt(0)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={
        partner.marqueeLogo ??
        `https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`
      }
      alt={partner.name}
      width={40}
      height={40}
      loading="lazy"
      className="max-h-full max-w-full h-auto w-auto object-contain opacity-70 brightness-0 dark:opacity-90 dark:invert"
      onError={() => setFailed(true)}
    />
  );
}

/** Continuously-scrolling partner logo carousel. Reuses the home-page customer
 *  marquee styling (`simple-logo-marquee`) — grey, semi-transparent logos that
 *  fade in/out at the edges — minus the captions/highlight. The track renders
 *  the partner set twice so the -50% scroll loops seamlessly. */
function PartnerLogoMarquee() {
  // Two identical copies so a -50% translate loops seamlessly (no seam, no
  // restart). Uniform fixed-width items + no gap keep the boundary aligned.
  // Partners flagged hideFromMarquee (no usable mono mark) are left out.
  const marqueePartners = PARTNERS.filter((p) => !p.hideFromMarquee);
  const items = [...marqueePartners, ...marqueePartners];
  return (
    // Constrained to ~half the page width (centered) since there aren't enough
    // partner logos yet to fill an edge-to-edge marquee. The edge mask fades
    // the logos in/out at the sides, matching the home customer marquee.
    <div
      aria-label="Our partners"
      className="mx-auto w-full max-w-2xl overflow-hidden px-4 py-3 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="flex w-max items-center [animation:enzy-partner-marquee_34s_linear_infinite] motion-reduce:[animation:none]">
        {items.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="flex h-12 w-[140px] shrink-0 items-center justify-center"
          >
            <PartnerMarqueeLogo partner={p} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  return (
    <FadeInSection delay={Math.min(index, 6) * 0.06} className="flex">
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex w-full flex-col gap-5 rounded-[24px] border p-7 transition-all duration-300 border-black/10 dark:border-white/10 bg-[#f4f2ec]/85 dark:bg-[#0f151c]/85 hover:border-black/20 dark:hover:border-white/25 hover:bg-[#f1eee7]/90 dark:hover:bg-[#131b24]/90"
      >
        <ArrowUpRight
          size={18}
          className="absolute right-6 top-6 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-black/30 dark:text-white/30 group-hover:text-[#19ad7d]"
        />

        <PartnerLogo partner={partner} />

        <div className="flex flex-col gap-2">
          <span className="font-inter text-[11px] font-bold uppercase tracking-[0.18em] text-[#19ad7d]">
            {partner.category}
          </span>
          <h3 className="font-inter text-[20px] font-semibold tracking-tight text-black dark:text-white">
            {partner.name}
          </h3>
          <p className="font-inter text-[14px] leading-relaxed text-black/65 dark:text-white/65">
            {partner.blurb}
          </p>
        </div>
      </a>
    </FadeInSection>
  );
}

export function Partners() {
  return (
    <main className="relative w-full pb-24 md:pb-32">
      {/* Hero */}
      <section className="relative w-full px-4 pt-7 md:pt-10 pb-10 md:pb-12 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div className="enzy-hero-reveal flex flex-col items-center max-w-4xl">
            <h1 className="font-ivyora font-medium text-[40px] sm:text-[50px] md:text-[64px] leading-[1.05] tracking-[-2px] text-center transition-colors duration-500 text-brand-dark dark:text-brand-light">
              <BlurReveal as="span" delay={0.1}>Better tools, </BlurReveal>
              <BlurReveal as="span" delay={0.43} className="italic">one ecosystem.</BlurReveal>
            </h1>

            <p className="font-inter text-lg md:text-xl mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 text-black/60 dark:text-white/60">
              We team up with the tools, services, and companies that our
              customers rely on to grow their sales organization. If your work
              touches sales performance, we want to explore a partnership.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
              <CTAButton
                variant="primary"
                onClick={openPartnerModal}
                className="px-8 py-4 font-semibold text-[14px]"
              >
                Become a Partner
              </CTAButton>
              <CTAButton
                variant="secondary"
                href="#partners-marketplace"
                className="px-8 py-4 font-semibold text-[14px]"
              >
                See our Partners
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Partner logo carousel */}
      <PartnerLogoMarquee />

      {/* Why Partner with Enzy? */}
      <section className="relative w-full px-4 max-w-6xl mx-auto pt-12 md:pt-16">
        <FadeInSection>
          <h2 className="font-ivyora font-medium text-3xl md:text-5xl tracking-[-1px] text-center text-black dark:text-white">
            Why Partner with Enzy?
          </h2>
        </FadeInSection>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {BENEFITS.map((b, i) => (
            <FadeInSection key={b.title} delay={i * 0.08} className="flex">
              <div className="flex w-full flex-col gap-4 rounded-[24px] border p-7 transition-colors border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.03]">
                <h3 className="font-inter text-[18px] font-bold tracking-tight text-[#19ad7d]">
                  {b.title}
                </h3>
                <p className="font-inter text-[15px] leading-relaxed text-black/70 dark:text-white/70">
                  {b.desc}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Partner Marketplace (directory) */}
      <section
        id="partners-marketplace"
        className="relative w-full px-4 max-w-6xl mx-auto pt-16 md:pt-20 scroll-mt-16"
      >
        <FadeInSection>
          <div className="flex flex-col items-center text-center mb-10 md:mb-14">
            <h2 className="font-ivyora font-medium text-3xl md:text-5xl tracking-[-1px] text-black dark:text-white">
              Partner Marketplace
            </h2>
            <p className="font-inter text-base md:text-lg mt-5 max-w-2xl leading-relaxed text-black/60 dark:text-white/60">
              The companies we trust to help Enzy customers hire, pay, equip,
              and grow their teams.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {PARTNERS.map((partner, i) => (
            <PartnerCard key={partner.name} partner={partner} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
