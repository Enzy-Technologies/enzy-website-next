import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/const phoneCenterX_image = cw \* 0\.5776;/, 'const phoneCenterX_image = cw * 0.4922;');
content = content.replace(/const phoneCenterY_image = ch \* 0\.5336;/, 'const phoneCenterY_image = ch * 0.4567;');
content = content.replace(/const phoneH_image = ch \* 0\.8222;/, 'const phoneH_image = ch * 0.6684;');
content = content.replace(/\(cw \* 0\.4657\)/g, '(cw * 0.2294)');

fs.writeFileSync(path, content);
console.log("Reverted calibration variables");
