import { transform } from "framer-motion";

const totalSteps = 3;
const stepSize = 1 / totalSteps;
const index = 0;

const overlayPoints = [0];
const overlayValues = [0];

for (let i = index + 1; i < totalSteps; i++) {
  const i_start = (i - 1) * stepSize;
  const i_end = i * stepSize;
  const delayStart = i_start + (i_end - i_start) * 0.7; // Wait until next card is 70% up
  
  overlayPoints.push(delayStart, i_end);
  overlayValues.push((i - index - 1) * 0.3, (i - index) * 0.3);
}

console.log("Points:", overlayPoints);
console.log("Values:", overlayValues);

const t = transform(overlayPoints, overlayValues);
console.log("At 0:", t(0));
console.log("At 0.1:", t(0.1));
console.log("At 0.3:", t(0.3));
console.log("At 0.5:", t(0.5));
console.log("At 1.0:", t(1.0));
