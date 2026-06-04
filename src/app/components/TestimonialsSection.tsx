import React, { useEffect, useState, useRef } from "react";
import { RotateCw } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BlurReveal } from "./BlurReveal";

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
    quote: "Honestly, the biggest impact Enzy has had on our company isn’t just the features themselves, it’s how it reshapes our thinking and behavior as an organization. Before Enzy, we were reacting to results; now we’re anticipating them. Because every KPI, leaderboard, and real-time insight is visible at the moment decisions are made — so if you asked me where the magic really sits, it’s not just the tool — it’s what it enables. Enzy turned data into decision velocity, visibility into alignment, and motivation into momentum. That’s been the difference-maker for us this year.",
    name: "Ashleigh Pepper",
    title: "CEO of Kaizen Promittere",
    image: "/testimonials/ashleigh-pepper.jpg"
  },
  {
    id: 2,
    quote: "Impressive in every way. From leadership, to UI, to experience... it's all been exceptional! This app is solving so many problems for companies.",
    name: "Stanford Johnsen",
    title: "Co-Founder & CSO of Capital Energy",
    image: "/testimonials/stanford-johnsen.jpg"
  },
  {
    id: 3,
    quote: "Enzy is totally transforming our organization. We have more visibility into our day to day and we’re incentivizing the behavior that’s actually driving results. The platform is easy to use, and the user experience makes the team want to use it for everything. Enzy is helping us push the limits of what it means to be a healthcare company.",
    name: "Sean McLean",
    title: "Co-Founder & CEO of Elite Anesthesia",
    image: "/testimonials/sean-mclean.jpg"
  },
  {
    id: 4,
    quote: "Enzy has been a massive value for us. Since we sell with multiple companies, we’ve always had to have a solution that aggregates that data and showcases it functional and ideally aesthetic way. For years we used web-based “apps” that got the job done. Enzy does it in a sexier, more functional way that has been game changing up into this point.",
    name: "John Taylor",
    title: "Co-Founder & CEO at Grit Marketing",
    image: "/testimonials/john-taylor.jpg"
  },
  {
    id: 5,
    quote: "What’s been most impressive is how quick they are to implement the changes needed for our structure. We’re a large organization and so it’s not easy for us to get this big ship moving in a new direction and switching platforms.",
    name: "Mike Sawtelle",
    title: "Co-Owner at EcoShield",
    image: "/testimonials/mike-sawtelle.jpg"
  },
  {
    id: 6,
    quote: "We [use] Enzy extensively throughout our business. It has rapidly become the go-to source for sales reps and managers when it comes to everything from onboarding and metric tracking to prize fulfillment and communication.",
    name: "Cj Adamson",
    title: "Co-Founder & COO of NuSun Power",
    image: "/testimonials/cj-adamson.jpg"
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
  return (
    <section className="relative w-full py-20 md:py-28 overflow-x-clip z-20"
    >
      <div className="w-full mx-auto max-w-7xl px-4 md:px-4 flex flex-col gap-8 relative mb-12">
        <div className="flex flex-col items-start w-full text-left">
          <h2
            className="font-ivyora text-5xl md:text-7xl lg:text-[96px] text-[#0b0f14] dark:text-white tracking-[-2px] leading-[1.05] font-medium"
          >
            <BlurReveal as="span" delay={0.1}>
              In their{" "}
            </BlurReveal>
            <BlurReveal as="span" delay={0.4} className="italic">
              words
            </BlurReveal>
          </h2>
        </div>
      </div>

      <TestimonialsMarquee testimonials={TESTIMONIALS} />
    </section>
  );
}

