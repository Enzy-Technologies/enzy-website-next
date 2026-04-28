"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";
import { CTAButton } from "@/app/components/CTAButton";

type Props = {
  href: string;
  label: string;
};

/** Mobile-only sticky bar after scroll — keeps primary demo action reachable without competing with desktop layout. */
export function LandingStickyDemoCta({ href, label }: Props) {
  const [visible, setVisible] = useState(false);
  const { isLightMode } = useTheme();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 380);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pointer-events-none">
      <div
        className={`pointer-events-auto max-w-lg mx-auto rounded-2xl p-1.5 backdrop-blur-xl border shadow-[0_-12px_48px_rgba(0,0,0,0.35)] ${
          isLightMode ? "bg-white/90 border-black/10" : "bg-[#0b0f14]/90 border-white/10"
        }`}
      >
        <CTAButton
          href={href}
          variant="primary"
          className="w-full justify-center rounded-full py-3.5 px-6 gap-2 font-bold text-sm uppercase tracking-widest active:scale-[0.98] hover:!opacity-100"
        >
          {label} <ArrowRight size={18} aria-hidden />
        </CTAButton>
      </div>
    </div>
  );
}
