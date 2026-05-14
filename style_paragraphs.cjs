const fs = require('fs');
const path = './src/app/About.tsx';

let content = fs.readFileSync(path, 'utf8');

const oldSection = `        {/* 004 — Why we exist */}
        <FadeInSection className="pb-16 md:pb-24">
          <section data-section="004">
            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-black/45" : "text-white/40"
              }\`}
            >
              004 — Why we exist
            </p>

            <div className="mt-10 max-w-3xl flex flex-col gap-6">
              <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                We&apos;ve studied millions of sales interactions across incentives, goals, competitions, workflows, and performance systems. The pattern is always the same: high-performing teams don&apos;t win because they have more data — they win because they turn fragmented behavior into visible momentum.
              </p>
              <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                That starts with consolidation. Data, tools, processes, incentives, and rep activity must exist in one connected performance layer. Once the system is unified, modern AI can identify the hidden patterns humans miss — the behaviors driving pipeline, the habits creating momentum, and the gaps slowing teams down.
              </p>
              <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                From there, we help teams operationalize those insights with the right workflows, automations, and technologies to maximize performance at scale.
              </p>
              <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                Enzy exists because sales performance is not random. It&apos;s measurable, predictable, and engineerable. We build the infrastructure that turns behavior into revenue.
              </p>
            </div>
          </section>
        </FadeInSection>`;

const newSection = `        {/* 004 — Why we exist */}
        <section data-section="004" className="pb-16 md:pb-24">
          <FadeInSection>
            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-black/45" : "text-white/40"
              }\`}
            >
              004 — Why we exist
            </p>
          </FadeInSection>

          <div className="mt-10 max-w-4xl flex flex-col gap-10">
            <FadeInSection delay={0.1}>
              <h3 className={\`font-ivyora font-medium text-[32px] sm:text-[40px] md:text-[48px] leading-[1.1] tracking-[-1px] \${isLightMode ? "text-black" : "text-white"}\`}>
                We&apos;ve studied millions of sales interactions across incentives, goals, competitions, workflows, and performance systems. The pattern is always the same: <span className={isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"}>high-performing teams don&apos;t win because they have more data — they win because they turn fragmented behavior into visible momentum.</span>
              </h3>
            </FadeInSection>
            
            <div className={\`flex flex-col gap-6 pl-0 md:pl-8 border-l-0 md:border-l-[3px] \${isLightMode ? "border-[#19ad7d]/20" : "border-[#19ad7d]/30"}\`}>
              <FadeInSection delay={0.2}>
                <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                  That starts with consolidation. Data, tools, processes, incentives, and rep activity must exist in one connected performance layer. Once the system is unified, modern AI can identify the hidden patterns humans miss — the behaviors driving pipeline, the habits creating momentum, and the gaps slowing teams down.
                </p>
              </FadeInSection>
              
              <FadeInSection delay={0.3}>
                <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                  From there, we help teams operationalize those insights with the right workflows, automations, and technologies to maximize performance at scale.
                </p>
              </FadeInSection>
              
              <FadeInSection delay={0.4}>
                <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                  <strong className={isLightMode ? "text-black font-bold" : "text-white font-bold"}>Enzy exists because sales performance is not random.</strong> It&apos;s measurable, predictable, and engineerable. We build the infrastructure that turns behavior into revenue.
                </p>
              </FadeInSection>
            </div>
          </div>
        </section>`;

if (content.includes(oldSection)) {
  content = content.replace(oldSection, newSection);
  fs.writeFileSync(path, content);
  console.log('Successfully styled paragraphs.');
} else {
  console.log('Could not find the old section to replace.');
}
