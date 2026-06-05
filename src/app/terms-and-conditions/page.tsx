import React from "react"
import type { Metadata } from "next"
import { Terms } from "@/app/Terms"
import { buildMetadata } from "@/app/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description: "Terms and conditions for Enzy Technologies, LLC.",
  path: "/terms-and-conditions",
})

export default function Page() {
  return <Terms />
}
