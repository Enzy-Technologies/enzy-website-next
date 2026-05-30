# Enzy.co 2.0

Marketing site for Enzy, built with **Next.js (App Router)** and React.

## Running the code

```bash
npm i        # install dependencies
npm run dev  # start the dev server (http://localhost:3000)
npm run build && npm run start  # production build
```

## Project structure

- `src/app/` — App Router routes, layouts, and page components.
- `src/app/lib/` — shared helpers: `site.ts` (domain/brand constants), `seo.ts` (`buildMetadata`).
- `src/app/utils/seo-config.ts` — per-page SEO titles/descriptions.
- `public/` — static assets (e.g. `og-default.png`, the shared social card).

## SEO & metadata

Metadata is handled via Next's Metadata API, centralized in `buildMetadata()` (`src/app/lib/seo.ts`):

- **Production domain / `metadataBase`:** `https://enzy.ai` (set in `src/app/lib/site.ts` via `siteUrl`; override with the `NEXT_PUBLIC_SITE_URL` env var). `enzy.co` is the legacy domain and 301-redirects to `enzy.ai`.
- **Canonicals:** every page passes a `path` to `buildMetadata`, producing one self-referencing canonical (clean URL — no trailing slash, query params, or www).
- **Open Graph / Twitter:** social title/description mirror each page's SEO fields; the homepage uses the brand line. All pages share `/og-default.png`.
- **`robots.txt` and `sitemap.xml`** are generated dynamically from `siteUrl` (`src/app/robots.ts`, `src/app/sitemap.ts`) so they never drift from the production domain.

## Notes

- `/pricing-tool` is a password-protected internal tool (server-gated, `noindex`).
- Editorial content lives under `/insights`: the hub is `/insights`, and individual posts resolve flat at `/insights/[slug]` (canonicals derived automatically from the slug). Posts are markdown files in `content/blog/`.
