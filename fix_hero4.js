import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// The previous regex didn't match because of the actual content. Let's use a simpler substring replacement.

const startIdx = content.indexOf('function HeroSectionDefault() {');
const endIdx = content.indexOf('return (', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const toReplace = content.substring(startIdx, endIdx);
  const newContent = `function HeroSectionDefault() {
  const { isLightMode } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  `;
  content = content.replace(toReplace, newContent);
  console.log('Replaced state correctly.');
}

fs.writeFileSync(path, content);
