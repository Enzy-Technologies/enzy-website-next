import type { Metadata } from "next"
import { defaultOgImagePath, siteName, siteUrl } from "./site"

export type SeoInput = {
  /**
   * Page-specific title WITHOUT the brand suffix. The root layout's
   * `title.template` ("%s | Enzy") appends the brand to the document <title>,
   * so authored titles must NOT contain "Enzy" or you get "About Enzy | Enzy".
   * If a title already mentions the brand (e.g. the homepage, or a blog post
   * whose headline names Enzy), it's detected below and the template is
   * suppressed so the brand is never doubled.
   */
  title: string
  description: string
  path: string
  imagePath?: string
  type?: "website" | "article"
  /**
   * Paid / campaign landings: keep out of organic indexes while remaining shareable via ads & direct links.
   * Sets noindex,follow so crawlers discover links but don’t surface the URL in search results.
   */
  hiddenFromSearchEngines?: boolean
}

// Build the absolute OG image URL for a page.
//   - Home (or any page passing an explicit imagePath): the static branded card.
//   - Every other page: a dynamically generated card (/og) that renders the
//     page's own title + description, so each unique page gets its own preview.
function resolveOgImageUrl(input: SeoInput, canonical: string, metadataBase: URL): string {
  if (input.imagePath) return new URL(input.imagePath, metadataBase).toString()
  if (canonical === "/") return new URL(defaultOgImagePath, metadataBase).toString()

  const params = new URLSearchParams({ title: input.title })
  if (input.description) params.set("description", input.description)
  return new URL(`/og?${params.toString()}`, metadataBase).toString()
}

export function buildMetadata(input: SeoInput): Metadata {
  const metadataBase = new URL(siteUrl)
  const canonical = input.path.startsWith("/") ? input.path : `/${input.path}`
  const imageUrl = resolveOgImageUrl(input, canonical, metadataBase)

  // A title is "already branded" if it mentions Enzy. In that case we skip the
  // layout title.template (via `absolute`) and don't re-append the brand to the
  // social title — preventing "… with Enzy | Enzy". Otherwise the document
  // <title> uses the template and the social title mirrors it ("About | Enzy"),
  // so <title> and og:title always match.
  const hasBrand = /enzy/i.test(input.title)
  const documentTitle: Metadata["title"] = hasBrand ? { absolute: input.title } : input.title
  const socialTitle = hasBrand ? input.title : `${input.title} | ${siteName}`

  const robots = input.hiddenFromSearchEngines
    ? ({
        index: false,
        follow: true,
        googleBot: {
          index: false,
          follow: true,
        },
      } satisfies Metadata["robots"])
    : ({
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      } satisfies Metadata["robots"])

  return {
    metadataBase,
    title: documentTitle,
    description: input.description,
    alternates: { canonical },
    robots,
    openGraph: {
      type: input.type ?? "website",
      siteName,
      // Social title/description mirror each page's own SEO title/description so
      // link previews describe the specific page being shared.
      title: socialTitle,
      description: input.description,
      url: canonical,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    // We have no X/Twitter account, so twitter:site / twitter:creator are
    // omitted (they require a handle). The card title/description/image mirror
    // this page's Open Graph values so X shows a page-specific large-image
    // preview. (Leaving these unset is NOT equivalent: Next then backfills
    // twitter:* from the site-wide default, advertising the homepage's title
    // and image on every page.)
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: input.description,
      images: [imageUrl],
    },
  }
}
