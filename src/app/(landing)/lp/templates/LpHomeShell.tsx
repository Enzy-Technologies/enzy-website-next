"use client";

import React from "react";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { HeroSection } from "@/app/components/HeroSection";
import { HowItWorksSection } from "@/app/components/HowItWorksSection";
import { EvidenceSection } from "@/app/components/EvidenceSection";
import { FeaturesPreviewSection } from "@/app/components/FeaturesPreviewSection";
import { ClosingCTASection } from "@/app/components/ClosingCTASection";

/**
 * Same section stack as `/` (Home), with `HeroSection` in LP mode: no playground column,
 * large primary demo CTA, and a video placeholder. Used by `/lp/*` configs with `layout: "home"`.
 */
export function LpHomeShell() {
  return (
    <main className="relative w-full">
      <ScrollProgress />
      <HeroSection variant="lp" />
      <HowItWorksSection />
      <EvidenceSection />
      <FeaturesPreviewSection />
      <ClosingCTASection />
    </main>
  );
}
