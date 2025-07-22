import svgPaths from "./svg-guscnum5ue";
import imgImage7 from "figma:asset/1be3d49abdbb316bd48a86a5037772a129eda379.png";

function Frame237() {
  return (
    <div className="bg-[#1e2023] relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-5 py-1.5 relative w-full">
          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Offset</p>
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
            className="[background-size:108.19%_127.06%] bg-[40.78%_50%] bg-no-repeat h-[85px] shrink-0 w-[314.25px]"
            data-name="image 7"
            style={{ backgroundImage: `url('${imgImage7}')` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Offset() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full"
      data-name="offset"
    >
      <Frame237 />
      <Frame257 />
    </div>
  );
}