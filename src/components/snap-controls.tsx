import svgPaths from "../imports/svg-oyx9kk31h7";

interface SnapControlsProps {
  onSnapClick?: (snapType: string) => void;
  snapStates?: {
    snap: boolean;
    grid: boolean;
    ortho: boolean;
    polar: boolean;
    esnap: boolean;
    etrack: boolean;
    lweight: boolean;
  };
}

function CoordinatesDisplay() {
  return (
    <div
      className="bg-[#1e2023] box-border content-stretch flex gap-2.5 h-[39px] items-center justify-start px-2.5 py-0 relative shrink-0 w-[127px]"
      data-name="Component 79"
    >
      <div aria-hidden="true" className="absolute border border-[#000000] border-solid inset-0 pointer-events-none" />
      <div
        className="font-['Noto_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#808287] text-[10px] text-nowrap tracking-[0.4px]"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">-5.7932,10.6185,0</p>
      </div>
    </div>
  );
}

function VersionDisplay() {
  return (
    <div
      className="font-['Noto_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#55575b] text-[14px] text-nowrap tracking-[0.56px]"
      style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
    >
      <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">
        1.196-31678.4251648.4e2899b.004c3e0.f3341a5
      </p>
    </div>
  );
}

function A3Button({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="bg-[#214bac] box-border content-stretch flex flex-col gap-[6.542px] items-center justify-center overflow-clip pb-[6.542px] pt-[9px] px-[6.542px] relative rounded-[74.115px] shrink-0 size-[34px] cursor-pointer hover:bg-[#2855c4] transition-colors"
      data-name="a3"
      onClick={onClick}
    >
      <div className="h-[18.519px] relative shrink-0 w-[20.934px]" data-name="Frame">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21 19">
          <g clipPath="url(#clip0_39_109)" id="Frame">
            <path d={svgPaths.p2b12ad00} fill="var(--fill-0, white)" id="Vector" />
            <path d={svgPaths.p2d5a5b80} fill="var(--fill-0, white)" id="Vector_2" />
            <path d={svgPaths.p1f185380} fill="var(--fill-0, #EF9327)" id="Vector_3" />
            <path d={svgPaths.p356936f0} fill="var(--fill-0, #EF9327)" id="Vector_4" />
            <path d={svgPaths.p39520800} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p37637180} fill="var(--fill-0, white)" id="Vector_6" />
            <path d={svgPaths.pc411400} fill="var(--fill-0, white)" id="Vector_7" />
          </g>
          <defs>
            <clipPath id="clip0_39_109">
              <rect fill="white" height="18.5187" width="20.9342" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function SnapControls({ onSnapClick, snapStates }: SnapControlsProps) {
  const defaultSnapStates = {
    snap: true,
    grid: true,
    ortho: true,
    polar: false,
    esnap: false,
    etrack: false,
    lweight: false
  };
  
  const currentSnapStates = snapStates || defaultSnapStates;
  
  const snapButtons = [
    { id: "snap", label: "SNAP", isActive: currentSnapStates.snap },
    { id: "grid", label: "GRID", isActive: currentSnapStates.grid },
    { id: "ortho", label: "ORTHO", isActive: currentSnapStates.ortho },
    { id: "polar", label: "POLAR", isActive: currentSnapStates.polar },
    { id: "esnap", label: "ESNAP", isActive: currentSnapStates.esnap },
    { id: "etrack", label: "ETRACK", isActive: currentSnapStates.etrack },
    { id: "lweight", label: "LWEIGHT", isActive: currentSnapStates.lweight }
  ];

  return (
    <div className="box-border content-stretch flex gap-[5px] items-center justify-start px-5 py-0 relative h-[39px] p-[0px]">
      {/* TEST - Простая кнопка для проверки */}
      <div className="bg-red-500 text-white px-2 py-1 text-xs">TEST</div>
      
      {/* Snap buttons group */}
      <div className="box-border content-stretch flex items-center justify-start p-0 relative shrink-0">
        {snapButtons.map((button) => (
          <div
            key={button.id}
            className="bg-green-500 text-white px-2 py-1 text-xs mr-1"
            onClick={() => onSnapClick?.(button.id)}
            data-name={`Component 72 ${button.label}`}
          >
            {button.label}
          </div>
        ))}
      </div>

      {/* Coordinates display */}
      <CoordinatesDisplay />

      {/* Version display */}
      <VersionDisplay />

      {/* A3 Button */}
      <A3Button onClick={() => onSnapClick?.("a3")} />
    </div>
  );
}