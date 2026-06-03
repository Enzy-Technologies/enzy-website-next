"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trophy, DollarSign, Users, type LucideIcon } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { useTheme } from "./components/ThemeProvider";
import { BlurReveal } from "./components/BlurReveal";

type ModuleId = "core" | "sell" | "recruit";

type ModuleDef = {
  id: ModuleId;
  label: string;
  tagline: string;
  icon: LucideIcon;
};

const MODULES: ModuleDef[] = [
  {
    id: "core",
    label: "Core",
    tagline: "The system everyone runs on.",
    icon: Trophy,
  },
  {
    id: "sell",
    label: "Sell",
    tagline: "Field sales execution and pipeline.",
    icon: DollarSign,
  },
  {
    id: "recruit",
    label: "Recruit",
    tagline: "Sourcing through onboarding.",
    icon: Users,
  },
];

type Feature = {
  id: string;
  title: string;
  desc: string;
  module: ModuleId;
  image: string;
};

const FEATURES_DATA: Feature[] = [
  // ---------- Core ----------
  {
    module: "core",
    id: "leaderboards",
    title: "Leaderboards",
    desc: "Real-time rankings that keep focus high and goals clear across every team.",
    image:
      "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/1-1%20Leaderboard%20podium%20(light%20mode).png",
  },
  {
    module: "core",
    id: "profiles",
    title: "Profiles",
    desc: "One place for performance, progress, and recognition for every team member.",
    image:
      "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMGRhcmslMjBVSXxlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    module: "core",
    id: "badges",
    title: "Badges",
    desc: "Recognition that builds loyalty—earned, displayed, and remembered.",
    image:
      "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    module: "core",
    id: "competitions-and-incentives",
    title: "Competitions & Incentives",
    desc: "Launch contests and rewards in minutes—aligned to the KPIs that matter.",
    image:
      "https://images.unsplash.com/photo-1642104744809-14b986179927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnRpdmUlMjByZXdhcmQlMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    module: "core",
    id: "messaging",
    title: "Messaging",
    desc: "Group threads, announcements, and DMs without switching tools.",
    image:
      "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/Chats%20(light%20mode).png",
  },
  {
    module: "core",
    id: "bot-chats",
    title: "Bot Chats",
    desc: "AI-driven nudges and answers from your team's connected data—on demand.",
    image:
      "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/AI%20Chat%201.png",
  },
  {
    module: "core",
    id: "media-library",
    title: "Media Library",
    desc: "Approved assets, scripts, and training—organized and shareable.",
    image:
      "https://images.unsplash.com/photo-1650338996177-674884e51683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpYSUyMGxpYnJhcnklMjBmb2xkZXIlMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
  },

  // ---------- Sell ----------
  {
    module: "sell",
    id: "canvassing",
    title: "Canvassing",
    desc: "Plan territories, route the day, and log every door in the field.",
    image:
      "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjB0ZXJyaXRvcnklMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    module: "sell",
    id: "lead-management",
    title: "Lead Management",
    desc: "Keep pipelines organized and priorities obvious from first touch to close.",
    image:
      "https://images.unsplash.com/photo-1702479743967-3dcccd4a671d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnByaXNlJTIwY3JtJTIwZGFya3xlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    module: "sell",
    id: "digital-business-card",
    title: "Digital Business Card",
    desc: "Share your contact and pitch with a tap. Track who opens, when, and what they do next.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    module: "sell",
    id: "appt-scheduling",
    title: "Appt Scheduling",
    desc: "Book, confirm, and reschedule appointments without the back-and-forth.",
    image:
      "https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMGFwcCUyMGRhcmslMjBVSXxlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    module: "sell",
    id: "sms-campaigns",
    title: "SMS Campaigns",
    desc: "Drip and broadcast text campaigns with delivery, reply, and conversion tracking.",
    image:
      "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },

  // ---------- Recruit ----------
  {
    module: "recruit",
    id: "recruiting-center",
    title: "Recruiting Center",
    desc: "Source, score, and pipeline candidates from one workspace.",
    image:
      "https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNydWl0aW5nJTIwb25ib2FyZGluZyUyMHRlY2glMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    module: "recruit",
    id: "public-recruit-link",
    title: "Public Recruit Link",
    desc: "A branded apply page that funnels candidates straight into your pipeline.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    module: "recruit",
    id: "onboarding-workflow",
    title: "Onboarding Workflow",
    desc: "Automate paperwork, training, and first-week milestones for every new hire.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbGlzdCUyMGFwcCUyMGRhcmslMjBVSXxlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    module: "recruit",
    id: "document-library",
    title: "Document Library",
    desc: "Forms, agreements, and training docs—signed, sorted, searchable.",
    image:
      "https://images.unsplash.com/photo-1568667256549-094345857637?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const TAB_TRANSITION = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

function ModuleRail({
  active,
  onChange,
  isLightMode,
}: {
  active: ModuleId;
  onChange: (id: ModuleId) => void;
  isLightMode: boolean;
}) {
  return (
    <div
      className="relative flex flex-col gap-1 sm:gap-1.5"
      role="tablist"
      aria-label="Modules"
      aria-orientation="vertical"
    >
      {MODULES.map((mod) => {
        const isActive = mod.id === active;
        const Icon = mod.icon;
        const activeColor = isActive
          ? isLightMode
            ? "text-black"
            : "text-white"
          : isLightMode
            ? "text-black/40 group-hover:text-black/65"
            : "text-white/40 group-hover:text-white/65";
        return (
          <button
            key={mod.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(mod.id)}
            aria-label={mod.label}
            title={mod.label}
            className="group relative w-full text-left pl-3 sm:pl-4 pr-1 py-2.5 sm:py-3 transition-colors"
          >
            {/* Active indicator bar on the left edge */}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full transition-all ${
                isActive
                  ? "h-[58%] bg-[#19ad7d]"
                  : "h-0 bg-transparent"
              }`}
              aria-hidden
            />

            {/* Icon — shown on mobile only */}
            <Icon
              size={24}
              strokeWidth={2}
              aria-hidden
              className={`sm:hidden transition-colors ${activeColor}`}
            />

            {/* Word label — shown on sm and up */}
            <span
              className={`hidden sm:block font-inter text-[15px] sm:text-[17px] md:text-[19px] font-semibold uppercase tracking-[0.16em] transition-colors ${activeColor}`}
            >
              {mod.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function FeatureRow({
  feature,
  isOpen,
  onToggle,
  isLightMode,
  isFirst,
  skipAnim,
}: {
  feature: Feature;
  isOpen: boolean;
  onToggle: () => void;
  isLightMode: boolean;
  isFirst: boolean;
  /**
   * When true, the accordion expands/collapses synchronously with no
   * height/opacity animation. Used during hash deep-linking so the page
   * lands at the final layout in a single paint instead of bouncing
   * through ~0.4s of expanding/collapsing transitions.
   */
  skipAnim: boolean;
}) {
  return (
    // The `id` matches the slug emitted by MainNavigation's slugify(), so
    // `/system#leaderboards` resolves to this DOM node and the browser
    // (or the explicit scrollIntoView in FeatureBrowser) lands the user
    // on the right row. `scroll-mt-*` keeps it clear of the fixed header.
    <div
      id={feature.id}
      className={`scroll-mt-24 md:scroll-mt-28 ${
        isFirst
          ? ""
          : isLightMode
            ? "border-t border-black/8"
            : "border-t border-white/8"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`group w-full text-left flex items-center justify-between gap-6 py-5 md:py-6 transition-colors ${
          isLightMode ? "hover:text-black" : "hover:text-white"
        }`}
      >
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <h3
            className={`font-ivyora font-medium text-[24px] sm:text-[30px] md:text-[36px] leading-[1.05] tracking-[-0.5px] transition-colors ${
              isOpen
                ? "text-[#19ad7d]"
                : isLightMode
                  ? "text-black"
                  : "text-white"
            }`}
          >
            {feature.title}
          </h3>
          <p
            className={`font-inter text-[13px] sm:text-[14px] leading-snug line-clamp-1 transition-colors ${
              isLightMode ? "text-black/55" : "text-white/55"
            }`}
          >
            {feature.desc}
          </p>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-colors ${
            isOpen
              ? "border-[#19ad7d] text-[#19ad7d]"
              : isLightMode
                ? "border-black/15 text-black/60 group-hover:border-black/35 group-hover:text-black"
                : "border-white/15 text-white/55 group-hover:border-white/35 group-hover:text-white"
          }`}
          aria-hidden
        >
          <Plus size={18} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={skipAnim ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              skipAnim
                ? { duration: 0 }
                : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
            }
            className="overflow-hidden"
          >
            <div className="pb-6 md:pb-8 flex flex-col gap-5 md:gap-6">
              <p
                className={`font-inter text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed max-w-[680px] ${
                  isLightMode ? "text-black/75" : "text-white/75"
                }`}
              >
                {feature.desc}
              </p>

              <div
                className={`relative w-full aspect-[16/10] rounded-[20px] md:rounded-[28px] overflow-hidden border ${
                  isLightMode
                    ? "border-black/8 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.20)]"
                    : "border-white/8 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]"
                }`}
              >
                <ImageWithFallback
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeatureBrowser({ isLightMode }: { isLightMode: boolean }) {
  const [activeModule, setActiveModule] = useState<ModuleId>("core");

  const moduleFeatures = useMemo(
    () => FEATURES_DATA.filter((f) => f.module === activeModule),
    [activeModule]
  );

  const [openId, setOpenId] = useState<string | null>(
    moduleFeatures[0]?.id ?? null
  );

  /**
   * When set to a feature id, the next render is treated as a deep-link
   * commit: every accordion row and the module panel's enter/exit
   * transitions are forced to duration 0 so the layout settles in a
   * single paint, then we scroll the matching row to the top inside
   * `useLayoutEffect` (i.e. before the browser paints), and finally clear
   * the flag so subsequent user-driven toggles animate normally again.
   */
  const [pendingDeepLinkId, setPendingDeepLinkId] = useState<string | null>(null);
  const skipAnim = pendingDeepLinkId !== null;

  // When the user clicks a module tab, switch modules and auto-open that
  // module's first feature. This is driven by the click handler (not a
  // render effect) so it can never stomp a deep-linked openId after the
  // pendingDeepLinkId flag clears.
  const handleModuleChange = (id: ModuleId) => {
    setActiveModule(id);
    setOpenId(FEATURES_DATA.find((f) => f.module === id)?.id ?? null);
  };

  // Mirror `openId` into a ref so the hash listener can read the
  // currently-open feature without forcing the effect to re-subscribe on
  // every render.
  const openIdRef = useRef(openId);
  useEffect(() => {
    openIdRef.current = openId;
  }, [openId]);

  // After the deep-link render commits, snap the target feature's header to
  // the top of the viewport (just below the fixed nav). Because `skipAnim`
  // zeroes every transition, the target row already sits at its final
  // geometry, so we can scroll to the header's exact position with a fixed
  // header offset — guaranteeing the feature NAME lands at the top (and the
  // accordion content reads downward from it) rather than scrolling past it
  // and showing the bottom of the panel. We retry across a few frames so the
  // scroll also lands after a cross-module panel swap finishes mounting, and
  // overrides the browser's own (offset-unaware) fragment scroll.
  useLayoutEffect(() => {
    if (!pendingDeepLinkId) return;
    const targetId = pendingDeepLinkId;

    const scrollToHeader = () => {
      const node = document.getElementById(targetId);
      if (!node) return;
      // Match the row's `scroll-mt-24 md:scroll-mt-28` so the title clears
      // the fixed header on both mobile and desktop.
      const headerOffset = window.matchMedia("(min-width: 768px)").matches
        ? 112
        : 96;
      const top =
        window.scrollY + node.getBoundingClientRect().top - headerOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior: "auto" });
    };

    // Re-assert the scroll across a few ticks. The early calls land the
    // position once the deep-link layout commits; the later ones override the
    // browser's own (offset-unaware) fragment scroll, which can fire late
    // (e.g. after images decode) and would otherwise leave the feature title
    // pushed above the viewport. We clear the deep-link flag only on the last
    // tick so the re-render (and this effect's cleanup) can't cancel the
    // pending scroll timers early.
    const timers: number[] = [];
    [0, 60, 160, 320, 500].forEach((ms, i, arr) => {
      timers.push(
        window.setTimeout(() => {
          scrollToHeader();
          if (i === arr.length - 1) setPendingDeepLinkId(null);
        }, ms)
      );
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [pendingDeepLinkId]);

  // Hash deep-linking: /system#leaderboards selects the right tab,
  // expands the matching feature, and scrolls the row to the top of the
  // viewport (below the fixed header thanks to `scroll-mt-*`).
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "").toLowerCase();
      if (!hash) return;
      const match = FEATURES_DATA.find((f) => f.id === hash);
      if (!match) return;

      // Strip the fragment from the URL immediately. The browser's native
      // "scroll to #id" can fire on first paint (while the default feature is
      // still open) and again after images decode, landing on a stale
      // position; removing the hash neutralizes it so our own offset-aware
      // scroll below is the single source of truth.
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );

      // Apply state in one synchronous batch so the next render commits
      // the final layout (target module active, target row open, all
      // animations suppressed via `skipAnim`).
      setActiveModule(match.module);
      setOpenId(match.id);
      setPendingDeepLinkId(match.id);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const activeModuleDef = MODULES.find((m) => m.id === activeModule);

  return (
    <section className="relative w-full pt-7 md:pt-10 pb-24 md:pb-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h1
            className={`font-ivyora font-medium text-4xl md:text-5xl lg:text-[80px] leading-[1.05] tracking-[-2px] max-w-4xl ${
              isLightMode ? "text-black" : "text-[#f5f7fa]"
            }`}
          >
            <BlurReveal as="span" delay={0.1}>
              Everything you need.
            </BlurReveal>
            <br />
            <span className={isLightMode ? "text-black/40" : "text-white/40"}>
              <BlurReveal as="span" delay={0.3}>
                Nothing you don&apos;t.
              </BlurReveal>
            </span>
          </h1>
        </div>

        {/* Two-column: compact module rail (left) + wide feature panel (right) */}
        <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
          {/* Left rail — kept narrow so features take most of the width */}
          <div className="shrink-0 w-[48px] sm:w-[112px] md:w-[132px] sticky top-24 md:top-28">
            <ModuleRail
              active={activeModule}
              onChange={handleModuleChange}
              isLightMode={isLightMode}
            />
          </div>

          {/* Right panel that "opens" when a module is clicked */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={skipAnim ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={skipAnim ? { duration: 0 } : TAB_TRANSITION}
                className={`relative rounded-[28px] md:rounded-[36px] border overflow-hidden ${
                  isLightMode
                    ? "bg-white/70 border-black/8 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.16)]"
                    : "bg-[#0b0f14]/70 border-white/8 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]"
                }`}
              >
                {/* Module header row */}
                <div
                  className={`px-6 md:px-10 py-5 md:py-6 border-b ${
                    isLightMode ? "border-black/8" : "border-white/8"
                  }`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`font-ivyora text-[22px] md:text-[28px] font-medium tracking-[-0.5px] leading-tight ${
                        isLightMode ? "text-black" : "text-white"
                      }`}
                    >
                      {activeModuleDef?.label} Module
                    </span>
                    <span
                      className={`font-inter text-[13px] md:text-[14px] mt-0.5 ${
                        isLightMode ? "text-black/55" : "text-white/55"
                      }`}
                    >
                      {activeModuleDef?.tagline}
                    </span>
                  </div>
                </div>

                {/* Accordion list */}
                <div className="px-6 md:px-10 py-2 md:py-4">
                  {moduleFeatures.map((feature, idx) => (
                    <FeatureRow
                      key={feature.id}
                      feature={feature}
                      isOpen={feature.id === openId}
                      onToggle={() =>
                        setOpenId(openId === feature.id ? null : feature.id)
                      }
                      isLightMode={isLightMode}
                      isFirst={idx === 0}
                      skipAnim={skipAnim}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const { isLightMode } = useTheme();
  return <FeatureBrowser isLightMode={isLightMode} />;
}
