import fs from "node:fs"
import path from "node:path"
import { type Category, normalizeCategory } from "./insights"

export type { Category }
export { CATEGORIES, normalizeCategory } from "./insights"

// Single source of truth for editorial content (published under /insights).
// Posts are markdown files in `content/blog/<slug>.md` with frontmatter:
//
//   ---
//   title: My Post Title
//   slug: my-post-title          # must match the filename (drives the URL)
//   date: 2026-05-01             # original publish date (display + ordering)
//   updated: 2026-05-20          # optional; last-modified used for sitemap lastmod
//   description: One-line summary used for SEO/social + the <meta name="description">.
//   category: case-study         # maps to an Insights filter pill (see CATEGORY_MAP)
//   coverImage:                  # self-hosted image path (leave empty until added)
//   ---
//   Markdown body...
//
// Drop a new `.md` file in that folder and it automatically gets its own page
// at /insights/<slug> (with a self-referencing canonical) and appears in the
// sitemap — no other code changes required.

export type BlogPost = {
  slug: string
  title: string
  description: string
  /** Insights filter pill this post appears under. */
  category: Category
  /** Original publish date (ISO) used for display + ordering. Empty if unknown. */
  date: string
  /** ISO date string used for sitemap <lastmod>. */
  updated: string
  /** Self-hosted cover image path. Empty string when not yet supplied. */
  coverImage: string
  /** Estimated read time, e.g. "5 min read". */
  readTime: string
  content: string
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function parseFrontmatter(raw: string): {
  data: Record<string, string>
  content: string
} {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw)
  if (!match) return { data: {}, content: raw.trim() }

  const data: Record<string, string> = {}
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, "")
    if (key) data[key] = value
  }
  return { data, content: match[2].trim() }
}

// ~200 wpm reading speed, rounded up, floored at 1 minute.
function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.mdx?$/.test(file))

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "")
    const fullPath = path.join(BLOG_DIR, file)
    const raw = fs.readFileSync(fullPath, "utf8")
    const { data, content } = parseFrontmatter(raw)

    const date = (data.date || "").trim()

    // lastModified precedence: frontmatter `updated` → `date` → file mtime.
    const updated =
      data.updated ||
      date ||
      fs.statSync(fullPath).mtime.toISOString()

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      category: normalizeCategory(data.category),
      date: date ? new Date(date).toISOString() : "",
      updated: new Date(updated).toISOString(),
      coverImage: (data.coverImage || "").trim(),
      readTime: estimateReadTime(content),
      content,
    } satisfies BlogPost
  })

  // Newest first (by original publish date, falling back to lastmod).
  return posts.sort(
    (a, b) =>
      new Date(b.date || b.updated).getTime() -
      new Date(a.date || a.updated).getTime(),
  )
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug)
}
