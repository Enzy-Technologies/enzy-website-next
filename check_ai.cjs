const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './hand_phone_ai.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    console.log(`AI Image Size: ${this.width}x${this.height}`);
  });
