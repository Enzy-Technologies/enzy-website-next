"use client";

import React from "react";
import { Play } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

type HeroVideoPlaceholderProps = {
  label?: string;
  id?: string;
};

/** Static placeholder until a hosted video URL is wired in from LP config later. */
export function HeroVideoPlaceholder({ label = "Product video coming soon", id }: HeroVideoPlaceholderProps) {
  const { isLightMode } = useTheme();

  return (
    <div className="relative w-full max-w-[480px]" id={id}>
      <div
        className="pointer-events-none absolute -inset-4 rounded-[40px] opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(25,173,125,0.16), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className={`relative aspect-video w-full overflow-hidden rounded-[28px] border shadow-[0_40px_120px_rgba(0,0,0,0.45),0_12px_40px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] ${
          isLightMode ? "border-black/10" : "border-white/[0.08]"
        }`}
        style={{
          background: isLightMode
            ? "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.92) 100%)"
            : "linear-gradient(180deg, rgba(18,20,24,0.94) 0%, rgba(10,11,14,0.96) 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isLightMode
              ? "radial-gradient(120% 70% at 50% -10%, rgba(25,173,125,0.08), transparent 55%)"
              : "radial-gradient(120% 70% at 50% -10%, rgba(25,173,125,0.12), transparent 55%)",
          }}
          aria-hidden
        />
        <div className="relative flex h-full min-h-[220px] flex-col items-center justify-center gap-4 px-8 py-10 text-center">
          <span
            className={`inline-flex h-16 w-16 items-center justify-center rounded-full border bg-[#19ad7d]/12 ring-2 ring-[#19ad7d]/25 ${
              isLightMode ? "border-black/10" : "border-white/10"
            }`}
            aria-hidden
          >
            <Play className="ml-1 h-7 w-7 text-[#19ad7d]" fill="currentColor" />
          </span>
          <p
            className={`m-0 max-w-[280px] font-['Inter'] text-[13px] font-medium leading-relaxed ${
              isLightMode ? "text-black/55" : "text-white/55"
            }`}
          >
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
