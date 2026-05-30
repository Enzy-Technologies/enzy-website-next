import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { buildMetadata } from "@/app/lib/seo"
import { getAllPosts, getPostBySlug } from "@/app/lib/blog"
import { formatPostDate } from "@/app/lib/insights"
import { PostBody } from "@/app/components/PostBody"
import { CTAButton } from "@/app/components/CTAButton"
import { BOOK_DEMO_HREF } from "@/app/lib/booking"
import { JsonLd } from "@/app/components/JsonLd"
import { siteUrl } from "@/app/lib/site"

type InsightParams = { slug: string }

// Individual articles live flat under /insights/<slug> (no /blog, no category
// segment). New markdown posts in content/blog are picked up automatically
// here, in generateMetadata, and in the sitemap. The canonical is always
// https://enzy.ai/insights/<slug>.
export function generateStaticParams(): InsightParams[] {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<InsightParams>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return buildMetadata({
      title: "Post not found",
      description: "",
      path: `/insights/${slug}`,
      hiddenFromSearchEngines: true,
    })
  }

  // description maps to the page <meta name="description"> (and OG/Twitter)
  // via buildMetadata. path drives the self-referencing canonical.
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${slug}`,
    type: "article",
  })
}

export default async function Page({
  params,
}: {
  params: Promise<InsightParams>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const displayDate = formatPostDate(post.date)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date || undefined,
    dateModified: post.updated,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/insights/${post.slug}`,
    },
    author: { "@type": "Organization", name: "Enzy" },
    publisher: { "@id": `${siteUrl}/#organization` },
  }

  return (
    <article className="relative w-full flex flex-col items-center pt-4 md:pt-8 lg:pt-12 pb-16 md:pb-24">
      <JsonLd data={articleSchema} />

      <div className="w-full max-w-[760px] px-5 sm:px-6 md:px-8">
        {/* Back to listing */}
        <Link
          href="/insights"
          className="inline-flex items-center gap-1.5 font-inter text-[13px] font-semibold text-[#19ad7d] hover:gap-2 transition-all"
        >
          <ArrowLeft size={15} strokeWidth={2.5} />
          All Insights
        </Link>

        {/* Header */}
        <header className="mt-7 md:mt-9">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center rounded-full bg-[#19ad7d]/12 text-[#19ad7d] border border-[#19ad7d]/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
              {post.category}
            </span>
            <span className="font-inter text-[12px] md:text-[13px] text-black/55 dark:text-white/55">
              {[displayDate, post.readTime].filter(Boolean).join(" · ")}
            </span>
          </div>

          <h1 className="mt-5 font-ivyora font-medium tracking-[-1px] leading-[1.08] text-[34px] sm:text-[44px] md:text-[52px] text-[#0b0f14] dark:text-[#f5f7fa]">
            {post.title}
          </h1>

          {post.description ? (
            <p className="mt-5 font-inter text-[17px] md:text-[19px] leading-relaxed text-black/60 dark:text-white/60">
              {post.description}
            </p>
          ) : null}
        </header>

        {/* Cover image. coverImage is intentionally empty on import — a branded
            placeholder renders until a self-hosted image path is supplied in the
            post frontmatter. No external/hotlinked images are ever referenced. */}
        {post.coverImage ? (
          <div className="relative mt-9 aspect-[16/9] rounded-[24px] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(min-width: 760px) 760px, 100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div
            aria-hidden
            className="mt-9 aspect-[16/9] rounded-[24px] border border-black/10 dark:border-white/10 bg-[linear-gradient(135deg,rgba(25,173,125,0.12),rgba(25,173,125,0.02))]"
          />
        )}

        {/* Body */}
        <div className="mt-9 md:mt-11">
          <PostBody content={post.content} />
        </div>

        {/* Closing CTA */}
        <div className="mt-14 md:mt-16 relative rounded-[28px] p-8 md:p-12 text-center flex flex-col items-center overflow-hidden liquid-glass border-[#19ad7d]/20 bg-[#19ad7d]/5">
          <h2 className="relative z-10 font-ivyora font-medium tracking-[-1px] leading-[1.08] text-2xl md:text-4xl max-w-xl text-[#0b0f14] dark:text-[#f5f7fa]">
            See what Enzy can do for your team.
          </h2>
          <div className="relative z-10 mt-7">
            <CTAButton
              href={BOOK_DEMO_HREF}
              variant="primary"
              className="book-demo-cta-marker px-7 py-3.5 gap-2.5 font-semibold text-[15px] tracking-tight shadow-[0_0_28px_rgba(25,173,125,0.35)]"
            >
              Book a Demo <ArrowRight size={18} aria-hidden />
            </CTAButton>
          </div>
        </div>
      </div>
    </article>
  )
}
