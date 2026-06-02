import React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
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

// Site-wide tags. GTM manages Google Analytics and other marketing tags;
// Hyros runs everywhere so offline-event attribution works whether a visitor
// lands on the main site or a /lp landing page (the /lp pages are part of the
// site, so this single site-wide load already covers them — Hyros is NOT also
// loaded in the /lp layout, to avoid double-firing).
const GTM_ID = "GTM-KS6C7BTJ"
// GA4 is delivered via gtag.js (verified: the GTM container handles Google Ads,
// not GA4, so these don't double-count). GTM still loads alongside for Ads etc.
const GA4_ID = "G-PDLS3WLY7L"
const HYROS_PH =
  "9b77bffd3aedc77d0d47837ec3770cea0d228a3693759a80949f4d8e90043f09"

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

// viewportFit "cover" lets the page draw edge-to-edge into the iOS safe areas
// (under the dynamic island and behind Safari's bottom toolbar). Pair with the
// root background below + env(safe-area-inset-*) padding on fixed UI.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f14" },
  ],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read the theme preference from a cookie so the server can render the correct
  // mode in the initial HTML — no flash. Defaults to light when unset.
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get("enzy-theme")?.value
  const isDark = themeCookie === "dark"
  // Site-wide pixel-canvas state — resolved server-side so the canvas doesn't
  // flash on for a frame before the client learns it was turned off.
  const particlesDisabled = cookieStore.get("enzy-particles")?.value === "off"

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

        {/* Google Analytics 4 (gtag.js) — site-wide. This is the GA4 source;
            the GTM container below handles Google Ads, not GA4, so there is no
            double-counting. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`}
        </Script>

        {/* Google Tag Manager — site-wide (also carries Google Ads AW-16888037346). */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* Hyros universal tracking — site-wide (covers /lp too). Injected
            exactly as the original so the current page URL passes through as
            ref_url for attribution. */}
        <Script id="hyros-universal" strategy="afterInteractive">
          {`var head=document.head;var script=document.createElement('script');script.type='text/javascript';script.src="https://214713.t.hyros.com/v1/lst/universal-script?ph=${HYROS_PH}&tag=!clicked&ref_url="+encodeURI(document.URL);head.appendChild(script);`}
        </Script>
      </head>
      <body>
        {/* Google Tag Manager (noscript) — must be immediately after <body>. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>
        <SpotlightCursor />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <JsonLd data={softwareApplicationSchema} />
        <ThemeProvider initialIsLightMode={!isDark}>
          <SiteShell initialParticlesDisabled={particlesDisabled}>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}

