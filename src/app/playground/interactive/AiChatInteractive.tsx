"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowUp, X, TrendingUp, Check, Send, Instagram, Download } from "lucide-react";

type ActionOption = {
  label: string;
  response: string;
  image?: string;
  repsMessage?: string;
  story?: boolean;
};

type PromptType = {
  text: string;
  response: string;
  options?: ActionOption[];
  report?: boolean;
};

const prompts: PromptType[] = [
  {
    text: "Automate a message",
    response: "Got it — I'll draft an automated message. Who's the audience and what's the trigger event?",
  },
  {
    text: "Build a competition",
    response: "Based on this month's numbers, pipeline creation is down 15%. I suggest a 'Pipeline Power-Up' competition: a 7-day sprint for the most new qualified opportunities.",
    options: [
      {
        label: "Want me to set it up?",
        response: "Great! The 'Pipeline Power-Up' competition has been drafted and will run next Monday to Friday. I've placed it in your drafts for final approval.",
        image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsYXVuY2h8ZW58MXx8fHwxNzc5MzkzODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        label: "Give me the outline",
        response: "Here's the outline:\n• Goal: Increase pipeline creation\n• Duration: 7 days\n• Metric: New SQOs\n• Prize: $500 to top rep, $200 runner up",
      },
      {
        label: "Help me brainstorm prizes",
        response: "Here are a few prize ideas:\n1. $500 gift card of choice\n2. Extra PTO day\n3. Dinner with the CEO\n4. Premium headphones",
      },
    ],
  },
  {
    text: "Give me this week's top reps",
    response: "This week's top 3 reps: Spencer Gray (174 XP), Jacob Sheldon (134 XP), Liam Carter (111 XP).",
    options: [
      {
        label: "Send each one a message",
        response: "Here's a suggested message — tap send to fire it off to all three:",
        repsMessage: "Insane job this week! Love to see it 🔥",
      },
      {
        label: "Create an Instagram story to highlight them",
        response: "Cooked up a top 3 hype post — ready to share to your story:",
        story: true,
      },
    ],
  },
  {
    text: "Show me revenue YTD in a report",
    response: "YTD revenue is $2.4M, +18% vs last year. Mountain West is leading at $612K. Here's the full report:",
    report: true,
  },
];

type Props = { onClose: () => void };

type Message =
  | { kind: "ai"; text: string; image?: string; report?: boolean; repsMessage?: string; story?: boolean }
  | { kind: "user"; text: string };

