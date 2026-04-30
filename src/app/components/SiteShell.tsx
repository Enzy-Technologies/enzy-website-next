"use client"

import React from "react"
import { PixelCanvas } from "./PixelCanvas"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useTheme } from "./ThemeProvider"

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { isLightMode } = useTheme()

  return (
    <div
      className={`relative w-full min-h-screen font-['Inter'] selection:bg-[#19ad7d] selection:text-white transition-colors duration-500 ${
        isLightMode ? "bg-[#faf9f6]" : "bg-[#0b0f14]"
      }`}
    >
      <PixelCanvas />

      <div className="relative z-10 w-full flex flex-col items-center overflow-x-hidden">
        <Header />

        <main className="w-full flex-1 flex flex-col items-center relative pt-[88px]">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  )
}

