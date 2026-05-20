import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldClip = 'const baseImg2Clip = useTransform(scrollYProgress, [0.6, 1.0], [100, 0]);';
const newClip = 'const baseImg2Clip = useTransform(scrollYProgress, [0.65, 1.0], [100, 0]);';

if (content.includes(oldClip)) {
  content = content.replace(oldClip, newClip);
  console.log("Updated slide up timing");
}

fs.writeFileSync(path, content);
