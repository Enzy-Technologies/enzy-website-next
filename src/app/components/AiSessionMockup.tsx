"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUp, ChevronUp, CircleCheck } from "lucide-react";
import { MEDIA } from "../lib/breakpoints";

/**
 * Auto-playing, looping recreation of a real Enzy AI session, framed in a
 * phone. It walks the full flow — landing → tapped prompt → collapsed
 * "thinking" → expanded step-by-step reasoning → final coaching answer — then
 * holds and restarts. The point is to show that Enzy AI reasons through the
 * team's performance and recommends an action, not just returns data.
 *
 * Everything is real DOM (not screenshots) so each beat actually animates:
 * the chip tap, the prompt dropping into the thread, the spinner, the steps
 * checking off one at a time, and the answer rendering in.
 *
 * The screen is authored at a logical resolution and scaled to fit its
 * container, so all the spacing below is in real device px. Mobile uses a
 * phone (393×852); desktop widens the frame (600×768) so the chat copy wraps
 * into a roomier column instead of the narrow phone simply being scaled up.
 */

const PHONE = { w: 393, h: 852 };
const DESKTOP = { w: 600, h: 768 };

// Colors sampled from the in-app recording: the AI screen is white, the user
// bubble is a soft mint, and the reasoning UI is a teal→green accent.
const SCREEN_BG = "#ffffff";
const INK = "#161513";
const MUTE = "#6f6f6a";
const FAINT = "#a3a39d";
const MINT = "#ccece1";
const CHIP = "#d6efe6";
const GREEN = "#0DA071";
const TEAL = "#12bd95";
/** Teal→green gradient used on the reasoning panel border. */
const PANEL_BORDER = "linear-gradient(135deg, #2fd9b6, #0DA071)";

const CHIPS = [
  "Who has a birthday this week?",
  "Build an incentive to get the team back on track",
  "Who on my team needs coaching right now?",
];
/** The chip that gets "tapped" each loop. */
const PICKED = 2;
const USER_MSG = "Who on my team needs coaching right now?";

const STEPS = [
  "Analyzed team performance metrics for coaching opportunities",
  "Identified team members currently falling behind on performance metrics",
  "Retrieved 30-day productivity metrics for the team",
  "Identifying team member context…",
];

const REPS = [
  {
    name: "Ethan Brooks",
    note: " — 45 last month, 0 this week. His activity count is still high, so he's working — the closes just stopped. Looks like a late-funnel issue, not effort.",
  },
  {
    name: "Alex Carter",
    note: " — 42 last month, 0 this week. Conversion held steady, so this looks like activity, not skill — he's barely been out this week.",
  },
  {
    name: "Jordan Blake",
    note: " — 37 last month, 0 this week. Appointments set are flat but none are closing. Something's breaking between the sit and the sale.",
  },
  {
    name: "Mason Reed",
    note: " — 28 last month, 0 this week. His drop lines up with the team's tougher new territory — context, not performance.",
  },
  {
    name: "Caleb Morgan",
    note: " — 19 last month, 0 this week. Still ramping, and a zero week early on is often where reps quit.",
  },
];

const INTRO =
  "Five reps have gone cold this week — high recent volume, zero closes in the last 7 days. That pattern usually means a fixable hurdle, not a slump, and it's the moment a manager's outreach matters most.";
const CLOSING =
  "These are your highest-volume reps, so a quick check-in today will move the most revenue. Want me to draft coaching nudges for all five, or set this to run every Monday automatically?";

const MONO = "'Roboto Mono', ui-monospace, monospace";
const SANS = "Inter, sans-serif";

type View = "landing" | "thread";
type Thinking = "none" | "collapsed" | "expanded";

/**
 * The Enzy AI sparkle — a four-point star with deeply concave sides and sharp
 * points, carrying a teal→green diagonal gradient (brighter teal at the top,
 * deeper green toward the bottom-left), matching the in-app home screen icon.
 */
function Sparkle({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient
          id="enzy-spark"
          x1="20"
          y1="2"
          x2="4"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2BE6C1" />
          <stop offset="1" stopColor={GREEN} />
        </linearGradient>
      </defs>
      <path
        d="M12 1Q12.7 11.3 23 12 12.7 12.7 12 23 11.3 12.7 1 12 11.3 11.3 12 1Z"
        fill="url(#enzy-spark)"
      />
    </svg>
  );
}

