import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update transforms
const oldTransforms = `  // Base image crossfade (Image 1 to Image 2)
  const baseImg1Op = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);
  const baseImg2Op = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);`;

const newTransforms = `  // Slide up transition for the second image using clip-path
  // 100% means fully clipped (hidden), 0% means fully visible
  const baseImg2Clip = useTransform(scrollYProgress, [0.45, 0.55], [100, 0]);
  const clipPath = useTransform(baseImg2Clip, (val) => \`inset(\${val}% 0 0 0)\`);`;

if (content.includes(oldTransforms)) {
  content = content.replace(oldTransforms, newTransforms);
  console.log("Updated transforms");
}

// 2. Update render
const oldRender = `          {/* Base Images */}
          <motion.img 
            src={BASE_IMAGES[0]} 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: baseImg1Op }}
          />
          <motion.img 
            src={BASE_IMAGES[1]} 
            alt="Hand holding phone AI" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: baseImg2Op }}
          />`;

const newRender = `          {/* Base Images */}
          <img 
            src={BASE_IMAGES[0]} 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.img 
            src={BASE_IMAGES[1]} 
            alt="Hand holding phone AI" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath }}
          />`;

if (content.includes(oldRender)) {
  content = content.replace(oldRender, newRender);
  console.log("Updated render");
}

fs.writeFileSync(path, content);
