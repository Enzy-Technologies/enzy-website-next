"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Trophy, DollarSign, Users, type LucideIcon } from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { AiSessionMockup } from "./components/AiSessionMockup";
import { ProfileMockup } from "./components/ProfileMockup";
import { CompetitionsMockup } from "./components/CompetitionsMockup";
import { CanvassingMockup } from "./components/CanvassingMockup";
import { RecruitFormMockup } from "./components/RecruitFormMockup";
import { GoalsMockup } from "./components/GoalsMockup";
import { BlurReveal } from "./components/BlurReveal";
import { MEDIA } from "./lib/breakpoints";

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
    tagline: "Win the approach and the follow-up.",
    icon: DollarSign,
  },
  {
    id: "recruit",
    label: "Recruit",
    tagline: "From first contact to first sale.",
    icon: Users,
  },
];

type Feature = {
  id: string;
  title: string;
  /** Collapsed one-liner shown under the title in the accordion header. */
  desc: string;
  /** Unique expanded copy — never a repeat of `desc`. */
  body: string;
  /** Expanded bullet points; each ladders to a behavior change. */
  bullets: string[];
  module: ModuleId;
  /** Source for the static image treatments. Omitted for live mockups. */
  image?: string;
  /** Wider capture used at the desktop breakpoint for the `"phone"` mockup. */
  imageDesktop?: string;
  /**
   * Render treatment for the preview. Default is the generic 16/10 landscape
   * card. `"phone"` frames `image` as the top of a phone screen — rounded top
   * corners (phone radius) with the lower edge blurring/fading out to suggest
   * the screen continues below. `"ai-loop"` renders the auto-playing Enzy AI
   * session animation in a phone instead of a static image. `"profile-toggle"`
   * renders the rep profile that toggles between its Badges and Reports tabs.
   * `"competitions-loop"` renders the auto-playing Competitions & Incentives
   * walkthrough (list → milestone with filling rings → bracket → repeat).
   * `"browser"` frames a public web page in a desktop browser window (tab strip
   * + address bar) instead of a phone — used for the public-facing recruit form.
   * `"canvassing-loop"` renders the auto-playing canvassing walkthrough
   * (territory map → tap red area → zoom to house pins → tap a pin → repeat).
   */
  mockup?: "phone" | "phone-full" | "phone-cutoff" | "ai-loop" | "profile-toggle" | "competitions-loop" | "browser" | "canvassing-loop" | "goals-collage";
  /**
   * For `"phone-cutoff"`: image-height fraction (0–1) where the dissolve
   * begins — a natural content break (a divider or the gap between rows).
   * Defaults to 0.767 (the Library's divider above "Trainings").
   */
  cutoffFrac?: number;
};

