"use client";

import React, { useState, useEffect } from 'react';
import { MainNavigation } from "./MainNavigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Wand2 } from "lucide-react";

import { usePathname } from "next/navigation";
import { CTAButton } from "./CTAButton";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isLightMode, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isLandingPage = pathname?.startsWith("/lp/");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call it once to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-[100] transition-[padding] duration-300 pointer-events-auto ${isScrolled ? 'py-4' : 'py-6'}`}
    >
      <div 
        className={`absolute inset-0 pointer-events-none rounded-none border-x-0 border-t-0 border-b shadow-none transform-gpu will-change-[opacity] transition-[opacity,border-color,background-color] duration-300 ${
          isScrolled
            ? "liquid-glass opacity-100 border-white/20"
            : "bg-transparent opacity-0 border-transparent"
        }`}
      />
      <div className="relative flex items-center justify-between w-full px-4 max-w-7xl mx-auto">
        <div className="flex-1 flex justify-start">
          <Link href="/" className="z-50 relative transition-transform duration-300 hover:scale-105 flex items-center">
            <Image
              src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Enzy_Logo_2026_Wordmark.svg"
              alt="Enzy Logo"
              width={220}
              height={40}
              priority
              className={`h-8 lg:h-10 w-auto ${isLightMode ? 'brightness-0' : 'invert brightness-0'}`}
            />
          </Link>
        </div>
        
        {/* Desktop Nav Items and mobile menu */}
        <div className="flex-shrink-0 flex justify-center">
          {!isLandingPage && <MainNavigation />}
        </div>

        <div className={`flex-1 flex justify-end ${isLandingPage ? 'flex' : 'hidden lg:flex'} relative items-center gap-2 md:gap-4`}>
          <button 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              window.dispatchEvent(new CustomEvent("enzy-pixel-sphere", { detail: { triggerClick: true, x: cx, y: cy, force: true } }));
            }}
            className={`flex items-center justify-center w-[38px] h-[38px] rounded-full border backdrop-blur-md transition-colors pointer-events-auto z-50 ${isLightMode ? 'border-black/20 bg-black/5 hover:bg-black/10 text-black' : 'border-white/20 bg-white/5 hover:bg-white/10 text-white'}`}
            aria-label="Gather pixels"
            title="Gather pixels"
          >
            <Wand2 size={18} />
          </button>

          <button 
            onClick={toggleTheme}
            className={`flex items-center justify-center w-[38px] h-[38px] rounded-full border backdrop-blur-md transition-colors pointer-events-auto z-50 ${isLightMode ? 'border-black/20 bg-black/5 hover:bg-black/10 text-black' : 'border-white/20 bg-white/5 hover:bg-white/10 text-white'}`}
            aria-label="Toggle theme"
          >
            {isMounted ? (isLightMode ? <Moon size={18} /> : <Sun size={18} />) : <div className="w-[18px] h-[18px]" />}
          </button>

          {!isLandingPage && (
            <CTAButton href="/about" variant="secondary" className="z-50">
              Learn more
            </CTAButton>
          )}
        </div>
      </div>
    </header>
  );
}