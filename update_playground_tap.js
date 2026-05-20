import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update IMAGES array or add BASE_IMAGES
const oldImages = `const IMAGES = [
  "https://placehold.co/1170x2532/19ad7d/ffffff?text=Screen+1",
  "https://placehold.co/1170x2532/111111/ffffff?text=Screen+2",
  "https://placehold.co/1170x2532/333333/ffffff?text=Screen+3",
  "https://placehold.co/1170x2532/555555/ffffff?text=Screen+4",
  "https://placehold.co/1170x2532/777777/ffffff?text=Screen+5",
];`;

const newImages = `const BASE_IMAGES = [
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png",
  "https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhoneAI.png"
];

const IMAGES = [
  "https://placehold.co/1170x2532/19ad7d/ffffff?text=Screen+1",
  "https://placehold.co/1170x2532/111111/ffffff?text=Screen+2",
  "https://placehold.co/1170x2532/333333/ffffff?text=Screen+3",
  "https://placehold.co/1170x2532/555555/ffffff?text=Screen+4",
  "https://placehold.co/1170x2532/777777/ffffff?text=Screen+5",
];`;

if (content.includes(oldImages)) {
  content = content.replace(oldImages, newImages);
}

// 2. Add tap animation transforms
const oldTransforms = `  // Image transitions: 0.28 to 1.0
  const op0 = useTransform(scrollYProgress, [0.28, 0.34, 0.42, 0.48], [0, 1, 1, 0]);`;

const newTransforms = `  // Tap animation on the bottom right of the screen (sparkle icon)
  const tapOpacity = useTransform(scrollYProgress, [0.22, 0.24, 0.26, 0.28], [0, 0.8, 0.8, 0]);
  const tapScale = useTransform(scrollYProgress, [0.22, 0.26], [1.5, 0.8]);
  
  // Base image crossfade (Image 1 to Image 2)
  const baseImg1Op = useTransform(scrollYProgress, [0.26, 0.3], [1, 0]);
  const baseImg2Op = useTransform(scrollYProgress, [0.26, 0.3], [0, 1]);

  // Image transitions: 0.28 to 1.0
  const op0 = useTransform(scrollYProgress, [0.28, 0.34, 0.42, 0.48], [0, 1, 1, 0]);`;

if (content.includes(oldTransforms)) {
  content = content.replace(oldTransforms, newTransforms);
}

// 3. Update the render block
const oldRender = `          {/* Base Image */}
          <img 
            src="https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png" 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Fade out the bottom of the arm */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{
            background: "linear-gradient(to bottom, transparent 80%, var(--color-surface-light) 98%)"
          }} />

          {/* Screen Overlay Container */}`;

const newRender = `          {/* Base Images */}
          <motion.img 
            src={BASE_IMAGES[0]} 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: baseImg1Op }}
          />
          <motion.img 
            src={BASE_IMAGES[1]} 
            alt="Hand holding phone AI" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: baseImg2Op }}
          />
          
          {/* Tap Indicator */}
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
          />
          
          {/* Fade out the bottom of the arm */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{
            background: "linear-gradient(to bottom, transparent 80%, var(--color-surface-light) 98%)"
          }} />

          {/* Screen Overlay Container (Hidden for now since we are switching full base images, but kept for future placeholders if needed) */}
          {/* `;

const oldRenderEnd = `            ))}
          </div>
        </motion.div>`;

const newRenderEnd = `            ))}
          </div>
          */}
        </motion.div>`;

if (content.includes(oldRender)) {
  content = content.replace(oldRender, newRender);
  content = content.replace(oldRenderEnd, newRenderEnd);
  console.log("Updated render block");
} else {
  console.log("Could not find render block");
}

fs.writeFileSync(path, content);
