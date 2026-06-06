import { ImageResponse } from "next/og"

// Dynamic Open Graph card generator. Every page except the homepage points its
// og:image / twitter:image here (see buildMetadata), passing the page's own
// title + description as query params so each unique URL gets a bespoke 1200x630
// preview instead of one shared static card. The homepage uses the static
// branded card (/og-default.png).
export const runtime = "edge"

const SIZE = { width: 1200, height: 630 }

// Brand fonts, co-located with this route and loaded at render time. NOTE: the
// renderer (Satori) supports ttf/otf/woff but NOT woff2 — IvyOra ships as woff2,
// so a ttf copy lives here; Inter is loaded from its woff file. import.meta.url
// lets Next trace + bundle these assets so it works on the edge runtime.
const ivyOraMedium = fetch(new URL("./IvyOraText-Medium.ttf", import.meta.url)).then((r) =>
  r.arrayBuffer(),
)
const interRegular = fetch(new URL("./Inter-Regular.woff", import.meta.url)).then((r) =>
  r.arrayBuffer(),
)

// The Enzy wordmark, inlined so it can be drawn as the brand lockup. The source
// SVG has no fill (defaults to black); we set a dark brand fill so it reads on
// the cream background. Encoded to a data URI for <img> (Satori's most reliable
// path for SVG).
const WORDMARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2878.98 1000" fill="#11161c"><g><polygon points="1975.1 754.99 1975.1 875.68 1368.21 875.68 1368.21 786.97 1766.19 245.89 1368.75 245.89 1368.75 124.67 1966.9 124.67 1966.9 210.82 1571.32 754.99 1975.1 754.99"/><path d="M2225.41,124.68l166.22,342.5,166.2-342.5h178.79l-261.89,477.64v273.37h-166.2v-273.37l-262.43-477.64h179.32Z"/></g><path d="M693.23,549.96h-397.6l.17,190.64h397.6v135.08H142.36V124.31h551.04v133.04h-397.6v159.55h397.6l-.17,133.05Z"/><g><polygon points="843.54 874.57 843.94 392.38 1218.58 875.5 843.54 874.57"/><polygon points="1218.58 125.43 1218.58 606.69 843.02 124.5 1218.58 125.43"/></g></svg>`
const WORDMARK_SRC = `data:image/svg+xml;base64,${btoa(WORDMARK_SVG)}`

// A static impression of the site's PixelCanvas: a scattered field of small
// square "pixels" — mostly faint ink, ~18% Enzy-green — on cream. Generated
// from a FIXED seed (not Math.random) so a given card is byte-stable across
// requests, which matters for CDN/social-scraper caching. Density is thinned in
// the left text column so the title/description stay crisp.
const PIXELS = (() => {
  let s = 0x9e3779b9 >>> 0 // fixed seed
  const rnd = () => {
    // mulberry32
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const out: Array<{ x: number; y: number; size: number; green: boolean; opacity: number }> = []
  const COUNT = 150
  for (let i = 0; i < COUNT; i++) {
    const x = rnd() * SIZE.width
    const y = rnd() * SIZE.height
    // Thin out pixels sitting directly behind the text block (left ~60%, vertical middle).
    const inTextZone = x < 720 && y > 150 && y < 520
    if (inTextZone && rnd() < 0.78) continue
    const green = rnd() < 0.18
    const size = 3 + Math.floor(rnd() * 5) // 3..7px squares
    const opacity = green ? 0.35 + rnd() * 0.4 : 0.06 + rnd() * 0.12
    out.push({ x, y, size, green, opacity })
  }
  return out
})()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = (searchParams.get("title") ?? "Enzy").slice(0, 120)
  const description = (searchParams.get("description") ?? "").slice(0, 170)

  const [ivyOraData, interRegularData] = await Promise.all([ivyOraMedium, interRegular])

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          // Light-mode cream (matches the site's PixelCanvas light background).
          background: "linear-gradient(150deg, #fdfbf7 0%, #f5f2ea 60%, #ece8dd 100%)",
        }}
      >
        {/* Pixel-canvas impression (behind content). */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex" }}>
          {PIXELS.map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                background: p.green
                  ? `rgba(25,173,125,${p.opacity})`
                  : `rgba(17,22,28,${p.opacity})`,
              }}
            />
          ))}
        </div>

        {/* Foreground content. */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: 80,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={WORDMARK_SRC} width={150} height={52} alt="Enzy" style={{ marginBottom: 30 }} />
          <div
            style={{
              fontSize: 64,
              color: "#11161c",
              lineHeight: 1.07,
              maxWidth: 1000,
              fontFamily: "IvyOra",
              fontWeight: 500,
              letterSpacing: "-0.5px",
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                fontSize: 26,
                color: "rgba(17,22,28,0.6)",
                marginTop: 30,
                maxWidth: 960,
                lineHeight: 1.45,
                fontFamily: "Inter",
                fontWeight: 400,
              }}
            >
              {description}
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [
        { name: "IvyOra", data: ivyOraData, weight: 500, style: "normal" },
        { name: "Inter", data: interRegularData, weight: 400, style: "normal" },
      ],
      headers: {
        // Cards are pure functions of the query string, so let CDNs / social
        // scrapers cache them aggressively.
        "Cache-Control": "public, immutable, no-transform, max-age=31536000",
      },
    },
  )
}
