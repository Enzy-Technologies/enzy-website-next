import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldTransforms = `  // Scroll the long image inside the phone screen
  // Starts after zoom finishes (0.3) and continues to the end (1.0)
  const screenScrollY = useTransform(scrollYProgress, [0.3, 1.0], ["0%", "-75.1%"]);`;

const newTransforms = `  // Scroll the long image inside the phone screen
  // Starts after zoom finishes (0.3) and continues to the end (1.0)
  const screenScrollY = useTransform(scrollYProgress, [0.3, 1.0], ["0%", "-75.1%"]);
  
  // Fade in the scrolling screen right after zoom finishes
  // This hides the baked-in UI of the base image so they don't overlap
  const screenOpacity = useTransform(scrollYProgress, [0.29, 0.3], [0, 1]);`;

if (content.includes(oldTransforms)) {
  content = content.replace(oldTransforms, newTransforms);
  console.log("Added screenOpacity transform");
}

const oldOverlay = `          {/* Screen Overlay Container */}
          <div 
            className="absolute overflow-hidden z-10"
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
          >`;

const newOverlay = `          {/* Screen Overlay Container */}
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
              backgroundColor: "#ffffff", // white background behind the image
              opacity: screenOpacity,
            }}
          >`;

if (content.includes(oldOverlay)) {
  content = content.replace(oldOverlay, newOverlay);
  console.log("Applied screenOpacity to overlay");
}

// Also, the closing tag of the div needs to be changed to motion.div
const oldClosing = `            <motion.img
              src={SCROLL_IMAGE}
              alt="Enzy Homepage"
              className="absolute top-0 left-0 w-full h-auto"
              style={{ y: screenScrollY }}
            />
          </div>`;
          
const newClosing = `            <motion.img
              src={SCROLL_IMAGE}
              alt="Enzy Homepage"
              className="absolute top-0 left-0 w-full h-auto"
              style={{ y: screenScrollY }}
            />
          </motion.div>`;

if (content.includes(oldClosing)) {
  content = content.replace(oldClosing, newClosing);
  console.log("Updated closing tag to motion.div");
}

fs.writeFileSync(path, content);
