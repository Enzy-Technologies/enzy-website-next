import React from "react"
import type { Metadata } from "next"
import { CustomerStories } from "@/app/CustomerStories"
import { SEO_CONFIG } from "@/app/utils/seo-config"
import { buildMetadata } from "@/app/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: SEO_CONFIG.customerStories.title,
  description: SEO_CONFIG.customerStories.description,
  path: "/customer-stories",
})

export default function Page() {
  return <CustomerStories />
}
