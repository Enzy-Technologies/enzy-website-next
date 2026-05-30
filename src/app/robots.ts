import type { MetadataRoute } from "next"
import { siteUrl } from "./lib/site"

// Generated from siteUrl so the sitemap/host reference always matches the
// production domain (https://enzy.ai). /pricing-tool is password-protected and
// kept out of crawls.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/pricing-tool",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
