import { useContext } from "react";
import { motion } from "motion/react";
import { PhoneViewContext } from "../../interactive/PhoneViewContext";
import svgPaths from "./svg-u5t57exttt";

function AnimatedRingPath({
  d,
  delay,
  maskId,
}: {
  d: string;
  delay: number;
  maskId: string;
}) {
  const { inView } = useContext(PhoneViewContext);
  return (
    <motion.path
      d={d}
      mask={`url(#${maskId})`}
      stroke="var(--stroke-0, #117353)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={28}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: inView ? 1 : 0 }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
        delay: inView ? delay : 0,
      }}
    />
  );
}
import imgUnsplashGjua5IcM2U from "./462c1b07a048ddac595214b27d58a0b46f2c55fc.png";
import imgUnsplashGjua5IcM2U1 from "./f3aefb04f7d5d78aa77cd253e46299e137f3213c.png";
import imgImgi41UserId3861855A07D50158D64A74Ba61B403C222358BCropped1 from "./3b4c234c77fc00e63cd1096ace154800a5cbc722.png";
import imgImage from "./0707e6b2022462187b7b2dab43ed95bab6b24a66.png";
import imgImgi47UserId272647E9F04B3BDc6A4445Aa7CC434F5A74E61SurveyAnnouncementGraphic1 from "./3d027fb2959a0c47801289fdc17c68654c102d5c.png";
import imgImgi48UserId27264714238Fe07Cea4861B499Ba46B055Aa16SetSchedulingRulesEnzyAppAnnouncements1 from "./2b8008ad4e3beda362d653cc10c20460ceb85257.png";
import imgImgi49UserId11861322536163008A3A4E3BAec37C59B3Fce71AReorderIncentives1 from "./a43bfb4495535ea534961bd0687449ef8c523b7c.png";
// Removed missing Vector import

function Container() {
  return (
    <div className="w-[83px] h-[24px] shrink-0 relative flex items-center justify-center">
      {/* <Vector /> */}
    </div>
  );
}

function HamburgerMenu() {
  return (
    <div className="w-[24px] h-[24px] flex flex-col justify-center items-end gap-[4px] shrink-0 cursor-pointer">
      <div className="w-[20px] h-[2px] bg-[#262626] rounded-full" />
      <div className="w-[20px] h-[2px] bg-[#262626] rounded-full" />
      <div className="w-[20px] h-[2px] bg-[#262626] rounded-full" />
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-[345px]">
      <div className="flex-1 flex justify-start">
        <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[28px] not-italic relative shrink-0 text-[#262626] text-[22px] whitespace-nowrap">Home</p>
      </div>
      <div className="flex-1 flex justify-center">
        <Container />
      </div>
      <div className="flex-1 flex justify-end">
        <HamburgerMenu />
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 text-[#161513] w-full whitespace-nowrap">
      <p className="font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[11px] tracking-[0.5px] uppercase">Tues, Apr 27</p>
      <p className="font-ivyora font-medium leading-[36px] relative shrink-0 text-[28px]">Morning, David.</p>
    </div>
  );
}

function FillShadow() {
  return (
    <div className="absolute inset-0 rounded-[9999px] shadow-[0px_8px_20px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[rgba(255,255,255,0.7)] inset-0 rounded-[9999px]" />
        <div className="absolute bg-[#d6dee6] inset-0 mix-blend-color-burn rounded-[9999px]" />
        <div className="absolute bg-[#f7f9fc] inset-0 mix-blend-darken rounded-[9999px]" />
      </div>
    </div>
  );
}

function GlassEffect() {
  return <div className="absolute bg-[rgba(0,0,0,0)] border border-[#00926e] border-solid inset-0 rounded-[9999px]" data-name="Glass Effect" />;
}

function OcticonSparkleFill() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="octicon:sparkle-fill-24">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="octicon:sparkle-fill-24">
          <path d={svgPaths.p28977900} fill="url(#paint0_linear_1_1743)" id="Vector" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1743" x1="5.03242" x2="17.226" y1="6.77428" y2="18.3872">
            <stop stopColor="#02B387" />
            <stop offset="0.5" stopColor="#00D19C" />
            <stop offset="1" stopColor="#166E61" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function AiSearchBar() {
  return (
    <div className="content-stretch flex gap-[8px] h-[40px] items-center px-[16px] py-[8px] relative rounded-[9999px] shrink-0 w-[345px]" data-name="AI Search Bar">
      <div className="absolute inset-[0_1px_0_0] rounded-[9999px]" data-name="Liquid Glass - Regular - Small">
        <FillShadow />
        <GlassEffect />
      </div>
      <OcticonSparkleFill />
      <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Text">
        <div className="[word-break:break-word] flex flex-col font-['Inter',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#3fbb93] text-[14px] text-center whitespace-nowrap">
          <p className="leading-[20px]">How can I help you today?</p>
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="bg-[#d1efe5] content-stretch flex items-center p-[4px] relative rounded-[9999px] shrink-0">
      <div className="relative shrink-0 size-[12px]" data-name="HouseLine">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[9.37%_3.13%_12.5%_3.13%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 9.37512">
            <path d={svgPaths.p228db900} fill="var(--fill-0, #303030)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0">
      <Frame31 />
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#161513] text-[11px] text-center tracking-[0.5px] uppercase whitespace-nowrap">Knocks</p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[106px]">
      <p className="[word-break:break-word] font-ivyora font-medium leading-[28px] max-w-[160px] relative shrink-0 text-[#161513] text-[22px] text-center w-full">Push early.</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[16px] items-center left-[calc(50%-0.5px)] top-[calc(50%+18px)]">
      <Frame30 />
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-light leading-[36px] not-italic relative shrink-0 text-[#161513] text-[48px] text-center whitespace-nowrap">2</p>
      <Frame32 />
    </div>
  );
}

function Arch() {
  return (
    <div className="absolute contents left-[0.2px] top-0" data-name="arch">
      <div className="absolute h-[65px] left-[18.2px] top-[9px] w-[259px]">
        <div className="absolute inset-[-0.77%_-0.15%_-0.49%_-0.15%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 259.771 65.8182">
            <path d={svgPaths.p381bd390} id="Ellipse 26" stroke="var(--stroke-0, #E3E3E3)" />
          </svg>
        </div>
      </div>
      <div className="absolute h-[11px] left-[18.2px] top-[63px] w-[9.799px]">
        <div className="absolute inset-[-13.64%_-15.31%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.7991 14">
            <path d={svgPaths.p28ff0840} id="Ellipse 27" stroke="var(--stroke-0, #3FBB93)" strokeLinecap="round" strokeWidth="3" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute flex items-center justify-center left-[7.63px] size-[14.849px] top-[55px]">
        <div className="-rotate-45 flex-none">
          <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative text-[#a5a29c] text-[11px] text-center tracking-[0.5px] uppercase whitespace-nowrap">0</p>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute flex items-center justify-center left-[285.1px] size-[19.799px] top-[50px]">
        <div className="flex-none rotate-45">
          <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative text-[#a5a29c] text-[11px] text-center tracking-[0.5px] uppercase whitespace-nowrap">50</p>
        </div>
      </div>
      <div className="absolute left-[103.2px] size-[4px] top-0">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #D4D2CC)" id="Ellipse 30" r="2" />
        </svg>
      </div>
      <div className="absolute left-[187.2px] size-[4px] top-0">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #D4D2CC)" id="Ellipse 30" r="2" />
        </svg>
      </div>
      <div className="absolute left-[46.2px] size-[4px] top-[25px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #D4D2CC)" id="Ellipse 30" r="2" />
        </svg>
      </div>
      <div className="absolute left-[245.2px] size-[4px] top-[25px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
          <circle cx="2" cy="2" fill="var(--fill-0, #D4D2CC)" id="Ellipse 30" r="2" />
        </svg>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="h-[180px] relative shrink-0 w-[295px]">
      <Frame29 />
      <Arch />
    </div>
  );
}

function TodaysGoal() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[210px] items-center relative shrink-0" data-name="Today's Goal">
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#161513] text-[11px] text-center tracking-[0.5px] uppercase whitespace-nowrap">Today</p>
      <Frame33 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute left-0 size-[70px] top-0">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 70">
        <g id="Group 1000002004">
          <path d={svgPaths.p33078d80} fill="var(--fill-0, #D1EFE5)" id="Ellipse 22" />
          <g id="Ellipse 21">
            <mask fill="white" id="path-2-inside-1_2_3908">
              <path d={svgPaths.p38989e00} />
            </mask>
            <AnimatedRingPath d={svgPaths.p38989e00} maskId="path-2-inside-1_2_3908" delay={0.0} />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame27() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col items-center justify-center left-1/2 not-italic top-[calc(50%+3.5px)] whitespace-nowrap">
      <p className="font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[22px] mb-[-4px] relative shrink-0 text-[#161513] text-[18px]">55</p>
      <p className="font-['Inter',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#a5a29c] text-[8px]">/250</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="relative shrink-0 size-[70px]">
      <Group4 />
      <Frame27 />
    </div>
  );
}

function KnocksRing() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Knocks Ring">
      <Frame26 />
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#6d6b66] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">Knocks</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute left-[-0.29px] size-[70px] top-0">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 70">
        <g id="Group 1000002001">
          <path d={svgPaths.p33078d80} fill="var(--fill-0, #D1EFE5)" id="Ellipse 22" />
          <g id="Ellipse 21">
            <mask fill="white" id="path-2-inside-1_2_3934">
              <path d={svgPaths.p1099780} />
            </mask>
            <AnimatedRingPath d={svgPaths.p1099780} maskId="path-2-inside-1_2_3934" delay={0.12} />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame28() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col items-center justify-center left-[calc(50%-0.17px)] not-italic top-[calc(50%+4px)] whitespace-nowrap">
      <p className="font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[22px] mb-[-4px] relative shrink-0 text-[#161513] text-[18px]">7</p>
      <p className="font-['Inter',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#a5a29c] text-[8px]">/32</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative shrink-0 size-[70px]">
      <Group1 />
      <Frame28 />
    </div>
  );
}

function ContactsRing() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0" data-name="Contacts Ring">
      <Frame23 />
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#6d6b66] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">Contacts</p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute left-[0.29px] size-[70px] top-0">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 70">
        <g id="Group 1000002002">
          <path d={svgPaths.p33078d80} fill="var(--fill-0, #D1EFE5)" id="Ellipse 22" />
          <g id="Ellipse 21">
            <mask fill="white" id="path-2-inside-1_2_3915">
              <path d={svgPaths.pefdce00} />
            </mask>
            <AnimatedRingPath d={svgPaths.pefdce00} maskId="path-2-inside-1_2_3915" delay={0.24} />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col items-center justify-center left-[calc(50%-0.33px)] not-italic top-[calc(50%+4px)] whitespace-nowrap">
      <p className="font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[22px] mb-[-4px] relative shrink-0 text-[#161513] text-[18px]">3</p>
      <p className="font-['Inter',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#a5a29c] text-[8px]">/15</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="relative shrink-0 size-[70px]">
      <Group2 />
      <Frame34 />
    </div>
  );
}

