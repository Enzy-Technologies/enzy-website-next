"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { cn } from "@/app/components/ui/utils";

export type CTAButtonVariant = "primary" | "secondary";

/**
 * Magnetic wrapper for interactive elements.
 */
function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Marketing / product CTAs — unified across the site.
 *
 * - **primary**: Enzy green gradient + white hairline stroke + light inset shine (matches Specs “Discover More”).
 * - **secondary**: Outline + frosted fill — for “explore”, “learn more”, or de-emphasized actions next to a primary.
 */
const primaryClasses =
  "relative flex items-center justify-center px-6 py-3 rounded-full border-[0.8px] border-[rgba(255,255,255,0.9)] backdrop-blur-[4px] bg-[linear-gradient(189.6deg,rgba(25,173,125,0.85)_25.1%,rgba(20,144,103,0.85)_64.2%)] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15),inset_2px_2px_5px_0px_rgba(255,255,255,0.4)] text-[var(--color-surface-light)] font-['Inter'] font-medium text-[13px] transition-transform hover:opacity-90 active:scale-95 whitespace-nowrap w-full pointer-events-auto";

const secondaryClasses =
  "relative flex items-center justify-center px-6 py-3 rounded-full border font-['Inter'] font-medium text-[13px] transition-all active:scale-95 whitespace-nowrap w-full pointer-events-auto border-black/15 bg-white/90 text-[#0b0f14] shadow-[0_1px_3px_rgba(0,0,0,0.08)] backdrop-blur-md hover:bg-white hover:border-black/25 dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:shadow-none dark:hover:bg-white/10 dark:hover:border-white/25";

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  children: React.ReactNode;
  variant?: CTAButtonVariant;
}

export function CTAButton({
  href,
  className = "",
  variant = "primary",
  children,
  ...props
}: CTAButtonProps) {
  const base = variant === "primary" ? primaryClasses : secondaryClasses;
  
  // Extract max-w constraints to apply to the magnetic wrapper if present
  let wrapperClass = "z-10 relative flex justify-center";
  const safeClassName = className || "";
  let btnClass = cn(base, safeClassName);
  
  // Pass width and max-width classes to the wrapper to maintain correct alignment
  const widthClasses = safeClassName.split(" ").filter(c => c.startsWith("w-") || c.startsWith("sm:w-") || c.startsWith("md:w-") || c.startsWith("lg:w-") || c.startsWith("max-w-") || c.startsWith("sm:max-w-") || c.startsWith("md:max-w-") || c.startsWith("lg:max-w-")).join(" ");
  
  if (widthClasses) {
    wrapperClass = cn(wrapperClass, widthClasses);
  } else {
    wrapperClass = cn(wrapperClass, "w-max");
  }
  
  const renderButton = () => {
    if (href) {
      if (href.startsWith("http")) {
        return (
          <a href={href} className={btnClass}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={btnClass}>
          {children}
        </Link>
      );
    }

    return (
      <button type="button" className={btnClass} {...props}>
        {children}
      </button>
    );
  };

  return <Magnetic className={wrapperClass}>{renderButton()}</Magnetic>;
}
