import type { Metadata } from "next"
import { defaultOgImagePath, siteName, siteUrl } from "./site"

export type SeoInput = {
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

export function buildMetadata(input: SeoInput): Metadata {
  const metadataBase = new URL(siteUrl)
  const canonical = input.path.startsWith("/") ? input.path : `/${input.path}`
  const imagePath = input.imagePath ?? defaultOgImagePath
  const imageUrl = new URL(imagePath, metadataBase)

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
    title: input.title,
    description: input.description,
    alternates: { canonical },
    robots,
    openGraph: {
      type: input.type ?? "website",
      siteName,
      title: input.title,
      description: input.description,
      url: canonical,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [imageUrl.toString()],
    },
  }
}

