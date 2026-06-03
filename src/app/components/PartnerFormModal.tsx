"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { HubSpotForm } from "./HubSpotForm";

export function PartnerFormModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-partner-modal", handleOpen);
    return () => window.removeEventListener("open-partner-modal", handleOpen);
  }, []);

  // Stable identity prevents the Escape useEffect below from re-subscribing on
  // every render (and silences a real react-hooks/exhaustive-deps warning).
  const onClose = useCallback(() => setIsOpen(false), []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] md:rounded-[32px] p-6 md:p-10 border shadow-2xl bg-white border-black/10 dark:bg-[#0b0f14] dark:border-white/10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full transition-colors hover:bg-black/5 text-black/60 hover:text-black dark:hover:bg-white/5 dark:text-white/60 dark:hover:text-white"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <h2 className="font-ivyora text-4xl md:text-5xl tracking-tight mb-3 text-black dark:text-white">
                Become a Partner
              </h2>
              <p className="font-inter text-sm md:text-base text-black/60 dark:text-white/60">
                Fill out the form below and our partner team will be in touch shortly.
              </p>
            </div>

            <div className="min-h-[400px] relative enzy-hubspot-embed">
              {/* Re-mounts (and re-runs the HubSpot embed) every time the modal
                  opens, because the modal subtree is unmounted while closed. */}
              <HubSpotForm
                formId="d9f856f3-0be8-43a5-8997-9900695d8214"
                loadingAlign="center"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
