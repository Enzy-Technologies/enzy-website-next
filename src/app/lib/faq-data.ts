export type FAQItem = {
  question: string;
  /**
   * Answer copy stored as HTML. Used both for the visible UI (rendered via
   * dangerouslySetInnerHTML) and the FAQPage JSON-LD `text` field, so the
   * structured data always matches what users actually see. Only the limited
   * set of tags Google supports in FAQ answers is used here:
   * <p>, <br>, <ul>, <ol>, <li>, <a>, <b>, <strong>, <i>, <em>.
   */
  answer: string;
};

/** Single source for FAQ UI + FAQPage JSON-LD */
export const SITE_FAQS: FAQItem[] = [
  {
    question: "What is Enzy?",
    answer:
      "Enzy is the performance operating system for sales teams. It uses real-time leaderboards, competitions, and incentives to keep reps motivated, give managers visibility into people they can't see every day, and help revenue teams hit their numbers. Enzy connects to any CRM or data source — no rip and replace — automatically tracks the metrics that matter, and turns that data into behavior change on the field.",
  },
  {
    question: "What is sales gamification?",
    answer:
      "Sales gamification is the use of game mechanics — leaderboards, points, badges, challenges, and rewards — in a sales environment to increase rep motivation, consistency, and output. Unlike traditional motivation tactics, it gives salespeople visible, real-time feedback on how they're performing against their goals and their peers. Enzy applies these principles to change behavior, build culture, and grow revenue for distributed sales teams.",
  },
  {
    question: "What industries does Enzy serve?",
    answer:
      "Enzy is built for companies with high-velocity, field-based, or direct sales motions — especially those running distributed 1099 or independent reps. This includes:" +
      "<ul>" +
      "<li>Home Services (solar, roofing, pest control, HVAC, windows, and more)</li>" +
      "<li>Financial Services (life, health, and P&amp;C insurance)</li>" +
      "<li>Telecommunications &amp; Fiber</li>" +
      "<li>Real Estate</li>" +
      "<li>Any business that runs a distributed sales force</li>" +
      "</ul>" +
      "Enzy is most effective in performance-driven organizations with distributed, remote, or non-traditional sales teams.",
  },
  {
    question: "Does Enzy work for D2D sales teams?",
    answer:
      "Yes. Enzy's first customers all worked in the door-to-door industry. D2D sales is one of the hardest environments to manage because reps are spread across territories, performance can vary day to day, and motivation often hinges on immediate feedback. Enzy provides real-time leaderboards that D2D reps can check on their phones between doors, instant recognition when they hit milestones, and territory-level visibility for managers. Teams use Enzy to drive higher daily activity and improve rep retention." +
      "<p><strong><em>Note: Although Enzy was initially built for D2D sales teams, its core functionality serves other non-traditional sales industries like insurance, real estate, and telecom/fiber.</em></strong></p>",
  },
  {
    question: "How long does it take to implement Enzy?",
    answer:
      "Implementation time varies depending on your team's setup, but most customers are fully live within a few days to one week. The process includes connecting your existing CRM and data sources, configuring the metrics you want to track, and onboarding your reps — and the Enzy team supports you through all of it. How fast you go live depends mostly on how quickly your team aligns on configuration and gets the right people in the room.",
  },
  {
    question: "How much does Enzy cost?",
    answer:
      "Enzy uses standardized pricing tailored to your team's size and the features you need. Core Enzy features are included, with Canvassing and Onboarding/Recruiting available as add-ons. Because every sales team is structured differently, we walk through the exact breakdown on a demo — <a href=\"/book-a-demo\">book one here</a>. Most teams see ROI within the first quarter, driven by higher rep productivity, lower turnover, and increased revenue.",
  },
];
