const fs = require('fs');
const path = './src/app/About.tsx';

let content = fs.readFileSync(path, 'utf8');

const oldSection = `        {/* 004 — The people */}
        <FadeInSection className="pb-16 md:pb-24">
          <section data-section="004">
            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-black/45" : "text-white/40"
              }\`}
            >
              004 — The people
            </p>

            <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  initials: "SK",
                  color: "purple",
                  name: "Sarah Kavanagh",
                  role: "Co-founder, CEO",
                  bio: "12 years building enterprise data systems. Previously led performance analytics at Salesforce.",
                },
                {
                  initials: "DM",
                  color: "teal",
                  name: "Daniel Moreno",
                  role: "Co-founder, CTO",
                  bio: "Ex-Google DeepMind. Built ML pipelines for ranking and personalization at scale.",
                },
                {
                  initials: "PR",
                  color: "coral",
                  name: "Priya Raman",
                  role: "Head of Research",
                  bio: "PhD organizational behavior, MIT. Published on incentive design and team performance.",
                },
              ].map((p) => {
                const portraitBg =
                  p.color === "purple"
                    ? "bg-[linear-gradient(180deg,rgba(128,90,213,0.22),rgba(128,90,213,0.08))]"
                    : p.color === "teal"
                      ? "bg-[linear-gradient(180deg,rgba(25,173,125,0.22),rgba(25,173,125,0.08))]"
                      : "bg-[linear-gradient(180deg,rgba(255,107,107,0.20),rgba(255,107,107,0.07))]";
                const portraitRing =
                  p.color === "purple"
                    ? "ring-[rgba(128,90,213,0.35)]"
                    : p.color === "teal"
                      ? "ring-[#19ad7d]/35"
                      : "ring-[rgba(255,107,107,0.32)]";

                return (
                  <li
                    key={p.name}
                    className={\`pt-1\`}
                  >
                    <div
                      className={\`w-16 h-16 rounded-full flex items-center justify-center ring-1 ring-inset \${portraitBg} \${portraitRing}\`}
                    >
                      <span
                        className={\`font-inter font-extrabold tracking-[0.12em] \${
                          isLightMode ? "text-black/75" : "text-white/75"
                        }\`}
                      >
                        {p.initials}
                      </span>
                    </div>

                    <p
                      className={\`mt-5 font-inter text-[16px] font-semibold \${
                        isLightMode ? "text-black" : "text-white"
                      }\`}
                    >
                      {p.name}
                    </p>
                    <p
                      className={\`mt-1 font-inter text-[12px] font-semibold tracking-[0.18em] uppercase \${
                        isLightMode ? "text-black/50" : "text-white/45"
                      }\`}
                    >
                      {p.role}
                    </p>
                    <p
                      className={\`mt-4 font-inter text-[14px] leading-relaxed \${
                        isLightMode ? "text-black/65" : "text-white/65"
                      }\`}
                    >
                      {p.bio}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>
        </FadeInSection>`;

const newSection = `        {/* 004 — Why we exist */}
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
                We've studied millions of sales interactions across incentives, goals, competitions, workflows, and performance systems. The pattern is always the same: high-performing teams don't win because they have more data — they win because they turn fragmented behavior into visible momentum.
              </p>
              <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                That starts with consolidation. Data, tools, processes, incentives, and rep activity must exist in one connected performance layer. Once the system is unified, modern AI can identify the hidden patterns humans miss — the behaviors driving pipeline, the habits creating momentum, and the gaps slowing teams down.
              </p>
              <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                From there, we help teams operationalize those insights with the right workflows, automations, and technologies to maximize performance at scale.
              </p>
              <p className={\`font-inter text-[18px] md:text-[20px] leading-relaxed \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                Enzy exists because sales performance is not random. It's measurable, predictable, and engineerable. We build the infrastructure that turns behavior into revenue.
              </p>
            </div>
          </section>
        </FadeInSection>`;

if (content.includes(oldSection)) {
  content = content.replace(oldSection, newSection);
  fs.writeFileSync(path, content);
  console.log('Successfully replaced section.');
} else {
  console.log('Could not find the old section to replace.');
}
