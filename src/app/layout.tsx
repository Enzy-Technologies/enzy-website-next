import React from "react"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import localFont from "next/font/local"
import "@fontsource/inter/index.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/800.css"
import "@fontsource/inter/900.css"
import "@fontsource/roboto-mono/index.css"
import "./globals.css"

import { ThemeProvider } from "./components/ThemeProvider"
import { SiteShell } from "./components/SiteShell"
import { JsonLd } from "./components/JsonLd"
import { buildMetadata } from "./lib/seo"
import { brandLogoUrl, siteName, siteUrl } from "./lib/site"
import { SpotlightCursor } from "./components/SpotlightCursor"

// Self-hosted IvyOra Text via next/font (subsetting, auto-preload, zero CLS via
// size-adjusted fallback metrics). Exposes --font-ivyora-local, which theme.css
// maps onto the --font-ivyora token used by the `font-ivyora` utility.
const ivyOra = localFont({
  src: [
    { path: "./fonts/IvyOraText-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/IvyOraText-RegularItalic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/IvyOraText-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/IvyOraText-MediumItalic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-ivyora-local",
  display: "swap",
})

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read the theme preference from a cookie so the server can render the correct
  // mode in the initial HTML — no flash. Defaults to light when unset.
  const themeCookie = (await cookies()).get("enzy-theme")?.value
  const isDark = themeCookie === "dark"

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
    <html lang="en" suppressHydrationWarning className={`${ivyOra.variable}${isDark ? " dark" : ""}`}>
      <head>
        {/* Fallback for visitors who have an old localStorage preference but no
            cookie yet: read the cookie first, else migrate localStorage into a
            cookie and apply the class pre-paint. Once the cookie exists, the
            server renders the correct theme and this is a no-op. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=document.cookie.match(/(?:^|; )enzy-theme=([^;]*)/);var t=m?decodeURIComponent(m[1]):null;if(!t){t=localStorage.getItem('enzy-theme');if(t){document.cookie='enzy-theme='+t+';path=/;max-age=31536000;samesite=lax';}}if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
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
        {/* IvyOra fonts are now self-hosted via next/font (see ivyOra above),
            which handles preloading automatically — no manual <link> needed. */}
      </head>
      <body>
        <SpotlightCursor />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <JsonLd data={softwareApplicationSchema} />
        <ThemeProvider initialIsLightMode={!isDark}>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}

