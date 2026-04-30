"use client";

import React, { useEffect, useRef, useState } from "react";
import { Fingerprint } from "lucide-react";
import { useTheme } from "@/app/components/ThemeProvider";

export function VisualizeSystemWidget() {
  const { isLightMode } = useTheme();
  const [isHolding, setIsHolding] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Safety: if the page loses focus while holding, release.
    const onBlur = () => {
      setIsHolding(false);
      window.dispatchEvent(
        new CustomEvent("enzy-pixel-sphere", {
          detail: { active: false, x: window.innerWidth / 2, y: window.innerHeight / 2 },
        })
      );
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, []);

  const setSphereHold = (active: boolean, x: number, y: number) => {
    setIsHolding(active);
    window.dispatchEvent(new CustomEvent("enzy-pixel-sphere", { detail: { active, x, y } }));
  };

  const getSphereCenterFromPointer = (x: number, y: number) => {
    // Gather above the user's thumb so the whole sphere is visible.
    const offsetY = 180;
    const cx = Math.max(24, Math.min(window.innerWidth - 24, x));
    const cy = Math.max(140, Math.min(window.innerHeight - 220, y - offsetY));
    return { x: cx, y: cy };
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
      <div className="mx-auto w-full max-w-[560px] px-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
        <div className="pointer-events-auto flex justify-center">
          <div className="relative w-full">
            <div
              className="absolute inset-x-0 bottom-0 mx-auto w-[260px]"
              style={{ transformOrigin: "bottom center" }}
            >
              <button
                ref={buttonRef}
                type="button"
                className={`group relative w-full ${
                  "h-[64px] rounded-full"
                } ring-1 transition-all duration-200 ease-out ${
                  isLightMode
                    ? "bg-white/85 ring-black/10 hover:bg-white/90"
                    : "bg-black/60 ring-white/10 hover:bg-black/70"
                }`}
                aria-label="Hold to visualize your system with Enzy"
                onPointerDown={(e) => {
                  (e.currentTarget as HTMLButtonElement).setPointerCapture(e.pointerId);
                  if (navigator.vibrate) navigator.vibrate(12);
                  const { x, y } = getSphereCenterFromPointer(e.clientX, e.clientY);
                  setSphereHold(true, x, y);
                }}
                onPointerMove={(e) => {
                  if (!(e.currentTarget as HTMLButtonElement).hasPointerCapture(e.pointerId)) return;
                  const { x, y } = getSphereCenterFromPointer(e.clientX, e.clientY);
                  setSphereHold(true, x, y);
                }}
                onPointerUp={(e) => {
                  if ((e.currentTarget as HTMLButtonElement).hasPointerCapture(e.pointerId)) {
                    (e.currentTarget as HTMLButtonElement).releasePointerCapture(e.pointerId);
                  }
                  const { x, y } = getSphereCenterFromPointer(e.clientX, e.clientY);
                  setSphereHold(false, x, y);
                }}
                onPointerCancel={(e) => {
                  if ((e.currentTarget as HTMLButtonElement).hasPointerCapture(e.pointerId)) {
                    (e.currentTarget as HTMLButtonElement).releasePointerCapture(e.pointerId);
                  }
                  const { x, y } = getSphereCenterFromPointer(e.clientX, e.clientY);
                  setSphereHold(false, x, y);
                }}
              >
                <span
                  className="absolute inset-0 rounded-[inherit] pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(55% 85% at 50% 15%, rgba(25,173,125,0.18), transparent 62%)",
                    opacity: 0.65,
                    transition: "opacity 200ms ease-out",
                  }}
                  aria-hidden
                />

                <span className="relative flex h-full w-full items-center justify-center">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${
                      isLightMode ? "bg-black/[0.03] ring-black/10" : "bg-white/[0.06] ring-white/10"
                    }`}
                    aria-hidden
                  >
                    <span className="absolute inline-flex h-12 w-12 rounded-2xl ring-2 ring-[#19ad7d]/25 animate-pulse" />
                    <Fingerprint className={isLightMode ? "text-black/60" : "text-white/70"} size={20} />
                  </span>

                  <span className="ml-3 flex flex-col items-start">
                    <span
                      className={`font-['Inter'] text-[12.5px] font-semibold ${
                        isLightMode ? "text-brand-dark" : "text-brand-light"
                      }`}
                    >
                      Visualize your system
                    </span>
                    <span className={`font-['Inter'] text-[11.5px] ${isLightMode ? "text-black/55" : "text-white/55"}`}>
                      {isHolding ? "Release to disperse" : "Press & hold"}
                    </span>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

