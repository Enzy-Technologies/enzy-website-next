const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './homepage.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    // Check for skin color (roughly r > 150, g < 150, b < 150)
    let skinPixels = 0;
    for (let y = 1000; y < 2000; y++) {
      for (let x = 0; x < 500; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx + 1];
        let b = this.data[idx + 2];
        if (r > 150 && g > 100 && g < 180 && b < 150) {
          skinPixels++;
        }
      }
    }
    console.log(`Skin pixels near left edge: ${skinPixels}`);
  });
