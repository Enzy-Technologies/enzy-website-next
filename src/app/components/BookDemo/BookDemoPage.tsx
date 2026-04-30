"use client";

import React, { useMemo, useState } from "react";
import { useTheme } from "@/app/components/ThemeProvider";
import { BookDemoWizard, type BookDemoSubmission } from "./BookDemoWizard";
import { HubSpotMeetingsEmbed } from "./HubSpotMeetingsEmbed";

type Phase = "form" | "calendar";

export function BookDemoPage() {
  const { isLightMode } = useTheme();
  const [phase, setPhase] = useState<Phase>("form");
  const [submission, setSubmission] = useState<BookDemoSubmission | null>(null);

  const containerText = isLightMode ? "text-brand-dark" : "text-brand-light";
  const muted = isLightMode ? "text-black/65" : "text-white/60";
  const bg = isLightMode ? "bg-white/[0.65]" : "bg-white/[0.03]";
  const border = isLightMode ? "border-black/10" : "border-white/10";

  const meetingsUrl = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_HUBSPOT_MEETINGS_URL ?? "";
    if (!base || !submission) return base;

    try {
      const url = new URL(base);
      url.searchParams.set("firstname", submission.firstName);
      url.searchParams.set("lastname", submission.lastName);
      url.searchParams.set("email", submission.email);
      if (submission.phone) url.searchParams.set("phone", submission.phone);
      return url.toString();
    } catch {
      return base;
    }
  }, [submission]);

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
            {phase === "form" ? (
              <BookDemoWizard
                onSubmitted={(s) => {
                  setSubmission(s);
                  setPhase("calendar");
                }}
              />
            ) : (
              <div className="flex flex-col gap-6">
                <div className="text-left">
                  <p className={`font-['Inter'] text-[14px] font-semibold ${containerText} m-0`}>
                    Great — now pick a time.
                  </p>
                  <p className={`font-['Inter'] text-[13px] ${muted} mt-1`}>
                    This opens our HubSpot calendar.
                  </p>
                </div>

                <HubSpotMeetingsEmbed meetingsUrl={meetingsUrl} />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

