import React from "react"
import type { Metadata } from "next"
import { Partners } from "@/app/Partners"
import { SEO_CONFIG } from "@/app/utils/seo-config"
import { buildMetadata } from "@/app/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: SEO_CONFIG.partners.title,
  description: SEO_CONFIG.partners.description,
  path: "/integrations",
})

export default function Page() {
  return <Partners />
}
