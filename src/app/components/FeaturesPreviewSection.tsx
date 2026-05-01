"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

function svgDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const featurePlaceholders = [
  svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#071018"/>
          <stop offset="1" stop-color="#0b0f14"/>
        </linearGradient>
        <radialGradient id="glow" cx="35%" cy="20%" r="65%">
          <stop offset="0" stop-color="#19ad7d" stop-opacity="0.35"/>
          <stop offset="1" stop-color="#19ad7d" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="1600" fill="url(#bg)"/>
      <rect width="1200" height="1600" fill="url(#glow)"/>
      <g opacity="0.92">
        <text x="90" y="170" font-family="Inter, ui-sans-serif, system-ui" font-size="44" font-weight="700" fill="#f5f7fa">AI Assistant</text>
        <text x="90" y="230" font-family="Inter, ui-sans-serif, system-ui" font-size="22" font-weight="500" fill="rgba(245,247,250,0.72)">Instant answers. Next-best actions.</text>
      </g>
      <g transform="translate(90 310)" opacity="0.95">
        <rect x="0" y="0" rx="26" ry="26" width="1020" height="1040" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)"/>
        <g transform="translate(46 54)">
          <rect x="0" y="0" rx="18" width="640" height="56" fill="rgba(255,255,255,0.06)"/>
          <rect x="0" y="92" rx="18" width="920" height="56" fill="rgba(255,255,255,0.06)"/>
          <rect x="0" y="184" rx="18" width="780" height="56" fill="rgba(255,255,255,0.06)"/>
          <g transform="translate(0 300)">
            <circle cx="14" cy="14" r="6" fill="#19ad7d"/>
            <rect x="34" y="4" rx="10" width="560" height="20" fill="rgba(245,247,250,0.70)"/>
            <circle cx="14" cy="82" r="6" fill="#19ad7d"/>
            <rect x="34" y="72" rx="10" width="720" height="20" fill="rgba(245,247,250,0.65)"/>
            <circle cx="14" cy="150" r="6" fill="#19ad7d"/>
            <rect x="34" y="140" rx="10" width="640" height="20" fill="rgba(245,247,250,0.58)"/>
          </g>
        </g>
      </g>
    </svg>
  `),
  svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#071018"/>
          <stop offset="1" stop-color="#0b0f14"/>
        </linearGradient>
        <radialGradient id="glow" cx="70%" cy="18%" r="70%">
          <stop offset="0" stop-color="#19ad7d" stop-opacity="0.32"/>
          <stop offset="1" stop-color="#19ad7d" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="1600" fill="url(#bg)"/>
      <rect width="1200" height="1600" fill="url(#glow)"/>
      <g opacity="0.92">
        <text x="90" y="170" font-family="Inter, ui-sans-serif, system-ui" font-size="44" font-weight="700" fill="#f5f7fa">Leaderboards</text>
        <text x="90" y="230" font-family="Inter, ui-sans-serif, system-ui" font-size="22" font-weight="500" fill="rgba(245,247,250,0.72)">Make performance visible.</text>
      </g>
      <g transform="translate(90 310)">
        <rect x="0" y="0" rx="26" ry="26" width="1020" height="1040" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)"/>
        <g transform="translate(54 72)">
          <rect x="0" y="0" rx="14" width="912" height="18" fill="rgba(245,247,250,0.16)"/>
          <rect x="0" y="70" rx="14" width="820" height="18" fill="rgba(245,247,250,0.16)"/>
          <rect x="0" y="140" rx="14" width="760" height="18" fill="rgba(245,247,250,0.16)"/>
          <rect x="0" y="210" rx="14" width="700" height="18" fill="rgba(245,247,250,0.16)"/>
          <g transform="translate(0 330)">
            <rect x="0" y="0" rx="18" width="912" height="88" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
            <rect x="0" y="124" rx="18" width="912" height="88" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
            <rect x="0" y="248" rx="18" width="912" height="88" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
            <rect x="0" y="372" rx="18" width="912" height="88" fill="rgba(25,173,125,0.10)" stroke="rgba(25,173,125,0.35)"/>
            <circle cx="46" cy="416" r="14" fill="#19ad7d"/>
            <rect x="82" y="404" rx="10" width="340" height="24" fill="rgba(245,247,250,0.72)"/>
            <rect x="560" y="404" rx="10" width="180" height="24" fill="rgba(245,247,250,0.55)"/>
          </g>
        </g>
      </g>
    </svg>
  `),
  svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#071018"/>
          <stop offset="1" stop-color="#0b0f14"/>
        </linearGradient>
        <radialGradient id="glow" cx="45%" cy="22%" r="70%">
          <stop offset="0" stop-color="#19ad7d" stop-opacity="0.30"/>
          <stop offset="1" stop-color="#19ad7d" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="1600" fill="url(#bg)"/>
      <rect width="1200" height="1600" fill="url(#glow)"/>
      <g opacity="0.92">
        <text x="90" y="170" font-family="Inter, ui-sans-serif, system-ui" font-size="44" font-weight="700" fill="#f5f7fa">Profiles</text>
        <text x="90" y="230" font-family="Inter, ui-sans-serif, system-ui" font-size="22" font-weight="500" fill="rgba(245,247,250,0.72)">One view for performance &amp; progress.</text>
      </g>
      <g transform="translate(90 310)">
        <rect x="0" y="0" rx="26" ry="26" width="1020" height="1040" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)"/>
        <g transform="translate(70 88)">
          <circle cx="90" cy="90" r="56" fill="rgba(245,247,250,0.12)"/>
          <rect x="170" y="54" rx="14" width="420" height="22" fill="rgba(245,247,250,0.72)"/>
          <rect x="170" y="92" rx="14" width="300" height="18" fill="rgba(245,247,250,0.42)"/>
          <g transform="translate(0 210)">
            <rect x="0" y="0" rx="20" width="880" height="140" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
            <rect x="30" y="34" rx="12" width="240" height="18" fill="rgba(245,247,250,0.55)"/>
            <rect x="30" y="70" rx="12" width="360" height="40" fill="rgba(25,173,125,0.14)" stroke="rgba(25,173,125,0.35)"/>
            <rect x="420" y="70" rx="12" width="420" height="40" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)"/>
          </g>
          <g transform="translate(0 400)">
            <rect x="0" y="0" rx="20" width="420" height="260" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
            <rect x="460" y="0" rx="20" width="420" height="260" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
            <rect x="30" y="34" rx="12" width="250" height="18" fill="rgba(245,247,250,0.55)"/>
            <rect x="490" y="34" rx="12" width="250" height="18" fill="rgba(245,247,250,0.55)"/>
            <rect x="30" y="88" rx="12" width="360" height="16" fill="rgba(245,247,250,0.22)"/>
            <rect x="490" y="88" rx="12" width="360" height="16" fill="rgba(245,247,250,0.22)"/>
          </g>
        </g>
      </g>
    </svg>
  `),
  svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#071018"/>
          <stop offset="1" stop-color="#0b0f14"/>
        </linearGradient>
        <radialGradient id="glow" cx="62%" cy="24%" r="70%">
          <stop offset="0" stop-color="#19ad7d" stop-opacity="0.30"/>
          <stop offset="1" stop-color="#19ad7d" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="1600" fill="url(#bg)"/>
      <rect width="1200" height="1600" fill="url(#glow)"/>
      <g opacity="0.92">
        <text x="90" y="170" font-family="Inter, ui-sans-serif, system-ui" font-size="44" font-weight="700" fill="#f5f7fa">Competition Builder</text>
        <text x="90" y="230" font-family="Inter, ui-sans-serif, system-ui" font-size="22" font-weight="500" fill="rgba(245,247,250,0.72)">Launch incentives in minutes.</text>
      </g>
      <g transform="translate(90 310)">
        <rect x="0" y="0" rx="26" ry="26" width="1020" height="1040" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)"/>
        <g transform="translate(64 80)">
          <rect x="0" y="0" rx="20" width="892" height="92" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
          <rect x="24" y="26" rx="12" width="260" height="18" fill="rgba(245,247,250,0.55)"/>
          <rect x="24" y="52" rx="12" width="420" height="16" fill="rgba(245,247,250,0.22)"/>
          <g transform="translate(0 140)">
            <rect x="0" y="0" rx="20" width="892" height="360" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
            <rect x="24" y="26" rx="12" width="180" height="18" fill="rgba(245,247,250,0.55)"/>
            <rect x="24" y="72" rx="14" width="300" height="40" fill="rgba(25,173,125,0.14)" stroke="rgba(25,173,125,0.35)"/>
            <rect x="350" y="72" rx="14" width="300" height="40" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)"/>
            <rect x="24" y="132" rx="14" width="626" height="40" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)"/>
            <rect x="24" y="212" rx="14" width="220" height="38" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)"/>
            <rect x="262" y="212" rx="14" width="220" height="38" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)"/>
            <rect x="500" y="212" rx="14" width="220" height="38" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)"/>
          </g>
        </g>
      </g>
    </svg>
  `),
  svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#071018"/>
          <stop offset="1" stop-color="#0b0f14"/>
        </linearGradient>
        <radialGradient id="glow" cx="40%" cy="18%" r="70%">
          <stop offset="0" stop-color="#19ad7d" stop-opacity="0.28"/>
          <stop offset="1" stop-color="#19ad7d" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="1600" fill="url(#bg)"/>
      <rect width="1200" height="1600" fill="url(#glow)"/>
      <g opacity="0.92">
        <text x="90" y="170" font-family="Inter, ui-sans-serif, system-ui" font-size="44" font-weight="700" fill="#f5f7fa">Messaging</text>
        <text x="90" y="230" font-family="Inter, ui-sans-serif, system-ui" font-size="22" font-weight="500" fill="rgba(245,247,250,0.72)">Announcements, nudges, updates.</text>
      </g>
      <g transform="translate(90 310)">
        <rect x="0" y="0" rx="26" ry="26" width="1020" height="1040" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)"/>
        <g transform="translate(64 88)">
          <rect x="0" y="0" rx="22" width="892" height="138" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
          <circle cx="58" cy="56" r="22" fill="rgba(245,247,250,0.12)"/>
          <rect x="98" y="42" rx="12" width="300" height="18" fill="rgba(245,247,250,0.62)"/>
          <rect x="98" y="72" rx="12" width="520" height="14" fill="rgba(245,247,250,0.24)"/>
          <g transform="translate(0 178)">
            <rect x="0" y="0" rx="22" width="740" height="138" fill="rgba(25,173,125,0.10)" stroke="rgba(25,173,125,0.35)"/>
            <rect x="24" y="42" rx="12" width="380" height="18" fill="rgba(245,247,250,0.70)"/>
            <rect x="24" y="72" rx="12" width="540" height="14" fill="rgba(245,247,250,0.30)"/>
          </g>
          <g transform="translate(152 356)">
            <rect x="0" y="0" rx="22" width="740" height="138" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
            <rect x="24" y="42" rx="12" width="420" height="18" fill="rgba(245,247,250,0.58)"/>
            <rect x="24" y="72" rx="12" width="520" height="14" fill="rgba(245,247,250,0.24)"/>
          </g>
        </g>
      </g>
    </svg>
  `),
];

const cardsData = [
  {
    id: "ai",
    title: "AI Assistant",
    description:
      "Ask questions about connected data. Get insights and next-best actions—instantly.",
    features: [
      "Monitor any KPI and flag what changed",
      "Draft messages and nudges from context",
      "Push alerts on your schedule",
      "Role-based access built in",
    ],
  },
  {
    id: "leaderboards",
    title: "Leaderboards",
    description: "Make performance visible. Keep teams engaged. Create momentum.",
    features: [
      "Any KPI, any date range",
      "Cohorts by region, team, role, or tenure",
      "Drill down without losing context",
      "Permissions for every view",
      "Badges and milestones",
      "Message from the leaderboard",
    ],
  },
  {
    id: "profiles",
    title: "Profiles",
    description:
      "Give every rep a single place for performance, recognition, and progress.",
    features: ["Contact teammates in one tap", "Badges, trends, and key stats", "Custom reports per role"],
  },
  {
    id: "competitions",
    title: "Competition Builder",
    description:
      "Launch competitions and incentives in minutes—aligned to the KPIs that matter.",
    features: [
      "AI-assisted competition drafts",
      "Individual or team formats",
      "Reward fulfillment through partners",
      "Permissions for creators and admins",
    ],
  },
  {
    id: "messaging",
    title: "Messaging",
    description: "Send announcements, nudges, and updates—without switching tools.",
    features: [
      "Group messaging at any scale",
      "Announcement channels",
      "Pin, mute, and manage threads",
      "Auto-groups from org structure",
      "Edit and delete controls",
      "SMS forwarding via Twilio",
    ],
  },
];

export function FeaturesPreviewSection() {
  const { isLightMode } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const [isHoveringIndex, setIsHoveringIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isCarousel, setIsCarousel] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const recompute = () => {
      const canScroll = el.scrollWidth > el.clientWidth + 4;
      setIsCarousel(canScroll);
      // When there is no overflow, treat this like a static row.
      if (!canScroll) {
        setActiveIndex(0);
        setExpandedIndex(null);
        setIsHoveringIndex(null);
      }
    };

    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    window.addEventListener("resize", recompute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, []);

  useEffect(() => {
    if (!isCarousel) return;
    if (scrollRef.current) {
      const children = scrollRef.current.children;
      if (children.length > 2) {
        const centerChild = children[2] as HTMLElement;
        requestAnimationFrame(() => {
          if (!scrollRef.current) return;
          const scrollPos =
            centerChild.offsetLeft -
            scrollRef.current.clientWidth / 2 +
            centerChild.clientWidth / 2;
          scrollRef.current.scrollTo({ left: scrollPos, behavior: "instant" as ScrollBehavior });
        });
      }
    }
  }, [isCarousel]);

  useEffect(() => {
    if (!isCarousel) return;
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let maxIndex = activeIndexRef.current;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const index = Array.from(container.children).indexOf(entry.target);
            if (index !== -1) maxIndex = index;
          }
        });

        setActiveIndex(maxIndex);
      },
      { root: container, threshold: [0.4, 0.6, 0.8] }
    );

    Array.from(container.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [isCarousel]);

  const scrollPrev = () => {
    if (!isCarousel) return;
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.85;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollNext = () => {
    if (!isCarousel) return;
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.85;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollToCard = (index: number) => {
    if (!isCarousel) return;
    if (scrollRef.current) {
      const child = scrollRef.current.children[index] as HTMLElement;
      const scrollPos =
        child.offsetLeft - scrollRef.current.clientWidth / 2 + child.clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollPos, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-20 md:py-28 bg-transparent">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <p className="font-['Inter'] text-[11px] tracking-[0.18em] uppercase font-semibold text-[#19ad7d] mb-3">
              The full system
            </p>
            <h2
              className={`font-['IvyOra_Text'] font-medium leading-[1.05] tracking-[-1.5px] ${
                isLightMode ? "text-brand-dark" : "text-brand-light"
              } text-[32px] sm:text-[40px] md:text-[48px]`}
            >
              Featured Features <span className="italic font-normal"></span>
            </h2>
          </div>
          <Link
            href="/features"
            className="group inline-flex items-center gap-1.5 font-['Inter'] text-[14px] font-semibold whitespace-nowrap text-[#19ad7d] hover:opacity-90 pb-2"
          >
            See the full system
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {isCarousel ? (
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 z-20 hidden md:block">
          <button
            onClick={scrollPrev}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/50 transition-colors border border-white/10 shadow-xl"
            aria-label="Previous feature"
            type="button"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        ) : null}

        {isCarousel ? (
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 z-20 hidden md:block">
          <button
            onClick={scrollNext}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/50 transition-colors border border-white/10 shadow-xl"
            aria-label="Next feature"
            type="button"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        ) : null}

        <div
          ref={scrollRef}
          className={
            isCarousel
              ? "flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              : "flex flex-wrap justify-center gap-5 w-full pb-8 pt-4"
          }
          style={
            isCarousel
              ? {
                  paddingLeft: "max(16px, calc(50vw - 190px))",
                  paddingRight: "max(16px, calc(50vw - 190px))",
                }
              : undefined
          }
        >
          {cardsData.map((card, i) => {
            const isCenter = activeIndex === i;
            const isHovering = isHoveringIndex === i;
            const isExpanded = expandedIndex === i;
            const showDetails = isHovering || isExpanded;

            return (
              <button
                key={card.id}
                onMouseEnter={() => setIsHoveringIndex(i)}
                onMouseLeave={() => setIsHoveringIndex(null)}
                onClick={() => {
                  scrollToCard(i);
                  setExpandedIndex((prev) => (prev === i ? null : i));
                }}
                type="button"
                className={`relative shrink-0 snap-center w-[85vw] max-w-[380px] h-[510px] rounded-[32px] overflow-hidden cursor-pointer text-left transition-all duration-500 ease-out ring-1 ring-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.25)]
                  ${
                    !isCarousel
                      ? "opacity-100"
                      : isCenter
                        ? "ring-2 ring-[#19ad7d] shadow-[0_0_48px_rgba(25,173,125,0.22)]"
                        : "opacity-60 hover:opacity-90"
                  }
                `}
              >
                <img
                  src={featurePlaceholders[i]}
                  alt={card.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${
                    showDetails ? "scale-105" : "scale-100"
                  }`}
                />

                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                    showDetails ? "from-black/55 via-black/15 to-transparent" : "from-black/70 via-black/10 to-transparent"
                  }`}
                />

                <div
                  className={`absolute bottom-0 left-0 right-0 flex flex-col text-left border-t border-white/20 bg-black/35 px-8 pb-10 pt-8 backdrop-blur-xl transition-[padding] duration-500 rounded-b-[28px] ${
                    showDetails ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/45 to-transparent" />
                  <h3 className="text-white text-2xl md:text-3xl font-bold font-['Inter'] mb-3 tracking-tight drop-shadow-md">
                    {card.title}
                  </h3>

                  <p className="text-white/90 text-[15px] leading-relaxed drop-shadow-md line-clamp-3">
                    {card.description}
                  </p>

                  <ul
                    className={`flex flex-col gap-2.5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      showDetails ? "max-h-[300px] opacity-100 mt-5" : "max-h-0 opacity-0 mt-0"
                    }`}
                  >
                    {card.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#19ad7d] shrink-0 shadow-[0_0_8px_rgba(25,173,125,0.8)]" />
                        <span className="text-sm text-white/85 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {isCarousel ? (
      <div className="flex justify-center gap-2 mt-4">
        {cardsData.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "w-8 bg-[#19ad7d]"
                : `w-2 ${isLightMode ? "bg-black/20 hover:bg-black/40" : "bg-white/20 hover:bg-white/40"}`
            }`}
            aria-label={`Go to feature ${i + 1}`}
            type="button"
          />
        ))}
      </div>
      ) : null}
    </section>
  );
}

