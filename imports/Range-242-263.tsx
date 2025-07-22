import svgPaths from "./svg-sagx1n90fa";
import imgImage6 from "figma:asset/a4fd5120b625ecf09a5fd56aaa254b7821704881.png";

function Frame237() {
  return (
    <div className="bg-[#1e2023] relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-5 py-1.5 relative w-full">
          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Range</p>
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

function Frame257() {
  return (
    <div className="bg-[#333538] relative shrink-0 w-full">
      <div className="absolute border-[#1e2023] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
          <div
            className="[background-size:128.12%_132.77%] bg-[21.3%_43.97%] bg-no-repeat h-[177px] shrink-0 w-72"
            data-name="image 6"
            style={{ backgroundImage: `url('${imgImage6}')` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Range() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full"
      data-name="range"
    >
      <Frame237 />
      <Frame257 />
    </div>
  );
}