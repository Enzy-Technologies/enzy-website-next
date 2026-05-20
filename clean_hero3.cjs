const fs = require('fs');
const path = './src/app/components/HeroSection.tsx';

let content = fs.readFileSync(path, 'utf8');

const oldHeroStart = `function HeroSectionDefault() {
  const { isLightMode } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeQuestionId, setActiveQuestionId] = useState(QUESTIONS[0].id);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [pulseChipId, setPulseChipId] = useState<string | null>(null);
  const typingTimerRef = useRef<number | null>(null);
  const rotateTimerRef = useRef<number | null>(null);
  const pulseTimerRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const activeQuestion =
    QUESTIONS.find((q) => q.id === activeQuestionId) ?? QUESTIONS[0];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPrefersReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (typingTimerRef.current !== null) {
      window.clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    if (prefersReducedMotion) {
      setTypedAnswer(activeQuestion.answer);
      setIsTyping(false);
      return;
    }

    setTypedAnswer("");
    setIsTyping(true);
    let i = 0;

    typingTimerRef.current = window.setInterval(() => {
      i += 1;
      setTypedAnswer(activeQuestion.answer.slice(0, i));
      if (i >= activeQuestion.answer.length) {
        if (typingTimerRef.current !== null) {
          window.clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
        }
        setIsTyping(false);
      }
    }, TYPING_SPEED_MS);

    return () => {
      if (typingTimerRef.current !== null) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [activeQuestionId, activeQuestion.answer, prefersReducedMotion]);

  useEffect(() => {
    if (hasUserInteracted || prefersReducedMotion) return;

    rotateTimerRef.current = window.setInterval(() => {
      const currentIndex = QUESTIONS.findIndex((q) => q.id === activeQuestionId);
      const nextIndex = (currentIndex + 1) % QUESTIONS.length;
      const nextQuestion = QUESTIONS[nextIndex];
      
      setPulseChipId(nextQuestion.id);
      
      pulseTimerRef.current = window.setTimeout(() => {
        setActiveQuestionId(nextQuestion.id);
        setPulseChipId(null);
      }, 600);
      
    }, ROTATION_INTERVAL_MS);

    return () => {
      if (rotateTimerRef.current !== null) window.clearInterval(rotateTimerRef.current);
      if (pulseTimerRef.current !== null) window.clearTimeout(pulseTimerRef.current);
    };
  }, [hasUserInteracted, activeQuestionId, prefersReducedMotion]);

  const onPickQuestion = (id: string) => {
    setHasUserInteracted(true);
    setActiveQuestionId(id);
  };`;

const newHeroStart = `function HeroSectionDefault() {
  const { isLightMode } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);`;

// Use a more robust replacement strategy for the state and hooks
const startMarker = `function HeroSectionDefault() {`;
const endMarker = `  return (
    <section className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-24">`;

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  const toReplace = content.substring(startIdx, endIdx);
  content = content.replace(toReplace, newHeroStart + '\n\n');
  console.log("Replaced HeroSectionDefault state and hooks");
}

// Remove PlaygroundSurface call
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

// Remove unused constants
const constantsToRemove = `const TYPING_SPEED_MS = 25;
const ROTATION_INTERVAL_MS = 5000;`;
if (content.includes(constantsToRemove)) {
  content = content.replace(constantsToRemove, '');
  console.log("Removed unused constants");
}

fs.writeFileSync(path, content);
console.log('Successfully cleaned up HeroSection.tsx');
