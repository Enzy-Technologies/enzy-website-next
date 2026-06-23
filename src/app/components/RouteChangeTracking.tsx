"use client"

import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * RouteChangeTracking
 *
 * This is a single-page app: clicking a link does a client-side route change,
 * NOT a full page reload. Tags that only run once per document load therefore
 * miss every in-app navigation. The root layout already fires GA4's first
 * page_view (via gtag config) and the inline Hyros snippet on the initial hard
 * load, so this component re-fires both on every SUBSEQUENT route change.
 *
 * It skips its own first run (that entry page is already counted by the layout)
 * to avoid double-counting.
 *
 * Note: to keep GA4 page_views deterministic, turn OFF GA4 Enhanced
 * Measurement → Page views → "Page changes based on browser history events"
 * so this manual page_view is the single source of truth for SPA navigations.
 */
export function RouteChangeTracking({ hyrosPh }: { hyrosPh: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    const url = window.location.href

    // GA4 — count the new client-side pageview.
    window.gtag?.("event", "page_view", {
      page_location: url,
      page_title: document.title,
    })

    // Hyros — re-fire the universal tracking script for the new URL (the inline
    // layout snippet only runs on the initial document load).
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src =
      "https://214713.t.hyros.com/v1/lst/universal-script?ph=" +
      hyrosPh +
      "&tag=!clicked&ref_url=" +
      encodeURI(url)
    document.head.appendChild(script)
  }, [pathname, searchParams])

  return null
}
