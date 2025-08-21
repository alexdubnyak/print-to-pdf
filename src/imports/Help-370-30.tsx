import svgPaths from "./svg-snkfn2a75m";

function Group() {
  return (
    <div
      className="absolute inset-[18.75%_31.25%_12.5%_31.25%]"
      data-name="Group"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 6 11"
      >
        <g id="Group">
          <path
            d={svgPaths.p204a2f00}
            fill="var(--fill-0, #CFCFCF)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

export default function Help() {
  return (
    <div className="relative size-full" data-name="help">
      <Group />
    </div>
  );
}