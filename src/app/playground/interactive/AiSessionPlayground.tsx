"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUp, ChevronUp, CircleCheck } from "lucide-react";

/**
 * Playground-only Enzy AI session.
 *
 * This is a deliberate FORK of the Systems-page `AiSessionMockup`: the two are
 * intentionally different experiences. The Systems page auto-plays and loops
 * (with its chip-press + green tap ripple); this one is the interactive phone
 * version — it opens on the landing screen, waits for a tap on the coaching
 * chip (the others are inert for now), plays the session ONCE, then holds on
 * the answer and fires `onComplete` so the phone can reveal the close hint.
 *
 * Differences baked in here so they never leak back to the Systems page:
 *  - tap-to-start, play-once (no autoplay loop)
 *  - the chips never move — no press-scale, no green ripple; the orange
 *    indicator is the only tap cue
 *  - the whole top region drops by TOP_OFFSET to clear the phone notch
 *  - the thread sits ~12px higher and there's no top fade (it washed white
 *    over the first message)
 *  - always phone-sized (393×852), bare (no device ring) — the PhoneInHand
 *    bezel supplies the frame and the zoom transform
 */

const W = 393;
const H = 852;
// How far the top region (header + where the conversation begins) drops to
// clear the device notch. Mirrored by AI_TOP_OFFSET in InteractivePhoneV2,
// which positions the close button against this shifted header.
const TOP_OFFSET = 30;

const SCREEN_BG = "#ffffff";
const INK = "#161513";
const MUTE = "#6f6f6a";
const FAINT = "#a3a39d";
const MINT = "#ccece1";
const CHIP = "#d6efe6";
const GREEN = "#0DA071";
const GREEN_RGB = "255, 159, 10"; // amber-orange #FF9F0A for the chip pulse
const TEAL = "#12bd95";
const PANEL_BORDER = "linear-gradient(135deg, #2fd9b6, #0DA071)";

const CHIPS = [
  "Who has a birthday this week?",
  "Build an incentive to get the team back on track",
  "Who on my team needs coaching right now?",
];
/** The only wired-up chip — tapping it starts the session. */
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

function Sparkle({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="enzy-spark-pg" x1="20" y1="2" x2="4" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2BE6C1" />
          <stop offset="1" stopColor={GREEN} />
        </linearGradient>
      </defs>
      <path d="M12 1Q12.7 11.3 23 12 12.7 12.7 12 23 11.3 12.7 1 12 11.3 11.3 12 1Z" fill="url(#enzy-spark-pg)" />
    </svg>
  );
}

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