function LeadsRing() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0" data-name="Leads Ring">
      <Frame24 />
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#6d6b66] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">Leads</p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute left-0 size-[70px] top-0">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 70 70">
        <g id="Group 1000002003">
          <path d={svgPaths.p33078d80} fill="var(--fill-0, #D1EFE5)" id="Ellipse 22" />
          <g id="Ellipse 21">
            <mask fill="white" id="path-2-inside-1_2_3883">
              <path d={svgPaths.pefdce00} />
            </mask>
            <AnimatedRingPath d={svgPaths.pefdce00} maskId="path-2-inside-1_2_3883" delay={0.36} />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col items-center justify-center left-[calc(50%+0.5px)] not-italic top-[calc(50%+4px)] whitespace-nowrap">
      <p className="font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[22px] mb-[-4px] relative shrink-0 text-[#161513] text-[18px]">1</p>
      <p className="font-['Inter',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#a5a29c] text-[8px]">/5</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="relative shrink-0 size-[70px]">
      <Group3 />
      <Frame35 />
    </div>
  );
}

function SalesRing() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center justify-center relative shrink-0" data-name="Sales Ring">
      <Frame25 />
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#6d6b66] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">Sales</p>
    </div>
  );
}

function Goals() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Goals">
      <KnocksRing />
      <ContactsRing />
      <LeadsRing />
      <SalesRing />
    </div>
  );
}

function WeeklyGoals() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-[345px]" data-name="Weekly Goals (4)">
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#161513] text-[11px] text-center tracking-[0.5px] uppercase whitespace-nowrap">This Week</p>
      <Goals />
    </div>
  );
}

function Frame78() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
      <TodaysGoal />
      <WeeklyGoals />
    </div>
  );
}

function OcticonSparkleFill1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="octicon:sparkle-fill-24">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_1664)" id="octicon:sparkle-fill-24">
          <path d={svgPaths.p30e67180} fill="url(#paint0_linear_1_1664)" id="Vector" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1664" x1="3.35492" x2="11.4839" y1="4.51616" y2="12.2581">
            <stop stopColor="#02B387" />
            <stop offset="0.5" stopColor="#00D19C" />
            <stop offset="1" stopColor="#166E61" />
          </linearGradient>
          <clipPath id="clip0_1_1664">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <OcticonSparkleFill1 />
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#262626] text-[17px] whitespace-nowrap">Insights</p>
    </div>
  );
}

