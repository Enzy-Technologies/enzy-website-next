import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<section className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-24">',
  '<section ref={containerRef} className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-24">'
);

fs.writeFileSync(path, content);
console.log('Added ref to section');
