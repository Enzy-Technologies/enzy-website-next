import React from "react"
import type { Metadata } from "next"
import { ContactUs } from "@/app/ContactUs"
import { SEO_CONFIG } from "@/app/utils/seo-config"
import { buildMetadata } from "@/app/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: SEO_CONFIG.contactUs.title,
  description: SEO_CONFIG.contactUs.description,
  path: "/contact-us",
})

export default function Page() {
  return <ContactUs />
}
