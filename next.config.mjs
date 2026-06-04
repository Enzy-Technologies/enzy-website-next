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
    ]
  },
}

export default nextConfig

