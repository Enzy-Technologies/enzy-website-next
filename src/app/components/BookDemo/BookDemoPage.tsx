"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useTheme } from "@/app/components/ThemeProvider";
import { TestimonialsMarquee, TESTIMONIALS } from "@/app/components/TestimonialsSection";
import { motion, useScroll, useTransform } from "motion/react";
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
    hbspt?: {
      forms?: {
        create?: unknown;
      };
    };
    hsMeetingEmbed?: {
      initialize: (opts: { widgetPosition: "inline"; targetSelector: string }) => void;
    };
  }
}

export function BookDemoPage({ hideTestimonials = false, hideText = false }: { hideTestimonials?: boolean; hideText?: boolean } = {}) {
  const { isLightMode } = useTheme();
  const [formsBlocked, setFormsBlocked] = useState(false);
  const [formsMounted, setFormsMounted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [meetingsReady, setMeetingsReady] = useState(false);

  const containerText = isLightMode ? "text-brand-dark" : "text-brand-light";
  const muted = isLightMode ? "text-black/65" : "text-white/60";
  const bg = isLightMode ? "bg-[rgba(245,245,245,0.42)]" : "bg-white/[0.03]";
  const border = isLightMode ? "border-[rgba(25,173,125,0.28)]" : "border-white/10";
  const panelText = isLightMode ? "text-[rgba(219,219,219,1)]" : "";

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    // Mark mounted once HubSpot injects the form markup.
    const t = window.setInterval(() => {
      const hasMarkup = !!document.querySelector(
        ".hs-form-html .hs-form, .hs-form-html form.hs-form, .hs-form-html input, .hs-form-html select, .hs-form-html textarea"
      );
      if (hasMarkup) {
        setFormsMounted(true);
        window.clearInterval(t);
      }
    }, 250);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const onSubmit = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      if (!(el instanceof HTMLFormElement)) return;
      if (!el.closest(".hs-form-html")) return;
      setShowCalendar(true);
    };

    document.addEventListener("submit", onSubmit, true);
    return () => document.removeEventListener("submit", onSubmit, true);
  }, []);

  useEffect(() => {
    // If the HubSpot embed script gets blocked, we don't want the UI
    // to look like it is "loading forever".
    const t = window.setTimeout(() => {
      const hasMarkup = !!document.querySelector(
        ".hs-form-html .hs-form, .hs-form-html form.hs-form, .hs-form-html input, .hs-form-html select, .hs-form-html textarea"
      );
      const available = !!window.hbspt;
      if (!available && !hasMarkup) setFormsBlocked(true);
    }, 10_000);
    return () => window.clearTimeout(t);
  }, []);

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
      <section ref={containerRef} className={`relative w-full px-4 ${hideText ? 'pt-0 pb-0' : 'pt-10 pb-10'} max-w-7xl mx-auto`}>
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
                Submit the form and pick a time—Enzy will tailor the walkthrough to your team, KPIs, and rhythms.
              </p>

              <div className="hidden lg:grid mt-7 gap-3 max-w-[540px]">
                {[
                  "Connect your data and unify KPIs across the org",
                  "Make leaderboards and coaching consistent in real time",
                  "Launch competitions, nudges, and messaging without tool sprawl",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#19ad7d] shrink-0" aria-hidden />
                    <p className={`m-0 font-inter text-[14px] leading-[1.55] ${isLightMode ? "text-black/70" : "text-white/70"}`}>
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
                    className={`liquid-glass rounded-2xl border p-4 sm:p-5 transition-colors ${
                      isLightMode
                        ? "border-[#19ad7d]/20 bg-[#19ad7d]/[0.03]"
                        : "border-[#19ad7d]/30 bg-[linear-gradient(189.6deg,rgba(25,173,125,0.08)_25.1%,rgba(20,144,103,0.02)_64.2%)]"
                    }`}
                  >
                    <dt
                      className={`font-inter font-extrabold tracking-[-1.5px] leading-none text-[34px] sm:text-[40px] md:text-[44px] ${
                        isLightMode ? "text-black" : "text-white"
                      }`}
                    >
                      {s.value}
                      <span className="ml-1 text-[15px] sm:text-[16px] font-bold tracking-tight text-[#19ad7d]">
                        {s.unit}
                      </span>
                    </dt>
                    <dd
                      className={`mt-2 font-inter text-[12px] sm:text-[13px] font-medium leading-snug ${
                        isLightMode ? "text-black/65" : "text-white/65"
                      }`}
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
            {/* Intense gradients behind the glass */}
            <div className="pointer-events-none absolute -inset-32 -z-10">
              <motion.div style={{ y: backgroundY }} className="absolute inset-0 rounded-[44px] bg-[radial-gradient(800px_340px_at_50%_50%,rgba(25,173,125,0.25),transparent_60%),radial-gradient(760px_340px_at_88%_120%,rgba(25,173,125,0.15),transparent_55%)] blur-3xl opacity-90" />
            </div>

              <div
                className={`liquid-glass book-demo-glass ${panelText} rounded-[32px] md:rounded-[36px] p-5 sm:p-7 md:p-10 border ${border} ${bg} shadow-[0_4px_12px_rgba(0,0,0,0.15)]`}
              >
                <div className="pointer-events-none absolute inset-0 rounded-[32px] md:rounded-[36px] ring-1 ring-white/10" aria-hidden />

                <Script
                  src="https://js-na2.hsforms.net/forms/embed/developer/39823762.js"
                  strategy="afterInteractive"
                />
                <Script
                  type="text/javascript"
                  src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
                  strategy="afterInteractive"
                  onLoad={() => setMeetingsReady(true)}
                />

                <div className="flex flex-col gap-7 enzy-hubspot-embed">
                  {!formsMounted && !formsBlocked ? (
                    <p className={`m-0 font-inter text-[13px] ${muted}`}>Loading form…</p>
                  ) : null}

                  {formsBlocked ? (
                    <div className="text-left">
                      <p className={`m-0 font-inter text-[13px] font-semibold ${containerText}`}>
                        HubSpot embed didn’t load.
                      </p>
                      <p className={`m-0 mt-1 font-inter text-[12px] ${muted}`}>
                        This is usually caused by an ad blocker / privacy extension or a network policy blocking `js-na2.hsforms.net`.
                        Try disabling extensions for `localhost` and refresh.
                      </p>
                    </div>
                  ) : null}

                  <div
                    className={formsBlocked ? "hidden" : "hs-form-html"}
                    data-region="na2"
                    data-form-id="3de45f18-7b2c-4af2-b6e6-38e2bfec511d"
                    data-portal-id="39823762"
                  />

                  {showCalendar ? (
                    <div className="pt-4">
                      <div className="enzy-meetings-shell">
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
                  className={`liquid-glass rounded-2xl border p-4 sm:p-5 transition-colors ${
                    isLightMode
                      ? "border-[#19ad7d]/20 bg-[#19ad7d]/[0.03]"
                      : "border-[#19ad7d]/30 bg-[linear-gradient(189.6deg,rgba(25,173,125,0.08)_25.1%,rgba(20,144,103,0.02)_64.2%)]"
                  }`}
                >
                  <dt
                    className={`font-inter font-extrabold tracking-[-1.5px] leading-none text-[34px] sm:text-[40px] md:text-[44px] ${
                      isLightMode ? "text-black" : "text-white"
                    }`}
                  >
                    {s.value}
                    <span className="ml-1 text-[15px] sm:text-[16px] font-bold tracking-tight text-[#19ad7d]">
                      {s.unit}
                    </span>
                  </dt>
                  <dd
                    className={`mt-2 font-inter text-[12px] sm:text-[13px] font-medium leading-snug ${
                      isLightMode ? "text-black/65" : "text-white/65"
                    }`}
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
            <TestimonialsMarquee testimonials={TESTIMONIALS} sets={3} />
          </div>
        </section>
      )}

      {/* FAQ lives at the very bottom of the standalone page only. */}
      {!hideText && <FAQSection />}
    </main>
  );
}

