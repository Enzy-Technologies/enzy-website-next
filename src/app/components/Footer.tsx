"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

import { CTAButton } from "./CTAButton";

export function Footer() {
  const { isLightMode } = useTheme();

  const textColor = isLightMode ? 'text-brand-dark' : 'text-brand-light';
  const mutedTextColor = isLightMode ? 'text-[#6f6f6f]' : 'text-[#a0aab2]';
  const borderColor = isLightMode ? 'border-black/10' : 'border-white/10';
  const glassBg = isLightMode ? 'bg-white/50' : 'bg-black/20';

  return (
    <footer className={`relative z-10 w-full px-4 md:px-12 lg:px-20 py-20 flex flex-col items-center border-t ${borderColor}`}>
      
      {/* Centered CTA */}
      <div className={`w-full max-w-[1500px] flex flex-col items-center gap-8 pb-20 border-b mb-16 ${borderColor}`}>
        <h2 className={`font-['Inter'] font-bold text-4xl md:text-[52px] tracking-tight text-center ${textColor}`}>
          See Enzy live
        </h2>
        <p className={`font-['Inter'] text-[15px] text-center max-w-[600px] leading-relaxed ${mutedTextColor}`}>
          A quick walkthrough of the AI Playground, competitions, and how your data connects.
        </p>
        <CTAButton className="px-8 py-4 mt-2 font-semibold text-[14px]">
          Book a demo
        </CTAButton>
      </div>

      <div className="w-full max-w-[1500px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand & Address */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="block transition-transform hover:scale-105 w-fit">
            <img 
              src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Enzy_Logo_2026_Wordmark.svg" 
              alt="Enzy Logo" 
              className={`h-8 lg:h-10 w-auto ${isLightMode ? 'brightness-0' : 'invert brightness-0'}`} 
            />
          </Link>
          <div className={`font-['Inter'] text-sm leading-relaxed ${mutedTextColor}`}>
            <p className="font-semibold text-[15px] mb-2">Headquarters</p>
            <p>4100 N Chapel Ridge Rd,</p>
            <p>Suite 300</p>
            <p>Lehi, Utah 84043</p>
          </div>
        </div>

        {/* Subcategories / Links */}
        <div className="flex flex-col gap-4">
          <h3 className={`eyebrow ${textColor} mb-2`}>
            Navigation
          </h3>
          <Link href="/" className={`font-['Inter'] text-sm ${mutedTextColor} hover:text-[#19ad7d] transition-colors w-fit`}>Home</Link>
          <Link href="/features" className={`font-['Inter'] text-sm ${mutedTextColor} hover:text-[#19ad7d] transition-colors w-fit`}>Features</Link>
          <Link href="/solutions" className={`font-['Inter'] text-sm ${mutedTextColor} hover:text-[#19ad7d] transition-colors w-fit`}>Solutions</Link>
          <Link href="/resources" className={`font-['Inter'] text-sm ${mutedTextColor} hover:text-[#19ad7d] transition-colors w-fit`}>Resources</Link>
          <Link href="/about" className={`font-['Inter'] text-sm ${mutedTextColor} hover:text-[#19ad7d] transition-colors w-fit`}>About Us</Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4">
          <h3 className={`eyebrow ${textColor} mb-2`}>
            Legal
          </h3>
          <Link href="/terms" className={`font-['Inter'] text-sm ${mutedTextColor} hover:text-[#19ad7d] transition-colors w-fit`}>Terms and Conditions</Link>
          <Link href="/privacy" className={`font-['Inter'] text-sm ${mutedTextColor} hover:text-[#19ad7d] transition-colors w-fit`}>Privacy Policy</Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h3 className={`eyebrow ${textColor} mb-2`}>
            Contact
          </h3>
          <a href="tel:855-520-ENZY" className={`font-['Inter'] text-sm ${mutedTextColor} hover:text-[#19ad7d] transition-colors w-fit`}>
            (855) 520-ENZY
          </a>
          <a href="mailto:sales@enzy.co" className={`font-['Inter'] text-sm ${mutedTextColor} hover:text-[#19ad7d] transition-colors w-fit`}>
            sales@enzy.co
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className={`w-full max-w-[1500px] flex flex-col md:flex-row justify-between items-center pt-8 border-t ${borderColor}`}>
        <div className={`flex items-center gap-4 font-['Inter'] ${mutedTextColor} text-xs tracking-wider`}>
          <span>© Enzy. 2026. All Rights Reserved.</span>
        </div>
      </div>

    </footer>
  );
}
