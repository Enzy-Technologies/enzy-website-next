import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// Remove background
const bgRegex = /<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>[\s\S]*?<\/div>\s*<\/div>/;
content = content.replace(bgRegex, '');

// Update buttons
const btnRegex = /<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">[\s\S]*?<\/div>/;
const newButtons = `<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">
            <CTAButton
              href="/book-demo"
              variant="primary"
              className="w-full sm:w-auto font-inter text-[13px] sm:text-[14px] md:text-[15px] h-[48px] sm:h-[52px] md:h-[56px] px-8 sm:px-10 md:px-12 rounded-[16px] sm:rounded-[18px] md:rounded-[20px] shadow-[0_8px_24px_rgba(25,173,125,0.25)] hover:shadow-[0_12px_32px_rgba(25,173,125,0.35)] transition-all duration-300"
            >
              Book a Demo
            </CTAButton>
          </div>`;
content = content.replace(btnRegex, newButtons);

fs.writeFileSync(path, content);
console.log("Updated background and buttons");
