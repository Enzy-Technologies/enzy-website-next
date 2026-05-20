import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Replace clipPath with opacity snap
const oldClip = `  const baseImg2Clip = useTransform(scrollYProgress, [0.4, 0.75], [100, 0]);
  const clipPath = useTransform(baseImg2Clip, (val) => \`inset(\${val}% 0 0 0)\`);`;
const newClip = `  // Snap transition for the second image
  const baseImg2Op = useTransform(scrollYProgress, [0.49, 0.5], [0, 1]);`;

if (content.includes(oldClip)) {
  content = content.replace(oldClip, newClip);
  console.log("Updated to snap transition");
} else {
  console.log("Could not find clipPath transition");
}

// 2. Update the image rendering to use opacity instead of clipPath
const oldImg2 = `          <motion.img 
            src={BASE_IMAGES[1]} 
            alt="Hand holding phone AI" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath }}
          />`;
const newImg2 = `          <motion.img 
            src={BASE_IMAGES[1]} 
            alt="Hand holding phone AI" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: baseImg2Op }}
          />`;

if (content.includes(oldImg2)) {
  content = content.replace(oldImg2, newImg2);
  console.log("Updated image 2 style to use opacity");
} else {
  console.log("Could not find image 2");
}

// 3. Add the text above the phone
const oldImagesBlock = `          {/* Base Images */}
          <img 
            src={BASE_IMAGES[0]} 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.img 
            src={BASE_IMAGES[1]} 
            alt="Hand holding phone AI" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: baseImg2Op }}
          />`;
          
const newImagesBlock = `          {/* Base Images */}
          <img 
            src={BASE_IMAGES[0]} 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.img 
            src={BASE_IMAGES[1]} 
            alt="Hand holding phone AI" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: baseImg2Op }}
          />
          
          {/* Text above phone */}
          <div className="absolute w-full text-center flex justify-center pointer-events-none" style={{ top: "4%" }}>
            <h2 className="font-inter font-semibold text-[#111111] text-lg md:text-xl tracking-tight">
              Enzy Goes Agentic
            </h2>
          </div>`;

if (content.includes(oldImagesBlock)) {
  content = content.replace(oldImagesBlock, newImagesBlock);
  console.log("Added text above phone");
} else {
  console.log("Could not find images block to append text");
}

fs.writeFileSync(path, content);
