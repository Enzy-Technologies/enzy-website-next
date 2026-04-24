"use client";

import React from "react";
import { ArrowRight, Target } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "./components/ThemeProvider";
import { CTAButton } from "./components/CTAButton";
import { BOOK_DEMO_HREF } from "./lib/booking";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// Helper for smooth scroll fade-in sections
const FadeInSection = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
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

function AboutFeatureCard({
  title,
  description,
  bullets,
  img,
  isLightMode,
}: {
  title: string;
  description: string;
  bullets?: string[];
  img: string;
  isLightMode: boolean;
}) {
  return (
    <div
      className={`relative h-full overflow-hidden text-left transition-all duration-500 ease-out ring-1 ring-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.18)] rounded-[32px] ${
        isLightMode ? "bg-white/40" : "bg-black/20"
      }`}
    >
      <ImageWithFallback
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out"
      />

      {/* Soft vignette for readability (same intent as FeaturesSection) */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
          isLightMode ? "from-white/70 via-white/20 to-transparent" : "from-black/65 via-black/20 to-transparent"
        }`}
      />

      {/* Frosted content sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 flex flex-col border-t px-7 pb-8 pt-7 backdrop-blur-xl rounded-b-[28px] ${
          isLightMode
            ? "border-black/10 bg-white/70"
            : "border-white/15 bg-black/35"
        }`}
      >
        <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/45 to-transparent" />
        <h3
          className={`font-['Inter'] text-[20px] md:text-[22px] font-semibold tracking-tight ${
            isLightMode ? "text-black" : "text-white"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-2 font-['Inter'] text-[14px] md:text-[15px] leading-relaxed ${
            isLightMode ? "text-black/65" : "text-white/70"
          }`}
        >
          {description}
        </p>

        {bullets && bullets.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#19ad7d] shrink-0 shadow-[0_0_10px_rgba(25,173,125,0.55)]" />
                <span className={`font-['Inter'] text-[13px] md:text-[14px] leading-snug ${isLightMode ? "text-black/75" : "text-white/75"}`}>
                  {b}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

const HERO_IMAGE = "https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600";
const PHILOSOPHY_IMAGE = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600";
const PAIN_IMAGE = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600";

const SYSTEM_CARD_IMAGES = {
  connect: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  understand: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  act: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
} as const;

const WHY_IT_WORKS_IMAGES = {
  adoption: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  signal: "https://images.unsplash.com/photo-1556155092-490a1ba16284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  momentum: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
} as const;

const PAIN_CARD_IMAGES = {
  reporting: "https://images.unsplash.com/photo-1523958203904-cdcb402031fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  visibility: "https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
  motivation: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600",
} as const;


export function About() {
  const { isLightMode } = useTheme();
  const homeCardBase = `relative rounded-[28px] p-7 md:p-8 transition-colors duration-500 liquid-glass`;
  const homeCardHover = isLightMode ? "hover:bg-[#19ad7d]/10" : "hover:bg-[rgba(25,173,125,0.06)]";
  const homeCardTopAccent = "pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/35 to-transparent";

  return (
    <>
      <div className="relative w-full flex flex-col items-center justify-start pt-8 md:pt-16 lg:pt-24 pb-24 md:pb-32 overflow-hidden z-20 transition-colors duration-500">

        {/* Background Glows */}
        <div className={`absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.10)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none ${isLightMode ? 'opacity-50' : 'opacity-100'}`} />
        <div className={`absolute top-[55%] left-[-10%] w-[520px] h-[520px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.07)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none ${isLightMode ? 'opacity-50' : 'opacity-100'}`} />

        {/* ───────────────────────────── HERO (split, visual) ───────────────────────────── */}
        <div className="w-full max-w-7xl px-6 md:px-10 mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Text side */}
            <FadeInSection className="lg:col-span-6 flex flex-col items-start text-left">
              <div className={`px-5 py-2 rounded-full border backdrop-blur-sm mb-8 transition-colors duration-500 eyebrow ${isLightMode ? 'border-black/10 bg-black/5 text-black/60' : 'border-white/10 bg-white/5 text-white/60'}`}>
                About Enzy
              </div>
              <h1 className={`font-['IvyOra_Text'] font-medium text-[42px] sm:text-5xl md:text-6xl lg:text-[76px] leading-[1.02] tracking-[-2px] mb-6 md:mb-8 transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
                Built by operators who&rsquo;ve <span className="text-[#19ad7d]">lived it</span>.
              </h1>
              <p className={`font-['Inter'] text-lg md:text-xl leading-relaxed max-w-xl mb-10 transition-colors duration-500 ${isLightMode ? 'text-black/65' : 'text-white/65'}`}>
                Years inside sales orgs taught us what actually moves teams—and what quietly kills them. Enzy is that experience, distilled into a system your team will actually use.
              </p>

              {/* Key points chips */}
              <div className="flex flex-wrap gap-3">
                {[
                  "Field-tested",
                  "Built for adoption",
                  "Outcomes over features",
                ].map((t) => (
                  <span
                    key={t}
                    className={`px-4 py-2 rounded-full text-[12px] md:text-[13px] font-['Inter'] font-medium tracking-tight border backdrop-blur-md transition-colors duration-500
                      ${isLightMode ? 'border-black/10 bg-white/60 text-black/70' : 'border-white/10 bg-white/5 text-white/70'}`}
                  >
                    <span className="text-[#19ad7d] mr-1.5">●</span>
                    {t}
                  </span>
                ))}
              </div>
            </FadeInSection>

            {/* Visual side */}
            <FadeInSection delay={0.1} className="lg:col-span-6 w-full">
              <div className="relative aspect-[4/5] md:aspect-[5/6] lg:aspect-[4/5] w-full rounded-[32px] overflow-hidden liquid-glass">
                <ImageWithFallback
                  src={HERO_IMAGE}
                  alt="Enzy team on the floor"
                  className={`w-full h-full object-cover transition-all duration-700 ${isLightMode ? 'opacity-90 mix-blend-luminosity hover:mix-blend-normal' : 'opacity-65 mix-blend-luminosity hover:mix-blend-normal hover:opacity-95'}`}
                />
                {/* Depth overlays */}
                <div className={`absolute inset-0 bg-gradient-to-t ${isLightMode ? 'from-white/50 via-white/10 to-transparent' : 'from-[#0b0f14] via-[#0b0f14]/30 to-transparent'}`} />

                {/* Floating stat badge */}
                <div className={`absolute bottom-6 left-6 right-6 md:left-8 md:right-8 p-5 rounded-2xl border backdrop-blur-xl transition-colors duration-500 ${isLightMode ? 'bg-white/75 border-black/10' : 'bg-black/50 border-white/10'}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className={`font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.14em] mb-1 ${isLightMode ? 'text-black/50' : 'text-white/50'}`}>
                        Used by
                      </div>
                      <div className={`font-['IvyOra_Text'] text-[22px] md:text-[26px] leading-none tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                        Teams in 40+ states
                      </div>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <div className="font-['Inter'] text-[28px] md:text-[32px] font-bold text-[#19ad7d] leading-none">35%</div>
                      <div className={`font-['Inter'] text-[11px] tracking-tight mt-1 ${isLightMode ? 'text-black/55' : 'text-white/55'}`}>
                        more selling time
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

          </div>
        </div>

        <div className="max-w-6xl w-full px-5 sm:px-6 md:px-8 flex flex-col items-center text-center">

          {/* ───────────────────────────── PHILOSOPHY / PULLQUOTE ───────────────────────────── */}
          <FadeInSection className="w-full mb-24 md:mb-32">
            <div className={`relative rounded-[36px] overflow-hidden liquid-glass transition-colors duration-500`}>
              {/* Image band */}
              <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
                <ImageWithFallback
                  src={PHILOSOPHY_IMAGE}
                  alt="Team working together"
                  className={`w-full h-full object-cover ${isLightMode ? 'opacity-75 mix-blend-luminosity' : 'opacity-40 mix-blend-luminosity'}`}
                />
                <div className={`absolute inset-0 ${isLightMode ? 'bg-gradient-to-t from-white via-white/70 to-white/30' : 'bg-gradient-to-t from-[#0b0f14] via-[#0b0f14]/80 to-[#0b0f14]/30'}`} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,173,125,0.14)_0%,transparent_60%)]" />
              </div>

              {/* Quote overlay */}
              <div className="relative -mt-24 md:-mt-40 px-8 md:px-16 pb-14 md:pb-20">
                <div className="eyebrow text-[#19ad7d] mb-5">Our philosophy</div>
                <blockquote className={`font-['IvyOra_Text'] font-medium text-3xl md:text-5xl lg:text-[56px] leading-[1.08] tracking-[-1.5px] transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
                  Tools don&rsquo;t change outcomes.{" "}
                  <span className="text-[#19ad7d]">Systems do.</span>
                </blockquote>
                <p className={`mt-6 font-['Inter'] text-[15px] md:text-[16px] leading-relaxed max-w-2xl mx-auto transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                  We didn&rsquo;t stack features. We built a system—curated, opinionated, connected—so the right action is always the obvious one.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* ───────────────────────────── PAIN → FIX (confidence booster) ───────────────────────────── */}
          <FadeInSection className="w-full mb-24 md:mb-32 text-left">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
              <div className="eyebrow text-[#19ad7d]">Why we built Enzy</div>
              <h2 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-5xl tracking-[-2px] transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
                <span className="block">We know the pains.</span>
                <span className="block text-[#19ad7d]">We built the fix.</span>
              </h2>
              <p className={`font-['Inter'] text-[15px] md:text-[16px] leading-relaxed max-w-2xl transition-colors duration-500 ${isLightMode ? 'text-black/65' : 'text-white/65'}`}>
                The tools are the means. The outcomes are the point.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 md:gap-8">
              {/* Pain/Fix cards */}
              <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                {[
                  {
                    title: "Reps tune out reporting",
                    description: "Give them insight they actually use in the field.",
                    bullets: ["Less admin", "More focus", "More activity"],
                    img: PAIN_CARD_IMAGES.reporting,
                  },
                  {
                    title: "Leaders fly blind between syncs",
                    description: "Live signal and summaries—no Monday recap required.",
                    bullets: ["Always-on visibility", "Fewer surprises", "Clear priorities"],
                    img: PAIN_CARD_IMAGES.visibility,
                  },
                  {
                    title: "Motivation dies after kickoff",
                    description: "Automated competitions and incentives keep it alive.",
                    bullets: ["Cadence built in", "Recognition that lands", "Momentum weekly"],
                    img: PAIN_CARD_IMAGES.motivation,
                  },
                ].map((x) => (
                  <div key={x.title} className="relative min-h-[510px]">
                    <AboutFeatureCard
                      title={x.title}
                      description={x.description}
                      bullets={x.bullets}
                      img={x.img}
                      isLightMode={isLightMode}
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          {/* ───────────────────────────── CORE: Connect / Understand / Act ───────────────────────────── */}
          <FadeInSection className="w-full mb-24 md:mb-32">
            <div className="flex flex-col items-center text-center gap-4 mb-10 md:mb-12">
              <div className="eyebrow text-[#19ad7d]">The system</div>
              <h2 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-5xl tracking-[-2px] transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
                Three moves. One flow.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 text-left">
              {[
                {
                  step: "01",
                  title: "Connect",
                  description: "Plug into your tools and data sources.",
                  bullets: ["CRM + HR + comms", "Clean structure", "One place to work"],
                  img: SYSTEM_CARD_IMAGES.connect,
                },
                {
                  step: "02",
                  title: "Understand",
                  description: "AI summarizes what changed and why it matters.",
                  bullets: ["Daily signal", "Context in seconds", "Next-best action"],
                  img: SYSTEM_CARD_IMAGES.understand,
                },
                {
                  step: "03",
                  title: "Act",
                  description: "Launch competitions, incentives, and messaging—fast.",
                  bullets: ["Competitions", "Incentives", "Automations"],
                  img: SYSTEM_CARD_IMAGES.act,
                },
              ].map((x) => (
                <div key={x.step} className="relative min-h-[510px]">
                  <AboutFeatureCard
                    title={`${x.step}  ${x.title}`}
                    description={x.description}
                    bullets={x.bullets}
                    img={x.img}
                    isLightMode={isLightMode}
                  />
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* ───────────────────────────── PROOF ───────────────────────────── */}
          <FadeInSection className="w-full mb-24 md:mb-32">
            <div className="text-center mb-12">
              <div className="eyebrow text-[#19ad7d] mb-4">The outcomes</div>
              <h2 className={`font-['IvyOra_Text'] font-medium text-3xl md:text-4xl lg:text-5xl tracking-[-2px] mb-4 transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
                Results teams feel daily
              </h2>
              <p className={`font-['Inter'] text-base max-w-2xl mx-auto transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                Less admin work. More focus. More execution.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
              {[
                { stat: "35%", label: "Increase in active selling time" },
                { stat: "40%", label: "Reduction in manual entry tasks" },
                { stat: "2.5x", label: "Faster response to critical leads" }
              ].map((item, i) => (
                <div key={i} className={`${homeCardBase} ${homeCardHover} flex flex-col items-center justify-center text-center group`}>
                  <span className={`font-['Inter'] text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b mb-3 transition-all duration-500 ${isLightMode ? 'from-black to-black/50 group-hover:from-[#19ad7d] group-hover:to-[#19ad7d]/80' : 'from-white to-white/50 group-hover:from-[#19ad7d] group-hover:to-[#19ad7d]/50'}`}>
                    {item.stat}
                  </span>
                  <span className={`font-['Inter'] text-sm font-medium leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* ───────────────────────────── WHY IT WORKS ───────────────────────────── */}
          <FadeInSection className="w-full mb-24 md:mb-32 text-left">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
              <div className="eyebrow text-[#19ad7d]">Why it works</div>
              <h2 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-5xl tracking-[-2px] transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
                Designed for adoption and action
              </h2>
              <p className={`font-['Inter'] text-[15px] md:text-[16px] leading-relaxed max-w-2xl transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                Three reasons teams keep Enzy open every day.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
              {[
                {
                  title: "Built for adoption",
                  description: "Fast, simple, and designed for daily use.",
                  bullets: ["Modern UI reps like", "Clear goals and progress", "Mobile-first"],
                  img: WHY_IT_WORKS_IMAGES.adoption,
                },
                {
                  title: "Connected data → clear signal",
                  description: "AI highlights what changed and what to do next.",
                  bullets: ["Real-time visibility", "Summaries and suggestions", "Less admin work"],
                  img: WHY_IT_WORKS_IMAGES.signal,
                },
                {
                  title: "Momentum that sticks",
                  description: "Competitions and incentives reinforce behavior.",
                  bullets: ["Launch in minutes", "Team or individual", "Rewards and recognition"],
                  img: WHY_IT_WORKS_IMAGES.momentum,
                },
              ].map((x) => (
                <div key={x.title} className="relative min-h-[510px]">
                  <AboutFeatureCard
                    title={x.title}
                    description={x.description}
                    bullets={x.bullets}
                    img={x.img}
                    isLightMode={isLightMode}
                  />
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* ───────────────────────────── CTA ───────────────────────────── */}
          <FadeInSection className="w-full">
            <div className={`relative w-full rounded-[40px] p-12 md:p-20 text-center flex flex-col items-center overflow-hidden group transition-all duration-500 liquid-glass ${isLightMode ? 'border-[#19ad7d]/20 bg-[#19ad7d]/5' : 'border-[#19ad7d]/30 bg-[linear-gradient(189.6deg,rgba(25,173,125,0.15)_25.1%,rgba(20,144,103,0.05)_64.2%)]'}`}>

              {/* CTA Background Effects */}
              <div className={`absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(25,173,125,0.2)_0%,transparent_70%)] transition-opacity duration-700 pointer-events-none ${isLightMode ? 'opacity-20 group-hover:opacity-40' : 'opacity-50 group-hover:opacity-100'}`} />

              <Target size={48} className="text-[#19ad7d] mb-8 relative z-10" />
              <h2 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-5xl mb-6 tracking-[-2px] relative z-10 transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>
                Ready to change how your team works?
              </h2>
              <p className={`font-['Inter'] text-lg max-w-xl mx-auto mb-10 relative z-10 leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/70' : 'text-white/70'}`}>
                See the system live. Get a plan for your team this quarter.
              </p>
              <CTAButton
                href={BOOK_DEMO_HREF}
                variant="primary"
                className="relative z-10 gap-3 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 hover:!opacity-100 shadow-[0_0_28px_rgba(25,173,125,0.35)]"
              >
                Book a demo <ArrowRight size={18} aria-hidden />
              </CTAButton>
            </div>
          </FadeInSection>

        </div>

        <TestimonialsSection />
      </div>
    </>
  );
}
