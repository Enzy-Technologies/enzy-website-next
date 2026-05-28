"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BOOK_DEMO_HREF } from "@/app/lib/booking";

import { usePathname } from "next/navigation";

const ENZY_WORDMARK_SRC =
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Enzy_Logo_2026_Wordmark.svg";

const LINK_COLUMN_CLASS =
  "font-inter text-[13px] text-white/55 hover:text-[#19ad7d] transition-colors w-fit";
const COL_TITLE_CLASS =
  "font-inter text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 mb-4";

export function Footer() {
  const pathname = usePathname();
  const isLandingPage = pathname?.startsWith("/lp/");

  return (
    <footer className="relative z-10 w-full bg-black text-white overflow-x-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-14 md:pt-16 pb-8 md:pb-10">
        {/* Wordmark — compact, top-left */}
        <div className="mb-10 md:mb-14">
          {isLandingPage ? (
            <div className="inline-block">
              <Image
                src={ENZY_WORDMARK_SRC}
                alt=""
                width={220}
                height={32}
                className="h-8 md:h-10 w-auto invert brightness-0 contrast-100 pointer-events-none"
              />
            </div>
          ) : (
            <Link
              href="/"
              className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#19ad7d] rounded-sm"
              aria-label="Enzy home"
            >
              <Image
                src={ENZY_WORDMARK_SRC}
                alt=""
                width={220}
                height={32}
                className="h-8 md:h-10 w-auto invert brightness-0 contrast-100 pointer-events-none"
              />
            </Link>
          )}
        </div>

        {/* Multi-column categories */}
        {!isLandingPage && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 md:gap-y-12 mb-14 md:mb-16 lg:mb-20">
          <div className="flex flex-col gap-3">
            <h3 className={COL_TITLE_CLASS}>Product</h3>
            <Link href="/features" className={LINK_COLUMN_CLASS}>
              Features
            </Link>
            <Link href="/solutions" className={LINK_COLUMN_CLASS}>
              Solutions
            </Link>
            <Link href="/resources" className={LINK_COLUMN_CLASS}>
              Resources
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className={COL_TITLE_CLASS}>Company</h3>
            <Link href="/" className={LINK_COLUMN_CLASS}>
              Home
            </Link>
            <Link href="/about" className={LINK_COLUMN_CLASS}>
              About
            </Link>
            <Link href="/partners" className={LINK_COLUMN_CLASS}>
              Partners
            </Link>
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("open-partner-modal"));
              }}
              className={LINK_COLUMN_CLASS}
            >
              Become a Partner
            </button>
            <Link href={BOOK_DEMO_HREF} className={LINK_COLUMN_CLASS}>
              Book a demo
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className={COL_TITLE_CLASS}>Legal</h3>
            <Link href="/terms" className={LINK_COLUMN_CLASS}>
              Terms and Conditions
            </Link>
            <Link href="/privacy" className={LINK_COLUMN_CLASS}>
              Privacy Policy
            </Link>
          </div>

          <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
            <h3 className={COL_TITLE_CLASS}>Contact</h3>
            <a href="tel:855-520-ENZY" className={LINK_COLUMN_CLASS}>
              (855) 520-ENZY
            </a>
            <a href="mailto:sales@enzy.co" className={LINK_COLUMN_CLASS}>
              sales@enzy.co
            </a>
          </div>
        </div>
        )}

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-8 pt-6 border-t border-white/12">
          <p className="font-inter text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white/50 max-w-md">
            © Enzy. 2026. All rights reserved.
          </p>
          <p className="font-inter text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white/50 text-left sm:text-right max-w-sm leading-relaxed">
            4100 N Chapel Ridge Rd, Suite 300
            <br />
            Lehi, Utah 84043
          </p>
        </div>
      </div>
    </footer>
  );
}
