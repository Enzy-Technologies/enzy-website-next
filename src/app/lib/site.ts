export const siteName = "Enzy"

// Clean production origin used for metadataBase + canonical resolution.
// No trailing slash, no www — keep this canonical everywhere.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://enzy.ai"

// Branded 1200x630 social share card (lives in /public). Used as the Open
// Graph / Twitter image for every page on the site.
export const defaultOgImagePath = "/og-default.png"

// The actual Enzy brand logo (wordmark). Self-hosted in /public so it ships
// with the app (same-origin, edge-cached, no third-party dependency). Used for
// structured data (Organization schema) where the real logo — not the social
// card — belongs; layout.tsx resolves it to an absolute URL via siteUrl.
export const brandLogoUrl = "/enzy-wordmark.svg"

