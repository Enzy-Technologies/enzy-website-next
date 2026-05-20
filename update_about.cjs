const fs = require('fs');
const path = './src/app/About.tsx';

let content = fs.readFileSync(path, 'utf8');

// 1. Remove Backed by
const backedBySection = `        {/* Backed by */}
        <FadeInSection className="pb-16 md:pb-24">
          <section>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="eyebrow text-[#19ad7d] m-0">Backed by</p>
              <ul className="flex flex-wrap gap-3">
                {["Sequoia", "Index Ventures", "Lightspeed", "Y Combinator"].map(
                  (i) => (
                    <li
                      key={i}
                      className={\`px-4 py-2 rounded-full border text-[12px] font-inter font-semibold tracking-tight \${
                        isLightMode
                          ? "border-black/10 bg-white/60 text-black/70"
                          : "border-white/12 bg-white/[0.05] text-white/70"
                      }\`}
                    >
                      {i}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </section>
        </FadeInSection>`;

content = content.replace(backedBySection, '');

// 2. Add TestimonialsSection import
if (!content.includes('import { TestimonialsSection }')) {
  content = content.replace('import { BlurReveal } from "./components/BlurReveal";', 'import { BlurReveal } from "./components/BlurReveal";\nimport { TestimonialsSection } from "./components/TestimonialsSection";');
}

// 3. Add TestimonialsSection before the Next section
const nextSection = `        {/* 004 — Next */}`;
const testimonialsSection = `        <FadeInSection className="pb-16 md:pb-24">
          <TestimonialsSection />
        </FadeInSection>
        
        {/* 004 — Next */}`;
content = content.replace(nextSection, testimonialsSection);

// 4. Update footer
const oldFooter = `        {/* About footer */}
        <footer className="pt-2 pb-6">
          <div
            className={\`flex flex-col md:flex-row md:items-center md:justify-between gap-2 font-inter text-[12px] tracking-tight \${
              isLightMode ? "text-black/45" : "text-white/40"
            }\`}
          >
            <p className="m-0">© EnzyAI 2026</p>
            <p className="m-0">San Francisco · London</p>
          </div>
        </footer>`;

const newFooter = `        {/* About footer */}
        <footer className="pt-2 pb-6">
          <div
            className={\`flex flex-col md:flex-row md:items-center md:justify-center gap-2 font-inter text-[12px] tracking-tight \${
              isLightMode ? "text-black/45" : "text-white/40"
            }\`}
          >
            <p className="m-0">© ENZY 2026</p>
          </div>
        </footer>`;

content = content.replace(oldFooter, newFooter);

fs.writeFileSync(path, content);
console.log('Successfully updated About.tsx');
