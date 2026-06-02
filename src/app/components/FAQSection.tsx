"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { JsonLd } from './JsonLd';
import { SITE_FAQS } from '@/app/lib/faq-data';
import { usePathname } from 'next/navigation';

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SITE_FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export function FAQSection() {
  const { isLightMode } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pathname = usePathname();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // If an answer links to /book-a-demo but we're already on that page, scroll to
  // the top instead of triggering a same-page navigation (which reloads).
  const handleAnswerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const link = (e.target as HTMLElement).closest('a');
    if (link?.getAttribute('href') === '/book-a-demo' && pathname === '/book-a-demo') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 w-full overflow-hidden z-10">
      <JsonLd data={faqPageSchema} />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-ivyora text-5xl md:text-6xl tracking-[-2px] leading-[1.05] font-medium mb-6 ${isLightMode ? 'text-[#0b0f14]' : 'text-white'}`}
          >
            Frequently Asked <span className="text-[#19ad7d]">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`font-inter text-[15px] md:text-[16px] max-w-2xl mx-auto leading-relaxed ${isLightMode ? 'text-black/60' : 'text-white/60'}`}
          >
            Quick answers about the platform, setup, and where Enzy fits.
          </motion.p>
        </div>

        <div className="space-y-4">
          {SITE_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="relative rounded-2xl overflow-hidden transition-colors liquid-glass hover:border-[#19ad7d]/35"
              >
                <div
                  className={`pointer-events-none absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[#19ad7d]/35 to-transparent transition-opacity ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                />
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg ${isLightMode ? 'text-gray-900' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 ml-4 p-2 rounded-full transition-colors ${
                      isOpen 
                        ? 'bg-[#19ad7d] text-white' 
                        : isLightMode 
                          ? 'bg-black/5 text-gray-500' 
                          : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div
                        onClick={handleAnswerClick}
                        className={`p-6 pt-0 leading-relaxed [&_p]:mt-4 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_li]:marker:text-[#19ad7d] [&_a]:font-medium [&_a]:text-[#19ad7d] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#19ad7d]/80 [&_strong]:font-semibold ${isLightMode ? 'text-gray-600 [&_strong]:text-gray-900' : 'text-gray-300 [&_strong]:text-white'}`}
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}