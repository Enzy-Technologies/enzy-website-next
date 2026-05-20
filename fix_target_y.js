import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldTargetY = 'const targetPhoneY = isMobile ? vh * 0.55 : vh * 0.6; // Move it lower as requested';
const newTargetY = 'const targetPhoneY = isMobile ? vh * 0.65 : vh * 0.7; // Move it even lower';

if (content.includes(oldTargetY)) {
  content = content.replace(oldTargetY, newTargetY);
  console.log("Moved phone lower");
} else {
  console.log("Could not find targetPhoneY");
}

fs.writeFileSync(path, content);
