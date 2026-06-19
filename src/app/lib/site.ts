export const siteName = "Enzy"

// Clean production origin used for metadataBase + canonical resolution.
// No trailing slash, no www — keep this canonical everywhere.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://enzy.ai"

// The actual Enzy brand logo (wordmark). Self-hosted in /public so it ships
// with the app (same-origin, edge-cached, no third-party dependency). Used for
// structured data (Organization schema) where the real logo — not the social
// card — belongs; layout.tsx resolves it to an absolute URL via siteUrl.
export const brandLogoUrl = "/enzy-wordmark.svg"

