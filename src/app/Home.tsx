"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { HeroSection } from "@/app/components/HeroSection";
import { Playground } from "@/app/playground/playground";
import { EvidenceSection } from "@/app/components/EvidenceSection";
import { HowItWorksSection } from "@/app/components/HowItWorksSection";
import { FeaturesPreviewSection } from "@/app/components/FeaturesPreviewSection";
import { TestimonialsSection } from "@/app/components/TestimonialsSection";
import { ClosingCTASection } from "@/app/components/ClosingCTASection";

// EnzyGlobeSection is the heaviest below-the-fold chunk (three.js + d3-geo +
// large canvas texture generation). The user always reaches it via scroll
// after Hero + Playground + Evidence, so loading it lazily after hydration
// shaves ~150KB off the initial bundle without any visible UX cost. The
// section reserves vertical space via a placeholder to prevent layout shift.
const EnzyGlobeSection = dynamic(
  () => import("@/app/components/EnzyGlobeSection").then((m) => ({ default: m.EnzyGlobeSection })),
  {
    ssr: false,
    loading: () => <div className="min-h-[80vh]" aria-hidden />,
  }
);

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