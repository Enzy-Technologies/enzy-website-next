import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Restore BASE_IMAGES
const oldBaseImages = `const BASE_IMAGES = [
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png",
];

const SCROLL_IMAGE = "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Homepage.png";`;

const newBaseImages = `const BASE_IMAGES = [
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhoneAI.png"
];`;

if (content.includes(oldBaseImages)) {
  content = content.replace(oldBaseImages, newBaseImages);
  console.log("Restored BASE_IMAGES");
}

// 2. Restore Transforms
const oldTransforms = `  // Scroll the long image inside the phone screen
  // Starts after zoom finishes (0.3) and continues to the end (1.0)
  const screenScrollY = useTransform(scrollYProgress, [0.3, 1.0], ["0%", "-75.1%"]);
  
  // Fade in the scrolling screen right after zoom finishes
  // This hides the baked-in UI of the base image so they don't overlap
  const screenOpacity = useTransform(scrollYProgress, [0.29, 0.3], [0, 1]);`;

const newTransforms = `  // Snap transition for the second image
  const baseImg2Op = useTransform(scrollYProgress, [0.49, 0.5], [0, 1]);`;

if (content.includes(oldTransforms)) {
  content = content.replace(oldTransforms, newTransforms);
  console.log("Restored Transforms");
}

// 3. Restore Render Block
const oldRender = `          {/* Base Images */}
          <img 
            src={BASE_IMAGES[0]} 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Screen Overlay Container */}
          <motion.div 
            className="absolute overflow-hidden z-10"
            style={{
              left: SCREEN_LEFT,
              top: SCREEN_TOP,
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              borderRadius: SCREEN_RADIUS,
              transform: \`rotate(\${SCREEN_ROTATE})\`,
              transformOrigin: "center center",
              backgroundColor: "#ffffff",
              opacity: screenOpacity,
            }}
          >
            <motion.img
              src={SCROLL_IMAGE}
              alt="Enzy Homepage"
              className="absolute top-0 left-0 w-full h-auto"
              style={{ y: screenScrollY }}
            />
          </motion.div>

          {/* Text above phone */}
          <div className="absolute w-full text-center flex justify-center pointer-events-none z-30" style={{ top: "4%" }}>
            <h2 className="font-inter font-semibold text-[#111111] text-lg md:text-xl tracking-tight">
              Enzy Goes Agentic
            </h2>
          </div>`;

const newRender = `          {/* Base Images */}
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
          <div className="absolute w-full text-center flex justify-center pointer-events-none z-30" style={{ top: "4%" }}>
            <h2 className="font-inter font-semibold text-[#111111] text-lg md:text-xl tracking-tight">
              Enzy Goes Agentic
            </h2>
          </div>`;

if (content.includes(oldRender)) {
  content = content.replace(oldRender, newRender);
  console.log("Restored Render Block");
}

fs.writeFileSync(path, content);
