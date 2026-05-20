import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// The string replacement isn't working because the exact string might be slightly different.
// Let's use regex to replace the body of HeroSectionDefault.

const regex = /function HeroSectionDefault\(\) \{[\s\S]*?return \(\s*<section className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-24">/;

const newContent = `function HeroSectionDefault() {
  const { isLightMode } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-24">`;

content = content.replace(regex, newContent);

fs.writeFileSync(path, content);
console.log('Regex replacement done.');
