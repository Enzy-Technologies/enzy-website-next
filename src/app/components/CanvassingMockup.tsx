"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Trash2, Pencil, Pipette } from "lucide-react";

/**
 * Auto-playing, looping recreation of an Enzy canvassing session, framed in a
 * phone. It walks the full flow the same way a rep does in the field:
 *
 *   1. Territory map — satellite view with the color-coded canvassing areas
 *      and rep pins (AM, SO, CM …).
 *   2. Tap the red territory — a ripple lands on the red area and the
 *      "Knock this Area" sheet slides up.
 *   3. Zoom in — "Knock this Area" is tapped; the camera zooms from the
 *      territory view into the street-level view, revealing individual house
 *      pins with their disposition icons (Not Home / Renter / Warm Lead /
 *      Sold …).
 *   4. Tap a pin — a ripple lands on a house pin and the door's detail sheet
 *      slides up: the disposition picker, the homeowner's details, custom
 *      links, and knock history.
 *
 * The satellite imagery itself can't be faithfully rebuilt in the DOM, so the
 * two map states are the real in-app screenshots (the source of truth for all
 * imagery, chrome, pins, and colors). Everything that *moves* — the camera
 * zoom, the tap ripples, and both bottom sheets — is real animated DOM layered
 * on top, reproduced pixel-for-pixel from the screenshots and the in-app
 * recording.
 *
 * Authored at a logical phone resolution (393×852) and scaled to fit its
 * container, so every measurement below is in real device px.
 */

const PHONE = { w: 393, h: 852 };

const AREAS_SRC = "/system/canvassing-areas.jpg";
const PINS_SRC = "/system/canvassing-pins.jpg";
// The opened door detail is the real in-app export, in two pieces: the
// floating disposition picker bar and the homeowner detail card beneath it.
const PIN_PICKER_SRC = "/system/canvassing-pin-picker.png";
const PIN_DETAIL_SRC = "/system/canvassing-pin-detail.png";

// Sampled from the screenshots.
const INK = "#161513";
const MUTE = "#6f6f6a";
const GREEN = "#0da071"; // Enzy brand green — matches the detail-card CTAs
const HANDLE_GREY = "#d4d3cd"; // light-grey drag handle

const SANS = "Inter, sans-serif";

/** Where the tap ripples land, in fractions of the screen. */
const RED_AREA = { x: 0.31, y: 0.34 };
const KNOCK_BTN = { x: 0.5, y: 0.69 };
// The brown "Not Home" pin in the lower-right of the street-level view.
const HOUSE_PIN = { x: 0.74, y: 0.74 };

/** How long the opened door detail holds on screen before the loop restarts. */
const DETAIL_HOLD = 5200;

/** Watches `ref`'s width and returns the scale needed to map `designW` onto it. */
function useFitScale(
  ref: React.RefObject<HTMLDivElement | null>,
  designW: number
) {
  const [scale, setScale] = useState(0.76);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / designW);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, designW]);
  return scale;
}

type View = "areas" | "pins";

