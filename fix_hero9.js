import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace('size="lg" ', '');

fs.writeFileSync(path, content);
console.log('Removed size="lg"');
