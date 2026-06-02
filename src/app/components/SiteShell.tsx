"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { PixelCanvas } from "./PixelCanvas"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { useTheme } from "./ThemeProvider"

import { PartnerFormModal } from "./PartnerFormModal"
import { PARTICLES_EVENT, readParticlesDisabled } from "../lib/particles"

export function SiteShell({
  children,
  initialParticlesDisabled = false,
}: {
  children: React.ReactNode
  initialParticlesDisabled?: boolean
}) {
  const { isLightMode } = useTheme()
  const pathname = usePathname()
  // The internal pricing tool is a fully self-contained document rendered in an
  // iframe, so it opts out of the marketing chrome just like landing pages do.
  const isStandalone =
    Boolean(pathname?.startsWith("/lp/")) || pathname === "/pricing-tool"
  const isLp = isStandalone

  // Site-wide pixel-canvas toggle. The "magic wand" turns this off for the whole
  // site (persisted), so once it's off it stays off across pages and reloads.
  const [particlesDisabled, setParticlesDisabled] = React.useState(
    initialParticlesDisabled
  )
  React.useEffect(() => {
    // Re-sync on mount in case the cookie wasn't set but localStorage was.
    setParticlesDisabled(readParticlesDisabled())
    const onChange = (e: Event) => {
      const ev = e as CustomEvent<{ disabled?: boolean }>
      setParticlesDisabled(!!ev.detail?.disabled)
    }
    window.addEventListener(PARTICLES_EVENT, onChange as EventListener)
    return () =>
      window.removeEventListener(PARTICLES_EVENT, onChange as EventListener)
  }, [])

  // Pixel particle background renders globally — every page shares the same
  // parallax/interactive backdrop. Standalone surfaces (`/lp/*` and the pricing
  // tool) opt out, and so does the whole site once the wand turns it off.
  const showParticles = !isLp && !particlesDisabled

  return (
    <div
      className={`relative w-full min-h-screen font-inter selection:bg-[#19ad7d] selection:text-white transition-colors duration-500 overflow-x-clip [overflow-clip-margin:100px] ${
        isLightMode ? "bg-[#faf9f6]" : "bg-[#0b0f14]"
      }`}
    >
      {showParticles ? <PixelCanvas /> : null}

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

