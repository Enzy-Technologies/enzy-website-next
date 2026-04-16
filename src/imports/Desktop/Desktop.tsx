import svgPaths from "./svg-xzm247yiar";
import imgInnerScreen from "./2b19803f6c5e3c26b39f607fe129d1919300df81.png";
import imgDiv from "./e66ef56f0b767b50b8860584a5fa19bd69be614e.png";
import imgDiv1 from "./34d961d0ab311afc7564d03f49aed88b4a54a35f.png";
import imgDiv2 from "./818a5b0370e47250af5f3233218b98f9533f97ef.png";
import img633B16170A534785F1Ee4661OfficeLogoPng from "./87b2cf64572f3829d45c9cc2f7a44a3b21710d6c.png";
import img633B16170A53474D7Eee465FSaleforceLogoPng from "./126b54604033a0fcf131ab20a9864026a75b0609.png";
import img633B16170A534712F5Ee4660HubspotLogoPng from "./5852b489d0f3e6cd77615eae1f0b57c7e16dbea4.png";
import imgSpan from "./8930abde318770aab327f1516b0a5b492f05dd5d.png";

function Arrow() {
  return (
    <div className="content-stretch flex h-full items-center relative shrink-0 w-[7px]" data-name="Arrow">
      <div className="h-[6.011px] relative shrink-0 w-[6px]" data-name="↗">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6.01131">
          <path d={svgPaths.p2c9abe00} fill="var(--fill-0, white)" id="â" />
        </svg>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex h-[148px] items-center justify-between max-w-[1500px] pb-[80px] pt-[20px] relative shrink-0 w-full" data-name="Navigation">
      <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#f5f7fa] text-[30px] tracking-[-1.5px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
        <p className="leading-[1.2]">Enzy</p>
      </div>
      <a className="content-stretch cursor-pointer flex gap-[2px] items-center justify-center px-[22px] py-[14px] relative rounded-[16px] shrink-0" data-name="Button linkout" href="https://www.figma.com/sites" style={{ backgroundImage: "linear-gradient(200.921deg, rgb(25, 173, 125) 8.0471%, rgb(107, 212, 166) 88.128%)" }} target="_blank">
        <p className="font-['Roboto_Mono:Bold',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.35px] uppercase whitespace-nowrap">Learn More</p>
        <div className="flex flex-row items-center self-stretch">
          <Arrow />
        </div>
      </a>
    </div>
  );
}

function NavItems() {
  return (
    <div className="backdrop-blur-[15px] bg-[rgba(17,22,29,0.24)] relative rounded-[16px] shrink-0 w-full" data-name="Nav Items">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[20px] relative w-full">
          <button aria-label="Jump to product specifications section" className="block cursor-pointer font-['Roboto_Mono:Bold',sans-serif] leading-[0] not-italic relative shrink-0 text-[#f5f7fa] text-[14px] text-center tracking-[-0.35px] uppercase whitespace-nowrap">
            <p className="leading-[1.4]">Enter your url to see what enzy could look like for you</p>
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#666] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function InnerScreen() {
  return (
    <div className="-translate-x-1/2 absolute h-[607.439px] left-1/2 rounded-[16px] top-[16.5px] w-[869.742px]" data-name="Inner screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[16px]">
        <img alt="Data points on top of landscape" className="absolute left-0 max-w-none size-full top-0" src={imgInnerScreen} />
      </div>
    </div>
  );
}

function Ipad() {
  return (
    <div aria-label="Visual chart illustrating a 78% increase in efficiency across 33 regions between 2021 and 2024, with clear upward trends year over year" className="-translate-x-1/2 -translate-y-1/2 absolute bg-black border-[rgba(255,255,255,0.5)] border-l-2 border-r-2 border-solid border-t-2 h-[644px] left-[calc(50%+0.5px)] overflow-clip rounded-[24px] shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)] top-1/2 w-[907px]" data-name="Ipad">
      <InnerScreen />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[140px] relative shrink-0 w-full">
      <div className="bg-[rgba(20,144,103,0.6)] h-[362px] relative rounded-[30px] shrink-0 w-full" data-name="Hero image">
        <Ipad />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="content-stretch flex flex-col gap-[52px] items-center max-w-[1500px] overflow-clip relative shrink-0 w-[1200px]" data-name="Header">
      <h1 className="block font-['IvyOra_Text:Medium',sans-serif] leading-[0.95] not-italic relative shrink-0 text-[#f5f7fa] text-[110px] text-center tracking-[-2px] w-full max-w-[1200px] px-4 mx-auto">
        The Operating System for<br />
        High-Performance<br />
        Sales Teams
      </h1>
      <NavItems />
      <Frame4 />
    </header>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 absolute left-1/2 size-[40px] top-0" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Frame">
          <path clipRule="evenodd" d={svgPaths.p266d6000} fill="var(--fill-0, #00EB8D)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg() {
  return (
    <div className="overflow-clip relative shrink-0 size-[40px]" data-name="svg">
      <Frame />
    </div>
  );
}

function Div4() {
  return (
    <div className="content-stretch flex items-start pb-[4.797px] relative shrink-0" data-name="div">
      <Svg />
    </div>
  );
}

function Div3() {
  return (
    <div className="content-stretch flex items-start mb-[-1px] pr-[94px] relative shrink-0" data-name="div">
      <Div4 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-white tracking-[-0.25px] whitespace-nowrap">
        <p className="text-[29px]">
          <span className="leading-[38.4px]">{`66% `}</span>
          <span className="leading-[38.4px] text-[rgba(255,255,255,0.5)]">attendance rate</span>
        </p>
      </div>
    </div>
  );
}

function Div2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 pb-[1.594px] top-[303.98px]" data-name="div">
      <Div3 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] mb-[-1px] not-italic relative shrink-0 text-[11px] text-[rgba(255,255,255,0.65)] whitespace-nowrap">
        <p className="leading-[15.6px]">avg attendance for Welcome customers</p>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="h-[460.375px] relative shrink-0 w-[416px]" data-name="div">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[45px] text-white top-[102.5px] tracking-[-2px] w-[365.278px]">
        <p className="leading-[52.8px]">World-class teams are upgrading to Welcome</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[15px] text-[rgba(255,255,255,0.65)] top-[217.39px] w-[404.575px]">
        <p className="leading-[20.8px]">Companies are ditching legacy platforms for the ability to deliver an engaging experience at every level.</p>
      </div>
      <Div2 />
    </div>
  );
}

