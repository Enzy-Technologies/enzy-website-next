/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Prevent dev-only segment explorer manifest errors that crash the app.
    // If Next's devtools feature is flaky, it causes a cascade into
    // `__webpack_modules__[id] is not a function` and missing client modules.
    devtoolSegmentExplorer: false,
    // Rewrite barrel imports (e.g. `import { X } from "lucide-react"`) so
    // only the icons/animations actually used get bundled. Without this we
    // ship a chunk of unused icons + motion subpaths.
    optimizePackageImports: ["lucide-react", "motion", "motion/react"],
  },
  images: {
    // Prefer AVIF (≈30% smaller than WebP at equal quality); browsers without
    // AVIF support fall back to WebP automatically.
    formats: ["image/avif", "image/webp"],
    // The hand image uses quality 90; Next 15 requires non-default qualities
    // to be allow-listed here.
    qualities: [75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "39823762.fs1.hubspotusercontent-na2.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  async redirects() {
    return [
      // Slug renames — keep old URLs working.
      { source: "/features", destination: "/system", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/book-demo", destination: "/book-a-demo", permanent: true },

      // enzy.co -> enzy.ai migration (renamed/moved paths).
      // Same-path URLs (/about, /solutions, /integrations, /partners) are
      // handled by the apex domain redirect and need no rule here.
      { source: "/contact", destination: "/contact-us", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/schedule-a-meeting", destination: "/book-a-demo", permanent: true },
      { source: "/home", destination: "/", permanent: true },

      // Meta/Facebook ad landing page.
      { source: "/meta", destination: "/lp/meta", permanent: true },
      { source: "/facebook", destination: "/lp/meta", permanent: true },
      { source: "/meta-copy", destination: "/lp/meta", permanent: true },

      // Blog: 4 posts migrated to /insights/<slug>. Keep these BEFORE the
      // /blog-posts catch-all so the migrated slugs win.
      {
        source: "/blog-posts/aptives-winning-strategy-with-enzy",
        destination: "/insights/aptives-winning-strategy-with-enzy",
        permanent: true,
      },
      {
        source: "/blog-posts/cafe-rios-170-boost-in-positive-reviews-with-enzy",
        destination: "/insights/cafe-rios-170-boost-in-positive-reviews-with-enzy",
        permanent: true,
      },
      {
        source: "/blog-posts/how-elite-anesthesia-skyrocketed-sales-by-189-with-enzys-secret-sauce",
        destination: "/insights/how-elite-anesthesia-skyrocketed-sales-by-189-with-enzys-secret-sauce",
        permanent: true,
      },
      {
        source: "/blog-posts/sunder-energys-400m-sales-triumph-with-enzys-revolutionary-tools",
        destination: "/insights/sunder-energys-400m-sales-triumph-with-enzys-revolutionary-tools",
        permanent: true,
      },
      // Legacy Webflow aliases for two of the migrated posts.
      {
        source: "/how-enzy-help-xyz",
        destination: "/insights/cafe-rios-170-boost-in-positive-reviews-with-enzy",
        permanent: true,
      },
      {
        source: "/how-enzy-help-xyz-copy",
        destination: "/insights/sunder-energys-400m-sales-triumph-with-enzys-revolutionary-tools",
        permanent: true,
      },
      // All other (retired) blog posts -> /insights index to preserve link equity.
      { source: "/blog-posts/:slug*", destination: "/insights", permanent: true },

      // Old solutions sub-pages consolidated to the top-level /solutions.
      // :slug+ (one or more) so bare /solutions still renders normally.
      { source: "/solutions/:slug+", destination: "/solutions", permanent: true },

      // Old /policies/* paths flattened.
      { source: "/policies/privacy-policy", destination: "/privacy-policy", permanent: true },
      { source: "/policies/terms-and-conditions", destination: "/terms-and-conditions", permanent: true },
    ]
  },
}

export default nextConfig

