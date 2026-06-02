"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { PixelCanvas } from "./PixelCanvas"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useTheme } from "./ThemeProvider"

import { PartnerFormModal } from "./PartnerFormModal"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { isLightMode } = useTheme()
  const pathname = usePathname()
  // The internal pricing tool is a fully self-contained document rendered in an
  // iframe, so it opts out of the marketing chrome just like landing pages do.
  const isStandalone =
    Boolean(pathname?.startsWith("/lp/")) || pathname === "/pricing-tool"
  const isLp = isStandalone
  // Pixel particle background renders globally — every page should share the
  // same parallax/interactive backdrop. Only standalone surfaces (`/lp/*` and
  // the pricing tool) opt out because they ship their own bespoke layout.
  const showParticles = !isLp

  return (
    <div
      className={`relative w-full min-h-screen font-inter selection:bg-[#19ad7d] selection:text-white transition-colors duration-500 overflow-x-clip [overflow-clip-margin:100px] ${
        isLightMode ? "bg-[#faf9f6]" : "bg-[#0b0f14]"
      }`}
    >
      {showParticles && !isLp ? <PixelCanvas /> : null}

      <div className="relative z-10 w-full flex flex-col items-center">
        {isLp ? null : <Header />}

        <main
          className={`w-full flex-1 flex flex-col items-center relative ${
            isLp ? "pt-0" : "pt-[calc(88px+env(safe-area-inset-top,0px))]"
          }`}
        >
          {children}
        </main>

        {isLp ? null : <Footer />}
      </div>
      <PartnerFormModal />
    </div>
  )
}

