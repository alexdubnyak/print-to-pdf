import { useState } from "react";
import BottomToolbar from "./components/BottomToolbar";
import SheetsManager from "./components/SheetsManager";

interface Tab {
  id: string;
  label: string;
  isActive?: boolean;
  hasCloseButton?: boolean;
}

interface Sheet {
  id: string;
  name: string;
  isActive?: boolean;
}

export default function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "model", label: "Model" },
    { id: "sheet1", label: "Sheet1", isActive: true, hasCloseButton: true },
    { id: "sheet2", label: "Sheet2", hasCloseButton: true },
    { id: "sheet3", label: "Sheet3", hasCloseButton: true },
    { id: "sheet4", label: "Sheet4", hasCloseButton: true },
    { id: "sheet5", label: "Sheet5", hasCloseButton: true },
    { id: "sheet6", label: "Sheet6", hasCloseButton: true },
    { id: "sheet7", label: "Sheet7", hasCloseButton: true },
    { id: "sheet8", label: "Sheet8", hasCloseButton: true },
    { id: "sheet9", label: "Sheet9", hasCloseButton: true },
    { id: "sheet10", label: "Sheet10", hasCloseButton: true },
    { id: "sheet11", label: "Sheet11", hasCloseButton: true },
    { id: "sheet12", label: "Sheet12", hasCloseButton: true }
  ]);

  const [sheets, setSheets] = useState<Sheet[]>([
    { id: "sheet1", name: "Sheet1", isActive: true },
    { id: "sheet2", name: "Sheet2" },
    { id: "sheet3", name: "Sheet3" },
    { id: "sheet4", name: "Sheet4" },
    { id: "sheet5", name: "Sheet5" },
    { id: "sheet6", name: "Sheet6" },
    { id: "sheet7", name: "Sheet7" },
    { id: "sheet8", name: "Sheet8" },
    { id: "sheet9", name: "Sheet9" },
    { id: "sheet10", name: "Sheet10" },
    { id: "sheet11", name: "Sheet11" },
    { id: "sheet12", name: "Sheet12" }
  ]);

  const [showSheetsManager, setShowSheetsManager] = useState(false);
  
  const [snapStates, setSnapStates] = useState({
    snap: true,
    grid: true,
    ortho: true,
    polar: false,
    esnap: false,
    etrack: false,
    lweight: false
  });

  const handleTabClick = (tabId: string) => {
    setTabs(tabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    })));
    
    // Также обновляем активный лист
    setSheets(sheets.map(sheet => ({
      ...sheet,
      isActive: sheet.id === tabId
    })));
  };

  const handleTabClose = (tabId: string) => {
    setTabs(tabs.filter(tab => tab.id !== tabId));
    setSheets(sheets.filter(sheet => sheet.id !== tabId));
  };

  const handleSheetsManagerToggle = () => {
    setShowSheetsManager(!showSheetsManager);
  };

  const handleSheetSelect = (sheetId: string) => {
    setSheets(sheets.map(sheet => ({
      ...sheet,
      isActive: sheet.id === sheetId
    })));
    
    // Также обновляем вкладки
    setTabs(tabs.map(tab => ({
      ...tab,
      isActive: tab.id === sheetId
    })));
  };

  const handleSheetOptions = (sheetId: string) => {
    console.log("Sheet options clicked for:", sheetId);
  };

  const handleEditLayout = (sheetId: string) => {
    console.log("Edit layout clicked for:", sheetId);
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
    
    const newSheet: Sheet = {
      id: `sheet${newSheetNumber}`,
      name: `Sheet${newSheetNumber}`,
      isActive: false
    };
    
    const newTab: Tab = {
      id: `sheet${newSheetNumber}`,
      label: `Sheet${newSheetNumber}`,
      hasCloseButton: true
    };
    
    setSheets([...sheets, newSheet]);
    setTabs([...tabs, newTab]);
  };

  const handleDeleteSheet = () => {
    const activeSheet = sheets.find(sheet => sheet.isActive);
    if (activeSheet && sheets.length > 1) {
      handleTabClose(activeSheet.id);
    }
  };

  const handleNewLayout = () => {
    console.log("New layout clicked");
  };

  const handlePanelManage = () => {
    console.log("Panel manage clicked");
  };

  const handleSnapOptions = () => {
    console.log("Snap options clicked");
  };

  const handleSnapClick = (snapType: string) => {
    console.log("Snap clicked:", snapType);
    
    if (snapType === "a3") {
      console.log("A3 button clicked");
      return;
    }
    
    setSnapStates(prev => ({
      ...prev,
      [snapType]: !prev[snapType as keyof typeof prev]
    }));
  };

  const handleSheetMoveUp = () => {
    console.log("=== App.tsx handleSheetMoveUp called ===");
    console.log("Sheets state at function start:", JSON.stringify(sheets, null, 2));
    console.log("Tabs state at function start:", JSON.stringify(tabs, null, 2));
    
    const activeSheetIndex = sheets.findIndex(sheet => sheet.isActive);
    console.log("Active sheet index:", activeSheetIndex);
    console.log("Current sheets:", sheets);
    
    if (activeSheetIndex > 0) {
      // Находим соответствующий таб по ID активного листа ДО изменения массива sheets
      const activeSheet = sheets.find(sheet => sheet.isActive);
      console.log("Active sheet:", activeSheet);
      
      // Создаем новый массив с переставленными элементами
      const newSheets = [...sheets];
      [newSheets[activeSheetIndex - 1], newSheets[activeSheetIndex]] = 
        [newSheets[activeSheetIndex], newSheets[activeSheetIndex - 1]];
      
      console.log("New sheets order:", newSheets);
      setSheets(newSheets);
      
      // Перемещаем соответствующий таб
      if (activeSheet) {
        const activeTabIndex = tabs.findIndex(tab => tab.id === activeSheet.id);
        console.log("Active tab index:", activeTabIndex);
        console.log("Current tabs:", tabs);
        
        if (activeTabIndex > 0) {
          const newTabs = [...tabs];
          [newTabs[activeTabIndex - 1], newTabs[activeTabIndex]] = 
            [newTabs[activeTabIndex], newTabs[activeTabIndex - 1]];
          console.log("New tabs order:", newTabs);
          setTabs(newTabs);
        }
      }
    }
  };

  const handleSheetMoveDown = () => {
    console.log("=== App.tsx handleSheetMoveDown called ===");
    console.log("Sheets state at function start:", JSON.stringify(sheets, null, 2));
    console.log("Tabs state at function start:", JSON.stringify(tabs, null, 2));
    
    const activeSheetIndex = sheets.findIndex(sheet => sheet.isActive);
    console.log("Active sheet index:", activeSheetIndex);
    console.log("Current sheets:", sheets);
    
    if (activeSheetIndex < sheets.length - 1 && activeSheetIndex !== -1) {
      // Находим соответствующий таб по ID активного листа ДО изменения массива sheets
      const activeSheet = sheets.find(sheet => sheet.isActive);
      console.log("Active sheet:", activeSheet);
      
      // Создаем новый массив с переставленными элементами
      const newSheets = [...sheets];
      [newSheets[activeSheetIndex], newSheets[activeSheetIndex + 1]] = 
        [newSheets[activeSheetIndex + 1], newSheets[activeSheetIndex]];
      
      console.log("New sheets order:", newSheets);
      setSheets(newSheets);
      
      // Перемещаем соответствующий таб
      if (activeSheet) {
        const activeTabIndex = tabs.findIndex(tab => tab.id === activeSheet.id);
        console.log("Active tab index:", activeTabIndex);
        console.log("Current tabs:", tabs);
        
        if (activeTabIndex < tabs.length - 1 && activeTabIndex !== -1) {
          const newTabs = [...tabs];
          [newTabs[activeTabIndex], newTabs[activeTabIndex + 1]] = 
            [newTabs[activeTabIndex + 1], newTabs[activeTabIndex]];
          console.log("New tabs order:", newTabs);
          setTabs(newTabs);
        }
      }
    }
  };

  return (
    <div className="size-full flex flex-col relative">
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1>Bottom Toolbar со Слайдером Sheets</h1>
          <p>Model таб всегда видим и не перемещается</p>
          <p>По умолчанию: максимум 2 sheet-таба одновременно (Model + 2 sheets)</p>
          <p>При 4+ sheets: режим скролла с 3 sheet-табами одновременно (Model + 3 sheets)</p>
          <p>Используйте навигационные кнопки справа для прокрутки между sheet-табами</p>
          <p>Кликните по левой иконке в toolbar для открытия Sheets Manager</p>
          <p>Активный sheet-таб автоматически прокручивается в видимую область</p>
        </div>
      </div>
      
      {/* Sheets Manager - positioned directly above toolbar */}
      {showSheetsManager && (
        <div className="absolute bottom-[39px] left-0 z-50">
          <SheetsManager
            sheets={sheets}
            onSheetSelect={handleSheetSelect}
            onSheetOptions={handleSheetOptions}
            onEditLayout={handleEditLayout}
            onNewSheet={handleNewSheet}
            onDeleteSheet={handleDeleteSheet}
            onNewLayout={handleNewLayout}
            onSheetMoveUp={handleSheetMoveUp}
            onSheetMoveDown={handleSheetMoveDown}
          />
        </div>
      )}
      
      <BottomToolbar 
        tabs={tabs}
        onTabClick={handleTabClick}
        onTabClose={handleTabClose}
        onSheetsManagerToggle={handleSheetsManagerToggle}
        onPanelManage={handlePanelManage}
        onSnapOptions={handleSnapOptions}
        onSnapClick={handleSnapClick}
        snapStates={snapStates}
      />
    </div>
  );
}