"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { PixelCanvas } from "./PixelCanvas"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useTheme } from "./ThemeProvider"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { isLightMode } = useTheme()
  const pathname = usePathname()
  const showParticles = pathname !== "/about"
  const isLp = Boolean(pathname?.startsWith("/lp/"))

  return (
    <div
      className={`relative w-full min-h-screen font-inter selection:bg-[#19ad7d] selection:text-white transition-colors duration-500 overflow-x-clip ${
        isLightMode ? "bg-[#faf9f6]" : "bg-[#0b0f14]"
      }`}
    >
      {showParticles && !isLp ? <PixelCanvas /> : null}

      <div className="relative z-10 w-full flex flex-col items-center">
        {isLp ? null : <Header />}

        <main
          className={`w-full flex-1 flex flex-col items-center relative ${
            isLp ? "pt-0" : "pt-[88px]"
          }`}
        >
          {children}
        </main>

        {isLp ? null : <Footer />}
      </div>
    </div>
  )
}