export function CanvassingMockup() {
  const hostRef = useRef<HTMLDivElement>(null);
  const scale = useFitScale(hostRef, PHONE.w);
  const [inView, setInView] = useState(false);

  const [view, setView] = useState<View>("areas");
  const [knockOpen, setKnockOpen] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  // True only during the end-of-loop dissolve back to the territory view, so
  // the map crossfades to the start instead of reverse-zooming.
  const [resetting, setResetting] = useState(false);
  // A bumped key retriggers the ripple animation at a fresh position.
  const [ripple, setRipple] = useState<{ x: number; y: number; k: number } | null>(
    null
  );

  // Only run the loop while the phone is on screen.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: skip the choreography, hold on the opened pin sheet.
    if (reduce) {
      setView("pins");
      setKnockOpen(false);
      setPinOpen(true);
      setRipple(null);
      return;
    }

    let cancelled = false;
    let rk = 0;
    const timers: number[] = [];
    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        timers.push(window.setTimeout(res, ms));
      });
    const tap = (x: number, y: number) => setRipple({ x, y, k: ++rk });

    async function run() {
      while (!cancelled) {
        // 1. Territory map — hold.
        setView("areas");
        setKnockOpen(false);
        setPinOpen(false);
        setResetting(false);
        setRipple(null);
        await sleep(1900);
        if (cancelled) return;

        // 2. Tap the red territory.
        tap(RED_AREA.x, RED_AREA.y);
        await sleep(620);
        if (cancelled) return;

        // "Knock this Area" sheet slides up.
        setKnockOpen(true);
        await sleep(1700);
        if (cancelled) return;

        // 3. Tap "Knock this Area" → zoom into the street-level view.
        tap(KNOCK_BTN.x, KNOCK_BTN.y);
        await sleep(560);
        if (cancelled) return;
        setKnockOpen(false);
        setView("pins");
        await sleep(1500); // camera zoom + settle
        if (cancelled) return;

        // 4. Tap a house pin.
        tap(HOUSE_PIN.x, HOUSE_PIN.y);
        await sleep(620);
        if (cancelled) return;
        setPinOpen(true);

        // Hold on the open door detail.
        await sleep(DETAIL_HOLD);
        if (cancelled) return;

        // 1. The detail card lowers back out of view (and the dim lifts).
        setPinOpen(false);
        await sleep(520);
        if (cancelled) return;

        // 2. Then animate back to the territory view — a crossfade at natural
        //    scale, so it returns to the start without reverse-zooming.
        setResetting(true);
        setView("areas");
        await sleep(650);
        if (cancelled) return;
      }
    }

    run();
    return () => {
      cancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, [inView]);

  return (
    <div className="flex justify-center">
      <div
        ref={hostRef}
        className="relative w-full max-w-[300px] md:max-w-[330px]"
        style={{ height: PHONE.h * scale, borderRadius: 44 * scale }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-[44px]"
          style={{
            width: PHONE.w,
            height: PHONE.h,
            transform: `scale(${scale})`,
            background: "#ffffff",
          }}
        >
          {/* ---- Map imagery (the source-of-truth screenshots) ---- */}
          {/* Territory view zooms up toward the red area as it hands off. */}
          <motion.img
            src={AREAS_SRC}
            alt="Territory map with color-coded canvassing areas"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            initial={false}
            animate={
              view === "areas"
                ? { scale: 1, opacity: 1 }
                : { scale: 2.35, opacity: 0 }
            }
            transition={
              resetting
                ? { scale: { duration: 0 }, opacity: { duration: 0.55, ease: "easeOut" } }
                : { duration: 1.05, ease: [0.4, 0, 0.2, 1] }
            }
            style={{ transformOrigin: `${RED_AREA.x * 100}% ${RED_AREA.y * 100}%` }}
          />
          {/* Street-level view holds at its natural scale and simply fades in
              as the territory view zooms past it — so the hand-off reads as one
              continuous push-in, never a zoom-out. */}
          <motion.img
            src={PINS_SRC}
            alt="Street-level map with house pins and disposition icons"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            initial={false}
            animate={
              view === "pins"
                ? { scale: 1, opacity: 1 }
                : { scale: 1, opacity: 0 }
            }
            transition={
              resetting
                ? { opacity: { duration: 0.55, ease: "easeOut" } }
                : { duration: 1.05, ease: [0.4, 0, 0.2, 1] }
            }
            style={{ transformOrigin: "center" }}
          />

          {/* ---- Tap ripple ---- */}
          <AnimatePresence>
            {ripple && (
              <TapPulse
                key={ripple.k}
                left={ripple.x * PHONE.w}
                top={ripple.y * PHONE.h}
              />
            )}
          </AnimatePresence>

          {/* ---- "Knock this Area" sheet ---- */}
          <AnimatePresence>{knockOpen && <KnockAreaSheet />}</AnimatePresence>

          {/* ---- Door detail: dim scrim behind the picker + detail card ---- */}
          <AnimatePresence>
            {pinOpen && (
              <motion.div
                key="scrim"
                className="absolute inset-0 z-10 bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>{pinOpen && <PinDetailSheet />}</AnimatePresence>

        </div>
        {/* Device edge — a crisp 1px hairline drawn just inside the frame, on
            top of all content. It lives on the unscaled wrapper (so it never
            sub-pixels) and is inset rather than an outset ring, so an
            overflow-hidden ancestor can't clip it when the phone fills the
            column on mobile. Radius matches the scaled screen. */}
        <div
          className="pointer-events-none absolute inset-0 z-30 border border-black/12 dark:border-white/15"
          style={{ borderRadius: 44 * scale }}
        />
      </div>
    </div>
  );
}

/** Expanding tap ripple — white, so it reads over the dark satellite map. */
function TapPulse({ left, top }: { left: number; top: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute z-30 rounded-full border-2"
      style={{
        borderColor: "#ffffff",
        background: "rgba(255,255,255,0.28)",
        width: 52,
        height: 52,
        left: left - 26,
        top: top - 26,
        boxShadow: "0 0 0 2px rgba(0,0,0,0.18)",
      }}
      initial={{ scale: 0.45, opacity: 0.95 }}
      animate={{ scale: 1.8, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.62, ease: "easeOut" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* "Knock this Area" bottom sheet (white)                              */
/* ------------------------------------------------------------------ */

const SWATCHES_TOP = ["#1fa9c6", "#f4c98a", "#c455e0", "#8fd49a", "#f2ee8a"];
const SWATCHES_BOTTOM = ["#f2685e", "#5566c9", "#5bb07a", "#f2941a"];

function KnockAreaSheet() {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-20 rounded-t-[26px] bg-white px-6 pb-7 pt-3"
      style={{ boxShadow: "0 -14px 40px rgba(0,0,0,0.18)" }}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 34 }}
    >
      {/* Drag handle */}
      <div
        className="mx-auto h-1.5 w-12 rounded-full"
        style={{ background: HANDLE_GREY }}
      />

      {/* Header row */}
      <div className="mt-3 flex items-center justify-between">
        <ChevronDown className="h-6 w-6" style={{ color: INK }} strokeWidth={2} />
        <p
          className="text-[19px]"
          style={{ fontFamily: SANS, fontWeight: 700, color: INK }}
        >
          Area
        </p>
        <Trash2 className="h-[22px] w-[22px]" style={{ color: INK }} strokeWidth={1.8} />
      </div>

      {/* Primary action — same green as the detail-card CTAs */}
      <div
        className="mt-5 flex h-[52px] w-full items-center justify-center rounded-[12px]"
        style={{ background: GREEN }}
      >
        <span
          className="text-[16px]"
          style={{ fontFamily: SANS, fontWeight: 600, color: "#ffffff" }}
        >
          Knock this Area
        </span>
      </div>

      {/* Title row */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-[15px]" style={{ fontFamily: SANS, color: INK }}>
          Title
        </span>
        <div
          className="flex items-center gap-2 rounded-full px-4 py-2"
          style={{ background: "#eceae4" }}
        >
          <span className="text-[14px]" style={{ fontFamily: SANS, color: INK }}>
            Area
          </span>
          <Pencil className="h-4 w-4" style={{ color: MUTE }} strokeWidth={2} />
        </div>
      </div>

      {/* Assigned users row */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[15px]" style={{ fontFamily: SANS, color: INK }}>
          Assigned Users
        </span>
        <div
          className="flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3"
          style={{ background: "#eceae4" }}
        >
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: "linear-gradient(135deg,#f0b24a,#d98a2b)" }}
          >
            CB
          </span>
          <span className="text-[14px]" style={{ fontFamily: SANS, color: INK }}>
            Caleb Brooks
          </span>
          <Pencil className="h-4 w-4" style={{ color: MUTE }} strokeWidth={2} />
        </div>
      </div>

      {/* Color row */}
      <div className="mt-5 flex items-start justify-between">
        <span className="mt-1 text-[15px]" style={{ fontFamily: SANS, color: INK }}>
          Color
        </span>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            {SWATCHES_TOP.map((c) => (
              <span
                key={c}
                className="h-8 w-8 rounded-full"
                style={{ background: c }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            {SWATCHES_BOTTOM.map((c, i) => (
              <span
                key={c}
                className="h-8 w-8 rounded-full"
                // The red swatch is selected — it's the colour of the territory
                // we're expanding into.
                style={{
                  background: c,
                  boxShadow: i === 0 ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : undefined,
                }}
              />
            ))}
            <Pipette className="h-5 w-5" style={{ color: INK }} strokeWidth={1.8} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Door detail bottom sheet — the real in-app exports, slid up          */
/* ------------------------------------------------------------------ */

// Layout in logical px, measured from the original full screenshot
// (Map (pin open).png) so the two pieces land exactly where they do in app:
// the picker bar floats near the top, with a sliver of map below it, then
// the detail card fills to the bottom edge.
const PICKER = { top: 46, width: 369 }; // 738/2; right-aligned to the frame edge
const DETAIL = { width: PHONE.w }; // 786/2 — full frame width, anchored to bottom

function PinDetailSheet() {
  return (
    <motion.div
      className="absolute inset-0 z-20"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 34 }}
    >
      {/* Floating disposition picker bar */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PIN_PICKER_SRC}
        alt="Disposition picker — Not Home, Renter, Warm Lead, Sold"
        draggable={false}
        className="absolute"
        style={{
          top: PICKER.top,
          right: 0,
          width: PICKER.width,
          filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
        }}
      />
      {/* Homeowner detail card (address → custom links → knock history → CTAs) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PIN_DETAIL_SRC}
        alt="Door detail — homeowner, custom links, and knock history"
        draggable={false}
        className="absolute"
        style={{
          bottom: 0,
          left: 0,
          width: DETAIL.width,
          // Round the bottom corners to the frame radius. The screen already
          // clips with `overflow-hidden rounded-[44px]`, but a transformed
          // (animated) descendant escapes that clip on mobile WebKit, so the
          // card's square corners poke past the rounded frame — round them here.
          borderBottomLeftRadius: 44,
          borderBottomRightRadius: 44,
          filter: "drop-shadow(0 -10px 30px rgba(0,0,0,0.10))",
        }}
      />
    </motion.div>
  );
}

export default CanvassingMockup;
