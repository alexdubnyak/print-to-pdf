import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import imgImage22 from '../assets/0fc685cd8f14f838f09ada3b1204362f5d241faf.png';
import imgImage3 from '../assets/4f0bad069f1a79526d8fca7a1265e757a1048cd4.png';
import ScrollableRibbon from './ScrollableRibbon';
import BottomToolbar from './bottom-toolbar';
import OptionsMenu from './options-menu';
import { PageLayoutManager } from './page-layout-manager';
import { LayoutEditDialog } from './print-to-pdf-dialog';
import SheetsManager from './sheets-manager';

interface ResponsiveBackgroundProps {
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  onActiveTabChange?: (activeTab: string) => void;
  onSheetsChange?: (sheets: Array<{ id: string; name: string; isActive: boolean }>) => void;
}

/* ===== Decorative pieces (все немые) ===== */
function TabBar() {
  return (
    <div className="absolute bg-[#1e2023] h-[28px] left-0 top-[47px] w-full pointer-events-none">
      <div
        className="absolute bg-no-repeat bg-size-[337.28%_100%] bg-top-left h-[28px] left-0 top-0 w-[558px]"
        style={{ backgroundImage: `url('${imgImage3}')` }}
      />
      <div
        className="absolute bg-no-repeat bg-size-[4705%_100%] bg-top-right h-[28px] right-0 top-0 w-10"
        style={{ backgroundImage: `url('${imgImage3}')` }}
      />
    </div>
  );
}

function Frame294() {
  return (
    <div className="absolute h-[37px] left-[619px] top-[872px] w-[1487px] pointer-events-none" />
  );
}

function Header() {
  return (
    <div className="absolute bg-[#1e2023] h-[47px] left-0 top-0 w-full pointer-events-none">
      <div
        className="absolute bg-no-repeat bg-size-[476.43%_1727.66%] bg-top-right h-[47px] right-0 top-0 w-[314px]"
        style={{ backgroundImage: `url('${imgImage22}')` }}
      />
      <div
        className="absolute bg-no-repeat bg-size-[171.36%_1727.66%] bg-top-left h-[47px] left-0 top-0 w-[873px]"
        style={{ backgroundImage: `url('${imgImage22}')` }}
      />
    </div>
  );
}

