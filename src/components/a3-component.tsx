import svgPaths from '../imports/svg-cs2xysgag7';

interface A3ComponentProps {
  onClick?: () => void;
}

function A3Icon() {
  return (
    <div className="h-[18.519px] relative shrink-0 w-[20.934px]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 19">
        <g clipPath="url(#clip0_483_461)" id="Frame">
          <path d={svgPaths.p2b12ad00} fill="white" id="Vector" />
          <path d={svgPaths.p2d5a5b80} fill="white" id="Vector_2" />
          <path d={svgPaths.p1f185380} fill="#EF9327" id="Vector_3" />
          <path d={svgPaths.p356936f0} fill="#EF9327" id="Vector_4" />
          <path d={svgPaths.p39520800} fill="white" id="Vector_5" />
          <path d={svgPaths.p37637180} fill="white" id="Vector_6" />
          <path d={svgPaths.pc411400} fill="white" id="Vector_7" />
        </g>
        <defs>
          <clipPath id="clip0_483_461">
            <rect fill="white" height="18.5187" width="20.9342" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function A3Component({ onClick }: A3ComponentProps) {
  return (
    <div
      className="bg-[#214bac] box-border content-stretch flex flex-col gap-[6.542px] items-center justify-center overflow-clip pb-[6.542px] pt-[9px] px-[6.542px] relative rounded-[74.115px] w-[39px] h-[39px] cursor-pointer hover:bg-[#1a3e91] transition-colors"
      data-name="a3"
      onClick={onClick}
    >
      <A3Icon />
    </div>
  );
}
