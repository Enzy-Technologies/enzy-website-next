import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldOverlay = `              transformOrigin: "center center",
              backgroundColor: "#ffffff", // white background behind the image
            }}`;
const newOverlay = `              transformOrigin: "center center",
              backgroundColor: "#ffffff", // white background behind the image
              mixBlendMode: "multiply", // helps blend with thumb shadows if any
            }}`;

if (content.includes(oldOverlay)) {
  content = content.replace(oldOverlay, newOverlay);
  console.log("Added mixBlendMode");
}

fs.writeFileSync(path, content);
