export type FAQItem = {
  question: string;
  answer: string;
};

/** Single source for FAQ UI + FAQPage JSON-LD */
export const SITE_FAQS: FAQItem[] = [
  {
    question: "What is Enzy?",
    answer:
      "Enzy is an AI performance system for sales teams. It connects your data, surfaces what changed, and helps you take action through competitions, incentives, messaging, and leaderboards.",
  },
  {
    question: "What is sales gamification?",
    answer:
      "Gamification turns the work into clear goals and friendly competition—points, badges, leaderboards, and incentives that reinforce the behaviors that drive revenue.",
  },
  {
    question: "What industries does Enzy serve?",
    answer:
      "Any team that wins on consistent activity and clear goals. We’re common in field sales (solar, roofing, telecom), services, retail, and high-velocity teams.",
  },
  {
    question: "Does Enzy work for D2D sales teams?",
    answer:
      "Yes. Enzy is mobile-first and built for the field—live leaderboards, quick updates, and messaging that keeps reps aligned without extra admin work.",
  },
  {
    question: "How long does it take to implement Enzy?",
    answer:
      "Fast. Most teams connect data and launch their first competition in 1–2 weeks. We help with integrations, setup, and rollout.",
  },
  {
    question: "How much does Enzy cost?",
    answer:
      "Pricing scales with team size and modules. Reach out for a quote and we’ll recommend a plan based on your workflows and goals.",
  },
];
