import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldTiming = `  const tapOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
  const tapScale = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0.5, 1.5, 1.5, 0.5]);`;

const newTiming = `  // Tap animation: appears, pulses/expands, then fades out right before slide
  const tapOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const tapScale = useTransform(scrollYProgress, [0.4, 0.6], [0.5, 3]);`;

if (content.includes(oldTiming)) {
  content = content.replace(oldTiming, newTiming);
  console.log("Updated ripple animation");
} else {
  console.log("Could not find timing to replace");
}

fs.writeFileSync(path, content);
