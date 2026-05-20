import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldTransforms = `  // Snap transition for the second image (crossfade to be safe)
  const baseImg1Op = useTransform(scrollYProgress, [0.39, 0.4], [1, 0]);
  const baseImg2Op = useTransform(scrollYProgress, [0.39, 0.4], [0, 1]);`;

const newTransforms = `  // Snap transition for the second image (crossfade to be safe)
  // Shifted later in the scroll to ensure it happens while sticky
  const baseImg1Op = useTransform(scrollYProgress, [0.6, 0.61], [1, 0]);
  const baseImg2Op = useTransform(scrollYProgress, [0.6, 0.61], [0, 1]);`;

if (content.includes(oldTransforms)) {
  content = content.replace(oldTransforms, newTransforms);
  console.log("Updated transform timing");
}

fs.writeFileSync(path, content);
