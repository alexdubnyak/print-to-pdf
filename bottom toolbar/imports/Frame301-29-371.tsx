import svgPaths from "./svg-oknp7wxe72";

function XenonAtomIconPanelManage() {
  return (
    <div className="absolute bottom-[3.75%] left-0 right-0 top-0" data-name="Xenon/Atom/Icon/PanelManage">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 17">
        <g id="Xenon/Atom/Icon/PanelManage">
          <path
            clipRule="evenodd"
            d={svgPaths.p9d6fe80}
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

function Component66() {
  return (
    <div className="bg-[#1e2023] relative shrink-0 size-[39px]" data-name="Component 66">
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
          <path d={svgPaths.p3b954280} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p23340f00} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p2b945000} fill="var(--fill-0, white)" id="Vector_6" />
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

function Component67() {
  return (
    <div className="bg-[#1e2023] relative shrink-0 size-[39px]" data-name="Component 66">
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

export default function Frame301() {
  return (
    <div className="box-border content-stretch flex items-center justify-start p-0 relative size-full">
      <Component66 />
      <Component67 />
    </div>
  );
}