"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useTheme } from "@/app/components/ThemeProvider";
import { TestimonialsMarquee, TESTIMONIALS } from "@/app/components/TestimonialsSection";

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

export function BookDemoPage() {
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
      <section className="relative w-full px-4 pt-10 md:pt-16 lg:pt-20 pb-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <p className="font-['Inter'] text-[11px] tracking-[0.18em] uppercase text-[#19ad7d] font-semibold">
              Book a demo
            </p>
            <h1
              className={`mt-4 font-['IvyOra_Text'] font-medium leading-[1.06] tracking-[-1.8px] ${containerText} text-[40px] sm:text-[48px] md:text-[56px]`}
            >
              See Enzy turn performance into a system.
            </h1>
            <p className={`mt-4 font-['Inter'] text-[16px] md:text-[17px] leading-[1.65] ${muted} max-w-[540px]`}>
              Submit the form and pick a time—Enzy will tailor the walkthrough to your team, KPIs, and rhythms.
            </p>

            <div className="mt-7 grid gap-3 max-w-[540px]">
              {[
                "Connect your data and unify KPIs across the org",
                "Make leaderboards and coaching consistent in real time",
                "Launch competitions, nudges, and messaging without tool sprawl",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#19ad7d] shrink-0" aria-hidden />
                  <p className={`m-0 font-['Inter'] text-[14px] leading-[1.55] ${isLightMode ? "text-black/70" : "text-white/70"}`}>
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              {/* Intense gradients behind the glass */}
              <div className="pointer-events-none absolute -inset-4 -z-10">
                <div className="absolute inset-0 rounded-[44px] bg-[radial-gradient(800px_340px_at_12%_0%,rgba(25,173,125,0.45),transparent_60%),radial-gradient(760px_340px_at_88%_120%,rgba(25,173,125,0.20),transparent_55%)] blur-2xl opacity-90" />
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
                    <p className={`m-0 font-['Inter'] text-[13px] ${muted}`}>Loading form…</p>
                  ) : null}

                  {formsBlocked ? (
                    <div className="text-left">
                      <p className={`m-0 font-['Inter'] text-[13px] font-semibold ${containerText}`}>
                        HubSpot embed didn’t load.
                      </p>
                      <p className={`m-0 mt-1 font-['Inter'] text-[12px] ${muted}`}>
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
        </div>
      </section>

      <section className="relative w-full pb-14 md:pb-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <p className={`m-0 font-['Inter'] text-[12px] font-semibold ${isLightMode ? "text-black/55" : "text-white/55"}`}>
            Trusted by operators and sales leaders.
          </p>
        </div>
        <div className="mt-4">
          <TestimonialsMarquee testimonials={TESTIMONIALS} sets={3} />
        </div>
      </section>
    </main>
  );
}

