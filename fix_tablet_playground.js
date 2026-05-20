import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldCode = `      const isMobile = vw < 768;
      // Use the whole image to start, containing it within the screen
      // On mobile, we might want it a bit larger so it's not tiny
      // Scale down initially
      let ch = isMobile ? vh * 0.6 : Math.min(vh * 0.95, (vw * 0.55) / imageAspect);
      let cw = ch * imageAspect;
      
      // Ensure phone isn't too tiny on mobile
      if (isMobile && cw * 0.2294 < vw * 0.4) {
        cw = (vw * 0.4) / 0.2294;
        ch = cw / imageAspect;
      }
      
      // Phone screen center in the image
      const phoneCenterX_image = cw * 0.4922;
      const phoneCenterY_image = ch * 0.4567;
      const phoneH_image = ch * 0.6684;
      
      // Calculate starting position (scale 1)
      let startX = isMobile ? vw / 2 - cw / 2 : vw * 0.72 - cw / 2;
      let startY = isMobile ? vh * 0.45 - 0.1225 * ch : vh * 0.55 - ch / 2;`;

const newCode = `      const isMobile = vw < 768;
      const isDesktop = vw >= 1024;
      
      // Scale down initially
      let ch;
      if (isDesktop) {
        ch = Math.min(vh * 0.95, (vw * 0.55) / imageAspect);
      } else if (isMobile) {
        ch = vh * 0.6;
      } else {
        // Tablet
        ch = Math.min(vh * 0.75, (vw * 0.8) / imageAspect);
      }
      
      let cw = ch * imageAspect;
      
      // Ensure phone isn't too tiny on mobile/tablet
      if (!isDesktop && cw * 0.2294 < vw * 0.4) {
        cw = (vw * 0.4) / 0.2294;
        ch = cw / imageAspect;
      }
      
      // Phone screen center in the image
      const phoneCenterX_image = cw * 0.4922;
      const phoneCenterY_image = ch * 0.4567;
      const phoneH_image = ch * 0.6684;
      
      // Calculate starting position (scale 1)
      let startX = isDesktop ? vw * 0.72 - cw / 2 : vw / 2 - cw / 2;
      
      let startY;
      if (isDesktop) {
        startY = vh * 0.55 - ch / 2;
      } else if (isMobile) {
        startY = vh * 0.45 - 0.1225 * ch;
      } else {
        // Tablet
        startY = vh * 0.5 - 0.1225 * ch;
      }`;

if (content.includes(oldCode)) {
  content = content.replace(oldCode, newCode);
  console.log("Updated playground responsive logic");
} else {
  console.log("Could not find code to replace");
}

fs.writeFileSync(path, content);
