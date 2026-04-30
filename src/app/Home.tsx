"use client";

import React from "react";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { HeroSection } from "@/app/components/HeroSection";
import { HowItWorksSection } from "@/app/components/HowItWorksSection";
import { EvidenceSection } from "@/app/components/EvidenceSection";
import { FeaturesPreviewSection } from "@/app/components/FeaturesPreviewSection";
import { ClosingCTASection } from "@/app/components/ClosingCTASection";

export default function Home() {
  return (
    <main className="relative w-full">
      <ScrollProgress />
      <HeroSection />
      <HowItWorksSection />
      <EvidenceSection />
      <FeaturesPreviewSection />
      <ClosingCTASection />
    </main>
  );
}