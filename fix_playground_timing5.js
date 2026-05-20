import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Adjust animation timing values
const oldTiming = `  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens after a long pause once zoom finishes
  const tapOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.65, 0.7], [0, 0.8, 0.8, 0]);
  const tapScale = useTransform(scrollYProgress, [0.55, 0.65], [1.5, 0.8]);
  
  // Slide up transition for the second image using clip-path
  // 100% means fully clipped (hidden), 0% means fully visible
  // Starts exactly as the tap finishes
  const baseImg2Clip = useTransform(scrollYProgress, [0.65, 0.85], [100, 0]);`;

const newTiming = `  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens after a long pause once zoom finishes
  const tapOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.65, 0.7], [0, 1, 1, 0]);
  const tapScale = useTransform(scrollYProgress, [0.55, 0.65], [2, 0.8]);
  
  // Slide up transition for the second image using clip-path
  // 100% means fully clipped (hidden), 0% means fully visible
  // Starts exactly as the tap finishes and takes much longer
  const baseImg2Clip = useTransform(scrollYProgress, [0.65, 1.0], [100, 0]);`;

if (content.includes(oldTiming)) {
  content = content.replace(oldTiming, newTiming);
  console.log("Updated animation timing");
} else {
  console.log("Could not find timing to replace");
}

// 2. Make the tap indicator more visible by fixing its position and styling
const oldIndicator = `          {/* Tap Indicator */}
          <motion.div
            className="absolute z-30 rounded-full bg-[#19ad7d]/30 backdrop-blur-md border border-[#19ad7d]/50 flex items-center justify-center"
            style={{
              left: "57.8%",
              top: "76.8%",
              width: "48px",
              height: "48px",
              marginLeft: "-24px",
              marginTop: "-24px",
              opacity: tapOpacity,
              scale: tapScale,
            }}
          >
            <div className="w-4 h-4 rounded-full bg-[#19ad7d] shadow-[0_0_12px_rgba(25,173,125,0.9)]" />
          </motion.div>`;

// We need to position it relative to the screen overlay, not the whole image, 
// or position it correctly on the whole image.
// The screen is at: left: 37.75%, top: 12.25%, width: 22.94%, height: 66.84%
// Bottom right of the screen would be around: left: 37.75 + 22.94 = 60.69%, top: 12.25 + 66.84 = 79.09%
// Let's put it slightly inside the bottom right corner of the screen.

const newIndicator = `          {/* Tap Indicator */}
          <motion.div
            className="absolute z-40 rounded-full bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
            style={{
              left: "56%",
              top: "75%",
              width: "60px",
              height: "60px",
              marginLeft: "-30px",
              marginTop: "-30px",
              opacity: tapOpacity,
              scale: tapScale,
            }}
          >
            <div className="w-6 h-6 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
          </motion.div>`;

if (content.includes(oldIndicator)) {
  content = content.replace(oldIndicator, newIndicator);
  console.log("Updated indicator styling and position");
} else {
  console.log("Could not find indicator to replace");
}

fs.writeFileSync(path, content);
