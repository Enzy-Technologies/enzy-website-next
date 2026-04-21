"use client";

import React from "react";
import createImg from "@/assets/e66ef56f0b767b50b8860584a5fa19bd69be614e.png";
import engageImg from "@/assets/34d961d0ab311afc7564d03f49aed88b4a54a35f.png";
import analyzeImg from "@/assets/818a5b0370e47250af5f3233218b98f9533f97ef.png";

export function HowItWorksSection() {
  return (
    <section className="relative z-20 w-full bg-[rgba(255,255,255,0.6)] backdrop-blur-[32px] border-t border-white/60 flex justify-center overflow-hidden rounded-t-[40px] md:rounded-t-[60px] lg:rounded-t-[80px] -mt-[320px] md:-mt-[420px] lg:-mt-[560px] shadow-[0_-20px_60px_rgba(0,0,0,0.1)] bg-[#ffffffe3] px-[16px] py-[64px]">
      <div className="w-full max-w-[1280px] flex flex-col items-start gap-12 relative">
        
        {/* Header */}
        

        

        {/* Step 1 */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 group p-[0px]">
          <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[288px] shrink-0">
            <span className="font-['Inter'] text-lg text-black/50 font-medium">Step 1</span>
            <div className="flex items-center gap-4">
              <h3 className="font-['Inter'] text-5xl md:text-[59px] text-brand-dark tracking-[-2px] font-bold">Integrate</h3>
              <div className="w-[80px] h-[80px] shrink-0 bg-white border border-black/5 flex items-center justify-center rounded-full text-brand-dark group-hover:scale-105 transition-transform duration-500 shadow-xl">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </div>
            </div>
            <p className="font-['Inter'] text-[15px] text-black/70 leading-relaxed">
              Connect your stack in days. Keep your sources. Enzy sits on top.
            </p>
          </div>
          <div className="w-full lg:w-[834px] lg:ml-auto h-[212px] bg-white/40 border-2 border-black/60 backdrop-blur-xl rounded-full overflow-hidden relative group-hover:border-black group-hover:bg-white/50 transition-colors duration-500 shadow-[inset_0_4px_24px_rgba(255,255,255,0.7)]">
            <img src={createImg.src} alt="Create Dashboard" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 group p-[0px]">
          <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[288px] shrink-0">
            <span className="font-['Inter'] text-lg text-black/50 font-medium">Step 2</span>
            <div className="flex items-center gap-4">
              <h3 className="font-['Inter'] text-5xl md:text-[60px] text-brand-dark tracking-[-2px] font-bold">Activate</h3>
              <div className="w-[80px] h-[80px] shrink-0 bg-white border border-black/5 flex items-center justify-center rounded-full text-brand-dark group-hover:scale-105 transition-transform duration-500 shadow-xl">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </div>
            </div>
            <p className="font-['Inter'] text-[14px] text-black/70 leading-relaxed">
              Make activity visible—across reps, teams, and managers. No lag.
            </p>
          </div>
          <div className="w-full lg:w-[834px] lg:ml-auto h-[212px] bg-white/40 border-2 border-black/60 backdrop-blur-xl rounded-full overflow-hidden relative group-hover:border-black group-hover:bg-white/50 transition-colors duration-500 shadow-[inset_0_4px_24px_rgba(255,255,255,0.7)]">
            <img src={engageImg.src} alt="Engage Audience" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 pb-12 border-b border-black/10 group">
          <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[288px] shrink-0">
            <span className="font-['Inter'] text-lg text-black/50 font-medium">Step 3</span>
            <div className="flex items-center gap-4">
              <h3 className="font-['Inter'] text-5xl md:text-[60px] text-brand-dark tracking-[-2px] font-bold">Drive Momentum</h3>
              <div className="w-[80px] h-[80px] shrink-0 bg-white border border-black/5 flex items-center justify-center rounded-full text-brand-dark group-hover:scale-105 transition-transform duration-500 shadow-xl">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </div>
            </div>
            <p className="font-['Inter'] text-[14px] text-black/70 leading-relaxed">
              AI suggests actions. Competitions reinforce habits. Results compound.
            </p>
          </div>
          <div className="w-full lg:w-[834px] lg:ml-auto h-[212px] bg-white/40 border-2 border-black/60 backdrop-blur-xl rounded-full overflow-hidden relative group-hover:border-black group-hover:bg-white/50 transition-colors duration-500 shadow-[inset_0_4px_24px_rgba(255,255,255,0.7)]">
            <img src={analyzeImg.src} alt="Analyze Results" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-none opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

      </div>
    </section>
  );
}