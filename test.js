const totalSteps = 3;
const totalUnits = totalSteps * 2 - 1;
const stepSize = 1 / totalUnits;

for (let index = 0; index < totalSteps; index++) {
  const startProgress = index > 0 ? Number(((index * 2 - 1) * stepSize).toFixed(4)) : 0;
  const endProgress = index > 0 ? Number(((index * 2) * stepSize).toFixed(4)) : 0;

  const yPoints = [0];
  const yValues = [index > 0 ? "100%" : "0%"];
  const scalePoints = [0];
  const scaleValues = [1];
  const overlayPoints = [0];
  const overlayValues = [0];
  
  if (index > 0) {
    yPoints.push(startProgress, endProgress);
    yValues.push("100%", "0%");
    scalePoints.push(startProgress, endProgress);
    scaleValues.push(1, 1);
    overlayPoints.push(startProgress, endProgress);
    overlayValues.push(0, 0);
  }
  
  for (let i = index + 1; i < totalSteps; i++) {
    const i_start = Number(((i * 2 - 1) * stepSize).toFixed(4));
    const i_end = Number(((i * 2) * stepSize).toFixed(4));
    
    const delayStart = Number((i_start + (i_end - i_start) * 0.6).toFixed(4));
    
    if (yPoints[yPoints.length - 1] !== delayStart) {
      yPoints.push(delayStart);
      yValues.push(`-${(i - index - 1) * 2.5}vh`);
      
      scalePoints.push(delayStart);
      scaleValues.push(1 - (i - index - 1) * 0.05);
      
      overlayPoints.push(delayStart);
      overlayValues.push((i - index - 1) * 0.3);
    }
    
    yPoints.push(i_end);
    yValues.push(`-${(i - index) * 2.5}vh`);
    
    scalePoints.push(i_end);
    scaleValues.push(1 - (i - index) * 0.05);
    
    overlayPoints.push(i_end);
    overlayValues.push((i - index) * 0.3);
  }

  if (yPoints[yPoints.length - 1] < 1) {
    yPoints.push(1);
    yValues.push(yValues[yValues.length - 1]);
    scalePoints.push(1);
    scaleValues.push(scaleValues[scaleValues.length - 1]);
    overlayPoints.push(1);
    overlayValues.push(overlayValues[overlayValues.length - 1]);
  }

  console.log(`Card ${index} overlayPoints:`, overlayPoints);
  console.log(`Card ${index} overlayValues:`, overlayValues);
}
