import svgPaths from "./svg-jar8585ob6";

export default function RoundedNavChats({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex gap-[16px] items-center relative"} data-name="RoundedNav/Chats">
      <div className="bg-[rgba(255,255,255,0.4)] content-stretch flex h-[52px] items-center justify-between overflow-clip p-[8px] relative rounded-[123456px] shadow-[0px_2px_15px_0px_rgba(0,0,0,0.12)] shrink-0 w-[278px]" data-name="Button / On Light">
        <div className="flex-[1_0_0] h-[38px] min-w-px overflow-clip relative" data-name="House">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12.5px] left-[calc(50%-0.25px)] top-[calc(50%-0.25px)] w-[12px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12.5002">
              <path d={svgPaths.p36b13e00} fill="var(--fill-0, #161513)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="flex-[1_0_0] h-[38px] min-w-px overflow-clip relative" data-name="Trophy">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12px] left-[calc(50%-0.25px)] top-[calc(50%+0.5px)] w-[15px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 12">
              <path d={svgPaths.p2392d780} fill="var(--fill-0, #161513)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="bg-[rgba(0,54,46,0.1)] content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[10px] relative rounded-[123456px] shrink-0">
          <div className="relative shrink-0 size-[16px]" data-name="Chats">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <g id="Chats">
                <path d={svgPaths.p2f37d140} fill="var(--fill-0, #161513)" id="Vector" />
              </g>
            </svg>
          </div>
          <p className="[word-break:break-word] font-[ui-monospace,'SF_Mono','Menlo',monospace] leading-[14px] not-italic relative shrink-0 text-[#161513] text-[11px] text-center tracking-[0.5px] uppercase whitespace-nowrap">Chats</p>
        </div>
        <div className="flex-[1_0_0] h-[38px] min-w-px overflow-clip relative" data-name="CurrencyDollar">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13px] left-[calc(50%-0.25px)] top-1/2 w-[12px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13">
              <path d={svgPaths.p3f356000} fill="var(--fill-0, #161513)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="flex-[1_0_0] h-[38px] min-w-px overflow-clip relative" data-name="ChartLine">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[12.501px] left-[calc(50%-0.24px)] top-1/2 w-[12px]" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12.5011">
              <path d={svgPaths.pd3c5000} fill="var(--fill-0, #161513)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(255,255,255,0.4)] content-stretch flex items-center justify-center overflow-clip px-[17.333px] py-[8.667px] relative rounded-[123456px] shadow-[0px_2px_15px_0px_rgba(0,0,0,0.12)] shrink-0 size-[52px]">
        <div className="relative shrink-0 size-[17.333px]" data-name="octicon:sparkle-fill-24">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.3333 17.3333">
            <g id="octicon:sparkle-fill-24">
              <path d={svgPaths.p1bdd3900} fill="url(#paint0_linear_2_4117)" id="Vector" />
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_4117" x1="1.69838" x2="16.283" y1="1.89976" y2="16.3001">
                <stop stopColor="#00926E" />
                <stop offset="0.482243" stopColor="#29E9BC" />
                <stop offset="0.7" stopColor="#0A9E88" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}