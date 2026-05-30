"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, Menu, X, Sun, Moon, Wand2 } from 'lucide-react';
import Link from "next/link";

import { useTheme } from './ThemeProvider';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

/**
 * When the user clicks a hash link to a section on a page they're already
 * viewing (e.g. `/system#leaderboards` while on `/system`), Next.js
 * routes via `history.pushState` and does NOT fire `hashchange`. The target
 * page's `applyHash` listeners therefore never re-run and nothing scrolls.
 *
 * This helper detects same-page hash navigation, prevents Next's default
 * routing, manually pushes the new URL, and dispatches a `hashchange` event
 * so consumer pages (Features, Solutions, Resources) can react identically
 * to a fresh page load with that hash.
 */
function navigateToSamePageHash(
  e: React.MouseEvent<HTMLAnchorElement>,
  targetPath: string,
  hash: string
) {
  if (typeof window === "undefined") return;
  if (window.location.pathname !== targetPath) return;
  e.preventDefault();
  const newUrl = `${targetPath}${window.location.search}#${hash}`;
  if (window.location.hash !== `#${hash}`) {
    window.history.pushState({}, "", newUrl);
  }
  window.dispatchEvent(new Event("hashchange"));
}

const MENU_ITEMS = [
  { id: 'features', label: 'System', path: '/system' },
  { id: 'solutions', label: 'Solutions', path: '/solutions' },
  { id: 'resources', label: 'Resources', path: '/resources' },
  { id: 'about', label: 'About', path: '/about' },
];

const SYSTEM_SECTIONS = [
  {
    title: "Core",
    desc: "Always included.",
    items: [
      "Leaderboards",
      "Profiles",
      "Badges",
      "Competitions & Incentives",
      "Messaging",
      "Bot Chats",
      "Media Library",
    ],
  },
  {
    title: "Sell",
    desc: "Field sales add-on.",
    items: [
      "Canvassing",
      "Lead Management",
      "Digital Business Card",
      "Appt Scheduling",
      "SMS Campaigns",
    ],
  },
  {
    title: "Recruit",
    desc: "Recruiting add-on.",
    items: [
      "Recruiting Center",
      "Public Recruit Link",
      "Onboarding Workflow",
      "Document Library",
    ],
  },
];

const USE_CASES = [
  {
    title: "For Reps",
    desc: "Stay consistent. Win more."
  },
  {
    title: "For Leaders",
    desc: "See signal. Drive action."
  },
  {
    title: "For Solar",
    desc: "Drive field activity. Book more."
  },
  {
    title: "For Roofing",
    desc: "Turn effort into revenue."
  }
];

type LearnItem = {
  title: string;
  desc: string;
  /**
   * Optional explicit destination. When omitted the dropdown links into
   * `/resources#${slug}` (in-page anchor on the Resources hub). When
   * provided the dropdown renders a regular `next/link` to this exact
   * route — used by Partners & Affiliates to deep-link to the
   * standalone `/partners` page.
   */
  href?: string;
};

const LEARN_ITEMS: LearnItem[] = [
  {
    title: "Insights",
    desc: "What to measure. What to change.",
    href: "/insights"
  },
  {
    title: "Customer Stories",
    desc: "Real rollouts. Real results."
  },
  {
    title: "Partners & Affiliates",
    desc: "Meet our partners. Become one.",
    href: "/partners-and-affiliates"
  },
  {
    title: "Integrations",
    desc: "Connect Enzy to your tech stack.",
    href: "/integrations"
  }
];

const easeOutExpo = [0.23, 1, 0.32, 1] as const;

const dropInVariants = {
  hidden: { opacity: 0, y: -15, scale: 0.98, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { 
      duration: 0.5, 
      ease: easeOutExpo,
      staggerChildren: 0.04, 
      delayChildren: 0.05 
    }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.98, 
    filter: 'blur(5px)',
    transition: { duration: 0.3, ease: easeOutExpo }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOutExpo } }
};

