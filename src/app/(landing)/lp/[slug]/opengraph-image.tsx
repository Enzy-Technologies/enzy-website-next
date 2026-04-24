import { ImageResponse } from "next/og";

import { getLandingPageConfig } from "../config/pages";

export const runtime = "edge";

export const alt = "Enzy";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = getLandingPageConfig(slug);
  const title = config?.seo.title ?? "Enzy";
  const description = (config?.seo.description ?? "").slice(0, 170);

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
      ...size,
    }
  );
}
