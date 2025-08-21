import { useEffect, useMemo, useState } from "react";
import NavigationButtons from "./navigation-buttons";
import SnapControls from "./snap-controls";

interface Tab {
  id: string;
  label: string;
  isActive?: boolean;
  hasCloseButton?: boolean;
}

interface BottomToolbarProps {
  tabs?: Tab[];
  onTabClick?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
  onSheetsManagerToggle?: () => void;
  onPanelManage?: () => void;
  onSnapOptions?: () => void;
  onSnapClick?: (snapType: string) => void;
  snapStates?: {
    snap: boolean;
    grid: boolean;
    ortho: boolean;
    polar: boolean;
    esnap: boolean;
    etrack: boolean;
    lweight: boolean;
  };
}

function Frame300({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      className="h-[39px] relative shrink-0 w-[43.5px] cursor-pointer hover:bg-[#1e2023] transition-colors"
      onClick={onClick}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 39">
        <g id="Frame 300">
          <rect fill="#141518" height="39" width="43.5" />
          <g transform="translate(14, 14)">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
              <path d="M16 11H0V0H16V11ZM1 10H10V5H15V1H1V10Z" fill="white"/>
            </svg>
          </g>
          {/* Треугольник в правом нижнем углу с отступом 4px */}
          <g transform="translate(33.5, 29)">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
              <path d="M6 6H0L6 0V6Z" fill="white"/>
            </svg>
          </g>
        </g>
      </svg>
    </div>
  );
}

function CloseIcon({ onClick }: { onClick?: (e?: React.MouseEvent) => void }) {
  return (
    <div 
      className="absolute bottom-1 right-1 size-1.5 cursor-pointer" 
      onClick={onClick}
      data-name="Component 69"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
        <path d="M6 6H0L6 0V6Z" fill="white" />
      </svg>
    </div>
  );
}

function TabComponent({ 
  tab, 
  onClick, 
  onClose 
}: { 
  tab: Tab; 
  onClick?: () => void; 
  onClose?: () => void; 
}) {
  const isActive = tab.isActive;
  
  return (
    <div
      className={`box-border content-stretch flex gap-2.5 h-[39px] items-center justify-center p-[10px] relative shrink-0 w-[98px] cursor-pointer ${
        isActive ? "bg-[#1e2023]" : "bg-[#141518]"
      }`}
      data-name="tab"
      onClick={onClick}
    >
      {isActive && (
        <div
          aria-hidden="true"
          className="absolute border-[#2c4a93] border-[0px_0px_4px] border-solid inset-0 pointer-events-none"
        />
      )}
      <div
        className={`font-['Noto_Sans:Display_SemiBold',_sans-serif] font-semibold leading-[0] relative shrink-0 text-[12px] text-nowrap tracking-[0.48px] ${
          isActive ? "text-[#ffffff]" : "text-[#cfcfcf]"
        }`}
        style={{ fontVariationSettings: "'CTGR' 100, 'wdth' 100" }}
      >
        <p className="adjustLetterSpacing block leading-[16px] whitespace-pre">{tab.label}</p>
      </div>
      {tab.hasCloseButton && (
        <CloseIcon onClick={(e) => {
          e?.stopPropagation();
          onClose?.();
        }} />
      )}
    </div>
  );
}

