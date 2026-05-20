import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/const SCREEN_LEFT = ".*?";/, 'const SCREEN_LEFT = "37.75%";');
content = content.replace(/const SCREEN_TOP = ".*?";/, 'const SCREEN_TOP = "12.25%";');
content = content.replace(/const SCREEN_WIDTH = ".*?";/, 'const SCREEN_WIDTH = "22.94%";');
content = content.replace(/const SCREEN_HEIGHT = ".*?";/, 'const SCREEN_HEIGHT = "66.84%";');
content = content.replace(/const SCREEN_RADIUS = ".*?";/, 'const SCREEN_RADIUS = "14%";');

fs.writeFileSync(path, content);
console.log("Reverted SCREEN variables");