function Div() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-between min-h-px min-w-px relative" data-name="div">
      <Div1 />
      <div className="h-[457px] shrink-0 tailwind w-[545px]" />
    </div>
  );
}

function Section() {
  return (
    <div className="relative shrink-0 w-full" data-name="section">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-start flex flex-wrap items-start px-[80px] relative w-full">
          <Div />
        </div>
      </div>
    </div>
  );
}

function A() {
  return (
    <div className="content-stretch flex items-start pb-[25px] pl-[21px] pr-[22.578px] pt-[23px] relative rounded-[64px] shrink-0" data-name="a">
      <div aria-hidden="true" className="absolute bg-[#5b6cff] inset-0 pointer-events-none rounded-[64px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[0px]">Learn more</p>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_1px_1px_1px_0px_rgba(255,255,255,0.25)]" />
    </div>
  );
}

function Div7() {
  return (
    <div className="content-stretch flex flex-col gap-[24.563px] items-start pb-[48.813px] pr-[72.941px] pt-[15px] relative shrink-0 w-[531px]" data-name="div">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black w-[531px]">
        <p className="leading-[31.2px]">Manage your experience from start to finish, from integrations to registration and from interactive stage elements to post-event data, it’s all here.</p>
      </div>
      <A />
    </div>
  );
}