function FillShadow1() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[16px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect1() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[16px]" data-name="Glass Effect" />;
}

function Frame43() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic relative">
      <p className="font-['Inter',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#b13028] text-[15px] w-full">Downward Trend</p>
      <p className="font-['Inter',sans-serif] font-normal leading-[0] relative shrink-0 text-[#6d6b66] text-[12px] w-full">
        <span className="leading-[16px]">{`Team sales `}</span>
        <span className="leading-[16px] text-[#b13028]">down 5%</span>
        <span className="leading-[16px]">{` this week. Launch an incentive to reverse the trend.`}</span>
      </p>
    </div>
  );
}

function ButtonContentArea() {
  return (
    <div className="bg-[#e3e3e3] relative rounded-[8570.571px] shrink-0 size-[24px]" data-name="Button - Content Area">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[10.286px] top-1/2" data-name="StarFour">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[6.28%_6.25%_6.28%_6.28%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.9973 8.99455">
            <path d={svgPaths.p37687b10} fill="var(--fill-0, #0DA071)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-end relative shrink-0 w-full">
      <Frame43 />
      <ButtonContentArea />
    </div>
  );
}

function Group() {
  return (
    <div className="h-[49.862px] relative shrink-0 w-full">
      <div className="absolute inset-[-1.27%_-0.16%_-0.96%_-0.16%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 297.962 50.9769">
          <g id="Group 3">
            <path d={svgPaths.p171b3680} fill="url(#paint0_linear_1_1711)" id="Vector 8" />
            <path d={svgPaths.p3fc7d130} id="Vector 9" stroke="var(--stroke-0, #B13028)" strokeLinecap="round" strokeWidth="0.961538" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_1711" x1="148.981" x2="148.981" y1="0.634411" y2="57.8186">
              <stop stopColor="#F04438" />
              <stop offset="1" stopColor="#FAF9F6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Frame73() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-[ui-monospace,'SF_Mono','Menlo',monospace] items-center justify-between leading-[14px] not-italic relative shrink-0 text-[#6d6b66] text-[11px] tracking-[0.5px] uppercase w-full whitespace-nowrap">
      <p className="relative shrink-0">M</p>
      <p className="relative shrink-0">t</p>
      <p className="relative shrink-0">w</p>
      <p className="relative shrink-0">th</p>
      <p className="relative shrink-0">f</p>
      <p className="relative shrink-0">sa</p>
      <p className="relative shrink-0">su</p>
    </div>
  );
}

function Frame74() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-0 top-[11px] w-[297px]">
      <Group />
      <Frame73 />
    </div>
  );
}

function ImageHolder() {
  return (
    <div className="h-[93px] overflow-clip relative rounded-[8px] shrink-0 w-[297px]" data-name="Image holder">
      <Frame74 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center p-[24px] relative size-full">
          <Frame50 />
          <ImageHolder />
        </div>
      </div>
    </div>
  );
}

function FillShadow2() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[16px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect2() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[16px]" data-name="Glass Effect" />;
}

function Frame44() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic relative">
      <p className="font-['Inter',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#161513] text-[15px] w-full">Coaching Moment</p>
      <p className="font-['Inter',sans-serif] font-normal leading-[0] relative shrink-0 text-[#6d6b66] text-[12px] w-full">
        <span className="leading-[16px]">{`Spencer's conversion `}</span>
        <span className="leading-[16px] text-[#b13028]">dropped 18%</span>
        <span className="leading-[16px]">. Send a pep message — it helps.</span>
      </p>
    </div>
  );
}

function ButtonContentArea1() {
  return (
    <div className="bg-[#e3e3e3] relative rounded-[8570.571px] shrink-0 size-[24px]" data-name="Button - Content Area">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[10.286px] top-1/2" data-name="StarFour">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[6.28%_6.25%_6.28%_6.28%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.9973 8.99455">
            <path d={svgPaths.p37687b10} fill="var(--fill-0, #0DA071)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-end relative shrink-0 w-full">
      <Frame44 />
      <ButtonContentArea1 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="bg-white overflow-clip relative rounded-[17269808px] shrink-0 size-[92px]">
      <div className="-translate-x-1/2 absolute h-[126.709px] left-1/2 top-[-5.85px] w-[92px]" data-name="unsplash:gjua-5icM2U">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[100.16%] left-[-6.29%] max-w-none top-0 w-[106.26%]" src={imgUnsplashGjua5IcM2U.src} />
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[100.42%] left-[-6.29%] max-w-none top-0 w-[106.26%]" src={imgUnsplashGjua5IcM2U1.src} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame49() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col items-center justify-center left-[calc(50%+0.5px)] top-[calc(50%+0.5px)]">
      <Frame16 />
    </div>
  );
}

function ImageHolder1() {
  return (
    <div className="h-[93px] overflow-clip relative rounded-[8px] shrink-0 w-[297px]" data-name="Image holder">
      <Frame49 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center p-[24px] relative size-full">
          <Frame51 />
          <ImageHolder1 />
        </div>
      </div>
    </div>
  );
}

function FillShadow3() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[16px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect3() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[16px]" data-name="Glass Effect" />;
}

function Frame45() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start min-w-px not-italic relative">
      <p className="font-['Inter',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#161513] text-[15px] w-full">Time to Celebrate</p>
      <p className="font-['Inter',sans-serif] font-normal leading-[0] relative shrink-0 text-[#6d6b66] text-[12px] w-full whitespace-pre-wrap">
        <span className="leading-[16px]">{`You just hit `}</span>
        <span className="leading-[16px] text-[#117353]">1,000 career knocks</span>
        <span className="leading-[16px]">
          {`. `}
          <br aria-hidden="true" />
          {`Congrats — that's a lot of doors.`}
        </span>
      </p>
    </div>
  );
}

function ButtonContentArea2() {
  return (
    <div className="bg-[#e3e3e3] relative rounded-[8570.571px] shrink-0 size-[24px]" data-name="Button - Content Area">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[10.286px] top-1/2" data-name="StarFour">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[6.28%_6.25%_6.28%_6.28%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.9973 8.99455">
            <path d={svgPaths.p37687b10} fill="var(--fill-0, #0DA071)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex gap-[24px] items-start justify-end relative shrink-0 w-full">
      <Frame45 />
      <ButtonContentArea2 />
    </div>
  );
}

function ImageHolder2() {
  return (
    <div className="h-[93px] overflow-clip relative rounded-[8px] shrink-0 w-[297px]" data-name="Image holder">
      <p className="[word-break:break-word] absolute font-['Inter',sans-serif] font-bold leading-[normal] left-[calc(50%-66.5px)] not-italic text-[#0da071] text-[48px] text-shadow-[0px_0px_35px_#3fbb93] top-[calc(50%-28.5px)] whitespace-nowrap">1,000</p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center p-[24px] relative size-full">
          <Frame53 />
          <ImageHolder2 />
        </div>
      </div>
    </div>
  );
}

