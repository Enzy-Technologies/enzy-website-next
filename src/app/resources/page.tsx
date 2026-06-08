import { notFound } from "next/navigation"

// The /resources page is hidden for now. The <Resources /> component and its
// SEO config are kept intact — to restore, revert this file to render
// <Resources /> and re-add the nav links + sitemap entry.
export default function Page() {
  notFound()
}

