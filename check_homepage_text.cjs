const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './homepage.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    // Let's check the left edge of the image (x=0 to x=100)
    // to see if there are dark pixels (text) near the edge.
    let darkPixelsNearEdge = 0;
    for (let y = 0; y < 2000; y++) {
      for (let x = 0; x < 50; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx + 1];
        let b = this.data[idx + 2];
        if (r < 100 && g < 100 && b < 100) {
          darkPixelsNearEdge++;
        }
      }
    }
    console.log(`Dark pixels near left edge (top 2000px): ${darkPixelsNearEdge}`);
  });
