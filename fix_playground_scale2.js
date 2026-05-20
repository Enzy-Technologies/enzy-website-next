import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldScale = `      let cw = isMobile ? vw * 1.2 : Math.min(vw, vh * imageAspect);
      let ch = isMobile ? (vw * 1.2) / imageAspect : Math.min(vh, vw / imageAspect);`;

// Let's make it so the image always fills at least 80% of the viewport height on mobile,
// and on desktop it's constrained by width or height.
// Actually, if we just want it to look good:
const newScale = `      // Ensure the image is tall enough so the arm doesn't look severed
      let ch = isMobile ? vh * 0.8 : Math.min(vh, vw / imageAspect);
      let cw = ch * imageAspect;
      
      // If cw is less than vw on mobile, that's fine, it's centered.
      // But we might want to ensure the phone isn't too small.
      if (isMobile && cw * 0.2294 < vw * 0.5) {
        cw = (vw * 0.5) / 0.2294;
        ch = cw / imageAspect;
      }`;

if (content.includes(oldScale)) {
  content = content.replace(oldScale, newScale);
  console.log("Updated scale");
} else {
  console.log("Could not find scale to replace");
}

fs.writeFileSync(path, content);
