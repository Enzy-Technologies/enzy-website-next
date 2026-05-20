const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './hand_phone.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    let transparentCount = 0;
    for (let i = 3; i < this.data.length; i += 4) {
      if (this.data[i] < 255) transparentCount++;
    }
    console.log(`Transparent pixels: ${transparentCount}`);
  });
