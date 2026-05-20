const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './homepage.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    // Check if there is a black bezel near the edges
    let blackPixels = 0;
    for (let y = 500; y < 1000; y++) {
      for (let x = 0; x < 200; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx + 1];
        let b = this.data[idx + 2];
        if (r < 20 && g < 20 && b < 20) {
          blackPixels++;
        }
      }
    }
    console.log(`Black pixels near left edge: ${blackPixels}`);
  });
