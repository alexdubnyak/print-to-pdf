export function NoPreview() {
  return (
    <div className="bg-[#1e2023] box-border content-stretch flex flex-col gap-5 items-center justify-center p-0 relative size-full">
      <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          No preview available
        </p>
      </div>
    </div>
  );
}