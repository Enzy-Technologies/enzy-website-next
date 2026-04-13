import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import imgInnerScreen from "figma:asset/2b19803f6c5e3c26b39f607fe129d1919300df81.png";
import userScreen from "figma:asset/61beea51a9bcfe1555d356d42bbc0ef63df8b0d3.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "./ThemeProvider";

const SCREEN_IMAGES = [
  imgInnerScreen,
  userScreen,
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

export function HeroSection() {
  const { isLightMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const nextScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentScreenIndex((prev) => (prev + 1) % SCREEN_IMAGES.length);
  };

  const prevScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentScreenIndex((prev) => (prev - 1 + SCREEN_IMAGES.length) % SCREEN_IMAGES.length);
  };

  return (
    <section className="relative flex flex-col items-center w-full px-4 pt-8 md:pt-16 lg:pt-24 max-w-7xl mx-auto pointer-events-none">
      {/* Header Content */}
      <div className="flex flex-col items-center w-full gap-6 md:gap-10">
        <h1 className={`font-['IvyOra_Text'] font-medium text-5xl md:text-7xl lg:text-[110px] leading-[0.95] tracking-[-0.04em] text-center pointer-events-auto max-w-[1200px] mx-auto px-4 ${isLightMode ? 'text-[#0b0f14]' : 'text-[#f5f7fa]'}`}>
          The Operating System for<br />
          High-Performance<br />
          Sales Teams
        </h1>
        
        {/* Brands Partnerships Section */}
        <div className="w-full mt-2 mb-4 md:mt-4 md:mb-8 z-20 flex flex-col items-center pointer-events-auto">
          <p className={`font-['Inter'] mb-6 md:mb-10 uppercase tracking-widest text-center ${isLightMode ? 'text-black/100' : 'text-white/50'} text-[20px]`}>
            Enzy is a real-time performance system that helps sales teams operate, compete, and win every day.
          </p>
          
          <div className="flex flex-col gap-5 md:gap-8 w-full max-w-[100vw] overflow-visible relative pt-4 pb-6 md:pt-12 md:pb-16" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            {/* Row 1 (Scrolls Left) */}
            <motion.div
              className="flex items-center whitespace-nowrap min-w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
            >
              {[...HERO_LOGOS, ...HERO_LOGOS].map((logoUrl, i) => (
                <div 
                  key={`row1-${i}`} 
                  className={`marquee-logo-item relative flex items-center justify-center transition-all duration-500 mr-12 md:mr-24 opacity-60 hover:opacity-100 ${isLightMode ? 'brightness-0' : 'brightness-0 invert'}`}
                >
                  <img 
                    src={logoUrl} 
                    alt={`Partner Logo ${i}`} 
                    className="max-h-6 md:max-h-10 w-auto object-contain pointer-events-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
            
            {/* Row 2 (Scrolls Right) */}
            <motion.div
              className="flex items-center whitespace-nowrap min-w-max"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
            >
              {[...HERO_LOGOS].reverse().concat([...HERO_LOGOS].reverse()).map((logoUrl, i) => (
                <div 
                  key={`row2-${i}`} 
                  className={`marquee-logo-item relative flex items-center justify-center transition-all duration-500 mr-12 md:mr-24 opacity-60 hover:opacity-100 ${isLightMode ? 'brightness-0' : 'brightness-0 invert'}`}
                >
                  <img 
                    src={logoUrl} 
                    alt={`Partner Logo ${i}`} 
                    className="max-h-6 md:max-h-10 w-auto object-contain pointer-events-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Search/URL input */}
        <div className={`backdrop-blur-md rounded-2xl border w-full max-w-3xl overflow-hidden relative group z-30 mt-4 md:mt-8 pointer-events-auto ${isLightMode ? 'bg-black/5 border-black/20 shadow-[0_8px_32px_rgba(0,0,0,0.05)]' : 'bg-[#11161d]/24 border-[#666]'}`}>
          <div className="flex items-center w-full p-2 pl-4 md:pl-6">
            <input 
              type="url" 
              placeholder="Enter your url to see what enzy could look like for you..."
              className={`flex-1 bg-transparent font-['Roboto_Mono'] text-[10px] md:text-sm uppercase tracking-tight outline-none w-full truncate ${isLightMode ? 'text-[#0b0f14] placeholder:text-black/40' : 'text-[#f5f7fa] placeholder:text-white/40'}`}
              readOnly
            />
            <button 
              type="button" 
              className="ml-2 md:ml-4 shrink-0 px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-[linear-gradient(189.6deg,rgba(25,173,125,0.8)_25.1%,rgba(20,144,103,0.8)_64.2%)] border border-white/10 text-white font-['Inter'] font-medium text-xs md:text-sm transition-opacity hover:opacity-90 shadow-[0_4px_12px_rgba(25,173,125,0.2)]"
            >
              Preview
            </button>
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
          className="relative w-full mt-4 md:mt-8 lg:mt-12 transition-all duration-300 pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
          <motion.div
            animate={{
              y: isHovered ? -200 : 0,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mx-auto md:hidden cursor-pointer"
            style={{
              width: 'min(80vw, 375px)',
              aspectRatio: '375 / 812',
            }}
            onClick={() => setIsHovered(!isHovered)}
          >
            {/* Phone Frame */}
            <div
              className={`relative w-full h-full rounded-[36px] border-[3px] border-solid overflow-hidden ${isLightMode ? 'border-black/20 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]' : 'border-white/50 bg-black'}`}
              style={{ 
                boxShadow: isHovered 
                  ? (isLightMode ? '0px -8px 40px 0px rgba(0, 0, 0, 0.1), 0px 0px 60px 0px rgba(25, 173, 125, 0.15)' : '0px -8px 40px 0px rgba(0, 0, 0, 0.3), 0px 0px 60px 0px rgba(25, 173, 125, 0.2)') 
                  : (isLightMode ? '0px -4px 20px 0px rgba(0, 0, 0, 0.05)' : '0px -4px 20px 0px rgba(0, 0, 0, 0.2)'),
                transition: 'box-shadow 0.4s ease-out'
              }}
            >
              {/* Notch */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[28px] rounded-b-[20px] z-10 ${isLightMode ? 'bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)]' : 'bg-black'}`} />
              
              {/* Inner Screen */}
              <div className={`absolute inset-[12px] rounded-[24px] overflow-hidden ${isLightMode ? 'bg-white shadow-[inset_0_4px_12px_rgba(0,0,0,0.05)]' : 'bg-black'}`}>
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
                      onClick={(e) => { e.stopPropagation(); setCurrentScreenIndex(i); }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === currentScreenIndex ? 'bg-[#19ad7d] w-4' : 'bg-white/40 w-1.5'}`} 
                      aria-label={`Go to screen ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}