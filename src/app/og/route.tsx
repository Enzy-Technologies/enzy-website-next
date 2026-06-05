import { ImageResponse } from "next/og"

// Dynamic Open Graph card generator. Every page except the homepage points its
// og:image / twitter:image here (see buildMetadata), passing the page's own
// title + description as query params so each unique URL gets a bespoke 1200x630
// preview instead of one shared static card. The homepage uses the static
// branded card (/og-default.png).
export const runtime = "edge"

const SIZE = { width: 1200, height: 630 }

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = (searchParams.get("title") ?? "Enzy").slice(0, 120)
  const description = (searchParams.get("description") ?? "").slice(0, 170)

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(155deg, #0b0f14 0%, #152028 42%, #0b0f14 100%)",
          padding: 72,
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: "#19ad7d",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            marginBottom: 20,
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
          }}
        >
          Enzy
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 500,
            color: "#f5f7fa",
            lineHeight: 1.08,
            maxWidth: 980,
            fontFamily: "ui-serif, Georgia, serif",
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              fontSize: 24,
              color: "rgba(245,247,250,0.68)",
              marginTop: 28,
              maxWidth: 960,
              lineHeight: 1.4,
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {description}
          </div>
        ) : null}
      </div>
    ),
    {
      ...SIZE,
      headers: {
        // Cards are pure functions of the query string, so let CDNs / social
        // scrapers cache them aggressively.
        "Cache-Control": "public, immutable, no-transform, max-age=31536000",
      },
    },
  )
}
