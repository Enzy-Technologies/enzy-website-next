"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { CTAButton } from "./components/CTAButton";
import { BOOK_DEMO_HREF } from "./lib/booking";
import Link from "next/link";
import { BlurReveal } from "./components/BlurReveal";

// Below-the-fold social proof: the visitor only reaches it after scrolling past
// three sections, so we load its JS lazily (after hydration) instead of bundling
// it into the initial page payload. The placeholder reserves vertical space so
// there's no layout shift when it swaps in. Same pattern Home uses for the globe.
const TestimonialsSection = dynamic(
  () => import("./components/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })),
  {
    ssr: false,
    loading: () => <div className="min-h-[60vh]" aria-hidden />,
  }
);

const FadeInSection = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const pageTitle = "text-black dark:text-[#f5f7fa]";
  const pageBody = "text-black/65 dark:text-white/65";

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center justify-start pt-4 md:pt-8 lg:pt-12 pb-16 md:pb-20 z-20 transition-colors duration-500">
      {/* Background glows */}
      <motion.div
        className="absolute top-[8%] right-[-10%] w-[620px] h-[620px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.10)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none opacity-45 dark:opacity-100"
        style={{ y: backgroundY }}
      />
      <motion.div
        className="absolute top-[55%] left-[-12%] w-[560px] h-[560px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.07)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none opacity-45 dark:opacity-100"
        style={{ y: backgroundY2 }}
      />

      <div className="w-full max-w-6xl px-5 sm:px-6 md:px-8">
        {/* 001 — Who we are */}
        <FadeInSection>
          <section className="pt-2 pb-16 md:pb-24" data-section="001">

            <BlurReveal
              as="h1"
              delay={0.1}
              className={`mt-5 font-ivyora font-medium tracking-[-2px] leading-[1.05] text-[44px] sm:text-[56px] md:text-[72px] ${pageTitle}`}
            >
              Performance is the largest untapped lever in your business.
            </BlurReveal>
            <p
              className={`mt-6 font-inter text-[16px] md:text-[18px] leading-relaxed max-w-2xl ${pageBody}`}
            >
              Enzy is the agentic performance system that turns scattered work data
              into decisions that compound. Built for companies who measure
              themselves by outcomes, not activity.
            </p>
          </section>
        </FadeInSection>

        {/* 002 — What we've learned */}
        <FadeInSection className="pb-16 md:pb-24">
          <section data-section="002">
            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { value: "24", unit: "M", label: "Weekly Enzy page views" },
                { value: "21", unit: "%", label: "Increase in sales per rep after implementing Enzy" },
                { value: "7,000", unit: "+", label: "Incentives ran" },
                { value: "180", unit: "K", label: "Total users" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="liquid-glass rounded-2xl border p-5 sm:p-6 transition-colors border-[#19ad7d]/20 bg-[#19ad7d]/[0.03] dark:border-[#19ad7d]/30 dark:bg-[linear-gradient(189.6deg,rgba(25,173,125,0.08)_25.1%,rgba(20,144,103,0.02)_64.2%)]"
                >
                  <dt
                    className="font-inter font-extrabold tracking-[-1.5px] leading-none text-[34px] sm:text-[40px] md:text-[44px] text-black dark:text-white"
                  >
                    {s.value}
                    <span className="ml-1 text-[15px] sm:text-[16px] font-bold tracking-tight text-[#19ad7d]">
                      {s.unit}
                    </span>
                  </dt>
                  <dd
                    className="mt-2 font-inter text-[12px] sm:text-[13px] font-medium leading-snug text-black/65 dark:text-white/65"
                  >
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </FadeInSection>

        {/* 003 — Why we exist */}
        <section data-section="003" className="pb-16 md:pb-24">


          <div className="mt-10 max-w-4xl flex flex-col gap-10">
            <FadeInSection delay={0.1}>
              <h3 className="font-ivyora font-medium text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] tracking-[-1px] text-black dark:text-white">
                We&apos;ve studied millions of sales interactions across incentives, goals, competitions, workflows, and performance systems. The pattern is always the same: <span className="text-[#19ad7d]">high-performing teams don&apos;t win because they have more data — they win because they turn fragmented behavior into visible momentum.</span>
              </h3>
            </FadeInSection>
            
            <div className="flex flex-col gap-6 pl-0 md:pl-8 border-l-0 md:border-l-[3px] border-[#19ad7d]/20 dark:border-[#19ad7d]/30">
              <FadeInSection delay={0.2}>
                <p className="font-inter text-[18px] md:text-[20px] leading-relaxed text-black/80 dark:text-white/80">
                  That starts with consolidation. Data, tools, processes, incentives, and rep activity must exist in one connected performance layer. Once the system is unified, modern AI can identify the hidden patterns humans miss — the behaviors driving pipeline, the habits creating momentum, and the gaps slowing teams down.
                </p>
              </FadeInSection>
              
              <FadeInSection delay={0.3}>
                <p className="font-inter text-[18px] md:text-[20px] leading-relaxed text-black/80 dark:text-white/80">
                  From there, we help teams operationalize those insights with the right workflows, automations, and technologies to maximize performance at scale.
                </p>
              </FadeInSection>
              
              <FadeInSection delay={0.4}>
                <p className="font-inter text-[18px] md:text-[20px] leading-relaxed text-black/80 dark:text-white/80">
                  <strong className="text-black font-bold dark:text-white">Enzy exists because sales performance is not random.</strong> It&apos;s measurable, predictable, and engineerable. We build the infrastructure that turns behavior into revenue.
                </p>
              </FadeInSection>
            </div>
          </div>
        </section>



      </div>

      {/* Testimonials break out of the page's `max-w-6xl` content rail so
          the marquee can run edge-to-edge of the viewport on every screen. */}
      <FadeInSection className="w-full pb-16 md:pb-24">
        <TestimonialsSection />
      </FadeInSection>

      <div className="w-full max-w-6xl px-5 sm:px-6 md:px-8">
        {/* 004 — Next */}
        <FadeInSection className="pb-12 md:pb-16">
          <section data-section="004">


            <div
              className="mt-7 relative rounded-[40px] p-10 md:p-16 text-center flex flex-col items-center overflow-hidden group transition-all duration-500 liquid-glass border-[#19ad7d]/20 bg-[#19ad7d]/5 dark:border-[#19ad7d]/30 dark:bg-[linear-gradient(189.6deg,rgba(25,173,125,0.15)_25.1%,rgba(20,144,103,0.05)_64.2%)]"
            >
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(25,173,125,0.2)_0%,transparent_70%)] transition-opacity duration-700 pointer-events-none opacity-20 group-hover:opacity-40 dark:opacity-50 dark:group-hover:opacity-100"
              />

              <h2
                className="relative z-10 font-ivyora font-medium tracking-[-2px] leading-[1.05] text-3xl md:text-5xl text-black dark:text-white"
              >
                See what your performance data is{" "}
                <em className="not-italic text-[#19ad7d]">trying to tell you.</em>
              </h2>

              <div className="relative z-10 mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto max-w-md sm:max-w-none">
                <CTAButton
                  href={BOOK_DEMO_HREF}
                  variant="primary"
                  className="book-demo-cta-marker w-full sm:w-auto justify-center px-8 py-4 gap-3 font-semibold text-[15px] tracking-tight hover:scale-[1.02] hover:!opacity-100 shadow-[0_0_28px_rgba(25,173,125,0.35)]"
                >
                  Book a Demo <ArrowRight size={18} aria-hidden />
                </CTAButton>
                <Link
                  href="/resources"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 font-inter text-sm font-semibold rounded-full transition-colors text-black/70 hover:text-black hover:bg-black/5 border border-black/10 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/[0.06] dark:border-white/10"
                >
                  Read customer stories →
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

        {/* About footer */}
        <footer className="pt-2 pb-6">
          <div
            className="flex flex-col md:flex-row md:items-center md:justify-center gap-2 font-inter text-[12px] tracking-tight text-black/45 dark:text-white/40"
          >
            <p className="m-0">© ENZY 2026</p>
          </div>
        </footer>

      </div>
    </div>
  );
}
