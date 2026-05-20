const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './homepage.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    console.log(`Homepage Size: ${this.width}x${this.height}`);
    
    // Print the first few non-transparent pixels to see if it's white
    let r = this.data[0];
    let g = this.data[1];
    let b = this.data[2];
    console.log(`Top left pixel: ${r}, ${g}, ${b}`);
  });
