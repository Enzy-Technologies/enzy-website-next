const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './old_hand_phone.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    const cx = Math.floor(this.width * 0.4922);
    const cy = Math.floor(this.height * 0.4567);
    
    let idx = (this.width * cy + cx) << 2;
    let r = this.data[idx];
    let g = this.data[idx + 1];
    let b = this.data[idx + 2];
    let a = this.data[idx + 3];
    
    console.log(`Center pixel color: rgba(${r}, ${g}, ${b}, ${a})`);
  });