function Div6() {
  return (
    <div className="absolute content-stretch flex gap-[200.862px] items-start left-0 top-[144px]" data-name="div">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[128px] text-black tracking-[-5px] w-[439.138px]">
        <p className="leading-[115.2px]">How it works</p>
      </div>
      <Div7 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="-translate-x-1/2 absolute left-1/2 size-[80px] top-0" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80 80">
        <g id="Frame">
          <path clipRule="evenodd" d={svgPaths.p31074d00} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg1() {
  return (
    <div className="absolute left-0 overflow-clip size-[80px] top-0" data-name="svg">
      <Frame1 />
    </div>
  );
}

function Div10() {
  return (
    <div className="h-[84.797px] relative shrink-0 w-[80px]" data-name="div">
      <Svg1 />
    </div>
  );
}

function Div9() {
  return (
    <div className="absolute content-stretch flex gap-[9.531px] items-start left-0 pr-[21.469px] top-[34px]" data-name="div">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[59px] text-black tracking-[-2px] whitespace-nowrap">
        <p className="leading-[70.4px]">Create</p>
      </div>
      <Div10 />
    </div>
  );
}

function Div8() {
  return (
    <div className="-translate-y-1/2 absolute h-[209.984px] left-0 top-[calc(50%-0.01px)] w-[288px]" data-name="div">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[18px] text-black top-[13px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[26px]">Step 1</p>
      </div>
      <Div9 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[15px] text-black top-[166.8px] w-[281.169px]">
        <p className="leading-[20.8px]">Welcome Studio gives you all the tools you need to create and host virtual experiences that look awesome and put your brand centerstage.</p>
      </div>
    </div>
  );
}

function Div11() {
  return (
    <div className="absolute bg-[#f3ffab] h-[212px] overflow-clip right-[110px] rounded-[384px] top-[39.69px] w-[834px]" data-name="div">
      <div className="absolute inset-[-12px_-47.2px]" data-name="div">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[166.16%] left-0 max-w-none top-[-33.08%] w-full" src={imgDiv} />
        </div>
      </div>
    </div>
  );
}

function A1() {
  return (
    <div className="absolute h-[320px] left-0 top-[447.38px] w-[1280px]" data-name="a">
      <Div8 />
      <Div11 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="-translate-x-1/2 absolute left-1/2 size-[74px] top-0" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 74 74">
        <g id="Frame">
          <path clipRule="evenodd" d={svgPaths.p2cc69200} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div className="absolute left-0 overflow-clip size-[74px] top-[0.02px]" data-name="svg">
      <Frame2 />
    </div>
  );
}

function Div14() {
  return (
    <div className="h-[78.813px] relative shrink-0 w-[74.016px]" data-name="div">
      <Svg2 />
    </div>
  );
}

function Div13() {
  return (
    <div className="absolute content-stretch flex gap-[10.984px] items-start left-0 top-[34px]" data-name="div">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[60px] text-black tracking-[-2px] whitespace-nowrap">
        <p className="leading-[70.4px]">Engage</p>
      </div>
      <Div14 />
    </div>
  );
}

function Div12() {
  return (
    <div className="-translate-y-1/2 absolute h-[183.203px] left-0 top-[calc(50%-0.01px)] w-[288px]" data-name="div">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[18px] text-black top-[13px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[26px]">Step 2</p>
      </div>
      <Div13 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[14px] text-black top-[151.31px] w-[266.403px]">
        <p className="leading-[20.8px]">Cut through the yawns, grab your audience’s attention, and turn passive attendees into active participants.</p>
      </div>
    </div>
  );
}

function Div15() {
  return (
    <div className="absolute bg-[#f3ffab] h-[212px] overflow-clip right-[110px] rounded-[384px] top-[39.69px] w-[834px]" data-name="div">
      <div className="absolute inset-[-12px_-47.2px]" data-name="div">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[166.16%] left-0 max-w-none top-[-33.08%] w-full" src={imgDiv1} />
        </div>
      </div>
    </div>
  );
}

function A2() {
  return (
    <div className="absolute h-[320px] left-0 top-[768.38px] w-[1280px]" data-name="a">
      <Div12 />
      <Div15 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="-translate-x-1/2 absolute left-1/2 size-[65.688px] top-0" data-name="Frame">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65.6875 65.6875">
        <g id="Frame">
          <path clipRule="evenodd" d={svgPaths.p17b70700} fill="var(--fill-0, black)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Svg3() {
  return (
    <div className="absolute left-0 overflow-clip size-[65.688px] top-[0.02px]" data-name="svg">
      <Frame3 />
    </div>
  );
}

function Div18() {
  return (
    <div className="h-[70.5px] relative shrink-0 w-[65.703px]" data-name="div">
      <Svg3 />
    </div>
  );
}

function Div17() {
  return (
    <div className="absolute content-stretch flex gap-[10.297px] items-start left-0 top-[34px]" data-name="div">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[60px] text-black tracking-[-2px] whitespace-nowrap">
        <p className="leading-[70.4px]">Analyze</p>
      </div>
      <Div18 />
    </div>
  );
}

function Div16() {
  return (
    <div className="-translate-y-1/2 absolute h-[174.891px] left-0 top-[calc(50%-0.01px)] w-[288px]" data-name="div">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[18px] text-black top-[13px] tracking-[-0.2px] whitespace-nowrap">
        <p className="leading-[26px]">Step 3</p>
      </div>
      <Div17 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[14px] text-black top-[143px] w-[270.919px]">
        <p className="leading-[20.8px]">Track the success of your events with deep insights and analytics measured across the entire attendee experience.</p>
      </div>
    </div>
  );
}

function Div19() {
  return (
    <div className="absolute bg-[#f3ffab] h-[212px] overflow-clip right-[110px] rounded-[384px] top-[39.69px] w-[834px]" data-name="div">
      <div className="absolute inset-[-12px_-47.2px]" data-name="div">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[166.16%] left-0 max-w-none top-[-33.08%] w-full" src={imgDiv2} />
        </div>
      </div>
    </div>
  );
}

function A3() {
  return (
    <div className="absolute h-[320px] left-0 top-[1089.38px] w-[1280px]" data-name="a">
      <Div16 />
      <Div19 />
    </div>
  );
}

function Div5() {
  return (
    <div className="h-[1513.375px] relative shrink-0 w-[1280px]" data-name="div">
      <Div6 />
      <div className="absolute bg-[rgba(0,0,0,0.1)] h-px left-0 right-0 top-[446.38px]" data-name="div" />
      <A1 />
      <div className="absolute bg-[rgba(0,0,0,0.1)] h-px left-0 right-0 top-[767.38px]" data-name="div" />
      <A2 />
      <div className="absolute bg-[rgba(0,0,0,0.1)] h-px left-0 right-0 top-[1088.38px]" data-name="div" />
      <A3 />
    </div>
  );
}

function Section1() {
  return (
    <div className="bg-white content-stretch flex items-start px-[80px] relative shrink-0 w-[1280px]" data-name="section">
      <Div5 />
    </div>
  );
}

function Text() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text">
      <div className="content-stretch flex flex-col gap-[28px] items-start pr-[400px] pt-[32px] relative w-full">
        <h2 className="block font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#19ad7d] text-[12px] tracking-[-0.12px] uppercase w-[575.566px]">Benefits</h2>
        <p className="font-['Inter_Variable:Bold',sans-serif] font-bold leading-[0.9] min-w-full relative shrink-0 text-[#f5f7fa] text-[60px] tracking-[-3px] w-[min-content]">We’ve cracked the code.</p>
        <p className="font-['Roboto_Mono:Medium',sans-serif] leading-[1.4] min-w-full not-italic relative shrink-0 text-[#a3adb8] text-[15px] tracking-[-0.075px] uppercase w-[min-content]">Enzy provides real insights, without the data overload.</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Text 1">
      <p className="font-['Inter_Variable:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#f5f7fa] text-[18px] tracking-[-0.54px] w-full">Amplify Insights</p>
      <p className="font-['Roboto_Mono:Medium',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#6f6f6f] text-[15px] tracking-[-0.075px] uppercase w-full">Unlock data-driven decisions with comprehensive analytics, revealing key opportunities for strategic regional growth.</p>
    </div>
  );
}

function IconLockup() {
  return (
    <section aria-label="Area product benefit 1 of 4" className="flex-[1_0_0] min-h-px min-w-[265px] relative" data-name="Icon lockup 1">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[24px] items-start min-w-[inherit] pr-[20px] py-[40px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Cable icon">
          <div className="absolute inset-[10.36%_7.52%_10.37%_7.54%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.385 19.025">
              <path d={svgPaths.p33194f00} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
        </div>
        <Text1 />
      </div>
    </section>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Text 2">
      <p className="font-['Inter_Variable:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#f5f7fa] text-[18px] tracking-[-0.54px] w-full">Control Your Global Presence</p>
      <p className="font-['Roboto_Mono:Medium',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#6f6f6f] text-[15px] tracking-[-0.075px] uppercase w-full">Manage and track satellite offices, ensuring consistent performance and streamlined operations everywhere.</p>
    </div>
  );
}

function IconLockup1() {
  return (
    <section aria-label="Area product benefit 2 of 4" className="flex-[1_0_0] min-h-px min-w-[265px] relative" data-name="Icon lockup 2">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[20px] items-start min-w-[inherit] pr-[20px] py-[40px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Earth icon">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p2eae1500} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
        </div>
        <Text2 />
      </div>
    </section>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Text 3">
      <p className="font-['Inter_Variable:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#f5f7fa] text-[18px] tracking-[-0.54px] w-full">Remove Language Barriers</p>
      <p className="font-['Roboto_Mono:Medium',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#6f6f6f] text-[15px] tracking-[-0.075px] uppercase w-full">Adapt to diverse markets with built-in localization for clear communication and enhanced user experience.</p>
    </div>
  );
}

function IconLockup2() {
  return (
    <section aria-label="Area product benefit 3 of 4" className="flex-[1_0_0] min-h-px min-w-[265px] relative" data-name="Icon lockup 3">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[24px] items-start min-w-[inherit] pr-[40px] py-[40px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Account icon">
          <div className="absolute inset-[8.33%_4.14%_12.5%_4.17%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0063 19">
              <path d={svgPaths.p14659500} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
        </div>
        <Text3 />
      </div>
    </section>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Text 4">
      <p className="font-['Inter_Variable:Regular',sans-serif] font-normal leading-none relative shrink-0 text-[#f5f7fa] text-[18px] tracking-[-0.54px] w-full">Visualize Growth</p>
      <p className="font-['Roboto_Mono:Medium',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#6f6f6f] text-[15px] tracking-[-0.075px] uppercase w-full">Generate precise, visually compelling reports that illustrate your growth trajectories across all regions.</p>
    </div>
  );
}

function IconLockup3() {
  return (
    <section aria-label="Area product benefit 4 of 4" className="flex-[1_0_0] min-h-px min-w-[265px] relative" data-name="Icon lockup 4">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[24px] items-start min-w-[inherit] pr-[40px] py-[40px] relative w-full">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Chart icon">
          <div className="absolute bottom-1/4 left-[4.17%] right-[4.17%] top-1/4" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 12">
              <path d={svgPaths.p206794c0} fill="var(--fill-0, black)" id="Vector" />
            </svg>
          </div>
        </div>
        <Text4 />
      </div>
    </section>
  );
}

function IconsModule() {
  return (
    <div className="content-start flex flex-wrap gap-[20px] items-start pt-[40px] relative shrink-0 w-full" data-name="Icons module">
      <IconLockup />
      <IconLockup1 />
      <IconLockup2 />
      <IconLockup3 />
    </div>
  );
}

function Div24() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[41.594px] leading-[0] left-[calc(50%-0.01px)] not-italic text-[15px] text-[rgba(0,0,0,0.6)] text-center top-1/2 w-[78.109px] whitespace-nowrap" data-name="div">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%-0.35px)] top-[calc(50%-11.8px)]">
        <p className="leading-[20.8px] mb-0">Custom</p>
        <p className="leading-[20.8px]">&nbsp;</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%+0.45px)] top-[calc(50%+9.5px)]">
        <p className="leading-[20.8px]">Integration</p>
      </div>
    </div>
  );
}

function Div23() {
  return (
    <div className="bg-white h-[224px] relative rounded-[192px] shadow-[0px_35px_64px_0px_rgba(0,0,0,0.08)] shrink-0 w-[160px]" data-name="div">
      <Div24 />
    </div>
  );
}

function Div25() {
  return (
    <div className="bg-white h-[224px] relative rounded-[192px] shadow-[0px_35px_64px_0px_rgba(0,0,0,0.08)] shrink-0 w-[160px]" data-name="div">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[62px] left-1/2 top-1/2 w-[53px]" data-name="633b16170a534785f1ee4661_office-logo.png">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={img633B16170A534785F1Ee4661OfficeLogoPng} />
        </div>
      </div>
    </div>
  );
}

function Div26() {
  return (
    <div className="bg-white h-[224px] relative rounded-[192px] shadow-[0px_35px_64px_0px_rgba(0,0,0,0.08)] shrink-0 w-[160px]" data-name="div">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[62.5px] left-1/2 top-1/2 w-[93.5px]" data-name="633b16170a53474d7eee465f_saleforce-logo.png">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={img633B16170A53474D7Eee465FSaleforceLogoPng} />
        </div>
      </div>
    </div>
  );
}

function Div22() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pb-[300px] relative shrink-0" data-name="div">
      <Div23 />
      <Div25 />
      <Div26 />
    </div>
  );
}

