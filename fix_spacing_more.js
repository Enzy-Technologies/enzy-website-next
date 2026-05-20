import fs from 'fs';

// 1. Reduce top padding from HeroSection
const heroPath = './src/app/components/HeroSection.tsx';
let heroContent = fs.readFileSync(heroPath, 'utf8');

const oldHeroClass = 'className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-0"';
const newHeroClass = 'className="relative w-full pt-8 md:pt-12 lg:pt-16 pb-0"';
if (heroContent.includes(oldHeroClass)) {
  heroContent = heroContent.replace(oldHeroClass, newHeroClass);
  console.log("Reduced top padding from HeroSection");
}

fs.writeFileSync(heroPath, heroContent);

// 2. Increase negative top margin to Playground even more
const playPath = './src/app/playground/playground.tsx';
let playContent = fs.readFileSync(playPath, 'utf8');

const oldPlayClass = 'className="relative w-full h-[600vh] z-10 -mt-[25vh] md:-mt-[35vh]"';
const newPlayClass = 'className="relative w-full h-[600vh] z-10 -mt-[35vh] md:-mt-[45vh]"';
if (playContent.includes(oldPlayClass)) {
  playContent = playContent.replace(oldPlayClass, newPlayClass);
  console.log("Increased negative top margin to Playground even more");
}

fs.writeFileSync(playPath, playContent);
