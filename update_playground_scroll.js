import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update BASE_IMAGES
const oldBaseImages = `const BASE_IMAGES = [
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhoneAI.png"
];`;
const newBaseImages = `const BASE_IMAGES = [
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png",
];

const SCROLL_IMAGE = "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Homepage.png";`;

content = content.replace(oldBaseImages, newBaseImages);

// 2. Remove baseImg2Op and add screenScrollY
const oldTransforms = `  // Snap transition for the second image
  const baseImg2Op = useTransform(scrollYProgress, [0.49, 0.5], [0, 1]);`;
const newTransforms = `  // Scroll the long image inside the phone screen
  // Starts after zoom finishes (0.3) and continues to the end (1.0)
  const screenScrollY = useTransform(scrollYProgress, [0.3, 1.0], ["0%", "-75.1%"]);`;

content = content.replace(oldTransforms, newTransforms);

// 3. Update the render block
const oldRender = `          {/* Base Images */}
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
          </div>
          
          {/* Debug Dot - always visible to check position */}
          {/* <div className="absolute z-50 w-2 h-2 bg-red-500 rounded-full" style={{ left: "56.5%", top: "75.5%", marginLeft: "-4px", marginTop: "-4px" }} /> */}
          
          {/* Fade out the bottom of the arm */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{
            background: "linear-gradient(to bottom, transparent 80%, var(--color-surface-light) 98%)"
          }} />

          {/* Screen Overlay Container (Hidden for now since we are switching full base images, but kept for future placeholders if needed) */}
          {/* 
          <div 
            className="absolute overflow-hidden"
            style={{
              left: SCREEN_LEFT,
              top: SCREEN_TOP,
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              borderRadius: SCREEN_RADIUS,
              transform: \`rotate(\${SCREEN_ROTATE})\`,
              transformOrigin: "center center",
            }}
          >
            {IMAGES.map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={\`Screen \${index + 1}\`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: imageOpacities[index] }}
              />
            ))}
          </div>
          */}`;

const newRender = `          {/* Base Images */}
          <img 
            src={BASE_IMAGES[0]} 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Screen Overlay Container */}
          <div 
            className="absolute overflow-hidden"
            style={{
              left: SCREEN_LEFT,
              top: SCREEN_TOP,
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              borderRadius: SCREEN_RADIUS,
              transform: \`rotate(\${SCREEN_ROTATE})\`,
              transformOrigin: "center center",
              backgroundColor: "#ffffff", // white background behind the image
            }}
          >
            <motion.img
              src={SCROLL_IMAGE}
              alt="Enzy Homepage"
              className="absolute top-0 left-0 w-full h-auto"
              style={{ y: screenScrollY }}
            />
          </div>

          {/* Text above phone */}
          <div className="absolute w-full text-center flex justify-center pointer-events-none z-30" style={{ top: "4%" }}>
            <h2 className="font-inter font-semibold text-[#111111] text-lg md:text-xl tracking-tight">
              Enzy Goes Agentic
            </h2>
          </div>
          
          {/* Fade out the bottom of the arm */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{
            background: "linear-gradient(to bottom, transparent 80%, var(--color-surface-light) 98%)"
          }} />`;

content = content.replace(oldRender, newRender);

fs.writeFileSync(path, content);
console.log("Updated playground for scrolling screen");
