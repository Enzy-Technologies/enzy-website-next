import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /function HeroSectionDefault\(\) \{[\s\S]*?export function HeroSection/m;

const newContent = `function HeroSectionDefault() {
  const { isLightMode } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-24">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <div className="lg:col-span-12 flex flex-col gap-7 text-center items-center max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors bg-white/50 border-black/5 hover:bg-white/80 dark:bg-white/[0.03] dark:border-white/[0.08] dark:hover:bg-white/[0.06]">
            <span className="flex h-2 w-2 rounded-full bg-[#19ad7d]" />
            <span className="font-inter text-xs font-medium tracking-wide text-black/70 dark:text-white/70">
              The Agentic Engine for High Performance Sales Teams
            </span>
          </div>

          <h1
            className={\`font-inter font-bold tracking-[-0.05em] leading-[1.02] \${
              isLightMode ? "text-brand-dark" : "text-brand-light"
            } text-[44px] sm:text-[56px] md:text-[68px] lg:text-[76px]\`}
          >
            <BlurReveal as="span" delay={0.1}>More revenue from the team you </BlurReveal>
            <BlurReveal as="span" delay={0.85} className="font-ivyora font-medium italic">already</BlurReveal>
            <BlurReveal as="span" delay={1.05}> have.</BlurReveal>
          </h1>

          <p
            className={\`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[540px] mx-auto \${
              isLightMode ? "text-black/70" : "text-white/65"
            }\`}
          >
            An agentic performance system that tightens execution between visits — coaching,
            competitions, and incentives, all powered by your existing CRM data.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">
            <CTAButton
              href="/book-demo"
              variant="primary"
              className="w-full sm:w-auto font-inter text-[13px] sm:text-[14px] md:text-[15px] h-[48px] sm:h-[52px] md:h-[56px] px-8 sm:px-10 md:px-12 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] shadow-[0_8px_24px_rgba(25,173,125,0.25)] hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)] transition-all duration-300"
            >
              Book a Demo
            </CTAButton>
          </div>

          <div className="w-full lg:max-w-[560px]">
            <SimpleLogosMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroSection`;

content = content.replace(regex, newContent);

fs.writeFileSync(path, content);
console.log('Replaced HeroSectionDefault');
