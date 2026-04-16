"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { useTheme } from "./components/ThemeProvider";
import { QuickJumpFAB } from "./components/QuickJumpFAB";

const FEATURES_DATA = [
  { 
    id: 'leaderboards', 
    title: 'Leaderboards', 
    desc: 'Real-time rankings to keep your team motivated and engaged. Drive performance with transparent, gamified metrics.', 
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFkZXJib2FyZCUyMGRhc2hib2FyZCUyMGRhcmt8ZW58MXx8fHwxNzc1Njc3NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 'profiles', 
    title: 'Profiles', 
    desc: 'Comprehensive employee profiles. Showcase achievements, track progress, and celebrate milestones in one unified dashboard.', 
    img: 'https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZSUyMGRhcmslMjBVSXxlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 'competitions', 
    title: 'Competitions', 
    desc: 'Customizable challenges and incentives. Foster a culture of excellence by rewarding top performers with dynamic prize structures.', 
    img: 'https://images.unsplash.com/photo-1642104744809-14b986179927?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wZXRpdGlvbiUyMHdpbm5lciUyMHRyb3BoeSUyMGRhcmt8ZW58MXx8fHwxNzc1Njc3NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 'messaging', 
    title: 'Messaging', 
    desc: 'Seamless organizational communication. Keep everyone aligned with instant, secure, and integrated team channels.', 
    img: 'https://images.unsplash.com/photo-1591467454366-fb32b72b20e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0JTIwbWVzc2FnaW5nJTIwYXBwJTIwZGFya3xlbnwxfHx8fDE3NzU2Nzc0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 'enzy-assistant', 
    title: 'Enzy Assistant', 
    desc: 'AI-powered productivity. Access intelligent insights, automate routine tasks, and get instant answers right within your workflow.', 
    img: 'https://images.unsplash.com/photo-1695144244472-a4543101ef35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFzc2lzdGFudCUyMHRlY2glMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 'media-library', 
    title: 'Media Library', 
    desc: 'Centralized asset management. Store, organize, and distribute approved marketing materials and training content effortlessly.', 
    img: 'https://images.unsplash.com/photo-1650338996177-674884e51683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpYSUyMGxpYnJhcnklMjBmb2xkZXIlMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 'digital-card', 
    title: 'Digital Business Card', 
    desc: 'Modern networking solutions. Share contact information instantly via QR codes with sleek, customizable digital profiles.', 
    img: 'https://images.unsplash.com/photo-1726607424623-6d9fee974241?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYnVzaW5lc3MlMjBjYXJkJTIwcGhvbmUlMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 'customer-surveys', 
    title: 'Customer Surveys', 
    desc: 'Actionable feedback collection. Gather insights directly from your audience to refine strategies and improve satisfaction.', 
    img: 'https://images.unsplash.com/photo-1702479743967-3dcccd4a671d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHN1cnZleSUyMGZvcm0lMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 'report-builder', 
    title: 'Report Builder', 
    desc: 'Advanced analytics and visualization. Create dynamic, comprehensive reports that turn raw data into strategic intelligence.', 
    img: 'https://images.unsplash.com/photo-1587400563263-e77a5590bfe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwcmVwb3J0JTIwZ3JhcGglMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 'canvassing', 
    title: 'Canvassing & Scheduling', 
    desc: 'Intelligent territory management. Optimize field operations and streamline appointment setting with integrated map tools.', 
    img: 'https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHNjaGVkdWxpbmclMjBkYXJrJTIwYXBwfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 'recruiting', 
    title: 'Recruiting & Onboarding', 
    desc: 'End-to-end talent acquisition. Manage candidate pipelines and deliver flawless orientation experiences for new hires.', 
    img: 'https://images.unsplash.com/photo-1719400471588-575b23e27bd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWNydWl0aW5nJTIwb25ib2FyZGluZyUyMHRlY2glMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080' 
  },
  { 
    id: 'weather-maps', 
    title: 'Weather Maps', 
    desc: 'Real-time environmental conditions. Integrate live meteorological data to safely plan events and field activities.', 
    img: 'https://images.unsplash.com/photo-1697660372326-ebe9ca4095a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwbWFwJTIwcmFkYXIlMjBkYXJrfGVufDF8fHx8MTc3NTY3NzQxOXww&ixlib=rb-4.1.0&q=80&w=1080' 
  }
];

