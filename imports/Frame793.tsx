import svgPaths from "./svg-q93ynoqb8o";

function Dropdown() {
  return (
    <div
      className="bg-[#141518] h-7 relative shrink-0 w-full"
      data-name="dropdown"
    >
      <div className="absolute border border-[#000000] border-solid inset-[-1px] pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-0.5 h-7 items-center justify-start p-[10px] relative w-full">
          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">New Layout</p>
          </div>
          <div className="bg-[#d5d7e1] h-[17px] shrink-0 w-px" />
        </div>
      </div>
    </div>
  );
}

function Dropdown1() {
  return (
    <div
      className="bg-[#141518] h-7 relative shrink-0 w-full"
      data-name="dropdown"
    >
      <div className="absolute border border-[#000000] border-solid inset-[-1px] pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row h-7 items-center justify-between p-[10px] relative w-full">
          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="leading-[normal] whitespace-pre">
              <span className="text-[#616161]">{`Based on: `}</span>*Sheet 1*
            </p>
          </div>
          <div
            className="h-[6.145px] relative shrink-0 w-[10.875px]"
            data-name="Union"
          >
            <div className="absolute bottom-[0.001%] left-0 right-0 top-0">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 11 7"
              >
                <path
                  d={svgPaths.p31f4a400}
                  fill="var(--fill-0, #D5D7E1)"
                  id="Union"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame818() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <Dropdown />
      <Dropdown1 />
    </div>
  );
}

function Actions() {
  return (
    <div className="relative shrink-0 size-7" data-name="actions">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="actions">
          <rect
            fill="var(--fill-0, #141518)"
            height="27.2432"
            width="27.2432"
            x="0.378378"
            y="0.378378"
          />
          <rect
            height="27.2432"
            stroke="var(--stroke-0, black)"
            strokeWidth="0.756757"
            width="27.2432"
            x="0.378378"
            y="0.378378"
          />
          <path
            d={svgPaths.p37b75d70}
            fill="var(--fill-0, #6EF01D)"
            id="Union"
          />
        </g>
      </svg>
    </div>
  );
}

function Actions1() {
  return (
    <div className="relative shrink-0 size-7" data-name="actions">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="actions">
          <rect
            fill="var(--fill-0, #141518)"
            height="27.2432"
            width="27.2432"
            x="0.378378"
            y="0.378378"
          />
          <rect
            height="27.2432"
            stroke="var(--stroke-0, black)"
            strokeWidth="0.756757"
            width="27.2432"
            x="0.378378"
            y="0.378378"
          />
          <path
            d={svgPaths.p1149d0c0}
            fill="var(--fill-0, #DFDFDF)"
            id="Union"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame819() {
  return (
    <div className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start p-0 relative shrink-0">
      <Actions />
      <Actions1 />
    </div>
  );
}

export default function Frame793() {
  return (
    <div className="relative size-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-1.5 items-start justify-start pl-0 pr-1.5 py-0 relative size-full">
          <Frame818 />
          <Frame819 />
        </div>
      </div>
    </div>
  );
}