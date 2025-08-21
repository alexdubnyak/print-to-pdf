import svgPathsFrame301 from "../imports/svg-sdxk69b1rf";
import svgPaths from "../imports/svg-ts0zd4t2mg";

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  showNavigation?: boolean;
  onPanelManage?: () => void;
  onSnapOptions?: () => void;
}

function PreviousButton({ onClick, disabled }: { onClick?: () => void; disabled?: boolean }) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`relative shrink-0 size-[39px] transition-colors ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#2a2d31]'
      }`}
      onClick={handleClick}
      data-name="Previous Button"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 39">
        <g id="Component 66">
          <rect fill={disabled ? "#333538" : "var(--fill-0, #1E2023)"} height="38.2" width="38.2" x="0.4" y="0.4" />
          <rect height="38.2" stroke="var(--stroke-0, black)" strokeWidth="0.8" width="38.2" x="0.4" y="0.4" />
          <path d={svgPaths.pc4b8d80} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function NextButton({ onClick, disabled }: { onClick?: () => void; disabled?: boolean }) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`relative shrink-0 size-[39px] transition-colors ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-[#2a2d31]'
      }`}
      onClick={handleClick}
      data-name="Next Button"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 39">
        <g id="Component 66">
          <rect fill={disabled ? "#333538" : "var(--fill-0, #1E2023)"} height="38.2" width="38.2" x="0.4" y="0.4" />
          <rect height="38.2" stroke="var(--stroke-0, black)" strokeWidth="0.8" width="38.2" x="0.4" y="0.4" />
          <path d={svgPaths.p1acbfca0} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function XenonAtomIconPanelManage() {
  return (
    <div className="absolute bottom-[3.75%] left-0 right-0 top-0" data-name="Xenon/Atom/Icon/PanelManage">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 17">
        <g id="Xenon/Atom/Icon/PanelManage">
          <path
            clipRule="evenodd"
            d={svgPathsFrame301.p9d6fe80}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="Combined-Shape"
          />
        </g>
      </svg>
    </div>
  );
}

function Generic() {
  return (
    <div className="absolute bottom-[3.75%] contents left-0 right-0 top-0" data-name="Generic">
      <XenonAtomIconPanelManage />
    </div>
  );
}

function PatternLibrary() {
  return (
    <div className="absolute bottom-[3.75%] contents left-0 right-0 top-0" data-name="Pattern-Library">
      <Generic />
    </div>
  );
}

function PanelManage() {
  return (
    <div className="absolute h-[16.8px] left-[11.5px] overflow-clip top-[11.1px] w-4" data-name="PanelManage">
      <PatternLibrary />
    </div>
  );
}

function PanelManageButton({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="bg-[#1e2023] relative shrink-0 size-[39px] cursor-pointer hover:bg-[#2a2d31] transition-colors" 
      data-name="Component 66"
      onClick={onClick}
    >
      <div
        aria-hidden="true"
        className="absolute border-[#000000] border-[0.8px] border-solid inset-0 pointer-events-none"
      />
      <PanelManage />
      <div className="absolute bottom-1 right-1 size-1.5">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <path d="M6 6H0L6 0V6Z" fill="var(--fill-0, white)" id="Vector 2" />
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[12.5%_8.5%_12.5%_7.5%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 12">
        <g id="Group">
          <path d="M1.6 2.4H3.2V3.2H1.6V2.4Z" fill="var(--fill-0, white)" id="Vector" />
          <path d="M4 2.4H5.6V3.2H4V2.4Z" fill="var(--fill-0, white)" id="Vector_2" />
          <path d="M6.4 2.4H8V3.2H6.4V2.4Z" fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPathsFrame301.p3b954280} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPathsFrame301.p23340f00} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPathsFrame301.p2b945000} fill="var(--fill-0, white)" id="Vector_6" />
          <path d="M0 0H0.8V12H0V0Z" fill="var(--fill-0, white)" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}

function Snapoptions() {
  return (
    <div className="absolute left-[11.5px] overflow-clip size-4 top-[11.5px]" data-name="snapoptions">
      <Group />
    </div>
  );
}

function SnapOptionsButton({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="bg-[#1e2023] relative shrink-0 size-[39px] cursor-pointer hover:bg-[#2a2d31] transition-colors" 
      data-name="Component 66"
      onClick={onClick}
    >
      <div
        aria-hidden="true"
        className="absolute border-[#000000] border-[0.8px] border-solid inset-0 pointer-events-none"
      />
      <Snapoptions />
      <div className="absolute bottom-1 right-1 size-1.5">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
          <path d="M6 6H0L6 0V6Z" fill="var(--fill-0, white)" id="Vector 2" />
        </svg>
      </div>
    </div>
  );
}

export default function NavigationButtons({
  onPrevious,
  onNext,
  canGoPrevious = false,
  canGoNext = false,
  showNavigation = false,
  onPanelManage,
  onSnapOptions
}: NavigationButtonsProps) {
  return (
    <div className="box-border content-stretch flex gap-px items-center justify-start p-0 relative">
      {showNavigation && (
        <>
          <PreviousButton onClick={onPrevious} disabled={!canGoPrevious} />
          <NextButton onClick={onNext} disabled={!canGoNext} />
        </>
      )}
      <PanelManageButton onClick={onPanelManage} />
      <SnapOptionsButton onClick={onSnapOptions} />
    </div>
  );
}