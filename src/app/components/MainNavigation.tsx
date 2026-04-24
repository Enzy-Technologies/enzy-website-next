"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, ArrowUpRight, Menu, X, Sun, Moon } from 'lucide-react';
import Link from "next/link";

import { useTheme } from './ThemeProvider';

const MENU_ITEMS = [
  { id: 'features', label: 'System', path: '/features' },
  { id: 'solutions', label: 'Solutions', path: '/solutions' },
  { id: 'resources', label: 'Resources', path: '/resources' },
  { id: 'about', label: 'About', path: '/about' },
];

const SYSTEM_SECTIONS = [
  {
    title: "Work",
    desc: "Move the day forward.",
    items: ["Map", "Leads", "Calendar", "Tasks", "Library", "Recruit"],
  },
  {
    title: "Perform",
    desc: "Make execution visible.",
    items: ["Leaderboards", "Incentives", "Goals", "Profiles", "Chat"],
  },
  {
    title: "AI",
    desc: "Ask. Decide. Generate.",
    items: ["AI Assistant"],
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

const LEARN_ITEMS = [
  {
    title: "Insights",
    desc: "What to measure. What to change."
  },
  {
    title: "Playbooks",
    desc: "Repeatable setups."
  },
  {
    title: "Customer Stories",
    desc: "Real rollouts. Real results."
  },
  {
    title: "Guides",
    desc: "Integrations + workflows."
  },
  {
    title: "Compare",
    desc: "Side-by-side comparisons."
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 pointer-events-auto"
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Navigation Items */}
        <div className={`flex gap-8 px-4 py-3.5 font-['Inter'] text-[12px] uppercase tracking-[0.15em] font-medium relative ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
          {MENU_ITEMS.map((item) => (
            <Link 
              href={item.path}
              key={item.id}
              onClick={() => setActiveDropdown(null)}
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
                        <h3 className={`font-['Inter'] text-[24px] lg:text-[28px] leading-[1.2] font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                            See what Enzy does—fast.
                        </h3>
                        <div className="mt-4">
                            <Link href="/features" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-2 text-[#19ad7d] text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity group">
                                Explore the system <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    <div className={`hidden md:block w-[1px] shrink-0 bg-gradient-to-b from-transparent via-current to-transparent my-2 ${isLightMode ? 'text-black/10' : 'text-white/10'}`} />

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                        {SYSTEM_SECTIONS.map((section, i) => (
                            <motion.div key={i} variants={itemVariants} className="flex flex-col">
                                <span className={`font-['Inter'] text-[15px] font-semibold mb-1 ${isLightMode ? 'text-black' : 'text-white'}`}>
                                    {section.title}
                                </span>
                                <span className={`text-[13px] mb-4 leading-snug ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                                    {section.desc}
                                </span>
                                <ul className="flex flex-col gap-1.5">
                                    {section.items.map((item, j) => (
                                        <li key={j}>
                                            <Link 
                                                href={`/features#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                onClick={() => setActiveDropdown(null)}
                                                className={`group flex items-center justify-between px-3 py-2 -ml-3 rounded-lg border transition-all duration-300 ${isLightMode ? 'border-transparent hover:bg-black/5 hover:border-black/5' : 'border-transparent hover:bg-white/[0.06] hover:border-white/10'}`}
                                            >
                                                <span className={`font-['Inter'] text-[13px] font-medium transition-colors ${isLightMode ? 'text-black/80 group-hover:text-black' : 'text-white/80 group-hover:text-white'}`}>{item}</span>
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
                        <h3 className={`font-['Inter'] text-[24px] lg:text-[28px] leading-[1.2] font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                            Built for action. Built to scale.
                        </h3>
                        <div className="mt-4">
                            <Link href="/solutions" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-2 text-[#19ad7d] text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity group">
                                Explore solutions <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                            </Link>
                        </div>
                    </motion.div>

                    <div className={`hidden md:block w-[1px] shrink-0 bg-gradient-to-b from-transparent via-current to-transparent my-2 ${isLightMode ? 'text-black/10' : 'text-white/10'}`} />

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                        {USE_CASES.map((uc, i) => (
                            <motion.div key={i} variants={itemVariants} className="flex flex-col">
                                <span className={`font-['Inter'] text-[15px] font-semibold mb-1 ${isLightMode ? 'text-black' : 'text-white'}`}>
                                    {uc.title}
                                </span>
                                <span className={`text-[13px] mb-4 leading-snug ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                                    {uc.desc}
                                </span>
                                <ul className="flex flex-col gap-1.5">
                                    <li>
                                        <Link 
                                            href={`/solutions#${uc.title.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={() => setActiveDropdown(null)}
                                            className={`group flex items-center justify-between px-3 py-2 -ml-3 rounded-lg border transition-all duration-300 ${isLightMode ? 'border-transparent hover:bg-black/5 hover:border-black/5' : 'border-transparent hover:bg-white/[0.06] hover:border-white/10'}`}
                                        >
                                            <span className={`font-['Inter'] text-[13px] font-medium transition-colors ${isLightMode ? 'text-black/80 group-hover:text-black' : 'text-white/80 group-hover:text-white'}`}>Learn more</span>
                                            <ArrowRight size={14} className="text-[#19ad7d] group-hover:translate-x-1 transition-all duration-300" strokeWidth={2.5} />
                                        </Link>
                                    </li>
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                  </div>
                )}

                {activeDropdown === 'resources' && (
                  <div className="p-8 lg:p-10 w-[90vw] lg:w-[1000px] max-w-[1000px] flex flex-col md:flex-row gap-10 lg:gap-16">
                    <motion.div variants={itemVariants} className="w-full md:w-[280px] shrink-0 flex flex-col gap-4">
                        <span className={`uppercase tracking-[0.2em] text-[11px] font-bold ${isLightMode ? 'text-black/40' : 'text-white/40'}`}>Overview</span>
                        <h3 className={`font-['Inter'] text-[24px] lg:text-[28px] leading-[1.2] font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                            Learn the playbooks that work.
                        </h3>
                        <div className="mt-4">
                            <Link href="/resources" onClick={() => setActiveDropdown(null)} className="inline-flex items-center gap-2 text-[#19ad7d] text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity group">
                                Browse resources <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                            </Link>
                        </div>
                    </motion.div>

                    <div className={`hidden md:block w-[1px] shrink-0 bg-gradient-to-b from-transparent via-current to-transparent my-2 ${isLightMode ? 'text-black/10' : 'text-white/10'}`} />

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                        {LEARN_ITEMS.map((item, i) => (
                            <motion.div key={i} variants={itemVariants} className="flex flex-col">
                                <span className={`font-['Inter'] text-[15px] font-semibold mb-1 ${isLightMode ? 'text-black' : 'text-white'}`}>
                                    {item.title}
                                </span>
                                <span className={`text-[13px] mb-4 leading-snug ${isLightMode ? 'text-black/60' : 'text-white/60'}`}>
                                    {item.desc}
                                </span>
                                <ul className="flex flex-col gap-1.5">
                                    <li>
                                        <Link 
                                            href={`/resources#${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={() => setActiveDropdown(null)}
                                            className={`group flex items-center justify-between px-3 py-2 -ml-3 rounded-lg border transition-all duration-300 ${isLightMode ? 'border-transparent hover:bg-black/5 hover:border-black/5' : 'border-transparent hover:bg-white/[0.06] hover:border-white/10'}`}
                                        >
                                            <span className={`font-['Inter'] text-[13px] font-medium transition-colors ${isLightMode ? 'text-black/80 group-hover:text-black' : 'text-white/80 group-hover:text-white'}`}>Learn more</span>
                                            <ArrowRight size={14} className="text-[#19ad7d] group-hover:translate-x-1 transition-all duration-300" strokeWidth={2.5} />
                                        </Link>
                                    </li>
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile header controls (theme + menu) */}
      <div className="md:hidden relative z-[60] flex items-center gap-2 pointer-events-auto">
        <button
          onClick={toggleTheme}
          className={`p-2.5 transition-colors active:scale-95 ${
            isLightMode ? "text-black/80 hover:text-black" : "text-white/85 hover:text-white"
          }`}
          aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
        >
          {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`relative p-2.5 rounded-xl pointer-events-auto transition-transform active:scale-95 liquid-glass ${
            isLightMode ? "text-black shadow-sm" : "text-white"
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
            className={`fixed inset-0 z-[55] md:hidden pointer-events-auto overflow-y-auto ${
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
                  <div className="flex items-center justify-between w-full py-6 group">
                    <Link 
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-['Inter'] text-2xl font-medium tracking-[0.1em] uppercase hover:text-[#19ad7d] active:text-[#19ad7d] transition-colors flex-1 ${
                        isLightMode ? 'text-black/90' : 'text-white/90'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.id !== 'about' && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveMobileDropdown(activeMobileDropdown === item.id ? null : item.id);
                        }}
                        className={`p-2 -mr-2 hover:text-[#19ad7d] transition-colors ${
                          isLightMode ? 'text-black/40 hover:text-black' : 'text-white/40 hover:text-white'
                        }`}
                      >
                        <motion.div
                          animate={{ rotate: activeMobileDropdown === item.id ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <ChevronDown size={20} />
                        </motion.div>
                      </button>
                    )}
                  </div>

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
                                    <p className={`text-[15px] font-['Inter'] leading-snug mb-3 ${isLightMode ? 'text-black/80' : 'text-white/80'}`}>See what Enzy does—fast.</p>
                                    <Link href="/features" onClick={() => setMobileMenuOpen(false)} className="text-[#19ad7d] text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
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
                                                href={`/features#${subitem.toLowerCase().replace(/\s+/g, '-')}`}
                                                onClick={() => {
                                                    setMobileMenuOpen(false);
                                                    setActiveMobileDropdown(null);
                                                }}
                                                className={`group flex items-center justify-between px-3 py-2.5 mb-1.5 rounded-md border transition-all duration-300 ${
                                                    isLightMode 
                                                        ? 'bg-black/[0.03] border-black/5 hover:bg-black/[0.08] hover:border-[#19ad7d]/30' 
                                                        : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-[#19ad7d]/30'
                                                }`}
                                            >
                                                <span className={`text-[14px] font-semibold font-['Inter'] ${isLightMode ? 'text-black/90' : 'text-white/90'}`}>{subitem}</span>
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
                                    <p className={`text-[15px] font-['Inter'] leading-snug mb-3 ${isLightMode ? 'text-black/80' : 'text-white/80'}`}>Built for action. Built to scale.</p>
                                    <Link href="/solutions" onClick={() => setMobileMenuOpen(false)} className="text-[#19ad7d] text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        Explore solutions <ArrowRight size={12} />
                                    </Link>
                                </motion.div>

                              {USE_CASES.map((uc, j) => (
                                <motion.div 
                                  key={j}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.05 + 0.1 }}
                                >
                                    <div className={`uppercase tracking-[0.2em] text-[10px] font-bold mb-1 ${isLightMode ? 'text-black/40' : 'text-white/30'}`}>{uc.title}</div>
                                    <p className={`text-[13px] mb-3 leading-snug ${isLightMode ? 'text-black/50' : 'text-white/50'}`}>{uc.desc}</p>
                                    <div className="flex flex-col gap-2.5">
                                        <Link 
                                            href={`/solutions#${uc.title.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                setActiveMobileDropdown(null);
                                            }}
                                            className={`group flex items-center justify-between px-3 py-2.5 mb-1.5 rounded-md border transition-all duration-300 ${
                                                isLightMode 
                                                    ? 'bg-black/[0.03] border-black/5 hover:bg-black/[0.08] hover:border-[#19ad7d]/30' 
                                                    : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-[#19ad7d]/30'
                                            }`}
                                        >
                                            <span className={`text-[14px] font-semibold font-['Inter'] ${isLightMode ? 'text-black/90' : 'text-white/90'}`}>Learn more</span>
                                            <ArrowRight size={14} className="text-[#19ad7d] group-hover:translate-x-1 transition-all duration-300" strokeWidth={2.5} />
                                        </Link>
                                    </div>
                                </motion.div>
                              ))}
                            </div>
                          )}

                          {item.id === 'resources' && (
                            <div className={`flex flex-col gap-8 pl-4 border-l ${isLightMode ? 'border-black/10' : 'border-white/10'}`}>
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                    <div className={`uppercase tracking-[0.2em] text-[10px] font-bold mb-2 ${isLightMode ? 'text-black/40' : 'text-white/30'}`}>Overview</div>
                                    <p className={`text-[15px] font-['Inter'] leading-snug mb-3 ${isLightMode ? 'text-black/80' : 'text-white/80'}`}>Learn the playbooks that work.</p>
                                    <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="text-[#19ad7d] text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                        Browse resources <ArrowRight size={12} strokeWidth={2.5} />
                                    </Link>
                                </motion.div>

                              {LEARN_ITEMS.map((item, j) => (
                                <motion.div 
                                  key={j}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.05 + 0.1 }}
                                >
                                    <div className={`uppercase tracking-[0.2em] text-[10px] font-bold mb-1 ${isLightMode ? 'text-black/40' : 'text-white/30'}`}>{item.title}</div>
                                    <p className={`text-[13px] mb-3 leading-snug ${isLightMode ? 'text-black/50' : 'text-white/50'}`}>{item.desc}</p>
                                    <div className="flex flex-col gap-2.5">
                                        <Link 
                                            href={`/resources#${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                setActiveMobileDropdown(null);
                                            }}
                                            className={`group flex items-center justify-between px-3 py-2.5 mb-1.5 rounded-md border transition-all duration-300 ${
                                                isLightMode 
                                                    ? 'bg-black/[0.03] border-black/5 hover:bg-black/[0.08] hover:border-[#19ad7d]/30' 
                                                    : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-[#19ad7d]/30'
                                            }`}
                                        >
                                            <span className={`text-[14px] font-semibold font-['Inter'] ${isLightMode ? 'text-black/90' : 'text-white/90'}`}>Learn more</span>
                                            <ArrowRight size={14} className="text-[#19ad7d] group-hover:translate-x-1 transition-all duration-300" strokeWidth={2.5} />
                                        </Link>
                                    </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}



            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}