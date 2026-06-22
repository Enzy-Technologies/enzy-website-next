import { ImageResponse } from "next/og"

// iOS home-screen icon (apple-touch-icon) and the icon Google tends to pick for
// search results. iOS ignores transparency (renders it black) and rounds the
// corners itself, so we provide a full opaque square: the Enzy mark in off-white
// on the dark brand square. Generated at build time via ImageResponse so no
// separate PNG asset is needed.
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// Full-bleed square brand mark (off-white mark on #0B0F14). The artwork already
// includes its own padding, so we render it edge-to-edge.
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="none"><rect width="512" height="512" fill="#0B0F14"/><path d="M348.748 70.4407V308.605L163.252 70.4407H348.748Z" fill="#F7F9FC"/><path d="M163.252 441.559V203.395L348.748 441.559H163.252Z" fill="#F7F9FC"/></svg>`
const MARK_SRC = `data:image/svg+xml;base64,${btoa(MARK_SVG)}`

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0B0F14",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MARK_SRC} width={180} height={180} alt="Enzy" />
      </div>
    ),
    { ...size },
  )
}
