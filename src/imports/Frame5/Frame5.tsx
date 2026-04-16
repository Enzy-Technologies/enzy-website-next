import imgUntitled22 from "./191044b510cebe4e88843bba4465e2912a052ca2.png";

function Group() {
  return (
    <div className="absolute contents left-[-2.63px] top-[3.47px]">
      <div className="absolute h-[112.588px] left-[-2.63px] top-[8.37px] w-[109.611px]" data-name="Untitled-2 2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-0 max-w-none top-0 w-[197.69%]" src={imgUntitled22} />
        </div>
      </div>
      <div className="absolute h-[112.588px] left-[246.54px] top-[3.47px] w-[108.674px]" data-name="Untitled-2 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-full left-[-99.4%] max-w-none top-0 w-[199.4%]" src={imgUntitled22} />
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="absolute h-[9.536px] left-[157.83px] rounded-[2.631px] top-[90.25px] w-[24.746px]" data-name="Hero">
      <div aria-hidden="true" className="absolute backdrop-blur-[0.395px] inset-0 pointer-events-none rounded-[2.631px]" style={{ backgroundImage: "linear-gradient(189.625deg, rgba(25, 173, 125, 0.39) 25.113%, rgba(20, 144, 103, 0.39) 64.165%)" }} />
      <div aria-hidden="true" className="absolute border-[0.164px] border-[rgba(255,255,255,0.76)] border-solid inset-0 pointer-events-none rounded-[2.631px] shadow-[0px_0.658px_0.658px_0px_rgba(0,0,0,0.25)]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[3.946px] left-[12.59px] not-italic text-[#f5f7fa] text-[2.631px] text-center top-[2.63px] whitespace-nowrap">View More</p>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0.493px_0.493px_0.986px_0px_rgba(255,255,255,0.25)]" />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-[rgba(255,255,255,0.21)] overflow-clip relative rounded-[89.831px] size-full">
      <Group />
      <div className="-translate-x-1/2 absolute font-['IvyOra_Text:Medium',sans-serif] leading-[0] left-[173.58px] not-italic text-[#f5f7fa] text-[10.522px] text-center top-[46.54px] tracking-[-2px] whitespace-nowrap">
        <p className="leading-[13.153px] mb-0">“Makes other platforms look</p>
        <p className="leading-[13.153px]">elementary. It really stands out.”</p>
      </div>
      <Hero />
    </div>
  );
}