function Component633E390253Dfaa8116B20F8DPardotSvg1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[27.656px] left-1/2 top-1/2 w-[93.469px]" data-name="633e390253dfaa8116b20f8d_pardot.svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 93.4693 27.6562">
        <g clipPath="url(#clip0_1_393)" id="633e390253dfaa8116b20f8d_pardot.svg">
          <path d={svgPaths.p315aa470} fill="var(--fill-0, #7D888E)" id="Vector" />
          <path d={svgPaths.p28779b00} fill="var(--fill-0, #7D888E)" id="Vector_2" />
          <path d={svgPaths.p188fce80} fill="var(--fill-0, #7D888E)" id="Vector_3" />
          <path d={svgPaths.p24286a00} fill="var(--fill-0, #7D888E)" id="Vector_4" />
          <path d={svgPaths.p5b41880} fill="var(--fill-0, #7D888E)" id="Vector_5" />
          <path d={svgPaths.p3d03f700} fill="var(--fill-0, #7D888E)" id="Vector_6" />
        </g>
        <defs>
          <clipPath id="clip0_1_393">
            <rect fill="white" height="27.6562" width="93.4693" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Component633E390253Dfaa8116B20F8DPardotSvg() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[27.656px] left-1/2 top-1/2 w-[93.5px]" data-name="633e390253dfaa8116b20f8d_pardot.svg">
      <Component633E390253Dfaa8116B20F8DPardotSvg1 />
    </div>
  );
}

