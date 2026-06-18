"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DoorOpen, Headset, ArrowRight } from "lucide-react";
import { BlurReveal } from "./components/BlurReveal";
import { CTAButton } from "./components/CTAButton";
import { BOOK_DEMO_HREF, BOOK_DEMO_CTA_STYLE } from "./lib/booking";
import { FIELD_SALES_INDUSTRIES, VIRTUAL_SALES_INDUSTRIES } from "./lib/industries";

type SalesMode = "field" | "virtual";

// Per-industry detail layered on top of the canonical name lists in
// lib/industries.ts. Keyed by the exact industry name so the membership/order
// stays owned by that single source of truth (used by Affiliate + FAQ too);
// this map only adds the page-specific copy the Solutions page needs.
//
//  - kpis:  the metrics that industry actually says on the floor. This is the
//           specificity lever — Enzy ranks *their* numbers, not generic "deals".
//  - board: one line on what the leaderboard does, in their language.
//  - logos: real Enzy customers in that space (from /public/logos). Omit when
//           we don't have a named customer to show — never invent one.
type IndustryDetail = {
  kpis: string[];
  board: string;
  logos?: { name: string; src: string }[];
};

const L = {
  spartan: { name: "Spartan Solar", src: "/logos/spartan-solar.svg" },
  nusun: { name: "Nusun Power", src: "/logos/nusun.svg" },
  spwr: { name: "SPWR", src: "/logos/spwr.svg" },
  grit: { name: "The Grit", src: "/logos/grit.svg" },
  aptive: { name: "Aptive", src: "/logos/aptive.svg" },
  moxie: { name: "Moxie", src: "/logos/moxie.svg" },
  greenix: { name: "Greenix", src: "/logos/greenix.svg" },
  fox: { name: "Fox Pest Control", src: "/logos/fox.svg" },
  ecoshield: { name: "EcoShield", src: "/logos/ecoshield.svg" },
  quickRoofing: { name: "Quick Roofing", src: "/logos/quick-roofing.svg" },
  chipr: { name: "Chipr", src: "/logos/chipr.svg" },
  youngLiving: { name: "Young Living", src: "/logos/young-living.svg" },
  space: { name: "SPACE Real Estate", src: "/logos/space.svg" },
};

