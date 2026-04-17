"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { useTheme } from "./components/ThemeProvider";

import imgInsightsBg from "@/assets/fe07aab853fa3e439a789e527dbd50601d1228f8.png";
import imgPlaybooksBg from "@/assets/04f7043b15b6e1aecfd7c7b8261277090632e920.png";
import imgStoriesBottom from "@/assets/7354577476170e09a14529efd0dbdd4c33144226.png";
import imgGuidesBg from "@/assets/9368e161f7ccef0b8630da4ed437ddeb13cde5da.png";
import imgGuidesInner from "@/assets/395f406f620768136203f60a62cbda607afdcb51.png";
import imgCompareBg from "@/assets/347ebcbc0769d19e13ff2e7e68a1dcc26a17378f.png";
import imgCompareInner from "@/assets/f57cbb4a1a809fb2f1f6d8dbbeb8bd24d9813e93.png";

const LEARN_DATA = [
  {
    id: "insights",
    title: "Insights",
    desc: "Perspectives on sales performance and momentum.",
    colSpan: "col-span-12",
    bgImage: imgInsightsBg.src,
    textColor: "text-black",
    descColor: "text-black/70",
    layoutStyle: "tile1",
    content: "Deep dive into performance metrics and what truly drives sales momentum in modern teams. Here we explore behavioral science, daily habits, and organizational structures that win. Our insights are driven by millions of data points from field sales teams, breaking down exactly what separates top performers from the rest. Access reports, trend analysis, and expert commentary to stay ahead of the curve."
  },
  {
    id: "playbooks",
    title: "Playbooks",
    desc: "Proven systems to drive behavior and results.",
    colSpan: "col-span-12 lg:col-span-7",
    bgImage: imgPlaybooksBg.src,
    textColor: "text-black",
    descColor: "text-black/70",
    layoutStyle: "tile2",
    content: "Step-by-step guides to implementing Enzy in your team. Learn how to set up leaderboards, automate incentives, and structure daily competitions that actually work. Playbooks provide actionable frameworks that you can deploy today, whether you're managing a team of 10 or scaling a nationwide force of 1,000+ reps."
  },
  {
    id: "stories",
    title: "Customer Stories",
    desc: "How teams are building momentum with Enzy.",
    colSpan: "col-span-12 lg:col-span-5",
    bgImage: null,
    bottomImage: imgStoriesBottom.src,
    textColor: "text-white",
    descColor: "text-white/70",
    customBg:
      "liquid-glass bg-[rgba(17,17,19,0.55)] border-white/12",
    layoutStyle: "tile3",
    content: "See how top solar and roofing teams increased their appointment set rates by 40% in just two months using real-time leaderboards and automated field tracking. Read our collection of case studies featuring organizations that transformed their culture from complacent to competitive overnight."
  },
  {
    id: "guides",
    title: "Guides",
    desc: "Deep dives into performance systems and workflows.",
    colSpan: "col-span-12 lg:col-span-6",
    bgImage: imgGuidesBg.src,
    innerImage: imgGuidesInner.src,
    textColor: "text-white",
    descColor: "text-white/80",
    layoutStyle: "tile4",
    content: "Comprehensive documentation on integrating your CRM, setting up custom webhooks, and advanced reporting configurations. From initial setup to advanced workflow automation, our guides ensure your technical infrastructure supports your operational goals."
  },
  {
    id: "compare",
    title: "Compare",
    desc: "See how Enzy stacks up.",
    colSpan: "col-span-12 lg:col-span-6",
    bgImage: imgCompareBg.src,
    innerImage: imgCompareInner.src,
    textColor: "text-black",
    descColor: "text-black/70",
    layoutStyle: "tile5",
    content: "A detailed breakdown of Enzy vs legacy gamification platforms. See why real-time architecture and field-first design make the difference. Compare features, pricing structures, and implementation timelines to make an informed decision for your team."
  }
];

