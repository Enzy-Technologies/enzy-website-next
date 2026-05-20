const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './public/hand-phone.png';

if (fs.existsSync(imagePath)) {
  fs.createReadStream(imagePath)
    .pipe(new PNG())
    .on('parsed', function() {
      console.log(`Public image size: ${this.width}x${this.height}`);
    });
} else {
  console.log("Image not found");
}
