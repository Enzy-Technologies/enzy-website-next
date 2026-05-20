const fs = require('fs');
const PNG = require('pngjs').PNG;

const imagePath = './hand_phone.png';

fs.createReadStream(imagePath)
  .pipe(new PNG())
  .on('parsed', function() {
    let points = [];
    
    for (let y = 0; y < this.height; y += 10) {
      for (let x = 0; x < this.width; x += 10) {
        let idx = (this.width * y + x) << 2;
        let r = this.data[idx];
        let g = this.data[idx + 1];
        let b = this.data[idx + 2];
        
        if (Math.abs(r - 250) < 5 && Math.abs(g - 249) < 5 && Math.abs(b - 246) < 5) {
          points.push({x, y});
        }
      }
    }
    
    let minX = points.reduce((min, p) => p.x < min.x ? p : min, points[0]);
    let maxX = points.reduce((max, p) => p.x > max.x ? p : max, points[0]);
    let minY = points.reduce((min, p) => p.y < min.y ? p : min, points[0]);
    let maxY = points.reduce((max, p) => p.y > max.y ? p : max, points[0]);
    
    console.log(`Min X point: ${minX.x}, ${minX.y}`);
    console.log(`Max X point: ${maxX.x}, ${maxX.y}`);
    console.log(`Min Y point: ${minY.x}, ${minY.y}`);
    console.log(`Max Y point: ${maxY.x}, ${maxY.y}`);
  });
