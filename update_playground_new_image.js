import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update image URL
const oldUrl = 'https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20Smartphone%20Blank%20Screen%20Apr%2023%202026.png';
const newUrl = 'https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20iPhone.png';
content = content.replace(oldUrl, newUrl);

// 2. Update Calibration Variables
content = content.replace(/const SCREEN_LEFT = ".*?";/, 'const SCREEN_LEFT = "37.75%";');
content = content.replace(/const SCREEN_TOP = ".*?";/, 'const SCREEN_TOP = "12.25%";');
content = content.replace(/const SCREEN_WIDTH = ".*?";/, 'const SCREEN_WIDTH = "22.94%";');
content = content.replace(/const SCREEN_HEIGHT = ".*?";/, 'const SCREEN_HEIGHT = "66.84%";');
content = content.replace(/const SCREEN_RADIUS = ".*?";/, 'const SCREEN_RADIUS = "14%";'); // iPhones have more rounded corners
content = content.replace(/const SCREEN_ROTATE = ".*?";/, 'const SCREEN_ROTATE = "-0.35deg";');

// 3. Update originX and originY
// originX = SCREEN_LEFT + SCREEN_WIDTH / 2 = 37.75 + 22.94 / 2 = 49.22%
// originY = SCREEN_TOP + SCREEN_HEIGHT / 2 = 12.25 + 66.84 / 2 = 45.67%
content = content.replace(/const originX = .*?;/, 'const originX = 0.4922;');
content = content.replace(/const originY = .*?;/, 'const originY = 0.4567;');

// 4. Update imageAspect
content = content.replace(/const imageAspect = 1024 \/ 683;/, 'const imageAspect = 8000 / 5772;');

// 5. Update phoneCenterX_image and phoneCenterY_image and phoneH_image
content = content.replace(/const phoneCenterX_image = cw \* 0\.2856;/, 'const phoneCenterX_image = cw * 0.4922;');
content = content.replace(/const phoneCenterY_image = ch \* 0\.4509;/, 'const phoneCenterY_image = ch * 0.4567;');
content = content.replace(/const phoneH_image = ch \* 0\.4538;/, 'const phoneH_image = ch * 0.6684;');

// 6. Update minCwLeft and minCwRight
content = content.replace(/const minCwLeft = targetPhoneX \/ 0\.2856;/, 'const minCwLeft = targetPhoneX / 0.4922;');
content = content.replace(/const minCwRight = \(vw - targetPhoneX\) \/ 0\.7144;/, 'const minCwRight = (vw - targetPhoneX) / 0.5078;');

// 7. Update minChTop and minChBottom
content = content.replace(/const minChTop = targetPhoneY \/ 0\.4509;/, 'const minChTop = targetPhoneY / 0.4567;');
content = content.replace(/const minChBottom = \(vh - targetPhoneY\) \/ 0\.5491;/, 'const minChBottom = (vh - targetPhoneY) / 0.5433;');

// 8. Update endScale width check
content = content.replace(/\(cw \* 0\.1474\)/, '(cw * 0.2294)');

fs.writeFileSync(path, content);
console.log("Updated playground for new image");