export function MainNavigation() {
  const { isLightMode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  return (
    <>
      {/* Desktop Main Navigation */}
      <div 
        className="hidden lg:flex flex-col items-center z-50 pointer-events-auto"
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Navigation Items */}
        <div className={`flex gap-8 px-4 py-3.5 font-inter text-[12px] uppercase tracking-[0.15em] font-medium relative ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
          {MENU_ITEMS.map((item) => (
            <Link 
              href={item.path}
              key={item.id}
              onClick={(e) => {
                // Desktop: items with a dropdown (everything except About)
                // open ONLY on hover. Clicking the parent does nothing — it
                // neither navigates nor toggles — so the user hovers to reveal
                // the menu and then clicks a sub-item. About has no submenu, so
                // it navigates straight to its page.
                if (item.id !== 'about') {
                  e.preventDefault();
                } else {
                  setActiveDropdown(null);
                }
              }}
              onMouseEnter={() => handleMouseEnter(item.id)}
              className={`flex items-center gap-1.5 transition-all duration-500 ease-out relative ${
                activeDropdown === item.id 
                  ? 'text-[#19ad7d]' 
                  : isLightMode 
                    ? 'text-black/70 hover:text-black' 
                    : 'text-white/80 hover:text-white'
              }`}
            >
              {item.label}
              {item.id !== 'about' && (
                <motion.div
                  animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                >
                  <ChevronDown size={14} className={isLightMode ? 'opacity-50' : 'opacity-70'} />
                </motion.div>
              )}
              {activeDropdown === item.id && (
                <motion.div 
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-[15px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#19ad7d] to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="absolute top-full pt-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <AnimatePresence>
            {activeDropdown && activeDropdown !== 'about' && (
              <motion.div
                variants={dropInVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="rounded-[32px] overflow-hidden pointer-events-auto relative transition-colors duration-300 liquid-glass"
                onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
              >
                {/* Subtle top glow line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#19ad7d]/40 to-transparent" />

                {activeDropdown === 'features' && (
                  <div className="p-8 lg:p-10 w-[90vw] lg:w-[1000px] max-w-[1000px] flex flex-col md:flex-row gap-10 lg:gap-16">
                    <motion.div variants={itemVariants} className="w-full md:w-[280px] shrink-0 flex flex-col gap-4">
                        <span className={`uppercase tracking-[0.2em] text-[11px] font-bold ${isLightMode ? 'text-black/40' : 'text-white/40'}`}>Overview</span>
                        <h3 className={`font-inter text-[24px] lg:text-[28px] leading-[1.2] font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                            See what Enzy does—fast.
                        </h3>
                        <div className="mt-4">
                            <Link href="/system" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-2 text-[#19ad7d] text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity group">
                                Explore the system <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    <div className={`hidden md:block w-[1px] shrink-0 bg-gradient-to-b from-transparent via-current to-transparent my-2 ${isLightMode ? 'text-black/10' : 'text-white/10'}`} />

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                        {SYSTEM_SECTIONS.map((section, i) => (
                            <motion.div key={i} variants={itemVariants} className="flex flex-col">
                                <span className={`font-inter text-[15px] font-semibold mb-1 ${isLightMode ? 'text-black' : 'text-white'}`}>
                                    {section.title}
                                </span>
                                <span className={`text-[13px] mb-4 leading-snug ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                                    {section.desc}
                                </span>
                                <ul className="flex flex-col gap-1.5">
                                    {section.items.map((item, j) => (
                                        <li key={j}>
                                            <Link 
                                                href={`/system#${slugify(item)}`}
                                                onClick={(e) => {
                                                    navigateToSamePageHash(e, "/system", slugify(item));
                                                    setActiveDropdown(null);
                                                }}
                                                scroll={false}
                                                className={`group flex items-center justify-between px-3 py-2 -ml-3 rounded-lg border transition-all duration-300 ${isLightMode ? 'border-transparent hover:bg-black/5 hover:border-black/5' : 'border-transparent hover:bg-white/[0.06] hover:border-white/10'}`}
                                            >
                                                <span className={`font-inter text-[13px] font-medium transition-colors ${isLightMode ? 'text-black/80 group-hover:text-black' : 'text-white/80 group-hover:text-white'}`}>{item}</span>
                                                <ArrowRight size={14} className="text-[#19ad7d] group-hover:translate-x-1 transition-all duration-300" strokeWidth={2.5} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                  </div>
                )}

                {activeDropdown === 'solutions' && (
                  <div className="p-8 lg:p-10 w-[90vw] lg:w-[1000px] max-w-[1000px] flex flex-col md:flex-row gap-10 lg:gap-16">
                    <motion.div variants={itemVariants} className="w-full md:w-[280px] shrink-0 flex flex-col gap-4">
                        <span className={`uppercase tracking-[0.2em] text-[11px] font-bold ${isLightMode ? 'text-black/40' : 'text-white/40'}`}>Overview</span>
                        <h3 className={`font-inter text-[24px] lg:text-[28px] leading-[1.2] font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                            Built for action. Built to scale.
                        </h3>
                        <div className="mt-4">
                            <Link href="/solutions" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-2 text-[#19ad7d] text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity group">
                                Explore solutions <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                            </Link>
                        </div>
                    </motion.div>

                    <div className={`hidden md:block w-[1px] shrink-0 bg-gradient-to-b from-transparent via-current to-transparent my-2 ${isLightMode ? 'text-black/10' : 'text-white/10'}`} />

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                        {USE_CASES.map((uc, i) => {
                            const slug = uc.title.toLowerCase().replace(/\s+/g, "-");
                            return (
                            <motion.div key={i} variants={itemVariants} className="flex flex-col">
                                <Link
                                    href={`/solutions#${slug}`}
                                    onClick={(e) => {
                                        navigateToSamePageHash(e, "/solutions", slug);
                                        setActiveDropdown(null);
                                    }}
                                    className={`group flex flex-col -m-3 p-3 rounded-xl transition-colors duration-300 ${isLightMode ? 'hover:bg-black/[0.04]' : 'hover:bg-white/[0.06]'}`}
                                >
                                    <span className={`font-inter text-[15px] font-semibold mb-1 inline-flex items-center gap-1.5 transition-colors ${isLightMode ? 'text-black group-hover:text-[#19ad7d]' : 'text-white group-hover:text-[#19ad7d]'}`}>
                                        {uc.title}
                                        <ArrowRight size={14} className="text-[#19ad7d] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" strokeWidth={2.5} />
                                    </span>
                                    <span className={`text-[13px] leading-snug ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                                        {uc.desc}
                                    </span>
                                </Link>
                            </motion.div>
                            );
                        })}
                    </div>
                  </div>
                )}

                {activeDropdown === 'resources' && (
                  <div className="p-8 lg:p-10 w-[90vw] lg:w-[1000px] max-w-[1000px] flex flex-col md:flex-row gap-10 lg:gap-16">
                    <motion.div variants={itemVariants} className="w-full md:w-[280px] shrink-0 flex flex-col gap-4">
                        <span className={`uppercase tracking-[0.2em] text-[11px] font-bold ${isLightMode ? 'text-black/40' : 'text-white/40'}`}>Overview</span>
                        <h3 className={`font-inter text-[24px] lg:text-[28px] leading-[1.2] font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                            Learn the playbooks that work.
                        </h3>
                        <div className="mt-4">
                            <Link href="/resources" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-2 text-[#19ad7d] text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity group">
                                Browse resources <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                            </Link>
                        </div>
                    </motion.div>

                    <div className={`hidden md:block w-[1px] shrink-0 bg-gradient-to-b from-transparent via-current to-transparent my-2 ${isLightMode ? 'text-black/10' : 'text-white/10'}`} />

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                        {LEARN_ITEMS.map((item, i) => {
                            const slug = item.title.toLowerCase().replace(/\s+/g, "-");
                            const href = item.href ?? `/resources#${slug}`;
                            return (
                              <motion.div key={i} variants={itemVariants} className="flex flex-col">
                                  <Link
                                      href={href}
                                      onClick={(e) => {
                                          if (!item.href) {
                                              navigateToSamePageHash(e, "/resources", slug);
                                          }
                                          setActiveDropdown(null);
                                      }}
                                      className={`group flex flex-col -m-3 p-3 rounded-xl transition-colors duration-300 ${isLightMode ? 'hover:bg-black/[0.04]' : 'hover:bg-white/[0.06]'}`}
                                  >
                                      <span className={`font-inter text-[15px] font-semibold mb-1 inline-flex items-center gap-1.5 transition-colors ${isLightMode ? 'text-black group-hover:text-[#19ad7d]' : 'text-white group-hover:text-[#19ad7d]'}`}>
                                          {item.title}
                                          <ArrowRight size={14} className="text-[#19ad7d] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" strokeWidth={2.5} />
                                      </span>
                                      <span className={`text-[13px] leading-snug ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                                          {item.desc}
                                      </span>
                                  </Link>
                              </motion.div>
                            );
                        })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile header controls (theme + menu) */}
      <div className="lg:hidden relative z-[60] flex items-center gap-2 pointer-events-auto">
        <button 
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            window.dispatchEvent(new CustomEvent("enzy-pixel-sphere", { detail: { triggerClick: true, x: cx, y: cy, force: true } }));
          }}
          className={`p-2.5 transition-colors active:scale-95 ${
            isLightMode ? "text-black/80 hover:text-black" : "text-white/85 hover:text-white"
          }`}
          aria-label="Gather pixels"
          title="Gather pixels"
        >
          <Wand2 size={18} />
        </button>

        <button
          onClick={toggleTheme}
          className={`p-2.5 transition-colors active:scale-95 ${
            isLightMode ? "text-black/80 hover:text-black" : "text-white/85 hover:text-white"
          }`}
          aria-label={
            mounted
              ? isLightMode
                ? "Switch to dark mode"
                : "Switch to light mode"
              : "Toggle theme"
          }
          suppressHydrationWarning
        >
          {mounted ? (
            isLightMode ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )
          ) : (
            <span className="block h-[18px] w-[18px]" aria-hidden />
          )}
        </button>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`relative p-2 pointer-events-auto transition-transform active:scale-95 ${
            isLightMode ? "text-black/80 hover:text-black" : "text-white/85 hover:text-white"
          }`}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
        <AnimatePresence mode="wait">
          <motion.div
            key={mobileMenuOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </AnimatePresence>
      </button>
      </div>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className={`fixed inset-0 z-[55] lg:hidden pointer-events-auto overflow-y-auto ${
              isLightMode 
                ? 'bg-white/60' 
                : 'bg-[#0b0f14]/80'
            }`}
          >
            <div className={`absolute top-0 inset-x-0 h-64 blur-[100px] pointer-events-none ${isLightMode ? 'bg-[#19ad7d]/10' : 'bg-[#19ad7d]/5'}`} />

            <div className="flex flex-col pt-32 px-6 pb-20 min-h-full relative z-10">
              {MENU_ITEMS.map((item, i) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: easeOutExpo }}
                  className={`mb-2 border-b ${isLightMode ? 'border-black/5' : 'border-white/5'}`}
                >
                  {item.id !== 'about' ? (
                    // Items with a submenu: tapping the whole row (label or
                    // chevron) toggles the dropdown instead of navigating.
                    <button
                      type="button"
                      onClick={() =>
                        setActiveMobileDropdown(activeMobileDropdown === item.id ? null : item.id)
                      }
                      className="flex items-center justify-between w-full py-6 group text-left"
                      aria-expanded={activeMobileDropdown === item.id}
                    >
                      <span
                        className={`font-inter text-2xl font-medium tracking-[0.1em] uppercase transition-colors flex-1 ${
                          activeMobileDropdown === item.id
                            ? 'text-[#19ad7d]'
                            : isLightMode ? 'text-black/90' : 'text-white/90'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`p-2 -mr-2 transition-colors ${
                          isLightMode ? 'text-black/40' : 'text-white/40'
                        }`}
                      >
                        <motion.div
                          animate={{ rotate: activeMobileDropdown === item.id ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <ChevronDown size={20} />
                        </motion.div>
                      </span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between w-full py-6 group">
                      <Link
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`font-inter text-2xl font-medium tracking-[0.1em] uppercase hover:text-[#19ad7d] active:text-[#19ad7d] transition-colors flex-1 ${
                          isLightMode ? 'text-black/90' : 'text-white/90'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </div>
                  )}

                  <AnimatePresence>
                    {activeMobileDropdown === item.id && item.id !== 'about' && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: easeOutExpo }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pt-2">
                          {item.id === 'features' && (
                            <div className={`flex flex-col gap-8 pl-4 border-l ${isLightMode ? 'border-black/10' : 'border-white/10'}`}>
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className={`uppercase tracking-[0.2em] text-[10px] font-bold mb-2 ${isLightMode ? 'text-black/40' : 'text-white/30'}`}>Overview</div>
                                    <p className={`text-[15px] font-inter leading-snug mb-3 ${isLightMode ? 'text-black/80' : 'text-white/80'}`}>See what Enzy does—fast.</p>
                                    <Link href="/system" onClick={() => setMobileMenuOpen(false)} className="text-[#19ad7d] text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        Explore platform <ArrowRight size={12} />
                                    </Link>
                                </motion.div>

                              {SYSTEM_SECTIONS.map((section, j) => (
                                <motion.div 
                                  key={j}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.05 + 0.1 }}
                                >
                                    <div className={`uppercase tracking-[0.2em] text-[10px] font-bold mb-1 ${isLightMode ? 'text-black/40' : 'text-white/30'}`}>{section.title}</div>
                                    <p className={`text-[13px] mb-3 leading-snug ${isLightMode ? 'text-black/50' : 'text-white/50'}`}>{section.desc}</p>
                                    <div className="flex flex-col gap-2.5">
                                        {section.items.map((subitem, k) => (
                                            <Link 
                                                key={k}
                                                href={`/system#${slugify(subitem)}`}
                                                onClick={(e) => {
                                                    navigateToSamePageHash(e, "/system", slugify(subitem));
                                                    setMobileMenuOpen(false);
                                                    setActiveMobileDropdown(null);
                                                }}
                                                scroll={false}
                                                className={`group flex items-center justify-between px-3 py-2.5 mb-1.5 rounded-md border transition-all duration-300 ${
                                                    isLightMode 
                                                        ? 'bg-black/[0.03] border-black/5 hover:bg-black/[0.08] hover:border-[#19ad7d]/30' 
                                                        : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-[#19ad7d]/30'
                                                }`}
                                            >
                                                <span className={`text-[14px] font-semibold font-inter ${isLightMode ? 'text-black/90' : 'text-white/90'}`}>{subitem}</span>
                                                <ArrowRight size={14} className="text-[#19ad7d] group-hover:translate-x-1 transition-all duration-300" strokeWidth={2.5} />
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {item.id === 'solutions' && (
                            <div className={`flex flex-col gap-8 pl-4 border-l ${isLightMode ? 'border-black/10' : 'border-white/10'}`}>
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className={`uppercase tracking-[0.2em] text-[10px] font-bold mb-2 ${isLightMode ? 'text-black/40' : 'text-white/30'}`}>Overview</div>
                                    <p className={`text-[15px] font-inter leading-snug mb-3 ${isLightMode ? 'text-black/80' : 'text-white/80'}`}>Built for action. Built to scale.</p>
                                    <Link href="/solutions" onClick={() => setMobileMenuOpen(false)} className="text-[#19ad7d] text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        Explore solutions <ArrowRight size={12} />
                                    </Link>
                                </motion.div>

                              {USE_CASES.map((uc, j) => {
                                const slug = uc.title.toLowerCase().replace(/\s+/g, "-");
                                return (
                                <motion.div 
                                  key={j}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.05 + 0.1 }}
                                >
                                    <Link
                                        href={`/solutions#${slug}`}
                                        onClick={(e) => {
                                            navigateToSamePageHash(e, "/solutions", slug);
                                            setMobileMenuOpen(false);
                                            setActiveMobileDropdown(null);
                                        }}
                                        className="group flex items-center justify-between gap-3"
                                    >
                                        <span className="flex flex-col">
                                            <span className={`font-inter text-[15px] font-semibold ${isLightMode ? 'text-black/90' : 'text-white/90'}`}>{uc.title}</span>
                                            <span className={`text-[13px] leading-snug ${isLightMode ? 'text-black/50' : 'text-white/50'}`}>{uc.desc}</span>
                                        </span>
                                        <ArrowRight size={16} className="text-[#19ad7d] shrink-0 group-hover:translate-x-1 transition-all duration-300" strokeWidth={2.5} />
                                    </Link>
                                </motion.div>
                                );
                              })}
                            </div>
                          )}

                          {item.id === 'resources' && (
                            <div className={`flex flex-col gap-8 pl-4 border-l ${isLightMode ? 'border-black/10' : 'border-white/10'}`}>
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className={`uppercase tracking-[0.2em] text-[10px] font-bold mb-2 ${isLightMode ? 'text-black/40' : 'text-white/30'}`}>Overview</div>
                                    <p className={`text-[15px] font-inter leading-snug mb-3 ${isLightMode ? 'text-black/80' : 'text-white/80'}`}>Learn the playbooks that work.</p>
                                    <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="text-[#19ad7d] text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        Browse resources <ArrowRight size={12} strokeWidth={2.5} />
                                    </Link>
                                </motion.div>

                              {LEARN_ITEMS.map((item, j) => {
                                const slug = item.title.toLowerCase().replace(/\s+/g, "-");
                                const href = item.href ?? `/resources#${slug}`;
                                return (
                                <motion.div 
                                  key={j}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.05 + 0.1 }}
                                >
                                    <Link
                                        href={href}
                                        onClick={(e) => {
                                            if (!item.href) {
                                                navigateToSamePageHash(e, "/resources", slug);
                                            }
                                            setMobileMenuOpen(false);
                                            setActiveMobileDropdown(null);
                                        }}
                                        className="group flex items-center justify-between gap-3"
                                    >
                                        <span className="flex flex-col">
                                            <span className={`font-inter text-[15px] font-semibold ${isLightMode ? 'text-black/90' : 'text-white/90'}`}>{item.title}</span>
                                            <span className={`text-[13px] leading-snug ${isLightMode ? 'text-black/50' : 'text-white/50'}`}>{item.desc}</span>
                                        </span>
                                        <ArrowRight size={16} className="text-[#19ad7d] shrink-0 group-hover:translate-x-1 transition-all duration-300" strokeWidth={2.5} />
                                    </Link>
                                </motion.div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Log In ships below "About" so reps with an existing account
                  can jump straight into the app from the mobile menu. */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + MENU_ITEMS.length * 0.05, duration: 0.5, ease: easeOutExpo }}
                className={`mb-2 border-b ${isLightMode ? 'border-black/5' : 'border-white/5'}`}
              >
                <div className="flex items-center justify-between w-full py-6 group">
                  <Link
                    href="https://app.enzy.co/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-inter text-2xl font-medium tracking-[0.1em] uppercase hover:text-[#19ad7d] active:text-[#19ad7d] transition-colors flex-1 ${
                      isLightMode ? 'text-black/90' : 'text-white/90'
                    }`}
                  >
                    Log In
                  </Link>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}