const INDUSTRY_DETAIL: Record<string, IndustryDetail> = {
  // ---- Field ----
  Solar: {
    kpis: ["Doors knocked", "Sits set", "Sits sat", "Close %", "Self-gen vs company", "Installs / clawback"],
    board: "Reps ranked by sits sat and net installs — not just signed deals that fall out before PTO.",
    logos: [L.spartan, L.nusun, L.spwr],
  },
  "Pest Control": {
    kpis: ["Doors", "Contacts", "Accounts sold", "Recurring %", "Reload rate", "Retention"],
    board: "Rank the funnel from doors to recurring accounts, so the board rewards what actually compounds.",
    logos: [L.aptive, L.moxie, L.greenix, L.fox, L.ecoshield, L.grit],
  },
  Roofing: {
    kpis: ["Inspections", "Claims filed", "Claims approved", "Jobs signed", "Avg job size"],
    board: "Track inspections through approved claims to signed jobs — the whole storm-to-roof pipeline, live.",
    logos: [L.quickRoofing],
  },
  Windows: {
    kpis: ["Appointments", "Demos sat", "Close %", "Avg ticket", "Units sold"],
    board: "Rank demos sat and close rate so reps compete on the activity that drives revenue, not luck.",
  },
  HVAC: {
    kpis: ["Appointments", "Demos", "Close %", "Avg ticket", "Add-ons"],
    board: "Surface demo-to-close and average ticket so managers coach the gap between activity and revenue.",
  },
  "Telecom & Fiber": {
    kpis: ["Doors", "Connects", "Installs", "Taps passed", "Churn saves"],
    board: "Rank connects and completed installs across every door-knocking crew on one live board.",
    logos: [L.chipr],
  },
  "Residential Real Estate": {
    kpis: ["Conversations", "Appointments", "Listings taken", "Buyer agreements", "Closings"],
    board: "Track conversations to closings so agents see the activity behind every commission.",
    logos: [L.space],
  },
  "Network Marketing": {
    kpis: ["New recruits", "Personally enrolled", "Rank advancements", "Team volume", "Active legs"],
    board: "Recognition that scales across thousands of distributors — rank advancements broadcast company-wide.",
    logos: [L.youngLiving],
  },
  "Home Security": {
    kpis: ["Doors", "Installs", "RMR added", "Cancels saved", "Upgrades"],
    board: "Rank installs and recurring revenue added, so the board tracks the number that funds the business.",
  },
  "Permanent Lighting": {
    kpis: ["Appointments", "Demos", "Jobs signed", "Avg install", "Referrals"],
    board: "Rank demos to signed installs and keep referral momentum visible across every crew.",
  },
  "Medical Devices": {
    kpis: ["Calls", "Demos", "Evaluations", "Units placed", "Reorders"],
    board: "Track field activity from calls to placed units, so reps and managers see the pipeline between visits.",
  },
  Automotive: {
    kpis: ["Ups", "Test drives", "Units sold", "Gross per unit", "CSI"],
    board: "Rank the floor from ups to units sold and gross — live, the way a high-energy showroom should run.",
  },
  // ---- Virtual ----
  "Life Insurance": {
    kpis: ["Dials", "Talk time", "Quotes", "Apps written", "AP written", "Persistency"],
    board: "Rank dials, AP written, and persistency on a live wallboard — the floor energy, on every remote screen.",
  },
  "Health Insurance": {
    kpis: ["Dials", "Contacts", "Quotes", "Apps submitted", "Effectuated", "Retention"],
    board: "Rank effectuated policies, not just submissions — the board rewards business that sticks.",
  },
  "Wholesale Real Estate": {
    kpis: ["Dials", "Conversations", "Offers made", "Contracts", "Assignments"],
    board: "Rank dials through assignments so acquisition reps compete on the pace that fills the pipeline.",
  },
  Consulting: {
    kpis: ["Calls booked", "Show rate", "Pitches", "Close %", "Cash collected"],
    board: "Rank show rate and cash collected so closers compete on the metrics that pay the business.",
  },
  "Information Product": {
    kpis: ["Calls booked", "Show rate", "Close %", "Cash collected", "Stick rate"],
    board: "Rank close rate and cash collected in real time, recreating the sales-floor pace for a remote team.",
  },
};

type ModeContent = {
  label: string;
  descriptor: string;
  hookLead: string;
  hookItalic: string;
  hookSub: string;
  funnel: { stage: string; enzy: string; tag: string }[];
  rituals: { title: string; desc: string }[];
  industries: string[];
  proof: {
    stat: string;
    statLabel: string;
    statSub: string;
    quote?: { text: string; name: string; role: string; avatar?: string };
    showLogos: boolean;
  };
};

