import React from "react"
import type { Metadata } from "next"
import { Insights } from "@/app/Insights"
import { SEO_CONFIG } from "@/app/utils/seo-config"
import { buildMetadata } from "@/app/lib/seo"
import { getAllPosts } from "@/app/lib/blog"
import type { PostSummary } from "@/app/lib/insights"

export const metadata: Metadata = buildMetadata({
  title: SEO_CONFIG.insights.title,
  description: SEO_CONFIG.insights.description,
  path: "/insights",
})

export default function Page() {
  // Read posts on the server (content/blog) and pass serializable summaries to
  // the client listing. New markdown posts appear here automatically.
  const posts: PostSummary[] = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    date: post.date,
    coverImage: post.coverImage,
    readTime: post.readTime,
  }))

  return <Insights posts={posts} />
}
