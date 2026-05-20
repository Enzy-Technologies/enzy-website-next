const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './hand_phone.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    let topLeft = null;
    let topRight = null;
    
    // Find top edge
    for (let y = 700; y < 800; y++) {
      for (let x = 2700; x < 6500; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx + 1];
        let b = this.data[idx + 2];
        
        if (Math.abs(r - 250) < 5 && Math.abs(g - 249) < 5 && Math.abs(b - 246) < 5) {
          if (!topLeft) {
            topLeft = {x, y};
          }
          topRight = {x, y};
        }
      }
      if (topLeft) break;
    }
    
    console.log(`Top Left: ${topLeft.x}, ${topLeft.y}`);
    console.log(`Top Right: ${topRight.x}, ${topRight.y}`);
  });