function BottomToolbarWrapper({
  onActiveTabChange,
  onSheetsChange,
}: {
  onActiveTabChange?: (activeTab: string) => void;
  onSheetsChange?: (sheets: Array<{ id: string; name: string; isActive: boolean }>) => void;
}) {
  const [tabs, setTabs] = useState([
    { id: 'model', label: 'Model' },
    { id: 'sheet1', label: 'Sheet1', isActive: true, hasCloseButton: true },
    { id: 'sheet2', label: 'Sheet2', hasCloseButton: true },
    { id: 'sheet3', label: 'Sheet3', hasCloseButton: true },
    { id: 'sheet4', label: 'Sheet4', hasCloseButton: true },
    { id: 'sheet5', label: 'Sheet5', hasCloseButton: true },
  ]);

  const [sheets, setSheets] = useState([
    { id: 'sheet1', name: 'Sheet1', isActive: true },
    { id: 'sheet2', name: 'Sheet2' },
    { id: 'sheet3', name: 'Sheet3' },
    { id: 'sheet4', name: 'Sheet4' },
    { id: 'sheet5', name: 'Sheet5' },
  ]);

  const [showSheetsManager, setShowSheetsManager] = useState(false);

  // Состояние для контекстного меню табов
  const [activeContextMenuTabId, setActiveContextMenuTabId] = useState<string | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Состояние для диалогов
  const [isPageLayoutManagerOpen, setIsPageLayoutManagerOpen] = useState(false);
  const [isLayoutEditOpen, setIsLayoutEditOpen] = useState(false);
  const [editingSheetName, setEditingSheetName] = useState('');

  const [snapStates, setSnapStates] = useState({
    snap: true,
    grid: true,
    ortho: true,
    polar: true,
    esnap: true,
    etrack: true,
    lweight: true,
  });

  const handleTabClick = (tabId: string) => {
    setTabs(
      tabs.map(tab => ({
        ...tab,
        isActive: tab.id === tabId,
      }))
    );

    // Также обновляем активный лист
    const updatedSheets = sheets.map(sheet => ({
      ...sheet,
      isActive: sheet.id === tabId,
    }));
    setSheets(updatedSheets);

    // Уведомляем родительский компонент об изменении активной вкладки и sheets
    onActiveTabChange?.(tabId);
    onSheetsChange?.(updatedSheets);
  };

  const handleTabClose = (tabId: string) => {
    setTabs(tabs.filter(tab => tab.id !== tabId));
    const updatedSheets = sheets.filter(sheet => sheet.id !== tabId);
    setSheets(updatedSheets);
    onSheetsChange?.(updatedSheets);
  };

  const handleSheetsManagerToggle = () => {
    setShowSheetsManager(!showSheetsManager);
  };

  const handleTabContextMenu = (tabId: string, event: React.MouseEvent) => {
    // Только для sheet-табов, не для model
    if (tabId === 'model') return;

    const target = event.currentTarget as HTMLElement;
    const targetRect = target.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      const menuHeight = 200; // Приблизительная высота меню
      const menuWidth = 160;

      // Позиционируем меню так, чтобы его нижняя граница была ровно над верхней границей таба
      let menuX = targetRect.left;
      let menuY = targetRect.top - menuHeight; // Нижняя граница меню = верхняя граница таба

      // Корректируем позицию по X, чтобы меню не выходило за границы экрана
      if (menuX + menuWidth > window.innerWidth) {
        menuX = window.innerWidth - menuWidth - 10;
      }
      if (menuX < 10) {
        menuX = 10;
      }

      // Если меню не помещается сверху, показываем снизу таба
      if (menuY < 10) {
        menuY = targetRect.bottom; // Верхняя граница меню = нижняя граница таба
      }

      setContextMenuPosition({ x: menuX, y: menuY });
      setActiveContextMenuTabId(tabId);
    }
  };

  const handleContextMenuClose = () => {
    setActiveContextMenuTabId(null);
  };

  // Обработчики для действий в контекстном меню
  const handleSheetRename = (sheetId: string) => {
    // TODO: Реализовать диалог переименования
    const newName = prompt(
      'Введите новое имя листа:',
      sheets.find(s => s.id === sheetId)?.name || ''
    );

    if (newName && newName.trim()) {
      // Обновляем имя в sheets
      const updatedSheets = sheets.map(sheet =>
        sheet.id === sheetId ? { ...sheet, name: newName.trim() } : sheet
      );
      setSheets(updatedSheets);

      // Обновляем label в tabs
      setTabs(tabs.map(tab => (tab.id === sheetId ? { ...tab, label: newName.trim() } : tab)));

      onSheetsChange?.(updatedSheets);
    }
    setActiveContextMenuTabId(null);
  };

  const handleSheetDuplicate = (sheetId: string) => {
    const sourceSheet = sheets.find(s => s.id === sheetId);
    if (sourceSheet) {
      // Генерируем новый ID
      const newId = `sheet${Date.now()}`;
      const newName = `${sourceSheet.name} Copy`;

      // Создаем новый sheet
      const newSheet = {
        id: newId,
        name: newName,
        isActive: false,
      };

      // Создаем новый tab
      const newTab = {
        id: newId,
        label: newName,
        isActive: false,
        hasCloseButton: true,
      };

      // Добавляем после оригинального
      const sheetIndex = sheets.findIndex(s => s.id === sheetId);
      const tabIndex = tabs.findIndex(t => t.id === sheetId);

      const updatedSheets = [
        ...sheets.slice(0, sheetIndex + 1),
        newSheet,
        ...sheets.slice(sheetIndex + 1),
      ];

      const updatedTabs = [...tabs.slice(0, tabIndex + 1), newTab, ...tabs.slice(tabIndex + 1)];

      setSheets(updatedSheets);
      setTabs(updatedTabs);
      onSheetsChange?.(updatedSheets);
    }
    setActiveContextMenuTabId(null);
  };

  const handleSheetDelete = (sheetId: string) => {
    // Защита от удаления последнего листа
    if (sheets.length <= 1) {
      alert('Нельзя удалить последний лист!');
      setActiveContextMenuTabId(null);
      return;
    }

    const sheetToDelete = sheets.find(s => s.id === sheetId);
    if (sheetToDelete && confirm(`Удалить лист "${sheetToDelete.name}"?`)) {
      // Удаляем таб и sheet
      const updatedTabs = tabs.filter(tab => tab.id !== sheetId);
      const updatedSheets = sheets.filter(sheet => sheet.id !== sheetId);

      // Если удаляем активный лист, активируем первый доступный
      const wasActive = sheetToDelete.isActive;
      if (wasActive && updatedSheets.length > 0) {
        updatedSheets[0].isActive = true;
        updatedTabs.find(t => t.id === updatedSheets[0].id)!.isActive = true;
      }

      setTabs(updatedTabs);
      setSheets(updatedSheets);
      onSheetsChange?.(updatedSheets);
    }
    setActiveContextMenuTabId(null);
  };

  const handleSheetEditLayout = (sheetId: string) => {
    const sheet = sheets.find(s => s.id === sheetId);
    if (sheet) {
      setEditingSheetName(sheet.name);
      setIsLayoutEditOpen(true);
    }
    setActiveContextMenuTabId(null);
  };

  const handleSheetMoveUpContext = (sheetId: string) => {
    const sheetIndex = sheets.findIndex(s => s.id === sheetId);
    const tabIndex = tabs.findIndex(t => t.id === sheetId);

    if (sheetIndex > 0 && tabIndex > 0) {
      // Перемещаем в sheets
      const newSheets = [...sheets];
      [newSheets[sheetIndex - 1], newSheets[sheetIndex]] = [
        newSheets[sheetIndex],
        newSheets[sheetIndex - 1],
      ];

      // Перемещаем в tabs (учитываем, что model таб всегда первый)
      const newTabs = [...tabs];
      if (tabIndex > 1) {
        // Не перемещаем на место model таба
        [newTabs[tabIndex - 1], newTabs[tabIndex]] = [newTabs[tabIndex], newTabs[tabIndex - 1]];
      }

      setSheets(newSheets);
      setTabs(newTabs);
      onSheetsChange?.(newSheets);
    }
    setActiveContextMenuTabId(null);
  };

  const handleSheetMoveDownContext = (sheetId: string) => {
    const sheetIndex = sheets.findIndex(s => s.id === sheetId);
    const tabIndex = tabs.findIndex(t => t.id === sheetId);

    if (sheetIndex < sheets.length - 1 && tabIndex < tabs.length - 1) {
      // Перемещаем в sheets
      const newSheets = [...sheets];
      [newSheets[sheetIndex], newSheets[sheetIndex + 1]] = [
        newSheets[sheetIndex + 1],
        newSheets[sheetIndex],
      ];

      // Перемещаем в tabs
      const newTabs = [...tabs];
      [newTabs[tabIndex], newTabs[tabIndex + 1]] = [newTabs[tabIndex + 1], newTabs[tabIndex]];

      setSheets(newSheets);
      setTabs(newTabs);
      onSheetsChange?.(newSheets);
    }
    setActiveContextMenuTabId(null);
  };

  const handlePageLayoutManager = () => {
    setIsPageLayoutManagerOpen(true);
    setActiveContextMenuTabId(null);
  };

  const handlePageLayoutManagerClose = () => {
    setIsPageLayoutManagerOpen(false);
  };

  const handleEditLayoutClose = () => {
    setIsLayoutEditOpen(false);
    setEditingSheetName('');
  };

  // Закрывать контекстное меню при клике вне него
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Проверяем, что клик не был по элементам меню
      const target = event.target as Element;
      if (!target.closest('.options-menu')) {
        setActiveContextMenuTabId(null);
      }
    };

    if (activeContextMenuTabId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeContextMenuTabId]);

  const handlePanelManage = () => {
    console.log('Panel manage clicked');
  };

  const handleSnapOptions = () => {
    console.log('Snap options clicked');
  };

  const handleSnapClick = (snapType: string) => {
    console.log('Snap clicked:', snapType);

    if (snapType === 'a3') {
      console.log('A3 button clicked');
      return;
    }

    // Переключаем состояние только выбранной кнопки
    setSnapStates(prev => ({
      ...prev,
      [snapType]: !prev[snapType as keyof typeof prev],
    }));
  };

  // SheetsManager handlers
  const handleSheetSelect = (sheetId: string) => {
    const updatedSheets = sheets.map(sheet => ({
      ...sheet,
      isActive: sheet.id === sheetId,
    }));
    setSheets(updatedSheets);

    // Также обновляем вкладки
    setTabs(
      tabs.map(tab => ({
        ...tab,
        isActive: tab.id === sheetId,
      }))
    );

    // Уведомляем родительский компонент
    onActiveTabChange?.(sheetId);
    onSheetsChange?.(updatedSheets);
  };

  const handleSheetOptions = (sheetId: string) => {
    console.log('Sheet options clicked for:', sheetId);
  };

  const handleEditLayout = (sheetId: string) => {
    console.log('Edit layout clicked for:', sheetId);
  };

  const handleNewSheet = () => {
    // Находим максимальный номер существующих листов
    const existingNumbers = sheets
      .map(sheet => {
        const match = sheet.id.match(/^sheet(\d+)$/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(num => num > 0);

    const maxNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;
    const newSheetNumber = maxNumber + 1;

    const newSheet = {
      id: `sheet${newSheetNumber}`,
      name: `Sheet${newSheetNumber}`,
      isActive: false,
    };

    const newTab = {
      id: `sheet${newSheetNumber}`,
      label: `Sheet${newSheetNumber}`,
      hasCloseButton: true,
    };

    const updatedSheets = [...sheets, newSheet];
    setSheets(updatedSheets);
    setTabs([...tabs, newTab]);
    onSheetsChange?.(updatedSheets);
  };

  const handleDeleteSheet = () => {
    const activeSheet = sheets.find(sheet => sheet.isActive);
    if (activeSheet && sheets.length > 1) {
      const updatedSheets = sheets.filter(sheet => sheet.id !== activeSheet.id);
      setSheets(updatedSheets);
      setTabs(tabs.filter(tab => tab.id !== activeSheet.id));
      onSheetsChange?.(updatedSheets);
    }
  };

  const handleSheetMoveUp = () => {
    const activeSheetIndex = sheets.findIndex(sheet => sheet.isActive);

    if (activeSheetIndex > 0) {
      // Находим соответствующий таб по ID активного листа ДО изменения массива sheets
      const activeSheet = sheets.find(sheet => sheet.isActive);

      // Создаем новый массив с переставленными элементами
      const newSheets = [...sheets];
      [newSheets[activeSheetIndex - 1], newSheets[activeSheetIndex]] = [
        newSheets[activeSheetIndex],
        newSheets[activeSheetIndex - 1],
      ];

      setSheets(newSheets);

      // Перемещаем соответствующий таб
      if (activeSheet) {
        const activeTabIndex = tabs.findIndex(tab => tab.id === activeSheet.id);

        if (activeTabIndex > 0) {
          const newTabs = [...tabs];
          [newTabs[activeTabIndex - 1], newTabs[activeTabIndex]] = [
            newTabs[activeTabIndex],
            newTabs[activeTabIndex - 1],
          ];
          setTabs(newTabs);
        }
      }
    }
  };

  const handleSheetMoveDown = () => {
    const activeSheetIndex = sheets.findIndex(sheet => sheet.isActive);

    if (activeSheetIndex < sheets.length - 1 && activeSheetIndex !== -1) {
      // Находим соответствующий таб по ID активного листа ДО изменения массива sheets
      const activeSheet = sheets.find(sheet => sheet.isActive);

      // Создаем новый массив с переставленными элементами
      const newSheets = [...sheets];
      [newSheets[activeSheetIndex], newSheets[activeSheetIndex + 1]] = [
        newSheets[activeSheetIndex + 1],
        newSheets[activeSheetIndex],
      ];

      setSheets(newSheets);

      // Перемещаем соответствующий таб
      if (activeSheet) {
        const activeTabIndex = tabs.findIndex(tab => tab.id === activeSheet.id);

        if (activeTabIndex < tabs.length - 1 && activeTabIndex !== -1) {
          const newTabs = [...tabs];
          [newTabs[activeTabIndex], newTabs[activeTabIndex + 1]] = [
            newTabs[activeTabIndex + 1],
            newTabs[activeTabIndex],
          ];
          setTabs(newTabs);
        }
      }
    }
  };

  return (
    <>
      {/* SheetsManager - positioned above toolbar */}
      {showSheetsManager && (
        <div className="absolute bottom-[39px] left-0 z-40 pointer-events-auto">
          <SheetsManager
            sheets={sheets}
            onSheetSelect={handleSheetSelect}
            onSheetOptions={handleSheetOptions}
            onEditLayout={handleSheetEditLayout}
            onNewSheet={handleNewSheet}
            onDeleteSheet={handleDeleteSheet}
            onSheetMoveUp={() => handleSheetMoveUp()}
            onSheetMoveDown={() => handleSheetMoveDown()}
          />
        </div>
      )}

      <div
        ref={containerRef}
        className="absolute bg-[#141518] bottom-0 h-[39px] left-0 w-full pointer-events-auto z-30"
      >
        <BottomToolbar
          tabs={tabs}
          onTabClick={handleTabClick}
          onTabClose={handleTabClose}
          onTabContextMenu={handleTabContextMenu}
          onSheetsManagerToggle={handleSheetsManagerToggle}
          onPanelManage={handlePanelManage}
          onSnapOptions={handleSnapOptions}
          onSnapClick={handleSnapClick}
          snapStates={snapStates}
        />
      </div>

      {/* Context Menu для табов */}
      {activeContextMenuTabId && (
        <div
          className="fixed z-[9999] pointer-events-auto"
          style={{
            left: contextMenuPosition.x,
            top: contextMenuPosition.y,
          }}
        >
          <OptionsMenu
            onRename={() => handleSheetRename(activeContextMenuTabId)}
            onDuplicate={() => handleSheetDuplicate(activeContextMenuTabId)}
            onDelete={() => handleSheetDelete(activeContextMenuTabId)}
            onEditLayout={() => handleSheetEditLayout(activeContextMenuTabId)}
            onMoveUp={() => handleSheetMoveUpContext(activeContextMenuTabId)}
            onMoveDown={() => handleSheetMoveDownContext(activeContextMenuTabId)}
            onPageLayoutManager={handlePageLayoutManager}
            onClose={handleContextMenuClose}
          />
        </div>
      )}

      {/* Page Layout Manager Dialog - using portal to render at body level */}
      {isPageLayoutManagerOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pointer-events-none overflow-auto dialog-container"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            <div className="pointer-events-auto">
              <PageLayoutManager onClose={handlePageLayoutManagerClose} sheets={sheets} />
            </div>
          </div>,
          document.body
        )}

      {/* Layout Edit Dialog - using portal to render at body level */}
      {isLayoutEditOpen &&
        editingSheetName &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pointer-events-none overflow-auto dialog-container"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            <div className="pointer-events-auto">
              <LayoutEditDialog sheetName={editingSheetName} onClose={handleEditLayoutClose} />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

/* ===== Main wrapper ===== */
const ResponsiveBackground: React.FC<ResponsiveBackgroundProps> = ({
  children,
  className = '',
  overlay = false,
  onActiveTabChange,
  onSheetsChange,
}) => {
  return (
    <div className={`fixed inset-0 bg-[#dcdcdc] ${className}`} data-name="responsive background">
      {/* фон/декор */}
      <div className="relative z-0 w-full h-full">
        <TabBar />
        <Frame294 />
        <div
          className="absolute bg-[99.17%_83.11%] bg-no-repeat bg-size-[519.44%_138.33%] h-[587px] right-[19px] top-56 w-72 pointer-events-none"
          style={{ backgroundImage: `url('${imgImage22}')` }}
        />
        <div
          className="absolute bg-[50%_91.21%] bg-no-repeat bg-size-[356.19%_2136.84%] bottom-[74px] h-[38px] left-1/2 translate-x-[-50%] w-[420px] pointer-events-none"
          style={{ backgroundImage: `url('${imgImage22}')` }}
        />
        <div
          className="absolute bg-[44.64%_61.84%] bg-no-repeat bg-size-[631.22%_443.72%] h-[183px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[237px] pointer-events-none"
          style={{ left: 'calc(50% + 0.5px)', backgroundImage: `url('${imgImage22}')` }}
        />
        <Header />
        <BottomToolbarWrapper
          onActiveTabChange={onActiveTabChange}
          onSheetsChange={onSheetsChange}
        />
      </div>

      {/* лента */}
      <ScrollableRibbon className="absolute left-0 top-[75px] w-full z-20 pointer-events-auto" />

      {/* оверлей */}
      {overlay && <div className="fixed inset-0 bg-black/20 bg-opacity-50 z-30" />}

      {/* контент */}
      <div className="relative z-40 w-full h-full">{children}</div>
    </div>
  );
};

export { ResponsiveBackground };
export default ResponsiveBackground;
