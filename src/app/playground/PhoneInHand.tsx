"use client";

import React from "react";
import Image from "next/image";
import { InteractivePhone, PHONE_W, PHONE_H } from "./interactive/InteractivePhone";

/**
 * Shared hand-holding-iPhone composition: the hand PNG with the live
 * `InteractivePhone` screen seated into the bezel cutout. Single-sourced here so
 * BOTH the home-page `Playground` (which animates/zooms it on scroll) and the
 * `/lp/*` hero (which renders it statically) draw the same artwork + calibration
 * — change it once, it updates everywhere.
 *
 * The component is presentational: callers supply the composition size (`cw` ×
 * `ch`, matching the hand image's aspect) and a positioned parent; everything
 * inside is derived from those two numbers.
 */

// Self-hosted from /public. Source downscaled to 4000×2886 (same composition as
// the 8000×5772 original) so it's no larger than next/image's 3840px max
// variant — identical output quality, ~3.7MB committed instead of 12MB.
export const HAND_IMAGE = "/playground/hand-holding-iphone.png";

// Aspect of the hand PNG (4000/2886 === 8000/5772). The phone-overlay
// calibration fractions below depend on this exact ratio.
export const IMAGE_ASPECT = 4000 / 2886;

export const PHONE_CENTER_X_FRAC = 0.4978;
export const PHONE_CENTER_Y_FRAC = 0.4567;
export const PHONE_HEIGHT_FRAC = 0.6684;

// Phone bezel width as a fraction of the hand-image width. Lets callers size the
// composition from a desired on-screen phone size: cw = phoneWidth / this.
export const PHONE_BEZEL_WIDTH_FRAC = 0.2294;

// iPhone-style inner screen radius (in PHONE_W=393 coordinate space).
// Scales with the phone via the same transform applied to the screen overlay.
export const PHONE_SCREEN_RADIUS = 56;

// Color of the Enzy UI's outer surface (matches `bg-[#faf9f6]` set inside
// `InteractivePhone`). Painted on the screen rect itself so any hairline gap
// between the UI's content and the inner bezel of the iPhone PNG shows the same
// off-white as the surrounding UI — never the page background.
export const PHONE_SCREEN_BG = "#faf9f6";

// Extra transparent space appended below the hand image inside the
// scroll/zoom container so the PNG's natural alpha fade at the wrist has room to
// fall off — instead of meeting a hard horizontal container edge as the user
// scrolls out of the zoomed-in state.
export const CONTAINER_BOTTOM_PAD = 0.18; // fraction of ch

const DEFAULT_IMAGE_SIZES =
  "(max-width: 767px) 300vw, (max-width: 1023px) 220vw, (max-width: 1440px) 60vw, 1400px";

export function PhoneInHand({
  cw,
  ch,
  interactive,
  tapHint = false,
  imageSizes = DEFAULT_IMAGE_SIZES,
  imagePriority = true,
}: {
  /** Composition width in px (the hand image's rendered width). */
  cw: number;
  /** Composition height in px (= cw / IMAGE_ASPECT). */
  ch: number;
  /** Enables pointer interaction + click indicators on the phone screen. */
  interactive: boolean;
  /** Use the louder "ping" tap indicators (landing hero only). */
  tapHint?: boolean;
  imageSizes?: string;
  imagePriority?: boolean;
}) {
  const screenScale = (ch * PHONE_HEIGHT_FRAC) / PHONE_H;
  const screenW = PHONE_W * screenScale;
  const screenH = PHONE_H * screenScale;
  const screenLeft = cw * PHONE_CENTER_X_FRAC - screenW / 2;
  const screenTop = ch * PHONE_CENTER_Y_FRAC - screenH / 2;

  return (
    <>
      {/* Beige underlay sits behind the interactive screen and a hair outside
          its bounds. The iPhone bezel PNG (z-20) covers it everywhere except
          inside the screen cutout — so any hairline gap between the rendered
          Enzy UI (z-10, exact phone-screen size) and the inner edge of the bezel
          shows the same off-white as the UI, never the page background. */}
      <div
        className="absolute z-[5]"
        style={{
          left: screenLeft - screenW * 0.01,
          top: screenTop - screenH * 0.008,
          width: screenW * 1.02,
          height: screenH * 1.016,
          backgroundColor: PHONE_SCREEN_BG,
          borderRadius: PHONE_SCREEN_RADIUS * screenScale * 1.05,
        }}
        aria-hidden
      />

      <div
        className="absolute origin-top-left z-10 overflow-hidden"
        style={{
          left: screenLeft,
          top: screenTop,
          width: PHONE_W,
          height: PHONE_H,
          transform: `scale(${screenScale})`,
          borderRadius: PHONE_SCREEN_RADIUS,
        }}
      >
        <InteractivePhone interactive={interactive} tapHint={tapHint} />
      </div>

      {/* Bezel + hand PNG, pinned to the top-left at the natural cw × ch size.
          next/image serves right-sized AVIF/WebP variants from the self-hosted
          source. */}
      <Image
        src={HAND_IMAGE}
        alt="Hand holding phone"
        width={2000}
        height={1443}
        priority={imagePriority}
        sizes={imageSizes}
        quality={90}
        className="absolute top-0 left-0 pointer-events-none select-none z-20"
        style={{ width: cw, height: ch, objectFit: "cover" }}
        draggable={false}
      />
    </>
  );
}

export default PhoneInHand;
