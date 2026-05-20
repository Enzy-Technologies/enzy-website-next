import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldTransforms = `  // Snap transition for the second image
  const baseImg2Op = useTransform(scrollYProgress, [0.49, 0.5], [0, 1]);`;

const newTransforms = `  // Snap transition for the second image (crossfade to be safe)
  const baseImg1Op = useTransform(scrollYProgress, [0.39, 0.4], [1, 0]);
  const baseImg2Op = useTransform(scrollYProgress, [0.39, 0.4], [0, 1]);`;

if (content.includes(oldTransforms)) {
  content = content.replace(oldTransforms, newTransforms);
  console.log("Updated transforms");
}

const oldImg1 = `          <img 
            src={BASE_IMAGES[0]} 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
          />`;

const newImg1 = `          <motion.img 
            src={BASE_IMAGES[0]} 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: baseImg1Op }}
          />`;

if (content.includes(oldImg1)) {
  content = content.replace(oldImg1, newImg1);
  console.log("Updated img1 to motion.img");
}

fs.writeFileSync(path, content);
