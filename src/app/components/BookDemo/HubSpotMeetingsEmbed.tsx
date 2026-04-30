"use client";

import React from "react";
import { useTheme } from "@/app/components/ThemeProvider";

export function HubSpotMeetingsEmbed({ meetingsUrl }: { meetingsUrl: string }) {
  const { isLightMode } = useTheme();

  if (!meetingsUrl) {
    return (
      <div
        className={`rounded-2xl border p-4 font-['Inter'] text-[13px] ${
          isLightMode ? "border-black/10 text-black/65" : "border-white/10 text-white/60"
        }`}
      >
        Missing `NEXT_PUBLIC_HUBSPOT_MEETINGS_URL`. Add it to your environment to enable the calendar.
      </div>
    );
  }

  // Simple iframe embed is the most reliable baseline.
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10">
      <iframe
        title="Book a demo"
        src={meetingsUrl}
        className="w-full h-[720px] bg-transparent"
        allow="camera; microphone; fullscreen"
      />
    </div>
  );
}