export function TestimonialsMarquee({
  testimonials,
  className,
  sets = 2,
}: {
  testimonials: readonly Testimonial[];
  className?: string;
  sets?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  // Pause the marquee while it's scrolled off-screen so it isn't compositing a
  // wide, many-layered 3D track in the background — that work was making other
  // interactions (e.g. opening the nav menu at the top of the page) feel laggy.
  const [inView, setInView] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  // Two sets is enough for a seamless loop when we animate the track by
  // exactly one set's width.
  const marqueeItems = Array(sets).fill(testimonials).flat();

  // Drive the auto-scroll with the Web Animations API — runs on the
  // compositor thread, so it stays smooth on mobile even when the main
  // thread is busy (BlurReveal, card content, scroll-driven effects).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // The track has `sets` copies of the cards. Translating by
    // -100/sets % shifts exactly one copy, which means the next copy
    // takes its place — seamless loop.
    const distance = `-${100 / sets}%`;

    const animation = track.animate(
      [
        { transform: "translate3d(0, 0, 0)" },
        { transform: `translate3d(${distance}, 0, 0)` },
      ],
      {
        duration: 60000, // 60s for a full set; tweak for taste
        iterations: Infinity,
        easing: "linear",
      }
    );

    animationRef.current = animation;
    return () => {
      animation.cancel();
      animationRef.current = null;
    };
  }, [sets]);

  // Only run the marquee while it's actually on-screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pause when off-screen, when a card is flipped, or when a desktop user is
  // hovering.
  useEffect(() => {
    const animation = animationRef.current;
    if (!animation) return;
    const isHoverDevice =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: hover)").matches;

    if (!inView || flippedIndex !== null || (isHoverDevice && isHovered)) {
      animation.pause();
    } else {
      animation.play();
    }
  }, [flippedIndex, isHovered, inView]);

  return (
    <div
      ref={rootRef}
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

      {/* `overflow-x-clip` (not `overflow-hidden`) hides the off-screen
          marquee cards horizontally while leaving the Y axis visible, so the
          cards' large drop shadows aren't sheared off at the bottom. Unlike
          `hidden`, `clip` doesn't force the other axis to `auto`. */}
      <div className="w-full relative overflow-x-clip">
        <div
          ref={trackRef}
          className="flex w-max py-8"
          style={{ willChange: "transform" }}
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
                  onClick={() => setFlippedIndex(isFlipped ? null : idx)}
                >
                  <div
                    className={`absolute inset-0 rounded-[32px] overflow-hidden flex flex-col transition-opacity duration-300 border shadow-[0_24px_80px_-24px_rgba(0,0,0,0.25)] bg-white/95 border-black/10 hover:border-[#19ad7d]/35 dark:bg-[#0f1419]/95 dark:border-white/12 dark:hover:border-[#19ad7d]/35 ${
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
                      className="relative h-[55%] w-full flex items-end justify-center pt-12 overflow-hidden border-b border-black/8 bg-[#eaf4f0] dark:border-white/8 dark:bg-[#17312d]"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full border border-[#19ad7d]/20" />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full border border-[#19ad7d]/10" />

                      <div className="relative w-[85%] h-[95%] rounded-t-[48px] overflow-hidden shadow-2xl z-10 border-t border-x border-white/10 bg-black/20">
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          sizes="(max-width: 768px) 260px, 320px"
                          loading="eager"
                          className="w-full h-full object-cover object-top grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    <div className="relative h-[45%] w-full p-6 md:p-8 flex flex-col justify-between">
                      <h3
                        className="font-inter text-[17px] md:text-[20px] font-bold leading-[1.3] tracking-tight line-clamp-4 text-[#0b0f14] dark:text-white"
                      >
                        {"\u201C"}
                        {first}
                        {"\u201D"}
                      </h3>

                      <div className="mt-auto flex flex-col relative">
                        <div className="w-10 h-[2px] bg-[#19ad7d] mb-4" />
                        <span
                          className="font-inter text-[14px] font-bold tracking-[0.1em] uppercase text-[#0b0f14] dark:text-white"
                        >
                          {testimonial.name}
                        </span>
                        <span
                          className="font-inter text-[11px] font-medium uppercase tracking-wider mt-1 text-[#0b0f14]/60 dark:text-white/40"
                        >
                          {testimonial.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-[32px] overflow-hidden flex flex-col p-6 md:p-8 border shadow-[0_24px_80px_-24px_rgba(0,0,0,0.25)] bg-white/97 border-black/10 dark:bg-[#0f1419]/97 dark:border-white/12"
                    style={{
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="absolute top-4 right-6 text-[#19ad7d] opacity-20 text-[100px] font-serif leading-none select-none">
                      “
                    </div>

                    {/* `overflow-y-auto` implicitly forces overflow-x to
                        `clip`, which would otherwise sever the
                        text-shadow halo at the left edge of the scroll
                        container (visible as a hard vertical line of
                        clipped glow). The `px-3 -mx-3` trick widens the
                        clip region by 12 px on each side while keeping
                        the text in its original visual position so the
                        shadow can render fully on both sides. */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide px-3 -mx-3 relative z-10">
                      <div className="pt-2 pb-4">
                        {/* White copy + dark text-shadow halo (in both light
                            and dark mode) keeps the back-side quote crisp
                            even when the front-face photo bleeds through the
                            card's slight translucency. */}
                        <p className="font-inter text-sm md:text-[15px] leading-relaxed text-white [text-shadow:0_0_8px_rgba(0,0,0,0.85),0_0_2px_rgba(0,0,0,0.85)]">
                          <span className="font-bold block mb-3 text-base md:text-lg leading-[1.3] text-white [text-shadow:0_0_10px_rgba(0,0,0,0.9),0_0_2px_rgba(0,0,0,0.9)]">
                          {"\u201C"}
                          {first}
                          {"\u201D"}
                          </span>
                          {rest ? <span className="block">{rest}</span> : null}
                        </p>
                      </div>
                    </div>

                    <div
                      className="mt-4 pt-4 border-t flex items-center gap-3 shrink-0 border-black/10 dark:border-white/10"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-[#19ad7d]/30 shrink-0">
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.name}
                          sizes="40px"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-inter text-xs font-bold tracking-wider uppercase text-white [text-shadow:0_0_8px_rgba(0,0,0,0.8),0_0_2px_rgba(0,0,0,0.8)]">
                          {testimonial.name}
                        </span>
                        <span className="font-inter text-[10px] uppercase line-clamp-1 text-white [text-shadow:0_0_8px_rgba(0,0,0,0.85),0_0_2px_rgba(0,0,0,0.85)]">
                          {testimonial.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
