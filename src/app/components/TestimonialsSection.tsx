import React, { useEffect, useState, useRef } from "react";
import { animate, motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import { RotateCw, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export type Testimonial = {
  id: number;
  quote: string;
  name: string;
  title: string;
  image: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Honestly, the biggest impact Enzy has had on our company isn’t just the features themselves, it’s how it reshapes our thinking and behavior as an organization. Before Enzy, we were reacting to results; now we’re anticipating them. Because every KPI, leaderboard, and real-time insight is visible at the moment decisions are made—so if you asked me where the magic really sits, it’s not just the tool—it’s what it enables. Enzy turned data into decision velocity, visibility into alignment, and motivation into momentum. That’s been the difference-maker for us this year.",
    name: "Ashleigh Pepper",
    title: "CEO of Kaizen Promittere",
    image: "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/697a960ca83443bd4afd2051_Screenshot%202026-01-28%20at%204.04.32%E2%80%AFPM.png"
  },
  {
    id: 2,
    quote: "Impressive in every way. From leadership, to UI, to experience... it's all been exceptional! This app is solving so many problems for companies.",
    name: "Stanford Johnsen",
    title: "Co-Founder & CSO of Capital Energy",
    image: "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66bf9f06173fdc02d48f23f5_1583360204989.jpeg"
  },
  {
    id: 3,
    quote: "Enzy is totally transforming our organization. We have more visibility into our day to day and we’re incentivizing the behavior that’s actually driving results. The platform is easy to use, and the user experience makes the team want to use it for everything. Enzy is helping us push the limits of what it means to be a healthcare company.",
    name: "Sean McLean",
    title: "Co-Founder & CEO of Elite Anesthesia",
    image: "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66b2932fcf6605eb3392528e_1679593955070.avif"
  },
  {
    id: 4,
    quote: "Enzy has been a massive value for us. Since we sell with multiple companies, we’ve always had to have a solution that aggregates that data and showcases it functional and ideally aesthetic way. For years we used web-based “apps” that got the job done. Enzy does it in a sexier, more functional way that has been game changing up into this point.",
    name: "John Taylor",
    title: "Co-Founder & CEO at Grit Marketing",
    image: "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66b10d453e2a3decefd44e0f_1698754020984.jpeg"
  },
  {
    id: 5,
    quote: "What’s been most impressive is how quick they are to implement the changes needed for our structure. We’re a large organization and so it’s not easy for us to get this big ship moving in a new direction and switching platforms.",
    name: "Mike Sawtelle",
    title: "Co-Owner at EcoShield",
    image: "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66b10bd7c7ae6a3b59092e90_1676516728094.avif"
  },
  {
    id: 6,
    quote: "We [use] Enzy extensively throughout our business. It has rapidly become the go-to source for sales reps and managers when it comes to everything from onboarding and metric tracking to prize fulfillment and communication.",
    name: "Cj Adamson",
    title: "Co-Founder & COO of NuSun Power",
    image: "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66a17c6e655de68411a23d31_CJ.jpeg"
  }
];

function splitQuote(quote: string) {
  const match = quote.match(/^(.*?[.!?])\s+(.*)$/);
  if (match) {
    return { first: match[1], rest: match[2] };
  }
  return { first: quote, rest: "" };
}

export function TestimonialsSection() {
  const { isLightMode } = useTheme();

  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden z-20"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-20 flex flex-col gap-12 relative mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center w-full gap-4 text-center"
        >
          <h2 className={`font-['IvyOra_Text'] text-5xl md:text-7xl lg:text-[96px] ${isLightMode ? "text-[#0b0f14]" : "text-white"} tracking-[-2px] leading-[1.1] font-medium`}>
            Loved by leaders
          </h2>
          <p className={`font-['Inter'] text-[15px] md:text-[16px] ${isLightMode ? "text-black/60" : "text-white/60"} max-w-[600px] leading-relaxed`}>
            See what industry experts are saying about how Enzy transforms their organizations.
          </p>
        </motion.div>
      </div>

      <TestimonialsMarquee testimonials={TESTIMONIALS} />
    </section>
  );
}

