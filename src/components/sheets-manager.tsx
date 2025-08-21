import { useEffect, useRef, useState } from "react";
import svgPaths from "../imports/svg-e1fm0ahvew";
import OptionsMenu from "./options-menu";

interface Sheet {
  id: string;
  name: string;
  isActive?: boolean;
}

interface SheetsManagerProps {
  sheets?: Sheet[];
  onSheetSelect?: (sheetId: string) => void;
  onSheetOptions?: (sheetId: string) => void;
  onEditLayout?: (sheetId: string) => void;
  onNewSheet?: () => void;
  onDeleteSheet?: () => void;
  onNewLayout?: () => void;
  onSheetMoveUp?: () => void;
  onSheetMoveDown?: () => void;
}

function Frame282() {
  return (
    <div className="h-[15px] relative shrink-0 w-3.5">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
        <g id="Frame 282">
          <path d={svgPaths.p25334e00} fill="var(--fill-0, white)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Component66({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="bg-[#1e2023] box-border content-stretch flex gap-2.5 items-center justify-center p-0 relative shrink-0 size-[26px] z-[3] cursor-pointer hover:bg-[#2a2d31] transition-colors"
      data-name="Component 66"
      onClick={onClick}
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#000000] border-solid inset-[-1px] pointer-events-none"
      />
      <Frame282 />
    </div>
  );
}

function Frame281() {
  return (
    <div className="absolute box-border content-stretch flex items-center justify-between left-1 p-0 top-1.5 w-1.5">
      <div className="bg-white h-1.5 rounded-[1px] shrink-0 w-px" />
      <div className="bg-white h-1.5 rounded-[1px] shrink-0 w-px" />
      <div className="bg-white h-1.5 rounded-[1px] shrink-0 w-px" />
    </div>
  );
}

function Frame286() {
  return (
    <div className="h-[15px] relative shrink-0 w-3.5">
      <div className="absolute h-[11px] left-0.5 rounded-bl-[1px] rounded-br-[1px] top-1 w-2.5">
        <div
          aria-hidden="true"
          className="absolute border border-white border-solid inset-[-0.5px] pointer-events-none rounded-bl-[1.5px] rounded-br-[1.5px]"
        />
      </div>
      <Frame281 />
      <div className="absolute bg-white h-px left-0 rounded-[1px] top-[3px] w-3.5" />
      <div className="absolute h-1 left-1 top-0 w-1.5">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 4">
          <path d={svgPaths.p3e176d00} id="Rectangle 22" stroke="var(--stroke-0, white)" />
        </svg>
      </div>
    </div>
  );
}

function Component67({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="bg-[#1e2023] box-border content-stretch flex gap-2.5 items-center justify-center p-0 relative shrink-0 size-[26px] z-[2] cursor-pointer hover:bg-[#2a2d31] transition-colors"
      data-name="Component 66"
      onClick={onClick}
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#000000] border-solid inset-[-1px] pointer-events-none"
      />
      <Frame286 />
    </div>
  );
}

function NewLayout() {
  return (
    <div className="relative shrink-0 size-4" data-name="new_layout">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="new_layout">
          <path
            d="M10 1.5L13.5 5"
            id="Vector"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d={svgPaths.p221e0200} fill="var(--fill-0, white)" id="Vector_2" />
          <g id="Group">
            <path d={svgPaths.p7f64a80} fill="var(--fill-0, white)" id="Vector_3" />
          </g>
          <rect fill="var(--fill-0, white)" height="1" id="Rectangle 16" width="2" x="11" y="14" />
        </g>
      </svg>
    </div>
  );
}

function Component68({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="bg-[#1e2023] box-border content-stretch flex gap-2.5 items-center justify-center p-[10px] relative shrink-0 size-7 z-[1] cursor-pointer hover:bg-[#2a2d31] transition-colors"
      data-name="Component 68"
      onClick={onClick}
    >
      <div
        aria-hidden="true"
        className="absolute border-[#000000] border-[0.8px] border-solid inset-0 pointer-events-none"
      />
      <NewLayout />
    </div>
  );
}



function Frame283({ onNewSheet, onDeleteSheet, onNewLayout }: { onNewSheet?: () => void; onDeleteSheet?: () => void; onNewLayout?: () => void }) {
  return (
    <div className="box-border content-stretch flex gap-[7px] isolate items-center justify-start p-0 relative shrink-0 w-full z-[1]">
      <Component66 onClick={onNewSheet} />
      <Component67 onClick={onDeleteSheet} />
      <Component68 onClick={onNewLayout} />
    </div>
  );
}

function Frame284({ onNewSheet, onDeleteSheet, onNewLayout }: { onNewSheet?: () => void; onDeleteSheet?: () => void; onNewLayout?: () => void }) {
  return (
    <div className="bg-[#141518] relative shrink-0 w-full z-[2]">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 isolate items-start justify-start p-[10px] relative w-full">
          <div className="font-['Open_Sans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-nowrap tracking-[0.36px] z-[2]">
            <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">SHEETS MANAGER</p>
          </div>
          <Frame283 onNewSheet={onNewSheet} onDeleteSheet={onDeleteSheet} onNewLayout={onNewLayout} />
        </div>
      </div>
    </div>
  );
}

function SheetItem({ 
  sheet, 
  onSelect, 
  onOptions, 
  onEditLayout,
  showOptionsMenu,
  onOptionsMenuClose,
  onSheetRename,
  onSheetDuplicate,
  onSheetDelete,
  onSheetMoveUp,
  onSheetMoveDown
}: { 
  sheet: Sheet; 
  onSelect?: () => void; 
  onOptions?: (sheetId: string, buttonElement: HTMLDivElement) => void; 
  onEditLayout?: () => void;
  showOptionsMenu?: boolean;
  onOptionsMenuClose?: () => void;
  onSheetRename?: (sheetId: string) => void;
  onSheetDuplicate?: (sheetId: string) => void;
  onSheetDelete?: (sheetId: string) => void;
  onSheetMoveUp?: (sheetId: string) => void;
  onSheetMoveDown?: (sheetId: string) => void;
}) {
  const isActive = sheet.isActive;
  
  return (
    <div className={`h-9 relative shrink-0 w-full ${isActive ? "bg-[#306ed1]" : "bg-[#1e2023]"}`}>
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex h-9 items-center justify-between px-[10px] py-1.5 relative w-full">
          <div className="basis-0 box-border content-stretch flex gap-0.5 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
            <div 
              className="basis-0 box-border content-stretch flex flex-col grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0 cursor-pointer"
              onClick={onSelect}
            >
              <div
                className={`[text-shadow:#295aa8_0px_-0.8px_0.3px] font-['Noto_Sans:Display_SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[#ffffff] text-[11px] text-nowrap tracking-[0.44px]`}
                style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}
              >
                <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">{sheet.name}</p>
              </div>
            </div>
            <div className={`box-border content-stretch flex gap-1 items-start justify-start p-0 relative shrink-0 ${!isActive ? "opacity-0" : ""}`}>
              <div 
                className={`box-border content-stretch flex gap-2.5 items-center justify-center px-1.5 py-1 relative shrink-0 cursor-pointer ${
                  isActive ? "bg-[#306ed1]" : "bg-[#1e2023]"
                }`}
                onClick={(e) => onOptions?.(sheet.id, e.currentTarget)}
              >
                <div aria-hidden="true" className={`absolute border ${isActive ? "border-[#ffffff]" : "border-[#000000]"} border-solid inset-0 pointer-events-none`} />
                <div className={`font-['Open_Sans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[9px] text-nowrap tracking-[0.27px] ${
                  isActive ? "text-[#ffffff]" : "text-[#808287]"
                }`}>
                  <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">OPTIONS</p>
                </div>
              </div>
              <div 
                className={`box-border content-stretch flex gap-2.5 items-center justify-center px-1.5 py-1 relative shrink-0 cursor-pointer ${
                  isActive ? "bg-[#306ed1]" : "bg-[#1e2023]"
                }`}
                onClick={onEditLayout}
              >
                <div aria-hidden="true" className={`absolute border ${isActive ? "border-[#ffffff]" : "border-[#000000]"} border-solid inset-0 pointer-events-none`} />
                <div className={`font-['Open_Sans:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[9px] text-nowrap tracking-[0.27px] uppercase ${
                  isActive ? "text-[#ffffff]" : "text-[#808287]"
                }`}>
                  <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">Edit layout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  );
}

function Component65({ 
  sheets, 
  onSheetSelect, 
  onSheetOptions, 
  onEditLayout,
  activeOptionsSheetId,
  onOptionsMenuClose,
  onSheetRename,
  onSheetDuplicate,
  onSheetDelete,
  onSheetMoveUp,
  onSheetMoveDown
}: { 
  sheets: Sheet[]; 
  onSheetSelect?: (sheetId: string) => void; 
  onSheetOptions?: (sheetId: string, buttonElement: HTMLDivElement) => void; 
  onEditLayout?: (sheetId: string) => void;
  activeOptionsSheetId?: string | null;
  onOptionsMenuClose?: () => void;
  onSheetRename?: (sheetId: string) => void;
  onSheetDuplicate?: (sheetId: string) => void;
  onSheetDelete?: (sheetId: string) => void;
  onSheetMoveUp?: (sheetId: string) => void;
  onSheetMoveDown?: (sheetId: string) => void;
}) {
  const needsScroll = sheets.length > 8;
  const maxHeight = needsScroll ? '288px' : 'auto'; // 8 листов × 36px = 288px
  const overflowClass = needsScroll ? 'overflow-y-auto' : 'overflow-y-visible';
  
  // Touch and pointer event handlers for better tablet/stylus support
  const handleTouchStart = (e: React.TouchEvent) => {
    if (needsScroll) {
      // Allow touch scrolling - don't prevent default
      e.stopPropagation();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (needsScroll) {
      // Allow vertical scrolling, prevent horizontal
      const touch = e.touches[0];
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      
      // If touch is within the scrollable area, allow scrolling
      if (touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        e.stopPropagation();
      }
    }
  };

  // Pointer events for stylus devices like Wacom tablets
  const handlePointerDown = (e: React.PointerEvent) => {
    if (needsScroll && (e.pointerType === 'pen' || e.pointerType === 'touch')) {
      // Allow scrolling for pen/touch input
      e.stopPropagation();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (needsScroll && (e.pointerType === 'pen' || e.pointerType === 'touch')) {
      // Allow vertical scrolling for stylus/touch
      e.stopPropagation();
    }
  };
  
  return (
    <div
      className={`box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full z-[1] ${overflowClass}`}
      style={{ 
        maxHeight,
        touchAction: needsScroll ? 'pan-y' : 'auto',
        WebkitOverflowScrolling: needsScroll ? 'touch' : 'auto',
        overscrollBehavior: needsScroll ? 'contain' : 'auto'
      }}
      data-name="Component 65"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      {sheets.map((sheet) => (
        <SheetItem
          key={sheet.id}
          sheet={sheet}
          onSelect={() => onSheetSelect?.(sheet.id)}
          onOptions={onSheetOptions}
          onEditLayout={() => onEditLayout?.(sheet.id)}
          showOptionsMenu={activeOptionsSheetId === sheet.id}
          onOptionsMenuClose={onOptionsMenuClose}
          onSheetRename={onSheetRename}
          onSheetDuplicate={onSheetDuplicate}
          onSheetDelete={onSheetDelete}
          onSheetMoveUp={onSheetMoveUp}
          onSheetMoveDown={onSheetMoveDown}
        />
      ))}
    </div>
  );
}

export default function SheetsManager({
  sheets = [],
  onSheetSelect,
  onSheetOptions,
  onEditLayout,
  onNewSheet,
  onDeleteSheet,
  onNewLayout,
  onSheetMoveUp,
  onSheetMoveDown
}: SheetsManagerProps) {
  const [activeOptionsSheetId, setActiveOptionsSheetId] = useState<string | null>(null);
  const [optionsMenuPosition, setOptionsMenuPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsButtonRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleSheetOptions = (sheetId: string, buttonElement: HTMLDivElement) => {
    if (activeOptionsSheetId === sheetId) {
      setActiveOptionsSheetId(null);
    } else {
      const buttonRect = buttonElement.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      
      if (containerRect) {
        // Вычисляем позицию относительно контейнера SheetsManager
        const relativeX = buttonRect.left - containerRect.left;
        const relativeY = buttonRect.top - containerRect.top;
        
        const menuHeight = 160;
        const menuY = relativeY - menuHeight - 5; // Всегда показывать сверху с отступом 5px
        
        setOptionsMenuPosition({
          x: relativeX,
          y: menuY,
        });
      }
      setActiveOptionsSheetId(sheetId);
    }
    onSheetOptions?.(sheetId);
  };

  const handleOptionsMenuClose = () => {
    setActiveOptionsSheetId(null);
  };

  const handleSheetRename = (sheetId: string) => {
    console.log("Rename sheet:", sheetId);
    // Здесь будет логика переименования листа
  };

  const handleSheetDuplicate = (sheetId: string) => {
    console.log("Duplicate sheet:", sheetId);
    // Здесь будет логика дублирования листа
  };

  const handleSheetDelete = (sheetId: string) => {
    console.log("Delete sheet:", sheetId);
    // Здесь будет логика удаления листа
  };

  const handleSheetMoveUp = (sheetId: string) => {
    console.log("SheetsManager handleSheetMoveUp called for:", sheetId);
    onSheetMoveUp?.();
    // Закрываем меню при перемещении, так как позиция кнопки изменится
    setActiveOptionsSheetId(null);
  };

  const handleSheetMoveDown = (sheetId: string) => {
    console.log("SheetsManager handleSheetMoveDown called for:", sheetId);
    onSheetMoveDown?.();
    // Закрываем меню при перемещении, так как позиция кнопки изменится
    setActiveOptionsSheetId(null);
  };

  // Закрывать меню при клике вне SheetsManager
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveOptionsSheetId(null);
      }
    };

    if (activeOptionsSheetId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeOptionsSheetId]);

  // Закрывать меню при изменении порядка листов
  useEffect(() => {
    if (activeOptionsSheetId) {
      setActiveOptionsSheetId(null);
    }
  }, [sheets.map(sheet => sheet.id).join(',')]);

  return (
    <div 
      ref={containerRef}
      className="box-border content-stretch flex flex-col isolate items-center justify-start p-0 relative w-[250px] overflow-visible"
    >
      <Frame284 onNewSheet={onNewSheet} onDeleteSheet={onDeleteSheet} onNewLayout={onNewLayout} />
      <Component65 
        sheets={sheets}
        onSheetSelect={onSheetSelect}
        onSheetOptions={handleSheetOptions}
        onEditLayout={onEditLayout}
        activeOptionsSheetId={activeOptionsSheetId}
        onOptionsMenuClose={handleOptionsMenuClose}
        onSheetRename={handleSheetRename}
        onSheetDuplicate={handleSheetDuplicate}
        onSheetDelete={handleSheetDelete}
        onSheetMoveUp={handleSheetMoveUp}
        onSheetMoveDown={handleSheetMoveDown}
      />

      {/* Options Menu positioned relative to container */}
      {activeOptionsSheetId && (
        <div
          className="absolute z-[9999]"
          style={{
            left: optionsMenuPosition.x,
            top: optionsMenuPosition.y,
          }}
        >
          <OptionsMenu
            onRename={() => handleSheetRename(activeOptionsSheetId)}
            onDuplicate={() => handleSheetDuplicate(activeOptionsSheetId)}
            onDelete={() => handleSheetDelete(activeOptionsSheetId)}
            onMoveUp={() => handleSheetMoveUp(activeOptionsSheetId)}
            onMoveDown={() => handleSheetMoveDown(activeOptionsSheetId)}
            onClose={handleOptionsMenuClose}
          />
        </div>
      )}
    </div>
  );
}