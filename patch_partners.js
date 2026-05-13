const fs = require('fs');
const path = './src/app/Partners.tsx';

let content = fs.readFileSync(path, 'utf8');

const newPlaceholders = `const LOGO_PLACEHOLDERS = [
  { 
    name: "Salesforce", 
    url: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    desc: "Sync all your Enzy activities directly to Salesforce. Automatically log calls, emails, and meetings to keep your CRM up to date without manual data entry.",
    features: ["Bi-directional sync", "Custom field mapping", "Real-time activity logging"]
  },
  { 
    name: "HubSpot", 
    url: "https://upload.wikimedia.org/wikipedia/commons/e/e3/HubSpot_Logo.svg",
    desc: "Connect Enzy with HubSpot to trigger workflows, update deal stages, and track performance metrics seamlessly across both platforms.",
    features: ["Workflow automation", "Deal stage sync", "Contact enrichment"]
  },
  { 
    name: "Gong", 
    url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Gong_Logo.svg",
    desc: "Bring Gong's conversational intelligence into Enzy. Trigger coaching nudges based on call scores and track talk-time metrics on the leaderboard.",
    features: ["Call score triggers", "Talk-time tracking", "Coaching integration"]
  },
  { 
    name: "Outreach", 
    url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Outreach_logo.svg",
    desc: "Gamify your Outreach sequences. Award points for sequence steps completed, meetings booked, and replies received.",
    features: ["Sequence tracking", "Reply rate metrics", "Meeting booked triggers"]
  },
  { 
    name: "Slack", 
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    desc: "Celebrate wins where your team already lives. Send automated alerts to Slack channels when reps hit quota, close deals, or top the leaderboard.",
    features: ["Automated celebrations", "Leaderboard updates", "Custom channel routing"]
  },
  { 
    name: "Zoom", 
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg",
    desc: "Automatically track Zoom meetings held and duration. Use meeting data to drive competitions and measure virtual sales activity.",
    features: ["Meeting tracking", "Duration metrics", "Attendance logging"]
  },
  { 
    name: "Zendesk", 
    url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Zendesk_logo.svg",
    desc: "Motivate your support and success teams. Track tickets closed, CSAT scores, and response times to build a culture of excellence.",
    features: ["Ticket tracking", "CSAT integration", "Response time metrics"]
  },
  { 
    name: "Microsoft Teams", 
    url: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg",
    desc: "Keep your team aligned and motivated with Microsoft Teams integration. Broadcast achievements and leaderboard changes directly to your channels.",
    features: ["Achievement broadcasts", "Leaderboard alerts", "Team notifications"]
  },
];`;

content = content.replace(/const LOGO_PLACEHOLDERS = \[[\s\S]*?\];/, newPlaceholders);

// Add missing imports
if (!content.includes('AnimatePresence')) {
  content = content.replace('import { motion, useScroll, useTransform } from "motion/react";', 'import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";');
}
if (!content.includes('useState')) {
  content = content.replace('import React, { useRef } from "react";', 'import React, { useRef, useState } from "react";');
}
if (!content.includes('X,')) {
  content = content.replace('import { ArrowRight, CheckCircle2, Zap, Network, Rocket } from "lucide-react";', 'import { X, ArrowRight, CheckCircle2, Zap, Network, Rocket } from "lucide-react";');
}

