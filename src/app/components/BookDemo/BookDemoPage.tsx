"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useTheme } from "@/app/components/ThemeProvider";

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
  const bg = isLightMode ? "bg-white/[0.65]" : "bg-white/[0.03]";
  const border = isLightMode ? "border-black/10" : "border-white/10";

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
      <section className="relative w-full px-4 pt-12 md:pt-20 lg:pt-24 pb-16 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="font-['Inter'] text-[11px] tracking-[0.18em] uppercase text-[#19ad7d] font-semibold">
            Book a demo
          </p>
          <h1
            className={`font-['IvyOra_Text'] font-medium leading-[1.06] tracking-[-1.8px] ${containerText} text-[38px] sm:text-[46px] md:text-[56px]`}
          >
            Let’s get you on the calendar.
          </h1>
          <p className={`font-['Inter'] text-[16px] md:text-[17px] leading-[1.6] ${muted} max-w-[640px]`}>
            Answer a few quick questions, then pick a time that works.
          </p>
        </div>

        <div className="mt-10 md:mt-12">
          <div className={`liquid-glass rounded-[28px] md:rounded-[32px] p-5 sm:p-7 md:p-10 border ${border} ${bg}`}>
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
                data-form-id="94576c22-2aa4-4888-9b5a-c8a3b0313152"
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
      </section>
    </main>
  );
}

