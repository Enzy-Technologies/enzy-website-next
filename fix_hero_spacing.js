import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update button to have full rounded corners
const oldBtnRegex = /rounded-\[16px\] sm:rounded-\[18px\] md:rounded-\[20px\]/g;
if (oldBtnRegex.test(content)) {
  content = content.replace(oldBtnRegex, 'rounded-full');
  console.log("Updated button to have full rounded corners");
} else {
  console.log("Could not find button rounded classes");
}

// 2. Reduce bottom padding of HeroSectionDefault
const oldSectionClass = 'className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-24"';
const newSectionClass = 'className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-4 md:pb-8"';
if (content.includes(oldSectionClass)) {
  content = content.replace(oldSectionClass, newSectionClass);
  console.log("Reduced bottom padding of HeroSectionDefault");
} else {
  console.log("Could not find section class");
}

fs.writeFileSync(path, content);
