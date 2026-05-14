const fs = require('fs');
const path = './src/app/About.tsx';

let content = fs.readFileSync(path, 'utf8');

const oldSection = `        {/* 003 — Our System (Slide Content) */}
        <FadeInSection className="pb-20 md:pb-32">
          <section data-section="003">
            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-black/45" : "text-white/40"
              }\`}
            >
              003 — Our System
            </p>

            <div className="mt-8 max-w-4xl">
              <h2 className={\`font-ivyora font-medium text-[36px] sm:text-[48px] md:text-[56px] leading-[1.1] tracking-[-1px] \${isLightMode ? "text-black" : "text-white"}\`}>
                We provide intelligent, real-time performance systems that improve execution, increase accountability, and help teams drive measurable sales growth.
              </h2>
              
              <div className={\`mt-12 mb-12 h-[1px] w-full max-w-2xl \${isLightMode ? "bg-black/10" : "bg-white/10"}\`} />

              <div className="max-w-3xl">
                <h3 className={\`font-inter text-[20px] md:text-[24px] font-bold tracking-tight mb-8 \${isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"}\`}>
                  Key Solutions :
                </h3>
                
                <div className="flex flex-col gap-6">
                  <div className={\`pb-6 border-b \${isLightMode ? "border-black/10" : "border-white/10"}\`}>
                    <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                      <strong className={isLightMode ? "text-black font-bold" : "text-white font-bold"}>Integrate:</strong> Bring your systems into an intelligent ecosystem.
                    </p>
                  </div>
                  <div className={\`pb-6 border-b \${isLightMode ? "border-black/10" : "border-white/10"}\`}>
                    <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                      <strong className={isLightMode ? "text-black font-bold" : "text-white font-bold"}>Activate:</strong> EnzyAI provides actionable insight & performance recommendations.
                    </p>
                  </div>
                  <div className={\`pb-6 border-b \${isLightMode ? "border-black/10" : "border-white/10"}\`}>
                    <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                      <strong className={isLightMode ? "text-black font-bold" : "text-white font-bold"}>Accelerate:</strong> Turn momentum into sustained performance and revenue growth.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-16">
                <p className={\`font-inter text-[12px] font-bold tracking-widest uppercase \${isLightMode ? "text-black/50" : "text-white/50"}\`}>
                  Create Momentum™
                </p>
              </div>
            </div>
          </section>
        </FadeInSection>

`;

if (content.includes(oldSection)) {
  content = content.replace(oldSection, '');
  
  // Renumber sections
  content = content.replace(/004 — Why we exist/g, '003 — Why we exist');
  content = content.replace(/data-section="004"/g, 'data-section="003"');
  
  content = content.replace(/005 — Next/g, '004 — Next');
  content = content.replace(/data-section="005"/g, 'data-section="004"');
  
  fs.writeFileSync(path, content);
  console.log('Successfully removed section and renumbered.');
} else {
  console.log('Could not find the old section to replace.');
}
