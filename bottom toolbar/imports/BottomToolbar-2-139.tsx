import svgPaths from "./svg-zt1jqrj25z";

function Frame300() {
  return (
    <div className="h-[39px] relative shrink-0 w-[43.5px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 39">
        <g id="Frame 300">
          <rect fill="#141518" height="39" width="43.5" />
          <path d={svgPaths.p3b04b380} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Tab() {
  return (
    <div
      className="bg-[#141518] box-border content-stretch flex gap-2.5 h-[39px] items-center justify-center p-[10px] relative shrink-0 w-[98px]"
      data-name="tab"
    >
      <div
        className="font-['Noto_Sans:Display_SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#cfcfcf] text-[12px] text-nowrap tracking-[0.48px]"
        style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">Model</p>
      </div>
    </div>
  );
}

function Component69() {
  return (
    <div className="absolute h-[16.5px] right-0 top-[18px] w-[18px]" data-name="Component 69">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 17">
        <g id="Component 69">
          <path d={svgPaths.p3bd7c700} fill="var(--fill-0, #CFCFCF)" id="Vector 1" />
        </g>
      </svg>
    </div>
  );
}

function Tab1() {
  return (
    <div
      className="bg-[#1e2023] box-border content-stretch flex gap-2.5 h-[39px] items-center justify-center p-[10px] relative shrink-0 w-[98px]"
      data-name="tab"
    >
      <div
        aria-hidden="true"
        className="absolute border-[#2c4a93] border-[0px_0px_4px] border-solid inset-0 pointer-events-none"
      />
      <div
        className="font-['Noto_Sans:Display_SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-nowrap tracking-[0.48px]"
        style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">Sheet1</p>
      </div>
      <Component69 />
    </div>
  );
}

function Tab2() {
  return (
    <div
      className="bg-[#1e2023] box-border content-stretch flex gap-2.5 h-[39px] items-center justify-center p-[10px] relative shrink-0 w-[98px]"
      data-name="tab"
    >
      <div
        className="font-['Noto_Sans:Display_SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#cfcfcf] text-[12px] text-nowrap tracking-[0.48px]"
        style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">Sheet2</p>
      </div>
    </div>
  );
}

function Component70() {
  return (
    <div
      className="box-border content-stretch flex gap-px items-center justify-start p-0 relative shrink-0"
      data-name="Component 70"
    >
      <Tab />
      <Tab1 />
      <Tab2 />
    </div>
  );
}

export default function BottomToolbar() {
  return (
    <div
      className="box-border content-stretch flex gap-px items-start justify-start p-0 relative size-full"
      data-name="bottom toolbar"
    >
      <Frame300 />
      <Component70 />
    </div>
  );
}