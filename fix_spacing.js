import fs from 'fs';

// 1. Remove bottom padding from HeroSection
const heroPath = './src/app/components/HeroSection.tsx';
let heroContent = fs.readFileSync(heroPath, 'utf8');

const oldHeroClass = 'className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-4 md:pb-8"';
const newHeroClass = 'className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-0"';
if (heroContent.includes(oldHeroClass)) {
  heroContent = heroContent.replace(oldHeroClass, newHeroClass);
  console.log("Removed bottom padding from HeroSection");
}

fs.writeFileSync(heroPath, heroContent);

// 2. Add negative top margin to Playground
const playPath = './src/app/playground/playground.tsx';
let playContent = fs.readFileSync(playPath, 'utf8');

const oldPlayClass = 'className="relative w-full h-[600vh] z-10"';
const newPlayClass = 'className="relative w-full h-[600vh] z-10 -mt-[15vh] md:-mt-[25vh]"';
if (playContent.includes(oldPlayClass)) {
  playContent = playContent.replace(oldPlayClass, newPlayClass);
  console.log("Added negative top margin to Playground");
}

fs.writeFileSync(playPath, playContent);
