import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldIndicator = `          {/* Tap Indicator */}
          <motion.div
            className="absolute z-50 rounded-full bg-[#19ad7d] shadow-[0_0_20px_rgba(25,173,125,0.8)]"
            style={{
              left: "56.5%",
              top: "75.5%",
              width: "16px",
              height: "16px",
              marginLeft: "-8px",
              marginTop: "-8px",
              opacity: tapOpacity,
              scale: tapScale,
            }}
          />
          
          {/* Debug Indicator - Always Visible */}
          <div
            className="absolute z-[100] bg-red-500"
            style={{
              left: "56.5%",
              top: "75.5%",
              width: "20px",
              height: "20px",
              marginLeft: "-10px",
              marginTop: "-10px",
            }}
          />`;

const newIndicator = `          {/* Tap Indicator - CSS Animated */}
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

if (content.includes(oldIndicator)) {
  content = content.replace(oldIndicator, newIndicator);
  console.log("Updated indicator to CSS animation");
} else {
  console.log("Could not find indicator to replace");
}

fs.writeFileSync(path, content);
