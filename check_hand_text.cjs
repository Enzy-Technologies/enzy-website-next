const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './hand_phone.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    // Check if there are dark pixels in the middle of the screen
    let darkPixels = 0;
    for (let y = 1000; y < 2000; y++) {
      for (let x = 3000; x < 5000; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx + 1];
        let b = this.data[idx + 2];
        if (r < 100 && g < 100 && b < 100) {
          darkPixels++;
        }
      }
    }
    console.log(`Dark pixels in center of hand_phone.png: ${darkPixels}`);
  });
