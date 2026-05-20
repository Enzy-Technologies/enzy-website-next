import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldIndicator = `          {/* Tap Indicator */}
          <motion.div
            className="absolute z-30 rounded-full bg-black/20 backdrop-blur-sm border-2 border-white/40"
            style={{
              left: "57.5%",
              top: "76.5%",
              width: "40px",
              height: "40px",
              marginLeft: "-20px",
              marginTop: "-20px",
              opacity: tapOpacity,
              scale: tapScale,
            }}
          />`;

const newIndicator = `          {/* Tap Indicator */}
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

if (content.includes(oldIndicator)) {
  content = content.replace(oldIndicator, newIndicator);
  console.log("Updated hotspot indicator");
} else {
  console.log("Could not find indicator to replace");
}

fs.writeFileSync(path, content);
