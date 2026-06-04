export interface PageSEO {
  title: string;
  description: string;
  image?: string;
}

export const SEO_CONFIG: Record<string, PageSEO> = {
  home: {
    title: "Enzy | The Performance Operating System for Sales Teams",
    description: "Performance is the largest untapped lever in your business. Enzy is the operating system that surfaces it.",
  },
  features: {
    title: "Features - Enzy platform",
    description: "Explore the system: AI assistant, competitions, incentives, messaging, leaderboards, and integrations — built to drive daily execution.",
  },
  solutions: {
    title: "Solutions - Enzy for your team",
    description: "See how Enzy fits your role — from reps to leaders to ops — turning connected data into actions and outcomes.",
  },
  resources: {
    title: "Resources - Enzy",
    description: "Insights, customer stories, partners, and integrations — everything to help your sales team build momentum and get more out of Enzy.",
  },
  about: {
    title: "About Enzy",
    description: "Why Enzy exists: a simpler, AI-first way to drive daily execution, engagement, and results.",
  },
  integrations: {
    title: "Integrations - Connect Enzy with your tools",
    description: "Enzy integrates with 50+ CRMs, field-service platforms, dialers, and tools. Automatically track activity, sync records, and trigger actions across your stack.",
  },
  partners: {
    title: "Partners - Enzy",
    description: "Meet the partners that help Enzy customers grow — payroll, commissions, apparel, swag, and background checks — and apply to become an Enzy partner.",
  },
  affiliateProgram: {
    title: "Affiliate Program - Enzy",
    description: "Join the Enzy Affiliate Program. Refer sales organizations to Enzy and earn 10% of first-year ARR for every referral that signs.",
  },
  customerStories: {
    title: "Customer Stories - Enzy",
    description: "Real teams, real rollouts, real results. See how sales organizations turn fragmented activity into visible momentum with Enzy.",
  },
  insights: {
    title: "Insights - Enzy blog, playbooks & case studies",
    description: "Articles, playbooks, and customer case studies on sales performance, competitions, incentives, and building high-performance teams with Enzy.",
  },
  contactUs: {
    title: "Contact Us - Enzy sales & support",
    description: "Get in touch with the Enzy team. Reach sales for demos and pricing, or contact support for help with your account — phone and email included.",
  },
};
