import React from "react"
import type { Metadata } from "next"
import { AffiliateProgram } from "@/app/AffiliateProgram"
import { SEO_CONFIG } from "@/app/utils/seo-config"
import { buildMetadata } from "@/app/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: SEO_CONFIG.affiliateProgram.title,
  description: SEO_CONFIG.affiliateProgram.description,
  path: "/affiliate-program",
})

export default function Page() {
  return <AffiliateProgram />
}
