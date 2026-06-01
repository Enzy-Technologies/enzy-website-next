"use client";

import React, { useState, useEffect } from 'react';
import { MainNavigation } from "./MainNavigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Wand2, ArrowRight } from "lucide-react";

import { usePathname } from "next/navigation";
import { CTAButton } from "./CTAButton";

const LOGIN_HREF = "https://app.enzy.co/login";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [anyDemoCtaVisible, setAnyDemoCtaVisible] = useState(true);
  const { isLightMode, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isLandingPage = pathname?.startsWith("/lp/");
  const isBookDemoPage = pathname === "/book-a-demo";

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

  // Hide the floating "Book a demo" button whenever any other Book-a-demo CTA
  // on the page is visible in the viewport. We watch every element marked with
  // the `book-demo-cta-marker` class via IntersectionObserver, and re-scan the
  // DOM on route changes (when components mount/unmount) and on resize.
  useEffect(() => {
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setAnyDemoCtaVisible(visible.size > 0);
      },
      { threshold: 0.01 }
    );

    const scan = () => {
      observer.disconnect();
      visible.clear();
      const targets = document.querySelectorAll<HTMLElement>(".book-demo-cta-marker");
      if (targets.length === 0) {
        // No CTAs on the page — show the floating button so users still
        // have a way to book a demo.
        setAnyDemoCtaVisible(false);
        return;
      }
      // The observer will fire its first callbacks shortly after .observe()
      // and populate the `visible` set with the initial intersection state.
      targets.forEach((el) => observer.observe(el));
    };

    scan();
    // Re-scan after a short delay in case CTAs render asynchronously (e.g.
    // sections imported via next/dynamic below the fold).
    const t = window.setTimeout(scan, 600);
    window.addEventListener("resize", scan);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", scan);
      observer.disconnect();
    };
  }, [pathname]);

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
              src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/Enzy%20Logo/Enzy_Logo_2026_Wordmark.svg"
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
          {/* Desktop right-cluster ordering (left → right):
              Log In · Book a Demo · Pixel sphere · Theme toggle.
              The two icon buttons live to the RIGHT of the primary CTA so
              the Book-a-Demo pill stays visually anchored to the centered
              navigation, with the utility chrome trailing it. */}
          {!isLandingPage && (
            <Link
              href={LOGIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden lg:inline-flex items-center font-inter text-[13px] font-semibold tracking-tight pointer-events-auto z-50 transition-colors ${
                isLightMode
                  ? "text-black/70 hover:text-black"
                  : "text-white/75 hover:text-white"
              }`}
            >
              Log In
            </Link>
          )}

          {!isLandingPage && (
            <CTAButton
              href="/book-a-demo"
              variant="primary"
              className="book-demo-cta-marker hidden lg:inline-flex z-50 h-10 pl-5 pr-4 gap-2 text-[13px] font-semibold rounded-full"
            >
              Book a Demo
              <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
            </CTAButton>
          )}

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
        </div>
      </div>

      {/* Floating Book a Demo (mobile only). Appears in the bottom-right
          corner only when no other "Book a demo" CTA is visible on screen.
          Suppressed on the book-demo page itself, where the form is the
          primary action and a floating CTA would be redundant. */}
      {!isLandingPage && !isBookDemoPage && (
        <div
          aria-hidden={anyDemoCtaVisible}
          className={`lg:hidden fixed bottom-5 right-5 z-[100] pointer-events-none transition-opacity duration-300 ${
            anyDemoCtaVisible ? "opacity-0 invisible" : "opacity-100 visible"
          }`}
        >
          <CTAButton
            href="/book-a-demo"
            variant="primary"
            className="shadow-lg shadow-[#19ad7d]/30 pointer-events-auto h-10 pl-5 pr-4 gap-2 text-[13px] font-semibold rounded-full"
          >
            Book a Demo
            <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
          </CTAButton>
        </div>
      )}
    </header>
  );
}