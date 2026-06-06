import { ImageResponse } from "next/og"

// iOS home-screen icon (apple-touch-icon). iOS ignores transparency (renders it
// as black) and rounds the corners itself, so we provide a full opaque square:
// the Enzy mark in white on the brand green. Generated at build time via
// ImageResponse so no separate PNG asset is needed.
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// White mark for contrast on the green background.
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="#ffffff"><polygon points="313.06 874.1 313.46 392.74 687.46 875.03 313.06 874.1"/><polygon points="687.46 126.25 687.46 606.68 312.54 125.31 687.46 126.25"/></svg>`
const MARK_SRC = `data:image/svg+xml;base64,${btoa(MARK_SVG)}`

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#19ad7d",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MARK_SRC} width={104} height={104} alt="Enzy" />
      </div>
    ),
    { ...size },
  )
}
