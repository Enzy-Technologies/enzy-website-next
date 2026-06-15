import { NextResponse, type NextRequest } from "next/server";
import {
  LP_META_VARIANT_COOKIE,
  LP_META_VARIANT_MAX_AGE,
  LP_META_SPLIT_A,
  parseVariant,
  type LpVariant,
} from "@/app/lib/lpExperiment";

/**
 * /lp/meta A/B split.
 *
 * Assigns each visitor a hero variant (A = playground, B = video) and pins it
 * with a 30-day cookie so a returning visitor always sees the same page — that
 * keeps opt-ins attributed to the variant they actually saw. The cookie is
 * written to BOTH the request and the response so the server renders the right
 * hero on first paint (no flash), per the documented Next.js pattern.
 *
 * No URL rewrite: the page at /lp/meta reads the cookie directly. The address
 * bar stays /lp/meta for both buckets.
 */

// Meta's link crawler + common bots: don't consume a bucket or skew counts.
const BOT_UA = /facebookexternalhit|facebookcatalog|meta-externalagent|bingbot|googlebot|slackbot|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|preview|lighthouse|headlesschrome|bot\b|crawler|spider/i;

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";
  if (BOT_UA.test(ua)) return NextResponse.next();

  const existing = parseVariant(request.cookies.get(LP_META_VARIANT_COOKIE)?.value);
  if (existing) return NextResponse.next();

  // First visit: roll the weighted split and pin it.
  const variant: LpVariant = Math.random() < LP_META_SPLIT_A ? "A" : "B";

  // Mirror onto the request so THIS render reads the freshly-assigned value
  // (forwarded via NextResponse.next({ request })) — no first-paint flash.
  request.cookies.set(LP_META_VARIANT_COOKIE, variant);
  const response = NextResponse.next({ request });

  // ...and onto the response so the browser stores it for next time.
  response.cookies.set(LP_META_VARIANT_COOKIE, variant, {
    path: "/lp/meta",
    maxAge: LP_META_VARIANT_MAX_AGE,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  // Only run on /lp/meta — never site-wide (keeps every other route static).
  matcher: ["/lp/meta"],
};
