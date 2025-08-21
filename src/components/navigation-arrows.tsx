import svgPaths from "../imports/svg-1kxprmrpb3";

function Arrow({ disabled = false, onClick }: { disabled?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`size-7 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'} transition-opacity`} 
      data-name="arrow"
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

function Arrow1({ disabled = false, onClick }: { disabled?: boolean; onClick?: () => void }) {
  return (
    <div 
      className={`size-7 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'} transition-opacity`} 
      data-name="arrow"
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

interface NavigationArrowsProps {
  disabled?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function NavigationArrows({ disabled = false, onPrevious, onNext }: NavigationArrowsProps) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <Arrow disabled={disabled} onClick={onPrevious} />
      <Arrow1 disabled={disabled} onClick={onNext} />
    </div>
  );
}