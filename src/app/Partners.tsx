"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTheme } from "./components/ThemeProvider";
import { BlurReveal } from "./components/BlurReveal";
import { CTAButton } from "./components/CTAButton";
import { ArrowRight, CheckCircle2, Zap, Network, Rocket } from "lucide-react";
import { SiteShell } from "./components/SiteShell";
import Image from "next/image";

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

const PARTNER_STEPS = [
  {
    numeral: "01",
    title: "Connect Your Data",
    body: "Build a seamless integration with Enzy's open API. Push activities, events, and metrics directly into our performance graph.",
    icon: Network,
    benefits: ["RESTful API & Webhooks", "OAuth 2.0 Security", "Developer Sandbox"],
  },
  {
    numeral: "02",
    title: "Enrich the Ecosystem",
    body: "Your app becomes a source of truth for competitions, leaderboards, and AI coaching. Give mutual customers unprecedented visibility.",
    icon: Zap,
    benefits: ["Real-time Sync", "Triggered Workflows", "Shared Customers"],
  },
  {
    numeral: "03",
    title: "Grow Together",
    body: "Get listed in the Enzy Marketplace. We actively co-market with certified partners to drive adoption and retention.",
    icon: Rocket,
    benefits: ["Marketplace Listing", "Co-marketing Campaigns", "Dedicated Partner Manager"],
  },
];

