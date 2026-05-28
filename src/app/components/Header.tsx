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
      className={`fixed top-0 left-0 right-0 w-full z-[100] transition-[padding] duration-300 pointer-events-auto ${isScrolled ? 'py-2 lg:py-3' : 'py-3 lg:py-5'}`}
    >
      <div
        className={`absolute inset-0 pointer-events-none border-x-0 border-t-0 border-b transform-gpu will-change-[opacity] transition-[opacity,border-color] duration-300 ${
          isScrolled
            ? "liquid-glass opacity-100 border-white/20"
            : "bg-transparent opacity-0 border-transparent"
        }`}
      />
      <div className="relative flex items-center justify-between w-full px-4 max-w-7xl mx-auto">
        <div className="flex-1 flex justify-start order-1">
          <Link href="/" className="z-50 relative transition-transform duration-300 hover:scale-105 flex items-center">
            <Image
              src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Enzy_Logo_2026_Wordmark.svg"
              alt="Enzy Logo"
              width={220}
              height={40}
              priority
              className={`h-6 lg:h-9 w-auto ${isLightMode ? 'brightness-0' : 'invert brightness-0'}`}
            />
          </Link>
        </div>

        {/* Desktop Nav Items (centered) + mobile hamburger row. On mobile, the
            right-side controls column is hidden, so this block falls naturally
            to the right edge via justify-between. */}
        <div className="flex-shrink-0 flex justify-end lg:justify-center order-3 lg:order-2">
          {!isLandingPage && <MainNavigation />}
        </div>

        <div className="flex-1 hidden lg:flex justify-end relative items-center gap-2 md:gap-3 order-2 lg:order-3">
          <button
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              window.dispatchEvent(new CustomEvent("enzy-pixel-sphere", { detail: { triggerClick: true, x: cx, y: cy, force: true } }));
            }}
            className={`hidden lg:flex items-center justify-center w-[36px] h-[36px] rounded-full border backdrop-blur-md transition-colors pointer-events-auto z-50 ${isLightMode ? 'border-black/20 bg-black/5 hover:bg-black/10 text-black' : 'border-white/20 bg-white/5 hover:bg-white/10 text-white'}`}
            aria-label="Gather pixels"
            title="Gather pixels"
          >
            <Wand2 size={18} />
          </button>

          <button
            onClick={toggleTheme}
            className={`hidden lg:flex items-center justify-center w-[36px] h-[36px] rounded-full border backdrop-blur-md transition-colors pointer-events-auto z-50 ${isLightMode ? 'border-black/20 bg-black/5 hover:bg-black/10 text-black' : 'border-white/20 bg-white/5 hover:bg-white/10 text-white'}`}
            aria-label="Toggle theme"
          >
            {isMounted ? (isLightMode ? <Moon size={18} /> : <Sun size={18} />) : <div className="w-[18px] h-[18px]" />}
          </button>

          {!isLandingPage && (
            <CTAButton
              href="/book-demo"
              variant="primary"
              className="hidden lg:inline-flex z-50 h-10 px-5 text-[13px] font-semibold rounded-full"
            >
              Book a demo
            </CTAButton>
          )}
        </div>
      </div>

      {/* Floating Book a Demo on mobile only (bottom right, always visible) */}
      {!isLandingPage && (
        <div className="lg:hidden fixed bottom-5 right-5 z-[100] pointer-events-none">
          <CTAButton
            href="/book-demo"
            variant="primary"
            className="shadow-lg shadow-[#19ad7d]/30 pointer-events-auto h-10 px-5 text-[13px] font-semibold rounded-full"
          >
            Book a demo
          </CTAButton>
        </div>
      )}
    </header>
  );
}