function Div28() {
  return (
    <div className="bg-white h-[224px] relative rounded-[192px] shadow-[0px_35px_64px_0px_rgba(0,0,0,0.08)] shrink-0 w-[160px]" data-name="div">
      <Component633E390253Dfaa8116B20F8DPardotSvg />
    </div>
  );
}

function Div29() {
  return (
    <div className="bg-white h-[224px] relative rounded-[192px] shadow-[0px_35px_64px_0px_rgba(0,0,0,0.08)] shrink-0 w-[160px]" data-name="div">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[54.5px] left-1/2 top-1/2 w-[53px]" data-name="633b16170a534712f5ee4660_hubspot-logo.png">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={img633B16170A534712F5Ee4660HubspotLogoPng} />
        </div>
      </div>
    </div>
  );
}

function Div31() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute font-['Inter:Regular',sans-serif] font-normal h-[41.594px] leading-[0] left-[calc(50%-0.01px)] not-italic text-[15px] text-[rgba(0,0,0,0.6)] text-center top-1/2 w-[78.109px] whitespace-nowrap" data-name="div">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%-0.35px)] top-[calc(50%-11.8px)]">
        <p className="leading-[20.8px] mb-0">Custom</p>
        <p className="leading-[20.8px]">&nbsp;</p>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col justify-center left-[calc(50%+0.45px)] top-[calc(50%+9.5px)]">
        <p className="leading-[20.8px]">Integration</p>
      </div>
    </div>
  );
}

function Div30() {
  return (
    <div className="bg-white h-[224px] relative rounded-[192px] shadow-[0px_35px_64px_0px_rgba(0,0,0,0.08)] shrink-0 w-[160px]" data-name="div">
      <Div31 />
    </div>
  );
}

function Div27() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start pb-[236px] relative shrink-0" data-name="div">
      <Div28 />
      <Div29 />
      <Div30 />
    </div>
  );
}

function Div21() {
  return (
    <div className="absolute content-stretch flex gap-[20px] items-end left-0 top-[-72px]" data-name="div">
      <Div22 />
      <Div27 />
    </div>
  );
}

function H() {
  return (
    <div className="h-[256px] relative shrink-0 w-[737.969px]" data-name="h2">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] left-0 not-italic text-[120px] text-black top-[63px] tracking-[-5px] whitespace-nowrap">
        <p className="leading-[128px]">Integrate</p>
      </div>
      <div className="absolute h-[116px] left-0 rounded-[64px] top-[143px] w-[208px]" data-name="span">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[64px]">
          <div className="absolute bg-[#5b6cff] inset-0 rounded-[64px]" />
          <div className="absolute inset-0 overflow-hidden rounded-[64px]">
            <img alt="" className="absolute h-[100.86%] left-0 max-w-none top-[-0.43%] w-full" src={imgSpan} />
          </div>
        </div>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[163px] justify-center leading-[0] left-[224px] not-italic text-[123px] text-black top-[191.5px] tracking-[-5px] w-[514.169px]">
        <p className="leading-[128px]">your data</p>
      </div>
    </div>
  );
}

function Div32() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[64px] items-start left-[420px] py-[112px] top-1/2" data-name="div">
      <H />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black w-[502.388px]">
        <p className="leading-[26px]">Leverage your existing marketing platforms and sync the data seamlessly</p>
      </div>
    </div>
  );
}

function Div20() {
  return (
    <div className="h-[596px] relative shrink-0 w-[1280px]" data-name="div">
      <Div21 />
      <Div32 />
    </div>
  );
}

function Section2() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-start overflow-clip px-[80px] relative shrink-0 w-[1280px]" data-name="section">
      <Div20 />
    </div>
  );
}

