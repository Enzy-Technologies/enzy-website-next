import type { MetadataRoute } from "next"
import { siteUrl } from "./lib/site"
import { getAllPosts } from "./lib/blog"

// Indexable, public marketing routes. Generated from siteUrl so every <loc>
// uses the apex production origin (https://enzy.ai — no www, no trailing
// slash) and can never drift from metadataBase/canonicals. Noindex routes
// (e.g. /pricing-tool, /lp/*) and separate apps (app./messaging./feedback.
// .enzy.co) are intentionally excluded.
const STATIC_ROUTES: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
  priority: number
}> = [
  { path: "/", changeFrequency: "daily", priority: 1.0 },
  { path: "/system", changeFrequency: "weekly", priority: 0.8 },
  { path: "/solutions", changeFrequency: "weekly", priority: 0.8 },
  { path: "/integrations", changeFrequency: "weekly", priority: 0.7 },
  { path: "/insights", changeFrequency: "weekly", priority: 0.7 },
  { path: "/book-a-demo", changeFrequency: "monthly", priority: 0.6 },
  { path: "/partners", changeFrequency: "monthly", priority: 0.5 },
  { path: "/affiliate-program", changeFrequency: "monthly", priority: 0.5 },
  { path: "/customer-stories", changeFrequency: "monthly", priority: 0.5 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.3 },
]

function absolute(path: string): string {
  return path === "/" ? siteUrl : `${siteUrl}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, changeFrequency, priority }) => ({
      url: absolute(path),
      lastModified: now,
      changeFrequency,
      priority,
    }),
  )

  // Posts are pulled dynamically from the content source, so every article at
  // https://enzy.ai/insights/<slug> is included automatically once added, with
  // its <lastmod> set to the post's updated date.
  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absolute(`/insights/${post.slug}`),
    lastModified: new Date(post.updated),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticEntries, ...postEntries]
}
