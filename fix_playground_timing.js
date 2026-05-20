import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Decrease total scroll height to make everything happen faster
const oldContainer = 'className="relative w-full h-[600vh] z-10 -mt-[45vh] lg:-mt-[100vh]"';
const newContainer = 'className="relative w-full h-[350vh] z-10 -mt-[45vh] lg:-mt-[100vh]"';

if (content.includes(oldContainer)) {
  content = content.replace(oldContainer, newContainer);
  console.log("Updated container height");
}

// 2. Adjust animation timing values
const oldTiming = `  // Zoom animation: 0 to 0.2
  const x = useTransform(scrollYProgress, [0, 0.2], [animValues.startX, animValues.endX]);
  const y = useTransform(scrollYProgress, [0, 0.2], [animValues.startY, animValues.endY]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, animValues.endScale]);

  // Tap animation on the bottom right of the screen (sparkle icon)
  const tapOpacity = useTransform(scrollYProgress, [0.22, 0.24, 0.26, 0.28], [0, 0.8, 0.8, 0]);
  const tapScale = useTransform(scrollYProgress, [0.22, 0.26], [1.5, 0.8]);
  
  // Base image crossfade (Image 1 to Image 2)
  const baseImg1Op = useTransform(scrollYProgress, [0.26, 0.3], [1, 0]);
  const baseImg2Op = useTransform(scrollYProgress, [0.26, 0.3], [0, 1]);`;

const newTiming = `  // Zoom animation: 0 to 0.3
  const x = useTransform(scrollYProgress, [0, 0.3], [animValues.startX, animValues.endX]);
  const y = useTransform(scrollYProgress, [0, 0.3], [animValues.startY, animValues.endY]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, animValues.endScale]);

  // Tap animation on the bottom right of the screen (sparkle icon)
  const tapOpacity = useTransform(scrollYProgress, [0.35, 0.4, 0.45, 0.5], [0, 0.8, 0.8, 0]);
  const tapScale = useTransform(scrollYProgress, [0.35, 0.45], [1.5, 0.8]);
  
  // Base image crossfade (Image 1 to Image 2)
  const baseImg1Op = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);
  const baseImg2Op = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);`;

if (content.includes(oldTiming)) {
  content = content.replace(oldTiming, newTiming);
  console.log("Updated animation timing");
}

fs.writeFileSync(path, content);