function Frame76() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[345px]">
      <div className="bg-[#faf9f6] content-stretch flex flex-col items-center justify-center relative rounded-[16px] shrink-0 w-full" data-name="AI Insight Card">
        <FillShadow1 />
        <GlassEffect1 />
        <Frame47 />
      </div>
      <div className="bg-[#faf9f6] content-stretch flex flex-col items-center justify-center relative rounded-[16px] shrink-0 w-full" data-name="AI Insight Card">
        <FillShadow2 />
        <GlassEffect2 />
        <Frame48 />
      </div>
      <div className="bg-[#faf9f6] content-stretch flex flex-col items-center justify-center relative rounded-[16px] shrink-0 w-full" data-name="AI Insight Card">
        <FillShadow3 />
        <GlassEffect3 />
        <Frame52 />
      </div>
    </div>
  );
}

function AiInsights() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-full" data-name="AI Insights">
      <Frame4 />
      <Frame76 />
    </div>
  );
}

function Frame55() {
  return (
    <div className="absolute h-[81px] left-0 top-[379px] w-[345px]">
      <p className="[word-break:break-word] absolute font-['Inter',sans-serif] font-normal leading-[20px] left-[calc(50%-49.5px)] not-italic text-[#161513] text-[14px] top-[48.47px] whitespace-nowrap">View all events</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="bg-[#66c8a8] content-stretch flex items-center justify-center p-[4px] relative rounded-[9999px] shrink-0 size-[24px]">
      <div className="relative shrink-0 size-[12px]" data-name="User">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-6.25%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.75 6.75">
              <path d={svgPaths.p2944c400} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[62.5%_12.5%_15.63%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-14.29%_-4.17%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.75012 3.37506">
              <path d={svgPaths.p24299000} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame20 />
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#161513] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">9:00am</p>
    </div>
  );
}

function FillShadow4() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[8px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect4() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[8px]" data-name="Glass Effect" />;
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[12px]" data-name="HouseLine">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[84.38%_6.25%_15.63%_6.25%]" data-name="Vector">
          <div className="absolute inset-[-0.38px_-3.57%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 0.75">
              <path d="M0.375 0.375H10.875" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[59.38%_40.63%_15.63%_40.63%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3.75">
              <path d={svgPaths.p3045b190} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[45.58%_84.38%_15.63%_15.63%]" data-name="Vector">
          <div className="absolute inset-[-8.06%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 5.40516">
              <path d="M0.375 0.375V5.03016" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[45.58%_15.63%_15.63%_84.38%]" data-name="Vector">
          <div className="absolute inset-[-8.06%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 5.40516">
              <path d="M0.375 5.03016V0.375" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_9.38%_48.17%_9.38%]" data-name="Vector">
          <div className="absolute inset-[-7.94%_-3.85%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 5.47014">
              <path d={svgPaths.p300e6700} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#161513] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">1234 Street Lehi, UT 12345</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[209px]">
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#a5a29c] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">9:00am-11:00AM</p>
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-medium leading-[20px] min-w-full not-italic relative shrink-0 text-[#161513] text-[14px] w-[min-content]">Lead Appointment</p>
      <Frame38 />
    </div>
  );
}

function ButtonLiquidGlassText() {
  return (
    <div className="absolute content-stretch flex items-center justify-between p-[16px] right-0 rounded-[8px] top-0 w-[313px]" data-name="Button - Liquid Glass - Text">
      <div className="absolute inset-[-0.33px_-1px_0.33px_0]" data-name="Liquid Glass - Regular - Large">
        <FillShadow4 />
        <GlassEffect4 />
      </div>
      <Frame37 />
      <div className="relative shrink-0 size-[12px]" data-name="CaretRight">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[18.75%_31.25%_18.75%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-5%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 8.25">
              <path d={svgPaths.p1d7808a0} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame80() {
  return (
    <div className="h-[84px] relative shrink-0 w-full">
      <ButtonLiquidGlassText />
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame36 />
      <Frame80 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="bg-[#66c8a8] content-stretch flex items-center justify-center p-[4px] relative rounded-[9999px] shrink-0 size-[24px]">
      <div className="relative shrink-0 size-[12px]" data-name="CalendarCheck">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[15.63%]" data-name="Vector">
          <div className="absolute inset-[-4.55%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
              <path d={svgPaths.p162a000} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[9.38%_31.25%_78.13%_68.75%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 2.25">
              <path d="M0.375 0.375V1.875" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[9.38%_68.75%_78.13%_31.25%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 2.25">
              <path d="M0.375 0.375V1.875" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[34.38%_15.63%_65.63%_15.63%]" data-name="Vector">
          <div className="absolute inset-[-0.38px_-4.55%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 0.75">
              <path d="M0.375 0.375H8.625" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[31.25%] left-[35.94%] right-[35.94%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-16.67%_-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.125 3">
              <path d={svgPaths.p21ae6390} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame21 />
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#161513] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">10:00AM</p>
    </div>
  );
}

function FillShadow5() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[8px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect5() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[8px]" data-name="Glass Effect" />;
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[12px]" data-name="HouseLine">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[84.38%_6.25%_15.63%_6.25%]" data-name="Vector">
          <div className="absolute inset-[-0.38px_-3.57%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 0.75">
              <path d="M0.375 0.375H10.875" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[59.38%_40.63%_15.63%_40.63%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3.75">
              <path d={svgPaths.p3045b190} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[45.58%_84.38%_15.63%_15.63%]" data-name="Vector">
          <div className="absolute inset-[-8.06%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 5.40516">
              <path d="M0.375 0.375V5.03016" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[45.58%_15.63%_15.63%_84.38%]" data-name="Vector">
          <div className="absolute inset-[-8.06%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 5.40516">
              <path d="M0.375 5.03016V0.375" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_9.38%_48.17%_9.38%]" data-name="Vector">
          <div className="absolute inset-[-7.94%_-3.85%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 5.47014">
              <path d={svgPaths.p300e6700} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#161513] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">1234 Street Lehi, UT 12345</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[209px]">
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#a5a29c] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">10:00am-2:00pm</p>
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-medium leading-[20px] min-w-full not-italic relative shrink-0 text-[#161513] text-[14px] w-[min-content]">Calendar Event</p>
      <Frame41 />
    </div>
  );
}

function ButtonLiquidGlassText1() {
  return (
    <div className="absolute content-stretch flex items-center justify-between p-[16px] right-0 rounded-[8px] top-0 w-[314px]" data-name="Button - Liquid Glass - Text">
      <div className="absolute inset-[-0.33px_-1px_0.33px_1px]" data-name="Liquid Glass - Regular - Large">
        <FillShadow5 />
        <GlassEffect5 />
      </div>
      <Frame40 />
      <div className="relative shrink-0 size-[12px]" data-name="CaretRight">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[18.75%_31.25%_18.75%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-5%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 8.25">
              <path d={svgPaths.p1d7808a0} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame83() {
  return (
    <div className="h-[84px] relative shrink-0 w-full">
      <ButtonLiquidGlassText1 />
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame39 />
      <Frame83 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="bg-[#66c8a8] content-stretch flex items-center justify-center p-[4px] relative rounded-[9999px] shrink-0 size-[24px]">
      <div className="relative shrink-0 size-[12px]" data-name="CalendarCheck">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[15.63%]" data-name="Vector">
          <div className="absolute inset-[-4.55%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
              <path d={svgPaths.p162a000} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[9.38%_31.25%_78.13%_68.75%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 2.25">
              <path d="M0.375 0.375V1.875" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[9.38%_68.75%_78.13%_31.25%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 2.25">
              <path d="M0.375 0.375V1.875" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[34.38%_15.63%_65.63%_15.63%]" data-name="Vector">
          <div className="absolute inset-[-0.38px_-4.55%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 0.75">
              <path d="M0.375 0.375H8.625" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[31.25%] left-[35.94%] right-[35.94%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-16.67%_-11.11%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.125 3">
              <path d={svgPaths.p21ae6390} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame22 />
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#161513] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">11:00AM</p>
    </div>
  );
}

function FillShadow6() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[8px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect6() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[8px]" data-name="Glass Effect" />;
}

function Frame46() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[12px]" data-name="HouseLine">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[84.38%_6.25%_15.63%_6.25%]" data-name="Vector">
          <div className="absolute inset-[-0.38px_-3.57%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.25 0.75">
              <path d="M0.375 0.375H10.875" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[59.38%_40.63%_15.63%_40.63%]" data-name="Vector">
          <div className="absolute inset-[-12.5%_-16.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3.75">
              <path d={svgPaths.p3045b190} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[45.58%_84.38%_15.63%_15.63%]" data-name="Vector">
          <div className="absolute inset-[-8.06%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 5.40516">
              <path d="M0.375 0.375V5.03016" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[45.58%_15.63%_15.63%_84.38%]" data-name="Vector">
          <div className="absolute inset-[-8.06%_-0.38px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 0.75 5.40516">
              <path d="M0.375 5.03016V0.375" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_9.38%_48.17%_9.38%]" data-name="Vector">
          <div className="absolute inset-[-7.94%_-3.85%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.5 5.47014">
              <path d={svgPaths.p300e6700} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#161513] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">1234 Street Lehi, UT 12345</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0 w-[209px]">
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#a5a29c] text-[11px] tracking-[0.5px] uppercase whitespace-nowrap">11:00am-11:30AM</p>
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-medium leading-[20px] min-w-full not-italic relative shrink-0 text-[#161513] text-[14px] w-[min-content]">Calendar Event</p>
      <Frame46 />
    </div>
  );
}

function ButtonLiquidGlassText2() {
  return (
    <div className="absolute content-stretch flex items-center justify-between p-[16px] right-0 rounded-[8px] top-0 w-[314px]" data-name="Button - Liquid Glass - Text">
      <div className="absolute inset-[-0.33px_-1px_0.33px_1px]" data-name="Liquid Glass - Regular - Large">
        <FillShadow6 />
        <GlassEffect6 />
      </div>
      <Frame42 />
      <div className="relative shrink-0 size-[12px]" data-name="CaretRight">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[18.75%_31.25%_18.75%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-5%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 8.25">
              <path d={svgPaths.p1d7808a0} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame85() {
  return (
    <div className="h-[84px] relative shrink-0 w-full">
      <ButtonLiquidGlassText2 />
    </div>
  );
}

function Frame84() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame56 />
      <Frame85 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-end left-0 top-0 w-[345px]">
      <Frame81 />
      <Frame79 />
      <Frame84 />
    </div>
  );
}

function Frame54() {
  return (
    <div className="h-[404px] relative shrink-0 w-full">
      <div className="absolute h-[422px] left-[12px] top-[12px] w-0">
        <div className="absolute inset-[0_-0.5px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 422">
            <path d="M0.5 0V422" id="Vector 16" stroke="var(--stroke-0, #3FBB93)" />
          </svg>
        </div>
      </div>
      <Frame55 />
      <Frame82 />
    </div>
  );
}

function Schedule() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[498px] items-start relative shrink-0 w-[345px]" data-name="Schedule">
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[17px] text-black w-full">Schedule Today</p>
      <Frame54 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="[word-break:break-word] content-stretch flex items-center justify-between not-italic relative shrink-0 w-full whitespace-nowrap">
      <p className="font-['Inter',sans-serif] font-normal leading-[22px] relative shrink-0 text-[#161513] text-[17px]">Incentives</p>
      <p className="font-['Inter',sans-serif] font-semibold leading-[14px] relative shrink-0 text-[#a5a29c] text-[11px] tracking-[0.5px] uppercase">View More</p>
    </div>
  );
}

function Frame12() {
  return <div className="-translate-x-1/2 absolute bg-white blur-[28.429px] bottom-[-48px] h-[154px] left-1/2 w-[439px]" />;
}

function Trophy() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Trophy">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Trophy">
          <path d={svgPaths.p38ee7200} fill="var(--fill-0, #262626)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative rounded-[3027.643px] shrink-0">
      <Trophy />
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[normal] not-italic relative shrink-0 text-[#262626] text-[8px] tracking-[1.6px] uppercase whitespace-nowrap">Tournament</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
      <Frame7 />
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[22px] max-h-[25px] max-w-[254px] min-w-full not-italic overflow-hidden relative shrink-0 text-[#262626] text-[17px] text-ellipsis w-[min-content]">Achievements XP</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="-translate-x-1/2 absolute bottom-[0.2px] content-stretch flex gap-[24px] items-end left-[calc(50%+0.5px)] p-[16px] w-[344px]">
      <Frame13 />
      <div className="bg-[#e3e3e3] relative rounded-[9410.823px] shrink-0 size-[32px]" data-name="Button - Content Area">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[13.176px] top-1/2" data-name="ArrowRight">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Vector" />
          </svg>
          <div className="absolute bottom-1/2 left-[15.63%] right-[15.63%] top-1/2" data-name="Vector">
            <div className="absolute inset-[-0.5px_-5.52%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0588 1">
                <path d="M0.5 0.5H9.55882" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-[21.88%_15.63%_21.88%_56.25%]" data-name="Vector">
            <div className="absolute inset-[-6.75%_-13.49%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.70588 8.41177">
                <path d={svgPaths.p32ae3800} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="drop-shadow-[0px_8px_20px_rgba(0,0,0,0.12)] h-[201px] overflow-clip relative rounded-[16px] shrink-0 w-[345px]">
      <div className="absolute h-[226px] left-[-27px] top-[-41px] w-[400px]" data-name="imgi_41_userId386185_5a07d501-58d6-4a74-ba61-b403c222358b_cropped 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImgi41UserId3861855A07D50158D64A74Ba61B403C222358BCropped1.src} />
      </div>
      <Frame12 />
      <Frame14 />
    </div>
  );
}

function Frame62() {
  return (
    <div className="h-[6px] relative shrink-0 w-[39px]">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 6">
        <g id="Frame 1000002411">
          <circle cx="3" cy="3" fill="var(--fill-0, #2A2926)" id="Ellipse 34" r="3" />
          <circle cx="14" cy="3" fill="var(--fill-0, #CDCDCD)" id="Ellipse 33" r="3" />
          <circle cx="25" cy="3" fill="var(--fill-0, #CDCDCD)" id="Ellipse 35" r="3" />
          <circle cx="36" cy="3" fill="var(--fill-0, #CDCDCD)" id="Ellipse 36" r="3" />
        </g>
      </svg>
    </div>
  );
}

function Frame75() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-[345px]">
      <Frame63 />
      <Frame62 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame15 />
      <Frame75 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#161513] text-[17px] whitespace-nowrap">Quick Actions</p>
    </div>
  );
}

function FillShadow7() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[16px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect7() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[16px]" data-name="Glass Effect" />;
}

function Frame69() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#161513] text-[14px] whitespace-nowrap">Start Knocking</p>
      <div className="relative shrink-0 size-[16px]" data-name="CaretRight">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[18.75%_31.25%_18.75%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-5%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
              <path d="M0.5 0.5L5.5 5.5L0.5 10.5" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="flex-[1_0_0] h-[130px] min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
          <div className="relative shrink-0 size-[32px]" data-name="MapPin">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Vector" />
            </svg>
            <div className="absolute inset-[28.13%_37.5%_46.88%_37.5%]" data-name="Vector">
              <div className="absolute inset-[-12.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                  <path d={svgPaths.pb08b100} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[9.38%_18.75%]" data-name="Vector">
              <div className="absolute inset-[-3.85%_-5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 28">
                  <path d={svgPaths.p2fd75340} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
          <Frame69 />
        </div>
      </div>
    </div>
  );
}

function Frame64() {
  return (
    <div className="bg-white content-start flex flex-wrap gap-[8px] h-[130px] items-start relative rounded-[16px] shrink-0 w-[168.5px]">
      <div className="absolute inset-[-0.33px_-0.5px_0.33px_0]" data-name="Liquid Glass - Regular - Large">
        <FillShadow7 />
        <GlassEffect7 />
      </div>
      <Frame8 />
    </div>
  );
}

function FillShadow8() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[16px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect8() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[16px]" data-name="Glass Effect" />;
}

function Frame70() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#161513] text-[14px] whitespace-nowrap">Log Lead</p>
      <div className="relative shrink-0 size-[16px]" data-name="CaretRight">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[18.75%_31.25%_18.75%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-5%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
              <path d="M0.5 0.5L5.5 5.5L0.5 10.5" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="flex-[1_0_0] h-[130px] min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
          <div className="relative shrink-0 size-[32px]" data-name="UserPlus">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Vector" />
            </svg>
            <div className="absolute inset-[53.13%_3.13%_46.88%_78.13%]" data-name="Vector">
              <div className="absolute inset-[-1px_-16.67%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 2">
                  <path d="M1 1H7" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[43.75%_12.5%_37.5%_87.5%]" data-name="Vector">
              <div className="absolute inset-[-16.67%_-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 8">
                  <path d="M1 1V7" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[15.63%_34.38%_37.5%_18.75%]" data-name="Vector">
              <div className="absolute inset-[-6.67%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
                  <path d={svgPaths.p1d70d600} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-[21.88%] left-[9.38%] right-1/4 top-[62.5%]" data-name="Vector">
              <div className="absolute inset-[-20%_-4.76%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 7.00002">
                  <path d={svgPaths.p32236000} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
          <Frame70 />
        </div>
      </div>
    </div>
  );
}

function Frame65() {
  return (
    <div className="bg-white content-start flex flex-wrap gap-[8px] h-[130px] items-start relative rounded-[16px] shrink-0 w-[168.5px]">
      <div className="absolute inset-[-0.33px_-0.5px_0.33px_0]" data-name="Liquid Glass - Regular - Large">
        <FillShadow8 />
        <GlassEffect8 />
      </div>
      <Frame9 />
    </div>
  );
}

function FillShadow9() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[16px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect9() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[16px]" data-name="Glass Effect" />;
}

function Frame71() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#161513] text-[14px] whitespace-nowrap">See Reports</p>
      <div className="relative shrink-0 size-[16px]" data-name="CaretRight">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[18.75%_31.25%_18.75%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-5%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
              <path d="M0.5 0.5L5.5 5.5L0.5 10.5" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="flex-[1_0_0] h-[130px] min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
          <div className="relative shrink-0 size-[32px]" data-name="ChartLine">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Vector" />
            </svg>
            <div className="absolute inset-[18.75%_12.5%]" data-name="Vector">
              <div className="absolute inset-[-5%_-4.17%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 22">
                  <path d="M25 21H1V1" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[37.5%_12.5%]" data-name="Vector">
              <div className="absolute inset-[-12.5%_-4.17%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26 10">
                  <path d={svgPaths.pe845100} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
          <Frame71 />
        </div>
      </div>
    </div>
  );
}

function Frame66() {
  return (
    <div className="bg-white content-start flex flex-wrap gap-[8px] h-[130px] items-start relative rounded-[16px] shrink-0 w-[168.5px]">
      <div className="absolute inset-[-0.33px_-0.5px_0.33px_0]" data-name="Liquid Glass - Regular - Large">
        <FillShadow9 />
        <GlassEffect9 />
      </div>
      <Frame10 />
    </div>
  );
}

function FillShadow10() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[16px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect10() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[16px]" data-name="Glass Effect" />;
}

function Frame72() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#161513] text-[14px]">Create an Incentive</p>
      <div className="relative shrink-0 size-[16px]" data-name="CaretRight">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
        <div className="absolute inset-[18.75%_31.25%_18.75%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-5%_-10%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 11">
              <path d="M0.5 0.5L5.5 5.5L0.5 10.5" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="flex-[1_0_0] h-[130px] min-w-px relative">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
          <div className="relative shrink-0 size-[32px]" data-name="Ranking">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g id="Vector" />
            </svg>
            <div className="absolute inset-[37.5%_65.63%_18.75%_12.5%]" data-name="Vector">
              <div className="absolute inset-[-7.14%_-14.29%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 16">
                  <path d={svgPaths.p2098dd40} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[18.75%_34.38%]" data-name="Vector">
              <div className="absolute inset-[-5%_-10%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 22">
                  <path d={svgPaths.p1d7e4300} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[53.13%_12.5%_18.75%_65.63%]" data-name="Vector">
              <div className="absolute inset-[-11.11%_-14.29%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 11">
                  <path d={svgPaths.p3e5ccb80} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[37.5%_48.44%_46.88%_46.88%]" data-name="Vector">
              <div className="absolute inset-[-20%_-66.67%_-20%_-66.68%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.50027 7.00001">
                  <path d={svgPaths.p27cd8e40} id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[81.25%_6.25%_18.75%_6.25%]" data-name="Vector">
              <div className="absolute inset-[-1px_-3.57%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 2">
                  <path d="M1 1H29" id="Vector" stroke="var(--stroke-0, #161513)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
          <Frame72 />
        </div>
      </div>
    </div>
  );
}

function Frame67() {
  return (
    <div className="bg-white content-start flex flex-wrap gap-[8px] h-[130px] items-start relative rounded-[16px] shrink-0 w-[168.5px]">
      <div className="absolute inset-[-0.33px_-0.5px_0.33px_0]" data-name="Liquid Glass - Regular - Large">
        <FillShadow10 />
        <GlassEffect10 />
      </div>
      <Frame11 />
    </div>
  );
}

function QuickActions() {
  return (
    <div className="content-start flex flex-wrap gap-[8px] items-start justify-center relative shrink-0 w-[345px]" data-name="Quick Actions">
      <Frame64 />
      <Frame65 />
      <Frame66 />
      <Frame67 />
    </div>
  );
}

function AppUpdates() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[345px]" data-name="App Updates">
      <Frame5 />
      <QuickActions />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#161513] text-[17px] whitespace-nowrap">App Updates</p>
    </div>
  );
}

function FillShadow11() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[16px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect11() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[16px]" data-name="Glass Effect" />;
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="leading-[28px] relative shrink-0 text-[#161513] text-[22px] w-full">Quick product survey. Three $50 gift cards on the line.</p>
      <p className="leading-[16px] relative shrink-0 text-[#a5a29c] text-[12px] w-full">April 22, 2026</p>
    </div>
  );
}

