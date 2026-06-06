"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { PixelCanvas } from "./PixelCanvas"
import { Header } from "./Header"
import { Footer } from "./Footer"

import { PartnerFormModal } from "./PartnerFormModal"
import { AffiliateFormModal } from "./AffiliateFormModal"
import { PARTICLES_EVENT, readParticlesDisabled } from "../lib/particles"

export function SiteShell({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  // The internal pricing tool is a fully self-contained document rendered in an
  // iframe, so it opts out of the marketing chrome just like landing pages do.
  const isStandalone =
    Boolean(pathname?.startsWith("/lp/")) || pathname === "/pricing-tool"
  const isLp = isStandalone

  // Site-wide pixel-canvas toggle. The "magic wand" turns this off for the whole
  // site (persisted), so once it's off it stays off across pages and reloads.
  // Seed from the `particles-off` class that the inline pre-paint script in the
  // root layout sets synchronously (from the enzy-particles cookie) — so the
  // canvas never flashes on for a frame before the client learns it was off,
  // without the server needing to read the cookie.
  const [particlesDisabled, setParticlesDisabled] = React.useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("particles-off")
      : false
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

  // Pixel particle background renders globally on desktop — every page shares the
  // same parallax/interactive backdrop, including `/lp/*` landing pages. Only the
  // pricing tool (a self-contained iframe document) opts out, and the whole site
  // opts out once the wand turns it off. Mobile opts out inside PixelCanvas itself
  // — it's hidden via CSS (so it never paints, not even for one frame) and its
  // animation loop is skipped on phones — which is why there's no mobile check here.
  const showParticles = pathname !== "/pricing-tool" && !particlesDisabled

  return (
    <div
      className="relative w-full min-h-screen font-inter selection:bg-[#19ad7d] selection:text-white transition-colors duration-500 overflow-x-clip [overflow-clip-margin:100px] bg-[#faf9f6] dark:bg-[#0b0f14]"
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

        {pathname === "/pricing-tool" ? null : <Footer />}
      </div>
      <PartnerFormModal />
      <AffiliateFormModal />
    </div>
  )
}

