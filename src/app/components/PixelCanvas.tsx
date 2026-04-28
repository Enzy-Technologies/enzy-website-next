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
}

export function PixelCanvas() {
  const { isLightMode } = useTheme();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailDotsRef = useRef<TrailDot[]>([]);
  const ambientParticlesRef = useRef<AmbientParticle[]>([]);
  
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize ambient particles - increased density for desktop
    const particleCount = window.innerWidth > 768 ? 500 : 250;
    if (ambientParticlesRef.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
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
        });
      }
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

      const isDesktop = window.innerWidth > 768;
      const isMobile = !isDesktop;

      // Mobile-only: "magnetization" bunch under the menu while scrolling.
      // We measure scroll velocity and use it as a force multiplier.
      const scrollY = window.scrollY;
      const rawScrollVel = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;
      smoothedScrollVelRef.current += (rawScrollVel - smoothedScrollVelRef.current) * 0.2;
      const scrollSpeed = Math.min(1, Math.abs(smoothedScrollVelRef.current) / 40);

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

      // LAYER 2: Update and draw ambient particles (middle layer)
      ambientParticlesRef.current.forEach((particle) => {
        // Normal floating behavior
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Gentle bounds wrapping
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

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

        // Damping - reduced for tighter clustering
        particle.vx *= 0.96;
        particle.vy *= 0.96;

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
        const renderY = isDesktop 
          ? particle.y 
          : (((particle.y - parallaxOffset) % canvas.height) + canvas.height) % canvas.height;

        // Mobile-only attractor: keep particles bunched near top-center under the header.
        if (isMobile) {
          const attractorX = canvas.width / 2;
          // Under the menu: header sits above `main` which starts at ~88px.
          const attractorY = Math.min(140, canvas.height * 0.22);

          const dx = attractorX - particle.x;
          const dy = attractorY - renderY;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          // Constant pull + extra pull while scrolling (magnetization feel).
          const basePull = 0.018;
          const scrollPull = 0.06 * scrollSpeed;
          const pull = basePull + scrollPull;

          const radius = 520;
          if (dist < radius) {
            const falloff = 1 - dist / radius;
            particle.vx += (dx / dist) * pull * falloff;
            particle.vy += (dy / dist) * pull * falloff;
          }
        }

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

        ctx.fillRect(
          particle.x - pixelSize / 2,
          renderY - pixelSize / 2,
          pixelSize,
          pixelSize
        );
        
        // Reset shadow so it doesn't affect standard particles or trails
        ctx.shadowBlur = 0;
      });

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

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Only reinitialize particles if width changes (e.g., orientation change)
      // Ignoring height-only changes prevents particles from jumping/resetting
      // when the mobile browser's address bar hides or shows during scrolling.
      if (window.innerWidth !== lastWidth) {
        ambientParticlesRef.current = [];
        const particleCount = window.innerWidth > 768 ? 500 : 250;
        for (let i = 0; i < particleCount; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
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
          });
        }
        lastWidth = window.innerWidth;
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