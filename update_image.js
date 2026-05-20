import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldUrl = 'https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/SVG%20Logos/Hand%20Holding%20Smartphone%20Blank%20Screen%20Apr%2023%202026.png';
const newUrl = 'https://39823762.fs1.hubspotusercontent-na2.net/hubfs/39823762/Enzy.co/Hand%20Holding%20Smartphone%20Blank%20Screen%20Apr%2023%202026.png';

content = content.replace(oldUrl, newUrl);
fs.writeFileSync(path, content);
console.log("Updated image URL");
