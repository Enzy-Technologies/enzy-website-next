import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldHeroDefault = `function HeroSectionDefault() {
  const { isLightMode } = useTheme();
  const { value: count, ref: countRef } = useCountUp(37);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="relative w-full pt-8 md:pt-12 lg:pt-16 pb-0">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <div className="lg:col-span-12 flex flex-col gap-7 text-center items-center max-w-4xl mx-auto w-full">
          

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
            The Agentic engine for high performance sales teams that improves execution, increases accountability, and helps teams drive measurable sales growth.
          </p>

                    <motion.div 
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

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2 pb-4 w-full">
            <CTAButton
              href="/book-demo"
              variant="primary"
              className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] font-inter font-normal text-[22px] sm:text-[26px] md:text-[32px] h-[64px] sm:h-[76px] md:h-[88px] px-8 sm:px-10 md:px-12 rounded-full shadow-[0_8px_24px_rgba(25,173,125,0.25)] hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)] transition-all duration-300"
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
}`;

const newHeroDefault = `function HeroSectionDefault() {
  const { isLightMode } = useTheme();
  const { value: count, ref: countRef } = useCountUp(37);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full pt-28 pb-12 lg:pt-32 lg:pb-0 lg:min-h-[90vh] flex items-center">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Column: Content */}
          <div className="flex flex-col gap-7 text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0 w-full lg:w-[50%] xl:w-[45%] z-20">
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
              className={\`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[540px] mx-auto lg:mx-0 \${
                isLightMode ? "text-black/70" : "text-white/65"
              }\`}
            >
              The Agentic engine for high performance sales teams that improves execution, increases accountability, and helps teams drive measurable sales growth.
            </p>

            <motion.div 
              ref={countRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center justify-center lg:justify-start gap-3 mt-2 mb-0"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#19ad7d]/10 text-[#19ad7d]">
                <TrendingUp size={20} strokeWidth={2.5} />
              </div>
              <span className={\`font-inter text-[18px] md:text-[20px] font-medium \${isLightMode ? "text-black/80" : "text-white/80"}\`}>
                Join teams seeing a <strong className="text-[#19ad7d] font-bold text-[22px] md:text-[24px]">{count}%</strong> median revenue lift
              </span>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 pb-4 w-full">
              <CTAButton
                href="/book-demo"
                variant="primary"
                className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-[360px] font-inter font-normal text-[22px] sm:text-[26px] md:text-[30px] h-[64px] sm:h-[76px] md:h-[84px] px-8 sm:px-10 md:px-12 rounded-full shadow-[0_8px_24px_rgba(25,173,125,0.25)] hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)] transition-all duration-300"
              >
                Book a Demo
              </CTAButton>
            </div>

            <div className="w-full lg:max-w-[560px] mx-auto lg:mx-0">
              <SimpleLogosMarquee />
            </div>
          </div>
          
          {/* Right Column: Spacer for Playground Phone */}
          <div className="hidden lg:block lg:w-[50%] xl:w-[55%]">
          </div>

        </div>
      </div>
    </section>
  );
}`;

if (content.includes('function HeroSectionDefault() {')) {
  content = content.replace(oldHeroDefault, newHeroDefault);
  console.log("Updated HeroSection layout");
} else {
  console.log("Could not find HeroSectionDefault");
}

fs.writeFileSync(path, content);