const LOGO_PLACEHOLDERS = [
  { name: "Salesforce", url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  { name: "HubSpot", url: "https://upload.wikimedia.org/wikipedia/commons/f/f0/HubSpot_Logo.png" },
  { name: "Gong", url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Gong_Logo.svg" },
  { name: "Outreach", url: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Outreach_Logo.png" },
  { name: "Slack", url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
  { name: "Zoom", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg" },
  { name: "Zendesk", url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Zendesk_logo.svg" },
  { name: "Microsoft Teams", url: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" },
];

export function Partners() {
  const { isLightMode } = useTheme();

  return (
    <SiteShell>
      {/* Hero Section */}
      <section className="relative w-full px-4 pt-32 pb-16 md:pt-48 md:pb-32 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center max-w-4xl"
          >
            <div className={`px-5 py-2 rounded-full border backdrop-blur-sm mb-6 md:mb-8 transition-colors duration-500 eyebrow ${
              isLightMode ? 'border-black/10 bg-black/5 text-black/60' : 'border-white/10 bg-white/5 text-white/60'
            }`}>
              Partner Network
            </div>
            
            <BlurReveal
              as="h1"
              className={`font-ivyora font-medium text-5xl md:text-7xl lg:text-[90px] leading-[0.95] tracking-[-2px] text-center transition-colors duration-500 ${
                isLightMode ? "text-brand-dark" : "text-brand-light"
              }`}
            >
              Build with Enzy.
              <br />
              Grow with Enzy.
            </BlurReveal>

            <BlurReveal
              as="p"
              delay={0.1}
              className={`font-inter text-lg md:text-xl mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 ${
                isLightMode ? "text-black/60" : "text-white/60"
              }`}
            >
              Join the ecosystem that&apos;s powering the daily execution of top sales teams. Integrate your product, share customers, and drive adoption.
            </BlurReveal>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <CTAButton href="mailto:partners@enzy.co">
                Become a Partner
              </CTAButton>
              <a
                href="#directory"
                className={`font-inter text-sm font-semibold tracking-wide uppercase px-6 py-3 rounded-full border transition-colors ${
                  isLightMode
                    ? "border-black/10 hover:bg-black/5 text-black"
                    : "border-white/10 hover:bg-white/5 text-white"
                }`}
              >
                View Directory
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 1-2-3 Stack Section */}
      <section className="relative w-full px-4 py-24 md:py-32 bg-[#19ad7d]/5 border-y border-[#19ad7d]/10">
        <div className="max-w-7xl mx-auto">
          <FadeInSection className="text-center mb-16 md:mb-24">
            <h2 className={`font-ivyora text-4xl md:text-5xl lg:text-6xl tracking-[-2px] ${
              isLightMode ? "text-brand-dark" : "text-brand-light"
            }`}>
              What a partnership means
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {PARTNER_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <FadeInSection key={idx} delay={idx * 0.1} className="h-full">
                  <div className={`h-full p-8 md:p-10 rounded-[32px] border flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2 liquid-glass ${
                    isLightMode ? "border-black/5 hover:border-[#19ad7d]/30 hover:shadow-lg" : "border-white/5 hover:border-[#19ad7d]/30 hover:shadow-2xl hover:shadow-[#19ad7d]/10"
                  }`}>
                    {/* Background glow on hover */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-[#19ad7d] opacity-0 group-hover:opacity-10 blur-[60px] rounded-full transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-[#19ad7d]/10 flex items-center justify-center text-[#19ad7d]">
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <span className="font-ivyora text-4xl md:text-5xl text-[#19ad7d]/20 font-bold">
                        {step.numeral}
                      </span>
                    </div>
                    
                    <h3 className={`font-inter text-2xl font-bold mb-4 relative z-10 ${
                      isLightMode ? "text-black" : "text-white"
                    }`}>
                      {step.title}
                    </h3>
                    
                    <p className={`font-inter text-sm md:text-base leading-relaxed mb-8 relative z-10 ${
                      isLightMode ? "text-black/60" : "text-white/60"
                    }`}>
                      {step.body}
                    </p>

                    <div className="mt-auto pt-6 border-t relative z-10 border-current" style={{ borderColor: isLightMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }}>
                      <ul className="flex flex-col gap-3">
                        {step.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-[#19ad7d] shrink-0 mt-0.5" />
                            <span className={`font-inter text-sm font-medium ${
                              isLightMode ? "text-black/80" : "text-white/80"
                            }`}>
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Grid / Directory */}
      <section id="directory" className="relative w-full px-4 py-24 md:py-32 max-w-7xl mx-auto">
        <FadeInSection className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <h2 className={`font-ivyora text-4xl md:text-5xl lg:text-6xl tracking-[-2px] mb-6 ${
            isLightMode ? "text-brand-dark" : "text-brand-light"
          }`}>
            Integrated with the tools you use
          </h2>
          <p className={`font-inter text-lg max-w-2xl leading-relaxed ${
            isLightMode ? "text-black/60" : "text-white/60"
          }`}>
            Connect Enzy to your existing tech stack to automatically track activities, update records, and trigger actions.
          </p>
        </FadeInSection>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {LOGO_PLACEHOLDERS.map((logo, i) => (
            <FadeInSection key={i} delay={i * 0.05}>
              <div className={`aspect-[4/3] rounded-2xl border flex flex-col items-center justify-center p-6 transition-all duration-300 group cursor-pointer ${
                isLightMode 
                  ? "border-black/5 bg-black/[0.02] hover:bg-black/5 hover:border-black/10" 
                  : "border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10"
              }`}>
                {/* Fallback to simple text if image fails or for simplicity, using filter for generic logos */}
                <div className="flex-1 w-full flex items-center justify-center relative">
                   <Image 
                     src={logo.url} 
                     alt={`${logo.name} integration`}
                     width={120}
                     height={40}
                     className={`object-contain transition-transform duration-300 group-hover:scale-110 ${
                        // Just applying a generic grayscale/invert based on theme since they are placeholder Wikipedia URLs
                       isLightMode ? "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100" : "grayscale invert opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                     }`}
                   />
                </div>
                <div className={`mt-4 w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-inter text-xs font-semibold uppercase tracking-wider ${
                  isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"
                }`}>
                  <span>{logo.name}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4} className="mt-16 text-center">
          <p className={`font-inter text-sm md:text-base ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
            Don&apos;t see your tool? <a href="mailto:partners@enzy.co" className="text-[#19ad7d] hover:underline font-semibold">Let us know</a> what we should build next.
          </p>
        </FadeInSection>
      </section>

      {/* Bottom CTA */}
      <section className="relative w-full px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeInSection>
            <h2 className={`font-ivyora text-5xl md:text-7xl tracking-[-2px] leading-[0.95] mb-8 ${
              isLightMode ? "text-brand-dark" : "text-brand-light"
            }`}>
              Ready to power performance?
            </h2>
            <p className={`font-inter text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto ${
              isLightMode ? "text-black/60" : "text-white/60"
            }`}>
              Get in touch with our partner team to discuss integration opportunities, API access, and joint go-to-market strategies.
            </p>
            <CTAButton href="mailto:partners@enzy.co" className="mx-auto flex justify-center">
              Contact Partner Team
            </CTAButton>
          </FadeInSection>
        </div>
      </section>
    </SiteShell>
  );
}
