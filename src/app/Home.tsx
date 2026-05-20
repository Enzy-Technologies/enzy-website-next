"use client";

import React from "react";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { HeroSection } from "@/app/components/HeroSection";
import { Playground } from "@/app/playground/playground";
import { EnzyGlobeSection } from "@/app/components/EnzyGlobeSection";
import { HowItWorksSection } from "@/app/components/HowItWorksSection";
import { EvidenceSection } from "@/app/components/EvidenceSection";
import { FeaturesPreviewSection } from "@/app/components/FeaturesPreviewSection";
import { TestimonialsSection } from "@/app/components/TestimonialsSection";
import { ClosingCTASection } from "@/app/components/ClosingCTASection";

export default function Home() {
  return (
    <main className="relative w-full">
      <ScrollProgress />
      <HeroSection />
      <Playground />
      <EvidenceSection />
      <EnzyGlobeSection />
      <HowItWorksSection />
      <FeaturesPreviewSection />
      <TestimonialsSection />
      <ClosingCTASection />
    </main>
  );
}