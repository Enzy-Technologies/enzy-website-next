import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldCode = `      let endScale = Math.min(
        (vh * 0.85) / phoneH_image,
        (vw * 0.85) / (cw * 0.2294) // Ensure width doesn't exceed 85% of screen
      );
      if (endScale > 6) endScale = 6; // cap scale
      
      const endX = vw / 2 - phoneCenterX_image * endScale;
      const endY = vh / 2 - phoneCenterY_image * endScale;`;

const newCode = `      // Target phone height is 78% of viewport height to leave room for header
      let endScale = Math.min(
        (vh * 0.78) / phoneH_image,
        (vw * 0.85) / (cw * 0.2294) // Ensure width doesn't exceed 85% of screen
      );
      if (endScale > 6) endScale = 6; // cap scale
      
      const endX = vw / 2 - phoneCenterX_image * endScale;
      // Shift it down slightly so the top clears the header perfectly
      const endY = (vh / 2) + (vh * 0.06) - phoneCenterY_image * endScale;`;

if (content.includes(oldCode)) {
  content = content.replace(oldCode, newCode);
  console.log("Updated endScale and endY");
} else {
  console.log("Could not find code to replace");
}

fs.writeFileSync(path, content);
