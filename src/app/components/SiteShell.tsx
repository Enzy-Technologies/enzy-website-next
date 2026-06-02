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
      // min-h-[100svh] (small viewport height) instead of min-h-screen (100vh,
      // the iOS *large* viewport): keeps layout height independent of whether
      // Safari's toolbars are expanded/collapsed, so the bottom behaves the same
      // on every page. The bg lives here AND on html/body so the iOS safe areas
      // and the regions behind the translucent toolbars always show page color.
      className={`relative w-full min-h-[100svh] font-inter selection:bg-[#19ad7d] selection:text-white transition-colors duration-500 overflow-x-clip [overflow-clip-margin:100px] ${
        isLightMode ? "bg-[#faf9f6]" : "bg-[#0b0f14]"
      }`}
    >
      {showParticles && !isLp ? <PixelCanvas /> : null}

      {/* Persistent safe-area scrims. Fixed, full-width frosted bands pinned to
          the top (behind the Dynamic Island / status bar) and bottom (behind
          Safari's address bar) so the chrome blur is consistent on EVERY page
          and at every scroll position — not only when the header glass shows on
          scroll. Height collapses to 0 on devices without insets, so they are
          invisible on desktop. */}
      {isLp ? null : (
        <>
          <div
            aria-hidden
            className="fixed inset-x-0 top-0 z-[90] pointer-events-none h-[env(safe-area-inset-top,0px)] backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]"
          />
          <div
            aria-hidden
            className="fixed inset-x-0 bottom-0 z-[90] pointer-events-none h-[env(safe-area-inset-bottom,0px)] backdrop-blur-xl [-webkit-backdrop-filter:blur(24px)]"
          />
        </>
      )}

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