function Frame57() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter',sans-serif] font-normal gap-[8px] items-start not-italic relative shrink-0 w-full">
      <Frame58 />
      <p className="leading-[20px] relative shrink-0 text-[#6d6b66] text-[14px] w-full">{`We're making big moves with Enzy — and your input decides what ships. Quick survey, 13 questions, a few minutes. Finish and you might just win one of three $50 Amazon gift cards.`}</p>
    </div>
  );
}

function Image() {
  return (
    <div className="aspect-[297/297] content-stretch flex flex-col items-center justify-center min-h-[160px] min-w-[160px] overflow-clip relative rounded-[16px] shrink-0 w-full" data-name="Image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-[#e3e3e3] inset-0 rounded-[16px]" />
        <img alt="" className="absolute max-w-none object-contain opacity-20 rounded-[16px] size-full" src={imgImage.src} />
      </div>
      <div className="relative shrink-0 size-[300px]" data-name="imgi_47_userId272647_e9f04b3b-dc6a-4445-aa7c-c434f5a74e61_Survey Announcement Graphic 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImgi47UserId272647E9F04B3BDc6A4445Aa7CC434F5A74E61SurveyAnnouncementGraphic1.src} />
      </div>
    </div>
  );
}

function FillShadow12() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[16px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect12() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[16px]" data-name="Glass Effect" />;
}

