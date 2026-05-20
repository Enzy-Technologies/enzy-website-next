import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove the top pill
const oldPill = `<div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors bg-white/50 border-black/5 hover:bg-white/80 dark:bg-white/[0.03] dark:border-white/[0.08] dark:hover:bg-white/[0.06]">
            <span className="flex h-2 w-2 rounded-full bg-[#19ad7d]" />
            <span className="font-inter text-xs font-medium tracking-wide text-black/70 dark:text-white/70">
              The Agentic Engine for High Performance Sales Teams
            </span>
          </div>`;

content = content.replace(oldPill, '');

// 2. Update the sub-headline
const oldSubHeadline = `<p
            className={\`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[540px] mx-auto \${
              isLightMode ? "text-black/70" : "text-white/65"
            }\`}
          >
            We provide an agentic performance system that improves
            execution, increases accountability, and helps teams drive measurable
            sales growth.
          </p>`;

const newSubHeadline = `<p
            className={\`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[540px] mx-auto \${
              isLightMode ? "text-black/70" : "text-white/65"
            }\`}
          >
            The Agentic engine for high performance sales teams that improves execution, increases accountability, and helps teams drive measurable sales growth.
          </p>`;

content = content.replace(oldSubHeadline, newSubHeadline);

// 3. Move and update the stat badge to be a punchy statement above the CTA
const oldStatBadge = `          <motion.div 
            ref={countRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center gap-2 -mt-2 mb-6"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#19ad7d]/10 text-[#19ad7d] mr-2">
              <TrendingUp size={16} strokeWidth={2.5} />
            </div>
            <span className={\`font-inter text-[14px] \${isLightMode ? "text-black/60" : "text-white/60"}\`}>
              Join teams seeing a <strong className="text-[#19ad7d] font-semibold">{count}%</strong> median revenue lift
            </span>
          </motion.div>`;

// Remove it from below
content = content.replace(oldStatBadge, '');

// Add it above the CTA container
const ctaContainer = `<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">`;

const newStatBadge = `          <motion.div 
            ref={countRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center gap-3 mt-4 mb-2"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#19ad7d]/10 text-[#19ad7d]">
              <TrendingUp size={20} strokeWidth={2.5} />
            </div>
            <span className={\`font-inter text-[18px] md:text-[20px] font-medium \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
              Join teams seeing a <strong className="text-[#19ad7d] font-bold text-[22px] md:text-[24px]">{count}%</strong> median revenue lift
            </span>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2 pb-4 w-full">`;

content = content.replace(ctaContainer, newStatBadge);

fs.writeFileSync(path, content);
console.log("Done");
