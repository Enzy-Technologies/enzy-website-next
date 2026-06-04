"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { CTAButton } from "./components/CTAButton";
import { BlurReveal } from "./components/BlurReveal";
import Image from "next/image";

import imgInsightsBg from "@/assets/fe07aab853fa3e439a789e527dbd50601d1228f8.png";
import imgStoriesBottom from "@/assets/7354577476170e09a14529efd0dbdd4c33144226.png";

type LearnCard = {
  id: string;
  title: string;
  desc: string;
  /** Destination for the "Open ___" button in the expanded card. */
  href: string;
  colSpan: string;
  content: string;
  textColor: string;
  descColor: string;
  bgImage?: string | null;
  customBg?: string;
  bottomImage?: string;
  innerImage?: string;
  layoutStyle?: string;
};

// Source of truth = the Resources submenu in the nav: Insights, Customer
// Stories, Partners, Integrations. Each card opens an expanded preview whose
// "Open ___" button links to that section's page.
const LEARN_DATA: LearnCard[] = [
  {
    id: "insights",
    title: "Insights",
    desc: "What to measure. What to change. What to do next.",
    href: "/insights",
    colSpan: "col-span-12 lg:col-span-6",
    bgImage: imgInsightsBg.src,
    textColor: "text-black",
    descColor: "text-black/70",
    layoutStyle: "tile1",
    content:
      "Short reads on what drives performance.\n\n- The KPIs that actually predict outcomes\n- What top teams do daily\n- How to turn signal into action",
  },
  {
    id: "customer-stories",
    title: "Customer Stories",
    desc: "Real teams. Real rollouts. Real results.",
    href: "/customer-stories",
    colSpan: "col-span-12 lg:col-span-6",
    bgImage: null,
    bottomImage: imgStoriesBottom.src,
    textColor: "text-white",
    descColor: "text-white/70",
    customBg: "liquid-glass bg-[rgba(17,17,19,0.55)] border-white/12",
    layoutStyle: "tile3",
    content:
      "Quick case studies.\n\n- What they set up\n- What changed\n- What improved (and how fast)",
  },
  {
    id: "partners",
    title: "Partners",
    desc: "The companies we trust to help teams grow.",
    href: "/partners",
    colSpan: "col-span-12 lg:col-span-6",
    bgImage: null,
    textColor: "text-black dark:text-white",
    descColor: "text-black/70 dark:text-white/70",
    content:
      "The tools, services, and companies our customers rely on.\n\n- Payroll & commissions\n- Apparel, gear & swag\n- Background checks\n- And more",
  },
  {
    id: "integrations",
    title: "Integrations",
    desc: "Connect Enzy to your existing tech stack.",
    href: "/integrations",
    colSpan: "col-span-12 lg:col-span-6",
    bgImage: null,
    textColor: "text-black dark:text-white",
    descColor: "text-black/70 dark:text-white/70",
    content:
      "Plug Enzy into the tools you already use.\n\n- CRMs, dialers & field-service platforms\n- Automatically track activity\n- Sync records and trigger actions\n- 60+ integrations",
  },
];

