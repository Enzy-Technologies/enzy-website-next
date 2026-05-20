import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldImageContainer = `<motion.div
          className="absolute will-change-transform origin-top-left"
          style={{ 
            width: animValues.cw,
            height: animValues.ch,
            x, 
            y, 
            scale,
            opacity: isMounted ? 1 : 0
          }}
        >
          <motion.div style={{ filter }} className="w-full h-full relative">
            <img 
              src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png" 
              alt="Hand holding phone"
              className="w-full h-full object-contain"
            />`;

const newImageContainer = `<motion.div
          className="absolute will-change-transform origin-top-left"
          style={{ 
            width: animValues.cw,
            height: animValues.ch,
            x, 
            y, 
            scale,
            opacity: isMounted ? 1 : 0
          }}
        >
          <motion.div style={{ filter }} className="w-full h-full relative">
            <img 
              src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png" 
              alt="Hand holding phone"
              className="w-full h-full object-contain"
            />
            {/* Fade out the bottom of the arm */}
            <div className="absolute inset-0 pointer-events-none z-20" style={{
              background: "linear-gradient(to bottom, transparent 80%, var(--color-surface-light) 98%)"
            }} />`;

if (content.includes(oldImageContainer)) {
  content = content.replace(oldImageContainer, newImageContainer);
  console.log("Added fade mask");
} else {
  console.log("Could not find image container");
}

fs.writeFileSync(path, content);
