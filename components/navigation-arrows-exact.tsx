import svgPaths from "../imports/svg-1kxprmrpb3";

interface NavigationArrowsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  className?: string;
}

export function NavigationArrowsExact({
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = true,
  className = ""
}: NavigationArrowsProps) {
  
  function ArrowLeft({ disabled = false }: { disabled?: boolean }) {
    return (
      <div 
        className={`absolute left-0 size-7 top-0 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}`} 
        data-name="arrow"
        onClick={disabled ? undefined : onPrevious}
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 28"
        >
          <g id="arrow">
            <path 
              d={svgPaths.p8dea80} 
              fill="var(--fill-0, #8E8F90)" 
              id="Union" 
            />
          </g>
        </svg>
      </div>
    );
  }

  function ArrowRight({ disabled = false }: { disabled?: boolean }) {
    return (
      <div 
        className={`absolute left-8 size-7 top-0 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}`} 
        data-name="arrow"
        onClick={disabled ? undefined : onNext}
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

  return (
    <div className={`relative w-[64px] h-7 ${className}`}>
      <ArrowLeft disabled={!hasPrevious} />
      <ArrowRight disabled={!hasNext} />
    </div>
  );
}