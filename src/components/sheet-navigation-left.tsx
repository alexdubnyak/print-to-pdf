import svgPaths from "../imports/svg-1kxprmrpb3";

interface SheetNavigationLeftProps {
  disabled?: boolean;
  onClick?: () => void;
}

export function SheetNavigationLeft({ disabled = false, onClick }: SheetNavigationLeftProps) {
  return (
    <div 
      className={`sheet-navigation ${disabled ? 'disabled' : ''}`}
      data-name="sheet-navigation-left"
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
          <path d={svgPaths.p8dea80} fill="var(--fill-0, #D5D7E1)" id="Union" />
        </g>
      </svg>
    </div>
  );
}