"use client";

import { useEffect } from "react";

/**
 * Automatically applies a spotlight effect to all `.liquid-glass` elements on the page.
 * Tracks the mouse and updates `--mouse-x` and `--mouse-y` CSS variables on each card.
 */
export function SpotlightCursor() {
  useEffect(() => {
    // The spotlight follows a real cursor, so it does nothing useful on touch
    // devices — yet the rAF loop below runs every frame and forces a layout
    // (getBoundingClientRect on every .liquid-glass card) on each one. Skip the
    // whole effect on devices without a fine, hovering pointer (i.e. mobile).
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let rafId: number;
    const updateSpotlights = () => {
      const cards = document.querySelectorAll(".liquid-glass");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // Calculate mouse position relative to the card
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;

        // Only update if the mouse is near the card to save performance
        if (x > -500 && x < rect.width + 500 && y > -500 && y < rect.height + 500) {
          (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
          (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
        }
      });
      rafId = requestAnimationFrame(updateSpotlights);
    };

    rafId = requestAnimationFrame(updateSpotlights);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