function HeadlineAndIcons() {
  return (
    <section className="content-stretch flex flex-col items-center pb-[60px] relative shrink-0 w-full" data-name="Headline and icons">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-solid border-t-[0.5px] inset-0 pointer-events-none" />
      <Section1 />
      <Text />
      <IconsModule />
      <Section2 />
    </section>
  );
}

function HeroImage() {
  return <div aria-label="A image that shows a mountain range " className="bg-[rgba(255,255,255,0.2)] h-[620px] rounded-[408px] shrink-0 w-full" data-name="Hero Image" />;
}

function BenefitsSection() {
  return (
    <div className="content-stretch flex flex-col h-[3413px] items-center max-w-[1500px] pb-[120px] relative shrink-0 w-full" data-name="Benefits section">
      <HeadlineAndIcons />
      <HeroImage />
    </div>
  );
}

function TextContent() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-center relative shrink-0 w-full" data-name="Text content">
      <h2 className="block font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] min-w-full not-italic relative shrink-0 text-[#19ad7d] text-[12px] text-center tracking-[-0.12px] uppercase w-[min-content]">Specs</h2>
      <p className="font-['Inter_Variable:Bold',sans-serif] font-bold leading-[0.9] min-w-full relative shrink-0 text-[#f5f7fa] text-[60px] text-center tracking-[-3px] w-[min-content]">Why Choose Enzy?</p>
      <p className="font-['Roboto_Mono:Medium',sans-serif] leading-[1.4] min-w-full not-italic relative shrink-0 text-[#6f6f6f] text-[15px] text-center tracking-[-0.075px] uppercase w-[min-content]">{`You need a solution that keeps up. That’s why we developed Enzy. A developer-friendly approach to streamline your business. `}</p>
      <a className="bg-[#149067] content-stretch cursor-pointer flex flex-col items-center justify-center px-[22px] py-[14px] relative rounded-[1000px] shrink-0" data-name="Button" href="https://www.figma.com/sites" target="_blank">
        <p className="font-['Roboto_Mono:Bold',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[14px] text-center tracking-[-0.35px] uppercase whitespace-nowrap">Discover More</p>
      </a>
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div aria-hidden="true" className="absolute border-[#929292] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[240px] py-[80px] relative w-full">
          <TextContent />
        </div>
      </div>
    </div>
  );
}

