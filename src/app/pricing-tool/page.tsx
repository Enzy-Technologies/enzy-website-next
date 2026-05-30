import React from "react"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { buildMetadata } from "@/app/lib/seo"
import { PricingToolFrame } from "./PricingToolFrame"
import { PricingGate } from "./PricingGate"
import { PRICING_TOOL_COOKIE, PRICING_TOOL_COOKIE_VALUE } from "./auth"

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Internal Pricing Tool",
    description: "Password-protected internal pricing tool. For internal use only.",
    path: "/pricing-tool",
    hiddenFromSearchEngines: true,
  }),
  // Password-protected: keep it out of search indexes and tell crawlers not to
  // follow links from it either.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}

export default async function Page() {
  const cookieStore = await cookies()
  const authorized =
    cookieStore.get(PRICING_TOOL_COOKIE)?.value === PRICING_TOOL_COOKIE_VALUE

  return authorized ? <PricingToolFrame /> : <PricingGate />
}