function StreamWords({ text, start, per = 0.018 }: { text: string; start: number; per?: number }) {
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
  const reps = REPS.map((r) => ({ ...r, nameStart: at(r.name), noteStart: at(r.note) }));
  const closingStart = at(CLOSING);
  const discStart = START + wi * PER + 0.2;

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[13.5px] leading-[19px]" style={{ fontFamily: SANS, color: INK }}>
        <StreamWords text={INTRO} start={introStart} per={PER} />
      </p>
      <p className="mt-0.5 text-[18px] leading-tight" style={{ fontFamily: SANS, fontWeight: 700, color: INK }}>
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

export function AiSessionPlayground({
  open = true,
  onComplete,
}: {
  /**
   * Whether the session is currently shown. It stays mounted even when closed
   * (so the first open has no mount-time jank), and resets to its landing each
   * time `open` flips true.
   */
  open?: boolean;
  onComplete?: () => void;
}) {
  const [view, setView] = useState<View>("landing");
  const [thinking, setThinking] = useState<Thinking>("none");
  const [steps, setSteps] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [started, setStarted] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Reset to the landing each time the session is (re)opened.
  useEffect(() => {
    if (open) {
      setView("landing");
      setStarted(false);
      setThinking("none");
      setSteps(0);
      setAnswer(false);
    }
  }, [open]);

  // Tap-to-start, play-once. Triggered when the coaching chip is tapped; runs
  // the choreography a single time, then holds on the answer and fires
  // onComplete so the phone can reveal the close (X) hint.
  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    const timers: number[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        timers.push(window.setTimeout(res, ms));
      });

    async function run() {
      await sleep(450);
      if (cancelled) return;
      setView("thread");
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
      await sleep(4600); // dwell through the word-by-word stream
      if (cancelled) return;
      onCompleteRef.current?.();
    }

    run();
    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, [started]);

  const generating = thinking !== "none";

  return (
    <div
      className="absolute inset-0 origin-top-left overflow-hidden"
      style={{ width: W, height: H, background: SCREEN_BG }}
    >
      {/* Header — dropped by TOP_OFFSET to clear the notch. */}
      <div
        className="flex items-center justify-between px-5 pb-3 pt-6"
        style={{ marginTop: TOP_OFFSET }}
      >
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
      <div
        className="absolute inset-x-0 bottom-[84px] overflow-hidden px-5"
        style={{ top: 78 + TOP_OFFSET }}
      >
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
                {CHIPS.map((chip, i) => {
                  const pickable = i === PICKED && !started;
                  // Only pulse the coaching chip, and only while open (it stays
                  // mounted when closed). Always-present green outline + glow
                  // that breathes lighter↔stronger (never gone), no size change.
                  const pulsing = open && pickable;
                  return (
                    <motion.div
                      key={chip}
                      onClick={pickable ? () => setStarted(true) : undefined}
                      className="whitespace-nowrap rounded-full px-4 py-2.5 text-center text-[13px]"
                      style={{
                        background: CHIP,
                        color: INK,
                        fontFamily: SANS,
                        cursor: pickable ? "pointer" : "default",
                      }}
                      animate={
                        pulsing
                          ? {
                              boxShadow: [
                                `0 0 0 1.5px rgba(${GREEN_RGB}, 0.65), 0 0 8px 1px rgba(${GREEN_RGB}, 0.45)`,
                                `0 0 0 2px rgba(${GREEN_RGB}, 1), 0 0 16px 3px rgba(${GREEN_RGB}, 0.8)`,
                                `0 0 0 1.5px rgba(${GREEN_RGB}, 0.65), 0 0 8px 1px rgba(${GREEN_RGB}, 0.45)`,
                              ],
                            }
                          : { boxShadow: "0 0 0 0 rgba(13,160,113,0)" }
                      }
                      transition={
                        pulsing
                          ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                          : { duration: 0.2 }
                      }
                    >
                      {chip}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="thread"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-full flex-col gap-3"
              style={{ paddingTop: 12 }}
            >
              {/* Sent prompt. No `layout` prop here (unlike the Systems mockup):
                  the bubble appears once and must NOT re-animate its position
                  when the thinking panel collapses and the answer streams in. */}
              <motion.div
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
                    exit={{ opacity: 0, height: 0, marginTop: -12, transition: { duration: 0.16, ease: "easeIn" } }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden rounded-[16px]"
                    style={{
                      background: `linear-gradient(${SCREEN_BG}, ${SCREEN_BG}) padding-box, ${PANEL_BORDER} border-box`,
                      border: "1.5px solid transparent",
                    }}
                  >
                    {thinking === "collapsed" ? (
                      <div className="flex items-center gap-2.5 px-3.5 py-3">
                        <Spinner />
                        <p className="min-w-0 flex-1 truncate text-[14px]" style={{ fontFamily: SANS, color: MUTE }}>
                          Analyzing team performance metrics for coaching…
                        </p>
                      </div>
                    ) : (
                      <div className="relative px-3.5 py-3">
                        <ChevronUp className="absolute right-3 top-3 h-4 w-4" style={{ color: FAINT }} />
                        <div className="flex flex-col gap-2.5 pr-5">
                          {STEPS.slice(0, steps).map((s, i) => {
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
                                  <CircleCheck className="mt-[1px] h-[15px] w-[15px] shrink-0" style={{ color: TEAL }} strokeWidth={2.2} />
                                )}
                                <p className="text-[13.5px] leading-[18px]" style={{ fontFamily: SANS, color: inProgress ? FAINT : "#3a3a38" }}>
                                  {s}
                                </p>
                              </motion.div>
                            );
                          })}
                        </div>
                        <div className="mt-3">
                          <span className="text-[13px]" style={{ fontFamily: SANS, color: MUTE }}>
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

      {/* Input bar — anchored to the bottom, unaffected by TOP_OFFSET. */}
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
  );
}

export default AiSessionPlayground;