// Replace Partners function
const newPartnersFunc = `export function Partners() {
  const { isLightMode } = useTheme();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem = LOGO_PLACEHOLDERS.find((item) => item.name === selectedId);

  return (
    <main className="relative w-full pb-24 md:pb-32">
      {/* Hero Section */}
      <section className="relative w-full px-4 pt-32 pb-16 md:pt-48 md:pb-24 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center max-w-4xl"
          >
            <div className={\`px-5 py-2 rounded-full border backdrop-blur-sm mb-6 md:mb-8 transition-colors duration-500 eyebrow \${
              isLightMode ? 'border-black/10 bg-black/5 text-black/60' : 'border-white/10 bg-white/5 text-white/60'
            }\`}>
              Partner Network
            </div>
            
            <BlurReveal
              as="h1"
              className={\`font-ivyora font-medium text-5xl md:text-7xl lg:text-[90px] leading-[0.95] tracking-[-2px] text-center transition-colors duration-500 \${
                isLightMode ? "text-brand-dark" : "text-brand-light"
              }\`}
            >
              Integrated with the tools you use
            </BlurReveal>

            <BlurReveal
              as="p"
              delay={0.1}
              className={\`font-inter text-lg md:text-xl mt-8 max-w-2xl text-center leading-relaxed transition-colors duration-500 \${
                isLightMode ? "text-black/60" : "text-white/60"
              }\`}
            >
              Connect Enzy to your existing tech stack to automatically track activities, update records, and trigger actions.
            </BlurReveal>
          </motion.div>
        </div>
      </section>

      {/* Integration Grid / Directory */}
      <section id="directory" className="relative w-full px-4 max-w-7xl mx-auto">
        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {LOGO_PLACEHOLDERS.map((logo, i) => (
            <FadeInSection key={i} delay={i * 0.05}>
              <motion.div 
                layoutId={\`partner-card-\${logo.name}\`}
                onClick={() => setSelectedId(logo.name)}
                className={\`aspect-[4/3] rounded-2xl border flex flex-col items-center justify-center p-6 transition-all duration-300 group cursor-pointer \${
                  isLightMode 
                    ? "border-black/5 bg-black/[0.02] hover:bg-black/5 hover:border-black/10" 
                    : "border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10"
                }\`}
              >
                <div className="flex-1 w-full flex items-center justify-center relative">
                   <Image 
                     src={logo.url} 
                     alt={\`\${logo.name} integration\`}
                     width={120}
                     height={40}
                     className={\`object-contain transition-transform duration-300 group-hover:scale-110 \${
                       isLightMode ? "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100" : "grayscale invert opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                     }\`}
                   />
                </div>
                <div className={\`mt-4 w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-inter text-xs font-semibold uppercase tracking-wider \${
                  isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"
                }\`}>
                  <span>{logo.name}</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4} className="mt-16 text-center">
          <p className={\`font-inter text-sm md:text-base \${isLightMode ? 'text-black/60' : 'text-white/60'}\`}>
            Don&apos;t see your tool? <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-partner-modal")); }} className="text-[#19ad7d] hover:underline font-semibold">Become a Partner</button> and let us know what we should build next.
          </p>
        </FadeInSection>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md cursor-pointer"
            />
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={\`partner-card-\${selectedItem.name}\`}
                className={\`relative overflow-hidden rounded-[32px] w-full max-w-4xl h-[auto] max-h-[85vh] pointer-events-auto flex flex-col md:flex-row liquid-glass \${
                  isLightMode ? "bg-white/95 border-black/10" : "bg-[#0b0f14]/95 border-white/10"
                }\`}
              >
                {/* Left Half: Logo Display */}
                <div
                  className={\`relative w-full md:w-[40%] h-[200px] md:h-auto flex-shrink-0 flex items-center justify-center p-8 \${
                    isLightMode ? "bg-black/5" : "bg-white/5"
                  }\`}
                >
                  <Image 
                     src={selectedItem.url} 
                     alt={\`\${selectedItem.name} integration\`}
                     width={180}
                     height={80}
                     className={\`object-contain \${
                       isLightMode ? "grayscale opacity-80" : "grayscale invert opacity-80"
                     }\`}
                   />
                </div>

                {/* Right Half: Details */}
                <div
                  className={\`flex-1 w-full md:w-[60%] border-t md:border-t-0 md:border-l p-8 md:p-12 flex flex-col relative z-20 overflow-y-auto \${
                    isLightMode
                      ? "border-black/10 text-black"
                      : "border-white/10 text-white"
                  }\`}
                >
                  <button
                    onClick={() => setSelectedId(null)}
                    className={\`absolute top-6 right-6 p-2 rounded-full transition-colors \${
                      isLightMode
                        ? "bg-black/5 hover:bg-black/10 text-black"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }\`}
                  >
                    <X size={20} />
                  </button>

                  <div className={\`px-4 py-1.5 rounded-full border backdrop-blur-sm mb-6 w-fit text-[11px] font-bold uppercase tracking-[0.2em] \${
                    isLightMode ? "border-black/10 bg-black/5 text-black/60" : "border-white/10 bg-white/5 text-white/60"
                  }\`}>
                    Integration
                  </div>

                  <h2 className={\`font-ivyora font-medium text-4xl md:text-5xl tracking-[-1px] mb-6 \${isLightMode ? "text-black" : "text-white"}\`}>
                    {selectedItem.name}
                  </h2>
                  
                  <p className={\`font-inter text-base md:text-[17px] mb-8 leading-relaxed \${isLightMode ? "text-black/70" : "text-white/70"}\`}>
                    {selectedItem.desc}
                  </p>

                  <div className="mb-10">
                    <h3 className={\`font-inter text-[13px] font-bold uppercase tracking-widest mb-4 \${isLightMode ? "text-black/50" : "text-white/50"}\`}>
                      Key Capabilities
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {selectedItem.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-[#19ad7d] shrink-0 mt-0.5" />
                          <span className={\`font-inter text-[15px] font-medium \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4">
                    <CTAButton href="mailto:partners@enzy.co" variant="primary" className="w-full sm:w-auto px-8 py-4 font-semibold text-[14px]">
                      Connect {selectedItem.name} <ArrowRight size={16} className="ml-2" />
                    </CTAButton>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}`;

content = content.replace(/export function Partners\(\) \{[\s\S]*$/, newPartnersFunc);

fs.writeFileSync(path, content);
console.log("Patched Partners.tsx");
