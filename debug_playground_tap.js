import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Adjust the tap indicator size and timing
const oldTiming = `  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens after a long pause once zoom finishes
  // Ripple effect: starts small and opaque, expands and fades out
  const tapOpacity = useTransform(scrollYProgress, [0.45, 0.5, 0.6], [0, 1, 0]);
  const tapScale = useTransform(scrollYProgress, [0.45, 0.6], [0.5, 3]);`;

const newTiming = `  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens after a long pause once zoom finishes
  // Ripple effect: starts small and opaque, expands and fades out
  const tapOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const tapScale = useTransform(scrollYProgress, [0.4, 0.6], [0.5, 4]);`;

if (content.includes(oldTiming)) {
  content = content.replace(oldTiming, newTiming);
  console.log("Updated timing");
}

const oldIndicator = `          {/* Tap Indicator */}
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

// The container is scaled by ~5x when zoomed in.
// So 10px becomes 50px on screen.
const newIndicator = `          {/* Tap Indicator */}
          <motion.div
            className="absolute z-50 rounded-full border-[1px] border-[#19ad7d] bg-[#19ad7d]/40"
            style={{
              left: "56.5%",
              top: "75.5%",
              width: "20px",
              height: "20px",
              marginLeft: "-10px",
              marginTop: "-10px",
              opacity: tapOpacity,
              scale: tapScale,
            }}
          />
          <motion.div
            className="absolute z-50 rounded-full bg-[#19ad7d]"
            style={{
              left: "56.5%",
              top: "75.5%",
              width: "6px",
              height: "6px",
              marginLeft: "-3px",
              marginTop: "-3px",
              opacity: tapOpacity,
            }}
          />
          
          {/* Debug Dot - always visible to check position */}
          {/* <div className="absolute z-50 w-2 h-2 bg-red-500 rounded-full" style={{ left: "56.5%", top: "75.5%", marginLeft: "-4px", marginTop: "-4px" }} /> */}`;

if (content.includes(oldIndicator)) {
  content = content.replace(oldIndicator, newIndicator);
  console.log("Updated indicator size");
}

fs.writeFileSync(path, content);