/** Thin grey loading ring. */
function Spinner({ size = 16 }: { size?: number }) {
  return (
    <motion.span
      className="inline-block shrink-0 rounded-full border-[1.6px] border-[#d3d3ce] border-t-transparent"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
    />
  );
}

function CircleButton({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white shadow-[0_3px_10px_rgba(0,0,0,0.06)]">
      {children}
    </div>
  );
}

/** Tracks whether the viewport is at the desktop breakpoint. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MEDIA.desktop);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/** Measures its own width and returns the scale needed to map `designW` onto it. */
function useFitScale(designW: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.76);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / designW);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [designW]);
  return { ref, scale };
}

/**
 * Renders text as individual words that fade in sequentially, so a block of
 * copy "streams" in left-to-right rather than appearing all at once. Words
 * occupy their final positions immediately (only opacity animates), so the
 * surrounding layout never reflows — nothing jerks into place.
 */
function StreamWords({
  text,
  start,
  per = 0.018,
}: {
  text: string;
  start: number;
  per?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.14, delay: start + i * per }}
        >
          {i ? " " : ""}
          {w}
        </motion.span>
      ))}
    </>
  );
}

/**
 * The final coaching answer, revealed top-to-bottom one word at a time. Each
 * block's start time is offset by the running word count of the blocks above
 * it, so the whole response reads as a continuous stream.
 */
function StreamedAnswer() {
  const PER = 0.018;
  const START = 0.06;
  let wi = 0;
  const at = (text: string) => {
    const s = START + wi * PER;
    wi += text.trim().split(/\s+/).length;
    return s;
  };
  const introStart = at(INTRO);
  const headStart = at("Sudden Stops");
  const reps = REPS.map((r) => ({
    ...r,
    nameStart: at(r.name),
    noteStart: at(r.note),
  }));
  const closingStart = at(CLOSING);
  const discStart = START + wi * PER + 0.2;

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[13.5px] leading-[19px]" style={{ fontFamily: SANS, color: INK }}>
        <StreamWords text={INTRO} start={introStart} per={PER} />
      </p>
      <p
        className="mt-0.5 text-[18px] leading-tight"
        style={{ fontFamily: SANS, fontWeight: 700, color: INK }}
      >
        <StreamWords text="Sudden Stops" start={headStart} per={PER} />
      </p>
      <ul className="flex flex-col gap-2">
        {reps.map((rep) => (
          <li key={rep.name} className="flex gap-2">
            <motion.span
              className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full"
              style={{ background: INK }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.14, delay: rep.nameStart }}
            />
            <p className="text-[13px] leading-[18px]" style={{ fontFamily: SANS, color: INK }}>
              <strong style={{ fontWeight: 700 }}>
                <StreamWords text={rep.name} start={rep.nameStart} per={PER} />
              </strong>
              <StreamWords text={rep.note} start={rep.noteStart} per={PER} />
            </p>
          </li>
        ))}
      </ul>
      <p className="text-[13.5px] leading-[19px]" style={{ fontFamily: SANS, color: INK }}>
        <StreamWords text={CLOSING} start={closingStart} per={PER} />
      </p>
      <motion.p
        className="mt-0.5 text-right text-[11px] leading-[15px]"
        style={{ fontFamily: SANS, color: FAINT }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: discStart }}
      >
        Enzy AI can make mistakes.
        <br />
        Verify important details.
      </motion.p>
    </div>
  );
}

