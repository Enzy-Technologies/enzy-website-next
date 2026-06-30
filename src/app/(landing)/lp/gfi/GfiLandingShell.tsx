"use client";

import React from "react";
import { Check } from "lucide-react";

import { BlurReveal } from "@/app/components/BlurReveal";
import { HubSpotForm } from "@/app/components/HubSpotForm";
import { GFI_FORM_ID } from "@/app/lib/booking";

/**
 * GFI × Enzy partner opt-in landing page (/lp/gfi).
 *
 * Brief by design: who the partnership is for → what Enzy does for an agency →
 * the tiered pricing exactly as in the signed SOW (with the Feed moved into
 * Tier 1 and Enzy Assistant renamed to Enzy AI) → the HubSpot opt-in form that
 * feeds the DocuSign agreement.
 *
 * Renders inside the (landing) route group, which strips the site nav. There's
 * no Enzy header on /lp/*, so the co-brand lockup below carries the branding.
 */

const GREEN = "#19ad7d";

type Feature = { name: string; desc: string };

const TIER_1_FEATURES: Feature[] = [
  {
    name: "Messaging",
    desc: "Streamlined internal comms with unlimited users per group — auto-organized by your org chart so the right agents are always in the right thread.",
  },
  {
    name: "Profiles & Badges",
    desc: "A social-media-like profile for every agent that turns recognition into credibility the whole team can see.",
  },
  {
    name: "Leaderboards",
    desc: "Put the daily score in front of everyone. Visibility breeds accountability.",
  },
  {
    name: "Competitions & Incentives",
    desc: "Turn the month into a race. Teams running competitions lift sales 27% on average.",
  },
  {
    name: "Feed",
    desc: "A live feed of wins and milestones that keeps the whole agency engaged and moving.",
  },
];

const TIER_2_FEATURES: Feature[] = [
  {
    name: "Task Programs",
    desc: "Structured workflows that turn your playbook into the daily actions that drive production.",
  },
  {
    name: "Enzy AI",
    desc: "Watches every agent's numbers in real time and pushes the right person the right nudge — a rep going cold, a streak worth celebrating, a goal within reach — so you act while it still moves the month, not after.",
  },
  {
    name: "Media Library",
    desc: "Training and resources in one place, so every new agent ramps the same way.",
  },
  {
    name: "Customer Surveys",
    desc: "Capture client feedback effortlessly and feed it straight back into coaching.",
  },
  {
    name: "Digital Business Card",
    desc: "A modern, shareable card that makes every agent easy to refer and remember.",
  },
  {
    name: "Recruiting & Onboarding",
    desc: "Streamline how you bring on and ramp new agents.",
  },
  {
    name: "Lead Mapping & Appointment Scheduling",
    desc: "Smarter client acquisition — map leads and book appointments in one flow.",
  },
];

const ADD_ONS: { name: string; price: string; desc: string }[] = [
  {
    name: "Custom CRM Integration",
    price: "$427–$713/mo",
    desc: "Automated reporting and bi-directional lead sync with your existing CRM.",
  },
  {
    name: "Premium Support",
    price: "$142/mo",
    desc: "A dedicated Enzy rep to set up competitions, badges, and backend admin — so you stay focused on growth.",
  },
];

const VALUE_PROPS: { title: string; body: string }[] = [
  {
    title: "See every agent live",
    body: "Leaderboards and profiles put the daily score in front of the whole team — so production becomes visible and accountability takes care of itself.",
  },
  {
    title: "Make the month a competition",
    body: "Competitions, incentives, and badges turn quotas into something agents chase — and wins into something the whole agency celebrates.",
  },
  {
    title: "Run it all in one place",
    body: "Messaging, recognition, and coaching live in one platform — so you can retire the group texts, spreadsheets, and one-off tools.",
  },
];

function FeatureRow({ feature }: { feature: Feature }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: `${GREEN}1a` }}
        aria-hidden
      >
        <Check size={11} strokeWidth={3} style={{ color: GREEN }} />
      </span>
      <span className="font-inter text-[14px] leading-[1.55]">
        <span className="font-semibold text-black dark:text-white">{feature.name}</span>
        <span className="text-black/60 dark:text-white/60"> — {feature.desc}</span>
      </span>
    </li>
  );
}

