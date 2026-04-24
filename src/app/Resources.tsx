"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { useTheme } from "./components/ThemeProvider";
import { CTAButton } from "./components/CTAButton";

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
    desc: "What to measure. What to change. What to do next.",
    colSpan: "col-span-12",
    bgImage: imgInsightsBg.src,
    textColor: "text-black",
    descColor: "text-black/70",
    layoutStyle: "tile1",
    content: "Short reads on what drives performance.\n\n- The KPIs that actually predict outcomes\n- What top teams do daily\n- How to turn signal into action"
  },
  {
    id: "playbooks",
    title: "Playbooks",
    desc: "Repeatable setups you can run this week.",
    colSpan: "col-span-12 lg:col-span-7",
    bgImage: imgPlaybooksBg.src,
    textColor: "text-black",
    descColor: "text-black/70",
    layoutStyle: "tile2",
    content: "Step-by-step guides.\n\n- Launch a leaderboard\n- Build a competition\n- Set incentives and rewards\n- Roll out messaging and nudges"
  },
  {
    id: "stories",
    title: "Customer Stories",
    desc: "Real teams. Real rollouts. Real results.",
    colSpan: "col-span-12 lg:col-span-5",
    bgImage: null,
    bottomImage: imgStoriesBottom.src,
    textColor: "text-white",
    descColor: "text-white/70",
    customBg:
      "liquid-glass bg-[rgba(17,17,19,0.55)] border-white/12",
    layoutStyle: "tile3",
    content: "Quick case studies.\n\n- What they set up\n- What changed\n- What improved (and how fast)"
  },
  {
    id: "guides",
    title: "Guides",
    desc: "Setup, integrations, and advanced workflows.",
    colSpan: "col-span-12 lg:col-span-6",
    bgImage: imgGuidesBg.src,
    innerImage: imgGuidesInner.src,
    textColor: "text-white",
    descColor: "text-white/80",
    layoutStyle: "tile4",
    content: "Technical deep dives.\n\n- Connect CRM + sources\n- Configure permissions\n- Automate events and messages\n- Build advanced reports"
  },
  {
    id: "compare",
    title: "Compare",
    desc: "A clear look at alternatives.",
    colSpan: "col-span-12 lg:col-span-6",
    bgImage: imgCompareBg.src,
    innerImage: imgCompareInner.src,
    textColor: "text-black",
    descColor: "text-black/70",
    layoutStyle: "tile5",
    content: "Side-by-side comparisons.\n\n- What you get with Enzy\n- Where legacy tools fall short\n- What implementation looks like"
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
      <section className="relative flex flex-col items-center justify-start w-full px-4 pt-8 md:pt-16 lg:pt-24 pb-12 md:pb-16 max-w-7xl mx-auto z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center w-full mb-16"
        >
          <div
            className={`px-5 py-2 rounded-full border backdrop-blur-sm mb-8 transition-colors duration-500 ${
              isLightMode ? "border-black/10 bg-black/5 text-black/60" : "border-white/10 bg-white/5 text-white/60"
            } eyebrow`}
          >
            Resources
          </div>
          <h1
            className={`font-['IvyOra_Text'] font-medium text-5xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-[-2px] text-center max-w-4xl transition-colors duration-500 ${
              isLightMode ? "text-black" : "text-[#f5f7fa]"
            }`}
          >
            Learn in <span className="text-[#19ad7d]">minutes</span>
          </h1>
          <p
            className={`font-['Inter'] text-base md:text-lg mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 ${
              isLightMode ? "text-black/60" : "text-white/60"
            }`}
          >
            Skimmable playbooks, guides, and stories you can apply immediately.
          </p>
        </motion.div>

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
                <div
                  className={`flex-1 w-full md:w-1/2 h-[60%] md:h-full border-l p-8 backdrop-blur-xl md:p-12 flex flex-col relative z-20 overflow-y-auto ${
                    isLightMode
                      ? "border-black/10 bg-white/92 text-black"
                      : "border-white/10 bg-[#0b0f14]/92 text-white"
                  }`}
                >
                  <button
                    onClick={() => setSelectedId(null)}
                    className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${
                      isLightMode
                        ? "bg-black/5 hover:bg-black/10 text-black"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    <X size={20} />
                  </button>

                  <h2 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-5xl tracking-[-2px] mb-6 mt-4 ${isLightMode ? "text-black" : "text-white"}`}>
                    {selectedItem.title}
                  </h2>
                  <p className={`font-['Inter'] text-base md:text-[17px] mb-8 leading-relaxed whitespace-pre-line ${isLightMode ? "text-black/65" : "text-white/65"}`}>
                    {selectedItem.content}
                  </p>

                  <div className="mt-auto pt-8">
                    <CTAButton href="#" variant="primary" className="w-full sm:w-auto px-8 py-4 font-semibold text-[14px]">
                      Open {selectedItem.title} <ArrowRight size={16} className="ml-2" />
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