const MODE_CONTENT: Record<SalesMode, ModeContent> = {
  field: {
    label: "Field Sales",
    descriptor: "Door-to-door & in-person teams",
    hookLead: "A team you can't see is a team you can't ",
    hookItalic: "coach.",
    hookSub:
      "The moment a rep leaves the office, most software goes dark. Enzy keeps your distributed crews visible, ranked, and moving — turning every door, sit, and close into a live score, a competition, and a signal a manager can act on today.",
    funnel: [
      {
        stage: "Knock",
        tag: "Visibility",
        enzy: "Every door logged and ranked live. The whole team sees who's working — no status texts required.",
      },
      {
        stage: "Sit",
        tag: "Motivation",
        enzy: "Sits fire competitions and recognition that pull the team forward instead of letting Monday's energy fade by Wednesday.",
      },
      {
        stage: "Close",
        tag: "Manager action",
        enzy: "When a rep goes cold, the manager knows today — not at the end-of-month review when it's too late to coach.",
      },
    ],
    rituals: [
      {
        title: "Office vs. office",
        desc: "Regional and office leaderboards turn scattered crews into one scoreboard. Distributed teams compete like they're in the same room.",
      },
      {
        title: "Recognition that travels",
        desc: "A big close broadcasts to the whole company the second it lands — the bullpen roar reps lose in the field, rebuilt on their phone.",
      },
    ],
    industries: FIELD_SALES_INDUSTRIES,
    proof: {
      stat: "21%",
      statLabel: "Increase in sales per rep after adopting Enzy",
      statSub: "Across 95,867 sales reps, controlling for company size, growth trajectory, and industry trends.",
      quote: {
        text: "Before Enzy, we were reacting to results. Now we're anticipating them. It turned data into decision velocity, visibility into alignment, and motivation into momentum.",
        name: "Ashleigh Pepper",
        role: "CEO, Kaizen Promittere",
        avatar: "/testimonials/ashleigh-pepper-2.jpg",
      },
      showLogos: true,
    },
  },
  virtual: {
    label: "Virtual Sales",
    descriptor: "Remote, inside & high-volume teams",
    hookLead: "Remote killed the sales floor. Enzy puts it back on every ",
    hookItalic: "screen.",
    hookSub:
      "High-volume virtual teams live and die by pace. Enzy turns every dial, conversation, and close into a real-time wallboard, a competition, and a coaching signal — so a remote team runs with the energy and accountability of a packed sales floor.",
    funnel: [
      {
        stage: "Dial",
        tag: "Visibility",
        enzy: "Every dial on a live wallboard. The floor energy of a bullpen, rendered on every remote rep's screen.",
      },
      {
        stage: "Talk",
        tag: "Motivation",
        enzy: "Talk-time and conversion ranked in real time, with pace-setting competitions that keep the shift moving all day.",
      },
      {
        stage: "Close",
        tag: "Manager action",
        enzy: "When conversion dips mid-shift, the manager coaches now — not at next week's 1:1 when the leads are already cold.",
      },
    ],
    rituals: [
      {
        title: "Live wallboard",
        desc: "Real-time ranking that recreates the bullpen on every screen. Remote reps feel the floor move beneath them.",
      },
      {
        title: "Power hours",
        desc: "Timed dial and close competitions that set the pace of the shift and spike activity exactly when it matters.",
      },
    ],
    industries: VIRTUAL_SALES_INDUSTRIES,
    proof: {
      stat: "21%",
      statLabel: "Increase in sales per rep after adopting Enzy",
      statSub: "Across 95,867 sales reps, controlling for company size, growth trajectory, and industry trends.",
      showLogos: false,
    },
  },
};

const GREEN = "#19ad7d";

