import React, { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { RouteChangeTracking } from "./components/RouteChangeTracking"
import { AdParamsCapture } from "./components/AdParamsCapture"
import localFont from "next/font/local"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "./components/ThemeProvider"
import { SiteShell } from "./components/SiteShell"
import { JsonLd } from "./components/JsonLd"
import { buildMetadata } from "./lib/seo"
import { brandLogoUrl, siteName, siteUrl } from "./lib/site"
import { SpotlightCursor } from "./components/SpotlightCursor"
import { HubSpotPrewarm } from "./components/HubSpotPrewarm"

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

// Inter via next/font/google: self-hosted at build time, subset to latin, with
// size-adjusted fallback metrics (zero CLS) and font-display: swap. Replaces the
// six @fontsource/inter weight files. Exposes --font-inter-local, which theme.css
// maps onto the --font-sans / --font-inter tokens. (Roboto Mono was dropped — it
// was imported but never used; monospace UI uses the system ui-monospace stack.)
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter-local",
  display: "swap",
})

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Enzy | The Performance Operating System for Sales Teams",
    description:
      "Performance is the largest untapped lever in your business. Enzy is the operating system that surfaces it.",
    path: "/",
  }),
  // Production origin for resolving every page's relative canonical + OG URLs.
  metadataBase: new URL(siteUrl),
  title: {
    default: "Enzy | The Performance Operating System for Sales Teams",
    template: "%s | Enzy",
  },
}

// viewportFit "cover" extends the web view up BEHIND the status bar / Dynamic
// Island, so page content can scroll underneath it (with the clock/battery
// floating on top) instead of stopping at a solid bar below the status bar.
// Without it, the layout viewport ends below the status bar and content can't
// reach that region — which reads as an opaque bar at the top.
//
// We intentionally do NOT set `themeColor`: a solid theme-color paints an opaque
// chrome bar and can't follow our in-app (.dark class) theme toggle, so it gets
// stuck on the system appearance. Status-bar icon contrast is handled by
// `color-scheme` (theme.css) instead.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Theme is applied entirely client-side by the inline pre-paint script below
  // (which sets `.dark` on <html> before first paint, from the cookie/localStorage).
  // The server intentionally does NOT read the cookie — that keeps every route
  // statically renderable and prefetchable (reading cookies() here would force
  // dynamic rendering of the whole site). Theme appearance is driven by CSS
  // `dark:` variants.

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
    description: "The Performance Operating System for Sales Teams",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: "sales@enzy.ai",
    },
    sameAs: ["https://www.linkedin.com/company/enzytechnologies/"],
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
    <html lang="en" suppressHydrationWarning className={`${ivyOra.variable} ${inter.variable}`}>
      <head>
        {/* Apply theme BEFORE first paint, fully client-side, so routes can stay
            static (no server cookie read). Reads the enzy-theme cookie (falling
            back to localStorage and migrating it into a cookie), then sets `.dark`
            on <html>. CSS `dark:` variants key off this class, so the correct
            theme paints immediately with no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=document.cookie.match(/(?:^|; )enzy-theme=([^;]*)/);var t=m?decodeURIComponent(m[1]):null;if(!t){t=localStorage.getItem('enzy-theme');if(t){document.cookie='enzy-theme='+t+';path=/;max-age=31536000;samesite=lax';}}if(t==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        {/* Warm up the HubSpot embed so forms open instantly. Rendering a form
            is a serial waterfall: embed script → form definition → HubSpot's own
            React bundle → reCAPTCHA → fonts. Each hop lives on a different
            origin, so we preconnect every origin in the chain (opens DNS+TLS
            early, before the form container mounts) and prefetch the two
            requests that are gated behind the script — the embed script itself
            and the Book-a-Demo form definition — so they're already cached when
            the user reaches /book-a-demo. */}
        <link rel="preconnect" href="https://js-na2.hsforms.net" />
        <link rel="dns-prefetch" href="https://js-na2.hsforms.net" />
        <link rel="preconnect" href="https://forms-na2.hsforms.com" />
        {/* HubSpot's React/island/ServerRenderer bundles — a serial dependency
            of every form render, on its own origin. */}
        <link rel="preconnect" href="https://static.hsappstatic.net" />
        {/* Form web fonts (Inter) served from HubSpot's CDN. */}
        <link rel="preconnect" href="https://cdn1.hubspotusercontent-na2.net" />
        {/* Invisible reCAPTCHA enterprise loaded by the form. */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="" />
        <link
          rel="prefetch"
          as="script"
          href="https://js-na2.hsforms.net/forms/embed/developer/39823762.js"
        />
        {/* The Book-a-Demo form definition — the first request gated behind the
            embed script. Prefetching it warms the cache so the form paints as
            soon as the page mounts instead of after a fresh round-trip. */}
        <link
          rel="prefetch"
          as="fetch"
          crossOrigin=""
          href="https://forms-na2.hsforms.com/embed/v4/render-definition/ssr/39823762/94576c22-2aa4-4888-9b5a-c8a3b0313152"
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
        <HubSpotPrewarm />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <JsonLd data={softwareApplicationSchema} />
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
        {/* Re-fire GA4 page_view + Hyros on client-side route changes (this is
            an SPA, so tags that only run on initial load miss in-app nav).
            Suspense boundary is required because it reads useSearchParams. */}
        <Suspense fallback={null}>
          <RouteChangeTracking hyrosPh={HYROS_PH} />
          {/* Persist inbound Meta ad params (utm_*, campaign/adset/ad ids,
              fbclid) so they survive cross-page nav and ride into HubSpot at
              form submit. See lib/adTracking. */}
          <AdParamsCapture />
        </Suspense>

        {/* Vercel Speed Insights — real-user Core Web Vitals (LCP, INP, CLS).
            Free on the current plan; collects field performance per route. */}
        <SpeedInsights />
      </body>
    </html>
  )
}

