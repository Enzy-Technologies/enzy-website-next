import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldCode = `      // Base dimensions of the image container to ensure it's large enough
      // We make it at least as wide as the screen, and at least as tall as the screen
      const isMobile = vw < 768;
      
      // Ensure image covers the screen given the target phone position
      const minCwLeft = targetPhoneX / 0.2856;
      const minCwRight = (vw - targetPhoneX) / 0.7144;
      const minChTop = targetPhoneY / 0.4509;
      const minChBottom = (vh - targetPhoneY) / 0.5491;
      
      let reqCw = Math.max(vw, minCwLeft, minCwRight);
      let reqCh = Math.max(vh, minChTop, minChBottom);
      
      // Maintain aspect ratio
      let cw = Math.max(reqCw, reqCh * imageAspect);
      let ch = Math.max(reqCh, reqCw / imageAspect);
      
      // Phone screen center in the image
      const phoneCenterX_image = cw * 0.2856;
      const phoneCenterY_image = ch * 0.4509;
      const phoneH_image = ch * 0.4538;
      
      // Calculate starting position (scale 1)
      const targetPhoneX = vw * 0.5; // Always center the phone
      const targetPhoneY = isMobile ? vh * 0.55 : vh * 0.6; // Move it lower as requested`;

const newCode = `      const isMobile = vw < 768;
      const targetPhoneX = vw * 0.5; // Always center the phone
      const targetPhoneY = isMobile ? vh * 0.55 : vh * 0.6; // Move it lower as requested
      
      // Ensure image covers the screen given the target phone position
      const minCwLeft = targetPhoneX / 0.2856;
      const minCwRight = (vw - targetPhoneX) / 0.7144;
      const minChTop = targetPhoneY / 0.4509;
      const minChBottom = (vh - targetPhoneY) / 0.5491;
      
      let reqCw = Math.max(vw, minCwLeft, minCwRight);
      let reqCh = Math.max(vh, minChTop, minChBottom);
      
      // Maintain aspect ratio
      let cw = Math.max(reqCw, reqCh * imageAspect);
      let ch = Math.max(reqCh, reqCw / imageAspect);
      
      // Phone screen center in the image
      const phoneCenterX_image = cw * 0.2856;
      const phoneCenterY_image = ch * 0.4509;
      const phoneH_image = ch * 0.4538;
      
      // Calculate starting position (scale 1)`;

content = content.replace(oldCode, newCode);
fs.writeFileSync(path, content);
console.log("Fixed order");