export function GfiLandingShell() {
  const containerText = "text-brand-dark dark:text-brand-light";
  const muted = "text-black/65 dark:text-white/65";

  return (
    <div className="relative w-full">
      <section className="relative mx-auto w-full max-w-5xl px-4 pt-10 pb-16 md:pt-14 md:pb-20">
        {/* Co-brand lockup — no site header on /lp/*, so branding lives here.
            Plain <img> (not next/image): these are static SVG logos, which Next
            doesn't optimize anyway, and CSS height sizing keeps next/image's
            aspect-ratio dev warning quiet. */}
        {/* eslint-disable @next/next/no-img-element */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src="/logos/gfi-blue.svg"
            alt="Global Financial Impact"
            className="h-5 w-auto sm:h-6 dark:hidden"
          />
          <img
            src="/logos/gfi-white.svg"
            alt="Global Financial Impact"
            className="hidden h-5 w-auto sm:h-6 dark:block"
          />
          <span className="text-[18px] font-light text-black/30 dark:text-white/30" aria-hidden>
            ×
          </span>
          <img
            src="/enzy-wordmark.svg"
            alt="Enzy"
            className="h-7 w-auto sm:h-8 brightness-0 dark:invert dark:brightness-0"
          />
        </div>
        {/* eslint-enable @next/next/no-img-element */}

        {/* Hero */}
        <div className="mt-9 max-w-3xl md:mt-12">
          <p
            className="font-inter text-[12px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: GREEN }}
          >
            Official partnership
          </p>
          <BlurReveal
            as="h1"
            delay={0.1}
            className={`mt-3 font-ivyora font-medium leading-[1.05] tracking-[-1.5px] ${containerText} text-[38px] sm:text-[48px] md:text-[58px]`}
          >
            Run your GFI agency like a high-performance team.
          </BlurReveal>
          <p className={`mt-5 max-w-2xl font-inter text-[16px] leading-[1.65] md:text-[18px] ${muted}`}>
            GFI has partnered with Enzy — the performance operating system for sales
            teams — to give agency owners one place to drive visibility, competition,
            and recognition across every agent. Opt in below at exclusive GFI partner
            pricing.
          </p>
          <a
            href="#opt-in"
            className="mt-7 inline-flex items-center justify-center rounded-full px-7 py-3 font-inter text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(25,173,125,0.25)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)]"
            style={{ backgroundColor: GREEN }}
          >
            Opt in to Enzy
          </a>
        </div>

        {/* What's in it for agency owners */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
          {VALUE_PROPS.map((v) => (
            <div
              key={v.title}
              className="liquid-glass-solid rounded-3xl border border-[#19ad7d]/20 p-6 dark:border-[#19ad7d]/30"
            >
              <h3 className={`m-0 font-inter text-[17px] font-semibold ${containerText}`}>
                {v.title}
              </h3>
              <p className={`mt-2 m-0 font-inter text-[14px] leading-[1.6] ${muted}`}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative mx-auto w-full max-w-5xl px-4 pb-16 md:pb-20">
        <h2
          className={`m-0 font-ivyora font-medium leading-[1.1] tracking-[-1px] ${containerText} text-[30px] sm:text-[36px]`}
        >
          GFI partner pricing.
        </h2>
        <p className={`mt-3 max-w-2xl font-inter text-[15px] leading-[1.6] ${muted}`}>
          Pick the tier that fits your agency. Pricing is exclusive to GFI agency owners,
          billed monthly per agency workspace.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Tier 1 */}
          <div className="liquid-glass-solid flex flex-col rounded-[28px] border border-[#19ad7d]/20 p-7 dark:border-[#19ad7d]/30 md:p-8">
            <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/50">
              Tier 1
            </p>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className={`font-inter text-[44px] font-extrabold tracking-[-2px] ${containerText}`}>
                $129
              </span>
              <span className={`font-inter text-[15px] font-medium ${muted}`}>/month</span>
            </div>
            <p className={`mt-2 font-inter text-[14px] leading-[1.5] ${muted}`}>
              Foundational tools to drive engagement and performance.
            </p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {TIER_1_FEATURES.map((f) => (
                <FeatureRow key={f.name} feature={f} />
              ))}
            </ul>
          </div>

          {/* Tier 2 */}
          <div
            className="liquid-glass-solid relative flex flex-col rounded-[28px] border p-7 md:p-8"
            style={{ borderColor: GREEN }}
          >
            <span
              className="absolute right-6 top-7 rounded-full px-3 py-1 font-inter text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
              style={{ backgroundColor: GREEN }}
            >
              Most complete
            </span>
            <p className="font-inter text-[12px] font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/50">
              Tier 2
            </p>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className={`font-inter text-[44px] font-extrabold tracking-[-2px] ${containerText}`}>
                $249
              </span>
              <span className={`font-inter text-[15px] font-medium ${muted}`}>/month</span>
            </div>
            <p className={`mt-2 font-inter text-[14px] leading-[1.5] ${muted}`}>
              Everything in Tier 1, plus powerful growth and management tools:
            </p>
            <ul className="mt-6 flex flex-col gap-3.5">
              {TIER_2_FEATURES.map((f) => (
                <FeatureRow key={f.name} feature={f} />
              ))}
            </ul>
          </div>
        </div>

        {/* Add-ons */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {ADD_ONS.map((a) => (
            <div
              key={a.name}
              className="rounded-2xl border border-black/10 p-5 dark:border-white/10"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className={`m-0 font-inter text-[15px] font-semibold ${containerText}`}>
                  {a.name}
                </h3>
                <span className="shrink-0 font-inter text-[14px] font-semibold" style={{ color: GREEN }}>
                  {a.price}
                </span>
              </div>
              <p className={`mt-1.5 m-0 font-inter text-[13px] leading-[1.55] ${muted}`}>{a.desc}</p>
              <p className="mt-1.5 m-0 font-inter text-[11px] uppercase tracking-[0.1em] text-black/40 dark:text-white/40">
                Optional add-on
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Opt-in form */}
      <section id="opt-in" className="relative mx-auto w-full max-w-3xl scroll-mt-8 px-4 pb-24 md:pb-32">
        <div className="liquid-glass-solid rounded-[32px] border border-[#19ad7d]/20 p-6 dark:border-[#19ad7d]/30 sm:p-8 md:p-10">
          <h2 className={`m-0 font-ivyora font-medium tracking-[-1px] ${containerText} text-[28px] sm:text-[34px]`}>
            Opt in to Enzy.
          </h2>
          <p className={`mt-3 font-inter text-[15px] leading-[1.6] ${muted}`}>
            Pick your tier, choose any add-ons, and we&apos;ll send your agreement to
            sign.
          </p>
          <div className="mt-7 enzy-hubspot-embed">
            <HubSpotForm formId={GFI_FORM_ID} loadingAlign="left" />
          </div>
        </div>
        <p className={`mt-5 text-center font-inter text-[12px] leading-[1.6] ${muted}`}>
          Questions about the partnership? Reach your GFI leadership or email{" "}
          <a href="mailto:sales@enzy.co" className="underline underline-offset-2">
            sales@enzy.co
          </a>
          .
        </p>
      </section>
    </div>
  );
}
