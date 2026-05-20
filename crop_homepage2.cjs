const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './homepage.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    // Let's find the first text
    let foundText = false;
    for (let y = 0; y < 2000; y++) {
      for (let x = 0; x < this.width; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx + 1];
        let b = this.data[idx + 2];
        if (r < 50 && g < 50 && b < 50) {
          console.log(`Found dark pixel at ${x}, ${y}`);
          foundText = true;
          break;
        }
      }
      if (foundText) break;
    }
  });
