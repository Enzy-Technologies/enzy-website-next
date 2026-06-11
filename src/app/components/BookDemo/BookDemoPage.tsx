"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { HubSpotForm } from "@/app/components/HubSpotForm";
import { DEMO_FORM_ID } from "@/app/lib/booking";
import { TestimonialsMarquee, TESTIMONIALS } from "@/app/components/TestimonialsSection";
import { motion } from "motion/react";
import { BlurReveal } from "@/app/components/BlurReveal";
import { FAQSection } from "@/app/components/FAQSection";

const BOOK_DEMO_STATS = [
  { value: "24", unit: "M", label: "Weekly page views" },
  { value: "21", unit: "%", label: "Increase in sales per rep after implementing Enzy" },
  { value: "7,000", unit: "+", label: "Incentives ran" },
  { value: "180", unit: "K", label: "Total users" },
];

declare global {
  interface Window {
    hsMeetingEmbed?: {
      initialize: (opts: { widgetPosition: "inline"; targetSelector: string }) => void;
    };
  }
}

export function BookDemoPage({
  hideTestimonials = false,
  hideText = false,
  formId = DEMO_FORM_ID,
}: { hideTestimonials?: boolean; hideText?: boolean; formId?: string } = {}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [meetingsReady, setMeetingsReady] = useState(false);

  const containerText = "text-brand-dark dark:text-brand-light";
  const muted = "text-black/65 dark:text-white/60";
  const panelText = "text-black/80 dark:text-white/85";


  useEffect(() => {
    if (!showCalendar) return;
    if (!meetingsReady) return;
    if (!window.hsMeetingEmbed?.initialize) return;
    if (!document.querySelector(".meetings-iframe-container")) return;

    window.hsMeetingEmbed.initialize({
      widgetPosition: "inline",
      targetSelector: ".meetings-iframe-container",
    });
  }, [meetingsReady, showCalendar]);

  return (
    <main className="relative w-full">
      {/* We remove the top padding since it's now placed right under the hero */}
      <section className={`relative w-full px-4 ${hideText ? 'pt-0 pb-0' : 'pt-10 pb-10'} max-w-7xl mx-auto`}>
        <div className={`grid grid-cols-1 ${hideText ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-10 lg:gap-14 items-start`}>
          {!hideText && (
            <div className="lg:col-span-5 order-1 lg:order-1">
              {/* Subtext + supporting bullets only appear on large screens.
                  On mobile we lead straight into the form with just the
                  headline above it. */}
              <BlurReveal
                as="h2"
                delay={0.1}
                className={`font-ivyora font-medium leading-[1.05] tracking-[-2px] ${containerText} text-[40px] sm:text-[48px] md:text-[56px]`}
              >
                See Enzy turn performance into a system.
              </BlurReveal>
              <p className={`hidden lg:block mt-4 font-inter text-[16px] md:text-[17px] leading-[1.65] ${muted} max-w-[540px]`}>
                Submit the form and pick a time — Enzy will tailor the walkthrough to your team, KPIs, and rhythms.
              </p>

              <div className="hidden lg:grid mt-7 gap-3 max-w-[540px]">
                {[
                  "Connect your data and unify KPIs across the org",
                  "Make leaderboards and coaching consistent in real time",
                  "Launch competitions, nudges, and messaging without tool sprawl",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#19ad7d] shrink-0" aria-hidden />
                    <p className="m-0 font-inter text-[14px] leading-[1.55] text-black/70 dark:text-white/70">
                      {t}
                    </p>
                  </div>
                ))}
              </div>

              {/* Desktop stat cards — sit beneath the supporting copy in
                  the left column. Hidden on mobile so the form is the
                  first thing the user reaches after the headline; a
                  mobile-only copy is rendered below the form further
                  down so the stats still appear, just deprioritized. */}
              <motion.dl
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
                className="hidden lg:grid mt-7 lg:mt-8 grid-cols-2 gap-3 sm:gap-4 max-w-[540px]"
              >
                {BOOK_DEMO_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="liquid-glass-solid rounded-2xl border p-4 sm:p-5 transition-colors border-[#19ad7d]/20 dark:border-[#19ad7d]/30"
                  >
                    <dt
                      className="font-inter font-extrabold tracking-[-1.5px] leading-none text-[34px] sm:text-[40px] md:text-[44px] text-black dark:text-white"
                    >
                      {s.value}
                      <span className="ml-1 text-[15px] sm:text-[16px] font-bold tracking-tight text-[#19ad7d]">
                        {s.unit}
                      </span>
                    </dt>
                    <dd
                      className="mt-2 font-inter text-[12px] sm:text-[13px] font-medium leading-snug text-black/65 dark:text-white/65"
                    >
                      {s.label}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          )}

          <div className={`${hideText ? "lg:col-span-1 w-full max-w-2xl mx-auto" : "lg:col-span-7"} order-2 lg:order-2`}>
            <div className="relative">
              {/* Opaque card matching the stat cards: same sheen/ring treatment
                  via .liquid-glass-solid, but no backdrop-filter. */}
              <div
                className={`liquid-glass-solid ${panelText} rounded-[32px] md:rounded-[36px] p-5 sm:p-7 md:p-10 border border-[#19ad7d]/20 dark:border-[#19ad7d]/30`}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[32px] md:rounded-[36px] ring-1 ring-white/10" aria-hidden />

                <div className="flex flex-col gap-7 enzy-hubspot-embed">
                  <HubSpotForm
                    formId={formId}
                    loadingAlign="left"
                    onSubmitted={() => setShowCalendar(true)}
                  />

                  {showCalendar ? (
                    <div className="pt-4">
                      {/* Load the HubSpot Meetings embed ONLY now — after the
                          form is submitted — so it never competes with the
                          form's initial load (keeps the lead form fast). */}
                      <Script
                        type="text/javascript"
                        src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
                        strategy="afterInteractive"
                        onLoad={() => setMeetingsReady(true)}
                      />
                      {/* min-height reserves the calendar's space so the iframe
                          loading in doesn't shove the layout (no CLS). */}
                      <div className="enzy-meetings-shell min-h-[640px]">
                        <div
                          className="meetings-iframe-container"
                          data-src="https://meetings-na2.hubspot.com/enzy/websitedemo?embed=true"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only stat cards — render after the form on phones so
              the form is the first thing the user reaches after the
              headline. Hidden on lg+ where the desktop copy already
              sits in the left column beneath the supporting bullets. */}
          {!hideText && (
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
              className="lg:hidden order-3 grid grid-cols-2 gap-3 sm:gap-4 mt-2"
            >
              {BOOK_DEMO_STATS.map((s) => (
                <div
                  key={s.label}
                  className="liquid-glass-solid rounded-2xl border p-4 sm:p-5 transition-colors border-[#19ad7d]/20 dark:border-[#19ad7d]/30"
                >
                  <dt
                    className="font-inter font-extrabold tracking-[-1.5px] leading-none text-[34px] sm:text-[40px] md:text-[44px] text-black dark:text-white"
                  >
                    {s.value}
                    <span className="ml-1 text-[15px] sm:text-[16px] font-bold tracking-tight text-[#19ad7d]">
                      {s.unit}
                    </span>
                  </dt>
                  <dd
                    className="mt-2 font-inter text-[12px] sm:text-[13px] font-medium leading-snug text-black/65 dark:text-white/65"
                  >
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>
      </section>

      {!hideTestimonials && (
        <section className="relative w-full pb-14 md:pb-20 overflow-x-clip">
          <div className="mx-auto max-w-7xl px-4">
            <p className={`m-0 font-inter text-[16px] md:text-[17px] leading-[1.65] ${muted}`}>
              Trusted by operators and sales leaders.
            </p>
          </div>
          <div className="mt-4">
            <TestimonialsMarquee testimonials={TESTIMONIALS} sets={2} />
          </div>
        </section>
      )}

      {/* FAQ lives at the very bottom of the standalone page only. */}
      {!hideText && <FAQSection />}
    </main>
  );
}

