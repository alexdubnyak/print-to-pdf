import React from 'react';
import svgPathsFrame301 from '../imports/svg-sdxk69b1rf';
import svgPaths from '../imports/svg-ts0zd4t2mg';

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
          <rect
            fill={disabled ? '#333538' : 'var(--fill-0, #1E2023)'}
            height="38.2"
            width="38.2"
            x="0.4"
            y="0.4"
          />
          <rect
            height="38.2"
            stroke="var(--stroke-0, black)"
            strokeWidth="0.8"
            width="38.2"
            x="0.4"
            y="0.4"
          />
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
          <rect
            fill={disabled ? '#333538' : 'var(--fill-0, #1E2023)'}
            height="38.2"
            width="38.2"
            x="0.4"
            y="0.4"
          />
          <rect
            height="38.2"
            stroke="var(--stroke-0, black)"
            strokeWidth="0.8"
            width="38.2"
            x="0.4"
            y="0.4"
          />
          <path d={svgPaths.p1acbfca0} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function XenonAtomIconPanelManage() {
  return (
    <div
      className="absolute bottom-[3.75%] left-0 right-0 top-0"
      data-name="Xenon/Atom/Icon/PanelManage"
    >
      <svg
        width="20"
        height="20"
        className="block"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 17"
      >
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
    <div
      className="absolute bottom-[3.75%] contents left-0 right-0 top-0"
      data-name="Pattern-Library"
    >
      <Generic />
    </div>
  );
}

function PanelManage() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" data-name="PanelManage">
      <svg
        width="16"
        height="16"
        className="block"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 16 17"
      >
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

function EsnapSettingsIcon() {
  return (
    <svg
      width="22"
      height="22"
      className="block"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 23 23"
    >
      <path d="M4.3501 6.55005H6.5501V7.65005H4.3501V6.55005Z" fill="white" />
      <path d="M7.6499 6.55005H9.8499V7.65005H7.6499V6.55005Z" fill="white" />
      <path d="M10.9497 6.55005H13.1497V7.65005H10.9497V6.55005Z" fill="white" />
      <path
        d="M19.9856 5.54427C20.8448 6.40342 20.8448 7.79639 19.9856 8.65554C19.1265 9.51469 17.7335 9.51469 16.8743 8.65554C16.0152 7.79639 16.0152 6.40342 16.8743 5.54427C17.7335 4.68511 19.1265 4.68511 19.9856 5.54427Z"
        fill="white"
      />
      <path
        d="M14.0301 6.32991L11.5001 3.90991L10.7301 4.67991L13.1501 7.09991L10.6201 9.62991L11.5001 10.5099L13.9201 7.97991L14.8001 7.09991L14.0301 6.32991Z"
        fill="white"
      />
      <path
        d="M18.4301 14.5799L16.1201 12.1599L11.2801 16.8899L10.6201 19.7499L13.5901 19.3099L18.4301 14.5799ZM16.2301 13.8099L17.0001 14.6899L13.7001 17.8799L12.9301 16.9999L16.2301 13.8099Z"
        fill="white"
      />
      <path d="M2.1499 3.25H3.2499V19.75H2.1499V3.25Z" fill="white" />
    </svg>
  );
}

function Snapoptions() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" data-name="snapoptions">
      <EsnapSettingsIcon />
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
  onSnapOptions,
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
