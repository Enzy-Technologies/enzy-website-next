"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';
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
  // No /resources landing page (hidden — see src/app/resources/page.tsx). The
  // desktop trigger never navigates on click (preventDefault opens the dropdown
  // instead) and mobile renders it as a <button>, so this path is only the
  // crawlable href on desktop — point it at a real page, not the 404.
  { id: 'resources', label: 'Resources', path: '/insights' },
  { id: 'about', label: 'About', path: '/about' },
];

const SYSTEM_SECTIONS = [
  {
    title: "Core",
    desc: "Always included.",
    items: [
      "Enzy AI",
      "Leaderboards",
      "Profiles",
      "Badges",
      "Competitions & Incentives",
      "Messaging",
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
    title: "For Field Sales",
    desc: "Route-based execution and in-field coaching."
  },
  {
    title: "For Virtual Sales",
    desc: "Speed to lead and consistent messaging."
  }
];

type LearnItem = {
  title: string;
  desc: string;
  /**
   * Optional explicit destination. When omitted the dropdown links into
   * `/resources#${slug}` (in-page anchor on the Resources hub). When
   * provided the dropdown renders a regular `next/link` to this exact
   * route — used by Partners to deep-link to the standalone
   * `/partners` page.
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
    desc: "Real rollouts. Real results.",
    href: "/customer-stories"
  },
  {
    title: "Partners",
    desc: "Meet the companies we trust.",
    href: "/partners"
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
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileControlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tap-outside-to-close, without a full-viewport fixed scrim (a full-screen
  // fixed element defeats iOS Safari's bottom-toolbar passthrough → opaque bar).
  // Instead we listen for a pointerdown anywhere outside the panel and the
  // header controls (the controls are excluded so tapping the hamburger toggles
  // cleanly instead of close-then-reopen).
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (mobilePanelRef.current?.contains(target)) return;
      if (mobileControlsRef.current?.contains(target)) return;
      setMobileMenuOpen(false);
      setActiveMobileDropdown(null);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Pause the decorative background canvas while the full-screen menu is open
    // (it's hidden behind the overlay). This frees the main thread so opening
    // the menu and tapping a link feel immediate instead of waiting on the
    // canvas's per-frame work. PixelCanvas listens for this event.
    window.dispatchEvent(
      new CustomEvent('enzy-bg-pause', { detail: { paused: mobileMenuOpen } })
    );
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(
        new CustomEvent('enzy-bg-pause', { detail: { paused: false } })
      );
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
        <div className="flex gap-8 px-4 py-3.5 font-inter text-[12px] uppercase tracking-[0.15em] font-medium relative text-black dark:text-[#f5f7fa]">
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
                  : 'text-black/70 hover:text-black dark:text-white/80 dark:hover:text-white'
              }`}
            >
              {item.label}
              {item.id !== 'about' && (
                <motion.div
                  animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                >
                  <ChevronDown size={14} className="opacity-50 dark:opacity-70" />
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
                        <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-black/40 dark:text-white/40">Overview</span>
                        <h3 className="font-inter text-[24px] lg:text-[28px] leading-[1.2] font-semibold tracking-tight text-black dark:text-white">
                            One system. The whole performance loop.
                        </h3>
                        <div className="mt-4">
                            <Link href="/system" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-2 text-[#19ad7d] text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity group">
                                Explore the full system <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    <div className="block w-[1px] shrink-0 bg-gradient-to-b from-transparent via-current to-transparent my-2 text-black/10 dark:text-white/10" />

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                        {SYSTEM_SECTIONS.map((section, i) => (
                            <motion.div key={i} variants={itemVariants} className="flex flex-col">
                                <span className="font-inter text-[15px] font-semibold mb-1 text-black dark:text-white">
                                    {section.title}
                                </span>
                                <span className="text-[13px] mb-4 leading-snug text-black/60 dark:text-white/60">
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
                                                className="group flex items-center justify-between px-3 py-2 -ml-3 rounded-lg border transition-all duration-300 border-transparent hover:bg-black/5 hover:border-black/5 dark:hover:bg-white/[0.06] dark:hover:border-white/10"
                                            >
                                                <span className="font-inter text-[13px] font-medium transition-colors text-black/80 group-hover:text-black dark:text-white/80 dark:group-hover:text-white">{item}</span>
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
                        <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-black/40 dark:text-white/40">Overview</span>
                        <h3 className="font-inter text-[24px] lg:text-[28px] leading-[1.2] font-semibold tracking-tight text-black dark:text-white">
                            Your motion. Your playbooks.
                        </h3>
                        <div className="mt-4">
                            <Link href="/solutions" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-2 text-[#19ad7d] text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity group">
                                Explore all solutions <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                            </Link>
                        </div>
                    </motion.div>

                    <div className="block w-[1px] shrink-0 bg-gradient-to-b from-transparent via-current to-transparent my-2 text-black/10 dark:text-white/10" />

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
                                    className="group flex flex-col -m-3 p-3 rounded-xl transition-colors duration-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                                >
                                    <span className="font-inter text-[15px] font-semibold mb-1 inline-flex items-center gap-1.5 transition-colors text-black group-hover:text-[#19ad7d] dark:text-white dark:group-hover:text-[#19ad7d]">
                                        {uc.title}
                                        <ArrowRight size={14} className="text-[#19ad7d] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" strokeWidth={2.5} />
                                    </span>
                                    <span className="text-[13px] leading-snug text-black/60 dark:text-white/60">
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
                        <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-black/40 dark:text-white/40">Overview</span>
                        <h3 className="font-inter text-[24px] lg:text-[28px] leading-[1.2] font-semibold tracking-tight text-black dark:text-white">
                            Learn the playbooks that work.
                        </h3>
                    </motion.div>

                    <div className="block w-[1px] shrink-0 bg-gradient-to-b from-transparent via-current to-transparent my-2 text-black/10 dark:text-white/10" />

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
                                      className="group flex flex-col -m-3 p-3 rounded-xl transition-colors duration-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                                  >
                                      <span className="font-inter text-[15px] font-semibold mb-1 inline-flex items-center gap-1.5 transition-colors text-black group-hover:text-[#19ad7d] dark:text-white dark:group-hover:text-[#19ad7d]">
                                          {item.title}
                                          <ArrowRight size={14} className="text-[#19ad7d] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" strokeWidth={2.5} />
                                      </span>
                                      <span className="text-[13px] leading-snug text-black/60 dark:text-white/60">
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
      <div ref={mobileControlsRef} className="lg:hidden relative z-[60] flex items-center gap-2 pointer-events-auto">
        {/* The pixel-toggle "magic wand" was removed on mobile — the particle
            canvas doesn't run on phones, so the control had nothing to toggle. */}
        <button
          onClick={toggleTheme}
          className="p-2.5 transition-colors active:scale-95 text-black/80 hover:text-black dark:text-white/85 dark:hover:text-white"
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
          className="relative p-2 pointer-events-auto transition-transform active:scale-95 text-black/80 hover:text-black dark:text-white/85 dark:hover:text-white"
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

      {/* ---------- Mobile menu (contained dropdown panel) ----------
          A header-anchored panel instead of a full-screen overlay. The old
          version covered the whole viewport with backdrop-filter: blur(40px),
          which is enormously expensive to composite on phones — that was the
          cause of the laggy/glitchy open + close. This panel is sized to its
          content (≈ the nav rows, roughly half the screen) and grows + scrolls
          internally when a submenu expands. The only blur is the small
          liquid-glass panel itself; the backdrop is a plain translucent scrim. */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* No scrim element on purpose: a full-viewport fixed scrim defeats
                iOS Safari's bottom-toolbar passthrough and forces an opaque
                bottom bar whenever the menu is open. Tap-outside-to-close is
                handled by the pointerdown listener in the effect above instead. */}

            {/* Panel — anchored under the header like the desktop dropdowns. */}
            <motion.div
              ref={mobilePanelRef}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: easeOutExpo }}
              style={{ transformOrigin: 'top center' }}
              className="fixed top-[calc(76px+env(safe-area-inset-top,0px))] inset-x-3 z-[55] lg:hidden max-h-[calc(100dvh-96px)] overflow-hidden rounded-[28px] liquid-glass shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-black/10 dark:border-white/10"
            >
              <div className="flex flex-col p-2 overflow-y-auto max-h-[calc(100dvh-96px)]">
                {MENU_ITEMS.map((item) => (
                  <div key={item.id} className="flex flex-col">
                    {item.id !== 'about' ? (
                      // Submenu items: tapping the row toggles its dropdown.
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMobileDropdown(activeMobileDropdown === item.id ? null : item.id)
                        }
                        className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl text-left transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                        aria-expanded={activeMobileDropdown === item.id}
                      >
                        <span
                          className={`font-inter text-[17px] font-semibold tracking-wide transition-colors ${
                            activeMobileDropdown === item.id
                              ? 'text-[#19ad7d]'
                              : 'text-black/90 dark:text-white/90'
                          }`}
                        >
                          {item.label}
                        </span>
                        <motion.span
                          animate={{ rotate: activeMobileDropdown === item.id ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="text-black/40 dark:text-white/40"
                        >
                          <ChevronDown size={18} />
                        </motion.span>
                      </button>
                    ) : (
                      <Link
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center w-full px-4 py-3.5 rounded-2xl font-inter text-[17px] font-semibold tracking-wide transition-colors text-black/90 dark:text-white/90 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-[#19ad7d]"
                      >
                        {item.label}
                      </Link>
                    )}

                    <AnimatePresence initial={false}>
                      {activeMobileDropdown === item.id && item.id !== 'about' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: easeOutExpo }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-1">
                            {item.id === 'features' && (
                              <div className="flex flex-col gap-5 pl-3 border-l border-black/10 dark:border-white/10">
                                <Link
                                  href="/system"
                                  onClick={() => { setMobileMenuOpen(false); setActiveMobileDropdown(null); }}
                                  className="text-[#19ad7d] text-[11px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5"
                                >
                                  Explore the full system <ArrowRight size={12} />
                                </Link>
                                {SYSTEM_SECTIONS.map((section, j) => (
                                  <div key={j}>
                                    <div className="uppercase tracking-[0.2em] text-[10px] font-bold mb-1 text-black/40 dark:text-white/30">{section.title}</div>
                                    <p className="text-[12px] mb-2 leading-snug text-black/50 dark:text-white/50">{section.desc}</p>
                                    <div className="flex flex-col gap-1.5">
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
                                          className="group flex items-center justify-between px-3 py-2 rounded-lg border transition-colors bg-black/[0.03] border-black/5 hover:bg-black/[0.07] hover:border-[#19ad7d]/30 dark:bg-white/[0.03] dark:border-white/5 dark:hover:bg-white/[0.08] dark:hover:border-[#19ad7d]/30"
                                        >
                                          <span className="text-[13px] font-semibold font-inter text-black/90 dark:text-white/90">{subitem}</span>
                                          <ArrowRight size={13} className="text-[#19ad7d] group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {item.id === 'solutions' && (
                              <div className="flex flex-col gap-3.5 pl-3 border-l border-black/10 dark:border-white/10">
                                <Link
                                  href="/solutions"
                                  onClick={() => { setMobileMenuOpen(false); setActiveMobileDropdown(null); }}
                                  className="text-[#19ad7d] text-[11px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5"
                                >
                                  Explore all solutions <ArrowRight size={12} />
                                </Link>
                                {USE_CASES.map((uc, j) => {
                                  const slug = uc.title.toLowerCase().replace(/\s+/g, "-");
                                  return (
                                    <Link
                                      key={j}
                                      href={`/solutions#${slug}`}
                                      onClick={(e) => {
                                        navigateToSamePageHash(e, "/solutions", slug);
                                        setMobileMenuOpen(false);
                                        setActiveMobileDropdown(null);
                                      }}
                                      className="group flex items-center justify-between gap-3"
                                    >
                                      <span className="flex flex-col">
                                        <span className="font-inter text-[14px] font-semibold text-black/90 dark:text-white/90">{uc.title}</span>
                                        <span className="text-[12px] leading-snug text-black/50 dark:text-white/50">{uc.desc}</span>
                                      </span>
                                      <ArrowRight size={15} className="text-[#19ad7d] shrink-0 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                                    </Link>
                                  );
                                })}
                              </div>
                            )}

                            {item.id === 'resources' && (
                              <div className="flex flex-col gap-3.5 pl-3 border-l border-black/10 dark:border-white/10">
                                {LEARN_ITEMS.map((li, j) => {
                                  const slug = li.title.toLowerCase().replace(/\s+/g, "-");
                                  const href = li.href ?? `/resources#${slug}`;
                                  return (
                                    <Link
                                      key={j}
                                      href={href}
                                      onClick={(e) => {
                                        if (!li.href) {
                                          navigateToSamePageHash(e, "/resources", slug);
                                        }
                                        setMobileMenuOpen(false);
                                        setActiveMobileDropdown(null);
                                      }}
                                      className="group flex items-center justify-between gap-3"
                                    >
                                      <span className="flex flex-col">
                                        <span className="font-inter text-[14px] font-semibold text-black/90 dark:text-white/90">{li.title}</span>
                                        <span className="text-[12px] leading-snug text-black/50 dark:text-white/50">{li.desc}</span>
                                      </span>
                                      <ArrowRight size={15} className="text-[#19ad7d] shrink-0 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Log In — ships below "About" so reps with an account can jump
                    straight into the app from the menu. */}
                <Link
                  href="https://app.enzy.co/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center w-full px-4 py-3.5 mt-1 rounded-2xl font-inter text-[17px] font-semibold tracking-wide transition-colors text-black/90 dark:text-white/90 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-[#19ad7d]"
                >
                  Log In
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}