const FEATURES_DATA: Feature[] = [
  // ---------- Core ----------
  {
    module: "core",
    id: "enzy-ai",
    title: "Enzy AI",
    desc: "Ask anything about your team's data and get the next-best action — not just what happened, but what to do about it.",
    body: "Most software tells you what already happened. Enzy AI tells you what to do next. Ask it anything about your team — who's slipping, who's surging, where revenue is leaking — and get the next-best action while it still matters.",
    bullets: [
      "Ask in plain language: \"Who's at risk this week?\" or \"Where are we leaking revenue?\"",
      "Surfaces the signal early, so managers coach before a slump compounds",
      "Turns raw activity into a recommended action — not just another chart",
    ],
    mockup: "ai-loop",
  },
  {
    module: "core",
    id: "leaderboards",
    title: "Leaderboards",
    desc: "Make the score impossible to ignore, so reps compete without being told to.",
    body: "Reps don't need to be told to compete — they need to see the score. Leaderboards make standing public in real time, so effort and outcomes are visible and the team self-corrects without a single manager reminder.",
    bullets: [
      "Live rankings across any metric — sets, closes, revenue, activity",
      "Public visibility creates accountability without micromanaging",
      "Spot momentum shifts the moment they happen",
    ],
    image: "/system/leaderboard.png",
    imageDesktop: "/system/leaderboard-ipad.png",
    mockup: "phone",
  },
  {
    module: "core",
    id: "profiles",
    title: "Profiles",
    desc: "One place for every rep's performance, progress, and recognition — so good work gets seen.",
    body: "Every rep's performance, progress, and recognition in one place. When good work is visible, it gets repeated — and reps can see exactly how they stack up and what to chase next.",
    bullets: [
      "A single record of stats, badges, and milestones per rep",
      "Makes progress — and effort — impossible to overlook",
      "Gives reps ownership of their own performance story",
    ],
    mockup: "profile-toggle",
  },
  {
    module: "core",
    id: "goals",
    title: "Goals",
    desc: "Make the number explicit and track pacing live — so everyone knows if today's effort is enough.",
    body: "A target nobody can see is just a hope. Goals make the number explicit for the rep, the team, and the org, then track pacing in real time — so everyone knows whether today's effort is enough before the period closes, not after.",
    bullets: [
      "Set goals at the rep, team, or organization level",
      "Track pacing live against the target — not at month-end",
      "Turns a quota into a daily behavior the whole team can see",
    ],
    mockup: "goals-collage",
  },
  {
    module: "core",
    id: "competitions-and-incentives",
    title: "Competitions & Incentives",
    desc: "Launch competitions and incentives in minutes — focused on the behaviors that move revenue.",
    body: "Your contests shouldn't live in a spreadsheet. Launch competitions and incentives in minutes, point them at the behaviors that move revenue, and let focused urgency do the rest — built, tracked, and fulfilled in the same system your team already watches.",
    bullets: [
      "Spin up a competition in minutes around any metric",
      "Tie rewards to the specific behaviors you want more of",
      "Track standings live and fulfill incentives without leaving Enzy",
    ],
    mockup: "competitions-loop",
  },
  {
    module: "core",
    id: "messaging",
    title: "Messaging",
    desc: "Put communication where performance happens — aligned action, less noise.",
    body: "Communication shouldn't sit in a separate app from the score. Enzy puts messaging where performance happens — so a call-out, a coaching note, or a win lands in context and drives aligned action instead of noise.",
    bullets: [
      "Reach the whole team, a region, or one rep — in context",
      "Celebrate wins and coach the moment the data moves",
      "Less scattered noise, more aligned action",
    ],
    image: "/system/messaging.png",
    imageDesktop: "/system/messaging-ipad.png",
    mockup: "phone-full",
  },
  {
    module: "core",
    id: "library",
    title: "Library",
    desc: "Approved assets, scripts, and training in one place — so every rep sells the same way.",
    body: "When every rep has the approved assets, scripts, and training in one place, the whole team sells the same way. No digging through folders, no improvising the pitch.",
    bullets: [
      "Approved scripts, decks, and training in one searchable place",
      "Every rep pitches from the same playbook",
      "Update once and the whole field is current",
    ],
    image: "/system/library.png",
    mockup: "phone-cutoff",
  },

  // ---------- Sell ----------
  {
    module: "sell",
    id: "canvassing",
    title: "Canvassing",
    desc: "Plan territories and route the day, so reps spend time at doors — not deciding where to go next.",
    body: "Reps should spend the day at doors, not deciding where to go next. Plan territories, route the day, and keep the field moving — so time goes to selling instead of logistics.",
    bullets: [
      "Draw territories and assign them to reps or teams",
      "Route the day so reps cover ground, not guesswork",
      "Weather Overlays — point reps at the storm-hit streets where demand is live",
      "See where the team is working in real time",
    ],
    mockup: "canvassing-loop",
  },
  {
    module: "sell",
    id: "lead-management",
    title: "Lead Management",
    desc: "Keep priorities obvious from first touch to close, so reps always know who to work next.",
    body: "From first touch to close, reps should always know who to work next. Lead Management keeps priorities obvious and the pipeline moving, so no opportunity goes cold because nobody knew it was there.",
    bullets: [
      "Every lead, stage, and next step in one view",
      "Priorities stay obvious from first touch to close",
      "Nothing slips through the cracks between visits",
      "SMS campaigns — drip and broadcast texts that turn cold lists into booked conversations",
    ],
    image: "/system/lead-management.png",
    mockup: "phone-cutoff",
    // Fade begins at Ethan Walker's "Wed 30" appointment row.
    cutoffFrac: 0.745,
  },
  {
    module: "sell",
    id: "digital-business-card",
    title: "Digital Business Card",
    desc: "Share your contact and pitch with a tap. Track who opens, when, and what they do next.",
    body: "Share your contact and pitch with a tap — then see what happens next. Every card is trackable, so reps know who opened it, when, and exactly what to follow up on.",
    bullets: [
      "Share contact info and pitch instantly — no app required",
      "Track opens and engagement to time the follow-up",
      "Keeps the rep top-of-mind after they leave the door",
    ],
    image: "/system/digital-business-card.png",
    mockup: "phone-cutoff",
    // Fade begins at the "Spencer Morgan" contact row.
    cutoffFrac: 0.805,
  },
  {
    module: "sell",
    id: "calendar",
    title: "Calendar",
    desc: "Book, confirm, and reschedule appointments without the back-and-forth.",
    body: "Kill the back-and-forth. Book, confirm, and reschedule appointments in one flow — so reps spend their time in conversations instead of coordinating them.",
    bullets: [
      "Book and confirm appointments without the phone tag",
      "Automatic reminders cut no-shows",
      "Reschedule in a tap — no lost slots",
    ],
    image: "/system/calendar-month.png",
    mockup: "phone-full",
  },

  // ---------- Recruit ----------
  {
    module: "recruit",
    id: "recruiting-center",
    title: "Recruiting Center",
    desc: "Source, score, and pipeline candidates from one workspace.",
    body: "Source, score, and pipeline candidates from one workspace — so recruiting runs like a sales process instead of a scattered inbox. The strongest candidates stay visible and keep moving.",
    bullets: [
      "Source and score candidates in one pipeline",
      "Move applicants through stages like a deal",
      "Keep your best prospects from going cold",
    ],
    image: "/system/recruiting-center.png",
    mockup: "phone-full",
  },
  {
    module: "recruit",
    id: "public-recruit-form",
    title: "Public Recruit Form",
    desc: "A branded apply page that funnels candidates straight into your pipeline.",
    body: "A branded apply page that funnels candidates straight into your pipeline. Share it anywhere — every applicant lands in the same system your recruiters already work.",
    bullets: [
      "A shareable, branded page that's always recruiting",
      "Applicants flow directly into your pipeline",
      "Share on social, in ads, or rep-to-rep",
    ],
    mockup: "browser",
  },
  {
    module: "recruit",
    id: "onboarding",
    title: "Onboarding",
    desc: "Automate paperwork, training, and first-week milestones — so new reps start selling sooner.",
    body: "The faster a new rep starts selling, the faster they stick. Automate paperwork, training, and first-week milestones so onboarding runs itself — and nobody stalls waiting on a manual step.",
    bullets: [
      "Automate paperwork, training, and first-week milestones",
      "Document Library — forms, agreements, and training docs, signed, sorted, and searchable",
      "New reps ramp to productive sooner, with less manager lift",
    ],
    image: "/system/onboarding.png",
    mockup: "phone-full",
  },
];

