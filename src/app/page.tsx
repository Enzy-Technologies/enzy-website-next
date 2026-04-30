import React from "react"
import type { Metadata } from "next"
import Home from "@/app/Home"
import { buildMetadata } from "@/app/lib/seo"
import { SEO_CONFIG } from "@/app/utils/seo-config"

export const metadata: Metadata = buildMetadata({
  title: SEO_CONFIG.home.title,
  description: SEO_CONFIG.home.description,
  path: "/",
})

export default function Page() {
  return <Home />
}

