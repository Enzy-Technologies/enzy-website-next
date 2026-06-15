"use client";

import React from "react";
import { ClosingCTASection } from "@/app/components/ClosingCTASection";
import { HeroSection } from "@/app/components/HeroSection";
import { EvidenceSection } from "@/app/components/EvidenceSection";
import { FeaturesPreviewSection } from "@/app/components/FeaturesPreviewSection";
import { FAQSection } from "@/app/components/FAQSection";
import { LpBookDemoScrollShell } from "@/app/components/landing/LpBookDemoScroll";
import { LpSingleTestimonial } from "@/app/components/landing/LpSingleTestimonial";
import { BOOK_DEMO_HREF } from "@/app/lib/booking";
import { TESTIMONIALS } from "@/app/components/TestimonialsSection";
import type { LpVariant } from "@/app/lib/lpExperiment";

/**
 * Focused `/lp/*` flow: split hero + proof + stat + testimonial + features + closing CTA.
 *
 * `variant` is only set on /lp/meta (the A/B test): A = playground hero,
 * B = video hero. Undefined elsewhere → default (playground) hero.
 */
export function LpHomeShell({ variant }: { variant?: LpVariant } = {}) {
  return (
    <LpBookDemoScrollShell href="#lp-demo" label="Book a Demo">
      <main className="relative w-full pb-32 md:pb-36 lg:pb-40">
        <HeroSection variant="lp" experimentVariant={variant} />

        {/* Confidence Boosters */}
        <EvidenceSection variant="lp" />
        <LpSingleTestimonial testimonial={TESTIMONIALS[1]} />
      </main>
    </LpBookDemoScrollShell>
  );
}
