import fs from 'fs';

// 1. Update HeroSection.tsx
const heroPath = './src/app/components/HeroSection.tsx';
let heroContent = fs.readFileSync(heroPath, 'utf8');

const oldColumn = 'className="flex flex-col gap-7 text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0 w-full lg:w-[50%] xl:w-[45%] z-20"';
const newColumn = 'className="flex flex-col gap-7 text-center lg:text-left items-center lg:items-start max-w-3xl mx-auto lg:mx-0 w-full lg:w-[55%] xl:w-[50%] lg:pl-8 xl:pl-12 z-20"';

if (heroContent.includes(oldColumn)) {
  heroContent = heroContent.replace(oldColumn, newColumn);
  console.log("Updated Hero column width and padding");
}

const oldP = 'className={`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[540px] mx-auto lg:mx-0 ${';
const newP = 'className={`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[640px] mx-auto lg:mx-0 ${';

if (heroContent.includes(oldP)) {
  heroContent = heroContent.replace(oldP, newP);
  console.log("Updated Hero paragraph max-w");
}

fs.writeFileSync(heroPath, heroContent);

// 2. Update playground.tsx
const playPath = './src/app/playground/playground.tsx';
let playContent = fs.readFileSync(playPath, 'utf8');

const oldScale = 'let ch = isMobile ? vh * 0.6 : Math.min(vh * 0.85, (vw * 0.5) / imageAspect);';
const newScale = 'let ch = isMobile ? vh * 0.6 : Math.min(vh * 0.95, (vw * 0.55) / imageAspect);';

if (playContent.includes(oldScale)) {
  playContent = playContent.replace(oldScale, newScale);
  console.log("Updated playground scale");
}

const oldStart = 'let startX = isMobile ? vw / 2 - cw / 2 : vw * 0.75 - cw / 2;';
const newStart = 'let startX = isMobile ? vw / 2 - cw / 2 : vw * 0.72 - cw / 2;';

if (playContent.includes(oldStart)) {
  playContent = playContent.replace(oldStart, newStart);
  console.log("Updated playground startX");
}

fs.writeFileSync(playPath, playContent);
