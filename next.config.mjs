/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Prevent dev-only segment explorer manifest errors that crash the app.
    // If Next's devtools feature is flaky, it causes a cascade into
    // `__webpack_modules__[id] is not a function` and missing client modules.
    devtoolSegmentExplorer: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "39823762.fs1.hubspotusercontent-na2.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
}

export default nextConfig

