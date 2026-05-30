import React from "react"
import type { Metadata } from "next"
import { Features } from "@/app/Features"
import { SEO_CONFIG } from "@/app/utils/seo-config"
import { buildMetadata } from "@/app/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: SEO_CONFIG.features.title,
  description: SEO_CONFIG.features.description,
  path: "/system",
})

export default function Page() {
  return <Features />
}