function Frame60() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="leading-[28px] relative shrink-0 text-[#161513] text-[22px] w-full">New: Scheduling Setup</p>
      <p className="leading-[16px] relative shrink-0 text-[#a5a29c] text-[12px] w-full">March 30, 2026</p>
    </div>
  );
}

function Frame59() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter',sans-serif] font-normal gap-[8px] items-start not-italic relative shrink-0 w-full">
      <Frame60 />
      <p className="leading-[20px] relative shrink-0 text-[#6d6b66] text-[14px] w-full">Admins can now manage appointment scheduling rules in one place with the new Scheduling Setup Tool. Company Admins can set rules for the entire company, while Team Admins can manage settings for their specific teams. This includes booking hours, working days, appointment lengths, buffer times, and more—helping keep schedules consistent and ensuring appointments are only booked during the intended times.</p>
    </div>
  );
}

function Image1() {
  return (
    <div className="aspect-[297/297] content-stretch flex flex-col items-center justify-center min-h-[160px] min-w-[160px] overflow-clip relative rounded-[16px] shrink-0 w-full" data-name="Image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-[#e3e3e3] inset-0 rounded-[16px]" />
        <img alt="" className="absolute max-w-none object-contain opacity-20 rounded-[16px] size-full" src={imgImage.src} />
      </div>
      <div className="relative shrink-0 size-[299px]" data-name="imgi_48_userId272647_14238fe0-7cea-4861-b499-ba46b055aa16_Set Scheduling Rules Enzy App Announcements 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImgi48UserId27264714238Fe07Cea4861B499Ba46B055Aa16SetSchedulingRulesEnzyAppAnnouncements1.src} />
      </div>
    </div>
  );
}

