import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove Tap Indicator JSX
const tapIndicatorRegex = /\s*\{\/\* Tap Indicator \*\/\}\s*<motion\.div[\s\S]*?opacity: tapOpacity,\s*\}\}\s*\/>/g;
content = content.replace(tapIndicatorRegex, '');

// 2. Remove tapOpacity and tapScale
const tapHooksRegex = /\s*\/\/ Tap animation:.*?\n\s*const tapOpacity =.*?\n\s*const tapScale =.*?\n/g;
content = content.replace(tapHooksRegex, '\n');

// 3. Adjust container height to make it sticky longer
content = content.replace(/h-\[350vh\]/, 'h-[450vh]');

// 4. Adjust slide up timing
// Old: const baseImg2Clip = useTransform(scrollYProgress, [0.65, 1.0], [100, 0]);
// New: const baseImg2Clip = useTransform(scrollYProgress, [0.4, 0.75], [100, 0]);
const oldClip = 'const baseImg2Clip = useTransform(scrollYProgress, [0.65, 1.0], [100, 0]);';
const newClip = 'const baseImg2Clip = useTransform(scrollYProgress, [0.4, 0.75], [100, 0]);';
content = content.replace(oldClip, newClip);

fs.writeFileSync(path, content);
console.log("Reverted tap indicator and extended sticky time");
