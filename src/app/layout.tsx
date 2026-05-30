import React from "react"
import type { Metadata } from "next"
import "@fontsource/inter/index.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/800.css"
import "@fontsource/inter/900.css"
import "./globals.css"

import { ThemeProvider } from "./components/ThemeProvider"
import { SiteShell } from "./components/SiteShell"
import { JsonLd } from "./components/JsonLd"
import { buildMetadata } from "./lib/seo"
import { brandLogoUrl, siteName, siteUrl } from "./lib/site"
import { SpotlightCursor } from "./components/SpotlightCursor"

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Enzy - The Agentic Engine for High Performance Sales Teams",
    description:
      "Transform your sales team with Enzy's agentic performance system. Streamline workflows, boost productivity, and close more deals with intelligent automation and real-time insights.",
    path: "/",
  }),
  // Production origin for resolving every page's relative canonical + OG URLs.
  metadataBase: new URL(siteUrl),
  title: {
    default: "Enzy - The Agentic Engine for High Performance Sales Teams",
    template: "%s | Enzy",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const logoUrl =
    brandLogoUrl.startsWith("http") ? brandLogoUrl : `${siteUrl}${brandLogoUrl.startsWith("/") ? "" : "/"}${brandLogoUrl}`

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    logo: logoUrl,
    description: "The Agentic Engine for High Performance Sales Teams",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "sales@enzy.ai",
    },
    sameAs: ["https://twitter.com/enzy", "https://linkedin.com/company/enzy"],
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
    },
    publisher: { "@id": `${siteUrl}/#organization` },
  }

  return (
    <html lang="en">
      <head>
        {/* Apply the saved theme before first paint to avoid a flash of the
            wrong mode. Defaults to light when no preference is stored. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('enzy-theme');if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        {/* Warm up the HubSpot embed used by the "Become a Partner" form so it
            opens instantly. preconnect opens the connection early; prefetch
            pulls the embed script into cache at idle (low priority, no render
            cost) so it's ready before the modal is opened. */}
        <link rel="preconnect" href="https://js-na2.hsforms.net" />
        <link rel="dns-prefetch" href="https://js-na2.hsforms.net" />
        <link rel="preconnect" href="https://forms-na2.hsforms.com" />
        <link
          rel="prefetch"
          as="script"
          href="https://js-na2.hsforms.net/forms/embed/developer/39823762.js"
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
        <SpotlightCursor />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <JsonLd data={softwareApplicationSchema} />
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}

