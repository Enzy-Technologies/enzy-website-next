"use client";

import React, { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { useTheme } from "@/app/components/ThemeProvider";

declare global {
  interface Window {
    hbspt?: {
      forms?: {
        create?: unknown;
      };
    };
  }
}

export function BookDemoPage() {
  const { isLightMode } = useTheme();
  const [formsBlocked, setFormsBlocked] = useState(false);
  const [formsMounted, setFormsMounted] = useState(false);

  const containerText = isLightMode ? "text-brand-dark" : "text-brand-light";
  const muted = isLightMode ? "text-black/65" : "text-white/60";
  const bg = isLightMode ? "bg-white/[0.65]" : "bg-white/[0.03]";
  const border = isLightMode ? "border-black/10" : "border-white/10";

  const panel = useMemo(() => {
    return isLightMode ? "bg-white/70 border-black/10" : "bg-white/[0.04] border-white/10";
  }, [isLightMode]);

  useEffect(() => {
    // Mark mounted once HubSpot injects the form markup.
    const t = window.setInterval(() => {
      const hasMarkup = !!document.querySelector(".hs-form-html .hs-form, .hs-form-html form.hs-form");
      if (hasMarkup) {
        setFormsMounted(true);
        window.clearInterval(t);
      }
    }, 250);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    // If the HubSpot embed script gets blocked, we don't want the UI
    // to look like it is "loading forever".
    const t = window.setTimeout(() => {
      const hasMarkup = !!document.querySelector(".hs-form-html .hs-form, .hs-form-html form.hs-form");
      const available = !!window.hbspt;
      if (!available && !hasMarkup) setFormsBlocked(true);
    }, 10_000);
    return () => window.clearTimeout(t);
  }, []);

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

            <div className="flex flex-col gap-7">
              <div className="text-left">
                <p className={`font-['Inter'] text-[14px] font-semibold ${containerText} m-0`}>
                  Tell us a bit about you.
                </p>
                <p className={`font-['Inter'] text-[13px] ${muted} mt-1`}>
                  Fill out the form below and we’ll follow up ASAP.
                </p>
              </div>

              <div className={`rounded-3xl border p-4 sm:p-5 ${panel}`}>
                {!formsMounted && !formsBlocked ? (
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 h-8 w-8 rounded-2xl border ${
                        isLightMode ? "border-black/10 bg-black/[0.03]" : "border-white/10 bg-white/[0.04]"
                      }`}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p className={`m-0 font-['Inter'] text-[13px] font-semibold ${containerText}`}>Loading form…</p>
                      <p className={`m-0 mt-1 font-['Inter'] text-[12px] ${muted}`}>
                        If this takes more than a few seconds, the HubSpot embed script may be blocked.
                      </p>
                    </div>
                  </div>
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
                  className={formsBlocked ? "hidden" : "mt-4 hs-form-html"}
                  data-region="na2"
                  data-form-id="94576c22-2aa4-4888-9b5a-c8a3b0313152"
                  data-portal-id="39823762"
                />
              </div>

              <div className="pt-2">
                <p className={`font-['Inter'] text-[12px] ${muted} m-0`}>
                  Next: once the form is rendering reliably, we’ll re-enable the HubSpot calendar embed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

