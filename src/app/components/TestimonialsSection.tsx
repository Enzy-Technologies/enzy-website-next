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
    image: "/testimonials/mike-sawtelle-2.jpg"
  },
  {
    id: 6,
    quote: "We [use] Enzy extensively throughout our business. It has rapidly become the go-to source for sales reps and managers when it comes to everything from onboarding and metric tracking to prize fulfillment and communication.",
    name: "Cj Adamson",
    title: "Co-Founder & COO of NuSun Power",
    image: "/testimonials/cj-adamson.jpg"
  },
  {
    id: 7,
    quote: "Because we have a live scoreboard, they hit numbers I've never seen before.",
    name: "Alex Smith",
    title: "CEO of Spartan Solar",
    image: "/testimonials/alex-smith.jpg"
  }
];

// One full set scrolls in this many ms. Shared by the animation and the
// drag-to-scrub math so they stay in sync. Speed is setWidth/duration, so this
// is scaled to the card count (6 cards → 60000) to hold the visual px/ms speed
// constant: each card adds ~10000ms.
const MARQUEE_DURATION_MS = 60000;

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
  const rootRef = useRef<HTMLDivElement>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  // Drives the grab/grabbing cursor only; the motion is ref-driven (below).
  const [isDragging, setIsDragging] = useState(false);
  const [inView, setInView] = useState(true);

  // --- Single-rAF motion model -------------------------------------------
  // The auto-scroll, the drag, AND the flick momentum are all driven by ONE
  // requestAnimationFrame loop that writes the track's transform directly. There
  // is no Web Animations API / compositor animation to pause, resume, or
  // re-promote — so there is no main-thread↔compositor hand-off anywhere, which
  // is what was causing the residual jump when a flick's coast settled back into
  // the auto-scroll. `pos` = leftward translate in px (wrapped to one set width,
  // so it stays small & precise); `vel` = px/ms, positive = leftward (the
  // marquee's own direction).
  const posRef = useRef(0);
  const velRef = useRef(0);
  const modeRef = useRef<"auto" | "drag" | "flick">("auto");
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef(0);
  const setWidthRef = useRef(0); // px width of one set (one card-list copy)
  const reducedMotionRef = useRef(false);
  // Mirror state into refs so the rAF reads current values without re-subscribing.
  const inViewRef = useRef(true);
  const flippedRef = useRef<number | null>(null);
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);
  useEffect(() => {
    flippedRef.current = flippedIndex;
  }, [flippedIndex]);

  // Drag + flick bookkeeping.
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const posAtStartRef = useRef(0);
  const movedRef = useRef(false); // exceeded the drag threshold?
  const capturedRef = useRef(false); // have we captured the pointer?
  const velocityRef = useRef(0); // smoothed pointer velocity, px/ms, + = right
  const lastMoveXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);

  // Two sets is enough for a seamless loop: shifting by exactly one set's width
  // puts the second (identical) copy where the first began.
  const marqueeItems = Array(sets).fill(testimonials).flat();

  // The one rAF loop. It owns the transform: auto-scroll, the tail of a flick,
  // and (rendered from pointermove) the drag all share it, so motion is never
  // handed between mechanisms.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    reducedMotionRef.current =
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setWidthRef.current = track.offsetWidth / sets;

    const tick = (ts: number) => {
      rafRef.current = requestAnimationFrame(tick);
      const dt = lastTsRef.current ? Math.min(ts - lastTsRef.current, 50) : 16;
      lastTsRef.current = ts;
      const sw = track.offsetWidth / sets;
      if (!sw) return;
      setWidthRef.current = sw;
      // Paused (off-screen / a card flipped) or being dragged (pointermove
      // renders directly) → don't advance here.
      if (
        !inViewRef.current ||
        flippedRef.current !== null ||
        modeRef.current === "drag"
      ) {
        return;
      }
      const marqueeSpeed = reducedMotionRef.current
        ? 0
        : sw / MARQUEE_DURATION_MS;
      if (modeRef.current === "flick") {
        // Decay the flick velocity toward the marquee speed (NOT zero), so it
        // merges seamlessly into the auto-scroll — same loop, no hand-off.
        const decay = Math.pow(0.95, dt / 16.67);
        velRef.current = marqueeSpeed + (velRef.current - marqueeSpeed) * decay;
        if (
          Math.abs(velRef.current - marqueeSpeed) <
          Math.max(marqueeSpeed * 0.01, 0.0005)
        ) {
          velRef.current = marqueeSpeed;
          modeRef.current = "auto";
        }
      } else {
        velRef.current = marqueeSpeed;
      }
      let pos = posRef.current + velRef.current * dt;
      pos = ((pos % sw) + sw) % sw;
      posRef.current = pos;
      track.style.transform = `translate3d(${-pos}px, 0, 0)`;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = 0;
    };
  }, [sets]);

  // Only advance the marquee while it's actually on-screen (the rAF reads
  // inViewRef each frame).
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

  // --- Drag + flick: both feed the same rAF via pos / vel / mode ----------
  // Pointer capture starts only once a real drag is detected, so a plain tap
  // still flips the card.
  const handlePointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (pointerIdRef.current !== null) return;
    setWidthRef.current = track.offsetWidth / sets;
    dragStartXRef.current = e.clientX;
    posAtStartRef.current = posRef.current;
    movedRef.current = false;
    capturedRef.current = false;
    pointerIdRef.current = e.pointerId;
    velocityRef.current = 0;
    lastMoveXRef.current = e.clientX;
    lastMoveTimeRef.current = e.timeStamp;
    modeRef.current = "drag"; // rAF stops advancing; pointermove drives position
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return;
    const track = trackRef.current;
    const sw = setWidthRef.current;
    if (!track || !sw) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 5) {
      movedRef.current = true;
      if (!capturedRef.current) {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
        capturedRef.current = true;
      }
    }
    // Dragging right (dx > 0) moves the cards right → pos decreases. Render now
    // (don't wait for the rAF) so the strip tracks the finger 1:1.
    let pos = posAtStartRef.current - dx;
    pos = ((pos % sw) + sw) % sw;
    posRef.current = pos;
    track.style.transform = `translate3d(${-pos}px, 0, 0)`;

    // Smoothed pointer velocity (px/ms, + = right) for the release flick.
    const mdt = e.timeStamp - lastMoveTimeRef.current;
    if (mdt > 0) {
      const instantV = (e.clientX - lastMoveXRef.current) / mdt;
      velocityRef.current = velocityRef.current * 0.6 + instantV * 0.4;
    }
    lastMoveXRef.current = e.clientX;
    lastMoveTimeRef.current = e.timeStamp;
  };

  const handlePointerEnd = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return;
    if (capturedRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
    pointerIdRef.current = null;
    capturedRef.current = false;

    // Hand the finger's velocity to the rAF as the flick's starting velocity; it
    // decays to the marquee speed there (no hand-off — same loop). A tap, or a
    // release after the finger had paused, hands over vel 0, which just ramps
    // gently back up to marquee speed. vel is in pos-space (+ = leftward), so it's
    // the negative of the rightward pointer velocity.
    const idleMs = e.timeStamp - lastMoveTimeRef.current;
    let vFinger = velocityRef.current;
    if (!movedRef.current || idleMs > 100) vFinger = 0;
    vFinger = Math.max(-3, Math.min(3, vFinger)); // cap runaway flicks
    velRef.current = -vFinger;
    modeRef.current = "flick";
    setIsDragging(false);
  };

  return (
    <div ref={rootRef} className={className}>
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
      <div
        className={`w-full relative overflow-x-clip select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
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
                  onClick={() => {
                    // Suppress the flip if this click ended a drag.
                    if (movedRef.current) return;
                    setFlippedIndex(isFlipped ? null : idx);
                  }}
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
                        Customer Testimonial
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
                        className="font-inter text-[17px] md:text-[20px] font-bold leading-[1.3] tracking-tight line-clamp-3 text-[#0b0f14] dark:text-white"
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
