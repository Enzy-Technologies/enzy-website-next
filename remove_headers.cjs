const fs = require('fs');
const path = './src/app/About.tsx';

let content = fs.readFileSync(path, 'utf8');

const p1 = `            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-black/45" : "text-white/40"
              }\`}
            >
              001 — Who we are
            </p>`;

const p2 = `            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-[#19ad7d]" : "text-[#19ad7d]"
              }\`}
            >
              002 — What we&apos;ve learned
            </p>`;

const p3 = `          <FadeInSection>
            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-black/45" : "text-white/40"
              }\`}
            >
              003 — Why we exist
            </p>
          </FadeInSection>`;

const p4 = `            <p
              className={\`font-inter text-[12px] md:text-[13px] font-semibold tracking-[0.18em] uppercase \${
                isLightMode ? "text-black/45" : "text-white/40"
              }\`}
            >
              004 — Next
            </p>`;

content = content.replace(p1, '');
content = content.replace(p2, '');
content = content.replace(p3, '');
content = content.replace(p4, '');

fs.writeFileSync(path, content);
console.log('Successfully removed headers.');
