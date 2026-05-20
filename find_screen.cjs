const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './hand_phone.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    let minX = this.width, maxX = 0;
    let minY = this.height, maxY = 0;
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let idx = (this.width * y + x) << 2;
        let a = this.data[idx + 3];
        
        if (a < 250) { // Transparent pixels
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    console.log(`Image Size: ${this.width}x${this.height}`);
    console.log(`Screen bounds (transparent area):`);
    console.log(`X: ${minX} to ${maxX} (Center: ${(minX + maxX)/2}, Width: ${maxX - minX})`);
    console.log(`Y: ${minY} to ${maxY} (Center: ${(minY + maxY)/2}, Height: ${maxY - minY})`);
    
    console.log(`As percentages:`);
    console.log(`X: ${(minX / this.width * 100).toFixed(2)}% to ${(maxX / this.width * 100).toFixed(2)}%`);
    console.log(`Y: ${(minY / this.height * 100).toFixed(2)}% to ${(maxY / this.height * 100).toFixed(2)}%`);
    
    const centerX = (minX + maxX) / 2 / this.width * 100;
    const centerY = (minY + maxY) / 2 / this.height * 100;
    console.log(`Center: ${centerX.toFixed(2)}%, ${centerY.toFixed(2)}%`);
    
    const bottomRightX = maxX / this.width * 100;
    const bottomRightY = maxY / this.height * 100;
    console.log(`Bottom Right: ${bottomRightX.toFixed(2)}%, ${bottomRightY.toFixed(2)}%`);
  });
