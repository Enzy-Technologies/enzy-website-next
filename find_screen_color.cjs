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
        let r = this.data[idx];
        let g = this.data[idx + 1];
        let b = this.data[idx + 2];
        
        // Check if it's close to 250, 249, 246
        if (Math.abs(r - 250) < 5 && Math.abs(g - 249) < 5 && Math.abs(b - 246) < 5) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    console.log(`Screen bounds (off-white area):`);
    console.log(`X: ${minX} to ${maxX} (Center: ${(minX + maxX)/2}, Width: ${maxX - minX})`);
    console.log(`Y: ${minY} to ${maxY} (Center: ${(minY + maxY)/2}, Height: ${maxY - minY})`);
    
    console.log(`As percentages:`);
    console.log(`X: ${(minX / this.width * 100).toFixed(2)}% to ${(maxX / this.width * 100).toFixed(2)}%`);
    console.log(`Y: ${(minY / this.height * 100).toFixed(2)}% to ${(maxY / this.height * 100).toFixed(2)}%`);
  });
