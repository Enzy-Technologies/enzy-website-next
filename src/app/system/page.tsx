import React from "react"
import type { Metadata } from "next"
import { System } from "@/app/System"
import { SEO_CONFIG } from "@/app/utils/seo-config"
import { buildMetadata } from "@/app/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: SEO_CONFIG.system.title,
  description: SEO_CONFIG.system.description,
  path: "/system",
})

export default function Page() {
  return <System />
}
