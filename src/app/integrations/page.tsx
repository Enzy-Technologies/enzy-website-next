import React from "react"
import type { Metadata } from "next"
import { Integrations } from "@/app/Integrations"
import { SEO_CONFIG } from "@/app/utils/seo-config"
import { buildMetadata } from "@/app/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: SEO_CONFIG.integrations.title,
  description: SEO_CONFIG.integrations.description,
  path: "/integrations",
})

export default function Page() {
  return <Integrations />
}
