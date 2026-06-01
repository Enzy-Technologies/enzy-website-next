"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

function svgDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const featurePlaceholders = [
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/AI%20Chat%201.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/1-1%20Leaderboard%20podium%20(light%20mode).png",
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
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/Chats%20(light%20mode).png",
];

const cardsData = [
  {
    id: "ai",
    href: "/system#bot-chats",
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
    href: "/system#leaderboards",
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
    href: "/system#profiles",
    title: "Profiles",
    description:
      "Give every rep a single place for performance, recognition, and progress.",
    features: ["Contact teammates in one tap", "Badges, trends, and key stats", "Custom reports per role"],
  },
  {
    id: "competitions",
    href: "/system#competitions-and-incentives",
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
    href: "/system#messaging",
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

export function FeaturesPreviewSection({ variant = "default" }: { variant?: "default" | "lp" } = {}) {
  const { isLightMode } = useTheme();
  const isLp = variant === "lp";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const [isHoveringIndex, setIsHoveringIndex] = useState<number | null>(null);
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
      requestAnimationFrame(() => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
      });
    }
  }, [isCarousel]);

  useEffect(() => {
    if (!isCarousel) return;
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(container.children).indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { root: container, threshold: 0.5 }
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
      const containerPadLeft = parseFloat(
        getComputedStyle(scrollRef.current).paddingLeft || "0"
      );
      const scrollPos = child.offsetLeft - containerPadLeft;
      scrollRef.current.scrollTo({ left: scrollPos, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full py-20 md:py-28 bg-transparent">
      {/* `relative z-20` keeps the heading + "See the full system" link on
          top of the carousel below — the carousel uses a negative top
          margin (-mt-16) to tuck under the heading and would otherwise
          intercept clicks on the link's hit area. */}
      <div className="relative z-20 mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:items-center md:text-center items-start text-left mb-10 gap-4">
          <div>
            {isLp ? (
              <p className="font-inter text-[11px] tracking-[0.18em] uppercase font-semibold text-[#19ad7d] mb-3">
                Inside the platform
              </p>
            ) : null}
            <h2
              className={`font-ivyora font-medium leading-[1.05] tracking-[-2px] ${
                isLightMode ? "text-brand-dark" : "text-brand-light"
              } text-[32px] sm:text-[40px] md:text-[48px]`}
            >
              {isLp ? (
                <>
                  Execution tools reps{" "}
                  <span className="italic font-normal text-[#19ad7d]">open every day</span>
                </>
              ) : (
                <>
                  Featured Features <span className="italic font-normal"></span>
                </>
              )}
            </h2>
          </div>
          <Link
            href="/system"
            className="group inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold whitespace-nowrap text-[#19ad7d] hover:opacity-90 pb-2"
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

      <div className="relative w-full mx-auto max-w-7xl px-4 md:px-4">
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
              ? "flex gap-5 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center snap-x snap-mandatory scroll-pl-4 md:scroll-pl-0 scrollbar-hide w-auto -ml-4 -mr-4 md:ml-0 md:mr-0 pt-20 pb-32 -mt-16 -mb-24 pl-4 pr-4 md:pl-0 md:pr-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              : "flex flex-wrap justify-center gap-5 w-full pt-20 pb-32 -mt-16 -mb-24"
          }
        >
          {cardsData.map((card, i) => {
            const isCenter = activeIndex === i;
            const isHovering = isHoveringIndex === i;
            const showDetails = isHovering || (isCarousel && isCenter);

            return (
              <Link
                key={card.id}
                href={card.href}
                onMouseEnter={() => setIsHoveringIndex(i)}
                onMouseLeave={() => setIsHoveringIndex(null)}
                aria-label={`Explore ${card.title} on the system page`}
                className={`relative block shrink-0 snap-start md:snap-center w-[85vw] max-w-[380px] h-[510px] rounded-[32px] cursor-pointer text-left transition-all duration-500 ease-out ring-1 ring-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.25)]
                  ${
                    !isCarousel
                      ? "opacity-100"
                      : isCenter
                        ? "ring-2 ring-[#19ad7d] shadow-[0_0_48px_rgba(25,173,125,0.22)] opacity-100"
                        : "opacity-100 hover:ring-white/30"
                  }
                `}
              >
                <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none z-0">
                  <Image
                    src={featurePlaceholders[i]}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1024px) 380px, 85vw"
                    className={`object-cover transition-transform duration-1000 ease-out ${
                      showDetails ? "scale-105" : "scale-100"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                      showDetails ? "from-black/55 via-black/15 to-transparent" : "from-black/70 via-black/10 to-transparent"
                    }`}
                  />
                </div>

                <div
                  className={`absolute bottom-0 left-0 right-0 z-10 overflow-hidden flex flex-col text-left md:text-center md:items-center border-t border-white/20 bg-black/55 md:bg-black/35 px-8 pb-10 pt-8 md:backdrop-blur-xl transition-[padding] duration-500 rounded-b-[32px] ${
                    showDetails ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/45 to-transparent" />
                  <h3 className="text-white text-2xl md:text-3xl font-bold font-inter mb-3 tracking-tight drop-shadow-md">
                    {card.title}
                  </h3>

                  <p className="text-white/90 text-[15px] leading-relaxed drop-shadow-md line-clamp-3">
                    {card.description}
                  </p>
                </div>
              </Link>
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

