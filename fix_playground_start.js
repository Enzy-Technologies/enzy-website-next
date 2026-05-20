import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// We want to replace the startY calculation.
// Currently it is: let startY = isMobile ? vh * 0.6 - ch / 2 : vh / 2 - ch / 2;
// We want the top of the phone (which is at 0.1225 * ch) to be just below the logo carousel.
// Let's say the logo carousel ends at around 55vh on desktop and 65vh on mobile.
// So top of phone = isMobile ? vh * 0.65 : vh * 0.55
// startY = top of phone - 0.1225 * ch

const oldStartY = 'let startY = isMobile ? vh * 0.6 - ch / 2 : vh / 2 - ch / 2;';
const newStartY = 'let startY = isMobile ? vh * 0.65 - 0.1225 * ch : vh * 0.55 - 0.1225 * ch;';

if (content.includes(oldStartY)) {
  content = content.replace(oldStartY, newStartY);
  console.log("Updated startY");
} else {
  console.log("Could not find startY to replace");
}

fs.writeFileSync(path, content);
