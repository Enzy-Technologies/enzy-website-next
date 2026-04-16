import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Check } from "lucide-react";
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
    title: "Enzy Assistant",
    description: "Generate actionable insights in real-time to empower and enable leaders, achieving synergy within your organization and retaining top talent.",
    features: [
      "Fully customizable to monitor any changes in the data",
      "Message users directly from bot chats",
      "Set push notifications to any date range",
      "All Enzy bots are rights-protected so only designated users have access"
    ]
  },
  {
    id: "leaderboards",
    title: "Leaderboards",
    description: "Experience increased accountability and engagement through our highly customizable leaderboard.",
    features: [
      "Filter by any date range",
      "Incorporate any KPI",
      "Unlimited data levels",
      "Rights-protected views",
      "Achievement badges",
      "Direct user messaging"
    ]
  },
  {
    id: "profiles",
    title: "Profiles",
    description: "Our user profiles bring a social media-like experience to the platform, enhancing interaction and recognition within your team.",
    features: [
      "Quickly contact fellow users through a variety of methods",
      "View badges, reports, and media associated with each user",
      "Reports are customizable"
    ]
  },
  {
    id: "competitions",
    title: "Competitions & Incentives",
    description: "Create high-performance culture through our custom competitions and incentives designed to motivate and align your organization.",
    features: [
      "Quickly and easily build various competitions on your own",
      "Create competition on the individual and group level",
      "Automated incentive fulfillment through multiple partners",
      "Competition creation is rights-protected to designated users"
    ]
  },
  {
    id: "messaging",
    title: "Messaging",
    description: "Centralize your team communication and enhance the way you collaborate within your organization.",
    features: [
      "Unlimited users per group message",
      "Announcement channels",
      "Pin and mute message threads",
      "Auto-create groups based on your org chart",
      "Edit and delete messages",
      "SMS forwarding through Twilio integration"
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

  // Set initial scroll to center (index 2)
  useEffect(() => {
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
  }, []);

  // Update active index based on intersection observer
  useEffect(() => {
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
  }, []);

  const scrollPrev = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.children[0] as HTMLElement;
      // Get actual width of a child including gap. Gap is 20px (gap-5)
      const scrollAmount = child.clientWidth + 20; 
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const child = container.children[0] as HTMLElement;
      const scrollAmount = child.clientWidth + 20; 
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToCard = (index: number) => {
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
          Everything you need to operate, compete, and win.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative w-full overflow-hidden">
        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 z-20 hidden md:block">
          <button 
            onClick={scrollPrev}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/50 transition-colors border border-white/10 shadow-xl"
            aria-label="Previous feature"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 z-20 hidden md:block">
          <button 
            onClick={scrollNext}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/50 transition-colors border border-white/10 shadow-xl"
            aria-label="Next feature"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full pb-8 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{
            paddingLeft: 'max(16px, calc(50vw - 190px))',
            paddingRight: 'max(16px, calc(50vw - 190px))',
          }}
        >
          {cardsData.map((card, i) => {
            const isCenter = activeIndex === i;
            const isHovering = isHoveringIndex === i;
            const showDetails = isCenter || isHovering;

            return (
              <div 
                key={card.id}
                onMouseEnter={() => setIsHoveringIndex(i)}
                onMouseLeave={() => setIsHoveringIndex(null)}
                onClick={() => scrollToCard(i)}
                className={`relative shrink-0 snap-center w-[85vw] max-w-[380px] h-[510px] rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 ease-out
                  ${isCenter ? 'ring-2 ring-[#19ad7d] shadow-[0_0_40px_rgba(25,173,125,0.2)]' : 'opacity-60 hover:opacity-90'}
                `}
              >
                {/* Background Image */}
                <img 
                  src={featuresImages[i]} 
                  alt={card.title} 
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${showDetails ? 'scale-105' : 'scale-100'}`} 
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ease-out flex flex-col justify-end p-8 pb-10
                  ${showDetails ? 'from-black via-black/60 to-black/0' : 'from-black/90 via-black/20 to-black/0'}
                `}>
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
                        <span className="text-sm text-white/80 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Indicators */}
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

    </section>
  );
}
