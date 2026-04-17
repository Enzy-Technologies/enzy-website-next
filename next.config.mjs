/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Dev-only stabilization: Webpack/HMR can occasionally end up with a mismatched module graph
  // (symptom: broken/unstyled page + runtime `__webpack_modules__[id] is not a function`).
  // Disabling persistent filesystem cache in dev removes that class of flake.
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }
    return config
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "39823762.fs1.hubspotusercontent-na2.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
    ],
  },
}

export default nextConfig

