import svgPaths from "../imports/svg-1kxprmrpb3";

interface SheetNavigationLeftProps {
  disabled?: boolean;
  onClick?: () => void;
}

export function SheetNavigationLeft({ disabled = false, onClick }: SheetNavigationLeftProps) {
  return (
    <div 
      className={`sheet-navigation-left ${disabled ? 'disabled' : ''}`}
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
          <path d={svgPaths.p8dea80} fill="var(--fill-0, #8E8F90)" id="Union" />
        </g>
      </svg>
    </div>
  );
}