export function AiSessionMockup() {
  const isDesktop = useIsDesktop();
  const design = isDesktop ? DESKTOP : PHONE;
  const { ref, scale } = useFitScale(design.w);
  const hostRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const [view, setView] = useState<View>("landing");
  const [tapped, setTapped] = useState(false);
  const [thinking, setThinking] = useState<Thinking>("none");
  const [steps, setSteps] = useState(0);
  const [answer, setAnswer] = useState(false);

  // Only run the loop while the phone is on screen.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: skip the choreography, hold on the finished answer.
    if (reduce) {
      setView("thread");
      setThinking("none");
      setSteps(STEPS.length);
      setAnswer(true);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        timers.push(window.setTimeout(res, ms));
      });

    async function run() {
      while (!cancelled) {
        setView("landing");
        setTapped(false);
        setThinking("none");
        setSteps(0);
        setAnswer(false);
        await sleep(1700);
        if (cancelled) return;

        setTapped(true);
        await sleep(650);
        if (cancelled) return;

        setView("thread");
        setTapped(false);
        await sleep(480);
        if (cancelled) return;

        setThinking("collapsed");
        await sleep(1400);
        if (cancelled) return;

        setThinking("expanded");
        for (let i = 1; i <= STEPS.length; i++) {
          setSteps(i);
          await sleep(580);
          if (cancelled) return;
        }
        await sleep(950);
        if (cancelled) return;

        setThinking("none");
        setAnswer(true);
        // Hold long enough for the word-by-word stream (~4s) plus a longer
        // dwell on the finished response before the loop restarts.
        await sleep(8800);
        if (cancelled) return;

        // Fade back to the landing state, then restart.
        setView("landing");
        await sleep(220);
      }
    }

    run();
    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, [inView]);

  const generating = thinking !== "none";

  return (
    <div className="flex justify-center">
      <div
        ref={(node) => {
          ref.current = node;
          hostRef.current = node;
        }}
        className={`relative w-full ${isDesktop ? "max-w-[520px]" : "max-w-[300px]"}`}
        style={{ height: design.h * scale }}
      >
        <div
          // `ring-inset` keeps the device edge inside the box so it can't be
          // clipped by an overflow-hidden ancestor on narrow screens. No drop
          // shadow — matches the flat leaderboard preview.
          className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-[44px] ring-1 ring-inset ring-black/12 dark:ring-white/15"
          style={{
            width: design.w,
            height: design.h,
            transform: `scale(${scale})`,
            background: SCREEN_BG,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-3 pt-6">
            <CircleButton>
              <Menu className="h-[18px] w-[18px]" style={{ color: INK }} />
            </CircleButton>
            <AnimatePresence mode="wait">
              <motion.p
                key={view}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="px-2 text-center text-[12px] uppercase leading-tight tracking-[1.5px]"
                style={{ fontFamily: MONO, color: INK }}
              >
                {view === "landing" ? "New Chat" : "Team coaching needs"}
              </motion.p>
            </AnimatePresence>
            <CircleButton>
              <X className="h-[18px] w-[18px]" style={{ color: INK }} />
            </CircleButton>
          </div>

          {/* Conversation area */}
          <div className="absolute inset-x-0 bottom-[84px] top-[78px] overflow-hidden px-5">
            <AnimatePresence mode="wait">
              {view === "landing" ? (
                <motion.div
                  key="landing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full flex-col items-center justify-center"
                >
                  <Sparkle size={34} />
                  <p
                    className="mt-4 text-center text-[28px] leading-[34px]"
                    style={{ fontFamily: "var(--font-ivyora), serif", color: INK }}
                  >
                    <em>Enzy AI</em> is ready to
                    <br />
                    help you.
                  </p>
                  <div className="mt-9 flex w-full flex-col items-center gap-2.5">
                    {CHIPS.map((chip, i) => (
                      <div key={chip} className="relative">
                        <motion.div
                          animate={
                            tapped && i === PICKED
                              ? { scale: 0.95 }
                              : { scale: 1 }
                          }
                          transition={{ duration: 0.18 }}
                          className="whitespace-nowrap rounded-full px-4 py-2.5 text-center text-[13px]"
                          style={{ background: CHIP, color: INK, fontFamily: SANS }}
                        >
                          {chip}
                        </motion.div>
                        {tapped && i === PICKED && <TapPulse />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="thread"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex h-full flex-col gap-3 pt-6"
                >
                  {/* Sent prompt */}
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28 }}
                    className="self-end rounded-[20px] px-4 py-2.5"
                    style={{ background: MINT, color: INK, maxWidth: "82%" }}
                  >
                    <p className="text-[14px] leading-[19px]" style={{ fontFamily: SANS }}>
                      {USER_MSG}
                    </p>
                  </motion.div>

                  {/* Thinking panel */}
                  <AnimatePresence>
                    {thinking !== "none" && (
                      <motion.div
                        key="think"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          marginTop: -12,
                          transition: { duration: 0.16, ease: "easeIn" },
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-[16px]"
                        style={{
                          background: `linear-gradient(${SCREEN_BG}, ${SCREEN_BG}) padding-box, ${PANEL_BORDER} border-box`,
                          border: "1.5px solid transparent",
                          // On the wider desktop frame the reasoning panel reads
                          // better as a compact, left-aligned card (~half the
                          // message width) rather than stretching edge to edge.
                          alignSelf: isDesktop ? "flex-start" : undefined,
                          maxWidth: isDesktop ? 320 : undefined,
                        }}
                      >
                        {thinking === "collapsed" ? (
                          <div className="flex items-center gap-2.5 px-3.5 py-3">
                            <Spinner />
                            <p
                              className="min-w-0 flex-1 truncate text-[14px]"
                              style={{ fontFamily: SANS, color: MUTE }}
                            >
                              Analyzing team performance metrics for coaching…
                            </p>
                          </div>
                        ) : (
                          <div className="relative px-3.5 py-3">
                            <ChevronUp
                              className="absolute right-3 top-3 h-4 w-4"
                              style={{ color: FAINT }}
                            />
                            <div className="flex flex-col gap-2.5 pr-5">
                              {STEPS.slice(0, steps).map((s, i) => {
                                // Rolling check-off: the latest revealed step is
                                // still "working" (spinner); the ones above it
                                // have resolved to a check.
                                const inProgress = i === steps - 1;
                                return (
                                  <motion.div
                                    key={s}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-start gap-2.5"
                                  >
                                    {inProgress ? (
                                      <span className="mt-[1px]">
                                        <Spinner size={15} />
                                      </span>
                                    ) : (
                                      <CircleCheck
                                        className="mt-[1px] h-[15px] w-[15px] shrink-0"
                                        style={{ color: TEAL }}
                                        strokeWidth={2.2}
                                      />
                                    )}
                                    <p
                                      className="text-[13.5px] leading-[18px]"
                                      style={{
                                        fontFamily: SANS,
                                        color: inProgress ? FAINT : "#3a3a38",
                                      }}
                                    >
                                      {s}
                                    </p>
                                  </motion.div>
                                );
                              })}
                            </div>
                            <div className="mt-3">
                              <span
                                className="text-[13px]"
                                style={{ fontFamily: SANS, color: MUTE }}
                              >
                                Show all 6 steps
                              </span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Final answer — streams in word by word from the top */}
                  {answer && <StreamedAnswer />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Top fade so thread content dissolves under the header. Inset
              horizontally so it never paints over the inset device ring on the
              left/right edges (which would break the border line). */}
          <div
            className="pointer-events-none absolute inset-x-2 top-[78px] z-10 h-5"
            style={{
              background: `linear-gradient(to bottom, ${SCREEN_BG}, rgba(255,255,255,0))`,
            }}
          />

          {/* Input bar */}
          <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-1">
            <motion.div
              className="flex h-12 items-center justify-between rounded-full bg-white pl-4 pr-1.5"
              animate={{
                boxShadow: generating
                  ? "0 0 0 1px rgba(18,189,149,0.30), 0 0 26px 2px rgba(18,189,149,0.42)"
                  : "0 4px 14px rgba(0,0,0,0.05)",
              }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[15px]" style={{ fontFamily: SANS, color: FAINT }}>
                Ask anything…
              </span>
              {generating ? (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#161513]">
                  <span className="h-3 w-3 rounded-[3px] bg-white" />
                </div>
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e6e6e1]">
                  <ArrowUp className="h-4 w-4" style={{ color: FAINT }} />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Expanding tap ripple shown over the picked chip. */
function TapPulse() {
  return (
    <motion.span
      className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border-2"
      style={{
        borderColor: GREEN,
        background: "rgba(13,160,113,0.16)",
        width: 44,
        height: 44,
        marginLeft: -22,
        marginTop: -22,
      }}
      initial={{ scale: 0.5, opacity: 0.9 }}
      animate={{ scale: 1.7, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
}

export default AiSessionMockup;
