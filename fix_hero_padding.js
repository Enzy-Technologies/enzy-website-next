import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldClass = 'className="relative w-full pt-28 pb-12 lg:pt-32 lg:pb-0 lg:min-h-[90vh] flex items-center"';
const newClass = 'className="relative w-full pt-16 pb-6 lg:pt-20 lg:pb-0 lg:min-h-[80vh] flex items-center"';

if (content.includes(oldClass)) {
  content = content.replace(oldClass, newClass);
  console.log("Updated HeroSection padding");
} else {
  console.log("Could not find HeroSection padding class");
}

fs.writeFileSync(path, content);
