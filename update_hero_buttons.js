import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove the background div
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

// 2. Update buttons
const oldButtons = `<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">
            <CTAButton href="/book-demo" variant="primary" className="w-full sm:w-auto">
              Book a Demo
            </CTAButton>
            <CTAButton
              href="#playground"
              variant="secondary"
              className="w-full sm:w-auto font-inter text-[11px] sm:text-[12px] md:text-[13px] h-[42px] sm:h-[48px] md:h-[52px] px-6 sm:px-8 md:px-[38px] rounded-[14px] sm:rounded-[16px] md:rounded-[18px] uppercase tracking-[0.1em] hover:scale-[1.02] active:scale-[0.99]"
            >
              Try the playground
            </CTAButton>
          </div>`;

const newButtons = `<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">
            <CTAButton
              href="/book-demo"
              variant="primary"
              className="w-full sm:w-auto font-inter text-[13px] sm:text-[14px] md:text-[15px] h-[48px] sm:h-[52px] md:h-[56px] px-8 sm:px-10 md:px-12 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] shadow-[0_8px_24px_rgba(25,173,125,0.25)] hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)] transition-all duration-300"
            >
              Book a Demo
            </CTAButton>
          </div>`;

if (content.includes(oldButtons)) {
  content = content.replace(oldButtons, newButtons);
  console.log("Updated buttons");
} else {
  console.log("Could not find exact button string, trying regex");
  const btnRegex = /<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">[\s\S]*?<\/div>/;
  content = content.replace(btnRegex, newButtons);
  console.log("Regex button replacement done");
}

fs.writeFileSync(path, content);
