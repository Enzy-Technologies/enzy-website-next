import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/<div \n\s*className="absolute overflow-hidden z-10"/, '<motion.div \n            className="absolute overflow-hidden z-10"');
content = content.replace(/backgroundColor: "#ffffff", \/\/ white background behind the image\n\s*\}\}/, 'backgroundColor: "#ffffff",\n              opacity: screenOpacity,\n            }}');

fs.writeFileSync(path, content);
console.log("Fixed overlay div");
