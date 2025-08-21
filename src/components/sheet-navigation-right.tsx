import svgPaths from "../imports/svg-1kxprmrpb3";

interface SheetNavigationRightProps {
  disabled?: boolean;
  onClick?: () => void;
}

export function SheetNavigationRight({ disabled = false, onClick }: SheetNavigationRightProps) {
  return (
    <div 
      className={`sheet-navigation ${disabled ? 'disabled' : ''}`}
      data-name="sheet-navigation-right"
      onClick={disabled ? undefined : onClick}
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 28 28"
      >
        <g id="arrow">
          <rect fill="#555555" height="28" width="28" />
          <path
            d={svgPaths.p34d91900}
            fill="var(--fill-0, #D5D7E1)"
            id="Union"
          />
        </g>
      </svg>
    </div>
  );
}