export function Resources() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const selectedItem = LEARN_DATA.find((item) => item.id === selectedId);

  // Helper to render the inner image layout based on the tile style
  const renderTileContent = (item: LearnCard) => {
    return (
      <>
        {/* Backgrounds */}
        {item.bgImage && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Image
              src={item.bgImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`absolute object-cover ${
                item.layoutStyle === "tile1"
                  ? "left-0 top-[-5%] h-[110%]"
                  : "left-0 top-0"
              }`}
            />
          </div>
        )}
        {item.customBg && !item.bgImage && (
          <div className="absolute inset-0 bg-gradient-to-b from-black to-[#1a1a1f] pointer-events-none" />
        )}

        {/* Inner specific images */}
        {item.bottomImage && item.layoutStyle === "tile3" && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[320px] rounded-t-[16px] overflow-hidden h-[180px] pointer-events-none">
            <Image
              src={item.bottomImage}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        )}

        {/* Text Content */}
        <div className="relative z-10 flex flex-col p-8 md:p-10 max-w-[380px]">
          <h3
            className={`font-inter text-[20px] tracking-tight mb-2 ${item.textColor}`}
          >
            {item.title}
          </h3>
          <p className={`font-inter text-[16px] leading-snug ${item.descColor}`}>
            {item.desc}
          </p>
        </div>
      </>
    );
  };

  return (
    <>
      <section
        ref={containerRef}
        className="relative flex flex-col items-center justify-start w-full px-4 pt-7 md:pt-10 pb-12 md:pb-16 max-w-7xl mx-auto z-20"
      >
        <motion.div
          className="absolute top-[0%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.06)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none opacity-50 dark:opacity-100"
          style={{ y: backgroundY }}
        />
        <motion.div
          className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(25,173,125,0.04)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none opacity-50 dark:opacity-100"
          style={{ y: backgroundY2 }}
        />
        <motion.div className="enzy-hero-reveal flex flex-col items-center w-full mb-16 relative z-10">
          <BlurReveal
            as="h1"
            delay={0.1}
            className="font-ivyora font-medium text-[40px] sm:text-[50px] md:text-[64px] leading-[1.05] tracking-[-2px] text-center max-w-4xl transition-colors duration-500 text-black dark:text-[#f5f7fa]"
          >
            Learn in minutes
          </BlurReveal>
          <p className="font-inter text-base md:text-lg mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 text-black/60 dark:text-white/60">
            Insights, customer stories, partners, and integrations — everything
            to get more out of Enzy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1200px] mx-auto">
          {LEARN_DATA.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-container-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className={`relative overflow-hidden rounded-[24px] cursor-pointer group flex flex-col min-h-[380px] w-full ${item.colSpan} ${
                item.customBg || "liquid-glass"
              }`}
              whileHover={{ scale: 0.99 }}
              transition={{ duration: 0.3 }}
            >
              {renderTileContent(item)}

              {/* Subtle hover overlay to indicate it's clickable */}
              <div className="pointer-events-none absolute inset-0 z-20 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.04] dark:group-hover:bg-white/[0.04]" />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && selectedItem && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md cursor-pointer"
              />
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                  layoutId={`card-container-${selectedItem.id}`}
                  className={`relative overflow-hidden rounded-[32px] w-full max-w-5xl h-[85vh] max-h-[700px] pointer-events-auto flex flex-col md:flex-row liquid-glass ${
                    selectedItem.customBg
                      ? "bg-[rgba(17,17,19,0.55)] border-white/12"
                      : ""
                  }`}
                >
                  {/* Left/Top Half: Original Artwork Layout */}
                  <div
                    className={`relative w-full md:w-1/2 h-[40%] md:h-full flex-shrink-0 ${
                      selectedItem.customBg ||
                      "bg-white/40 dark:bg-[rgba(11,15,20,0.5)]"
                    }`}
                  >
                    {renderTileContent(selectedItem)}
                  </div>

                  {/* Right/Bottom Half: Expanded Content */}
                  <div className="flex-1 w-full md:w-1/2 h-[60%] md:h-full border-l p-8 backdrop-blur-xl md:p-12 flex flex-col relative z-20 overflow-y-auto border-black/10 bg-white/92 text-black dark:border-white/10 dark:bg-[#0b0f14]/92 dark:text-white">
                    <button
                      onClick={() => setSelectedId(null)}
                      className="absolute top-6 right-6 p-2 rounded-full transition-colors bg-black/5 hover:bg-black/10 text-black dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
                    >
                      <X size={20} />
                    </button>

                    <h2 className="font-ivyora font-medium text-4xl md:text-5xl tracking-[-2px] mb-6 mt-4 text-black dark:text-white">
                      {selectedItem.title}
                    </h2>
                    <p className="font-inter text-base md:text-[17px] mb-8 leading-relaxed whitespace-pre-line text-black/65 dark:text-white/65">
                      {selectedItem.content}
                    </p>

                    <div className="mt-auto pt-8">
                      <CTAButton
                        href={selectedItem.href}
                        variant="primary"
                        className="w-full sm:w-auto px-8 py-4 font-semibold text-[14px]"
                      >
                        Open {selectedItem.title}{" "}
                        <ArrowRight size={16} className="ml-2" />
                      </CTAButton>
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
