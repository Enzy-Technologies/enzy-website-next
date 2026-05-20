const fs = require('fs');
const path = './src/app/Home.tsx';

let content = fs.readFileSync(path, 'utf8');

// Add the Playground import
if (!content.includes('import { Playground }')) {
  content = content.replace('import { HeroSection } from "@/app/components/HeroSection";', 'import { HeroSection } from "@/app/components/HeroSection";\nimport { Playground } from "@/app/playground/playground";');
}

// Add the Playground component after HeroSection
if (!content.includes('<Playground />')) {
  content = content.replace('<HeroSection />', '<HeroSection />\n      <Playground />');
}

fs.writeFileSync(path, content);
console.log('Successfully updated Home.tsx');
