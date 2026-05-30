"use client"

import React from "react"
import { PRICING_TOOL_HTML } from "./pricingToolHtml"

// The pricing tool is a complete, self-contained HTML document (own <head>,
// styles, fonts, theme toggle, and scripts). Rendering it in an iframe via
// srcDoc keeps it byte-for-byte identical to the source and fully isolated from
// the marketing site's global CSS/JS so nothing collides either way.
export function PricingToolFrame() {
  return (
    <iframe
      title="Enzy Internal Pricing Tool"
      srcDoc={PRICING_TOOL_HTML}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  )
}
