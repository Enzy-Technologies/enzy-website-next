export interface PageSEO {
  title: string;
  description: string;
  image?: string;
}

export const SEO_CONFIG: Record<string, PageSEO> = {
  home: {
    title: "Enzy - AI operating system for sales teams",
    description: "Connect your data, get real-time insights, and take action faster with Enzy’s AI-powered performance system—competitions, incentives, messaging, and leaderboards.",
  },
  features: {
    title: "Features - Enzy platform",
    description: "Explore the system: AI assistant, competitions, incentives, messaging, leaderboards, and integrations—built to drive daily execution.",
  },
  solutions: {
    title: "Solutions - Enzy for your team",
    description: "See how Enzy fits your role—from reps to leaders to ops—turning connected data into actions and outcomes.",
  },
  resources: {
    title: "Resources - Enzy",
    description: "Guides, playbooks, and customer stories for building momentum, running competitions, and improving performance.",
  },
  about: {
    title: "About Enzy",
    description: "Why Enzy exists: a simpler, AI-first way to drive daily execution, engagement, and results.",
  },
};