export function Resources() {
  const { isLightMode } = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem = LEARN_DATA.find((item) => item.id === selectedId);

  // Helper to render the inner image layout based on the tile style
  const renderTileContent = (item: typeof LEARN_DATA[0]) => {
    return (
      <>
        {/* Backgrounds */}
        {item.bgImage && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img 
              src={item.bgImage} 
              alt="" 
              className={`absolute object-cover w-full h-full ${
                item.layoutStyle === 'tile1' ? 'left-0 top-[-5%] h-[110%]' :
                item.layoutStyle === 'tile4' || item.layoutStyle === 'tile5' ? 'left-[-5%] w-[110%]' :
                'left-0 top-0'
              }`} 
            />
          </div>
        )}
        {item.customBg && !item.bgImage && (
          <div className="absolute inset-0 bg-gradient-to-b from-black to-[#1a1a1f] pointer-events-none" />
        )}

        {/* Inner specific images */}
        {item.bottomImage && item.layoutStyle === 'tile3' && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[320px] rounded-t-[16px] overflow-hidden h-[180px] pointer-events-none">
            <img src={item.bottomImage} className="w-full h-full object-cover" alt="" />
          </div>
        )}
        {item.innerImage && item.layoutStyle === 'tile4' && (
          <div className="absolute bottom-[-10%] left-[-5%] w-[80%] max-w-[320px] pointer-events-none">
            <img src={item.innerImage} className="w-full h-auto drop-shadow-2xl" alt="" />
          </div>
        )}
        {item.innerImage && item.layoutStyle === 'tile5' && (
          <div className="absolute top-0 right-0 h-full w-[50%] max-w-[280px] pointer-events-none">
            <img src={item.innerImage} className="w-full h-full object-cover object-left" alt="" />
          </div>
        )}

        {/* Text Content */}
        <div className="relative z-10 flex flex-col p-8 md:p-10 max-w-[380px]">
          <h3 className={`font-['Inter'] text-[20px] tracking-tight mb-2 ${item.textColor}`}>{item.title}</h3>
          <p className={`font-['Inter'] text-[16px] leading-snug ${item.descColor}`}>{item.desc}</p>
        </div>
      </>
    );
  };

  return (
    <>
      <section className="relative flex flex-col items-center justify-start w-full px-4 pt-8 md:pt-16 lg:pt-24 pb-12 md:pb-16 z-20">
        <div className="max-w-7xl mx-auto w-full mb-16">
        <h1 className={`font-['IvyOra_Text'] font-medium text-5xl md:text-7xl leading-tight tracking-[-2px] text-center transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
          Learn <span className="text-[#19ad7d]">More</span>
        </h1>
        <p className={`font-['Inter'] text-sm md:text-base mt-6 max-w-2xl mx-auto text-center transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
          Dive into proven systems, expert playbooks, and everything you need to build momentum in your team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-[1200px] mx-auto">
        {LEARN_DATA.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-container-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className={`relative overflow-hidden rounded-[24px] cursor-pointer group flex flex-col min-h-[380px] w-full ${item.colSpan} ${
              item.customBg ||
              "liquid-glass"
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
                  selectedItem.customBg ? "bg-[rgba(17,17,19,0.55)] border-white/12" : ""
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
                <div className="flex-1 w-full md:w-1/2 h-[60%] md:h-full border-l border-black/8 bg-white/92 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0f14]/92 md:p-12 flex flex-col relative z-20 overflow-y-auto">
                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-black dark:text-white"
                  >
                    <X size={20} />
                  </button>

                  <h2 className="font-['IvyOra_Text'] font-medium text-4xl md:text-5xl tracking-[-2px] text-black dark:text-white mb-6 mt-4">
                    {selectedItem.title}
                  </h2>
                  <p className="font-['Inter'] text-lg text-black/60 dark:text-white/60 mb-8 leading-relaxed">
                    {selectedItem.content}
                  </p>

                  <div className="mt-auto pt-8">
                    <button className="group flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-xl bg-[#19ad7d] text-white font-['Inter'] font-semibold text-sm transition-transform active:scale-95 hover:bg-[#15946b]">
                      Explore {selectedItem.title}
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
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