const Key = ({ children, flex = 1, dark = false, wide = false }: { children: React.ReactNode; flex?: number; dark?: boolean; wide?: boolean }) => (
  <div
    className={`flex h-[42px] items-center justify-center rounded-[5px] ${dark ? "bg-[#adb3bc]" : "bg-white"} shadow-[0_1px_0_rgba(0,0,0,0.35)]`}
    style={{ flex, fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif", fontSize: wide ? 14 : 22, color: "#000" }}
  >
    {children}
  </div>
);

function IosKeyboard() {
  const row1 = ["q","w","e","r","t","y","u","i","o","p"];
  const row2 = ["a","s","d","f","g","h","j","k","l"];
  const row3 = ["z","x","c","v","b","n","m"];
  return (
    <div
      className="absolute bottom-0 left-0 right-0 px-[3px] pt-[6px] pb-[2px]"
      style={{ height: 252, background: "#d1d4db" }}
    >
      <div className="flex gap-[6px] px-[3px]">
        {row1.map(k => <Key key={k}>{k}</Key>)}
      </div>
      <div className="mt-[11px] flex gap-[6px] px-[20px]">
        {row2.map(k => <Key key={k}>{k}</Key>)}
      </div>
      <div className="mt-[11px] flex gap-[6px] px-[3px]">
        <Key flex={1.4} dark>⇧</Key>
        <div className="w-[6px]" />
        {row3.map(k => <Key key={k}>{k}</Key>)}
        <div className="w-[6px]" />
        <Key flex={1.4} dark>⌫</Key>
      </div>
      <div className="mt-[11px] flex gap-[6px] px-[3px]">
        <Key flex={1.4} dark wide>123</Key>
        <Key flex={1} dark wide>🌐</Key>
        <Key flex={5} wide>space</Key>
        <Key flex={1.6} dark wide>return</Key>
      </div>
      <div className="mx-auto mt-[4px] h-[5px] w-[134px] rounded-full bg-[#161513]" />
    </div>
  );
}

const FONT = "Inter, sans-serif";

function RevenueReport() {
  const regions = [
    { name: "Mountain West", value: 612 },
    { name: "Pacific NW", value: 498 },
    { name: "Southwest", value: 441 },
    { name: "Midwest", value: 386 },
    { name: "Northeast", value: 312 },
    { name: "Southeast", value: 151 },
  ];
  const months = [140, 165, 178, 195, 188, 215, 232, 248, 261, 244, 268, 286];
  const maxM = Math.max(...months);
  const maxR = Math.max(...regions.map(r => r.value));

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      className="overflow-hidden rounded-2xl rounded-bl-[6px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
      style={{ width: 260 }}
    >
      <div className="px-4 pt-3.5 pb-3" style={{ background: "linear-gradient(135deg, #0DA071 0%, #29E9BC 100%)" }}>
        <p className="text-[10px] uppercase tracking-[1.2px] text-white/80" style={{ fontFamily: "'Roboto Mono', monospace" }}>
          Revenue YTD · 2026
        </p>
        <div className="mt-1.5 flex items-baseline gap-2">
          <p className="text-[26px] leading-none text-white" style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}>$2.4M</p>
          <div className="flex items-center gap-0.5 rounded-full bg-white/20 px-1.5 py-0.5">
            <TrendingUp className="h-3 w-3 text-white" />
            <span className="text-[11px] text-white" style={{ fontFamily: FONT }}>+18%</span>
          </div>
        </div>
        <p className="mt-0.5 text-[11px] text-white/75" style={{ fontFamily: FONT }}>vs. last year</p>
      </div>

      <div className="px-4 pt-3">
        <p className="text-[10px] uppercase tracking-[1px] text-[#7a7a75]" style={{ fontFamily: "'Roboto Mono', monospace" }}>
          Monthly · $K
        </p>
        <div className="mt-2 flex h-[60px] items-end gap-[3px]">
          {months.map((m, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(m / maxM) * 100}%` }}
              transition={{ delay: 0.35 + i * 0.03, duration: 0.4, ease: "easeOut" }}
              className="flex-1 rounded-sm"
              style={{ background: i === months.length - 1 ? "#0DA071" : "#bce4d3" }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-[#a5a29c]" style={{ fontFamily: FONT }}>
          <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
        </div>
      </div>

      <div className="px-4 pt-3 pb-4">
        <p className="text-[10px] uppercase tracking-[1px] text-[#7a7a75]" style={{ fontFamily: "'Roboto Mono', monospace" }}>
          Top Regions
        </p>
        <div className="mt-2 flex flex-col gap-1.5">
          {regions.map((r, i) => (
            <div key={r.name} className="flex items-center gap-2">
              <span className="w-[88px] shrink-0 text-[11px] text-[#161513]" style={{ fontFamily: FONT }}>{r.name}</span>
              <div className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-[#f0ede5]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(r.value / maxR) * 100}%` }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: i === 0 ? "#0DA071" : "#a8d8c5" }}
                />
              </div>
              <span className="w-[42px] shrink-0 text-right text-[11px] text-[#161513]" style={{ fontFamily: FONT }}>${r.value}K</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const TOP_REPS = [
  { name: "Spencer Gray", xp: 174, initials: "SG", color: "#0DA071" },
  { name: "Jacob Sheldon", xp: 134, initials: "JS", color: "#5A6FE0" },
  { name: "Liam Carter", xp: 111, initials: "LC", color: "#E07A3F" },
];

function RepsMessageCard({ message, onSent }: { message: string; onSent?: () => void }) {
  const [sent, setSent] = useState(false);
  const handleSend = () => {
    if (sent) return;
    setSent(true);
    onSent?.();
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.3 }}
      className="overflow-hidden rounded-2xl rounded-bl-[6px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
      style={{ width: 260 }}
    >
      <div className="flex flex-col gap-2 px-3 pt-3 pb-2">
        {TOP_REPS.map((rep, i) => (
          <motion.div
            key={rep.name}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
            className="flex items-start gap-2.5"
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] text-white"
              style={{ background: rep.color, fontFamily: FONT, fontWeight: 600 }}
            >
              {rep.initials}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[12px] text-[#161513]" style={{ fontFamily: FONT, fontWeight: 600 }}>{rep.name}</span>
                <span className="text-[10px] text-[#7a7a75]" style={{ fontFamily: FONT }}>{rep.xp} XP</span>
              </div>
              <div className="mt-1 rounded-2xl rounded-tl-[4px] bg-[#f4fcf9] px-2.5 py-1.5">
                <p className="text-[12px] leading-[16px] text-[#161513]" style={{ fontFamily: FONT }}>
                  {message}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-[#f0ede5] p-2.5">
        <motion.button
          whileTap={{ scale: sent ? 1 : 0.97 }}
          onClick={handleSend}
          disabled={sent}
          className={`flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-[13px] text-white transition ${
            sent ? "bg-[#7a7a75]" : "bg-[#0DA071] hover:bg-[#0b8e64]"
          }`}
          style={{ fontFamily: FONT, fontWeight: 500 }}
        >
          {sent ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Sent to all 3
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              Confirm & send
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

function InstagramStoryCard() {
  const [shared, setShared] = useState(false);
  const [saved, setSaved] = useState(false);
  const podium = [
    {
      rank: 2,
      name: "Jacob Sheldon",
      xp: 134,
      photo: "https://images.unsplash.com/photo-1577744168855-0391d2ed2b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      height: 110,
    },
    {
      rank: 1,
      name: "Spencer Gray",
      xp: 174,
      photo: "https://images.unsplash.com/photo-1542393881816-df51684879df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      height: 150,
    },
    {
      rank: 3,
      name: "Liam Carter",
      xp: 111,
      photo: "https://images.unsplash.com/photo-1739567994955-6441a2fbb62d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
      height: 86,
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.3 }}
      className="overflow-hidden rounded-2xl rounded-bl-[6px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
      style={{ width: 240 }}
    >
      <div
        className="relative overflow-hidden bg-[#161513]"
        style={{ aspectRatio: "9 / 16" }}
      >
        {/* diagonal accent slashes */}
        <div
          className="absolute -right-10 top-0 h-full w-32 opacity-90"
          style={{
            background: "linear-gradient(180deg, #0DA071 0%, #29E9BC 100%)",
            transform: "skewX(-18deg)",
          }}
        />
        <div
          className="absolute -right-4 top-0 h-full w-2"
          style={{ background: "#29E9BC", transform: "skewX(-18deg)" }}
        />
        <div
          className="absolute -left-6 bottom-0 h-24 w-24 rounded-full"
          style={{ background: "#29E9BC", opacity: 0.12, filter: "blur(20px)" }}
        />

        {/* Header */}
        <div className="relative px-3 pt-3">
          <div className="flex items-center gap-1.5">
            <div className="h-[3px] w-5" style={{ background: "#29E9BC" }} />
            <p className="text-[8px] uppercase tracking-[2px] text-white/70" style={{ fontFamily: "'Roboto Mono', monospace" }}>
              ENZY · WK 21
            </p>
          </div>
          <p
            className="mt-2 text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: 56,
              lineHeight: "48px",
              letterSpacing: "-2.5px",
            }}
          >
            TOP<br />
            <span style={{ color: "#29E9BC" }}>3.</span>
          </p>
          <p
            className="mt-1 text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: "20px",
              letterSpacing: "-0.8px",
            }}
          >
            JUST<br />CLOSED.
          </p>
        </div>

        {/* Podium */}
        <div className="absolute bottom-3 left-0 right-0 flex items-end justify-center gap-1.5 px-3">
          {podium.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              className="flex flex-col items-center"
              style={{ flex: 1 }}
            >
              <div
                className="overflow-hidden rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.5)]"
                style={{
                  width: p.rank === 1 ? 72 : 60,
                  height: p.rank === 1 ? 72 : 60,
                  border: p.rank === 1 ? "3px solid #29E9BC" : "2px solid rgba(255,255,255,0.5)",
                }}
              >
                <img src={p.photo} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <p
                className="mt-1.5 truncate text-center text-white"
                style={{ fontFamily: FONT, fontWeight: 800, fontStyle: "italic", fontSize: 11, maxWidth: 72 }}
              >
                {p.name.split(" ")[0].toUpperCase()}
              </p>
              <p className="text-[8px]" style={{ color: "#29E9BC", fontFamily: "'Roboto Mono', monospace" }}>
                {p.xp} XP
              </p>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: p.height * 0.35 }}
                transition={{ delay: 0.55 + i * 0.12, duration: 0.5, ease: "easeOut" }}
                className="mt-1 w-full"
                style={{
                  background: p.rank === 1 ? "#29E9BC" : p.rank === 2 ? "#0DA071" : "#0a5a40",
                  clipPath: "polygon(0 8px, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                <p
                  className="pt-1.5 text-center"
                  style={{
                    fontFamily: FONT,
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: 18,
                    color: p.rank === 1 ? "#161513" : "#faf9f6",
                  }}
                >
                  {p.rank}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* corner mark */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1">
          <div className="h-1 w-1 rounded-full" style={{ background: "#29E9BC" }} />
          <p className="text-[7px] uppercase tracking-[1.5px] text-white/60" style={{ fontFamily: "'Roboto Mono', monospace" }}>
            enzy.app
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#f0ede5] p-2.5">
        <motion.button
          whileTap={{ scale: shared ? 1 : 0.97 }}
          onClick={() => !shared && setShared(true)}
          disabled={shared}
          className={`flex w-full items-center justify-center gap-1.5 rounded-full py-2.5 text-[13px] text-white transition ${
            shared ? "bg-[#7a7a75]" : "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]"
          }`}
          style={{ fontFamily: FONT, fontWeight: 500 }}
        >
          {shared ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Shared to story
            </>
          ) : (
            <>
              <Instagram className="h-3.5 w-3.5" />
              Share to Instagram
            </>
          )}
        </motion.button>
        <motion.button
          whileTap={{ scale: saved ? 1 : 0.97 }}
          onClick={() => !saved && setSaved(true)}
          disabled={saved}
          className={`flex w-full items-center justify-center gap-1.5 rounded-full border py-2.5 text-[13px] transition ${
            saved
              ? "border-[#e6e6e3] bg-[#f4f3ef] text-[#7a7a75]"
              : "border-[#161513]/15 bg-white text-[#161513] hover:bg-[#f9f8f4]"
          }`}
          style={{ fontFamily: FONT, fontWeight: 500 }}
        >
          {saved ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Saved to Photos
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5" />
              Save image
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

function AiBubble({ text, image, report, repsMessage, story, onRepsSent }: { text: string; image?: string; report?: boolean; repsMessage?: string; story?: boolean; onRepsSent?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-end gap-2 self-start max-w-[78%]"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
        <Sparkles className="h-3.5 w-3.5" style={{ color: "#0DA071" }} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="rounded-2xl rounded-bl-[6px] bg-white px-3.5 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <p className="text-[14px] leading-[19px] text-[#161513] whitespace-pre-line" style={{ fontFamily: FONT }}>
            {text}
          </p>
        </div>
        {image && (
          <div className="overflow-hidden rounded-2xl rounded-bl-[6px] border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <img src={image} alt="Preview" className="w-full h-auto object-cover aspect-[4/3]" />
          </div>
        )}
        {report && <RevenueReport />}
        {repsMessage && <RepsMessageCard message={repsMessage} onSent={onRepsSent} />}
        {story && <InstagramStoryCard />}
      </div>
    </motion.div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="self-end rounded-2xl rounded-br-[6px] bg-[#0DA071] px-3.5 py-2.5 max-w-[78%] shadow-[0_2px_10px_rgba(13,160,113,0.18)]"
    >
      <p className="text-[14px] leading-[19px] text-white" style={{ fontFamily: FONT }}>
        {text}
      </p>
    </motion.div>
  );
}

function Suggestions({ items, onPick }: { items: string[]; onPick: (i: number) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-1.5 self-end justify-end max-w-[88%]"
    >
      {items.map((label, i) => (
        <motion.button
          key={i}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPick(i)}
          className="rounded-full border border-[#0DA071]/25 bg-white/80 backdrop-blur px-3 py-1.5 text-[13px] text-[#0DA071] hover:bg-[#f4fcf9]"
          style={{ fontFamily: FONT }}
        >
          {label}
        </motion.button>
      ))}
    </motion.div>
  );
}

export default function AiChatInteractive({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activePromptIdx, setActivePromptIdx] = useState<number | null>(null);
  const [followUpDone, setFollowUpDone] = useState(false);
  const [automationChoice, setAutomationChoice] = useState<"idle" | "asking" | "done">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const el = scrollRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }, 60);
    return () => clearTimeout(t);
  }, [messages.length, activePromptIdx, followUpDone, automationChoice]);

  const handleRepsSent = () => {
    setTimeout(() => {
      setMessages(m => [...m, { kind: "ai", text: "Do you want me to set up an automation to send this message to the top performers every week?" }]);
      setAutomationChoice("asking");
    }, 600);
  };

  const pickAutomation = (choice: "yes" | "no") => {
    const userText = choice === "yes" ? "Yes, set it up" : "Not now";
    setMessages(m => [...m, { kind: "user", text: userText }]);
    setAutomationChoice("done");
    setTimeout(() => {
      const reply = choice === "yes"
        ? "Done! Every Friday at 4pm I'll send this message to the week's top 3 reps. You can edit or pause it anytime from Automations."
        : "No problem — I'll skip it. Just say the word if you want to set it up later.";
      setMessages(m => [...m, { kind: "ai", text: reply }]);
    }, 450);
  };

  const pickPrompt = (i: number) => {
    const p = prompts[i];
    setMessages(m => [...m, { kind: "user", text: p.text }]);
    setActivePromptIdx(i);
    setFollowUpDone(false);
    setTimeout(() => {
      setMessages(m => [...m, { kind: "ai", text: p.response, report: p.report }]);
    }, 450);
  };

  const pickOption = (optIdx: number) => {
    if (activePromptIdx === null) return;
    const opt = prompts[activePromptIdx].options![optIdx];
    setMessages(m => [...m, { kind: "user", text: opt.label }]);
    setFollowUpDone(true);
    setTimeout(() => {
      setMessages(m => [...m, { kind: "ai", text: opt.response, image: opt.image, repsMessage: opt.repsMessage, story: opt.story }]);
      setActivePromptIdx(null);
    }, 450);
  };

  const isFresh = messages.length === 0 && activePromptIdx === null;
  const activeOptions =
    activePromptIdx !== null && !followUpDone && prompts[activePromptIdx].options
      ? prompts[activePromptIdx].options!
      : null;

  return (
    <div className="absolute inset-0 backdrop-blur-[3px] bg-[rgba(12,12,13,0.2)]">
      <div
        className="absolute inset-x-0 top-0 flex flex-col bg-[#faf9f6] shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
        style={{ borderBottomLeftRadius: 32, borderBottomRightRadius: 32, bottom: 252 }}
      >
        {/* Header */}
        <div className="flex w-full items-center justify-between px-4 pt-6 pb-3">
          <div className="w-11" />
          <p className="text-[12px] uppercase tracking-[1.5px] text-[#161513]" style={{ fontFamily: "'Roboto Mono', monospace" }}>
            ENZY AI
          </p>
          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          >
            <X className="h-5 w-5 text-[#161513]" />
          </button>
        </div>

        {/* Conversation */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 pt-2 [&::-webkit-scrollbar]:hidden"
        >
          {isFresh ? (
            <div className="flex h-full flex-col items-center justify-start pt-4">
              <Sparkles className="h-9 w-9" style={{ color: "#29E9BC" }} />
              <p
                className="mt-4 text-center text-[28px] leading-[36px] text-[#161513]"
                style={{ fontFamily: "Baskervville, serif", fontStyle: "italic" }}
              >
                <em>Enzy AI</em> is ready to
                <br />
                help you.
              </p>
              <div className="mt-8 flex w-full flex-col items-center gap-2 px-2">
                {prompts.map((p, i) => (
                  <motion.button
                    key={i}
                    onClick={() => pickPrompt(i)}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-full bg-[#d1efe5] px-4 py-2 text-[12px] text-[#161513] hover:bg-[#bce4d3]"
                    style={{ fontFamily: FONT }}
                  >
                    {p.text}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 pb-4">
              <AnimatePresence initial={false}>
                {messages.map((m, i) =>
                  m.kind === "ai" ? (
                    <AiBubble key={i} text={m.text} image={m.image} report={m.report} repsMessage={m.repsMessage} story={m.story} onRepsSent={handleRepsSent} />
                  ) : (
                    <UserBubble key={i} text={m.text} />
                  )
                )}
              </AnimatePresence>

              {activeOptions && (
                <Suggestions items={activeOptions.map(o => o.label)} onPick={pickOption} />
              )}

              {automationChoice === "asking" && (
                <Suggestions
                  items={["Yes, set it up", "Not now"]}
                  onPick={(i) => pickAutomation(i === 0 ? "yes" : "no")}
                />
              )}
            </div>
          )}
        </div>

        {/* Fade */}
        <div
          className="pointer-events-none absolute left-0 right-0 z-10"
          style={{
            bottom: 64,
            height: 28,
            background: "linear-gradient(to bottom, rgba(250,249,246,0) 0%, rgba(250,249,246,1) 100%)",
          }}
        />

        {/* Input */}
        <div className="px-4 pb-3 pt-1">
          <div className="flex h-12 w-full items-center justify-between rounded-full bg-white px-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
            <p className="text-[15px] text-[#a5a29c]" style={{ fontFamily: FONT }}>
              {messages.length > 1 ? "Ask a follow-up…" : "Ask anything…"}
            </p>
            <button
              className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                messages.length > 1 ? "bg-[#0DA071]" : "bg-[#e6e6e3]"
              }`}
            >
              <ArrowUp className={`h-4 w-4 ${messages.length > 1 ? "text-white" : "text-[#a5a29c]"}`} />
            </button>
          </div>
        </div>
      </div>

      <IosKeyboard />
    </div>
  );
}
