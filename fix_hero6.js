import fs from 'fs';

const path = './src/app/components/HeroSection.tsx';
let content = fs.readFileSync(path, 'utf8');

// I'm going to just write a completely clean version of HeroSectionDefault and replace the whole thing.

const startMarker = `function HeroSectionDefault() {`;
const endMarker = `    </section>
  );
}`;

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
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section className="relative w-full pt-20 md:pt-24 lg:pt-32 pb-16 md:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div
          className={\`absolute inset-0 \${
            isLightMode
              ? "bg-[radial-gradient(120%_90%_at_50%_-28%,rgba(25,173,125,0.14),transparent_52%),linear-gradient(180deg,var(--color-surface-light)_0%,#ffffff_58%)]"
              : "bg-[radial-gradient(95%_72%_at_88%_-8%,rgba(25,173,125,0.17),transparent_56%),radial-gradient(72%_58%_at_4%_58%,rgba(25,173,125,0.09),transparent_62%),linear-gradient(180deg,#0b0f14_0%,#060809_100%)]"
          }\`}
        />
        <div
          className="absolute inset-x-0 top-0 h-[min(460px,50vh)] opacity-[0.42] [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(25,173,125,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(25,173,125,0.065) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
        <div className="lg:col-span-12 flex flex-col gap-7 text-center items-center max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors bg-white/50 border-black/5 hover:bg-white/80 dark:bg-white/[0.03] dark:border-white/[0.08] dark:hover:bg-white/[0.06]">
            <span className="flex h-2 w-2 rounded-full bg-[#19ad7d]" />
            <span className="font-inter text-xs font-medium tracking-wide text-black/70 dark:text-white/70">
              The Agentic Engine for High Performance Sales Teams
            </span>
          </div>

          <h1
            className={\`font-inter text-[42px] leading-[1.05] tracking-[-0.03em] md:text-[56px] lg:text-[72px] font-medium \${
              isLightMode ? "text-black" : "text-white"
            }\`}
          >
            Turn behavior into <br className="hidden md:block" />
            <span className="text-[#19ad7d]">revenue.</span>
          </h1>

          <p
            className={\`font-inter text-[17px] md:text-[18px] leading-[1.55] max-w-[540px] mx-auto \${
              isLightMode ? "text-black/70" : "text-white/65"
            }\`}
          >
            An agentic performance system that tightens execution between visits — coaching,
            competitions, and incentives, all powered by your existing CRM data.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 pb-4 w-full">
            <CTAButton href="/book-demo" variant="primary" size="lg" className="w-full sm:w-auto">
              Book a Demo
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}`;
  content = content.replace(toReplace, newContent);
  console.log('Replaced HeroSectionDefault correctly.');
}

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
