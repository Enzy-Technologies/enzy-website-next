export const siteName = "Enzy"

// Clean production origin used for metadataBase + canonical resolution.
// No trailing slash, no www — keep this canonical everywhere.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://enzy.ai"

// Branded 1200x630 social share card (lives in /public). Used as the Open
// Graph / Twitter image for every page on the site.
export const defaultOgImagePath = "/og-default.png"

// The actual Enzy brand logo (wordmark). Used for structured data
// (Organization schema) where the real logo — not the social card — belongs.
export const brandLogoUrl =
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.ai%20Website%20Assets%20(DO%20NOT%20EDIT%20OR%20DELETE)/Logo/Enzy_Logo_2026_Wordmark.svg"