export default function BottomToolbar({ 
  tabs = [],
  onTabClick,
  onTabClose,
  onSheetsManagerToggle,
  onPanelManage,
  onSnapOptions,
  onSnapClick,
  snapStates
}: BottomToolbarProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Разделяем табы на статичные (Model) и динамические (Sheets) с помощью useMemo
  const staticTabs = useMemo(() => tabs.filter(tab => tab.id === 'model'), [tabs]);
  const sheetTabs = useMemo(() => tabs.filter(tab => tab.id !== 'model'), [tabs]);
  
  // Определяем количество видимых sheet-табов динамически:
  // - Если sheet-табов <= 3: показываем максимум 2
  // - Если sheet-табов > 3: показываем 3 (режим скролла)
  const maxVisibleSheetTabs = useMemo(() => 
    sheetTabs.length > 3 ? 3 : Math.min(sheetTabs.length, 2), 
    [sheetTabs.length]
  );

  // Автоматически прокручиваем к активному sheet-табу (убираем currentSlideIndex из зависимостей)
  useEffect(() => {
    const activeSheetIndex = sheetTabs.findIndex(tab => tab.isActive);
    if (activeSheetIndex !== -1) {
      // Если активный sheet-таб не виден, прокручиваем к нему
      setCurrentSlideIndex(prevIndex => {
        if (activeSheetIndex < prevIndex || activeSheetIndex >= prevIndex + maxVisibleSheetTabs) {
          return Math.max(0, Math.min(activeSheetIndex, sheetTabs.length - maxVisibleSheetTabs));
        }
        return prevIndex;
      });
    }
  }, [sheetTabs, maxVisibleSheetTabs]);

  // Получаем видимые sheet-табы с помощью useMemo
  const visibleSheetTabs = useMemo(() => 
    sheetTabs.slice(currentSlideIndex, currentSlideIndex + maxVisibleSheetTabs),
    [sheetTabs, currentSlideIndex, maxVisibleSheetTabs]
  );
  
  // Проверяем, можем ли мы листать sheet-табы с помощью useMemo
  const canGoPrevious = useMemo(() => currentSlideIndex > 0, [currentSlideIndex]);
  const canGoNext = useMemo(() => 
    currentSlideIndex + maxVisibleSheetTabs < sheetTabs.length,
    [currentSlideIndex, maxVisibleSheetTabs, sheetTabs.length]
  );
  const shouldShowNavigation = useMemo(() => 
    sheetTabs.length > maxVisibleSheetTabs,
    [sheetTabs.length, maxVisibleSheetTabs]
  );

  const handlePrevious = () => {
    if (canGoPrevious) {
      const newIndex = Math.max(0, currentSlideIndex - 1);
      setCurrentSlideIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      const newIndex = Math.min(sheetTabs.length - maxVisibleSheetTabs, currentSlideIndex + 1);
      setCurrentSlideIndex(newIndex);
    }
  };

  const handleTabClick = (tabId: string) => {
    onTabClick?.(tabId);
  };

  const handleTabClose = (tabId: string) => {
    onTabClose?.(tabId);
    
    // Корректируем индекс слайдера после закрытия sheet-таба
    const newSheetTabsLength = sheetTabs.length - 1;
    if (newSheetTabsLength <= maxVisibleSheetTabs) {
      setCurrentSlideIndex(0);
    } else if (currentSlideIndex > newSheetTabsLength - maxVisibleSheetTabs) {
      setCurrentSlideIndex(Math.max(0, newSheetTabsLength - maxVisibleSheetTabs));
    }
  };

  return (
    <div
      className="box-border content-stretch flex gap-px items-start justify-between p-0 relative w-full h-[39px]"
      data-name="bottom toolbar"
    >
      {/* Left section with Frame300 and tabs */}
      <div className="flex gap-px items-start">
        <Frame300 onClick={onSheetsManagerToggle} />
        <div
          className="box-border content-stretch flex gap-px items-center justify-start p-0 relative shrink-0"
          data-name="Component 70"
        >
          {/* Всегда показываем статичные табы (Model) */}
          {staticTabs.map((tab) => (
            <TabComponent
              key={tab.id}
              tab={tab}
              onClick={() => handleTabClick(tab.id)}
              onClose={() => handleTabClose(tab.id)}
            />
          ))}
          
          {/* Показываем видимые sheet-табы через слайдер */}
          {visibleSheetTabs.map((tab) => (
            <TabComponent
              key={tab.id}
              tab={tab}
              onClick={() => handleTabClick(tab.id)}
              onClose={() => handleTabClose(tab.id)}
            />
          ))}
        </div>
        
        {/* Navigation buttons - прилеплены к блоку табов */}
        <NavigationButtons
          onPrevious={shouldShowNavigation ? handlePrevious : undefined}
          onNext={shouldShowNavigation ? handleNext : undefined}
          canGoPrevious={shouldShowNavigation && canGoPrevious}
          canGoNext={shouldShowNavigation && canGoNext}
          showNavigation={shouldShowNavigation}
          onPanelManage={onPanelManage}
          onSnapOptions={onSnapOptions}
        />
      </div>

      {/* Right section with Snap Controls */}
      <div className="h-full">
        <SnapControls onSnapClick={onSnapClick} snapStates={snapStates} />
      </div>
    </div>
  );
}