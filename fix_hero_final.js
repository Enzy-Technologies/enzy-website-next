import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// I need to add back the BlurReveal animations to the HeroSectionDefault heading
// and the SimpleLogosMarquee to the bottom of the hero section.

const oldHeading = `<h1
            className={\`font-inter text-[42px] leading-[1.05] tracking-[-0.03em] md:text-[56px] lg:text-[72px] font-medium \${
              isLightMode ? "text-black" : "text-white"
            }\`}
          >
            Turn behavior into <br className="hidden md:block" />
            <span className="text-[#19ad7d]">revenue.</span>
          </h1>`;

const newHeading = `<h1
            className={\`font-inter font-bold tracking-[-0.05em] leading-[1.02] \${
              isLightMode ? "text-brand-dark" : "text-brand-light"
            } text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px]\`}
          >
            <BlurReveal as="span" delay={0.1}>More revenue from the team you </BlurReveal>
            <BlurReveal as="span" delay={0.85} className="font-ivyora font-medium italic">already</BlurReveal>
            <BlurReveal as="span" delay={1.05}> have.</BlurReveal>
          </h1>`;

if (content.includes(oldHeading)) {
  content = content.replace(oldHeading, newHeading);
  console.log("Restored heading animations");
}

const oldButtons = `<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">
            <CTAButton href="/book-demo" variant="primary" className="w-full sm:w-auto">
              Book a Demo
            </CTAButton>
          </div>`;

const newButtons = `<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">
            <CTAButton href="/book-demo" variant="primary" className="w-full sm:w-auto">
              Book a Demo
            </CTAButton>
            <CTAButton
              href="#playground"
              variant="secondary"
              className="w-full sm:w-auto font-inter text-[11px] sm:text-[12px] md:text-[13px] h-[42px] sm:h-[48px] md:h-[52px] px-6 sm:px-8 md:px-[38px] rounded-[14px] sm:rounded-[16px] md:rounded-[18px] uppercase tracking-[0.1em] hover:scale-[1.02] active:scale-[0.99]"
            >
              Try the playground
            </CTAButton>
          </div>

          <div className="w-full lg:max-w-[560px]">
            <SimpleLogosMarquee />
          </div>`;

if (content.includes(oldButtons)) {
  content = content.replace(oldButtons, newButtons);
  console.log("Restored secondary button and marquee");
}

fs.writeFileSync(path, content);
