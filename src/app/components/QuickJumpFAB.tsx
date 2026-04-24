"use client";

import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Layers, X } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { useTheme } from "./ThemeProvider";

type QuickJumpItem = {
  id: string;
  label: string;
  meta?: string;
};

export function QuickJumpFAB({
  title = "Quick Jump",
  items,
  onJump,
  className = "",
}: {
  title?: string;
  items: QuickJumpItem[];
  onJump: (id: string) => void;
  className?: string;
}) {
  const { isLightMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className={`fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            initial={{
              opacity: 0,
              y: 12,
              scale: 0.7,
              clipPath: "circle(0% at 100% 100%)",
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              clipPath: "circle(150% at 100% 100%)",
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 12,
              scale: 0.7,
              clipPath: "circle(0% at 100% 100%)",
              filter: "blur(10px)",
            }}
            transition={{ type: "spring", bounce: 0.22, duration: 0.6 }}
            style={{ transformOrigin: "bottom right" }}
            className="absolute bottom-full right-0 mb-3 w-64 md:w-72 p-2 rounded-2xl flex flex-col gap-1 overflow-hidden transition-colors duration-500 liquid-glass border-[#19ad7d]/20"
            role="menu"
            aria-label={title}
            aria-describedby={menuId}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/50 to-transparent" />
            <div className={`p-3 border-b mb-1 transition-colors duration-500 ${isLightMode ? "border-black/5" : "border-white/5"}`}>
              <span
                id={menuId}
                className={`eyebrow transition-colors duration-500 ${
                  isLightMode ? "text-black/40" : "text-white/40"
                }`}
              >
                {title}
              </span>
            </div>

            <div
              className={`max-h-[50vh] overflow-y-auto pr-1 pb-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors duration-500 ${
                isLightMode
                  ? "[&::-webkit-scrollbar-thumb]:bg-black/10 hover:[&::-webkit-scrollbar-thumb]:bg-black/20"
                  : "[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
              }`}
            >
              {items.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => onJump(item.id), 100);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors group flex items-center justify-between ${
                    isLightMode ? "hover:bg-black/5" : "hover:bg-white/5"
                  }`}
                  role="menuitem"
                >
                  <span
                    className={`font-['Inter'] text-[13px] transition-colors truncate pr-4 ${
                      isLightMode ? "text-black/70 group-hover:text-black" : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#19ad7d]/50 group-hover:text-[#19ad7d] font-['Inter'] font-semibold transition-colors">
                    {item.meta ?? (i + 1).toString().padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTAButton
        variant="primary"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="w-14 h-14 md:w-16 md:h-16 p-0 rounded-[16px] md:rounded-[18px] hover:scale-105 transition-transform duration-300 hover:!opacity-100"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            {isOpen ? (
              <X size={22} />
            ) : (
              <Layers size={22} />
            )}
          </motion.span>
        </AnimatePresence>
      </CTAButton>
    </div>
  );
}

