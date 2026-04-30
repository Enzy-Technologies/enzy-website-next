"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface TrailDot {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
}

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
}

export function PixelCanvas() {
  const { isLightMode } = useTheme();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailDotsRef = useRef<TrailDot[]>([]);
  const ambientParticlesRef = useRef<AmbientParticle[]>([]);
  const easterEggConsumedRef = useRef(false);
  const easterEggHoldingRef = useRef(false);
  const sphereFormedAtRef = useRef<number | null>(null);
  const sphereReadyRef = useRef(false);
  const lastHoldingRef = useRef(false);
  const gatherBoostedRef = useRef(false);
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
  
  const lastTrailAddTimeRef = useRef(0);
  const mousePathRef = useRef<Array<{ x: number; y: number }>>([]);
  const smoothedMouseRef = useRef({ 
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, 
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 
  });
  const smoothedScrollYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const lastScrollYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const smoothedScrollVelRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    
    // Check if mouse is active, initially set in middle
    mousePositionRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const onSphere = (e: Event) => {
      const ev = e as CustomEvent<{ active: boolean; x: number; y: number }>;
      if (!ev.detail) return;
      if (easterEggConsumedRef.current) return;
      // Starting a new hold should reset readiness tracking.
      if (ev.detail.active && !sphereFocusRef.current.active) {
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
      sphereFocusRef.current.active = ev.detail.active;
      sphereFocusRef.current.x = ev.detail.x;
      sphereFocusRef.current.y = ev.detail.y;
      if (ev.detail.active) {
        // Snap partway in immediately so the gather feels responsive on touch.
        sphereFocusRef.current.strength = Math.max(sphereFocusRef.current.strength, 0.22);
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
        try {
          window.getSelection?.()?.removeAllRanges();
        } catch {}
      } else {
        el.style.userSelect = "";
        (el.style as any).webkitUserSelect = "";
        (el.style as any).webkitTouchCallout = "";
        (el.style as any).webkitTapHighlightColor = "";
      }
    };

    const isInteractiveTarget = (t: EventTarget | null) => {
      if (!(t instanceof Element)) return false;
      return Boolean(t.closest("a,button,input,textarea,select,[role='button'],[role='link']"));
    };

    const begin = (x: number, y: number) => {
      if (easterEggConsumedRef.current) return;
      // Prefer forming *below* the thumb, but flip above near the bottom so it stays near the action.
      const cx = Math.max(24, Math.min(window.innerWidth - 24, x));
      const viewportH = window.innerHeight;
      const viewportW = window.innerWidth;
      const sphereRadius = Math.min(viewportW, viewportH) * 0.24;
      const offset = 76;
      const margin = 18;

      const belowY = y + offset;
      const aboveY = y - offset;
      const canFitBelow = belowY + sphereRadius + margin <= viewportH;
      const canFitAbove = aboveY - sphereRadius - margin >= 0;
      const desiredY = canFitBelow ? belowY : canFitAbove ? aboveY : belowY;

      const cy = Math.max(
        sphereRadius + margin,
        Math.min(viewportH - sphereRadius - margin, desiredY)
      );
      holdTargetRef.current = { x: cx, y: cy };
      easterEggHoldingRef.current = true;
      window.dispatchEvent(new CustomEvent("enzy-pixel-sphere", { detail: { active: true, x: cx, y: cy } }));
    };

    const end = () => {
      easterEggHoldingRef.current = false;
      holdTargetRef.current = null;
      setSelectionDisabled(false);
      window.dispatchEvent(
        new CustomEvent("enzy-pixel-sphere", {
          detail: { active: false, x: sphereFocusRef.current.x, y: sphereFocusRef.current.y },
        })
      );
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

      const delayMs = e.pointerType === "mouse" ? 420 : 260;
      pressTimer = window.setTimeout(() => {
        active = true;
        // Disable selection/callout before mobile OS starts selection UI.
        if (pointerType === "touch") setSelectionDisabled(true);
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
      }
      if (active) {
        if (pointerType === "touch") e.preventDefault();
        // Keep gathering at the current finger point (above it).
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

    window.addEventListener("pointerdown", onPointerDown, { capture: true });
    window.addEventListener("pointermove", onPointerMove, { capture: true });
    window.addEventListener("pointerup", onPointerUpOrCancel, { capture: true });
    window.addEventListener("pointercancel", onPointerUpOrCancel, { capture: true });

    return () => {
      if (pressTimer !== null) window.clearTimeout(pressTimer);
      setSelectionDisabled(false);
      window.removeEventListener("pointerdown", onPointerDown, { capture: true } as any);
      window.removeEventListener("pointermove", onPointerMove, { capture: true } as any);
      window.removeEventListener("pointerup", onPointerUpOrCancel, { capture: true } as any);
      window.removeEventListener("pointercancel", onPointerUpOrCancel, { capture: true } as any);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    // Initialize ambient particles - slightly denser on mobile for the hold interaction
    const particleCount = width > 768 ? 500 : 420;
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

    let animationFrameId: number;

    const animate = () => {
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

      // Smooth scroll for parallax
      smoothedScrollYRef.current += (window.scrollY - smoothedScrollYRef.current) * 0.05;

      const isDesktop = width > 768;
      const isMobile = !isDesktop;

      // Mobile-only: "magnetization" bunch under the menu while scrolling.
      // We measure scroll velocity and use it as a force multiplier.
      const scrollY = window.scrollY;
      const rawScrollVel = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;
      smoothedScrollVelRef.current += (rawScrollVel - smoothedScrollVelRef.current) * 0.2;
      const scrollSpeed = Math.min(1, Math.abs(smoothedScrollVelRef.current) / 40);
      const focusTarget = sphereFocusRef.current.active ? 1 : 0;
      // Slower ramp so you can *see* the gather happen.
      const focusEasing = sphereFocusRef.current.active ? 0.12 : 0.18;
      sphereFocusRef.current.strength += (focusTarget - sphereFocusRef.current.strength) * focusEasing;
      const sphereT = sphereFocusRef.current.strength;

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
      if (sphereT > 0.05) {
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

        // Gentle bounds wrapping (disable while focusing to avoid "teleport" artifacts)
        if (sphereT < 0.08) {
          if (particle.x < -10) particle.x = width + 10;
          if (particle.x > width + 10) particle.x = -10;
          if (particle.y < -10) particle.y = height + 10;
          if (particle.y > height + 10) particle.y = -10;
        }

        // Subtle drift back toward base position
        const dxBase = particle.baseX - particle.x;
        const dyBase = particle.baseY - particle.y;
        particle.vx += dxBase * 0.0001;
        particle.vy += dyBase * 0.0001;

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
            particle.vx += Math.cos(angle) * force * 0.65;
            particle.vy += Math.sin(angle) * force * 0.65;
          }
        }

        // Damping - increase while focusing so it settles, but not instantly.
        const damp = sphereT > 0.15 ? 0.92 : 0.965;
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

        // Special green particles are the same size as the standard particles
        const pixelSize = particle.size * 3;
        
        // Parallax effect on mobile using smoothed scroll
        const parallaxOffset = isDesktop ? 0 : smoothedScrollYRef.current * (particle.speed * 1.5);
        const renderY =
          sphereT > 0.08
            ? particle.y
            : isDesktop
              ? particle.y
              : (((particle.y - parallaxOffset) % height) + height) % height;

        // Touch/hold "sphere" interaction: gather pixels into a sphere around the touch point.
        let inSphereNow = false;
        let depthNow = 0.5;
        let sphereRadiusNow = 0;
        let angNow = 0;
        if (sphereT > 0.001) {
          // Keep radius smaller so the full sphere fits in the widget window.
          const sphereRadius = Math.min(width, height) * 0.24;
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

          const depth = (z3 / sphereRadius + 1) / 2; // 0..1
          depthNow = depth;
          const perspective = 0.78 + depth * 0.28;

          const targetX = sphereCenterX + x3 * perspective;
          const targetY = sphereCenterY + y3 * perspective;

          const sx = targetX - particle.x;
          const sy = targetY - renderY;
          const sDist = Math.sqrt(sx * sx + sy * sy) || 1;

          const spherePull = (0.07 + 0.18 * sphereT) * (0.55 + 0.45 * depth);
          particle.vx += (sx / sDist) * spherePull * sphereT;
          particle.vy += (sy / sDist) * spherePull * sphereT;

          // "Finish" convergence: once strong, lerp into place quickly.
          if (sphereT > 0.92) {
            particle.x += sx * 0.10;
            particle.y += sy * 0.10;
            particle.vx *= 0.72;
            particle.vy *= 0.72;
          }

          // Collect points that are actually within the sphere surface for connections.
          const dxS = particle.x - sphereCenterX;
          const dyS = renderY - sphereCenterY;
          inSphereNow = dxS * dxS + dyS * dyS <= (sphereRadius * 1.06) ** 2;
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
          // Vivid Enzy Green for the distinct particles, with a subtle glow
          ctx.fillStyle = isLightMode 
            ? `rgba(25, 173, 125, ${0.8 + intensity * 0.2})`
            : `rgba(25, 173, 125, ${0.8 + intensity * 0.2})`;
            
          // Keep a very slight bloom/glow so they still blur slightly behind glass, but aren't blinding
          ctx.shadowBlur = 5;
          ctx.shadowColor = `rgba(25, 173, 125, ${isLightMode ? 0.3 : 0.5})`;
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
          particle.x - pixelSize / 2,
          renderY - pixelSize / 2,
          pixelSize,
          pixelSize
        );

        // Fill the sphere interior so it feels complete.
        // We keep this subtle and only when the sphere is mostly formed.
        if (sphereT > 0.74 && inSphereNow) {
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
        const follow = targetMoved ? 0.58 : 0.22;
        renderCenterRef.current.x += (cx - renderCenterRef.current.x) * follow;
        renderCenterRef.current.y += (cy - renderCenterRef.current.y) * follow;
      } else {
        // Fall back to the target center when we don't have enough points yet.
        const follow = targetMoved ? 0.62 : 0.16;
        renderCenterRef.current.x += (sphereCenterX - renderCenterRef.current.x) * follow;
        renderCenterRef.current.y += (sphereCenterY - renderCenterRef.current.y) * follow;
      }

      lastHoldTargetRef.current = holdTargetRef.current;

      // Local filament connections: short, smooth segments (no scribbles).
      if (sphereT > 0.74 && inSpherePoints.length > 0) {
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
        inSpherePoints.length >= Math.floor(ambientParticlesRef.current.length * 0.62);

      if (holding) {
        if (formedNow) {
          if (sphereFormedAtRef.current === null) sphereFormedAtRef.current = now;
        } else {
          sphereFormedAtRef.current = null;
        }

        if (sphereFormedAtRef.current !== null && now - sphereFormedAtRef.current > 1400) {
          sphereReadyRef.current = true;
        }
      }

      // Consume on release edge, after we've held a formed sphere long enough.
      if (releasedThisFrame && sphereReadyRef.current) {
        easterEggConsumedRef.current = true;
        sphereFocusRef.current.active = false;
        sphereFocusRef.current.strength = 0;
        ambientParticlesRef.current = [];
        trailDotsRef.current = [];
        sphereFormedAtRef.current = null;
        sphereReadyRef.current = false;
        gatherBoostedRef.current = false;
        renderCenterRef.current = { x: 0, y: 0 };
      }

      lastHoldingRef.current = holding;

      // Add smoothed mouse position to path for uniform trail spacing
      const currentTime = Date.now();
      if (isDesktop && velocity > 0.3) {
        mousePathRef.current.push({ x: smoothedMouseRef.current.x, y: smoothedMouseRef.current.y });
        
        // Keep path limited to recent positions
        if (mousePathRef.current.length > 100) {
          mousePathRef.current.shift();
        }
      }

      // Add trail dots with uniform spacing using smoothed positions
      if (isDesktop && velocity > 0.3 && currentTime - lastTrailAddTimeRef.current > 16) {
        lastTrailAddTimeRef.current = currentTime;
        
        // Calculate total distance from last trail dot position
        if (trailDotsRef.current.length > 0) {
          const lastDot = trailDotsRef.current[trailDotsRef.current.length - 1];
          const distFromLast = Math.sqrt(
            (smoothedMouseRef.current.x - lastDot.x) ** 2 + (smoothedMouseRef.current.y - lastDot.y) ** 2
          );
          
          // Only add a dot if we've traveled at least 15 pixels
          const spacing = 15;
          if (distFromLast >= spacing) {
            const numDotsToAdd = Math.floor(distFromLast / spacing);
            
            for (let i = 1; i <= numDotsToAdd; i++) {
              const t = (i * spacing) / distFromLast;
              const x = lastDot.x + (smoothedMouseRef.current.x - lastDot.x) * t;
              const y = lastDot.y + (smoothedMouseRef.current.y - lastDot.y) * t;
              
              trailDotsRef.current.push({
                x,
                y,
                life: 1,
                maxLife: 1,
                size: 2.5,
              });
            }
          }
        } else {
          // First dot
          trailDotsRef.current.push({
            x: smoothedMouseRef.current.x,
            y: smoothedMouseRef.current.y,
            life: 1,
            maxLife: 1,
            size: 2.5,
          });
        }
      }

      // LAYER 3: Draw trail dots (top layer - always visible)
      trailDotsRef.current = trailDotsRef.current.filter((dot) => {
        dot.life -= 0.018;

        if (dot.life <= 0) return false;

        const alpha = dot.life;
        const pixelSize = dot.size * 2;

        // Draw trail pixel as square
        ctx.fillStyle = isLightMode
          ? `rgba(0, 0, 0, ${alpha * 0.5})`
          : `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.fillRect(
          dot.x - pixelSize / 2,
          dot.y - pixelSize / 2,
          pixelSize,
          pixelSize
        );

        return true;
      });

      // Limit number of trail dots
      if (trailDotsRef.current.length > 250) {
        trailDotsRef.current = trailDotsRef.current.slice(-250);
      }

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
        const particleCount = width > 768 ? 500 : 420;
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
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLightMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full transition-colors duration-500"
      style={{ background: isLightMode ? "#fdfbf7" : "#0b0f14" }}
    />
  );
}