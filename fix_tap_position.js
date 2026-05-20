import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldIndicator = `          {/* Tap Indicator - CSS Animated */}
          <div
            className="absolute z-[100] rounded-full bg-[#19ad7d] shadow-[0_0_30px_rgba(25,173,125,1)] animate-ping"
            style={{
              left: "56.5%",
              top: "75.5%",
              width: "30px",
              height: "30px",
              marginLeft: "-15px",
              marginTop: "-15px",
            }}
          />
          <div
            className="absolute z-[100] rounded-full bg-[#19ad7d]"
            style={{
              left: "56.5%",
              top: "75.5%",
              width: "10px",
              height: "10px",
              marginLeft: "-5px",
              marginTop: "-5px",
            }}
          />`;

const newIndicator = `          {/* Tap Indicator */}
          <motion.div
            className="absolute z-[100] rounded-full border-[2px] border-[#19ad7d] bg-[#19ad7d]/40"
            style={{
              left: "75%",
              top: "88%",
              width: "20px",
              height: "20px",
              marginLeft: "-10px",
              marginTop: "-10px",
              opacity: tapOpacity,
              scale: tapScale,
            }}
          />
          <motion.div
            className="absolute z-[100] rounded-full bg-[#19ad7d] shadow-[0_0_10px_rgba(25,173,125,1)]"
            style={{
              left: "75%",
              top: "88%",
              width: "8px",
              height: "8px",
              marginLeft: "-4px",
              marginTop: "-4px",
              opacity: tapOpacity,
            }}
          />`;

if (content.includes(oldIndicator)) {
  content = content.replace(oldIndicator, newIndicator);
  console.log("Updated indicator position and restored Framer Motion animation");
} else {
  console.log("Could not find indicator to replace");
}

fs.writeFileSync(path, content);