function FillShadow13() {
  return <div className="absolute bg-[#262626] inset-0 mix-blend-color-dodge rounded-[16px] shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]" data-name="Fill + Shadow" />;
}

function GlassEffect13() {
  return <div className="absolute bg-[rgba(0,0,0,0)] inset-0 rounded-[16px]" data-name="Glass Effect" />;
}

function Frame68() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="leading-[28px] relative shrink-0 text-[#161513] text-[22px] w-full">Admins Can Reorder Active Incentives</p>
      <p className="leading-[0] relative shrink-0 text-[#a5a29c] text-[12px] w-full">
        <span className="leading-[16px]">{`March 3, 2026 | `}</span>
        <span className="leading-[16px] text-[#0da071]">1 Features</span>
      </p>
    </div>
  );
}

function Frame61() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Inter',sans-serif] font-normal gap-[8px] items-start not-italic relative shrink-0 w-full">
      <Frame68 />
      <p className="leading-[20px] relative shrink-0 text-[#6d6b66] text-[14px] w-full">Admins can now control the display order of active incentives, excluding challenges. Tap the reorder icon to drag and drop active incentives into the preferred order. Once saved, those incentives will appear first on the main Incentives page, in the order set—making it easy to feature key incentives.</p>
    </div>
  );
}

