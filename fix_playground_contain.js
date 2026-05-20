import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldCode = `      // Use the whole image to start, covering the screen
      let cw = Math.max(vw, vh * imageAspect);
      let ch = Math.max(vh, vw / imageAspect);`;

const newCode = `      // Use the whole image to start, containing it within the screen
      // On mobile, we might want it a bit larger so it's not tiny
      let cw = isMobile ? vw * 1.2 : Math.min(vw, vh * imageAspect);
      let ch = isMobile ? (vw * 1.2) / imageAspect : Math.min(vh, vw / imageAspect);`;

content = content.replace(oldCode, newCode);

// Also let's adjust the starting Y position on mobile if we made it larger
const oldStartY = `      let startY = vh / 2 - ch / 2;`;
const newStartY = `      let startY = isMobile ? vh * 0.6 - ch / 2 : vh / 2 - ch / 2;`;

content = content.replace(oldStartY, newStartY);

fs.writeFileSync(path, content);
console.log("Updated playground to contain the image");
