import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

const backgroundDivStart = `<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>`;
const backgroundDivEnd = `</div>`;

const bgStartIdx = content.indexOf(backgroundDivStart);
if (bgStartIdx !== -1) {
  // Find the closing div for this block
  let openDivs = 0;
  let currentIdx = bgStartIdx;
  let foundEnd = false;
  
  while (currentIdx < content.length) {
    const nextOpen = content.indexOf('<div', currentIdx);
    const nextClose = content.indexOf('</div', currentIdx);
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      openDivs++;
      currentIdx = nextOpen + 4;
    } else if (nextClose !== -1) {
      openDivs--;
      currentIdx = nextClose + 6;
      if (openDivs === 0) {
        foundEnd = true;
        break;
      }
    } else {
      break;
    }
  }
  
  if (foundEnd) {
    const toRemove = content.substring(bgStartIdx, currentIdx);
    content = content.replace(toRemove, '');
    console.log("Removed background div");
  }
}

fs.writeFileSync(path, content);
