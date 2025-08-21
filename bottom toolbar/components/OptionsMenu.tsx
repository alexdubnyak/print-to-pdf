import svgPaths from "../imports/svg-atccxy6td3";

interface OptionsMenuProps {
  onRename?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onClose?: () => void;
}

function Icons() {
  return (
    <div className="relative shrink-0 size-4" data-name="icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icons">
          <path d={svgPaths.p20d37880} fill="var(--fill-0, #808287)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function MenuItem({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.();
  };

  return (
    <div 
      className="bg-[#333538] relative shrink-0 w-full cursor-pointer hover:bg-[#404248] transition-colors" 
      data-name="menu item"
      onClick={handleClick}
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex gap-3 items-center justify-start p-[8px] relative w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

function Icons1() {
  return (
    <div className="relative shrink-0 size-4" data-name="icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_6_129)" id="icons">
          <g id="icon">
            <path clipRule="evenodd" d={svgPaths.p35c37c40} fill="var(--fill-0, #808287)" fillRule="evenodd" />
            <path d={svgPaths.p21ab8700} fill="var(--fill-0, #808287)" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_6_129">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icons2() {
  return (
    <div className="relative shrink-0 size-4" data-name="icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icons">
          <g id="icon">
            <path d="M6 13H5V7H6V13Z" fill="var(--fill-0, #808287)" />
            <path d="M8.5 13H7.5V7H8.5V13Z" fill="var(--fill-0, #808287)" />
            <path d="M11 13H10V7H11V13Z" fill="var(--fill-0, #808287)" />
            <path clipRule="evenodd" d={svgPaths.p289fc700} fill="var(--fill-0, #808287)" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icons3() {
  return (
    <div className="relative shrink-0 size-4" data-name="icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icons">
          <path d={svgPaths.p3f492980} fill="var(--fill-0, #808287)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Icons4() {
  return (
    <div className="relative shrink-0 size-4" data-name="icons">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="icons">
          <path d="M12.8 4.8H3.2L8 12L12.8 4.8Z" fill="var(--fill-0, #808287)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

export default function OptionsMenu({
  onRename,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onClose
}: OptionsMenuProps) {
  const handleMenuItemClick = (callback?: () => void, action?: string) => {
    console.log("OptionsMenu:", action);
    callback?.();
    // Меню закрывается автоматически при перемещении листов или по клику вне
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    // Предотвращаем всплытие события, чтобы клик внутри меню не закрывал его
    e.stopPropagation();
  };

  return (
    <div 
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-[120px] bg-[#333538] border border-[#525559] shadow-lg z-[100]"
      onClick={handleMenuClick}
    >
      <MenuItem onClick={() => handleMenuItemClick(onRename, "rename")}>
        <Icons />
        <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c3c3c3] text-[12px] text-nowrap tracking-[0.36px]">
          <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">Rename</p>
        </div>
      </MenuItem>
      
      <MenuItem onClick={() => handleMenuItemClick(onDuplicate, "duplicate")}>
        <Icons1 />
        <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c3c3c3] text-[12px] text-nowrap tracking-[0.36px]">
          <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">Duplicate</p>
        </div>
      </MenuItem>
      
      <div className="bg-[#333538] relative shrink-0 w-full" data-name="menu item">
        <div
          aria-hidden="true"
          className="absolute border-[#525559] border-[1px_0px] border-solid inset-0 pointer-events-none"
        />
        <MenuItem onClick={() => handleMenuItemClick(onDelete, "delete")}>
          <Icons2 />
          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c3c3c3] text-[12px] text-nowrap tracking-[0.36px]">
            <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">Delete</p>
          </div>
        </MenuItem>
      </div>
      
      <MenuItem onClick={() => handleMenuItemClick(onMoveUp, "moveUp")}>
        <Icons3 />
        <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c3c3c3] text-[12px] text-nowrap tracking-[0.36px]">
          <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">Move Up</p>
        </div>
      </MenuItem>
      
      <MenuItem onClick={() => handleMenuItemClick(onMoveDown, "moveDown")}>
        <Icons4 />
        <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#c3c3c3] text-[12px] text-nowrap tracking-[0.36px]">
          <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">Move Down</p>
        </div>
      </MenuItem>
    </div>
  );
}