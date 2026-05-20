import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Adjust the timing so the tap happens over a longer scroll period before the slide
const oldTiming = `  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens after a long pause once zoom finishes
  // Ripple effect: starts small and opaque, expands and fades out
  const tapOpacity = useTransform(scrollYProgress, [0.55, 0.58, 0.65], [0, 0.8, 0]);
  const tapScale = useTransform(scrollYProgress, [0.55, 0.65], [0.5, 3]);
  
  // Slide up transition for the second image using clip-path
  // 100% means fully clipped (hidden), 0% means fully visible
  // Starts exactly as the tap finishes and takes much longer
  const baseImg2Clip = useTransform(scrollYProgress, [0.65, 1.0], [100, 0]);`;

const newTiming = `  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens after a long pause once zoom finishes
  // Ripple effect: starts small and opaque, expands and fades out
  const tapOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.6], [0, 1, 0]);
  const tapScale = useTransform(scrollYProgress, [0.45, 0.6], [0.5, 3]);
  
  // Slide up transition for the second image using clip-path
  // 100% means fully clipped (hidden), 0% means fully visible
  // Starts exactly as the tap finishes and takes much longer
  const baseImg2Clip = useTransform(scrollYProgress, [0.6, 1.0], [100, 0]);`;

if (content.includes(oldTiming)) {
  content = content.replace(oldTiming, newTiming);
  console.log("Updated animation timing for ripple");
} else {
  console.log("Could not find timing to replace");
}

// 2. Adjust the position of the tap indicator to be relative to the SCREEN overlay
// The screen is at: left: 37.75%, top: 12.25%, width: 22.94%, height: 66.84%
// Bottom right of the screen would be around: left: 37.75 + 22.94 = 60.69%, top: 12.25 + 66.84 = 79.09%
// The sparkle icon is slightly inside that. Let's try 58% and 75%.
// Wait, the previous position was 56% and 75%. Let's try making it much larger and more opaque so it can't be missed.

const oldIndicator = `          {/* Tap Indicator */}
          <motion.div
            className="absolute z-40 rounded-full border-[3px] border-[#19ad7d] bg-[#19ad7d]/20"
            style={{
              left: "56%",
              top: "75%",
              width: "80px",
              height: "80px",
              marginLeft: "-40px",
              marginTop: "-40px",
              opacity: tapOpacity,
              scale: tapScale,
            }}
          />
          <motion.div
            className="absolute z-40 rounded-full bg-[#19ad7d]"
            style={{
              left: "56%",
              top: "75%",
              width: "20px",
              height: "20px",
              marginLeft: "-10px",
              marginTop: "-10px",
              opacity: tapOpacity,
            }}
          />`;

const newIndicator = `          {/* Tap Indicator */}
          <motion.div
            className="absolute z-50 rounded-full border-[4px] border-[#19ad7d] bg-[#19ad7d]/30"
            style={{
              left: "57.5%",
              top: "76%",
              width: "120px",
              height: "120px",
              marginLeft: "-60px",
              marginTop: "-60px",
              opacity: tapOpacity,
              scale: tapScale,
            }}
          />
          <motion.div
            className="absolute z-50 rounded-full bg-[#19ad7d] shadow-[0_0_20px_rgba(25,173,125,1)]"
            style={{
              left: "57.5%",
              top: "76%",
              width: "30px",
              height: "30px",
              marginLeft: "-15px",
              marginTop: "-15px",
              opacity: tapOpacity,
            }}
          />`;

if (content.includes(oldIndicator)) {
  content = content.replace(oldIndicator, newIndicator);
  console.log("Updated indicator styling to be much larger and repositioned");
} else {
  console.log("Could not find indicator to replace");
}

fs.writeFileSync(path, content);