function Image2() {
  return (
    <div className="aspect-[297/297] content-stretch flex flex-col items-center justify-center min-h-[160px] min-w-[160px] overflow-clip relative rounded-[16px] shrink-0 w-full" data-name="Image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
        <div className="absolute bg-[#e3e3e3] inset-0 rounded-[16px]" />
        <img alt="" className="absolute max-w-none object-contain opacity-20 rounded-[16px] size-full" src={imgImage.src} />
      </div>
      <div className="aspect-[1000/1000] relative shrink-0 w-full" data-name="imgi_49_userId11861322_53616300-8a3a-4e3b-aec3-7c59b3fce71a_Reorder incentives  1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImgi49UserId11861322536163008A3A4E3BAec37C59B3Fce71AReorderIncentives1.src} />
      </div>
    </div>
  );
}

function AppUpdates1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[345px]" data-name="App Updates">
      <Frame6 />
      <div className="bg-[#faf9f6] content-stretch flex flex-col gap-[16px] items-center justify-center p-[24px] relative rounded-[16px] shrink-0 w-[345px]" data-name="Announcement Card (mobile)">
        <div className="absolute inset-[0_0_-2px_0]" data-name="Liquid Glass - Regular - Large">
          <FillShadow11 />
          <GlassEffect11 />
        </div>
        <Frame57 />
        <Image />
        <div className="bg-[#0da071] relative rounded-[8px] shrink-0 w-full" data-name="Button - Content Area">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative size-full">
              <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#f3f3f3] text-[17px] whitespace-nowrap">Learn More</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#faf9f6] content-stretch flex flex-col gap-[16px] items-center justify-center p-[24px] relative rounded-[16px] shrink-0 w-[345px]" data-name="Announcement Card (mobile)">
        <div className="absolute inset-[0_0_-2px_0]" data-name="Liquid Glass - Regular - Large">
          <FillShadow12 />
          <GlassEffect12 />
        </div>
        <Frame59 />
        <Image1 />
        <div className="bg-[#0da071] relative rounded-[8px] shrink-0 w-full" data-name="Button - Content Area">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative size-full">
              <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#f3f3f3] text-[17px] whitespace-nowrap">Learn More</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#faf9f6] content-stretch flex flex-col gap-[16px] items-center justify-center p-[24px] relative rounded-[16px] shrink-0 w-[345px]" data-name="Announcement Card (mobile)">
        <div className="absolute inset-[0_0_-2px_0]" data-name="Liquid Glass - Regular - Large">
          <FillShadow13 />
          <GlassEffect13 />
        </div>
        <Frame61 />
        <Image2 />
        <div className="bg-[#0da071] relative rounded-[8px] shrink-0 w-full" data-name="Button - Content Area">
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative size-full">
              <p className="[word-break:break-word] font-['Inter',sans-serif] font-normal leading-[22px] not-italic relative shrink-0 text-[#f3f3f3] text-[17px] whitespace-nowrap">Learn More</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Homepage1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-center justify-center left-0 pb-[48px] pt-[72px] px-[24px] top-0 w-[393px]" data-name="homepage">
      <Frame18 />
      <Frame17 />
      <AiSearchBar />
      <Frame78 />
      <AiInsights />
      <Schedule />
      <Frame19 />
      <AppUpdates />
      <AppUpdates1 />
    </div>
  );
}

function House() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="House">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="House">
          <path d={svgPaths.p10f9f800} fill="var(--fill-0, #161513)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[rgba(0,54,46,0.1)] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[10px] relative rounded-[123456px] shrink-0">
      <House />
      <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#161513] text-[11px] text-center tracking-[0.5px] uppercase whitespace-nowrap">HOME</p>
    </div>
  );
}

function Trophy1() {
  return (
    <div className="flex-[1_0_0] h-[38px] min-w-px overflow-clip relative" data-name="Trophy">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12px] left-[calc(50%-0.25px)] top-[calc(50%+0.5px)] w-[15px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 12">
          <path d={svgPaths.p2392d780} fill="var(--fill-0, #161513)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Chats() {
  return (
    <div className="flex-[1_0_0] h-[38px] min-w-px overflow-clip relative" data-name="Chats">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12.5px] left-[calc(50%-0.25px)] top-[calc(50%+0.25px)] w-[13px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 12.5">
          <path d={svgPaths.p1dc20180} fill="var(--fill-0, #161513)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function CurrencyDollar() {
  return (
    <div className="flex-[1_0_0] h-[38px] min-w-px overflow-clip relative" data-name="CurrencyDollar">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13px] left-[calc(50%-0.25px)] top-1/2 w-[12px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
          <path d={svgPaths.p3f356000} fill="var(--fill-0, #161513)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function ChartLine() {
  return (
    <div className="flex-[1_0_0] h-[38px] min-w-px overflow-clip relative" data-name="ChartLine">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12.501px] left-[calc(50%-0.24px)] top-1/2 w-[12px]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12.5011">
          <path d={svgPaths.pd3c5000} fill="var(--fill-0, #161513)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function ButtonOnLight() {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] content-stretch flex h-[52px] items-center justify-between overflow-clip p-[8px] relative rounded-[123456px] shadow-[0px_2px_15px_0px_rgba(0,0,0,0.12)] shrink-0 w-[278px]" data-name="Button / On Light">
      <Frame1 />
      <Trophy1 />
      <Chats />
      <CurrencyDollar />
      <ChartLine />
    </div>
  );
}

function OcticonSparkleFill2() {
  return (
    <div className="relative shrink-0 size-[17.333px]" data-name="octicon:sparkle-fill-24">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.3333 17.3333">
        <g id="octicon:sparkle-fill-24">
          <path d={svgPaths.p1bdd3900} fill="url(#paint0_linear_2_3912)" id="Vector" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_3912" x1="1.69838" x2="16.283" y1="1.89976" y2="16.3001">
            <stop stopColor="#00926E" />
            <stop offset="0.482243" stopColor="#29E9BC" />
            <stop offset="0.7" stopColor="#0A9E88" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] content-stretch flex items-center justify-center overflow-clip px-[17.333px] py-[8.667px] relative rounded-[123456px] shadow-[0px_2px_15px_0px_rgba(0,0,0,0.12)] shrink-0 size-[52px]">
      <OcticonSparkleFill2 />
    </div>
  );
}

export default function Homepage() {
  return (
    <div className="bg-[#faf9f6] relative size-full" data-name="Homepage">
      <Homepage1 />
      <div className="-translate-x-1/2 absolute bottom-[24px] content-stretch flex gap-[16px] items-center left-1/2" data-name="RoundedNav">
        <ButtonOnLight />
        <Frame />
      </div>
    </div>
  );
}