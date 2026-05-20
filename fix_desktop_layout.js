import fs from 'fs';

// --- 1. Update HeroSection.tsx ---
const heroPath = './src/app/components/HeroSection.tsx';
let heroContent = fs.readFileSync(heroPath, 'utf8');

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="relative w-full pt-28 pb-12 lg:pt-0 lg:pb-0 lg:min-h-[100vh] flex items-center">
      <div className="relative mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
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
          
          <div className="hidden lg:block lg:w-[50%] xl:w-[55%]">
            {/* Spacer for the phone */}
          </div>
        </div>
      </div>
    </section>
  );
}`;

if (heroContent.includes('function HeroSectionDefault() {')) {
  heroContent = heroContent.replace(oldHeroDefault, newHeroDefault);
  console.log("Updated HeroSection.tsx");
} else {
  console.log("Could not find HeroSectionDefault");
}
fs.writeFileSync(heroPath, heroContent);

// --- 2. Update playground.tsx ---
const playPath = './src/app/playground/playground.tsx';
let playContent = fs.readFileSync(playPath, 'utf8');

const oldPlayScale = `      // Scale down initially
      let ch = isMobile ? vh * 0.6 : Math.min(vh * 0.75, vw / imageAspect);
      let cw = ch * imageAspect;
      
      // Ensure phone isn't too tiny on mobile
      if (isMobile && cw * 0.2294 < vw * 0.4) {
        cw = (vw * 0.4) / 0.2294;
        ch = cw / imageAspect;
      }
      
      // Phone screen center in the image
      const phoneCenterX_image = cw * 0.4922;
      const phoneCenterY_image = ch * 0.4567;
      const phoneH_image = ch * 0.6684;
      
      // Calculate starting position (scale 1) - center the image
      let startX = vw / 2 - cw / 2;
      let startY = isMobile ? vh * 0.45 - 0.1225 * ch : vh * 0.3 - 0.1225 * ch;`;

const newPlayScale = `      // Scale down initially
      let ch = isMobile ? vh * 0.6 : Math.min(vh * 0.85, (vw * 0.5) / imageAspect);
      let cw = ch * imageAspect;
      
      // Ensure phone isn't too tiny on mobile
      if (isMobile && cw * 0.2294 < vw * 0.4) {
        cw = (vw * 0.4) / 0.2294;
        ch = cw / imageAspect;
      }
      
      // Phone screen center in the image
      const phoneCenterX_image = cw * 0.4922;
      const phoneCenterY_image = ch * 0.4567;
      const phoneH_image = ch * 0.6684;
      
      // Calculate starting position (scale 1)
      let startX = isMobile ? vw / 2 - cw / 2 : vw * 0.72 - cw / 2;
      let startY = isMobile ? vh * 0.45 - 0.1225 * ch : vh / 2 - ch / 2;`;

if (playContent.includes(oldPlayScale)) {
  playContent = playContent.replace(oldPlayScale, newPlayScale);
  console.log("Updated playground scale and start pos");
} else {
  console.log("Could not find playground scale");
}

const oldMargin = 'className="relative w-full h-[600vh] z-10 -mt-[45vh] md:-mt-[65vh]"';
const newMargin = 'className="relative w-full h-[600vh] z-10 -mt-[45vh] lg:-mt-[100vh]"';

if (playContent.includes(oldMargin)) {
  playContent = playContent.replace(oldMargin, newMargin);
  console.log("Updated playground margin");
} else {
  console.log("Could not find playground margin");
}

fs.writeFileSync(playPath, playContent);
