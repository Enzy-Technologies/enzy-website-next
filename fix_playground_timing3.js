import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldTiming = `  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens right after zoom finishes
  const tapOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.55, 0.6], [0, 0.8, 0.8, 0]);
  const tapScale = useTransform(scrollYProgress, [0.45, 0.55], [1.5, 0.8]);
  
  // Slide up transition for the second image using clip-path
  // 100% means fully clipped (hidden), 0% means fully visible
  // Starts exactly as the tap finishes
  const baseImg2Clip = useTransform(scrollYProgress, [0.55, 0.75], [100, 0]);`;

const newTiming = `  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens right after zoom finishes
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
