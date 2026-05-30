import React from "react"
import type { Metadata } from "next"
import { Privacy } from "@/app/Privacy"
import { buildMetadata } from "@/app/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy - Enzy",
  description: "Privacy policy for Enzy Technologies, LLC.",
  path: "/privacy-policy",
})

export default function Page() {
  return <Privacy />
}
