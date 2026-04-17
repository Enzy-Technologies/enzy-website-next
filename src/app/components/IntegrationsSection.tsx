"use client";

import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTheme } from "./ThemeProvider";

const partnerLogos = [
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2039.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2017.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2031.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2012.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2030.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2024.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2038.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2032.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2011.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2033.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%205.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%207.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2014.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2040.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2020.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2042.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2029.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2041.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2015.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2037.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2036.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2035.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2034.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2027.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2028.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2026.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2023.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2022.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2021.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2025.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2019.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2018.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2016.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%206.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%2013.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%208.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%209.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%203.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/image%204.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Integrations/Shopify%20Logo.png"
];

const col1 = partnerLogos.filter((_, i) => i % 3 === 0);
const col2 = partnerLogos.filter((_, i) => i % 3 === 1);
const col3 = partnerLogos.filter((_, i) => i % 3 === 2);

function IntegrationPill({ url }: { url: string }) {
  const { isLightMode } = useTheme();
  return (
    <div
      className={`w-28 md:w-40 h-36 md:h-56 rounded-full flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300 p-6 mb-4 md:mb-5 backdrop-blur-xl border shadow-[0_24px_64px_rgba(0,0,0,0.08)] ${
        isLightMode
          ? "bg-white/70 border-black/10"
          : "bg-white/10 border-white/15 shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
      }`}
    >
      <ImageWithFallback src={url} alt="Partner Logo" className="w-full h-full object-contain" />
    </div>
  );
}

export function IntegrationsSection() {
  const { isLightMode } = useTheme();
  return (
    <section className="relative z-10 w-full flex justify-center overflow-hidden px-[0px] py-[24px] bg-transparent">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        
        {/* Left side: Floating logos grid */}
        <div 
          className="flex gap-4 md:gap-5 items-center justify-center w-full lg:w-1/2 relative h-[500px] md:h-[600px] overflow-hidden"
          style={{ 
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)', 
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' 
          }}
        >
          {/* Column 1 */}
          <div className="flex flex-col pt-8">
            <motion.div 
              className="flex flex-col"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 90 }}
            >
              {[...col1, ...col1, ...col1, ...col1].map((url, i) => <IntegrationPill key={`col1-${i}`} url={url} />)}
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col -mt-32">
            <motion.div 
              className="flex flex-col"
              animate={{ y: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 110 }}
            >
              {[...col2, ...col2, ...col2, ...col2].map((url, i) => <IntegrationPill key={`col2-${i}`} url={url} />)}
            </motion.div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col pt-16">
            <motion.div 
              className="flex flex-col"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 100 }}
            >
              {[...col3, ...col3, ...col3, ...col3].map((url, i) => <IntegrationPill key={`col3-${i}`} url={url} />)}
            </motion.div>
          </div>
        </div>

        {/* Right side: Header */}
        <div className="flex flex-col items-start w-full lg:w-1/2 gap-8 px-[16px] py-[0px]">
          <div className="flex flex-col relative w-full">
            <h2
              className={`font-['Inter'] font-semibold text-[64px] md:text-8xl lg:text-[96px] tracking-[-5px] leading-none mb-2 ${
                isLightMode ? "text-[#0b0f14]" : "text-[#f5f7fa]"
              }`}
            >
              Plug N'Play
            </h2>
          </div>
          <p
            className={`font-['Inter'] text-xl max-w-[500px] leading-relaxed ${
              isLightMode ? "text-black/75" : "text-white/75"
            }`}
          >
            Enzy plugs directly into your existing ecosystem, so everything runs smoothly from day one. And if the integration you need isn’t there yet, we’ll build it.
          </p>
        </div>

      </div>
    </section>
  );
}