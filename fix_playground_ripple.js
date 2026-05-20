import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update timing to make the ripple expand and fade
const oldTiming = `  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens after a long pause once zoom finishes
  const tapOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.65, 0.7], [0, 1, 1, 0]);
  const tapScale = useTransform(scrollYProgress, [0.55, 0.65], [2, 0.8]);`;

const newTiming = `  // Tap animation on the bottom right of the screen (sparkle icon)
  // Happens after a long pause once zoom finishes
  // Ripple effect: starts small and opaque, expands and fades out
  const tapOpacity = useTransform(scrollYProgress, [0.55, 0.58, 0.65], [0, 0.8, 0]);
  const tapScale = useTransform(scrollYProgress, [0.55, 0.65], [0.5, 3]);`;

if (content.includes(oldTiming)) {
  content = content.replace(oldTiming, newTiming);
  console.log("Updated animation timing for ripple");
} else {
  console.log("Could not find timing to replace");
}

// 2. Update the indicator to be a ripple
const oldIndicator = `          {/* Tap Indicator */}
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

// Let's make it a very obvious green ripple
const newIndicator = `          {/* Tap Indicator */}
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

if (content.includes(oldIndicator)) {
  content = content.replace(oldIndicator, newIndicator);
  console.log("Updated indicator styling to ripple");
} else {
  console.log("Could not find indicator to replace");
}

fs.writeFileSync(path, content);
