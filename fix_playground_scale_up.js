import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update scale
const oldScale = `      // Ensure the image is tall enough so the arm doesn't look severed
      let ch = isMobile ? vh * 0.8 : Math.min(vh, vw / imageAspect);
      let cw = ch * imageAspect;
      
      // If cw is less than vw on mobile, that's fine, it's centered.
      // But we might want to ensure the phone isn't too small.
      if (isMobile && cw * 0.2294 < vw * 0.5) {
        cw = (vw * 0.5) / 0.2294;
        ch = cw / imageAspect;
      }`;

const newScale = `      // Scale down initially
      let ch = isMobile ? vh * 0.6 : Math.min(vh * 0.75, vw / imageAspect);
      let cw = ch * imageAspect;
      
      // Ensure phone isn't too tiny on mobile
      if (isMobile && cw * 0.2294 < vw * 0.4) {
        cw = (vw * 0.4) / 0.2294;
        ch = cw / imageAspect;
      }`;

if (content.includes(oldScale)) {
  content = content.replace(oldScale, newScale);
  console.log("Updated scale");
} else {
  console.log("Could not find scale to replace");
}

// 2. Update startY
const oldStartY = 'let startY = isMobile ? vh * 0.55 - 0.1225 * ch : vh * 0.45 - 0.1225 * ch;';
const newStartY = 'let startY = isMobile ? vh * 0.45 - 0.1225 * ch : vh * 0.3 - 0.1225 * ch;';

if (content.includes(oldStartY)) {
  content = content.replace(oldStartY, newStartY);
  console.log("Updated startY");
} else {
  console.log("Could not find startY to replace");
}

// 3. Update margin
const oldMargin = 'className="relative w-full h-[600vh] z-10 -mt-[35vh] md:-mt-[55vh]"';
const newMargin = 'className="relative w-full h-[600vh] z-10 -mt-[45vh] md:-mt-[65vh]"';

if (content.includes(oldMargin)) {
  content = content.replace(oldMargin, newMargin);
  console.log("Updated margin");
} else {
  console.log("Could not find margin to replace");
}

fs.writeFileSync(path, content);
