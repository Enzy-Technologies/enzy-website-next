import { notFound } from "next/navigation"

// The /customer-stories page is hidden until launch. The <CustomerStories />
// component and its SEO config are kept intact — to restore, delete the
// notFound() body below and uncomment the original page + metadata, then
// re-add the nav links (MainNavigation.tsx, Resources.tsx, EvidenceSection.tsx,
// About.tsx) and the sitemap entry.
export default function Page() {
  notFound()
}

// import React from "react"
// import type { Metadata } from "next"
// import { CustomerStories } from "@/app/CustomerStories"
// import { SEO_CONFIG } from "@/app/utils/seo-config"
// import { buildMetadata } from "@/app/lib/seo"
//
// export const metadata: Metadata = buildMetadata({
//   title: SEO_CONFIG.customerStories.title,
//   description: SEO_CONFIG.customerStories.description,
//   path: "/customer-stories",
// })
//
// export default function Page() {
//   return <CustomerStories />
// }
