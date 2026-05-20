import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove QUESTIONS array and Question type
const typeStart = `type Question = {`;
const questionsEnd = `  },
];`;

const tStart = content.indexOf(typeStart);
const qEnd = content.indexOf(questionsEnd) + questionsEnd.length;

if (tStart !== -1 && qEnd !== -1) {
  content = content.substring(0, tStart) + content.substring(qEnd);
  console.log("Removed QUESTIONS");
}

// 2. Remove PlaygroundSurface component
const playgroundSurfaceStart = `function PlaygroundSurface({`;
const playgroundSurfaceEnd = `  );
}`;

const psStart = content.indexOf(playgroundSurfaceStart);
if (psStart !== -1) {
  const psEnd = content.lastIndexOf(playgroundSurfaceEnd) + playgroundSurfaceEnd.length;
  content = content.substring(0, psStart) + content.substring(psEnd);
  console.log("Removed PlaygroundSurface component");
}

// 3. Remove "Try the playground" button from HeroSectionDefault
const btnRegex = /<CTAButton\s*variant="secondary"\s*href="#playground"[\s\S]*?<\/CTAButton>/;
if (btnRegex.test(content)) {
  content = content.replace(btnRegex, '');
  console.log("Removed 'Try the playground' button");
}

// 4. Remove PlaygroundSurface usage from HeroSectionDefault
const psUsageRegex = /<div className="lg:col-span-5 w-full flex justify-center lg:justify-end" id="playground">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
const psUsageMatch = content.match(psUsageRegex);
if (psUsageMatch) {
  // We need to keep the closing tags for the grid and section
  content = content.replace(psUsageRegex, '</div>\n    </section>');
  console.log("Removed PlaygroundSurface usage");
}

// 5. Center the content in HeroSectionDefault
const colSpanRegex = /<div className="lg:col-span-7 flex flex-col gap-7 text-center items-center lg:text-left lg:items-start max-w-4xl lg:max-w-none mx-auto lg:mx-0 w-full">/;
if (colSpanRegex.test(content)) {
  content = content.replace(colSpanRegex, '<div className="lg:col-span-12 flex flex-col gap-7 text-center items-center max-w-4xl mx-auto w-full">');
  console.log("Centered content");
}

// 6. Center the paragraph in HeroSectionDefault
const pRegex = /className=\{\`font-inter text-\[17px\] md:text-\[18px\] leading-\[1.55\] max-w-\[540px\] mx-auto lg:mx-0 \$\{/g;
if (pRegex.test(content)) {
  content = content.replace(pRegex, 'className={`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[540px] mx-auto ${');
  console.log("Centered paragraph");
}

// 7. Center the buttons container in HeroSectionDefault
const btnsRegex = /<div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-6 pb-4 w-full">/g;
if (btnsRegex.test(content)) {
  content = content.replace(btnsRegex, '<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">');
  console.log("Centered buttons container");
}

// 8. Make the primary button impactful
const primaryBtnRegex = /<CTAButton\s*href="\/book-demo"\s*variant="primary"\s*className="w-full sm:w-auto">/g;
if (primaryBtnRegex.test(content)) {
  content = content.replace(primaryBtnRegex, '<CTAButton href="/book-demo" variant="primary" className="w-full sm:w-auto font-inter text-[13px] sm:text-[14px] md:text-[15px] h-[48px] sm:h-[52px] md:h-[56px] px-8 sm:px-10 md:px-12 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] shadow-[0_8px_24px_rgba(25,173,125,0.25)] hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)] transition-all duration-300">');
  console.log("Made primary button impactful");
}

fs.writeFileSync(path, content);
