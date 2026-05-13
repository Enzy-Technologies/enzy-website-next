"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Script from "next/script";
import { useTheme } from "./ThemeProvider";

export function PartnerFormModal() {
  const { isLightMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [formsMounted, setFormsMounted] = useState(false);
  const [formsBlocked, setFormsBlocked] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-partner-modal", handleOpen);
    return () => window.removeEventListener("open-partner-modal", handleOpen);
  }, []);

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;
    
    // Mark mounted once HubSpot injects the form markup.
    const t = window.setInterval(() => {
      const hasMarkup = !!document.querySelector(
        "#partner-form-container .hs-form, #partner-form-container form.hs-form"
      );
      if (hasMarkup) {
        setFormsMounted(true);
        window.clearInterval(t);
      }
    }, 250);
    return () => window.clearInterval(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    
    const t = window.setTimeout(() => {
      const hasMarkup = !!document.querySelector(
        "#partner-form-container .hs-form, #partner-form-container form.hs-form"
      );
      // @ts-ignore
      const available = !!window.hbspt;
      if (!available && !hasMarkup) setFormsBlocked(true);
    }, 10_000);
    return () => window.clearTimeout(t);
  }, [isOpen]);

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
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] md:rounded-[32px] p-6 md:p-10 border shadow-2xl ${
              isLightMode 
                ? "bg-white border-black/10" 
                : "bg-[#0b0f14] border-white/10"
            } [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full transition-colors ${
                isLightMode ? "hover:bg-black/5 text-black/60 hover:text-black" : "hover:bg-white/5 text-white/60 hover:text-white"
              }`}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="mb-8">
              <h2 className={`font-ivyora text-4xl md:text-5xl tracking-tight mb-3 ${isLightMode ? "text-black" : "text-white"}`}>
                Become a Partner
              </h2>
              <p className={`font-inter text-sm md:text-base ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                Fill out the form below and our partner team will be in touch shortly.
              </p>
            </div>

            <div className="min-h-[400px] relative">
              <Script
                src="https://js-na2.hsforms.net/forms/embed/developer/39823762.js"
                strategy="afterInteractive"
              />

              <div id="partner-form-container" className="enzy-hubspot-embed">
                {!formsMounted && !formsBlocked ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className={`m-0 font-inter text-[13px] ${isLightMode ? "text-black/60" : "text-white/60"}`}>Loading form…</p>
                  </div>
                ) : null}

                {formsBlocked ? (
                  <div className="text-left">
                    <p className={`m-0 font-inter text-[13px] font-semibold ${isLightMode ? "text-black" : "text-white"}`}>
                      HubSpot embed didn’t load.
                    </p>
                    <p className={`m-0 mt-1 font-inter text-[12px] ${isLightMode ? "text-black/60" : "text-white/60"}`}>
                      This is usually caused by an ad blocker / privacy extension or a network policy blocking `js-na2.hsforms.net`.
                      Try disabling extensions for `localhost` and refresh.
                    </p>
                  </div>
                ) : null}

                <div
                  className={formsBlocked ? "hidden" : "hs-form-html"}
                  data-region="na2"
                  data-form-id="d9f856f3-0be8-43a5-8997-9900695d8214"
                  data-portal-id="39823762"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
