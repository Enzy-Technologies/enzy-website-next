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

const startMarker = `function HeroSectionDefault() {`;
const endMarker = `  return (
    <section className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-24">`;

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  const toReplace = content.substring(startIdx, endIdx);
  content = content.replace(toReplace, newHeroStart + '\n\n');
  console.log("Replaced HeroSectionDefault state and hooks again");
}

fs.writeFileSync(path, content);
console.log('Successfully cleaned up HeroSection.tsx');
