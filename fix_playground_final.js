import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix targetPhoneX and targetPhoneY
const oldTargetX = 'const targetPhoneX = isMobile ? vw * 0.5 : vw * 0.35;';
const newTargetX = 'const targetPhoneX = vw * 0.5; // Always center the phone';
content = content.replace(oldTargetX, newTargetX);

const oldTargetY = 'const targetPhoneY = isMobile ? vh * 0.4 : vh * 0.45;';
const newTargetY = 'const targetPhoneY = isMobile ? vh * 0.55 : vh * 0.6; // Move it lower as requested';
content = content.replace(oldTargetY, newTargetY);

// 2. Fix minCwLeft and minCwRight to use the new targetPhoneX
const oldMinCw = `      const minCwLeft = (isMobile ? vw * 0.5 : vw * 0.35) / 0.2856;
      const minCwRight = (vw - (isMobile ? vw * 0.5 : vw * 0.35)) / 0.7144;`;
const newMinCw = `      const minCwLeft = targetPhoneX / 0.2856;
      const minCwRight = (vw - targetPhoneX) / 0.7144;`;
content = content.replace(oldMinCw, newMinCw);

// 3. Fix minChTop and minChBottom to use the new targetPhoneY
const oldMinCh = `      const minChTop = (isMobile ? vh * 0.4 : vh * 0.45) / 0.4509;
      const minChBottom = (vh - (isMobile ? vh * 0.4 : vh * 0.45)) / 0.5491;`;
const newMinCh = `      const minChTop = targetPhoneY / 0.4509;
      const minChBottom = (vh - targetPhoneY) / 0.5491;`;
content = content.replace(oldMinCh, newMinCh);

// 4. Fix endScale to prevent cutoff on narrow screens
const oldEndScale = `      let endScale = (vh * 0.85) / phoneH_image;
      if (endScale > 6) endScale = 6; // cap scale`;
const newEndScale = `      let endScale = Math.min(
        (vh * 0.85) / phoneH_image,
        (vw * 0.85) / (cw * 0.1474) // Ensure width doesn't exceed 85% of screen
      );
      if (endScale > 6) endScale = 6; // cap scale`;
content = content.replace(oldEndScale, newEndScale);

// 5. Reduce negative margin on Playground container
const oldPlayClass = 'className="relative w-full h-[600vh] z-10 -mt-[35vh] md:-mt-[45vh]"';
const newPlayClass = 'className="relative w-full h-[600vh] z-10 -mt-[10vh] md:-mt-[15vh]"';
content = content.replace(oldPlayClass, newPlayClass);

fs.writeFileSync(path, content);
console.log("Fixed playground positioning and scaling");
