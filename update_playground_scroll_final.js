import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update SCREEN coordinates
content = content.replace(/const SCREEN_LEFT = ".*?";/, 'const SCREEN_LEFT = "34.48%";');
content = content.replace(/const SCREEN_TOP = ".*?";/, 'const SCREEN_TOP = "12.25%";');
content = content.replace(/const SCREEN_WIDTH = ".*?";/, 'const SCREEN_WIDTH = "46.57%";');
content = content.replace(/const SCREEN_HEIGHT = ".*?";/, 'const SCREEN_HEIGHT = "82.22%";');
content = content.replace(/const SCREEN_RADIUS = ".*?";/, 'const SCREEN_RADIUS = "6%";');

// 2. Ensure Screen Overlay Container is AFTER the Base Image
// In my previous script `update_playground_scroll.js`, I already put it after the Base Image.
// Let's just make sure it has z-index.
const oldOverlay = `          {/* Screen Overlay Container */}
          <div 
            className="absolute overflow-hidden"
            style={{
              left: SCREEN_LEFT,
              top: SCREEN_TOP,
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              borderRadius: SCREEN_RADIUS,
              transform: \`rotate(\${SCREEN_ROTATE})\`,
              transformOrigin: "center center",
              backgroundColor: "#ffffff", // white background behind the image
            }}
          >`;
const newOverlay = `          {/* Screen Overlay Container */}
          <div 
            className="absolute overflow-hidden z-10"
            style={{
              left: SCREEN_LEFT,
              top: SCREEN_TOP,
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              borderRadius: SCREEN_RADIUS,
              transform: \`rotate(\${SCREEN_ROTATE})\`,
              transformOrigin: "center center",
              backgroundColor: "#ffffff", // white background behind the image
            }}
          >`;

if (content.includes(oldOverlay)) {
  content = content.replace(oldOverlay, newOverlay);
  console.log("Added z-index to overlay");
}

fs.writeFileSync(path, content);
console.log("Updated playground scroll final");
