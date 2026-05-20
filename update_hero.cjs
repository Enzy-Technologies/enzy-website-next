const fs = require('fs');
const path = './src/app/components/HeroSection.tsx';

let content = fs.readFileSync(path, 'utf8');

// Remove PlaygroundSurface from the hero section
const playgroundSurfaceCall = `        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end" id="playground">
          <PlaygroundSurface
            isLightMode={isLightMode}
            activeQuestion={activeQuestion}
            typedAnswer={typedAnswer}
            isTyping={isTyping}
            questions={QUESTIONS}
            onPickQuestion={onPickQuestion}
            pulseChipId={pulseChipId}
            backgroundY={backgroundY}
          />
        </div>`;

if (content.includes(playgroundSurfaceCall)) {
  content = content.replace(playgroundSurfaceCall, '');
  console.log('Removed PlaygroundSurface call.');
}

// Change the left column to be centered and full width
const leftColumnStart = `        <div className="lg:col-span-7 flex flex-col justify-center pt-10 md:pt-16 lg:pt-20">`;
const newLeftColumnStart = `        <div className="lg:col-span-12 flex flex-col items-center text-center justify-center pt-10 md:pt-16 lg:pt-20">`;

if (content.includes(leftColumnStart)) {
  content = content.replace(leftColumnStart, newLeftColumnStart);
  console.log('Centered hero text.');
}

fs.writeFileSync(path, content);
