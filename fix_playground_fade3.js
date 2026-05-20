import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldImg = `            src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png" 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
          />`;

const newImg = `            src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png" 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Fade out the bottom of the arm */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{
            background: "linear-gradient(to bottom, transparent 80%, var(--color-surface-light) 98%)"
          }} />`;

if (content.includes(oldImg)) {
  content = content.replace(oldImg, newImg);
  console.log("Added fade mask");
} else {
  console.log("Could not find img");
}

fs.writeFileSync(path, content);
