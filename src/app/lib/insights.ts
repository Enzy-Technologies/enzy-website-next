// Pure (no Node/`fs`) helpers shared by both the server-side content loader
// (`blog.ts`) and the client-side Insights listing. Keep this module free of
// server-only imports so it can be bundled on the client.

// Display labels for the Insights filter pills. A post's loose frontmatter
// `category` value is normalized to one of these. Category is metadata only —
// it never appears in the URL.
export type Category = "Blog" | "Case Study" | "Playbook" | "Guide"

export const CATEGORIES: Category[] = [
  "Blog",
  "Case Study",
  "Playbook",
  "Guide",
]

export const DEFAULT_CATEGORY: Category = "Blog"

// Normalize the frontmatter `category` value (kebab/space/plural variants) to
// the canonical pill label. Anything unrecognized — including an empty value —
// falls back to "Blog" so the post still surfaces under a tab.
const CATEGORY_MAP: Record<string, Category> = {
  blog: "Blog",
  blogs: "Blog",
  "case-study": "Case Study",
  "case-studies": "Case Study",
  casestudy: "Case Study",
  playbook: "Playbook",
  playbooks: "Playbook",
  guide: "Guide",
  guides: "Guide",
}

export function normalizeCategory(raw: string | undefined): Category {
  const key = (raw || "").trim().toLowerCase()
  return CATEGORY_MAP[key] ?? DEFAULT_CATEGORY
}

// Plural label used on the filter pills (e.g. "Case Study" -> "Case Studies").
export function pillLabel(category: Category): string {
  return category === "Case Study" ? "Case Studies" : `${category}s`
}

// Format an ISO date for display (e.g. "May 21, 2026"). Returns "" for an
// empty/invalid date so callers can omit it gracefully.
export function formatPostDate(iso: string): string {
  if (!iso) return ""
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })
}

// Serializable post summary passed from the server page into the client
// listing component (no `content` body — listings only need metadata).
export type PostSummary = {
  slug: string
  title: string
  description: string
  category: Category
  date: string
  coverImage: string
  readTime: string
}