function TableItem() {
  return (
    <div className="h-[96px] relative shrink-0 w-full" data-name="table item">
      <div aria-hidden="true" className="absolute border-[#929292] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[30px] py-[40px] relative size-full">
          <div className="flex flex-col font-['DM_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[25.714px] text-black tracking-[-2.0571px] whitespace-nowrap" style={{ fontVariationSettings: "'opsz' 14" }}>
            <p className="leading-[1.2]">Enzy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column() {
  return (
    <section aria-label="The features that are and are not included in Enzy's offering" className="bg-white flex-[1_0_0] min-h-px min-w-[200px] relative rounded-[20px]" data-name="Column 1">
      <div className="content-stretch flex flex-col items-start min-w-[inherit] overflow-clip relative rounded-[inherit] w-full">
        <TableItem />
        <div className="relative shrink-0 w-full" data-name="Table item">
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
              <div aria-label="Included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Check icon">
                <div className="absolute inset-[23.29%_12.5%_20.83%_14.58%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 7.8225">
                    <path d={svgPaths.p30c6dc00} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
              <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Ultra-fast browsing</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Table item">
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
              <div aria-label="Included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Check icon">
                <div className="absolute inset-[23.29%_12.5%_20.83%_14.58%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 7.8225">
                    <path d={svgPaths.p30c6dc00} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
              <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Advanced AI insights</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Table item">
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
              <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Check icon">
                <div className="absolute inset-[23.29%_12.5%_20.83%_14.58%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 7.8225">
                    <path d={svgPaths.p30c6dc00} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
              <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Seamless integration</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Table item">
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
              <div aria-label="Included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Check icon">
                <div className="absolute inset-[23.29%_12.5%_20.83%_14.58%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 7.8225">
                    <path d={svgPaths.p30c6dc00} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
              <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Advanced AI insights</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Table item">
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
              <div aria-label="Included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Check icon">
                <div className="absolute inset-[23.29%_12.5%_20.83%_14.58%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 7.8225">
                    <path d={svgPaths.p30c6dc00} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
              <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Ultra-fast browsing</p>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Table item">
          <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
              <div aria-label="Included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Check icon">
                <div className="absolute inset-[23.29%_12.5%_20.83%_14.58%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 7.8225">
                    <path d={svgPaths.p30c6dc00} fill="var(--fill-0, black)" id="Vector" />
                  </svg>
                </div>
              </div>
              <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Full UTF-8 support</p>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[20px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]" />
    </section>
  );
}

function TableItem1() {
  return (
    <div className="h-[96px] relative shrink-0 w-full" data-name="table item">
      <div aria-hidden="true" className="absolute border-[#929292] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[30px] py-[40px] relative size-full">
          <div className="flex flex-col font-['Rethink_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#a3adb8] text-[22.857px] tracking-[-1.8286px] whitespace-nowrap">
            <p className="leading-[1.2]">WebSurge</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <section aria-label="The features that are and are not included in WebSurge's offering" className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[200px] relative" data-name="Column 2">
      <TableItem1 />
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Check icon">
              <div className="absolute inset-[23.29%_12.5%_20.83%_14.58%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 7.8225">
                  <path d={svgPaths.p30c6dc00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Fast browsing</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Check icon">
              <div className="absolute inset-[23.29%_12.5%_20.83%_14.58%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 7.8225">
                  <path d={svgPaths.p30c6dc00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Basic AI recommendations</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Check icon">
              <div className="absolute inset-[23.29%_12.5%_20.83%_14.58%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 7.8225">
                  <path d={svgPaths.p30c6dc00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Restricts customization</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Not included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Close icon">
              <div className="absolute inset-[20.83%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
                  <path d={svgPaths.p329dba00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Basic AI insights</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Check icon">
              <div className="absolute inset-[23.29%_12.5%_20.83%_14.58%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.2083 7.8225">
                  <path d={svgPaths.p30c6dc00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Fast browsing</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Not included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Close icon">
              <div className="absolute inset-[20.83%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
                  <path d={svgPaths.p329dba00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Potential display errors</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TableItem2() {
  return (
    <div className="h-[96px] relative shrink-0 w-full" data-name="table item">
      <div aria-hidden="true" className="absolute border-[#929292] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="content-stretch flex items-start justify-center px-[30px] py-[40px] relative size-full">
          <div className="flex flex-col font-['Reddit_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#a3adb8] text-[21.654px] tracking-[-1.7323px] whitespace-nowrap">
            <p className="leading-[1.2]">HyperView</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <section aria-label="The features that are and are not included in HyperView's offering" className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-[200px] relative" data-name="Column 3">
      <TableItem2 />
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-l-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Not included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Close icon">
              <div className="absolute inset-[20.83%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
                  <path d={svgPaths.p329dba00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Moderate speeds</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-l-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Not included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Close icon">
              <div className="absolute inset-[20.83%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
                  <path d={svgPaths.p329dba00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">No AI assistance</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-l-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Not included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Close icon">
              <div className="absolute inset-[20.83%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
                  <path d={svgPaths.p329dba00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Steep learning curve</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-l-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Not included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Close icon">
              <div className="absolute inset-[20.83%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
                  <path d={svgPaths.p329dba00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">No AI assistance</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-b-[0.5px] border-l-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Not included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Close icon">
              <div className="absolute inset-[20.83%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
                  <path d={svgPaths.p329dba00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Moderate speeds</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="Table item">
        <div aria-hidden="true" className="absolute border-[#e9e9e9] border-l-[0.5px] border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[30px] py-[32px] relative w-full">
            <div aria-label="Not included" className="overflow-clip relative shrink-0 size-[14px]" data-name="Close icon">
              <div className="absolute inset-[20.83%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.16667 8.16667">
                  <path d={svgPaths.p329dba00} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
            <p className="font-['Roboto_Mono:Regular',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#f5f7fa] text-[12px] text-center tracking-[-0.12px] uppercase whitespace-nowrap">Partial UTF-8 support</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Table() {
  return (
    <section aria-label="Table comparing and contrasting the feature offerings of Enzy, WebSurge, and HyperView" className="content-stretch flex items-start overflow-x-auto overflow-y-clip relative rounded-[20px] shrink-0 w-full" data-name="Table">
      <Column />
      <Column1 />
      <Column2 />
    </section>
  );
}

function SpecificationsTable() {
  return (
    <section className="content-stretch flex flex-col gap-[20px] items-start max-w-[1500px] overflow-clip pb-[120px] relative shrink-0 w-full" data-name="Specifications table">
      <Content />
      <Table />
    </section>
  );
}

function Arrow1() {
  return (
    <div className="content-stretch flex h-full items-center relative shrink-0 w-[7px]" data-name="Arrow">
      <div className="h-[6.011px] relative shrink-0 w-[6px]" data-name="↗">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6.01131">
          <path d={svgPaths.p2c9abe00} fill="var(--fill-0, white)" id="â" />
        </svg>
      </div>
    </div>
  );
}

function CenteredCta() {
  return (
    <section className="max-w-[1500px] relative shrink-0 w-full" data-name="Centered CTA">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-solid border-t-[0.5px] inset-0 pointer-events-none" />
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-center max-w-[inherit] px-[300px] py-[120px] relative w-full">
          <p className="font-['Inter_Variable:Bold',sans-serif] font-bold leading-[0.9] relative shrink-0 text-[#f5f7fa] text-[60px] text-center tracking-[-3px] w-full">Connect with us</p>
          <p className="font-['Roboto_Mono:Medium',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[#6f6f6f] text-[15px] text-center tracking-[-0.075px] uppercase w-full">Schedule a quick call to learn how Enzy can turn your regional data into a powerful advantage.</p>
          <a className="bg-[#19ad7d] cursor-pointer relative rounded-[1000px] shrink-0 w-full" data-name="Button linkout" href="https://www.figma.com/sites" target="_blank">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex gap-[2px] items-center justify-center px-[22px] py-[14px] relative w-full">
                <p className="font-['Roboto_Mono:Bold',sans-serif] leading-[1.4] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[-0.35px] uppercase whitespace-nowrap">Learn More</p>
                <div className="flex flex-row items-center self-stretch">
                  <Arrow1 />
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function Main() {
  return (
    <main className="content-stretch flex flex-col items-start relative shrink-0 w-[1200px]" data-name="Main" tabIndex="-1">
      <Section />
      <BenefitsSection />
      <SpecificationsTable />
      <CenteredCta />
    </main>
  );
}

function NavItems1() {
  return (
    <div className="content-stretch flex font-['Roboto_Mono:Bold',sans-serif] gap-[27px] items-center not-italic relative shrink-0 text-[14px] text-black text-center tracking-[-0.35px] uppercase whitespace-nowrap" data-name="Nav Items">
      <button className="block cursor-pointer leading-[0] relative shrink-0">
        <p className="leading-[1.4]">Benefits</p>
      </button>
      <button className="block cursor-pointer leading-[0] relative shrink-0">
        <p className="leading-[1.4]">Specifications</p>
      </button>
      <p className="leading-[1.4] relative shrink-0">How-to</p>
    </div>
  );
}

function Links() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Links">
      <NavItems1 />
    </div>
  );
}

function Text5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] font-['Roboto_Mono:Regular',sans-serif] gap-[16px] items-center leading-[0] min-h-px min-w-px not-italic relative text-[#485c11] text-[12px] tracking-[-0.12px] uppercase whitespace-nowrap" data-name="Text">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.4]">© Enzy.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[1.4]">2025</p>
      </div>
    </div>
  );
}

function Credits() {
  return (
    <div className="content-stretch flex gap-[40px] items-end relative shrink-0 w-full" data-name="Credits">
      <div aria-label="Company logo" className="content-stretch flex items-end relative shrink-0" data-name="Logo">
        <div className="h-[70px] relative shrink-0 w-[31.751px]" data-name="Union">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.751 70">
            <path d={svgPaths.p385a6880} fill="var(--fill-0, black)" id="Union" />
          </svg>
        </div>
      </div>
      <Text5 />
      <div className="flex flex-col font-['Roboto_Mono:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#485c11] text-[12px] tracking-[-0.12px] uppercase whitespace-nowrap">
        <p className="leading-[1.4]">All Rights Reserved</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="content-stretch flex flex-col gap-[80px] items-start justify-end max-w-[1500px] pb-[20px] pt-[40px] relative shrink-0 w-[1200px]" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-solid border-t inset-0 pointer-events-none" />
      <Links />
      <Credits />
    </footer>
  );
}

function NavItems2() {
  return (
    <div className="-translate-x-1/2 absolute backdrop-blur-[15px] bg-[#11161d] left-1/2 rounded-[16px] top-[16px]" data-name="Nav Items">
      <div className="content-stretch flex font-['Roboto_Mono:Bold',sans-serif] gap-[27px] items-center not-italic overflow-clip px-[24px] py-[20px] relative rounded-[inherit] text-[#f5f7fa] text-[14px] text-center tracking-[-0.35px] uppercase whitespace-nowrap">
        <button aria-label="Jump to product benefits section" className="block cursor-pointer leading-[0] relative shrink-0">
          <p className="leading-[1.4]">Benefits</p>
        </button>
        <button aria-label="Jump to product specifications section" className="block cursor-pointer leading-[0] relative shrink-0">
          <p className="leading-[1.4]">Specifications</p>
        </button>
        <p aria-label="Jump to product how-to section" className="leading-[1.4] relative shrink-0">
          How-to
        </p>
        <button aria-label="Jump to contact us section" className="block cursor-pointer leading-[0] relative shrink-0">
          <p className="leading-[1.4]">Contact Us</p>
        </button>
      </div>
      <div aria-hidden="true" className="absolute border border-[#666] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

export default function Desktop() {
  return (
    <div className="bg-[#0b0f14] content-stretch flex flex-col items-center pb-[20px] relative size-full" data-name="Desktop">
      <div className="absolute left-[-155.5px] size-[656px] top-[77.42px]">
        <div className="absolute inset-[-12.2%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 816 816">
            <g filter="url(#filter0_f_1_437)" id="Ellipse 8">
              <circle cx="408" cy="408" fill="url(#paint0_radial_1_437)" fillOpacity="0.5" r="328" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="816" id="filter0_f_1_437" width="816" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_437" stdDeviation="40" />
              </filter>
              <radialGradient cx="0" cy="0" gradientTransform="translate(408 408) rotate(90) scale(328)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_437" r="1">
                <stop stopColor="#AFFFEB" stopOpacity="0.6" />
                <stop offset="1" stopColor="#AFFFEB" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="absolute left-[calc(58.33%+61.33px)] size-[656px] top-[306.18px]">
        <div className="absolute inset-[-12.2%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 816 816">
            <g filter="url(#filter0_f_1_437)" id="Ellipse 8">
              <circle cx="408" cy="408" fill="url(#paint0_radial_1_437)" fillOpacity="0.5" r="328" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="816" id="filter0_f_1_437" width="816" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_437" stdDeviation="40" />
              </filter>
              <radialGradient cx="0" cy="0" gradientTransform="translate(408 408) rotate(90) scale(328)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_437" r="1">
                <stop stopColor="#AFFFEB" stopOpacity="0.6" />
                <stop offset="1" stopColor="#AFFFEB" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <nav className="content-stretch flex flex-col items-center relative shrink-0 w-[1200px]" data-name="Navigation">
        <Navigation />
      </nav>
      <Header />
      <Main />
      <Footer />
      <NavItems2 />
    </div>
  );
}