import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Decrease total scroll height to make everything happen faster
const oldContainer = 'className="relative w-full h-[350vh] z-10 -mt-[45vh] lg:-mt-[100vh]"';
const newContainer = 'className="relative w-full h-[250vh] z-10 -mt-[45vh] lg:-mt-[100vh]"';

if (content.includes(oldContainer)) {
  content = content.replace(oldContainer, newContainer);
  console.log("Updated container height");
}

// 2. Adjust animation timing values
const oldTiming = `  // Zoom animation: 0 to 0.3
  const x = useTransform(scrollYProgress, [0, 0.3], [animValues.startX, animValues.endX]);
  const y = useTransform(scrollYProgress, [0, 0.3], [animValues.startY, animValues.endY]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, animValues.endScale]);

  // Tap animation on the bottom right of the screen (sparkle icon)
  const tapOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.45, 0.5], [0, 0.8, 0.8, 0]);
  const tapScale = useTransform(scrollYProgress, [0.35, 0.45], [1.5, 0.8]);
  
  // Slide up transition for the second image using clip-path
  // 100% means fully clipped (hidden), 0% means fully visible
  const baseImg2Clip = useTransform(scrollYProgress, [0.45, 0.55], [100, 0]);
  const clipPath = useTransform(baseImg2Clip, (val) => \`inset(\${val}% 0 0 0)\`);`;

const newTiming = `  // Zoom animation: 0 to 0.4
  const x = useTransform(scrollYProgress, [0, 0.4], [animValues.startX, animValues.endX]);
  const y = useTransform(scrollYProgress, [0, 0.4], [animValues.startY, animValues.endY]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, animValues.endScale]);

  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens right after zoom finishes
  const tapOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.55, 0.6], [0, 0.8, 0.8, 0]);
  const tapScale = useTransform(scrollYProgress, [0.45, 0.55], [1.5, 0.8]);
  
  // Slide up transition for the second image using clip-path
  // 100% means fully clipped (hidden), 0% means fully visible
  // Starts exactly as the tap finishes
  const baseImg2Clip = useTransform(scrollYProgress, [0.55, 0.75], [100, 0]);
  const clipPath = useTransform(baseImg2Clip, (val) => \`inset(\${val}% 0 0 0)\`);`;

if (content.includes(oldTiming)) {
  content = content.replace(oldTiming, newTiming);
  console.log("Updated animation timing");
}

fs.writeFileSync(path, content);
