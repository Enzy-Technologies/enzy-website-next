import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldClass = 'className="relative w-full h-[600vh] z-10 -mt-[25vh] md:-mt-[45vh]"';
const newClass = 'className="relative w-full h-[600vh] z-10 -mt-[35vh] md:-mt-[55vh]"';

if (content.includes(oldClass)) {
  content = content.replace(oldClass, newClass);
  console.log("Increased negative top margin further");
} else {
  console.log("Could not find the class to replace");
}

fs.writeFileSync(path, content);
