"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";
import imgInnerScreen from "@/assets/2b19803f6c5e3c26b39f607fe129d1919300df81.png";
import userScreen from "@/assets/61beea51a9bcfe1555d356d42bbc0ef63df8b0d3.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "./ThemeProvider";

const SCREEN_IMAGES = [
  imgInnerScreen.src,
  userScreen.src,
  "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwdGVjaCUyMGRhc2hib2FyZCUyMFVJfGVufDF8fHx8MTc3NTU4OTg5OHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1770012977129-19f856a1f935?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwVUl8ZW58MXx8fHwxNzc1NTg5OTAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
];

const HERO_LOGOS = [
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08e93f61e6330bcf4e263_foxpest.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08e5a7a4765b5ee346ab1_romexpest.webp",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08e3e811ba85123d46adc_havenhub.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68c4729a6080214d0bee190e_Untitled%20(470%20x%2090%20px)%20(1891%20x%20520%20px).png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08dd1a5b82a5a689be395_winchoice.webp",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08db50cb805e17c39d2ad_proforcepest.webp",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b8b5d68f20b871744635e9_7.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68c47343ec9289ba30088423_9.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68c4734c773169b356937966_11.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68c472777c2a9c63fb5117a6_3.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68c47282ae2e931a5229466f_4.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b8b5fdb6107f11480c8c4d_5.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/68b08111c2e6d5f9674443ae_yllogo.svg",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/669b2b066df43231dc8bdd59_new-logo-web.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/669b2acf64ca930d24f7eab4_logo.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66e3824f31bafe55e898a2dc_11.webp",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66d09af7f06506e2753f9c86_347453294_946834439851674_7275672262835633761_n%20copy.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66870fdbd686e745128cc8ce_flo-energy-white.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/669b2dcc7e37592ea4753ace_Moxie-Pest-Control-Logo-Transparent.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66871064558fde06d1c61393_siegfried-jensen.svg",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66871073eae768d7c043fe60_Official-Horizontal.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/6687114aa00a5ffa6b3bec96_1661955499668-removebg-preview.avif",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/668710822d3fe7df4093cc48_greenixpccom_886359809.svg",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/66e3811e8298a733522c48b3_GR_socialimage%20copy.png",
  "https://cdn.prod.website-files.com/6660c2db319e60fb0a15f269/6696fd7217fea3ef6ec9c7e3_Aptive%20Logo%202021%201.avif"
];

const SUMMARIES = [
  "Boosted sales by 40%",
  "Saved 20 hours a week",
  "Increased ROI by 150%",
  "Streamlined operations",
  "Enhanced team productivity",
  "Scaled revenue 3x",
  "Optimized workflows",
  "Cut costs by 25%",
  "Drove 50% more leads",
  "Improved conversion rates"
];

const HERO_LOGOS_WITH_SUMMARY = HERO_LOGOS.map((url, i) => ({
  url,
  summary: SUMMARIES[i % SUMMARIES.length]
}));

import { CTAButton } from "./CTAButton";

