import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// Update targetPhoneY to be higher
const oldTargetY = 'const targetPhoneY = isMobile ? vh * 0.55 : vh * 0.6;';
const newTargetY = 'const targetPhoneY = isMobile ? vh * 0.4 : vh * 0.45;';

if (content.includes(oldTargetY)) {
  content = content.replace(oldTargetY, newTargetY);
  console.log("Updated targetPhoneY");
}

// Update targetPhoneX to center it better if needed?
// The user's screenshot shows the phone is slightly off-center or cut off.
// If the image is shifted left to center the phone, the right side of the image might not cover the screen.
// Let's check cw calculation.
// cw = Math.max(vw, vh * imageAspect);
// If we shift the image left by startX (which is negative), the right edge is at startX + cw.
// We need startX + cw >= vw.
// startX = targetPhoneX - phoneCenterX_image.
// startX + cw = targetPhoneX - phoneCenterX_image + cw.
// Since phoneCenterX_image is ~ 0.28 * cw, startX + cw = targetPhoneX + 0.72 * cw.
// Since targetPhoneX > 0 and cw >= vw, this is always > vw. So it won't cut off on the right.
// What about the bottom?
// startY + ch >= vh.
// startY = targetPhoneY - phoneCenterY_image.
// startY + ch = targetPhoneY - phoneCenterY_image + ch.
// If targetPhoneY is 0.4 vh, and phoneCenterY_image is ~0.45 ch.
// If ch = vh, startY + ch = 0.4 vh - 0.45 vh + vh = 0.95 vh.
// This is < vh! So the bottom of the image will NOT cover the bottom of the screen!
// If the bottom of the image doesn't cover the bottom of the screen, it will be cut off!
// That's why it was getting cut off!
// The constraint `if (startY + ch < vh) startY = vh - ch;` fixes this by setting startY = 0 (if ch=vh).
// If startY = 0, then targetPhoneY becomes phoneCenterY_image = 0.45 vh.
// But wait, if ch > vh, startY can be negative.

// To prevent the image from being cut off, we must ensure the image covers the screen.
// Let's just make the image larger if needed.
const oldCwCh = `      let cw = Math.max(vw, vh * imageAspect);
      let ch = Math.max(vh, vw / imageAspect);`;

// If we want to position the phone at targetPhoneX, targetPhoneY, we need:
// startX <= 0  => targetPhoneX <= phoneCenterX_image => targetPhoneX <= cw * 0.2856 => cw >= targetPhoneX / 0.2856
// startY <= 0  => targetPhoneY <= phoneCenterY_image => targetPhoneY <= ch * 0.4509 => ch >= targetPhoneY / 0.4509
// startX + cw >= vw => targetPhoneX - cw * 0.2856 + cw >= vw => cw * 0.7144 >= vw - targetPhoneX => cw >= (vw - targetPhoneX) / 0.7144
// startY + ch >= vh => targetPhoneY - ch * 0.4509 + ch >= vh => ch * 0.5491 >= vh - targetPhoneY => ch >= (vh - targetPhoneY) / 0.5491

const newCwCh = `      // Ensure image covers the screen given the target phone position
      const minCwLeft = (isMobile ? vw * 0.5 : vw * 0.35) / 0.2856;
      const minCwRight = (vw - (isMobile ? vw * 0.5 : vw * 0.35)) / 0.7144;
      const minChTop = (isMobile ? vh * 0.4 : vh * 0.45) / 0.4509;
      const minChBottom = (vh - (isMobile ? vh * 0.4 : vh * 0.45)) / 0.5491;
      
      let reqCw = Math.max(vw, minCwLeft, minCwRight);
      let reqCh = Math.max(vh, minChTop, minChBottom);
      
      // Maintain aspect ratio
      let cw = Math.max(reqCw, reqCh * imageAspect);
      let ch = Math.max(reqCh, reqCw / imageAspect);`;

if (content.includes(oldCwCh)) {
  content = content.replace(oldCwCh, newCwCh);
  console.log("Updated cw/ch calculation to prevent cutoff");
}

fs.writeFileSync(path, content);
