import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldCode = `      // Ensure image covers the screen given the target phone position
      const minCwLeft = (isMobile ? vw * 0.5 : vw * 0.35) / 0.2856;`;

const newCode = `      const isMobile = vw < 768;
      
      // Ensure image covers the screen given the target phone position
      const minCwLeft = (isMobile ? vw * 0.5 : vw * 0.35) / 0.2856;`;

content = content.replace(oldCode, newCode);

// Also remove the later declaration of isMobile
const laterDecl = `      const isMobile = vw < 768;
      const targetPhoneX = isMobile ? vw * 0.5 : vw * 0.35;`;
const newLaterDecl = `      const targetPhoneX = isMobile ? vw * 0.5 : vw * 0.35;`;

content = content.replace(laterDecl, newLaterDecl);

fs.writeFileSync(path, content);
console.log("Fixed isMobile declaration");
