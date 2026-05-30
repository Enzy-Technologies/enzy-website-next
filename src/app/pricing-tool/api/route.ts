import { NextResponse } from "next/server"
import { PRICING_TOOL_COOKIE, PRICING_TOOL_COOKIE_VALUE } from "../auth"

// Password is validated server-side only; it is never sent to the browser.
const PRICING_TOOL_PASSWORD = "96Bulls"

export async function POST(request: Request) {
  let password = ""
  try {
    const body = await request.json()
    password = typeof body?.password === "string" ? body.password : ""
  } catch {
    password = ""
  }

  if (password !== PRICING_TOOL_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(PRICING_TOOL_COOKIE, PRICING_TOOL_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/pricing-tool",
    // Session-length access; visitors re-enter the password in a new session.
  })
  return response
}
