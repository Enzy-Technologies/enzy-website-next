import React from "react"
import type { Metadata } from "next"
import { Insights } from "@/app/Insights"
import { SEO_CONFIG } from "@/app/utils/seo-config"
import { buildMetadata } from "@/app/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: SEO_CONFIG.insights.title,
  description: SEO_CONFIG.insights.description,
  path: "/insights",
})

export default function Page() {
  return <Insights />
}
