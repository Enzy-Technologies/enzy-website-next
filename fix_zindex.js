import fs from 'fs';

const path = './src/app/playground/playground.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldImg1 = `          <motion.img 
            src={BASE_IMAGES[0]} 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: baseImg1Op }}
          />`;

const newImg1 = `          <motion.img 
            src={BASE_IMAGES[0]} 
            alt="Hand holding phone" 
            className="absolute inset-0 w-full h-full object-cover z-10"
            style={{ opacity: baseImg1Op }}
          />`;

const oldImg2 = `          <motion.img 
            src={BASE_IMAGES[1]} 
            alt="Hand holding phone AI" 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: baseImg2Op }}
          />`;

const newImg2 = `          <motion.img 
            src={BASE_IMAGES[1]} 
            alt="Hand holding phone AI" 
            className="absolute inset-0 w-full h-full object-cover z-20"
            style={{ opacity: baseImg2Op }}
          />`;

if (content.includes(oldImg1)) {
  content = content.replace(oldImg1, newImg1);
  console.log("Added z-10 to img1");
}

if (content.includes(oldImg2)) {
  content = content.replace(oldImg2, newImg2);
  console.log("Added z-20 to img2");
}

fs.writeFileSync(path, content);
