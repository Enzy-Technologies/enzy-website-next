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
  // reality: the pre-Enzy status quo in this vertical's own words — the pain
  //          hook that opens the panel. The core verticals are sourced from the
  //          ICP reports; the rest are inferred from how that vertical sells, to
  //          match the same theme. Optional + `board` fallback kept so a new
  //          industry can be added with just kpis/board and still render.
  // plays:   2-3 concrete, vertical-specific use cases, each laddered to a
  //          behavior change (the brand's inviolable rule). When present, these
  //          render in place of `board`. Keep them prospect-facing — never leak
  //          internal sales tactics, ARR, or named-competitor framing.
  reality?: string;
  plays?: { title: string; desc: string }[];
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
    reality:
      "Sits live in a spreadsheet, competitions run in a group text, and a deal that clawed back before PTO still sits on top of the board. The culture you're building outruns the tools you're building it with.",
    plays: [
      {
        title: "Rank net installs, not signed paper",
        desc: "A deal that falls out before PTO isn't revenue, so it shouldn't lead the board. Enzy ranks sits sat and installs that stick — reps chase the number that actually pays.",
      },
      {
        title: "Self-gen and company leads, side by side",
        desc: "Setters, closers, and self-closing reps each see exactly where they stand in real time — the visibility that turns a scattered 1099 floor into one live scoreboard.",
      },
      {
        title: "Recognition the second it lands",
        desc: "A record-breaking close broadcasts company-wide the instant it happens — the bullpen roar a door-to-door rep never gets to hear, rebuilt on their phone.",
      },
    ],
    logos: [L.spartan, L.nusun, L.spwr],
  },
  "Pest Control": {
    kpis: ["Doors", "Contacts", "Accounts sold", "Recurring %", "Reload rate", "Retention"],
    board: "Rank the funnel from doors to recurring accounts, so the board rewards what actually compounds.",
    reality:
      "Every summer the cracks show at the same time — mid-May, someone's pulling FieldRoutes data at 11pm, building a spreadsheet, and dropping it in a group chat that's stale 30 minutes later.",
    plays: [
      {
        title: "Cohort boards so May recruits still compete",
        desc: "A rep who started in May can never catch a March starter on a year-to-date board — so engagement dies right when the season peaks. Cohort leaderboards give every starting class a race it can win.",
      },
      {
        title: "Qualified vs. sold, counted honestly",
        desc: "Accounts past the rescission window and paid are the ones that count. Enzy scores qualified sales, not door talk, so competitions are built on numbers reps actually trust.",
      },
      {
        title: "Onboard 500 reps without the W-9 chaos",
        desc: "Recruiting season runs on paperwork, not closes. A guided onboarding flow auto-collects W-9s and tracks every recruit, so the reps who are solid for summer hit the doors ready on day one.",
      },
    ],
    logos: [L.aptive, L.moxie, L.greenix, L.fox, L.ecoshield, L.grit],
  },
  Roofing: {
    kpis: ["Inspections", "Claims filed", "Claims approved", "Jobs signed", "Avg job size"],
    board: "Track inspections through approved claims to signed jobs — the whole storm-to-roof pipeline, live.",
    reality:
      "Reps prove sales by posting contract photos to a group chat, acquired crews step on each other's leads, and the executives upstairs only care whether the reporting holds up.",
    plays: [
      {
        title: "Habits and Results on separate boards",
        desc: "Rank activity — doors, inspections — apart from outcomes — claims, signed jobs. Coach the rep whose swings are up but hits are flat, before the month is gone.",
      },
      {
        title: "Track the storm-to-roof pipeline",
        desc: "Contingency signed, claim filed, inspection set, approved, signed and filed — Enzy speaks the milestones AccuLynx leaves flat, the whole insurance pipeline live on one board.",
      },
      {
        title: "Reporting that survives the boardroom",
        desc: "When leadership wants ROI, not cool features, Enzy turns field activity into board-ready revenue visibility — and flags a flight-risk rep at 48 hours dark, not at the exit interview.",
      },
    ],
    logos: [L.quickRoofing],
  },
  Windows: {
    kpis: ["Appointments", "Demos sat", "Close %", "Avg ticket", "Units sold"],
    board: "Rank demos sat and close rate so reps compete on the activity that drives revenue, not luck.",
    reality:
      "You've tried more tools than any team should have to — and watched a bolt-on gamification app die because reps had to tap a link to a second app nobody ever opened.",
    plays: [
      {
        title: "One app, not a stack held together by links",
        desc: "Canvassing, leaderboards, competitions, and messaging in the same place reps already live. The friction that killed adoption on the last stack is simply gone.",
      },
      {
        title: "Reporting tight enough to trust",
        desc: "For a data-obsessed floor, a board that doesn't match the CRM is worthless. Enzy ties the leaderboard to your source of truth, so every number holds up to scrutiny.",
      },
      {
        title: "Fresh vs. follow-up, tracked apart",
        desc: "A window sale isn't won in one knock. Enzy separates fresh sets from follow-ups, and public accountability for the zeros keeps daily disciplines honest across the team.",
      },
    ],
  },
  HVAC: {
    kpis: ["Appointments", "Demos", "Close %", "Avg ticket", "Add-ons"],
    board: "Surface demo-to-close and average ticket so managers coach the gap between activity and revenue.",
    reality:
      "Leads get handed out by gut, sold demos and no-shows blur together in the CRM, and the comfort advisor quietly closing twice as much as everyone else stays invisible until the month closes.",
    plays: [
      {
        title: "Rank demo-to-close, not jobs booked",
        desc: "An install on the calendar isn't revenue until it sits. Enzy ranks demos sat and close rate, so comfort advisors compete on the conversion that actually drives the number.",
      },
      {
        title: "Make average ticket and add-ons visible",
        desc: "Two reps with the same close rate can be thousands apart on ticket. Put avg ticket and add-on attach on the board, and reps start selling the IAQ and membership upgrades they used to skip.",
      },
      {
        title: "Catch the slump before peak season",
        desc: "When the heat wave hits, a cold rep is revenue you can't get back. Enzy flags the advisor whose activity dipped this week, so a manager coaches now — not at the post-season review.",
      },
    ],
  },
  "Telecom & Fiber": {
    kpis: ["Doors", "Connects", "Installs", "Taps passed", "Churn saves"],
    board: "Rank connects and completed installs across every door-knocking crew on one live board.",
    reality:
      "You don't own the leads, the carrier can reclaim territory overnight, and the data lives in three to six ISP systems that don't talk to each other. It's a solo field job that's easy to treat like a job, not a sport.",
    plays: [
      {
        title: "Sold vs. paid, reconciled across every ISP",
        desc: "Sell 100 accounts, get paid on 80, and most dealers can't name the missing 20. Enzy tracks sold against paid across carriers, so the underpayment stops disappearing.",
      },
      {
        title: "A map that holds 750k pins",
        desc: "Apartment buildings and massive assigned territories break pin-per-address logic. Enzy manages MDUs and reassigns whole ZIP codes at scale — without crashing in the field.",
      },
      {
        title: "Turn a job culture into a sport culture",
        desc: "Reps working assigned turf in isolation need a reason to knock the next door. A live board and milestone alerts give the solo field rep the energy of a packed floor.",
      },
    ],
    logos: [L.chipr],
  },
  "Residential Real Estate": {
    kpis: ["Conversations", "Appointments", "Listings taken", "Buyer agreements", "Closings"],
    board: "Track conversations to closings so agents see the activity behind every commission.",
    reality:
      "Agent performance lives in a patchwork of Follow-Up Boss, Sisu, and a spreadsheet that buckled the day the lead count crossed six figures.",
    plays: [
      {
        title: "Put income on the board, on purpose",
        desc: "Radical transparency only works when the numbers are live and trusted. Enzy ranks conversations-to-closings, and GCI, on a public board that turns quiet effort into visible competition.",
      },
      {
        title: "Coach off real activity, not gut feel",
        desc: "See the agent making the calls but not setting appointments, and have the conversation while it still matters — the signal a monthly report buries.",
      },
      {
        title: "One source of truth, not five tabs",
        desc: "Conversations, appointments, listings, closings — unified in one view, so a brokerage with hundreds of agents across markets runs off a single scoreboard.",
      },
    ],
    logos: [L.space],
  },
  "Network Marketing": {
    kpis: ["New recruits", "Personally enrolled", "Rank advancements", "Team volume", "Active legs"],
    board: "Recognition that scales across thousands of distributors — rank advancements broadcast company-wide.",
    reality:
      "Recognition runs on screenshots and a contest tool that can't keep its data straight — and “show everyone on one leaderboard” breaks the moment one leader's organization passes 29,000 partners.",
    plays: [
      {
        title: "Rank advancement that broadcasts itself",
        desc: "Silver, Gold, Platinum — rank carries status and pay. Enzy turns every advancement into a company-wide moment of recognition, the social proof that pulls a whole downline forward.",
      },
      {
        title: "Competitions that scale past 29,000 partners",
        desc: "When the biggest downlines always win on raw volume, the contest dies for everyone else. Category segmentation, enrollment caps, and multi-tier brackets keep the race alive across the network.",
      },
      {
        title: "Score OGV and loyalty orders, not just sign-ups",
        desc: "Organizational group volume and recurring loyalty orders are how the business actually compounds — so those are the behaviors Enzy makes visible and rewards.",
      },
    ],
    logos: [L.youngLiving],
  },
  "Home Security": {
    kpis: ["Doors", "Installs", "RMR added", "Cancels saved", "Upgrades"],
    board: "Rank installs and recurring revenue added, so the board tracks the number that funds the business.",
    reality:
      "Summer reps knock all day, installs land in three different systems, and an account that cancels inside the trial window still sits on the board — so the leaderboard rewards activity that never becomes recurring revenue.",
    plays: [
      {
        title: "Rank RMR added, not just doors closed",
        desc: "A signed account that cancels before it funds isn't revenue. Enzy ranks recurring monthly revenue that sticks, so reps chase the accounts that survive the trial window — the number that funds the business.",
      },
      {
        title: "One board across every summer market",
        desc: "Crews scattered across cities all summer go dark between syncs. Enzy puts every install on one live leaderboard, so a distributed 1099 program competes like it's in one room.",
      },
      {
        title: "Recognize the save, not just the close",
        desc: "Attrition quietly erases a great season. Surface cancels and saves on the board, and the behavior that protects recurring revenue earns the same recognition as a fresh install.",
      },
    ],
  },
  "Permanent Lighting": {
    kpis: ["Appointments", "Demos", "Jobs signed", "Avg install", "Referrals"],
    board: "Rank demos to signed installs and keep referral momentum visible across every crew.",
    reality:
      "It's a demo-and-referral business run out of a group chat — a crew lights up one house on a street, and the reps three doors down never even know to knock it.",
    plays: [
      {
        title: "Rank demos to signed installs",
        desc: "A booked demo means nothing until the lights go up. Enzy ranks demos sat through signed installs, so reps compete on the in-home conversion that turns a curious neighbor into a job.",
      },
      {
        title: "Keep referral momentum on the board",
        desc: "Every install is a billboard and a referral engine. Put referrals generated next to closes, and reps work the street they just lit instead of driving to the next town for cold doors.",
      },
      {
        title: "Turn a finished job into the next one",
        desc: "A scattered crew can't see where the wins are clustering. Enzy maps signed jobs live, so the team blitzes the neighborhood while the demo is still glowing two doors down.",
      },
    ],
  },
  Automotive: {
    kpis: ["Ups", "Test drives", "Units sold", "Gross per unit", "CSI"],
    board: "Rank the floor from ups to units sold and gross — live, the way a high-energy showroom should run.",
    reality:
      "The showroom runs on a whiteboard that's accurate twice a day, ups get claimed and forgotten, and the closer carrying the floor on gross looks identical to everyone else until the month-end DMS report lands.",
    plays: [
      {
        title: "Rank the floor from ups to gross, live",
        desc: "Units sold hides who's actually profitable. Put gross per unit and units on one live board, and the floor competes on the deals that make money — not just the ones that move metal.",
      },
      {
        title: "Make every up count",
        desc: "An up that walks is traffic gone for good. Enzy logs ups and test drives in real time, so a manager sees the salesperson burning floor traffic and steps in before the day's leads are spent.",
      },
      {
        title: "Put CSI on the same board as sales",
        desc: "Gross without CSI costs you the next sale. Rank satisfaction next to units, and reps protect the score that drives repeat buyers and referrals instead of chasing only today's close.",
      },
    ],
  },
  // ---- Virtual ----
  "Life Insurance": {
    kpis: ["Dials", "Talk time", "Quotes", "Apps written", "AP written", "Persistency"],
    board: "Rank dials, AP written, and persistency on a live wallboard — the floor energy, on every remote screen.",
    reality:
      "Your floor lives in a group chat, and the day a leader stops posting daily winners by hand, the energy collapses and agents start asking where the board went.",
    plays: [
      {
        title: "A live wallboard for a remote floor",
        desc: "Remote agents compete in isolation. Enzy puts dials, AP written, and talk time on a real-time board — the bullpen energy of a packed floor, on every screen at home.",
      },
      {
        title: "Rank persistency, not just paper",
        desc: "AP that lapses isn't income. Enzy surfaces persistency alongside apps written, so the board rewards the business that sticks instead of the business that books and falls off.",
      },
      {
        title: "Automated recognition that compounds",
        desc: "“Held #1 for six weeks,” personal-best alerts, streaks — recognition fires on its own, so the dopamine of a win keeps reps dialing without a manager posting it by hand.",
      },
    ],
  },
  "Health Insurance": {
    kpis: ["Dials", "Contacts", "Quotes", "Apps submitted", "Effectuated", "Retention"],
    board: "Rank effectuated policies, not just submissions — the board rewards business that sticks.",
    reality:
      "Everything bends around AEP. If the platform isn't live and trusted before enrollment season opens, you've lost your one window — and the rest of the year a remote floor barely interacts at all.",
    plays: [
      {
        title: "Rank effectuated, not just submitted",
        desc: "A submitted app isn't a policy. Enzy scores effectuated and retained business, so competitions reward the enrollments that actually stick through the plan year.",
      },
      {
        title: "Built for the AEP sprint",
        desc: "Enrollment season is your summer — short, intense, decisive. Live boards and power-hour competitions set the pace of the shift exactly when every dial counts most.",
      },
      {
        title: "Community for a team that's never met",
        desc: "Distributed agents who've never shared a room suddenly compete, celebrate, and belong on one platform — recognition becomes the infrastructure a remote floor never had.",
      },
    ],
  },
  "Wholesale Real Estate": {
    kpis: ["Dials", "Conversations", "Offers made", "Contracts", "Assignments"],
    board: "Rank dials through assignments so acquisition reps compete on the pace that fills the pipeline.",
    reality:
      "Deal data scatters across a wall of GoHighLevel sub-accounts and a Slack thread, so a cold-calling acquisitions team can't see who's making the offers that actually turn into contracts.",
    plays: [
      {
        title: "Acquisition and disposition on their own boards",
        desc: "Two motions, two sets of metrics. Enzy tracks offers and contracts on acquisition separately from assignments on disposition — each team competing on what it controls.",
      },
      {
        title: "Drill into the offer, then coach",
        desc: "“20 offers, 2 contracts, $15k” means little if you can't see why. Enzy exposes the activity behind the number, so a coach can talk to a rep about where his offer prices are landing.",
      },
      {
        title: "One assignment pays for the year",
        desc: "In wholesaling a single assignment covers the cost many times over — so unifying dials, offers, and contracts into one live view is the easiest ROI math on the floor.",
      },
    ],
  },
  Consulting: {
    kpis: ["Calls booked", "Show rate", "Pitches", "Close %", "Cash collected"],
    board: "Rank show rate and cash collected so closers compete on the metrics that pay the business.",
    reality:
      "Setters book the calls, closers run them, and no one can see where the pipeline leaks — until cash collected comes in light at month-end and everyone points at the lead quality.",
    plays: [
      {
        title: "Rank cash collected, not calls booked",
        desc: "A booked call isn't revenue, and a closed deal isn't cash until it's paid. Enzy ranks show rate through cash collected, so closers compete on the metric that actually funds the business.",
      },
      {
        title: "Find the leak between setter and closer",
        desc: "When show rate slips, the whole pipeline starves. Put setter and closer metrics on one board, and a manager sees exactly where the handoff breaks instead of blaming the leads.",
      },
      {
        title: "A sales floor for a remote closing team",
        desc: "Closers working from home lose the energy of a room. Live boards and power-hour competitions rebuild the floor on every screen, so the team feels the pace whether it's one closer or twenty.",
      },
    ],
  },
  "Information Product": {
    kpis: ["Calls booked", "Show rate", "Close %", "Cash collected", "Stick rate"],
    board: "Rank close rate and cash collected in real time, recreating the sales-floor pace for a remote team.",
    reality:
      "High-ticket offers move fast on a remote floor, but refunds and chargebacks quietly eat the month — and a closer's “sold” number looks great until you see how much of it actually stuck.",
    plays: [
      {
        title: "Rank cash collected and stick rate",
        desc: "Volume that refunds isn't revenue. Enzy ranks close rate, cash collected, and stick rate together, so the board rewards the closers whose deals stay closed.",
      },
      {
        title: "Set the pace of the shift",
        desc: "A remote closing floor lives and dies on tempo. Real-time leaderboards and timed competitions spike activity exactly when the calendar is full — the bullpen energy a video call can't create on its own.",
      },
      {
        title: "Recognition the second a deal lands",
        desc: "Reps repeat what gets recognized. Enzy fires an instant win alert to the whole team when a closer cashes a deal, so momentum compounds across the floor instead of dying in a DM.",
      },
    ],
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
                    ? "text-white border-[#19ad7d] shadow-[0_6px_18px_rgba(25,173,125,0.30)]"
                    : "border-black/10 bg-white/90 backdrop-blur-md text-black/65 hover:text-black hover:border-black/20 dark:border-white/10 dark:bg-white/[0.18] dark:text-white/65 dark:hover:text-white dark:hover:border-white/25"
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
              {/* Reality — the pre-Enzy status quo in this vertical's own
                  language. Identity/pain hook before any benefit. Only the
                  ICP-sourced verticals have one. */}
              {detail?.reality ? (
                <div>
                  <div className="font-inter text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-black/40 dark:text-white/40">
                    Before Enzy
                  </div>
                  <p className="font-ivyora italic text-[19px] md:text-[24px] leading-[1.38] tracking-[-0.3px] text-black/85 dark:text-white/85">
                    {detail.reality}
                  </p>
                </div>
              ) : null}

              <div className={detail?.reality ? "border-t border-black/10 dark:border-white/10 pt-8" : undefined}>
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

              {/* How Enzy works for this vertical — concrete, vertical-specific
                  use cases, each laddered to a behavior change. Enriched
                  verticals show these; the rest fall back to the one-line
                  `board` summary. */}
              {detail?.plays && detail.plays.length > 0 ? (
                <div className="border-t border-black/10 dark:border-white/10 pt-8">
                  <div className="font-inter text-[10px] font-bold uppercase tracking-[0.25em] mb-5 text-black/40 dark:text-white/40">
                    How Enzy works for {activeIndustry}
                  </div>
                  <div className="flex flex-col gap-5">
                    {detail.plays.map((play) => (
                      <div key={play.title} className="flex gap-3.5">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0"
                          style={{ background: GREEN }}
                          aria-hidden
                        />
                        <div>
                          <h5 className="font-inter text-[15px] md:text-[16px] font-semibold tracking-tight text-black dark:text-white">
                            {play.title}
                          </h5>
                          <p className="font-inter text-[14px] md:text-[15px] leading-relaxed mt-1 text-black/65 dark:text-white/65">
                            {play.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="font-inter text-[15px] md:text-[17px] leading-relaxed text-black/75 dark:text-white/75 border-t border-black/10 dark:border-white/10 pt-8">
                  {detail?.board}
                </p>
              )}

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
              className="rounded-[28px] p-7 lg:p-8 border border-black/10 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.18]"
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
