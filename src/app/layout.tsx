import React from "react"
import type { Metadata } from "next"
import "./globals.css"

import { ThemeProvider } from "./components/ThemeProvider"
import { SiteShell } from "./components/SiteShell"
import { JsonLd } from "./components/JsonLd"
import { buildMetadata } from "./lib/seo"

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Enzy - The Operating System for High-Performance Sales Teams",
    description:
      "Transform your sales team with Enzy's AI-powered platform. Streamline workflows, boost productivity, and close more deals with intelligent automation and real-time insights.",
    path: "/",
  }),
  title: {
    default: "Enzy - The Operating System for High-Performance Sales Teams",
    template: "%s | Enzy",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Enzy",
    url: "https://enzy.co",
    logo: "https://enzy.co/logo.png",
    description: "The Operating System for High-Performance Sales Teams",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "sales@enzy.co",
    },
    sameAs: ["https://twitter.com/enzy", "https://linkedin.com/company/enzy"],
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Enzy",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;700&display=swap"
        />
        <link
          rel="preload"
          href="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/IvyOraText-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/IvyOraText-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={softwareApplicationSchema} />
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}

