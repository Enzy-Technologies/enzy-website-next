import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add fade mask to the image container
const oldImageContainer = `<motion.div
            style={{
              width: animValues.cw,
              height: animValues.ch,
              x,
              y,
              scale,
              transformOrigin: "0 0",
              filter,
            }}
            className="absolute top-0 left-0 will-change-transform"
          >`;

const newImageContainer = `<motion.div
            style={{
              width: animValues.cw,
              height: animValues.ch,
              x,
              y,
              scale,
              transformOrigin: "0 0",
              filter,
            }}
            className="absolute top-0 left-0 will-change-transform"
          >
            {/* Fade out the bottom of the arm */}
            <div className="absolute inset-0 pointer-events-none z-20" style={{
              background: "linear-gradient(to bottom, transparent 85%, var(--color-surface-light) 100%)"
            }} />`;

if (content.includes(oldImageContainer)) {
  content = content.replace(oldImageContainer, newImageContainer);
  console.log("Added fade mask");
} else {
  console.log("Could not find image container");
}

// 2. Adjust desktop start position to be more centered on the right
const oldStart = `      let startX = isMobile ? vw / 2 - cw / 2 : vw * 0.72 - cw / 2;
      let startY = isMobile ? vh * 0.45 - 0.1225 * ch : vh / 2 - ch / 2;`;

const newStart = `      let startX = isMobile ? vw / 2 - cw / 2 : vw * 0.75 - cw / 2;
      let startY = isMobile ? vh * 0.45 - 0.1225 * ch : vh * 0.55 - ch / 2;`;

if (content.includes(oldStart)) {
  content = content.replace(oldStart, newStart);
  console.log("Updated start position");
} else {
  console.log("Could not find start position");
}

fs.writeFileSync(path, content);
