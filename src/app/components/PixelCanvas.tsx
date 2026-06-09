"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { writeParticlesDisabled } from "../lib/particles";
import { DESKTOP_MIN, MEDIA } from "../lib/breakpoints";

interface AmbientParticle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  speed: number;
  isGreen: boolean;
  sphereTheta: number;
  spherePhi: number;
  sphereBand: number;
  sphereKind: "band" | "fill";
  // Scroll-driven "order": where this pixel belongs once data is organized.
  // Optional because the gather/easter-egg clones don't use it.
  targetX?: number;
  targetY?: number;
  // Grid stagger: the order value at which this dot starts snapping to its slot,
  // so the lattice assembles dot-by-dot instead of all at once.
  settleStart?: number;
  // Logo: when true this dot starts parked off-screen and streams in from beyond
  // the edges as you scroll (half the wordmark's dots are incoming this way).
  incoming?: boolean;
}

export function PixelCanvas() {
  const { isLightMode } = useTheme();
  const pathname = usePathname();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  // When true, the animation loop idles (skips its per-frame work). Set while a
  // full-screen overlay like the mobile menu is open — the canvas is hidden
  // behind it, so there's no reason to keep redrawing and stealing the main
  // thread right when the user is trying to tap/navigate.
  const pausedRef = useRef(false);
  const ambientParticlesRef = useRef<AmbientParticle[]>([]);
  const easterEggConsumedRef = useRef(false);
  const easterEggHoldingRef = useRef(false);
  const sphereFormedAtRef = useRef<number | null>(null);
  const sphereReadyRef = useRef(false);
  const lastHoldingRef = useRef(false);
  const gatherBoostedRef = useRef(false);
  const autoConsumeRef = useRef(false);
  const holdTargetRef = useRef<{ x: number; y: number } | null>(null);
  const renderCenterRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastHoldTargetRef = useRef<{ x: number; y: number } | null>(null);
  const selectionDisabledRef = useRef(false);
  const sphereFocusRef = useRef<{
    active: boolean;
    x: number;
    y: number;
    strength: number;
  }>({
    active: false,
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
    strength: 0,
  });
  
  // Track mouse directly inside the component
  const mousePositionRef = useRef({ 
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, 
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 
  });
  const lastMousePosRef = useRef({ 
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, 
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 
  });
  
  const smoothedMouseRef = useRef({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, 
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 
  });
  const smoothedScrollYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const lastScrollYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const smoothedScrollVelRef = useRef(0);

  // Scroll-driven "order" narrative: random pixels (entropy) at the top of the
  // page resolve into an organized structure (the "performance operating system")
  // by the bottom. orderModeRef picks what they resolve INTO; null = the original
  // ambient behavior with no organizing pull (production default).
  const orderSmoothedRef = useRef(0);
  const orderModeRef = useRef<"grid" | "logo" | null>(null);
  const targetsReadyRef = useRef(false);
  // Rasterized alpha mask of the enzy wordmark SVG (1 = inside a glyph). Kept as
  // a mask rather than points so targets can be sampled on a regular screen-space
  // lattice at any viewport size — even spacing, crisp edges, no re-loading.
  const logoMaskRef = useRef<{ data: Uint8Array; w: number; h: number } | null>(
    null
  );
  const logoAspectRef = useRef(2878.98 / 1000);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    
    // Check if mouse is active, initially set in middle
    mousePositionRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Pause/resume the loop on request (mobile menu open) and when the tab is
  // backgrounded, so the decorative canvas isn't burning the main thread when
  // it can't even be seen.
  useEffect(() => {
    const onPause = (e: Event) => {
      const ev = e as CustomEvent<{ paused?: boolean }>;
      pausedRef.current = !!ev.detail?.paused;
    };
    const onVisibility = () => {
      pausedRef.current = document.hidden;
    };
    window.addEventListener("enzy-bg-pause", onPause as EventListener);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("enzy-bg-pause", onPause as EventListener);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const onSphere = (e: Event) => {
      const ev = e as CustomEvent<{ active?: boolean; triggerClick?: boolean; x: number; y: number; force?: boolean }>;
      if (!ev.detail) return;
      if (easterEggConsumedRef.current && !ev.detail.force) return;
      
      const isActive = ev.detail.triggerClick ? true : !!ev.detail.active;
      
      if (isActive) {
        // If forced, reset consumption state so the animation can play
        if (ev.detail.force) {
          easterEggConsumedRef.current = false;
        }
        if (ev.detail.triggerClick) {
          autoConsumeRef.current = true;
        }
      }
      
      // Starting a new hold should reset readiness tracking.
      if (isActive && !sphereFocusRef.current.active) {
        sphereFormedAtRef.current = null;
        sphereReadyRef.current = false;

        // Boost density for the gather by cloning existing particles in-place.
        // This keeps the effect "made of the same particles" (no separate layer),
        // and the clones still travel from the same origin positions.
        if (!gatherBoostedRef.current) {
          const base = ambientParticlesRef.current;
          const target = 2400;
          if (base.length > 0 && base.length < target) {
            const clonesNeeded = target - base.length;
            const clones: AmbientParticle[] = [];
            for (let i = 0; i < clonesNeeded; i++) {
              const p = base[i % base.length];
              const r = Math.random();
              const capBiasedBand =
                r < 0.18
                  ? Math.random() * 0.08 // top cap
                  : r > 0.82
                    ? 0.92 + Math.random() * 0.08 // bottom cap
                    : Math.random();
              clones.push({
                x: p.x,
                y: p.y,
                baseX: p.x,
                baseY: p.y,
                vx: p.vx + (Math.random() - 0.5) * 0.18,
                vy: p.vy + (Math.random() - 0.5) * 0.18,
                size: Math.max(0.35, p.size * (0.55 + Math.random() * 0.35)),
                speed: p.speed,
                isGreen: Math.random() > 0.94, // fewer greens so it's not noisy
                sphereTheta: Math.random() * Math.PI * 2,
                spherePhi: Math.acos(2 * Math.random() - 1),
                sphereBand: capBiasedBand,
                sphereKind: Math.random() < 0.6 ? "fill" : "band",
              });
            }
            ambientParticlesRef.current = base.concat(clones);
          }
          gatherBoostedRef.current = true;
        }
      }
      sphereFocusRef.current.active = isActive;
      sphereFocusRef.current.x = ev.detail.x;
      sphereFocusRef.current.y = ev.detail.y;
      
      // Manually trigger begin/end logic since we removed the event listeners
      if (isActive) {
        const cx = Math.max(24, Math.min(window.innerWidth - 24, ev.detail.x));
        const viewportH = window.innerHeight;
        const viewportW = window.innerWidth;
        const sphereRadius = Math.min(viewportW, viewportH) * 0.24;
        const margin = 18;
        const cy = Math.max(sphereRadius + margin, Math.min(viewportH - sphereRadius - margin, ev.detail.y));
        holdTargetRef.current = { x: cx, y: cy };
        easterEggHoldingRef.current = true;
        
        // Snap partway in immediately so the gather feels responsive on touch.
        sphereFocusRef.current.strength = Math.max(sphereFocusRef.current.strength, 0.22);
      } else {
        easterEggHoldingRef.current = false;
        holdTargetRef.current = null;
        autoConsumeRef.current = false;
      }
    };

    window.addEventListener("enzy-pixel-sphere", onSphere as EventListener);
    return () => window.removeEventListener("enzy-pixel-sphere", onSphere as EventListener);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let pressTimer: number | null = null;
    let pointerId: number | null = null;
    let startX = 0;
    let startY = 0;
    let active = false;
    let pointerType: string | null = null;

    const setSelectionDisabled = (disabled: boolean) => {
      if (selectionDisabledRef.current === disabled) return;
      selectionDisabledRef.current = disabled;
      const el = document.documentElement;
      if (disabled) {
        el.style.userSelect = "none";
        (el.style as any).webkitUserSelect = "none";
        (el.style as any).webkitTouchCallout = "none";
        (el.style as any).webkitTapHighlightColor = "transparent";
        (el.style as any).touchAction = "none";
        if (document.body) (document.body.style as any).touchAction = "none";
        try {
          window.getSelection?.()?.removeAllRanges();
        } catch {}
      } else {
        el.style.userSelect = "";
        (el.style as any).webkitUserSelect = "";
        (el.style as any).webkitTouchCallout = "";
        (el.style as any).webkitTapHighlightColor = "";
        (el.style as any).touchAction = "";
        if (document.body) (document.body.style as any).touchAction = "";
      }
    };

    const isInteractiveTarget = (t: EventTarget | null) => {
      if (!(t instanceof Element)) return false;
      return Boolean(t.closest("a,button,input,textarea,select,[role='button'],[role='link']"));
    };

    const begin = (x: number, y: number) => {
      if (easterEggConsumedRef.current) return;
      const cx = Math.max(24, Math.min(window.innerWidth - 24, x));
      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;
      const sphereRadius = Math.min(viewportW, viewportH) * 0.24;
      const margin = 18;
      // Center the sphere at the hold point (clamped only to keep it on-screen).
      const cy = Math.max(sphereRadius + margin, Math.min(viewportH - sphereRadius - margin, y));
      holdTargetRef.current = { x: cx, y: cy };
      easterEggHoldingRef.current = true;
      // window.dispatchEvent(new CustomEvent("enzy-pixel-sphere", { detail: { active: true, x: cx, y: cy } }));
    };

    const end = () => {
      easterEggHoldingRef.current = false;
      holdTargetRef.current = null;
      setSelectionDisabled(false);
      // window.dispatchEvent(
      //   new CustomEvent("enzy-pixel-sphere", {
      //     detail: { active: false, x: sphereFocusRef.current.x, y: sphereFocusRef.current.y },
      //   })
      // );
    };

    const onPointerDown = (e: PointerEvent) => {
      if (easterEggConsumedRef.current) return;
      if (e.pointerType !== "touch" && e.pointerType !== "mouse") return;
      if (isInteractiveTarget(e.target)) return;
      if (pointerId !== null) return;
      if (e.pointerType === "mouse") {
        // Only left click-and-hold.
        if (e.button !== 0) return;
      }

      pointerId = e.pointerId;
      pointerType = e.pointerType;
      startX = e.clientX;
      startY = e.clientY;

      // Prevent iOS long-press magnifier/callout from ever engaging.
      if (pointerType === "touch") {
        setSelectionDisabled(true);
        e.preventDefault();
      }

      const delayMs = e.pointerType === "mouse" ? 420 : 260;
      pressTimer = window.setTimeout(() => {
        active = true;
        begin(startX, startY);
        if (navigator.vibrate) navigator.vibrate(12);
      }, delayMs);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (pointerId === null || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const moved = Math.sqrt(dx * dx + dy * dy);
      const cancelThreshold = pointerType === "mouse" ? 6 : 12;
      if (!active && moved > cancelThreshold) {
        if (pressTimer !== null) window.clearTimeout(pressTimer);
        pressTimer = null;
        pointerId = null;
        pointerType = null;
        setSelectionDisabled(false);
      }
      if (active) {
        if (pointerType === "touch") e.preventDefault();
        // Keep gathering at the current finger point.
        begin(e.clientX, e.clientY);
      }
    };

    const onPointerUpOrCancel = (e: PointerEvent) => {
      if (pointerId === null || e.pointerId !== pointerId) return;
      if (pressTimer !== null) window.clearTimeout(pressTimer);
      pressTimer = null;
      pointerId = null;
      pointerType = null;
      active = false;
      end();
    };

    // window.addEventListener("pointerdown", onPointerDown, { capture: true, passive: false });
    // window.addEventListener("pointermove", onPointerMove, { capture: true, passive: false });
    // window.addEventListener("pointerup", onPointerUpOrCancel, { capture: true });
    // window.addEventListener("pointercancel", onPointerUpOrCancel, { capture: true });

    return () => {
      if (pressTimer !== null) window.clearTimeout(pressTimer);
      setSelectionDisabled(false);
      // window.removeEventListener("pointerdown", onPointerDown, { capture: true } as any);
      // window.removeEventListener("pointermove", onPointerMove, { capture: true } as any);
      // window.removeEventListener("pointerup", onPointerUpOrCancel, { capture: true } as any);
      // window.removeEventListener("pointercancel", onPointerUpOrCancel, { capture: true } as any);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Touch (phone + tablet): skip the entire animation loop. The canvas is also
    // hidden via CSS (max-[1023px]:hidden) so it never paints — not even for a
    // single frame — and this guard ensures none of the per-frame drawing/particle
    // work runs below the desktop line. Desktop (>=1024) keeps the full animated canvas.
    if (window.matchMedia(MEDIA.touch).matches) return;

    // Opt-in scroll-organize mode (preview/compare). Production stays unchanged
    // unless ?pixelEnd=grid or ?pixelEnd=logo is present.
    // The enzy-wordmark organize effect is the production default on the HOME page
    // only — that's where the featured-features anchor lives. Other pages keep the
    // plain ambient field. ?pixelEnd=grid|logo|off overrides anywhere.
    const isHome = pathname === "/";
    const pe = new URLSearchParams(window.location.search).get("pixelEnd");
    const nextMode: "grid" | "logo" | null =
      pe === "grid" || pe === "logo"
        ? pe
        : pe === "off"
          ? null
          : isHome
            ? "logo"
            : null;
    // When the mode changes (e.g. navigating to/from home, since this canvas
    // persists across client-side navigation), rebuild the field so off-screen
    // "incoming" dots from a previous mode aren't left stranded on the next page.
    if (orderModeRef.current !== nextMode) {
      ambientParticlesRef.current = [];
      orderSmoothedRef.current = 0;
      targetsReadyRef.current = false;
    }
    orderModeRef.current = nextMode;

    // Logo mode needs far more pixels to render the wordmark solidly; grid and
    // the default ambient field stay lean. Desktop-only (the canvas is hidden on
    // touch), and the gather easter egg already runs ~2400 fillRects/frame, so
    // the higher count is well within the per-frame budget.
    const getParticleCount = () =>
      orderModeRef.current === "logo"
        ? 1000
        : orderModeRef.current === "grid"
          ? 500
          : width >= DESKTOP_MIN
            ? 300
            : 140;

    // How much of the order range a single grid dot takes to snap into its slot.
    // Each dot's settleStart is randomized in [0, 1 - SETTLE_SPAN] so the last
    // dots finish exactly as order reaches 1 (the features section).
    const SETTLE_SPAN = 0.2;

    // Logo wordmark layout: dots are sampled on a regular lattice at LOGO_SPACING
    // (screen px) and drawn at a uniform LOGO_DOT size so the mark reads even and
    // crisp rather than a noisy, variable-size fill.
    const LOGO_SPACING = 11;
    const LOGO_DOT = 4;

    const makeParticle = (x: number, y: number): AmbientParticle => ({
      x,
      y,
      baseX: x,
      baseY: y,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      isGreen: Math.random() > 0.8,
      sphereTheta: Math.random() * Math.PI * 2,
      spherePhi: Math.acos(2 * Math.random() - 1),
      sphereBand: Math.random(),
      sphereKind: Math.random() < 0.35 ? "fill" : "band",
    });

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      // Draw using CSS pixels; scale backing store for crispness.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };

    resizeCanvas();

    // Initialize ambient particles. Counts were reduced for mobile performance:
    // the always-on 60fps loop does per-particle math every frame, so a high
    // mobile count was a constant CPU/GPU drain. Desktop trimmed modestly too.
    const particleCount = getParticleCount();
    if (ambientParticlesRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ambientParticlesRef.current.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.5 + 0.2,
          isGreen: Math.random() > 0.8, // 20% chance to be a distinct green particle
          sphereTheta: Math.random() * Math.PI * 2,
          spherePhi: Math.acos(2 * Math.random() - 1),
          sphereBand: Math.random(),
          sphereKind: Math.random() < 0.35 ? "fill" : "band",
        });
      }
    }

    // Rasterize the real enzy wordmark SVG once into a binary alpha mask. Async
    // (image load); re-runs assignTargets on completion so the structure appears
    // as soon as the asset is ready.
    const rasterizeLogo = () => {
      const img = new Image();
      img.onload = () => {
        const RW = 1400;
        const aspect =
          img.naturalWidth && img.naturalHeight
            ? img.naturalWidth / img.naturalHeight
            : 2878.98 / 1000;
        const RH = Math.max(1, Math.round(RW / aspect));
        const off = document.createElement("canvas");
        off.width = RW;
        off.height = RH;
        const octx = off.getContext("2d", { willReadFrequently: true });
        if (!octx) return;
        octx.drawImage(img, 0, 0, RW, RH);
        const data = octx.getImageData(0, 0, RW, RH).data;
        const mask = new Uint8Array(RW * RH);
        for (let i = 0; i < RW * RH; i++) {
          mask[i] = data[i * 4 + 3] > 100 ? 1 : 0;
        }
        logoMaskRef.current = { data: mask, w: RW, h: RH };
        logoAspectRef.current = aspect;
        assignTargets();
      };
      img.src = "/enzy-wordmark.svg";
    };

    // Grow/trim the particle array to exactly `target` (used so logo mode can
    // match its dot count to the evenly-sampled glyph lattice, 1 dot per slot).
    const reconcileParticleCount = (target: number) => {
      const arr = ambientParticlesRef.current;
      if (arr.length > target) {
        arr.length = target;
      } else {
        while (arr.length < target) {
          arr.push(makeParticle(Math.random() * width, Math.random() * height));
        }
      }
    };

    // Assign each particle its "organized" home for the current mode. Recomputed
    // on resize so the structure always fits the viewport.
    const assignTargets = () => {
      const mode = orderModeRef.current;
      const ps = ambientParticlesRef.current;
      if (!mode || ps.length === 0) {
        targetsReadyRef.current = false;
        return;
      }
      if (mode === "grid") {
        // Even lattice spanning the full viewport edge to edge (corner to corner,
        // no margin): col/row map onto [0,width] and [0,height] inclusive.
        const n = ps.length;
        const cols = Math.max(1, Math.round(Math.sqrt(n * (width / height))));
        const rows = Math.max(1, Math.ceil(n / cols));
        ps.forEach((p, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          p.targetX = cols > 1 ? (col / (cols - 1)) * width : width / 2;
          p.targetY = rows > 1 ? (row / (rows - 1)) * height : height / 2;
          // Stable per-dot stagger (assigned once, survives resizes).
          if (p.settleStart === undefined) {
            p.settleStart = Math.random() * (1 - SETTLE_SPAN);
          }
        });
      } else {
        // enzy wordmark: fit into a centered box (preserving aspect), then sample
        // the glyph mask on a regular LOGO_SPACING lattice. Every kept slot is on
        // the same grid → perfectly even spacing and a clean silhouette. The
        // particle count is matched to the slot count so it's exactly 1 dot each.
        const mask = logoMaskRef.current;
        if (!mask) {
          targetsReadyRef.current = false;
          return;
        }
        const aspect = logoAspectRef.current;
        let tw = width * 0.72;
        let th = tw / aspect;
        const maxH = height * 0.5;
        if (th > maxH) {
          th = maxH;
          tw = th * aspect;
        }
        const ox = (width - tw) / 2;
        const oy = (height - th) / 2;

        // Coverage test: keep a lattice slot if ANY glyph pixel falls inside the
        // cell centered on it — not just the exact center. Point-sampling missed
        // thin tapering features (e.g. the top wedge of the N) that slip between
        // lattice points; scanning the whole cell captures every tip and edge.
        const halfX = ((LOGO_SPACING / tw) * mask.w) / 2;
        const halfY = ((LOGO_SPACING / th) * mask.h) / 2;
        const cellFilled = (sx: number, sy: number) => {
          const cxm = (sx / tw) * mask.w;
          const cym = (sy / th) * mask.h;
          const x0 = Math.max(0, Math.floor(cxm - halfX));
          const x1 = Math.min(mask.w - 1, Math.ceil(cxm + halfX));
          const y0 = Math.max(0, Math.floor(cym - halfY));
          const y1 = Math.min(mask.h - 1, Math.ceil(cym + halfY));
          for (let my = y0; my <= y1; my += 2) {
            const base = my * mask.w;
            for (let mx = x0; mx <= x1; mx += 2) {
              if (mask.data[base + mx]) return true;
            }
          }
          return false;
        };

        const slots: Array<[number, number]> = [];
        for (let sy = 0; sy <= th; sy += LOGO_SPACING) {
          for (let sx = 0; sx <= tw; sx += LOGO_SPACING) {
            if (cellFilled(sx, sy)) slots.push([ox + sx, oy + sy]);
          }
        }
        if (slots.length === 0) {
          targetsReadyRef.current = false;
          return;
        }
        reconcileParticleCount(slots.length);
        ambientParticlesRef.current.forEach((p, i) => {
          const slot = slots[i % slots.length];
          p.targetX = slot[0];
          p.targetY = slot[1];
          // Half the dots are present from the top (drifting on-screen); the other
          // half start parked beyond a screen edge and stream in as you scroll.
          // Interleaved by index so the incoming dots fill gaps spread across the
          // whole wordmark. Assigned once so it survives resizes.
          if (p.incoming === undefined) {
            p.incoming = i % 2 === 1;
            if (p.incoming) {
              const edge = Math.floor(Math.random() * 4);
              const beyond = 0.12 + Math.random() * 0.35; // 12–47% past the edge
              if (edge === 0) {
                p.x = -beyond * width;
                p.y = Math.random() * height;
              } else if (edge === 1) {
                p.x = width + beyond * width;
                p.y = Math.random() * height;
              } else if (edge === 2) {
                p.x = Math.random() * width;
                p.y = -beyond * height;
              } else {
                p.x = Math.random() * width;
                p.y = height + beyond * height;
              }
              p.baseX = p.x;
              p.baseY = p.y;
            }
          }
        });
      }
      targetsReadyRef.current = true;
    };

    assignTargets();
    if (orderModeRef.current === "logo" && !logoMaskRef.current) rasterizeLogo();

    let animationFrameId: number;
    // Cap the heavy per-frame work to ~30fps. The ambient particle drift doesn't
    const animate = () => {
      // Paused (e.g. mobile menu open, or tab backgrounded): keep the loop alive
      // cheaply but do no drawing or particle math, so the thread stays free for
      // interactions. Runs at the native 60fps otherwise — the per-frame cost was
      // cut instead (no canvas shadow-blur), so smoothness no longer means a
      // pegged main thread.
      if (pausedRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const mousePosition = mousePositionRef.current;

      // Smooth mouse position with easing for flowing curves
      const smoothing = 0.15; // Lower = smoother, more lag
      smoothedMouseRef.current.x += (mousePosition.x - smoothedMouseRef.current.x) * smoothing;
      smoothedMouseRef.current.y += (mousePosition.y - smoothedMouseRef.current.y) * smoothing;

      // Calculate mouse velocity using smoothed position
      const dx = smoothedMouseRef.current.x - lastMousePosRef.current.x;
      const dy = smoothedMouseRef.current.y - lastMousePosRef.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      // Smooth scroll for parallax. Clamp to >= 0 so mobile rubber-band
      // overscroll (e.g. a partial pull-to-refresh) can't drive the parallax
      // negative, which otherwise wraps a row of particles in from the top.
      const parallaxScrollY = Math.max(0, window.scrollY);
      smoothedScrollYRef.current += (parallaxScrollY - smoothedScrollYRef.current) * 0.05;

      const isDesktop = width >= DESKTOP_MIN;
      const isMobile = !isDesktop;

      // Mobile-only: "magnetization" bunch under the menu while scrolling.
      // We measure scroll velocity and use it as a force multiplier.
      const scrollY = window.scrollY;
      const rawScrollVel = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;
      smoothedScrollVelRef.current += (rawScrollVel - smoothedScrollVelRef.current) * 0.2;
      const focusTarget = sphereFocusRef.current.active ? 1 : 0;
      // Slower ramp so you can *see* the gather happen.
      const focusEasing = sphereFocusRef.current.active ? 0.12 : 0.18;
      sphereFocusRef.current.strength += (focusTarget - sphereFocusRef.current.strength) * focusEasing;
      const sphereT = sphereFocusRef.current.strength;

      // Scroll-driven order parameter: 0 = entropy (top), 1 = organized (bottom).
      // Smoothed like the parallax scroll, eased, and suppressed while the sphere
      // easter egg is active so the two effects never fight.
      let orderPull = 0;
      if (orderModeRef.current && targetsReadyRef.current) {
        // Anchor the "fully organized" moment to the featured-features section so
        // the data keeps assembling the whole way down and only resolves once you
        // arrive there (completing a quarter-screen before its top reaches the top,
        // so it's locked while the section is prominently in view). The footer is
        // an opaque z-10 bar that would hide a bottom-of-page payoff anyway.
        // Falls back to 85% of the page if the anchor isn't in the DOM yet.
        const vh = window.innerHeight;
        const anchorEl = document.getElementById("featured-features");
        const anchorY = anchorEl
          ? Math.max(
              1,
              anchorEl.getBoundingClientRect().top + window.scrollY - vh * 0.25
            )
          : Math.max(1, (document.documentElement.scrollHeight - vh) * 0.85);
        const rawOrder = Math.min(1, Math.max(0, window.scrollY / anchorY));
        orderSmoothedRef.current += (rawOrder - orderSmoothedRef.current) * 0.08;
        const o = orderSmoothedRef.current;
        // Mild ease-in (pow 1.4): keeps the hero chaotic, then assembles steadily
        // through the middle/back of the scroll and only resolves as you reach the
        // features section — i.e. drawn out rather than snapping together early.
        const eased = Math.pow(o, 1.4);
        orderPull = eased * Math.max(0, 1 - sphereT / 0.08);
      }

      const holding = easterEggHoldingRef.current;
      const releasedThisFrame = lastHoldingRef.current && !holding;

      // If the easter egg has completed, hide particles until refresh.
      if (easterEggConsumedRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      // Keep the attraction center perfectly in sync with the latest drag position.
      if (holding && holdTargetRef.current) {
        sphereFocusRef.current.x = holdTargetRef.current.x;
        sphereFocusRef.current.y = holdTargetRef.current.y;
      }

      const sphereCenterX = sphereFocusRef.current.x;
      const sphereCenterY = sphereFocusRef.current.y;

      // The backdrop should follow the *actual* particle mass, not the target point,
      // otherwise it looks like it "runs ahead" while particles are still converging.
      if (renderCenterRef.current.x === 0 && renderCenterRef.current.y === 0) {
        renderCenterRef.current = { x: sphereCenterX, y: sphereCenterY };
      }
      const backdropX = renderCenterRef.current.x;
      const backdropY = renderCenterRef.current.y;

      if (isDesktop) {
        // LAYER 1: Draw subtle gradient glow following mouse
        const gradient = ctx.createRadialGradient(
          mousePosition.x,
          mousePosition.y,
          0,
          mousePosition.x,
          mousePosition.y,
          350
        );
        
        // Theme-aware gradient colors
        gradient.addColorStop(0, isLightMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)');
        gradient.addColorStop(0.5, isLightMode ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.02)');
        gradient.addColorStop(1, isLightMode ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0)');

        // Draw gradient glow as a circle around mouse
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, 350, 0, Math.PI * 2);
        ctx.fill();
      }

      // While holding: paint a subtle circular "glass" backing behind the gathered sphere
      // so it reads clearly (avoid any pill/rounded-rect shapes).
      if (!autoConsumeRef.current && sphereT > 0.05) {
        const r = Math.min(width, height) * 0.22;

        const grad = ctx.createRadialGradient(
          backdropX,
          backdropY,
          0,
          backdropX,
          backdropY,
          r * 1.55
        );
        if (isLightMode) {
          grad.addColorStop(0, `rgba(255,255,255,${0.72 * sphereT})`);
          grad.addColorStop(0.55, `rgba(255,255,255,${0.28 * sphereT})`);
          grad.addColorStop(1, `rgba(255,255,255,0)`);
        } else {
          grad.addColorStop(0, `rgba(255,255,255,${0.18 * sphereT})`);
          grad.addColorStop(0.55, `rgba(255,255,255,${0.08 * sphereT})`);
          grad.addColorStop(1, `rgba(255,255,255,0)`);
        }

        ctx.save();
        ctx.fillStyle = grad;
        // Reduce blur so the sphere reads crisp.
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.ellipse(backdropX, backdropY, r, r, 0, 0, Math.PI * 2);
        ctx.fill();
        // Thin border for definition.
        ctx.strokeStyle = isLightMode ? `rgba(0,0,0,${0.07 * sphereT})` : `rgba(255,255,255,${0.08 * sphereT})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // LAYER 2: Update and draw ambient particles (middle layer)
      const inSpherePoints: Array<{ x: number; y: number; depth: number; band: number; ang: number }> = [];
      let centroidX = 0;
      let centroidY = 0;
      let centroidN = 0;
      ambientParticlesRef.current.forEach((particle) => {
        // Normal floating behavior
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Gentle bounds wrapping (disable while focusing or organizing to avoid
        // "teleport" artifacts as particles travel to their target slots).
        if (sphereT < 0.08 && orderPull < 0.15 && !particle.incoming) {
          if (particle.x < -10) particle.x = width + 10;
          if (particle.x > width + 10) particle.x = -10;
          if (particle.y < -10) particle.y = height + 10;
          if (particle.y > height + 10) particle.y = -10;
        }

        // Subtle drift back toward base position — fades out as data organizes,
        // handing control over to the target pull below.
        const dxBase = particle.baseX - particle.x;
        const dyBase = particle.baseY - particle.y;
        particle.vx += dxBase * 0.0001 * (1 - orderPull);
        particle.vy += dyBase * 0.0001 * (1 - orderPull);

        // NOTE: organizing no longer adds spring forces here. A velocity spring
        // converges on its own clock and raced ahead of the scroll, so the form
        // snapped together early. Instead we keep the ambient drift untouched and
        // scrub the *drawn* position toward the target by orderPull at draw time
        // (see drawX/drawY below) — that tracks scroll exactly and reverses
        // cleanly when scrolling back up.

        // Attraction to mouse trail when moving
        if (isDesktop && velocity > 1) {
          const distToMouse = Math.sqrt(
            (particle.x - mousePosition.x) ** 2 + (particle.y - mousePosition.y) ** 2
          );

          if (distToMouse < 400) {
            const angle = Math.atan2(
              mousePosition.y - particle.y,
              mousePosition.x - particle.x
            );
            const force = (400 - distToMouse) / 400;
            // Fade the cursor's pull as data organizes so it can't smear the form.
            const mouseGain = 0.65 * (1 - orderPull * 0.9);
            particle.vx += Math.cos(angle) * force * mouseGain;
            particle.vy += Math.sin(angle) * force * mouseGain;
          }
        }

        // Damping - increase while focusing so it settles, but not instantly.
        // Also stiffens with order so the organized structure holds steady.
        const damp = sphereT > 0.15 ? 0.92 : 0.965 - orderPull * 0.075;
        particle.vx *= damp;
        particle.vy *= damp;

        // Calculate distance to mouse for intensity
        const distToMouse = Math.sqrt(
          (particle.x - mousePosition.x) ** 2 + (particle.y - mousePosition.y) ** 2
        );
        const nearMouse = isDesktop && distToMouse < 250;
        const intensity = nearMouse ? 1 - distToMouse / 250 : 0;

        // Draw particle as pixel (square) instead of circle
        // Fix for hot-reloading: ensure isGreen exists
        if (particle.isGreen === undefined) {
          particle.isGreen = Math.random() > 0.8;
        }

        // Logo mode draws uniform-size dots so the wordmark reads even and crisp;
        // other modes keep the varied ambient sizes.
        const pixelSize =
          orderModeRef.current === "logo" ? LOGO_DOT : particle.size * 3;
        
        // Parallax effect on mobile using smoothed scroll
        const parallaxOffset = isDesktop ? 0 : smoothedScrollYRef.current * (particle.speed * 1.5);
        const renderY =
          sphereT > 0.08
            ? particle.y
            : isDesktop
              ? particle.y
              : (((particle.y - parallaxOffset) % height) + height) % height;

        // Organize render blend: scrub the drawn position from its drifting spot
        // toward this pixel's target slot by the eased scroll order. orderPull is
        // 0 above the fold (pure ambient) and 1 at the features section (crisp
        // structure). Linear in scroll, so the formation visibly draws out.
        let drawX = particle.x;
        let drawY = renderY;
        if (orderPull > 0.0001 && particle.targetX !== undefined) {
          let local: number;
          if (orderModeRef.current === "grid") {
            // Per-dot stagger: this dot idles (drifting) until order passes its
            // settleStart, then eases into its slot over SETTLE_SPAN. The ease-in
            // (slow approach → fast finish) reads as a snap, and randomized starts
            // mean dots arrive one-by-one rather than collectively.
            const s = particle.settleStart ?? 0;
            const raw = Math.min(1, Math.max(0, (orderPull - s) / SETTLE_SPAN));
            local = raw * raw;
          } else {
            // Logo: collective proportional blend (clean wordmark reveal).
            local = orderPull;
          }
          drawX = particle.x + (particle.targetX - particle.x) * local;
          drawY = renderY + (particle.targetY! - renderY) * local;
        }

        // Touch/hold "sphere" interaction: gather pixels into a sphere around the touch point.
        let inSphereNow = false;
        let depthNow = 0.5;
        let sphereRadiusNow = 0;
        let angNow = 0;
        if (sphereT > 0.001) {
          // Keep radius smaller so the full sphere fits in the widget window.
          // If autoConsume is true, we want the particles to gather into a single point (the wand).
          const sphereRadius = autoConsumeRef.current ? 0 : Math.min(width, height) * 0.24;
          sphereRadiusNow = sphereRadius;

          const theta = particle.sphereTheta;
          const tSec = performance.now() / 1000;

          let phi = particle.spherePhi;
          if (particle.sphereKind === "band") {
            // Band the sphere into a few latitudinal "filaments" (reference-like curves),
            // while still keeping a sphere volume. Include polar caps.
            const bandCenters = [0.22, 0.62, 1.08, 2.06, 2.52, 2.92];
            const bandIdx = Math.min(
              bandCenters.length - 1,
              Math.floor(particle.sphereBand * bandCenters.length)
            );
            const bandCenter = bandCenters[bandIdx];
            const bandWave =
              0.16 *
              Math.sin(theta * (2.1 + bandIdx * 0.33) + tSec * 0.7 + particle.sphereBand * 10);
            const bandPhi = Math.max(0.08, Math.min(Math.PI - 0.08, bandCenter + bandWave));

            const bandStrength = Math.max(0, Math.min(1, (sphereT - 0.25) / 0.6));
            // Never fully collapse into bands; keep some surface coverage.
            const w = 0.78 * bandStrength;
            phi = phi * (1 - w) + bandPhi * w;
          } else {
            // Fill particles: keep a more uniform surface with a subtle wave.
            phi = Math.max(
              0.06,
              Math.min(Math.PI - 0.06, phi + 0.06 * Math.sin(theta * 2.2 + tSec * 0.6))
            );
          }

          const sinPhi = Math.sin(phi);
          const cosPhi = Math.cos(phi);
          const cosTheta = Math.cos(theta);
          const sinTheta = Math.sin(theta);

          const x3 = sphereRadius * sinPhi * cosTheta;
          const y3 = sphereRadius * cosPhi;
          const z3 = sphereRadius * sinPhi * sinTheta;

          const depth = sphereRadius > 0 ? (z3 / sphereRadius + 1) / 2 : 0.5; // 0..1
          depthNow = depth;
          const perspective = 0.78 + depth * 0.28;

          const targetX = sphereCenterX + x3 * perspective;
          const targetY = sphereCenterY + y3 * perspective;

          const sx = targetX - particle.x;
          const sy = targetY - renderY;
          const sDist = Math.sqrt(sx * sx + sy * sy) || 1;

          // If autoConsume is true, pull them in much faster so they collapse into the wand
          const pullMultiplier = autoConsumeRef.current ? 2.5 : 1;
          const spherePull = (0.07 + 0.18 * sphereT) * (0.55 + 0.45 * depth) * pullMultiplier;
          
          particle.vx += (sx / sDist) * spherePull * sphereT;
          particle.vy += (sy / sDist) * spherePull * sphereT;

          // "Finish" convergence: once strong, lerp into place quickly.
          if (sphereT > 0.92) {
            particle.x += sx * (autoConsumeRef.current ? 0.25 : 0.10);
            particle.y += sy * (autoConsumeRef.current ? 0.25 : 0.10);
            particle.vx *= 0.72;
            particle.vy *= 0.72;
          }

          // Collect points that are actually within the sphere surface for connections.
          const dxS = particle.x - sphereCenterX;
          const dyS = renderY - sphereCenterY;
          // If radius is 0, we just check if they are very close to the center
          inSphereNow = autoConsumeRef.current 
            ? (dxS * dxS + dyS * dyS <= 400) // within 20px of center
            : (dxS * dxS + dyS * dyS <= (sphereRadius * 1.06) ** 2);
            
          if (inSphereNow && sphereT > 0.35) {
            angNow = Math.atan2(dyS, dxS);
            inSpherePoints.push({
              x: particle.x,
              y: renderY,
              depth,
              band: particle.sphereKind === "band" ? Math.min(5, Math.floor(particle.sphereBand * 6)) : -1,
              ang: angNow,
            });

            // Use the in-sphere points to estimate the visible sphere center.
            // This keeps the backdrop locked to the particle mass.
            centroidX += particle.x;
            centroidY += renderY;
            centroidN += 1;
          }
        }

        // While focusing, keep particles visible as they travel from their origin.
        // We'll only gently deemphasize far-away points near the end of the gather.
        const dxToSphere = particle.x - sphereCenterX;
        const dyToSphere = renderY - sphereCenterY;
        const distToSphere = Math.sqrt(dxToSphere * dxToSphere + dyToSphere * dyToSphere);
        const farFade =
          sphereT > 0.8
            ? Math.max(0.15, 1 - Math.min(1, distToSphere / (Math.min(width, height) * 0.55)) * 0.85)
            : 1;

        if (particle.isGreen) {
          // Vivid Enzy Green for the distinct particles.
          ctx.fillStyle = isLightMode
            ? `rgba(25, 173, 125, ${0.8 + intensity * 0.2})`
            : `rgba(25, 173, 125, ${0.8 + intensity * 0.2})`;
          // NOTE: previously these used ctx.shadowBlur=5 for a soft bloom, but
          // canvas shadow-blur is one of the most expensive 2D ops and it ran on
          // ~20% of particles every frame — the main reason the loop was costly.
          // Dropping it lets the canvas run smoothly at 60fps without pegging the
          // main thread. The dots stay green; they just no longer glow.
          ctx.shadowBlur = 0;
        } else {
          // Standard particles (Original)
          ctx.shadowBlur = 0;
          ctx.fillStyle = isLightMode 
            ? `rgba(0, 0, 0, ${0.15 + intensity * 0.25})`
            : `rgba(255, 255, 255, ${0.15 + intensity * 0.25})`;
        }

        // Apply gentle far fade near end of gather.
        if (farFade < 0.999) ctx.save();
        if (farFade < 0.999) ctx.globalAlpha = farFade;

        ctx.fillRect(
          drawX - pixelSize / 2,
          drawY - pixelSize / 2,
          pixelSize,
          pixelSize
        );

        // Fill the sphere interior so it feels complete.
        // We keep this subtle and only when the sphere is mostly formed.
        if (!autoConsumeRef.current && sphereT > 0.74 && inSphereNow) {
          const fillT = Math.min(1, (sphereT - 0.74) / 0.22);
          const seed = particle.sphereTheta * 1000 + particle.sphereBand * 100;
          const jitter = (a: number) => Math.sin(seed + a) * 0.5 + 0.5; // 0..1
          const amp = (0.9 + (1 - depthNow) * 1.8) * fillT;

          ctx.save();
          ctx.globalAlpha *= 0.34 * fillT * (0.55 + 0.45 * depthNow);
          ctx.shadowBlur = 0;

          const dotSize = Math.max(0.8, 1.05 * (0.8 + depthNow * 0.55));
          for (let k = 0; k < 9; k++) {
            const a = k * 12.345;
            const ox = (jitter(a) - 0.5) * amp;
            const oy = (jitter(a + 3.21) - 0.5) * amp;
            // Keep the micro points inside the sphere radius.
            if (sphereRadiusNow > 0) {
              const dx = (particle.x + ox) - sphereCenterX;
              const dy = (renderY + oy) - sphereCenterY;
              if (dx * dx + dy * dy > (sphereRadiusNow * 1.02) ** 2) continue;
            }
            ctx.fillRect(particle.x + ox, renderY + oy, dotSize, dotSize);
          }

          // Extra silhouette density: brighten near the sphere edge so the outline feels defined.
          if (sphereRadiusNow > 0) {
            const dx = particle.x - sphereCenterX;
            const dy = renderY - sphereCenterY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const edgeBand = Math.abs(dist - sphereRadiusNow) / sphereRadiusNow; // 0 at edge
            const edgeBoost = Math.max(0, 1 - edgeBand * 16);
            if (edgeBoost > 0) {
              ctx.globalAlpha *= 0.65 * edgeBoost;
              ctx.fillRect(particle.x, renderY, 1.2, 1.2);
            }
          }
          ctx.restore();
        }

        if (farFade < 0.999) ctx.restore();
        
        // Reset shadow so it doesn't affect standard particles or trails
        ctx.shadowBlur = 0;
      });

      // Update backdrop render center after we've measured the particle mass.
      const targetMoved =
        holding &&
        holdTargetRef.current &&
        lastHoldTargetRef.current &&
        Math.hypot(
          holdTargetRef.current.x - lastHoldTargetRef.current.x,
          holdTargetRef.current.y - lastHoldTargetRef.current.y
        ) > 1.5;

      if (holding && centroidN > 25) {
        const cx = centroidX / centroidN;
        const cy = centroidY / centroidN;
        // Mobile: slower catch-up so it feels calmer.
        const mobileFactor = isMobile ? 0.65 : 1;
        const follow = (targetMoved ? 0.58 : 0.22) * mobileFactor;
        renderCenterRef.current.x += (cx - renderCenterRef.current.x) * follow;
        renderCenterRef.current.y += (cy - renderCenterRef.current.y) * follow;
      } else {
        // Fall back to the target center when we don't have enough points yet.
        const mobileFactor = isMobile ? 0.65 : 1;
        const follow = (targetMoved ? 0.62 : 0.16) * mobileFactor;
        renderCenterRef.current.x += (sphereCenterX - renderCenterRef.current.x) * follow;
        renderCenterRef.current.y += (sphereCenterY - renderCenterRef.current.y) * follow;
      }

      lastHoldTargetRef.current = holdTargetRef.current;

      // Local filament connections: short, smooth segments (no scribbles).
      if (!autoConsumeRef.current && sphereT > 0.74 && inSpherePoints.length > 0) {
        const maxDist = 44;
        const baseAlpha = isLightMode ? 0.14 : 0.16;
        ctx.lineWidth = 1;

        // Bucket by band to create "fluid" horizontal filaments.
        const bands: Array<Array<{ x: number; y: number; depth: number; ang: number }>> = [[], [], [], [], [], []];
        for (const p of inSpherePoints) {
          if (p.band < 0) continue;
          bands[p.band].push(p);
        }

        for (const band of bands) {
          if (band.length < 10) continue;
          band.sort((a, b) => a.ang - b.ang);

          // Connect each point to the next few points; only short distances.
          for (let i = 0; i < band.length; i += 2) {
            const a = band[i];
            for (let k = 1; k <= 3; k++) {
              const b = band[(i + k) % band.length];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const d = Math.sqrt(dx * dx + dy * dy);
              if (d > maxDist) continue;
              const falloff = 1 - d / maxDist;
              const depthBoost = 0.65 + 0.35 * ((a.depth + b.depth) / 2);
              const alpha = baseAlpha * falloff * depthBoost * sphereT;
              ctx.strokeStyle = isLightMode
                ? `rgba(0,0,0,${alpha})`
                : `rgba(255,255,255,${alpha})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              // slight curvature for "fluid" feel
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2;
              ctx.quadraticCurveTo(mx, my + dy * 0.08, b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // Track when the sphere is fully formed (so we can hold it on screen).
      const now = performance.now();
      // Consider the sphere "formed" once the majority of particles are in-sphere
      // AND the focus strength is high.
      const formedNow =
        holding &&
        sphereT > 0.86 &&
        inSpherePoints.length >= Math.floor(ambientParticlesRef.current.length * (autoConsumeRef.current ? 0.4 : 0.62));

      if (holding) {
        if (formedNow) {
          if (sphereFormedAtRef.current === null) sphereFormedAtRef.current = now;
        } else {
          sphereFormedAtRef.current = null;
        }

        // If autoConsume is true, we don't need to wait as long for it to hold the shape,
        // because it's just sucking into a point and disappearing.
        const holdTime = autoConsumeRef.current ? 400 : 1400;

        if (sphereFormedAtRef.current !== null && now - sphereFormedAtRef.current > holdTime) {
          sphereReadyRef.current = true;
          
          if (autoConsumeRef.current) {
            // Auto trigger release
            easterEggHoldingRef.current = false;
            autoConsumeRef.current = false;
            // The next frame will catch releasedThisFrame
          }
        }
      }

      // Consume on release edge, after we've held a formed sphere long enough.
      if (releasedThisFrame && sphereReadyRef.current) {
        easterEggConsumedRef.current = true;
        sphereFocusRef.current.active = false;
        sphereFocusRef.current.strength = 0;
        ambientParticlesRef.current = [];
        sphereFormedAtRef.current = null;
        sphereReadyRef.current = false;
        gatherBoostedRef.current = false;
        renderCenterRef.current = { x: 0, y: 0 };
        // Persist the off-state site-wide so the canvas stays gone across page
        // navigations and reloads (SiteShell reads this and stops rendering us).
        // The particles are already cleared above, so unmounting is seamless.
        writeParticlesDisabled(true);
      }

      lastHoldingRef.current = holding;

      // (Cursor trail removed — the fading "snake" of dots that followed the
      // mouse on desktop is no longer drawn.)

      lastMousePosRef.current = { x: smoothedMouseRef.current.x, y: smoothedMouseRef.current.y };
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    let lastWidth = width;
    const handleResize = () => {
      if (!canvas) return;

      resizeCanvas();
      
      // Only reinitialize particles if width changes (e.g., orientation change)
      // Ignoring height-only changes prevents particles from jumping/resetting
      // when the mobile browser's address bar hides or shows during scrolling.
      if (width !== lastWidth) {
        ambientParticlesRef.current = [];
        // Keep in sync with the initial count above (mode-aware; reduced for mobile perf).
        const particleCount = getParticleCount();
        for (let i = 0; i < particleCount; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;
          ambientParticlesRef.current.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.5 + 0.2,
            isGreen: Math.random() > 0.8, // 20% chance to be a distinct green particle
            sphereTheta: Math.random() * Math.PI * 2,
            spherePhi: Math.acos(2 * Math.random() - 1),
            sphereBand: Math.random(),
            sphereKind: Math.random() < 0.35 ? "fill" : "band",
          });
        }
        lastWidth = width;
      }

      // Targets depend on both width and height — always refit them.
      assignTargets();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLightMode, pathname]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full transition-colors duration-500 max-[1023px]:hidden bg-[#fdfbf7] dark:bg-[#0b0f14]"
    />
  );
}