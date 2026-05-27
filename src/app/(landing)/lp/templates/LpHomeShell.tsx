"use client";

import React from "react";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { ClosingCTASection } from "@/app/components/ClosingCTASection";
import { HeroSection } from "@/app/components/HeroSection";
import { EvidenceSection } from "@/app/components/EvidenceSection";
import { FeaturesPreviewSection } from "@/app/components/FeaturesPreviewSection";
import { FAQSection } from "@/app/components/FAQSection";
import { LpBookDemoScrollShell } from "@/app/components/landing/LpBookDemoScroll";
import { LpSingleTestimonial } from "@/app/components/landing/LpSingleTestimonial";
import { BOOK_DEMO_HREF } from "@/app/lib/booking";
import { TESTIMONIALS } from "@/app/components/TestimonialsSection";

/**
 * Focused `/lp/*` flow: split hero + proof + stat + testimonial + features + closing CTA.
 */
export function LpHomeShell() {
  return (
    <LpBookDemoScrollShell href="#lp-demo" label="Book a demo">
      <main className="relative w-full pb-32 md:pb-36 lg:pb-40">
        <ScrollProgress />
        <HeroSection variant="lp" />

        {/* Confidence Boosters */}
        <EvidenceSection variant="lp" />
        <LpSingleTestimonial testimonial={TESTIMONIALS[1]} />
      </main>
    </LpBookDemoScrollShell>
  );
}
