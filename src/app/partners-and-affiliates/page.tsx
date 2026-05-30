import React from "react"
import type { Metadata } from "next"
import { PartnersAffiliates } from "@/app/PartnersAffiliates"
import { SEO_CONFIG } from "@/app/utils/seo-config"
import { buildMetadata } from "@/app/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: SEO_CONFIG.partnersAffiliates.title,
  description: SEO_CONFIG.partnersAffiliates.description,
  path: "/partners-and-affiliates",
})

export default function Page() {
  return <PartnersAffiliates />
}
