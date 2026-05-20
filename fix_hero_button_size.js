import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldClass = 'className="w-full sm:w-auto font-inter text-[13px] sm:text-[14px] md:text-[15px] h-[48px] sm:h-[52px] md:h-[56px] px-8 sm:px-10 md:px-12 rounded-full shadow-[0_8px_24px_rgba(25,173,125,0.25)] hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)] transition-all duration-300"';
const newClass = 'className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] font-inter font-normal text-[22px] sm:text-[26px] md:text-[32px] h-[64px] sm:h-[76px] md:h-[88px] px-8 sm:px-10 md:px-12 rounded-full shadow-[0_8px_24px_rgba(25,173,125,0.25)] hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)] transition-all duration-300"';

if (content.includes(oldClass)) {
  content = content.replace(oldClass, newClass);
  console.log("Updated button class");
} else {
  console.log("Could not find button class to replace");
}

fs.writeFileSync(path, content);
