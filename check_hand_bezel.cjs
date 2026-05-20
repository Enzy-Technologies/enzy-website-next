const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './hand_phone.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    // Let's find the black bezel
    let minX = this.width, maxX = 0;
    for (let y = 2000; y < 3000; y++) {
      for (let x = 0; x < this.width; x++) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx + 1];
        let b = this.data[idx + 2];
        if (r < 30 && g < 30 && b < 30) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }
    console.log(`Black pixels X range: ${minX} to ${maxX}`);
    console.log(`As percentages: ${(minX / this.width * 100).toFixed(2)}% to ${(maxX / this.width * 100).toFixed(2)}%`);
    console.log(`Width: ${((maxX - minX) / this.width * 100).toFixed(2)}%`);
  });