function ModeSection({ content }: { content: ModeContent }) {
  // ModeSection is keyed by mode (`<ModeSection key={mode}>`), so it remounts on
  // every field/virtual switch — this initializer already picks up the right
  // default industry. Don't add a reset effect keyed on `content`: its object
  // identity churns under dev Fast Refresh and would snap the selection back to
  // the first industry on every chip click.
  const [activeIndustry, setActiveIndustry] = useState(content.industries[0]);

  const detail = INDUSTRY_DETAIL[activeIndustry];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex flex-col items-center"
    >
      {/* 1. The hook — identity challenge first */}
      <div className="w-full max-w-4xl mx-auto text-center mt-16 lg:mt-24">
        <h2 className="font-ivyora font-medium text-[26px] sm:text-[32px] md:text-[40px] leading-[1.12] tracking-[-1px] text-black dark:text-white">
          {content.hookLead}
          <span className="italic" style={{ color: GREEN }}>
            {content.hookItalic}
          </span>
        </h2>
        <p className="font-inter text-[15px] md:text-[17px] leading-relaxed mt-6 max-w-[680px] mx-auto text-black/60 dark:text-white/60">
          {content.hookSub}
        </p>
      </div>

      {/* 2. The funnel → the Enzy Loop on this motion */}
      <div className="w-full mt-16 lg:mt-24">
        <div className="font-inter text-[11px] font-bold uppercase tracking-[0.25em] text-center mb-8 text-black/40 dark:text-white/40">
          Every stage becomes a score
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {content.funnel.map((f, i) => (
            <div
              key={f.stage}
              className="relative liquid-glass rounded-[28px] p-6 lg:p-8 flex flex-col gap-4 ring-1 ring-black/5 dark:ring-white/5"
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-ivyora text-3xl lg:text-4xl tracking-tight text-black dark:text-white"
                >
                  {f.stage}
                </span>
                <span className="font-inter text-[20px] font-black tabular-nums text-black/15 dark:text-white/15">
                  0{i + 1}
                </span>
              </div>
              <span
                className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] w-fit px-2.5 py-1 rounded-full"
                style={{ color: GREEN, background: `${GREEN}1a` }}
              >
                {f.tag}
              </span>
              <p className="font-inter text-[14px] lg:text-[15px] leading-relaxed text-black/75 dark:text-white/75">
                {f.enzy}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Industry selector → native KPIs + real customers */}
      <div className="w-full mt-20 lg:mt-28">
        <div className="text-center max-w-2xl mx-auto">
          <div className="font-inter text-[11px] font-bold uppercase tracking-[0.25em] mb-4 text-black/40 dark:text-white/40">
            Your numbers, on the board
          </div>
          <h3 className="font-ivyora font-medium text-[26px] md:text-[34px] leading-tight tracking-tight text-black dark:text-white">
            Enzy speaks your industry&apos;s language.
          </h3>
        </div>

        {/* Industry chips */}
        <div className="flex flex-row flex-wrap justify-center gap-2.5 mt-8 max-w-4xl mx-auto">
          {content.industries.map((name) => {
            const isActive = name === activeIndustry;
            return (
              <button
                key={name}
                onClick={() => setActiveIndustry(name)}
                className={`font-inter text-[13px] md:text-[14px] font-semibold px-4 py-2 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "text-white border-transparent"
                    : "border-black/15 text-black/60 hover:text-black hover:border-black/30 dark:border-white/15 dark:text-white/60 dark:hover:text-white dark:hover:border-white/30"
                }`}
                style={isActive ? { background: GREEN } : undefined}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Active industry detail. A plain keyed motion.div (no AnimatePresence
            mode="wait") so changing industry re-mounts and fades the new panel
            in immediately — mode="wait" could stall on a stuck exit and freeze
            the panel on the previously selected industry. */}
          <motion.div
            key={activeIndustry}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-10 w-full max-w-4xl mx-auto liquid-glass rounded-[32px] p-8 lg:p-10 ring-1 ring-black/5 dark:ring-white/5"
          >
            <div className="flex flex-col gap-8">
              <div>
                <div
                  className="font-inter text-[10px] font-bold uppercase tracking-[0.25em] mb-4"
                  style={{ color: GREEN }}
                >
                  What other {activeIndustry} teams compete on in Enzy
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {detail?.kpis.map((kpi) => (
                    <span
                      key={kpi}
                      className="font-inter text-[13px] md:text-[14px] font-medium px-3.5 py-2 rounded-xl bg-black/[0.04] text-black/80 dark:bg-white/[0.06] dark:text-white/80"
                    >
                      {kpi}
                    </span>
                  ))}
                </div>
              </div>

              <p className="font-inter text-[15px] md:text-[17px] leading-relaxed text-black/75 dark:text-white/75 border-t border-black/10 dark:border-white/10 pt-8">
                {detail?.board}
              </p>

              {detail?.logos && detail.logos.length > 0 ? (
                <div className="border-t border-black/10 dark:border-white/10 pt-8">
                  <div className="font-inter text-[10px] font-bold uppercase tracking-[0.2em] mb-5 text-black/40 dark:text-white/40">
                    Trusted by {activeIndustry} teams
                  </div>
                  <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                    {detail.logos.map((logo) => (
                      // Plain <img>: these SVGs scale by height with auto width.
                      // ImageWithFallback would fall back to next/image fill mode
                      // (no numeric width/height) and blow up to fill the card.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={logo.src}
                        src={logo.src}
                        alt={logo.name}
                        className="h-6 md:h-7 w-auto object-contain opacity-60 brightness-0 dark:opacity-90 dark:invert"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
      </div>

      {/* 4. Rituals — competitions & recognition */}
      <div className="w-full mt-20 lg:mt-28 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {content.rituals.map((r) => (
            <div
              key={r.title}
              className="rounded-[28px] p-7 lg:p-8 border border-black/10 dark:border-white/10"
            >
              <h4 className="font-ivyora text-2xl lg:text-3xl tracking-tight mb-3 text-black dark:text-white">
                {r.title}
              </h4>
              <p className="font-inter text-[14px] lg:text-[15px] leading-relaxed text-black/70 dark:text-white/70">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Proof */}
      <div className="w-full mt-20 lg:mt-28 max-w-4xl mx-auto flex flex-col items-center text-center">
        <p className="font-inter text-[12px] tracking-[0.2em] uppercase font-bold mb-6" style={{ color: GREEN }}>
          The Enzy Effect
        </p>
        <p className="font-ivyora font-medium leading-[0.85] tabular-nums text-[110px] sm:text-[150px] md:text-[190px] text-black dark:text-white">
          {content.proof.stat.replace("%", "")}
          <span style={{ color: GREEN }}>%</span>
        </p>
        <p className="font-inter text-[20px] md:text-[26px] font-bold mt-4 tracking-tight text-black dark:text-white">
          {content.proof.statLabel}
        </p>
        <p className="font-inter text-[14px] md:text-[15px] leading-relaxed mt-3 max-w-[560px] text-black/50 dark:text-white/50">
          {content.proof.statSub}
        </p>

        {content.proof.quote ? (
          <div className="mt-14 w-full liquid-glass relative rounded-[32px] p-8 md:p-10 text-left ring-1 ring-[#19ad7d]/20 dark:ring-[#19ad7d]/25">
            <blockquote className="m-0">
              <p className="font-ivyora italic text-[22px] md:text-[30px] leading-[1.3] tracking-[-0.5px] text-black dark:text-white">
                {content.proof.quote.text}
              </p>
            </blockquote>
            <footer className="flex items-center gap-4 mt-8 pt-6 border-t border-black/10 dark:border-white/10">
              {content.proof.quote.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={content.proof.quote.avatar}
                  alt={content.proof.quote.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : null}
              <p className="font-inter text-[15px] md:text-[17px] font-semibold tracking-tight m-0 text-black dark:text-white">
                {content.proof.quote.name}
                <span className="text-black/50 dark:text-white/50">, {content.proof.quote.role}</span>
              </p>
            </footer>
          </div>
        ) : null}
      </div>

      {/* 6. CTA — width matched to the About page closing card (max-w-6xl rail w/ px-8) */}
      <div className="w-full mt-20 lg:mt-28 max-w-6xl mx-auto px-5 sm:px-6 md:px-8">
        <div
          className="relative rounded-[32px] p-10 md:p-14 text-center flex flex-col items-center overflow-hidden liquid-glass border-[#19ad7d]/20 dark:border-[#19ad7d]/30 bg-[#19ad7d]/5 dark:bg-[linear-gradient(189.6deg,rgba(25,173,125,0.15)_25.1%,rgba(20,144,103,0.05)_64.2%)]"
        >
          <h3
            className="relative z-10 font-ivyora font-medium tracking-[-2px] leading-[1.05] text-3xl md:text-5xl max-w-2xl text-black dark:text-white"
          >
            Culture isn&rsquo;t a vibe. It&rsquo;s a system you can run.
          </h3>
          <div className="relative z-10 mt-9">
            <CTAButton
              href={BOOK_DEMO_HREF}
              variant="primary"
              className={`book-demo-cta-marker px-8 py-4 gap-3 text-[15px] ${BOOK_DEMO_CTA_STYLE}`}
            >
              Book a Demo <ArrowRight size={18} strokeWidth={2.25} aria-hidden />
            </CTAButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Solutions() {
  const [mode, setMode] = useState<SalesMode>("field");
  const content = MODE_CONTENT[mode];

  // Deep-link support: the nav's Solutions submenu links to
  // /solutions#for-field-sales and /solutions#for-virtual-sales, so open on
  // the matching tab. Runs on mount (cross-page navigation) and on
  // `hashchange` (same-page navigation dispatches it via navigateToSamePageHash).
  React.useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "").toLowerCase();
      if (hash.includes("virtual")) setMode("virtual");
      else if (hash.includes("field")) setMode("field");
      else return;
      window.scrollTo(0, 0);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <section className="relative w-full min-h-[800px] bg-transparent pb-32">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-7 md:pt-10 flex flex-col items-center">
        {/* Header */}
        <motion.div className="enzy-hero-reveal flex flex-col items-center relative z-10 shrink-0 w-full">
          <h1 className="font-ivyora font-medium text-[40px] sm:text-[50px] md:text-[64px] leading-[1.05] tracking-[-2px] text-center max-w-4xl text-black dark:text-[#f5f7fa]">
            <BlurReveal as="span" delay={0.1}>
              Built for how your team{" "}
            </BlurReveal>
            <BlurReveal as="span" delay={0.64} className="italic">
              sells.
            </BlurReveal>
          </h1>

          {/* Mode toggle — a segmented control with a sliding indicator so it
              reads as one switch with two states, not two separate links. */}
          <div className="flex flex-col items-center gap-3 mt-8 lg:mt-12">
            <div
              role="tablist"
              aria-label="Choose a sales motion"
              className="relative inline-flex items-center gap-1 p-1.5 rounded-full border border-black/10 bg-white/50 backdrop-blur-md dark:border-white/10 dark:bg-white/5"
            >
              {(["field", "virtual"] as SalesMode[]).map((id) => {
                const isActive = mode === id;
                const Icon = id === "field" ? DoorOpen : Headset;
                return (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setMode(id)}
                    className={`relative inline-flex items-center gap-2 rounded-full px-5 md:px-7 py-2.5 transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "text-white"
                        : "text-black/55 hover:text-black/80 dark:text-white/55 dark:hover:text-white/80"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="mode-toggle-pill"
                        className="absolute inset-0 rounded-full shadow-sm"
                        style={{ background: GREEN }}
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    ) : null}
                    <Icon size={17} strokeWidth={2.25} className="relative z-10" />
                    <span className="relative z-10 font-inter font-bold uppercase text-[12px] md:text-[14px] tracking-widest">
                      {MODE_CONTENT[id].label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Clarifier — spells out who each motion is for. Plain keyed
                motion.p (no AnimatePresence mode="wait", which stalls mid-exit
                here and would freeze the text on the previous motion). */}
            <motion.p
              key={mode}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="font-inter text-[13px] md:text-[14px] text-black/50 dark:text-white/50"
            >
              {content.descriptor}
            </motion.p>
          </div>
        </motion.div>

        {/* Mode content */}
        <AnimatePresence mode="wait">
          <ModeSection key={mode} content={content} />
        </AnimatePresence>
      </div>
    </section>
  );
}