const TAB_TRANSITION = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

/**
 * Frames a portrait app capture (393×852) as the top of a phone screen:
 * rounded top corners simulate the phone's radius. The lower edge blurs and
 * dissolves to transparent — the image itself is masked, so the bottom fades
 * into whatever sits behind the phone (the panel background) with no hard
 * edge, and it reads correctly in both light and dark mode.
 */
// Smoothstep-eased vertical alpha gradient between two positions (in %).
// A plain 2-stop linear gradient kinks at each stop, which reads as an abrupt
// start/end; easing the alpha curve makes both ends roll in and out smoothly
// over a short band. `reverse` flips it from visible→transparent (fade out)
// to transparent→opaque (ramp in).
function easedMask(start: number, end: number, reverse = false): string {
  const STEPS = 8;
  const stops = Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    const s = t * t * (3 - 2 * t); // smoothstep
    const a = reverse ? s : 1 - s;
    const pos = start + (end - start) * t;
    return `rgba(0,0,0,${a.toFixed(3)}) ${pos.toFixed(2)}%`;
  });
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
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

function PhoneMockup({
  src,
  srcDesktop,
  alt,
}: {
  src: string;
  /** Wider capture (e.g. iPad) shown at the desktop breakpoint when provided. */
  srcDesktop?: string;
  alt: string;
}) {
  const isDesktop = useIsDesktop();
  // On desktop, show the wider capture in a roomier, less-tall frame; on mobile
  // keep the phone. Same crop either way: rounded top with the content and the
  // device edge dissolving out over an eased band near the foot.
  const useWide = isDesktop && !!srcDesktop;
  // Shared fade band, eased at both ends. Applied to the image (dissolve
  // content to transparent) and the border overlay (fade the device edge out
  // in sync, so it never ends on a line).
  const FADE = easedMask(78, 90);
  // Blur ramps in just above the fade so the content softens as it goes.
  const BLUR = easedMask(72, 88, true);
  const radius = useWide ? "rounded-t-[28px]" : "rounded-t-[40px]";
  const frame = useWide
    ? "max-w-[520px] aspect-[1668/1500]"
    : "max-w-[320px] aspect-[393/720]";
  return (
    <div className="flex justify-center">
      <div className={`relative w-full overflow-hidden ${frame} ${radius}`}>
        <ImageWithFallback
          src={useWide ? (srcDesktop as string) : src}
          alt={alt}
          sizes={useWide ? "520px" : "(max-width: 768px) 90vw, 320px"}
          className="absolute inset-0 w-full h-full object-cover object-top"
          style={{ maskImage: FADE, WebkitMaskImage: FADE }}
        />
        {/* Progressive blur strengthening toward the bottom edge */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-[5px]"
          style={{ maskImage: BLUR, WebkitMaskImage: BLUR }}
        />
        {/* Device edge — top + sides only, faded out with the same band so
            it never terminates on a hard line. */}
        <div
          className={`pointer-events-none absolute inset-0 border border-b-0 border-black/12 dark:border-white/15 ${radius}`}
          style={{ maskImage: FADE, WebkitMaskImage: FADE }}
        />
      </div>
    </div>
  );
}

/**
 * Like PhoneMockup but shows the *whole* capture — no bottom crop, no fade, no
 * blur. The frame matches each capture's true aspect (mobile 393×852, desktop
 * iPad 1668×2388) so the image fills it exactly with nothing cut off, and the
 * device edge runs all the way around.
 */
function StaticPhoneMockup({
  src,
  srcDesktop,
  alt,
}: {
  src: string;
  /** Wider capture (e.g. iPad) shown at the desktop breakpoint when provided. */
  srcDesktop?: string;
  alt: string;
}) {
  const isDesktop = useIsDesktop();
  const useWide = isDesktop && !!srcDesktop;
  const radius = useWide ? "rounded-[28px]" : "rounded-[44px]";
  const frame = useWide
    ? "max-w-[440px] aspect-[1668/2388]"
    : "max-w-[300px] aspect-[393/852]";
  return (
    <div className="flex justify-center">
      <div className={`relative w-full overflow-hidden ${frame} ${radius}`}>
        <ImageWithFallback
          src={useWide ? (srcDesktop as string) : src}
          alt={alt}
          sizes={useWide ? "440px" : "(max-width: 768px) 90vw, 300px"}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div
          className={`pointer-events-none absolute inset-0 border border-black/12 dark:border-white/15 ${radius}`}
        />
      </div>
    </div>
  );
}

/**
 * A single capture framed as the top of a phone (rounded top, border on the
 * top + sides) with the lower portion dissolving out — the same treatment as
 * the leaderboard, but the dissolve is placed at a deliberate content break so
 * everything above stays crisp and the rest melts into the panel. One image is
 * used at every breakpoint (no separate desktop crop).
 *
 * `dividerFrac` is the image-height fraction (0–1) where the dissolve begins —
 * e.g. the divider above the Library's "Trainings" row, or the gap between two
 * lead cards. The frame is cropped just past it so the fade completes at the
 * frame's foot.
 */
function CutoffPhoneMockup({
  src,
  alt,
  dividerFrac,
}: {
  src: string;
  alt: string;
  dividerFrac: number;
}) {
  // Width of the dissolve, as a fraction of image height. The frame is cropped
  // at dividerFrac + BAND so the fade runs out exactly at the frame's foot;
  // mask percentages are relative to that cropped frame.
  const BAND = 0.113;
  const crop = dividerFrac + BAND;
  const startPct = (dividerFrac / crop) * 100;
  const FADE = easedMask(startPct, 100);
  const BLUR = easedMask(startPct - 7, 98, true);
  return (
    <div className="flex justify-center">
      <div
        className="relative w-full max-w-[300px] overflow-hidden rounded-t-[40px]"
        style={{ aspectRatio: `393 / ${Math.round(852 * crop)}` }}
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          sizes="(max-width: 768px) 90vw, 300px"
          className="absolute inset-0 h-full w-full object-cover object-top"
          style={{ maskImage: FADE, WebkitMaskImage: FADE }}
        />
        {/* Progressive blur strengthening toward the bottom edge */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 backdrop-blur-[5px]"
          style={{ maskImage: BLUR, WebkitMaskImage: BLUR }}
        />
        {/* Device edge — top + sides only, faded out with the same band. */}
        <div
          className="pointer-events-none absolute inset-0 rounded-t-[40px] border border-b-0 border-black/12 dark:border-white/15"
          style={{ maskImage: FADE, WebkitMaskImage: FADE }}
        />
      </div>
    </div>
  );
}

function ModuleRail({
  active,
  onChange,
}: {
  active: ModuleId;
  onChange: (id: ModuleId) => void;
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
          ? "text-black dark:text-white"
          : "text-black/40 group-hover:text-black/65 dark:text-white/40 dark:group-hover:text-white/65";
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
            {/* Active indicator bar on the left edge. Transition only the two
                properties that actually change (height + color) — `transition-all`
                also animates any sub-pixel reflow, which can flash on re-render. */}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full transition-[height,background-color] duration-300 ${
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
  isFirst,
  skipAnim,
}: {
  feature: Feature;
  isOpen: boolean;
  onToggle: () => void;
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
      className={`scroll-mt-24 lg:scroll-mt-28 ${
        isFirst
          ? ""
          : "border-t border-black/8 dark:border-white/8"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group w-full text-left flex items-center justify-between gap-6 py-5 md:py-6 transition-colors hover:text-black dark:hover:text-white"
      >
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <h3
            className={`font-ivyora font-medium text-[24px] sm:text-[30px] md:text-[36px] leading-[1.05] tracking-[-0.5px] transition-colors ${
              isOpen
                ? "text-[#19ad7d]"
                : "text-black dark:text-white"
            }`}
          >
            {feature.title}
          </h3>
          <p
            className="font-inter text-[13px] sm:text-[14px] leading-snug line-clamp-1 transition-colors text-black/55 dark:text-white/55"
          >
            {feature.desc}
          </p>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-colors ${
            isOpen
              ? "border-[#19ad7d] text-[#19ad7d]"
              : "border-black/15 text-black/60 group-hover:border-black/35 group-hover:text-black dark:border-white/15 dark:text-white/55 dark:group-hover:border-white/35 dark:group-hover:text-white"
          }`}
          aria-hidden
        >
          <ChevronDown size={18} strokeWidth={2} />
        </motion.span>
      </button>

      {/* No AnimatePresence: closing unmounts the content synchronously (an
          instant collapse), so the row above a tapped feature reflows in a
          single step that handleToggle compensates before paint — keeping the
          tapped title exactly put. Opening still animates height (expand down). */}
      {isOpen && (
        <motion.div
          key="content"
          initial={skipAnim ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={
            skipAnim
              ? { duration: 0 }
              : { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          }
          className="overflow-hidden"
        >
            <div className="pb-6 md:pb-8 flex flex-col gap-5 md:gap-6">
              <p
                className="font-inter text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed max-w-[680px] text-black/75 dark:text-white/75"
              >
                {feature.body}
              </p>

              <ul className="flex flex-col gap-2.5 max-w-[680px]">
                {feature.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 font-inter text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black/70 dark:text-white/70"
                  >
                    <span
                      className="mt-[9px] shrink-0 w-1.5 h-1.5 rounded-full bg-[#19ad7d]"
                      aria-hidden
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {feature.mockup === "ai-loop" ? (
                <AiSessionMockup />
              ) : feature.mockup === "profile-toggle" ? (
                <ProfileMockup />
              ) : feature.mockup === "competitions-loop" ? (
                <CompetitionsMockup />
              ) : feature.mockup === "browser" ? (
                <RecruitFormMockup />
              ) : feature.mockup === "canvassing-loop" ? (
                <CanvassingMockup />
              ) : feature.mockup === "goals-collage" ? (
                <GoalsMockup />
              ) : feature.mockup === "phone-full" ? (
                <StaticPhoneMockup
                  src={feature.image ?? ""}
                  srcDesktop={feature.imageDesktop}
                  alt={feature.title}
                />
              ) : feature.mockup === "phone-cutoff" ? (
                <CutoffPhoneMockup
                  src={feature.image ?? ""}
                  alt={feature.title}
                  dividerFrac={feature.cutoffFrac ?? 0.767}
                />
              ) : feature.mockup === "phone" ? (
                <PhoneMockup
                  src={feature.image ?? ""}
                  srcDesktop={feature.imageDesktop}
                  alt={feature.title}
                />
              ) : (
                <div
                  className="relative w-full aspect-[16/10] rounded-[20px] md:rounded-[28px] overflow-hidden border border-black/8 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.20)] dark:border-white/8 dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]"
                >
                  <ImageWithFallback
                    src={feature.image}
                    alt={feature.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
        </motion.div>
      )}
    </div>
  );
}

/**
 * Read a deep-link target from the URL hash (e.g. `/system#leaderboards`).
 * Client-only: the server has no hash, so SSR / first paint falls back to the
 * default feature. Used to open the linked feature on the very first render so
 * the page never briefly shows the default (Enzy AI) before switching.
 */
function readHashTarget(): { module: ModuleId; id: string } | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "").toLowerCase();
  if (!hash) return null;
  const match = FEATURES_DATA.find((f) => f.id === hash);
  return match ? { module: match.module, id: match.id } : null;
}

function FeatureBrowser() {
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
    // Reset the reading position to the top of the page so the new module
    // opens from its start. Without this, switching modules while scrolled
    // deep into the previous one leaves the viewport mid-page with the first
    // feature expanded but its title hidden above the fixed nav. Instant (not
    // smooth) on purpose: a smooth scroll gets cancelled by scroll-anchoring
    // when the panel swaps height during the module transition, and it runs
    // synchronously here before the re-render so it reliably sticks.
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  // Toggle a feature, keeping the tapped title at the exact viewport position
  // it was clicked. Opening collapses whichever feature was open and expands
  // this one downward; if the collapsing row sat above, the title would drift
  // up as the page reflows. Because the collapse is synchronous (the content
  // unmounts immediately — no exit animation), the reflow happens in a single
  // step: we record the title's position here, then restore it in the
  // useLayoutEffect below, before the browser paints. No drift, no bounce.
  const pendingAnchorRef = useRef<{ id: string; top: number } | null>(null);
  const handleToggle = (id: string) => {
    const node = document.getElementById(id);
    pendingAnchorRef.current = node
      ? { id, top: node.getBoundingClientRect().top }
      : null;
    setOpenId((prev) => (prev === id ? null : id));
  };
  useLayoutEffect(() => {
    const pending = pendingAnchorRef.current;
    pendingAnchorRef.current = null;
    if (!pending) return;
    const node = document.getElementById(pending.id);
    if (!node) return;
    const delta = node.getBoundingClientRect().top - pending.top;
    if (delta !== 0) window.scrollBy(0, delta);
  }, [openId]);

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
      // Match the row's `scroll-mt-24 lg:scroll-mt-28` so the title clears the
      // fixed header. The header grows at the desktop line (logo `h-6 lg:h-9`),
      // so the offset switches there too — touch (phone + tablet) uses 96.
      const headerOffset = window.matchMedia(MEDIA.desktop).matches
        ? 112
        : 96;
      const top =
        window.scrollY + node.getBoundingClientRect().top - headerOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior: "auto" });
    };

    // Snap synchronously, before the browser paints, so the page lands on the
    // target feature in a single frame (no visible jump from the default).
    scrollToHeader();

    // Re-assert across a few ticks: these override the browser's own
    // (offset-unaware) fragment scroll, which can fire late (e.g. after images
    // decode) and would otherwise leave the feature title pushed above the
    // viewport. The flag clears on the last tick so the re-render (and this
    // effect's cleanup) can't cancel the pending scroll timers early.
    const timers: number[] = [];
    [60, 160, 320, 500].forEach((ms, i, arr) => {
      timers.push(
        window.setTimeout(() => {
          scrollToHeader();
          if (i === arr.length - 1) setPendingDeepLinkId(null);
        }, ms)
      );
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [pendingDeepLinkId]);

  // Hash deep-linking: /system#leaderboards opens the matching feature and
  // scrolls it to just below the header. Runs in a layout effect (before paint).
  useLayoutEffect(() => {
    const applyHash = () => {
      const target = readHashTarget();
      if (!target) return;
      setActiveModule(target.module);
      setOpenId(target.id);
      setPendingDeepLinkId(target.id);
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
        <div className="enzy-hero-reveal flex flex-col items-center text-center mb-12 md:mb-16">
          <h1
            className="font-ivyora font-medium text-[40px] sm:text-[50px] md:text-[64px] leading-[1.05] tracking-[-2px] max-w-4xl text-black dark:text-[#f5f7fa]"
          >
            <BlurReveal as="span" delay={0.1}>
              Every layer your team{" "}
            </BlurReveal>
            <BlurReveal as="span" delay={0.61} className="italic">
              runs on.
            </BlurReveal>
          </h1>
        </div>

        {/* Two-column: compact module rail (left) + wide feature panel (right) */}
        <div className="flex items-start gap-3 sm:gap-4 md:gap-6">
          {/* Left rail — kept narrow so features take most of the width */}
          <div className="shrink-0 w-[48px] sm:w-[112px] md:w-[132px] sticky top-24 md:top-28">
            <ModuleRail
              active={activeModule}
              onChange={handleModuleChange}
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
                className="relative rounded-[28px] md:rounded-[36px] border overflow-hidden bg-white/70 border-black/8 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.16)] dark:bg-[#0b0f14]/70 dark:border-white/8 dark:shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)]"
              >
                {/* Module header row */}
                <div
                  className="px-6 md:px-10 py-6 md:py-7 border-b border-black/8 dark:border-white/8 bg-black/[0.015] dark:bg-white/[0.015]"
                >
                  <div className="flex flex-col gap-1.5">
                    <span
                      className="font-inter text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.2em] text-[#19ad7d]"
                    >
                      Module
                    </span>
                    <span
                      className="font-ivyora text-[30px] md:text-[40px] font-medium tracking-[-0.6px] leading-[1.02] text-black dark:text-white"
                    >
                      {activeModuleDef?.label}
                    </span>
                    <span
                      className="font-inter text-[13px] md:text-[14px] mt-0.5 text-black/55 dark:text-white/55"
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
                      onToggle={() => handleToggle(feature.id)}
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

export function System() {
  return <FeatureBrowser />;
}
