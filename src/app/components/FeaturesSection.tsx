import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

import imgRectangle4 from "../../imports/Component1-1/740b84f868f5f05705a6d5da233d3963bb632a44.png";
import imgRectangle5 from "../../imports/Component1-1/c53f9c53c9946ca164cba639507beeb3a99702bf.png";
import imgRectangle6 from "../../imports/Component1-1/a3a7b398f9fb1711017bc4163fe6010220312ca6.png";
import imgRectangle7 from "../../imports/Component1-1/505761bb7aaea91aab56d5260b680dcb7d9cbb90.png";
import imgRectangle8 from "../../imports/Component1-1/1ce6b06bd6a76bcd69678d1034fb45721f60c106.png";

const featuresImages = [
  imgRectangle4.src,
  imgRectangle5.src,
  imgRectangle6.src,
  imgRectangle7.src,
  imgRectangle8.src,
];

const cardsData = [
  {
    id: "enzy-assistant",
    title: "AI Assistant",
    description: "Ask questions about connected data. Get insights and next-best actions—instantly.",
    features: [
      "Monitor any KPI and flag what changed",
      "Draft messages and nudges from context",
      "Push alerts on your schedule",
      "Role-based access built in"
    ]
  },
  {
    id: "leaderboards",
    title: "Leaderboards",
    description: "Make performance visible. Keep teams engaged. Drive daily momentum.",
    features: [
      "Any KPI, any date range",
      "Cohorts by region, team, role, or tenure",
      "Drill down without losing context",
      "Permissions for every view",
      "Badges and milestones",
      "Message from the leaderboard"
    ]
  },
  {
    id: "profiles",
    title: "Profiles",
    description: "Give every rep a single place for performance, recognition, and progress.",
    features: [
      "Contact teammates in one tap",
      "Badges, trends, and key stats",
      "Custom reports per role"
    ]
  },
  {
    id: "competitions",
    title: "Competition Builder",
    description: "Launch competitions and incentives in minutes—aligned to the KPIs that matter.",
    features: [
      "AI-assisted competition drafts",
      "Individual or team formats",
      "Reward fulfillment through partners",
      "Permissions for creators and admins"
    ]
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
      "SMS forwarding via Twilio"
    ]
  }
];

export function FeaturesSection() {
  const { isLightMode } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const [isHoveringIndex, setIsHoveringIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isCarousel, setIsCarousel] = useState(true);

  // Set initial scroll to center (index 2)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const recompute = () => {
      const canScroll = el.scrollWidth > el.clientWidth + 4;
      setIsCarousel(canScroll);
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
          const scrollPos = centerChild.offsetLeft - (scrollRef.current.clientWidth / 2) + (centerChild.clientWidth / 2);
          scrollRef.current.scrollTo({ left: scrollPos, behavior: 'instant' });
        });
      }
    }
  }, [isCarousel]);

  // Update active index based on intersection observer
  useEffect(() => {
    if (!isCarousel) return;
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver((entries) => {
      let maxRatio = 0;
      let maxIndex = activeIndexRef.current;

      entries.forEach(entry => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          const index = Array.from(container.children).indexOf(entry.target);
          if (index !== -1) {
            maxIndex = index;
          }
        }
      });

      if (maxRatio > 0.5 && maxIndex !== activeIndexRef.current) {
        setActiveIndex(maxIndex);
      }
    }, {
      root: container,
      threshold: [0.5, 0.6, 0.7, 0.8, 0.9, 1]
    });

    Array.from(container.children).forEach(child => observer.observe(child));
    return () => observer.disconnect();
  }, [isCarousel]);

  const scrollPrev = () => {
    if (!isCarousel) return;
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.children[0] as HTMLElement;
      // Get actual width of a child including gap. Gap is 20px (gap-5)
      const scrollAmount = child.clientWidth + 20; 
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (!isCarousel) return;
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.children[0] as HTMLElement;
      const scrollAmount = child.clientWidth + 20; 
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToCard = (index: number) => {
    if (!isCarousel) return;
    if (scrollRef.current) {
      const child = scrollRef.current.children[index] as HTMLElement;
      const scrollPos = child.offsetLeft - (scrollRef.current.clientWidth / 2) + (child.clientWidth / 2);
      scrollRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-24 flex flex-col items-center bg-transparent">
      <div className="w-full flex flex-col items-center gap-4 mb-12 text-center px-4">
        <h1 className={`font-['IvyOra_Text'] text-5xl md:text-7xl lg:text-[96px] ${isLightMode ? "text-[#0b0f14]" : "text-white"} tracking-[-2px] leading-[1.1] font-medium`}>
          Features
        </h1>
        <p className={`font-['Inter'] tracking-[-0.04em] text-center max-w-2xl ${isLightMode ? 'text-black/60' : 'text-white/50'} text-[18px] md:text-[22px]`}>
          The system that turns connected data into actions—and results.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative w-full overflow-hidden">
        {/* Navigation Arrows */}
        {isCarousel ? (
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 z-20 hidden md:block">
          <button 
            onClick={scrollPrev}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/50 transition-colors border border-white/10 shadow-xl"
            aria-label="Previous feature"
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
          >
            <ChevronRight size={24} />
          </button>
        </div>
        ) : null}

        {/* Carousel */}
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
                  paddingLeft: 'max(16px, calc(50vw - 190px))',
                  paddingRight: 'max(16px, calc(50vw - 190px))',
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
                        ? 'ring-2 ring-[#19ad7d] shadow-[0_0_48px_rgba(25,173,125,0.22)]'
                        : 'opacity-60 hover:opacity-90'
                  }
                `}
              >
                {/* Background Image */}
                <img 
                  src={featuresImages[i]} 
                  alt={card.title} 
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${showDetails ? 'scale-105' : 'scale-100'}`} 
                />

                {/* Soft vignette for readability */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                    showDetails ? "from-black/55 via-black/15 to-transparent" : "from-black/70 via-black/10 to-transparent"
                  }`}
                />

                {/* Frosted content sheet */}
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
                  
                  {/* Expandable Bullet Points */}
                  <ul className={`flex flex-col gap-2.5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${showDetails ? 'max-h-[300px] opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'}`}>
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

      {/* Navigation Indicators */}
      {isCarousel ? (
      <div className="flex justify-center gap-2 mt-4">
        {cardsData.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            className={`h-2 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-[#19ad7d]' : `w-2 ${isLightMode ? 'bg-black/20 hover:bg-black/40' : 'bg-white/20 hover:bg-white/40'}`}`}
            aria-label={`Go to feature ${i + 1}`}
          />
        ))}
      </div>
      ) : null}

    </section>
  );
}
