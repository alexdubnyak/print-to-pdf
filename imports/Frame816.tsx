function Frame473() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-1.5 py-2.5 relative shrink-0">
      <div
        aria-hidden="true"
        className="absolute border-[#1e2023] border-[0px_0px_2px] border-solid inset-0 pointer-events-none"
      />
      <div className="font-['Open_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#e3e5ea] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Quick print</p>
      </div>
    </div>
  );
}

function Frame474() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-1.5 py-2.5 relative shrink-0">
      <div
        aria-hidden="true"
        className="absolute border-[#ffffff] border-[0px_0px_2px] border-solid inset-0 pointer-events-none"
      />
      <div className="font-['Open_Sans:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">{`Advanced print `}</p>
      </div>
    </div>
  );
}

function Frame475() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0">
      <Frame473 />
      <Frame474 />
    </div>
  );
}

function Frame392() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-end justify-start p-0 relative shrink-0 w-full">
      <div
        aria-hidden="true"
        className="absolute border-[#1e2023] border-[0px_0px_2px] border-solid inset-0 pointer-events-none"
      />
      <Frame475 />
    </div>
  );
}

export default function Frame816() {
  return (
    <div className="relative size-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-5 py-0 relative size-full">
          <Frame392 />
        </div>
      </div>
    </div>
  );
}