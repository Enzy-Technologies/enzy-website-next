import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add useInView
content = content.replace(
  'import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";',
  'import { motion, AnimatePresence, useScroll, useTransform, useInView } from "motion/react";'
);

// 2. Add useCountUp hook
const hookCode = `
function useCountUp(target: number, durationMs = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, durationMs, prefersReducedMotion]);

  return { value, ref };
}
`;

if (!content.includes('function useCountUp')) {
  content = content.replace('const LP_VALUE_BULLETS = [', hookCode + '\nconst LP_VALUE_BULLETS = [');
}

// 3. Add to HeroSectionDefault
const oldDefaultStart = 'function HeroSectionDefault() {\n  const { isLightMode } = useTheme();';
const newDefaultStart = 'function HeroSectionDefault() {\n  const { isLightMode } = useTheme();\n  const { value: count, ref: countRef } = useCountUp(37);';
content = content.replace(oldDefaultStart, newDefaultStart);

// 4. Add under CTA
const oldCTA = `            </CTAButton>
          </div>

          <div className="w-full lg:max-w-[560px]">`;

const newCTA = `            </CTAButton>
          </div>
          
          <motion.div 
            ref={countRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center gap-2 -mt-2 mb-6"
          >
            <div className="flex -space-x-2 mr-2">
              <img className="w-7 h-7 rounded-full border-2 border-[#060809] dark:border-white" src="https://i.pravatar.cc/100?img=33" alt="User" />
              <img className="w-7 h-7 rounded-full border-2 border-[#060809] dark:border-white" src="https://i.pravatar.cc/100?img=47" alt="User" />
              <img className="w-7 h-7 rounded-full border-2 border-[#060809] dark:border-white" src="https://i.pravatar.cc/100?img=12" alt="User" />
            </div>
            <span className={\`font-inter text-[14px] \${isLightMode ? "text-black/60" : "text-white/60"}\`}>
              Join teams seeing a <strong className="text-[#19ad7d] font-semibold">{count}%</strong> median revenue lift
            </span>
          </motion.div>

          <div className="w-full lg:max-w-[560px]">`;

if (content.includes(oldCTA)) {
  content = content.replace(oldCTA, newCTA);
  console.log("Added stat below CTA");
} else {
  console.log("Could not find CTA to replace");
}

fs.writeFileSync(path, content);
