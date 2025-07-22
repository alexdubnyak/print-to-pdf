import svgPaths from "./svg-674rqxjb79";

function Frame237() {
  return (
    <div className="bg-[#1e2023] relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-5 py-1.5 relative w-full">
          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              Print Styles
            </p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div
                className="h-[10.021px] relative w-[10.948px]"
                data-name="Union"
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 11 11"
                >
                  <path
                    d={svgPaths.p26072c00}
                    fill="var(--fill-0, #CFCFCF)"
                    id="Union"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame208() {
  return (
    <div className="bg-[#141518] h-[37px] relative shrink-0 w-full">
      <div className="absolute border border-[#000000] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row h-[37px] items-center justify-between p-[10px] relative w-full">
          <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              PrintStyle.ctb
            </p>
          </div>
          <div
            className="h-[6.145px] relative shrink-0 w-[10.875px]"
            data-name="Union"
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              role="presentation"
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
  );
}

function Frame323() {
  return (
    <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame208 />
      <div className="font-['Open_Sans_Hebrew:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          * You can upload new print styles in the Resources section.
        </p>
      </div>
    </div>
  );
}

function Frame259() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          Choose print style
        </p>
      </div>
      <Frame323 />
    </div>
  );
}

function Frame262() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame259 />
    </div>
  );
}

function Frame257() {
  return (
    <div className="bg-[#333538] relative shrink-0 w-full">
      <div className="absolute border-[#1e2023] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
          <Frame262 />
        </div>
      </div>
    </div>
  );
}

export default function PrintLayersOverride() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full"
      data-name="print layers override"
    >
      <Frame237 />
      <Frame257 />
    </div>
  );
}