export function HeroSection() {
  const { isLightMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [isPhoneExpanded, setIsPhoneExpanded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const nextScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentScreenIndex((prev) => (prev + 1) % SCREEN_IMAGES.length);
  };

  const prevScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentScreenIndex((prev) => (prev - 1 + SCREEN_IMAGES.length) % SCREEN_IMAGES.length);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!isPhoneExpanded) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPhoneExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPhoneExpanded]);

  const phoneOverlay =
    hasMounted && isPhoneExpanded
      ? createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-[9999] md:hidden pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPhoneExpanded(false)}
            >
              <div className="absolute inset-0 bg-black/60" />

              <div className="absolute top-4 right-4 z-20">
                <CloseButton onClick={() => setIsPhoneExpanded(false)} />
              </div>

              <div className="absolute inset-0 flex items-center justify-center p-6">
                <motion.div
                  layoutId="hero-phone"
                  className="relative"
                  style={{
                    width: "min(92vw, 420px)",
                    aspectRatio: "375 / 812",
                  }}
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className={`relative w-full h-full rounded-[36px] border-[3px] border-solid overflow-hidden ${
                      isLightMode
                        ? "border-black/20 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
                        : "border-white/50 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
                    }`}
                  >
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[28px] rounded-b-[20px] z-10 ${
                        isLightMode ? "bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]" : "bg-black"
                      }`}
                    />

                    <div className={`absolute inset-[12px] rounded-[24px] overflow-hidden ${isLightMode ? "bg-white" : "bg-black"}`}>
                      <AnimatePresence>
                        <motion.div
                          key={currentScreenIndex}
                          initial={{ opacity: 0, scale: 1.02 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="absolute inset-0 w-full h-full"
                        >
                          {SCREEN_IMAGES[currentScreenIndex].startsWith("http") ? (
                            <ImageWithFallback
                              src={SCREEN_IMAGES[currentScreenIndex]}
                              alt={`Dashboard Screen ${currentScreenIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={SCREEN_IMAGES[currentScreenIndex]}
                              alt={`Dashboard Screen ${currentScreenIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      <div className="absolute inset-0 flex items-center justify-between px-2 z-20 pointer-events-none">
                        <button
                          onClick={prevScreen}
                          className="pointer-events-auto p-1.5 rounded-full bg-[#11161d]/60 text-white/90 active:bg-[#19ad7d] active:text-white backdrop-blur-md transition-colors border border-white/10"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextScreen}
                          className="pointer-events-auto p-1.5 rounded-full bg-[#11161d]/60 text-white/90 active:bg-[#19ad7d] active:text-white backdrop-blur-md transition-colors border border-white/10"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-[#11161d]/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 pointer-events-auto">
                        {SCREEN_IMAGES.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentScreenIndex(i);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              i === currentScreenIndex ? "bg-[#19ad7d] w-4" : "bg-white/40 w-1.5"
                            }`}
                            aria-label={`Go to screen ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <>
      <section className="relative flex flex-col items-center w-full px-4 pt-8 md:pt-16 lg:pt-24 max-w-7xl mx-auto pointer-events-none">
        {/* Header Content */}
        <div className="flex flex-col items-center w-full gap-6 md:gap-10">
        <h1 className={`font-['IvyOra_Text'] font-medium leading-[1.1] tracking-[-2px] text-center pointer-events-auto max-w-[1200px] mx-auto ${isLightMode ? 'text-brand-dark' : 'text-brand-light'} text-[32px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[96px] px-[16px] py-[0px] mx-[4px] my-[0px]`}>
          The Operating System<br />
          for High-Performance<br />
          Sales Teams
        </h1>
        
        {/* Brands Partnerships Section */}
        <div className="w-full mt-2 mb-4 md:mt-4 md:mb-8 z-20 flex flex-col items-center pointer-events-auto">
          <p className={`font-['Inter'] tracking-[-0.04em] text-center ${isLightMode ? 'text-black/100' : 'text-white/50'} text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] p-[0px] mx-[24px] mt-[0px] mb-[24px]`}>
            A real-time system to operate, compete, and win every day.
          </p>
          
          <div className="flex flex-col gap-6 md:gap-12 w-full max-w-[100vw] overflow-hidden relative px-[0px] py-[16px]" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            {/* Row 1 (Scrolls Left) */}
            <motion.div
              className="flex items-center whitespace-nowrap min-w-max pt-6 md:pt-8"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
            >
              {[...HERO_LOGOS_WITH_SUMMARY, ...HERO_LOGOS_WITH_SUMMARY].map((logo, i) => (
                <LogoItem 
                  key={`row1-${i}`}
                  logo={logo}
                  index={i}
                  isLightMode={isLightMode}
                  row="top"
                />
              ))}
            </motion.div>
            
            {/* Row 2 (Scrolls Right) */}
            <motion.div
              className="flex items-center whitespace-nowrap min-w-max pb-6 md:pb-8"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
            >
              {[...HERO_LOGOS_WITH_SUMMARY].reverse().concat([...HERO_LOGOS_WITH_SUMMARY].reverse()).map((logo, i) => (
                <LogoItem 
                  key={`row2-${i}`}
                  logo={logo}
                  index={i}
                  isLightMode={isLightMode}
                  row="bottom"
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Search/URL input */}
        <div className={`backdrop-blur-md rounded-2xl border w-full max-w-3xl overflow-hidden relative group z-30 pointer-events-auto ${isLightMode ? 'bg-black/5 border-black/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)]' : 'bg-[#11161d]/24 border-[#666]'} m-[0px]`}>
          <div className="flex items-center w-full pl-[16px] pr-[8px] py-[0px] mx-[0px] my-[8px]">
            <input 
              type="url" 
              placeholder="Enter your URL for a sneak peek"
              className={`flex-1 bg-transparent font-['Roboto_Mono'] text-[10px] md:text-sm uppercase tracking-tight outline-none w-full truncate ${isLightMode ? 'text-brand-dark placeholder:text-black/40' : 'text-brand-light placeholder:text-white/40'}`}
              readOnly
            />
            <CTAButton 
              type="button" 
              className="ml-2 md:ml-4 shrink-0"
            >
              Preview
            </CTAButton>
          </div>
        </div>

        {/* Device Mockup - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 50, zIndex: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            zIndex: isHovered ? 50 : 10 
          }}
          transition={{ 
            delay: 0.4, 
            duration: 1,
            zIndex: { delay: isHovered ? 0 : 0.6 }
          }}
          className="relative w-full transition-all duration-300 pointer-events-auto m-[0px]"
          onMouseEnter={() => { if (window.innerWidth > 768) setIsHovered(true); }}
          onMouseLeave={() => { if (window.innerWidth > 768) setIsHovered(false); }}
        >
          {/* Desktop/Tablet - iPad */}
          <motion.div
            animate={{
              y: isHovered ? -300 : 0,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mx-auto hidden md:block cursor-pointer"
            style={{
              width: 'min(90vw, 900px)',
              aspectRatio: '907 / 644',
            }}
            onClick={() => setIsHovered(!isHovered)}
          >
            {/* iPad Frame */}
            <div
              className={`relative w-full h-full rounded-[24px] lg:rounded-[32px] border-2 lg:border-[3px] border-solid overflow-hidden group/screen ${isLightMode ? 'border-black/20 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]' : 'border-white/50 bg-black'}`}
              style={{ 
                boxShadow: isHovered 
                  ? (isLightMode ? '0px -8px 40px 0px rgba(0, 0, 0, 0.1), 0px 0px 60px 0px rgba(25, 173, 125, 0.15)' : '0px -8px 40px 0px rgba(0, 0, 0, 0.3), 0px 0px 60px 0px rgba(25, 173, 125, 0.2)')
                  : (isLightMode ? '0px -4px 20px 0px rgba(0, 0, 0, 0.05)' : '0px -4px 20px 0px rgba(0, 0, 0, 0.2)'),
                transition: 'box-shadow 0.4s ease-out'
              }}
            >
              {/* Inner Screen */}
              <div className={`absolute left-1/2 top-[16px] lg:top-[20px] -translate-x-1/2 w-[95%] h-[92%] rounded-[16px] lg:rounded-[20px] overflow-hidden ${isLightMode ? 'bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05)]' : 'bg-black'}`}>
                <AnimatePresence>
                  <motion.div
                    key={currentScreenIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {SCREEN_IMAGES[currentScreenIndex].startsWith('http') ? (
                      <ImageWithFallback 
                        src={SCREEN_IMAGES[currentScreenIndex]} 
                        alt={`Dashboard Screen ${currentScreenIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={SCREEN_IMAGES[currentScreenIndex]}
                        alt={`Dashboard Screen ${currentScreenIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation Controls (Visible on Hover) */}
                <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  <button 
                    onClick={prevScreen} 
                    className="pointer-events-auto p-2 md:p-3 rounded-full bg-[#11161d]/60 text-white hover:bg-[#19ad7d] backdrop-blur-md transition-colors border border-white/10"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextScreen} 
                    className="pointer-events-auto p-2 md:p-3 rounded-full bg-[#11161d]/60 text-white hover:bg-[#19ad7d] backdrop-blur-md transition-colors border border-white/10"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                
                {/* Indicators */}
                <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-[#11161d]/60 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 pointer-events-auto opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300">
                  {SCREEN_IMAGES.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={(e) => { e.stopPropagation(); setCurrentScreenIndex(i); }}
                      className={`h-2 rounded-full transition-all duration-300 ${i === currentScreenIndex ? 'bg-[#19ad7d] w-6' : 'bg-white/40 hover:bg-white/80 w-2'}`} 
                      aria-label={`Go to screen ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile - Phone */}
          <AnimatePresence initial={false}>
            {!isPhoneExpanded ? (
              <motion.div
                layoutId="hero-phone"
                animate={{
                  y: isHovered ? -150 : 10,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                className="relative mx-auto md:hidden cursor-pointer pb-8"
                style={{
                  width: "min(85vw, 375px)",
                  aspectRatio: "375 / 812",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPhoneExpanded(true);
                }}
              >
                {/* Phone Frame */}
                <div
                  className={`relative w-full h-full rounded-[36px] border-[3px] border-solid overflow-hidden ${isLightMode ? "border-black/20 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]" : "border-white/50 bg-black"}`}
                  style={{
                    boxShadow: isHovered
                      ? (isLightMode
                          ? "0px -8px 40px 0px rgba(0, 0, 0, 0.1), 0px 0px 60px 0px rgba(25, 173, 125, 0.15)"
                          : "0px -8px 40px 0px rgba(0, 0, 0, 0.3), 0px 0px 60px 0px rgba(25, 173, 125, 0.2)")
                      : (isLightMode
                          ? "0px -4px 20px 0px rgba(0, 0, 0, 0.05)"
                          : "0px -4px 20px 0px rgba(0, 0, 0, 0.2)"),
                    transition: "box-shadow 0.4s ease-out",
                  }}
                >
                  {/* Notch */}
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[28px] rounded-b-[20px] z-10 ${isLightMode ? "bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]" : "bg-black"}`} />

                  {/* Inner Screen */}
                  <div className={`absolute inset-[12px] rounded-[24px] overflow-hidden ${isLightMode ? "bg-white shadow-[inset_0_4px_12px_rgba(0,0,0,0.05)]" : "bg-black"}`}>
                    <AnimatePresence>
                      <motion.div
                        key={currentScreenIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full"
                      >
                        {SCREEN_IMAGES[currentScreenIndex].startsWith("http") ? (
                          <ImageWithFallback
                            src={SCREEN_IMAGES[currentScreenIndex]}
                            alt={`Dashboard Screen ${currentScreenIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={SCREEN_IMAGES[currentScreenIndex]}
                            alt={`Dashboard Screen ${currentScreenIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls (Always visible on mobile, semi-transparent) */}
                    <div className="absolute inset-0 flex items-center justify-between px-2 z-20 pointer-events-none">
                      <button
                        onClick={prevScreen}
                        className="pointer-events-auto p-1.5 rounded-full bg-[#11161d]/50 text-white/80 active:bg-[#19ad7d] active:text-white backdrop-blur-md transition-colors border border-white/10"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextScreen}
                        className="pointer-events-auto p-1.5 rounded-full bg-[#11161d]/50 text-white/80 active:bg-[#19ad7d] active:text-white backdrop-blur-md transition-colors border border-white/10"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-[#11161d]/50 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 pointer-events-auto">
                      {SCREEN_IMAGES.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentScreenIndex(i);
                          }}
                          className={`h-1.5 rounded-full transition-all duration-300 ${i === currentScreenIndex ? "bg-[#19ad7d] w-4" : "bg-white/40 w-1.5"}`}
                          aria-label={`Go to screen ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div
                className="relative mx-auto md:hidden pb-8"
                style={{ width: "min(85vw, 375px)", aspectRatio: "375 / 812" }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        </div>
      </section>
      {phoneOverlay}
    </>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="pointer-events-auto inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 hover:bg-black/70 active:bg-black/80 transition-colors"
      aria-label="Close"
    >
      <span className="text-[20px] leading-none select-none">×</span>
    </button>
  );
}

function LogoItem({ logo, index, isLightMode, row }: { logo: { url: string, summary: string }, index: number, isLightMode: boolean, row: 'top' | 'bottom' }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const opacity = useMotionValue(0);
  const scale = useMotionValue(0.95);
  const y = useMotionValue(row === 'top' ? 8 : -8);
  const logoOpacity = useMotionValue(0.3);
  const logoScale = useMotionValue(1);

  useAnimationFrame(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const windowCenterX = window.innerWidth / 2;
    // Check if the center of this element is within +/- 150px of the screen center
    const elementCenterX = rect.left + rect.width / 2;
    const distanceToCenter = Math.abs(elementCenterX - windowCenterX);
    
    // Smooth threshold for fading in the center
    const threshold = 150;
    const progress = Math.max(0, Math.min(1, distanceToCenter / threshold));
    const visibility = 1 - progress; // 1 at center, 0 outside
    
    // Smooth interpolation
    opacity.set(opacity.get() + (visibility - opacity.get()) * 0.15);
    scale.set(scale.get() + ((0.95 + visibility * 0.05) - scale.get()) * 0.15);
    
    const targetY = row === 'top' ? (1 - visibility) * 8 : (1 - visibility) * -8;
    y.set(y.get() + (targetY - y.get()) * 0.15);
    
    logoOpacity.set(logoOpacity.get() + ((0.3 + visibility * 0.7) - logoOpacity.get()) * 0.15);
    logoScale.set(logoScale.get() + ((1 + visibility * 0.05) - logoScale.get()) * 0.15);
  });

  return (
    <div 
      ref={ref}
      className="relative flex flex-col items-center justify-center mr-16 md:mr-32"
    >
      <motion.div
        style={{ opacity, scale, y }}
        className={`absolute ${row === 'top' ? '-top-8' : '-bottom-8'} px-3 py-1 rounded-full text-[10px] md:text-[11px] font-['Inter'] font-medium tracking-tight whitespace-nowrap z-10 border backdrop-blur-sm pointer-events-none
          ${isLightMode ? 'bg-white/90 text-[#19ad7d] border-black/10 shadow-[0_2px_8px_rgba(0,0,0,0.05)]' : 'bg-[#11161d]/90 text-[#19ad7d] border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.2)]'}
        `}
      >
        {logo.summary}
      </motion.div>
      <motion.div 
        style={{ opacity: logoOpacity, scale: logoScale }}
        className={`marquee-logo-item relative flex items-center justify-center ${isLightMode ? 'brightness-0' : 'brightness-0 invert'} hover:!opacity-100`}
      >
        <img 
          src={logo.url} 
          alt={`Partner Logo ${index}`} 
          className="max-h-6 md:max-h-10 w-auto object-contain pointer-events-none"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}