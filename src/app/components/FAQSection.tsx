import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Enzy?",
    answer: "Enzy is an AI performance system for sales teams. It connects your data, surfaces what changed, and helps you take action through competitions, incentives, messaging, and leaderboards."
  },
  {
    question: "What is sales gamification?",
    answer: "Gamification turns the work into clear goals and friendly competition—points, badges, leaderboards, and incentives that reinforce the behaviors that drive revenue."
  },
  {
    question: "What industries does Enzy serve?",
    answer: "Any team that wins on consistent activity and clear goals. We’re common in field sales (solar, roofing, telecom), services, retail, and high-velocity teams."
  },
  {
    question: "Does Enzy work for D2D sales teams?",
    answer: "Yes. Enzy is mobile-first and built for the field—live leaderboards, quick updates, and messaging that keeps reps aligned without extra admin work."
  },
  {
    question: "How long does it take to implement Enzy?",
    answer: "Fast. Most teams connect data and launch their first competition in 1–2 weeks. We help with integrations, setup, and rollout."
  },
  {
    question: "How much does Enzy cost?",
    answer: "Pricing scales with team size and modules. Reach out for a quote and we’ll recommend a plan based on your workflows and goals."
  }
];

export function FAQSection() {
  const { isLightMode } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 w-full overflow-hidden z-10">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`font-['IvyOra_Text'] text-5xl md:text-6xl tracking-[-2px] leading-[1.1] font-medium mb-6 ${isLightMode ? 'text-[#0b0f14]' : 'text-white'}`}
          >
            Frequently Asked <span className="text-[#19ad7d]">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`font-['Inter'] text-[15px] md:text-[16px] max-w-2xl mx-auto leading-relaxed ${isLightMode ? 'text-black/60' : 'text-white/60'}`}
          >
            Quick answers about the platform, setup, and where Enzy fits.
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
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
                      <div className={`p-6 pt-0 leading-relaxed ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
                        {faq.answer}
                      </div>
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