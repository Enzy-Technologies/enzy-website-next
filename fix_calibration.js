import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// Update phoneCenterX_image
content = content.replace(/const phoneCenterX_image = cw \* 0\.4922;/, 'const phoneCenterX_image = cw * 0.5776;');

// Update phoneCenterY_image
content = content.replace(/const phoneCenterY_image = ch \* 0\.4567;/, 'const phoneCenterY_image = ch * 0.5336;');

// Update phoneH_image
content = content.replace(/const phoneH_image = ch \* 0\.6684;/, 'const phoneH_image = ch * 0.8222;');

// Update endScale width check
content = content.replace(/\(cw \* 0\.2294\)/g, '(cw * 0.4657)');

// Update minCwLeft and minCwRight
content = content.replace(/const minCwLeft = targetPhoneX \/ 0\.4922;/, 'const minCwLeft = targetPhoneX / 0.5776;');
content = content.replace(/const minCwRight = \(vw - targetPhoneX\) \/ 0\.5078;/, 'const minCwRight = (vw - targetPhoneX) / 0.4224;');

// Update minChTop and minChBottom
content = content.replace(/const minChTop = targetPhoneY \/ 0\.4567;/, 'const minChTop = targetPhoneY / 0.5336;');
content = content.replace(/const minChBottom = \(vh - targetPhoneY\) \/ 0\.5433;/, 'const minChBottom = (vh - targetPhoneY) / 0.4664;');

fs.writeFileSync(path, content);
console.log("Updated calibration variables");
