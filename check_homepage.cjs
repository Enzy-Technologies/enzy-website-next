const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './homepage.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    console.log(`Homepage Size: ${this.width}x${this.height}`);
  });
