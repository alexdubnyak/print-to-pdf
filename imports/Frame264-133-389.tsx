import svgPaths from "./svg-1kxprmrpb3";

function Arrow() {
  return (
    <div className="absolute left-0 size-7 top-0" data-name="arrow">
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

function Arrow1() {
  return (
    <div className="absolute left-8 size-7 top-0" data-name="arrow">
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

export default function Frame264() {
  return (
    <div className="relative size-full">
      <Arrow />
      <Arrow1 />
    </div>
  );
}