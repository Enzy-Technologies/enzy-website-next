"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, RotateCw, Lock } from "lucide-react";

/**
 * The Public Recruit Form rendered as it appears to a candidate: the real
 * captured page, framed in a desktop browser window. Unlike the in-app features
 * (framed in a phone), this is a public, shareable URL — so the browser chrome
 * (tab strip + address bar) makes that distinction obvious at a glance.
 *
 * The capture itself is shown verbatim (no crop or fade). Two versions ship: a
 * mobile capture below the 1024 structural line and the wider iPad capture at
 * desktop — matching the site's single breakpoint (see lib/breakpoints). The
 * browser chrome themes with the site (light/dark); the captured page carries
 * its own light branded canvas, so it reads correctly in both modes.
 */

const REP = {
  // Tab + address bar reflect the recruiter the captured page belongs to.
  tabTitle: "Caleb’s Recruiting Page",
  url: "enzy.ai/r/caleb-brooks",
};

export function RecruitFormMockup() {
  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-[14px] border border-black/10 bg-[#ececec] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.30)] lg:max-w-[600px] dark:border-white/12 dark:bg-[#1b1f24] dark:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
        {/* ---- Browser chrome ---- */}
        {/* Tab strip */}
        <div className="flex items-center gap-3 px-3.5 pt-3">
          <div className="flex items-center gap-2" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-0 items-center gap-2 rounded-t-[9px] bg-white px-3 py-2 dark:bg-[#2a2f36]">
            {/* Favicon — forced dark on the light tab, light on the dark tab,
                so it tracks the site theme rather than the OS color scheme. */}
            <Image
              src="/icon.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden
              className="h-3 w-3 shrink-0 object-contain brightness-0 dark:invert dark:brightness-0"
            />
            <span className="truncate font-inter text-[12px] font-medium text-black/70 dark:text-white/70">
              {REP.tabTitle}
            </span>
          </div>
        </div>

        {/* Toolbar / address bar */}
        <div className="flex items-center gap-2.5 bg-white px-3.5 py-2.5 dark:bg-[#2a2f36]">
          <div className="flex items-center gap-1.5 text-black/35 dark:text-white/40" aria-hidden>
            <ArrowLeft size={15} strokeWidth={2.2} />
            <ArrowRight size={15} strokeWidth={2.2} />
            <RotateCw size={14} strokeWidth={2.2} />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-black/[0.05] px-3 py-1.5 dark:bg-white/[0.08]">
            <Lock size={11} strokeWidth={2.4} className="shrink-0 text-black/40 dark:text-white/45" />
            <span className="truncate font-inter text-[12px] text-black/55 dark:text-white/55">
              {REP.url}
            </span>
          </div>
        </div>

        {/* ---- Captured page (shown verbatim) ---- */}
        {/* Mobile capture — touch viewports (< 1024). */}
        <div className="relative block aspect-[1884/4088] w-full lg:hidden">
          <Image
            src="/system/recruit-form.png"
            alt="Public Recruit Form"
            fill
            sizes="(max-width: 1024px) 90vw, 600px"
            className="object-cover object-top"
          />
        </div>
        {/* iPad capture — desktop (>= 1024). */}
        <div className="relative hidden aspect-[3280/4720] w-full lg:block">
          <Image
            src="/system/recruit-form-ipad.png"
            alt="Public Recruit Form"
            fill
            sizes="600px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

export default RecruitFormMockup;
