import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// The issue was that the `return (` I was looking for was inside a useEffect, not the main render return.
// Let's do this very carefully by finding the exact start and end of the state/hooks block.

const startMarker = `function HeroSectionDefault() {
  const { isLightMode } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);`;

const endMarker = `  const onPickQuestion = (id: string) => {
    setHasUserInteracted(true);
    setActiveQuestionId(id);
  };`;

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker) + endMarker.length;

if (startIdx !== -1 && endIdx !== -1) {
  const toReplace = content.substring(startIdx, endIdx);
  const newContent = `function HeroSectionDefault() {
  const { isLightMode } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);`;
  
  content = content.replace(toReplace, newContent);
  console.log('Replaced state correctly.');
}

// Now remove the PlaygroundSurface call
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
const leftColumnStart = `        <div className="lg:col-span-7 flex flex-col gap-7 text-center items-center lg:text-left lg:items-start max-w-4xl lg:max-w-none mx-auto lg:mx-0 w-full">`;
const newLeftColumnStart = `        <div className="lg:col-span-12 flex flex-col gap-7 text-center items-center max-w-4xl mx-auto w-full">`;

if (content.includes(leftColumnStart)) {
  content = content.replace(leftColumnStart, newLeftColumnStart);
  console.log('Centered hero text.');
}

// Center the paragraph
const oldP = `          <p
            className={\`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[540px] mx-auto lg:mx-0 \${
              isLightMode ? "text-black/70" : "text-white/65"
            }\`}
          >`;
const newP = `          <p
            className={\`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[540px] mx-auto \${
              isLightMode ? "text-black/70" : "text-white/65"
            }\`}
          >`;

if (content.includes(oldP)) {
  content = content.replace(oldP, newP);
}

// Center buttons
const oldBtns = `          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-6 pb-4 w-full">`;
const newBtns = `          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">`;

if (content.includes(oldBtns)) {
  content = content.replace(oldBtns, newBtns);
}

// Update terminology
const oldTerm1 = `            Intelligent performance systems that tighten execution between visits — coaching,`;
const newTerm1 = `            An agentic performance system that tightens execution between visits — coaching,`;
content = content.replace(oldTerm1, newTerm1);

const oldTerm2 = `            We provide intelligent, real-time performance systems that improve
            execution, increase accountability, and help teams drive measurable
            sales growth.`;
const newTerm2 = `            We provide an agentic performance system that improves
            execution, increases accountability, and helps teams drive measurable
            sales growth.`;
content = content.replace(oldTerm2, newTerm2);

// Remove QUESTIONS array and types
const typesStart = `type Question = {`;
const questionsEnd = `  },
];`;

const tStart = content.indexOf(typesStart);
const qEnd = content.indexOf(questionsEnd) + questionsEnd.length;

if (tStart !== -1 && qEnd !== -1) {
  const toRemove = content.substring(tStart, qEnd);
  content = content.replace(toRemove, '');
  console.log('Removed Question types and QUESTIONS array');
}

// Remove PlaygroundSurface component
const playgroundSurfaceStart = `function PlaygroundSurface({`;
const playgroundSurfaceEnd = `  );
}`;

const startIndex = content.indexOf(playgroundSurfaceStart);
if (startIndex !== -1) {
  const remainingContent = content.substring(startIndex);
  const endIndex = remainingContent.lastIndexOf(playgroundSurfaceEnd) + playgroundSurfaceEnd.length;
  
  if (endIndex !== -1) {
    const toRemove = remainingContent.substring(0, endIndex);
    content = content.replace(toRemove, '');
    console.log('Removed PlaygroundSurface component');
  }
}

// Remove unused constants
const constantsToRemove = `const TYPING_SPEED_MS = 25;
const ROTATION_INTERVAL_MS = 5000;`;
if (content.includes(constantsToRemove)) {
  content = content.replace(constantsToRemove, '');
  console.log("Removed unused constants");
}

fs.writeFileSync(path, content);
