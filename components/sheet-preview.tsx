import svgPaths from "../imports/svg-uo6jg4qcws";

interface SheetPreviewProps {
  image: string;
  sheetName: string;
  widthMm: string;
  heightMm: string;
}

export function SheetPreview({ image, sheetName, widthMm, heightMm }: SheetPreviewProps) {
  // Determine background settings based on sheet name/dimensions
  const getBackgroundSettings = () => {
    // Sheet 1: 707x500mm (horizontal layout)
    if (widthMm === '707' && heightMm === '500') {
      return {
        backgroundSize: '167.12% 118.26%',
        backgroundPosition: '52.7% 33.61%'
      };
    }
    // Sheet 2: 841x594mm (A1 format - vertical layout)
    if (widthMm === '841' && heightMm === '594') {
      return {
        backgroundSize: '140% 95%',
        backgroundPosition: '50% 45%'
      };
    }
    // Default fallback
    return {
      backgroundSize: 'contain',
      backgroundPosition: 'center'
    };
  };

  const backgroundSettings = getBackgroundSettings();

  return (
    <div className="h-[251.296px] relative shrink-0 w-[323.5px]">
      <div className="absolute flex h-[251.281px] items-center justify-center left-[-0.45px] top-[0.434px] w-[324.391px]">
        <div className="flex-none rotate-[270deg]">
          <div className="h-[324.401px] w-[251.296px]" style={{ backgroundColor: 'var(--color-white)' }} />
        </div>
      </div>
      <div className="absolute flex h-[239.406px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[310.703px] sheet-preview-center-1">
        <div className="flex-none rotate-[270deg]">
          <div className="h-[310.707px] relative w-[239.417px]" style={{ backgroundColor: 'var(--color-white)' }}>
            <div className="absolute border-[0.456903px] border-dashed inset-0 pointer-events-none" style={{ borderColor: 'var(--color-border-muted)' }} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[214.734px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[286.938px] sheet-preview-center-2">
        <div className="flex-none rotate-[270deg]">
          <div className="h-[286.948px] relative w-[214.744px]" style={{ backgroundColor: 'var(--color-white)' }}>
            <div className="absolute border-[0.456903px] border-solid inset-0 pointer-events-none" style={{ borderColor: 'var(--color-black)' }} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[15.531px] items-center justify-center left-[0.463px] top-[-16.015px] w-[0px]">
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[15.535px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-0.914px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16 1"
              >
                <line
                  id="Line 12"
                  stroke="var(--color-text-light, #D5D7E1)"
                  strokeWidth="0.913805"
                  x2="15.5347"
                  y1="0.543097"
                  y2="0.543097"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[15.531px] items-center justify-center left-[323.95px] top-[-16.015px] w-[0px]">
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[15.535px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-0.914px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16 1"
              >
                <line
                  id="Line 12"
                  stroke="var(--color-text-light, #D5D7E1)"
                  strokeWidth="0.913805"
                  x2="15.5347"
                  y1="0.543097"
                  y2="0.543097"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic text-[9.13805px] text-left text-nowrap top-[-15.535px] sheet-label-position" style={{ color: 'var(--color-text-light)' }}>
        <p className="block leading-[normal] whitespace-pre">{widthMm} mm</p>
      </div>
      <div className="absolute flex h-[33px] items-center justify-center top-[106.435px] w-[10.5px] sheet-dimension-position">
        <div className="flex-none rotate-[90deg]">
          <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative text-[9.13805px] text-left text-nowrap" style={{ color: 'var(--color-text-light)' }}>
            <p className="block leading-[normal] whitespace-pre">{heightMm} mm</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[0.914px] left-[1.377px] top-[-7.767px] w-[134.329px]">
        <div className="absolute bottom-[-268.198%] left-[-0.34%] right-0 top-[-368.198%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 136 8"
          >
            <path
              d={svgPaths.p38025800}
              fill="var(--color-text-light, #D5D7E1)"
              id="Line 14"
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[186.88px] top-[-7.767px] w-[135.243px]">
        <div className="absolute bottom-[-3.365px] left-0 right-[-0.338%] top-[-3.365px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 136 8"
          >
            <path
              d={svgPaths.p3fa11600}
              fill="var(--color-text-light, #D5D7E1)"
              id="Line 15"
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[324.864px] top-[1.828px] w-[11.88px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-0.914px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 12 1"
          >
            <line
              id="Line 16"
              stroke="var(--color-text-light, #D5D7E1)"
              strokeWidth="0.913805"
              x2="11.8795"
              y1="0.543097"
              y2="0.543097"
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[324.864px] top-[251.296px] w-[11.88px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-0.914px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 12 1"
          >
            <line
              id="Line 16"
              stroke="var(--color-text-light, #D5D7E1)"
              strokeWidth="0.913805"
              x2="11.8795"
              y1="0.543097"
              y2="0.543097"
            />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[95.938px] items-center justify-center left-[330.804px] top-[1.828px] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[95.95px]">
            <div className="absolute bottom-[-3.365px] left-[-0.476%] right-0 top-[-3.365px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 97 8"
              >
                <path
                  d={svgPaths.pd5ba200}
                  fill="var(--color-text-light, #D5D7E1)"
                  id="Line 18"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[95.938px] items-center justify-center left-[330.804px] top-[152.605px] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[95.95px]">
            <div className="absolute bottom-[-3.365px] left-0 right-[-0.476%] top-[-3.365px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 97 8"
              >
                <path
                  d={svgPaths.pf09200}
                  fill="var(--stroke-0, white)"
                  id="Line 19"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute bg-no-repeat h-[152.605px] translate-x-[-50%] translate-y-[-50%] w-[88.182px] sheet-preview-image bg-dynamic-image"
        data-name="sheet-image"
        style={{ 
          '--bg-image': `url('${image}')`,
          backgroundSize: backgroundSettings.backgroundSize,
          backgroundPosition: backgroundSettings.backgroundPosition
        } as React.CSSProperties}
      />
      <div className="absolute font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] left-[144.388px] not-italic text-[10.9657px] text-left text-nowrap top-[-37.923px]" style={{ color: 'var(--color-text-light)' }}>
        <p className="block leading-[normal] whitespace-pre">{sheetName}</p>
      </div>
    </div>
  );
}