export function TestimonialsMarquee({
  testimonials,
  className,
  sets = 4,
}: {
  testimonials: readonly Testimonial[];
  className?: string;
  sets?: number;
}) {
  const { isLightMode } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // duplicate to wrap seamlessly on any screen
  const marqueeItems = Array(sets).fill(testimonials).flat();

  const baseX = useMotionValue(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContentWidth(containerRef.current.scrollWidth / sets);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [sets]);

  const x = useTransform(baseX, (v) => {
    if (contentWidth === 0) return "0px";
    const wrapped = ((v % contentWidth) - contentWidth) % contentWidth;
    return `${wrapped}px`;
  });

  useAnimationFrame((time, delta) => {
    if (flippedIndex !== null || isDragging) return;
    let moveBy = -0.05 * delta;
    if (isHovered && matchMedia("(hover: hover)").matches) moveBy = 0;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          `,
        }}
      />

      <div className="w-full relative overflow-visible">
        <motion.div
          ref={containerRef}
          className="flex w-max py-8 touch-pan-y"
          style={{ x }}
          onPanStart={() => setIsDragging(true)}
          onPan={(e, info) => {
            baseX.set(baseX.get() + info.delta.x);
          }}
          onPanEnd={(e, info) => {
            setIsDragging(false);
            const velocity = info.velocity.x;
            if (Math.abs(velocity) > 200) {
              const target = baseX.get() + velocity * 0.5;
              animate(baseX, target, {
                type: "inertia",
                velocity: velocity,
                bounceStiffness: 0,
                bounceDamping: 0,
              });
            }
          }}
        >
          {marqueeItems.map((testimonial, idx) => {
            const { first, rest } = splitQuote(testimonial.quote);
            const isFlipped = flippedIndex === idx;

            return (
              <div
                key={`${testimonial.id}-${idx}`}
                className="relative shrink-0 mr-4 md:mr-6 group perspective-[1200px]"
              >
                <div
                  className={`relative w-[300px] md:w-[360px] h-[460px] md:h-[500px] transition-transform duration-700 [transform-style:preserve-3d] cursor-pointer ${
                    isFlipped ? "[transform:rotateY(180deg)]" : ""
                  }`}
                  onClick={() => {
                    if (isDragging) return;
                    setFlippedIndex(isFlipped ? null : idx);
                  }}
                >
                  <div
                    className={`absolute inset-0 rounded-[32px] overflow-hidden flex flex-col transition-opacity duration-300 liquid-glass ${
                      isLightMode ? "hover:border-[#19ad7d]/35" : "hover:border-[#19ad7d]/35"
                    } ${
                      isFlipped ? "opacity-0 delay-300" : "opacity-100 z-10 delay-100"
                    }`}
                    style={{
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-6 z-20 transition-colors">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#19ad7d]">
                        Customer Story
                      </span>
                      <div className="flex items-center gap-1.5 text-[#19ad7d]">
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Flip
                        </span>
                        <RotateCw size={12} strokeWidth={2.5} />
                      </div>
                    </div>

                    <div
                      className={`relative h-[55%] w-full flex items-end justify-center pt-12 overflow-hidden border-b backdrop-blur-md ${
                        isLightMode
                          ? "border-black/8 bg-[#eaf4f0]/85"
                          : "border-white/8 bg-[#17312d]/75"
                      }`}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full border border-[#19ad7d]/20" />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full border border-[#19ad7d]/10" />

                      <div className="relative w-[85%] h-[95%] rounded-t-[48px] overflow-hidden shadow-2xl z-10 border-t border-x border-white/10 bg-black/20">
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover object-top grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    <div className="relative h-[45%] w-full p-6 md:p-8 flex flex-col justify-between">
                      <h3
                        className={`font-['Inter'] text-[17px] md:text-[20px] font-bold leading-[1.3] tracking-tight line-clamp-4 ${
                          isLightMode ? "text-[#0b0f14]" : "text-white"
                        }`}
                      >
                        "{first}"
                      </h3>

                      <div className="mt-auto flex flex-col relative">
                        <div className="w-10 h-[2px] bg-[#19ad7d] mb-4" />
                        <span
                          className={`font-['Inter'] text-[14px] font-bold tracking-[0.1em] uppercase ${
                            isLightMode ? "text-[#0b0f14]" : "text-white"
                          }`}
                        >
                          {testimonial.name}
                        </span>
                        <span
                          className={`font-['Inter'] text-[11px] font-medium uppercase tracking-wider mt-1 ${
                            isLightMode ? "text-[#0b0f14]/60" : "text-white/40"
                          }`}
                        >
                          {testimonial.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-3xl overflow-hidden flex flex-col p-6 md:p-8 liquid-glass"
                    style={{
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="absolute top-4 right-6 text-[#19ad7d] opacity-20 text-[100px] font-serif leading-none select-none">
                      “
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide pr-2 relative z-10">
                      <div className="pt-2 pb-4">
                        <p
                          className={`font-['Inter'] text-sm md:text-[15px] leading-relaxed ${
                            isLightMode ? "text-black/80" : "text-white/80"
                          }`}
                        >
                          <span
                            className={`font-bold block mb-3 text-base md:text-lg leading-[1.3] ${
                              isLightMode ? "text-black" : "text-white"
                            }`}
                          >
                            "{first}"
                          </span>
                          {rest ? <span className="block opacity-80">{rest}</span> : null}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`mt-4 pt-4 border-t flex items-center gap-3 shrink-0 ${
                        isLightMode ? "border-black/10" : "border-white/10"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-[#19ad7d]/30 shrink-0">
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={`font-['Inter'] text-xs font-bold tracking-wider uppercase ${
                            isLightMode ? "text-black" : "text-white"
                          }`}
                        >
                          {testimonial.name}
                        </span>
                        <span
                          className={`font-['Inter'] text-[10px] uppercase opacity-60 line-clamp-1 ${
                            isLightMode ? "text-black" : "text-white"
                          }`}
                        >
                          {testimonial.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
