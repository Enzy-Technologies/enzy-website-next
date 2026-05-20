import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldCode = `      // Ensure image covers the screen given the target phone position
      const minCwLeft = targetPhoneX / 0.4922;
      const minCwRight = (vw - targetPhoneX) / 0.5078;
      const minChTop = targetPhoneY / 0.4567;
      const minChBottom = (vh - targetPhoneY) / 0.5433;
      
      let reqCw = Math.max(vw, minCwLeft, minCwRight);
      let reqCh = Math.max(vh, minChTop, minChBottom);
      
      // Maintain aspect ratio
      let cw = Math.max(reqCw, reqCh * imageAspect);
      let ch = Math.max(reqCh, reqCw / imageAspect);`;

const newCode = `      // Determine initial size of the phone
      // On mobile, the phone should take up about 80% of the screen width initially
      // On desktop, it should take up about 30% of the screen width
      const targetPhoneWidth = isMobile ? vw * 0.8 : vw * 0.3;
      
      // Calculate the full image dimensions based on the target phone width
      // Since phone width = cw * 0.2294
      let cw = targetPhoneWidth / 0.2294;
      let ch = cw / imageAspect;`;

content = content.replace(oldCode, newCode);

// Also remove the constraints that force the arm to the edge, since it's a transparent PNG
const oldConstraints = `      // Enforce constraints so the arm doesn't float disconnected from the edges
      if (startX > 0) startX = 0; // Arm must go off left edge
      if (startY + ch < vh) startY = vh - ch; // Arm must go off bottom edge`;

const newConstraints = `      // No edge constraints needed for transparent PNG
      // The arm can float if it wants, but it's positioned at targetPhoneX/Y`;

content = content.replace(oldConstraints, newConstraints);

fs.writeFileSync(path, content);
console.log("Fixed scaling logic for transparent PNG");