function FeatureItem({ feature, index }: { feature: typeof FEATURES_DATA[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const { isLightMode } = useTheme();

  // Parallax effect values
  const yImage = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  // Alternate layout direction based on index
  const isEven = index % 2 === 0;

  return (
    <div id={feature.id} ref={ref} className={`relative w-full min-h-[50vh] flex items-center py-16 md:py-20 overflow-hidden border-b ${isLightMode ? 'border-black/5' : 'border-white/5'} last:border-none group transition-colors duration-500`}>
      <div className={`w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 lg:gap-16`}>
        
        {/* Text Side */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex flex-col relative z-20 w-full"
        >
          <div className="text-[#19ad7d] font-['Roboto_Mono'] text-sm tracking-widest mb-6 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-[#19ad7d]" /> {(index + 1).toString().padStart(2, '0')}
          </div>
          <h2 className={`font-['IvyOra_Text'] font-medium text-4xl md:text-5xl lg:text-6xl mb-6 leading-[1.1] tracking-[-2px] transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
            {feature.title}
          </h2>
          <p className={`font-['Inter'] text-lg md:text-xl leading-relaxed max-w-lg transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/50'}`}>
            {feature.desc}
          </p>
        </motion.div>

        {/* Image Side with Parallax Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 w-full relative"
        >
          {/* Glassmorphism Container */}
          <div className={`w-full aspect-[4/3] md:aspect-[4/5] lg:aspect-[4/3] relative rounded-3xl overflow-hidden border shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-white/40' : 'border-white/10 bg-[#11161d]/40'}`}>
            <motion.div 
              style={{ y: yImage }}
              className="absolute -inset-[20%] w-[140%] h-[140%]"
            >
              <ImageWithFallback 
                src={feature.img} 
                alt={feature.title} 
                className={`w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-1000 ease-out ${isLightMode ? 'opacity-70 group-hover:opacity-100' : 'opacity-50 group-hover:opacity-80'}`}
              />
              {/* Overlays for depth */}
              <div className={`absolute inset-0 bg-gradient-to-tr transition-colors duration-500 ${isLightMode ? 'from-white/40 via-white/20 to-transparent' : 'from-[#0b0f14] via-[#0b0f14]/40 to-transparent'}`} />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,173,125,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export function Features() {
  const { isLightMode } = useTheme();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <>
      <section className="relative flex flex-col items-center justify-start w-full px-4 pt-8 md:pt-16 lg:pt-24 pb-8 md:pb-12 max-w-7xl mx-auto z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className={`px-5 py-2 rounded-full border backdrop-blur-sm text-xs font-bold tracking-[0.2em] uppercase mb-8 transition-colors duration-500 ${isLightMode ? 'border-black/10 bg-black/5 text-black/60' : 'border-white/10 bg-white/5 text-white/60'}`}>
            Platform Overview
          </div>
          <h1 className={`font-['IvyOra_Text'] font-medium text-5xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-[-2px] text-center max-w-4xl transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-[#f5f7fa]'}`}>
            Unleash Your <br /> <span className="text-[#19ad7d]">Capabilities</span>
          </h1>
          <p className={`font-['Inter'] text-base md:text-lg mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-black/60' : 'text-white/50'}`}>
            Discover the powerful tools that make Enzy the standard for modern interactive experiences. Scroll to explore every feature.
          </p>
        </motion.div>
      </section>

      {/* Feature Sections */}
      <div className="w-full relative z-20 pb-32">
        {FEATURES_DATA.map((feature, i) => (
          <FeatureItem key={feature.id} feature={feature} index={i} />
        ))}
      </div>

      <QuickJumpFAB
        title="Quick Jump"
        items={FEATURES_DATA.map((f, i) => ({ id: f.id, label: f.title, meta: (i + 1).toString().padStart(2, "0") }))}
        onJump={(id) => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      />
    </>
  );
}