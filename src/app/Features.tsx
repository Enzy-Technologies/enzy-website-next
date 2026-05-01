"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { useTheme } from "./components/ThemeProvider";

type FeatureGroup = "Work" | "Perform" | "AI";

type Feature = {
  id: string;
  title: string;
  desc: string;
  group: FeatureGroup;
  images: string[];
};

const FEATURES_DATA: Feature[] = [
  {
    group: "Work",
    id: "map",
    title: "Map",
    desc: "Plan territories and routes. See the field clearly.",
    images: [
      "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjB0ZXJyaXRvcnklMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Work",
    id: "leads",
    title: "Leads",
    desc: "Keep pipelines organized and priorities obvious.",
    images: [
      "https://images.unsplash.com/photo-1702479743967-3dcccd4a671d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwY3JtJTIwZGFya3xlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Work",
    id: "calendar",
    title: "Calendar",
    desc: "Scheduling that keeps the week on track.",
    images: [
      "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMGFwcCUyMGRhcmslMjBVSXxlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Work",
    id: "tasks",
    title: "Tasks",
    desc: "Daily actions, owners, and follow-ups—clear.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbGlzdCUyMGFwcCUyMGRhcmslMjBVSXxlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Work",
    id: "library",
    title: "Library",
    desc: "Store and share approved assets—fast.",
    images: [
      "https://images.unsplash.com/photo-1650338996177-674884e51683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpYSUyMGxpYnJhcnklMjBmb2xkZXIlMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Work",
    id: "recruit",
    title: "Recruit",
    desc: "Recruiting and onboarding—simplified.",
    images: [
      "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNydWl0aW5nJTIwb25ib2FyZGluZyUyMHRlY2glMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Perform",
    id: "leaderboards",
    title: "Leaderboards",
    desc: "Real-time rankings that keep focus high and goals clear.",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJib2FyZCUyMGRhc2hib2FyZCUyMGRhcmt8ZW58MXx8fHwxNzc1Njc3NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Perform",
    id: "incentives",
    title: "Incentives",
    desc: "Rewards that reinforce the right behavior.",
    images: [
      "https://images.unsplash.com/photo-1642104744809-14b986179927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnRpdmUlMjByZXdhcmQlMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Perform",
    id: "goals",
    title: "Goals",
    desc: "Targets that stay visible all week.",
    images: [
      "https://images.unsplash.com/photo-1587400563263-e77a5590bfe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrJTIwcGklMjBnb2FsJTIwZGFzaGJvYXJkJTIwZGFya3xlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Perform",
    id: "profiles",
    title: "Profiles",
    desc: "One place for performance, progress, and recognition.",
    images: [
      "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMGRhcmslMjBVSXxlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "Perform",
    id: "chat",
    title: "Chat",
    desc: "Announcements and nudges without switching tools.",
    images: [
      "https://images.unsplash.com/photo-1591467454366-fb32b72b20e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0JTIwbWVzc2FnaW5nJTIwYXBwJTIwZGFya3xlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    group: "AI",
    id: "ai",
    title: "AI Assistant",
    desc: "Ask about connected data. Get insights and next actions.",
    images: [
      "https://images.unsplash.com/photo-1695144244472-a4543101ef35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFzc2lzdGFudCUyMHRlY2glMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];

function FeatureBrowser({
  selectedId,
  onSelect,
  isLightMode,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  isLightMode: boolean;
}) {
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");

  useEffect(() => {
    const onResize = () => {
      // If we move to desktop, show both panes.
      if (window.innerWidth >= 640) setMobileView("list");
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const selected = useMemo(() => FEATURES_DATA.find((f) => f.id === selectedId) ?? FEATURES_DATA[0], [selectedId]);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 pb-24">
      <div
        className={`relative w-full overflow-hidden rounded-[28px] border shadow-[0_32px_96px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] liquid-glass ${
          isLightMode ? "border-black/10 bg-white/92" : "border-white/10 bg-[#0b0f14]/92"
        }`}
      >
        <div className={`flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b ${isLightMode ? "border-black/10" : "border-white/10"}`}>
          <div className="min-w-0">
            <div className="eyebrow text-[#19ad7d]">Explore the system</div>
            <div className={`font-['Inter'] text-[13px] mt-1 ${isLightMode ? "text-black/55" : "text-white/55"}`}>
              Pick a module on the left to see details.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileView("list")}
            className={`sm:hidden inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-opacity ${
              mobileView === "detail" ? "opacity-100" : "opacity-0 pointer-events-none"
            } ${isLightMode ? "border-black/10 bg-black/[0.03] text-black/70" : "border-white/10 bg-white/[0.04] text-white/70"}`}
            aria-label="Back to list"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[320px_1fr] min-h-[72vh] sm:min-h-[640px]">
          {/* Left selector */}
          <div
            className={`sm:block border-r ${isLightMode ? "border-black/10" : "border-white/10"} ${
              mobileView === "detail" ? "hidden" : "block"
            }`}
          >
            <div className="h-full overflow-y-auto p-4 sm:p-5">
              {(["Work", "Perform", "AI"] as const).map((group) => {
                const groupItems = FEATURES_DATA.filter((f) => f.group === group);
                return (
                  <div key={group} className="mb-5 last:mb-0">
                    <div className={`eyebrow mb-3 ${isLightMode ? "text-black/45" : "text-white/45"}`}>{group}</div>
                    <div className="flex flex-col gap-2">
                      {groupItems.map((f) => {
                        const active = f.id === selected.id;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => {
                              onSelect(f.id);
                              setMobileView("detail");
                              const nextHash = `#${f.id}`;
                              if (window.location.hash !== nextHash) window.history.replaceState(null, "", nextHash);
                            }}
                            className={`text-left rounded-2xl border px-4 py-3 transition-colors duration-300 backdrop-blur-xl ${
                              active
                                ? isLightMode
                                  ? "border-[#19ad7d]/45 bg-[#19ad7d]/10"
                                  : "border-[#19ad7d]/35 bg-white/[0.10]"
                                : isLightMode
                                  ? "border-black/10 bg-black/[0.02] hover:bg-black/[0.04] hover:border-black/15"
                                  : "border-white/10 bg-white/[0.08] hover:bg-white/[0.10] hover:border-white/15"
                            }`}
                          >
                            <div className={`font-['Inter'] text-[14px] font-semibold tracking-tight ${active ? "text-[#19ad7d]" : isLightMode ? "text-black" : "text-white"}`}>
                              {f.title}
                            </div>
                            <div className={`mt-1 font-['Inter'] text-[12.5px] leading-snug ${isLightMode ? "text-black/55" : "text-white/55"}`}>
                              {f.desc}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right details */}
          <div className={`${mobileView === "list" ? "hidden sm:block" : "block"} h-full overflow-y-auto`}>
            <div className="p-4 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(10px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <div className={`font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.14em] ${isLightMode ? "text-black/45" : "text-white/40"}`}>
                        {selected.group}
                      </div>
                      <div className={`mt-2 font-['IvyOra_Text'] font-medium text-[34px] sm:text-[42px] leading-[1.05] tracking-[-1.5px] ${isLightMode ? "text-black" : "text-white"}`}>
                        {selected.title}
                      </div>
                      <div className={`mt-3 font-['Inter'] text-[15px] sm:text-[16px] leading-relaxed max-w-2xl ${isLightMode ? "text-black/65" : "text-white/65"}`}>
                        {selected.desc}
                      </div>
                    </div>
                  </div>

                  <div className={`mt-6 grid grid-cols-1 ${selected.images.length > 1 ? "lg:grid-cols-2" : ""} gap-4`}>
                    {selected.images.map((src) => (
                      <div
                        key={src}
                        className={`relative rounded-[22px] overflow-hidden border ${
                          isLightMode
                            ? "liquid-glass"
                            : "border-white/10 bg-white/[0.10] backdrop-blur-2xl"
                        }`}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,173,125,0.12)_0%,transparent_70%)] pointer-events-none" />
                        <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                          <ImageWithFallback
                            src={src}
                            alt={selected.title}
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                              isLightMode ? "opacity-80" : "opacity-95"
                            }`}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-tr ${isLightMode ? "from-white/35 via-white/10 to-transparent" : "from-[#0b0f14]/70 via-[#0b0f14]/35 to-transparent"}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const { isLightMode } = useTheme();
  const [selectedId, setSelectedId] = useState(FEATURES_DATA[0]?.id ?? "map");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const id = hash.replace("#", "");
      const exists = FEATURES_DATA.some((f) => f.id === id);
      if (!exists) return;
      setSelectedId(id);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <>
      <section className="relative flex flex-col items-center justify-start w-full px-4 pt-8 md:pt-16 lg:pt-24 pb-8 md:pb-12 max-w-7xl mx-auto z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className={`px-5 py-2 rounded-full border backdrop-blur-sm mb-8 transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-black/5 text-black/60' : 'border-white/10 bg-white/5 text-white/60'} eyebrow`}>
            Platform Overview
          </div>
          <h1 className={`font-['IvyOra_Text'] font-medium text-5xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-[-2px] text-center max-w-4xl transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
            Explore the <span className="text-[#19ad7d]">system</span>
          </h1>
        </motion.div>
      </section>

      <FeatureBrowser
        selectedId={selectedId}
        onSelect={setSelectedId}
        isLightMode={isLightMode}
      />
    </>
  );
}