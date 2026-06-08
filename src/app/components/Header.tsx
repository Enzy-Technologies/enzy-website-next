"use client";

import React, { useState, useEffect } from 'react';
import { MainNavigation } from "./MainNavigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Wand2, ArrowRight } from "lucide-react";

import { usePathname } from "next/navigation";
import { CTAButton } from "./CTAButton";
import { requestParticlesToggle } from "../lib/particles";

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
      className={`fixed top-0 left-0 right-0 w-full z-[100] transition-[padding] duration-300 pointer-events-auto ${isScrolled ? 'pb-2 lg:pb-3 pt-[calc(var(--safe-top)+0.5rem)] lg:pt-[calc(var(--safe-top)+0.75rem)]' : 'pb-3 lg:pb-5 pt-[calc(var(--safe-top)+0.75rem)] lg:pt-[calc(var(--safe-top)+1.25rem)]'}`}
    >
      {/* Backdrop layer — transparent at the top of the page, liquid-glass once
          scrolled past 20px. It starts BELOW the status-bar/Dynamic Island zone
          (top:var(--safe-top)) instead of top:0, so the glass never covers that
          strip — live page content shows behind the island (clock/battery float
          on top) instead of the glass slamming it opaque. On desktop --safe-top
          is 0, so the glass fills the header top as before.
          Mobile gets a floating pill (inset sides, rounded, full border); on lg+
          it resets to an edge-to-edge bar with only a bottom border, no rounding. */}
      <div
        style={{ boxShadow: "var(--header-shadow)" }}
        className={`absolute left-2.5 right-2.5 lg:left-0 lg:right-0 bottom-0 top-[var(--safe-top)] pointer-events-none border lg:border-x-0 lg:border-t-0 rounded-2xl lg:rounded-none transform-gpu will-change-[opacity] transition-[opacity,border-color] duration-300 ${
          isScrolled
            ? "liquid-glass opacity-100 border-white/20"
            : "bg-transparent opacity-0 border-transparent"
        }`}
      />
      <div className="relative flex items-center justify-between w-full px-4 max-w-7xl mx-auto">
        <div className="flex-1 flex justify-start order-1 pl-2 lg:pl-0">
          <Link href="/" className="z-50 relative transition-transform duration-300 hover:scale-105 flex items-center">
            <Image
              src="/enzy-wordmark.svg"
              alt="Enzy Logo"
              width={220}
              height={40}
              priority
              className="h-6 lg:h-9 w-auto brightness-0 dark:invert dark:brightness-0"
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
              className="hidden lg:inline-flex items-center font-inter text-[13px] font-semibold tracking-tight pointer-events-auto z-50 transition-colors text-black/70 hover:text-black dark:text-white/75 dark:hover:text-white"
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
              requestParticlesToggle(rect.left + rect.width / 2, rect.top + rect.height / 2);
            }}
            className="hidden lg:flex items-center justify-center w-[36px] h-[36px] rounded-full border backdrop-blur-md transition-colors pointer-events-auto z-50 border-black/20 bg-black/5 hover:bg-black/10 text-black dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white"
            aria-label="Toggle pixels"
            title="Toggle pixels"
          >
            <Wand2 size={18} />
          </button>

          <button
            onClick={toggleTheme}
            className="hidden lg:flex items-center justify-center w-[36px] h-[36px] rounded-full border backdrop-blur-md transition-colors pointer-events-auto z-50 border-black/20 bg-black/5 hover:bg-black/10 text-black dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white"
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
          className={`lg:hidden fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] right-5 z-[100] pointer-events-none transition-opacity duration-300 ${
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