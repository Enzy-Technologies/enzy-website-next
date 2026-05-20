import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// Remove PlaygroundSurface component
const playgroundSurfaceStart = `function PlaygroundSurface({`;
const playgroundSurfaceEnd = `  );
}`;

const startIndex = content.indexOf(playgroundSurfaceStart);
if (startIndex !== -1) {
  const remainingContent = content.substring(startIndex);
  const endIndex = remainingContent.lastIndexOf(playgroundSurfaceEnd) + playgroundSurfaceEnd.length;
  
  if (endIndex !== -1) {
    const toRemove = remainingContent.substring(0, endIndex);
    content = content.replace(toRemove, '');
    console.log('Removed PlaygroundSurface component');
  }
}

// Remove QUESTIONS array and types
const typesStart = `type Question = {`;
const questionsEnd = `  },
];`;

const tStart = content.indexOf(typesStart);
const qEnd = content.indexOf(questionsEnd) + questionsEnd.length;

if (tStart !== -1 && qEnd !== -1) {
  const toRemove = content.substring(tStart, qEnd);
  content = content.replace(toRemove, '');
  console.log('Removed Question types and QUESTIONS array');
}

// Remove unused constants
const constantsToRemove = `const TYPING_SPEED_MS = 14;
const ROTATE_INTERVAL_MS = 18000;`;
if (content.includes(constantsToRemove)) {
  content = content.replace(constantsToRemove, '');
  console.log("Removed unused constants");
}

fs.writeFileSync(path, content);
