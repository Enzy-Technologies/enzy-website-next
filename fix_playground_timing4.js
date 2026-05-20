import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Increase total scroll height to give more time
const oldContainer = 'className="relative w-full h-[250vh] z-10 -mt-[45vh] lg:-mt-[100vh]"';
const newContainer = 'className="relative w-full h-[350vh] z-10 -mt-[45vh] lg:-mt-[100vh]"';

if (content.includes(oldContainer)) {
  content = content.replace(oldContainer, newContainer);
  console.log("Updated container height");
}

// 2. Adjust animation timing values to add more pause
const oldTiming = `  // Zoom animation: 0 to 0.4
  const x = useTransform(scrollYProgress, [0, 0.4], [animValues.startX, animValues.endX]);
  const y = useTransform(scrollYProgress, [0, 0.4], [animValues.startY, animValues.endY]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, animValues.endScale]);

  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens right after zoom finishes
  const tapOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.65, 0.7], [0, 0.8, 0.8, 0]);
  const tapScale = useTransform(scrollYProgress, [0.55, 0.65], [1.5, 0.8]);
  
  // Slide up transition for the second image using clip-path
  // 100% means fully clipped (hidden), 0% means fully visible
  // Starts exactly as the tap finishes
  const baseImg2Clip = useTransform(scrollYProgress, [0.65, 0.85], [100, 0]);`;

const newTiming = `  // Zoom animation: 0 to 0.3
  const x = useTransform(scrollYProgress, [0, 0.3], [animValues.startX, animValues.endX]);
  const y = useTransform(scrollYProgress, [0, 0.3], [animValues.startY, animValues.endY]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, animValues.endScale]);

  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens after a long pause once zoom finishes
  const tapOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.65, 0.7], [0, 0.8, 0.8, 0]);
  const tapScale = useTransform(scrollYProgress, [0.55, 0.65], [1.5, 0.8]);
  
  // Slide up transition for the second image using clip-path
  // 100% means fully clipped (hidden), 0% means fully visible
  // Starts exactly as the tap finishes
  const baseImg2Clip = useTransform(scrollYProgress, [0.65, 0.85], [100, 0]);`;

if (content.includes(oldTiming)) {
  content = content.replace(oldTiming, newTiming);
  console.log("Updated animation timing");
} else {
  console.log("Could not find timing to replace");
}

fs.writeFileSync(path, content);
