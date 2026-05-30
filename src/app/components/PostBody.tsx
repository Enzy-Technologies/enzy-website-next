import React from "react"
import Link from "next/link"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

// Renders a post's markdown body through the Enzy design system: IvyOra serif
// headings, Inter body copy, brand-green links, and theme-aware colors via the
// `dark:` variant (toggled by the .dark class on <html>). The incoming markdown
// is intentionally style-free structural content — all styling lives here.

const components: Components = {
  h1: ({ children }) => (
    <h1 className="font-ivyora font-medium tracking-[-1px] leading-[1.12] text-[32px] md:text-[40px] mt-12 mb-5 text-[#0b0f14] dark:text-[#f5f7fa]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-ivyora font-medium tracking-[-0.5px] leading-[1.15] text-[26px] md:text-[32px] mt-11 mb-4 text-[#0b0f14] dark:text-[#f5f7fa]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-ivyora font-medium tracking-[-0.3px] leading-[1.2] text-[21px] md:text-[24px] mt-9 mb-3 text-[#0b0f14] dark:text-[#f5f7fa]">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-inter font-semibold text-[17px] md:text-[18px] mt-7 mb-2 text-[#0b0f14] dark:text-[#f5f7fa]">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="font-inter text-[16px] md:text-[18px] leading-[1.75] my-5 text-black/72 dark:text-white/72">
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    const url = href ?? "#"
    const isInternal = url.startsWith("/") || url.startsWith("#")
    const className =
      "font-medium text-[#19ad7d] underline decoration-[#19ad7d]/30 underline-offset-[3px] transition-colors hover:decoration-[#19ad7d]"
    if (isInternal) {
      return (
        <Link href={url} className={className}>
          {children}
        </Link>
      )
    }
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  },
  ul: ({ children }) => (
    <ul className="font-inter text-[16px] md:text-[18px] leading-[1.7] my-5 pl-6 list-disc marker:text-[#19ad7d] space-y-2 text-black/72 dark:text-white/72">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="font-inter text-[16px] md:text-[18px] leading-[1.7] my-5 pl-6 list-decimal marker:text-[#19ad7d] space-y-2 text-black/72 dark:text-white/72">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1.5 [&>ul]:mt-2 [&>ol]:mt-2">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-7 border-l-[3px] border-[#19ad7d]/60 pl-5 md:pl-6 font-inter italic text-[16px] md:text-[18px] leading-[1.7] text-black/70 dark:text-white/70 [&>p]:my-3">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#0b0f14] dark:text-[#f5f7fa]">
      {children}
    </strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => (
    <hr className="my-10 border-0 h-px bg-black/10 dark:bg-white/10" />
  ),
  code: ({ children }) => (
    <code className="rounded-md px-1.5 py-0.5 font-mono text-[0.9em] bg-black/[0.06] dark:bg-white/[0.08] text-[#0b0f14] dark:text-[#f5f7fa]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-2xl p-5 font-mono text-[14px] leading-relaxed bg-black/[0.05] dark:bg-white/[0.06] text-[#0b0f14] dark:text-[#f5f7fa]">
      {children}
    </pre>
  ),
  img: () => null,
}

export function PostBody({ content }: { content: string }) {
  return (
    <div className="font-inter">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
