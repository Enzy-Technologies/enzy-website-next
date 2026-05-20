import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/mixBlendMode: "multiply", \/\/ helps blend with thumb shadows if any\n/, '');

fs.writeFileSync(path, content);
console.log("Removed mixBlendMode");
