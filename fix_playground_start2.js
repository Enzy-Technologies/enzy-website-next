import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldStartY = 'let startY = isMobile ? vh * 0.65 - 0.1225 * ch : vh * 0.55 - 0.1225 * ch;';
const newStartY = 'let startY = isMobile ? vh * 0.55 - 0.1225 * ch : vh * 0.45 - 0.1225 * ch;';

if (content.includes(oldStartY)) {
  content = content.replace(oldStartY, newStartY);
  console.log("Updated startY again");
} else {
  console.log("Could not find startY to replace");
}

fs.writeFileSync(path, content);
