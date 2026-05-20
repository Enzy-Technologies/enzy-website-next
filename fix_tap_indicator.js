import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldIndicator = `          {/* Tap Indicator */}
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
          />`;

const newIndicator = `          {/* Tap Indicator */}
          <motion.div
            className="absolute z-50 rounded-full bg-[#19ad7d] shadow-[0_0_20px_rgba(25,173,125,0.8)]"
            style={{
              left: "64%",
              top: "78%",
              width: "16px",
              height: "16px",
              marginLeft: "-8px",
              marginTop: "-8px",
              opacity: tapOpacity,
              scale: tapScale,
            }}
          />`;

if (content.includes(oldIndicator)) {
  content = content.replace(oldIndicator, newIndicator);
  console.log("Updated indicator to solid green circle");
} else {
  console.log("Could not find indicator to replace");
}

const oldTiming = `  const tapOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const tapScale = useTransform(scrollYProgress, [0.4, 0.6], [0.5, 4]);`;

const newTiming = `  const tapOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const tapScale = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0.5, 1.5, 1.5, 0.5]);`;

if (content.includes(oldTiming)) {
  content = content.replace(oldTiming, newTiming);
  console.log("Updated timing");
} else {
  console.log("Could not find timing to replace");
}

fs.writeFileSync(path, content);
