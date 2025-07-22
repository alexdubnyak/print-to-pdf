import { useState } from 'react';

// Import real components instead of stubs
import { ButtonPrimary } from '../components/button-primary';
import { ButtonSecondary } from '../components/button-secondary';
import { ButtonIcon } from '../components/button-icon';
import { Checkbox } from '../components/checkbox';
import { TextInput } from '../components/text-input';
import { Select } from '../components/select';
import { SheetNavigationLeft } from '../components/sheet-navigation-left';
import { SheetNavigationRight } from '../components/sheet-navigation-right';
import { SheetPreview } from '../components/sheet-preview';
import { NoPreview } from '../components/no-preview';
import { LayoutEditor } from '../components/layout-editor';
import { PageLayoutManager } from '../components/page-layout-manager';

// Import styles
import './styles/globals.css';

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [sheet1Checked, setSheet1Checked] = useState(false);
  const [sheet2Checked, setSheet2Checked] = useState(false);
  const [layoutValue, setLayoutValue] = useState('item1');
  const [layout2Value, setLayout2Value] = useState('item1');
  const [currentSheet, setCurrentSheet] = useState(1);

  // Layout editor states
  const [isLayoutEditorOpen, setIsLayoutEditorOpen] = useState(false);
  const [editingLayoutSheet, setEditingLayoutSheet] = useState<string>('');
  const [isPageLayoutManagerOpen, setIsPageLayoutManagerOpen] = useState(false);

  // Activate all sheets functionality
  const [isActivateAllActive, setIsActivateAllActive] = useState(false);

  // Calculate selected sheets
  const selectedSheets = [];
  if (sheet1Checked) selectedSheets.push(1);
  if (sheet2Checked) selectedSheets.push(2);
  
  const selectedCount = selectedSheets.length;
  const isPrintDisabled = selectedCount === 0;

  // Navigation handlers
  const handlePrevSheet = () => {
    if (selectedSheets.length > 0) {
      const currentIndex = selectedSheets.indexOf(currentSheet);
      if (currentIndex > 0) {
        setCurrentSheet(selectedSheets[currentIndex - 1]);
      }
    }
  };

  const handleNextSheet = () => {
    if (selectedSheets.length > 0) {
      const currentIndex = selectedSheets.indexOf(currentSheet);
      if (currentIndex < selectedSheets.length - 1) {
        setCurrentSheet(selectedSheets[currentIndex + 1]);
      }
    }
  };

  // Event handlers
  const handleActivateAll = () => {
    setIsActivateAllActive(!isActivateAllActive);
    console.log(`✅ Activate all: ${!isActivateAllActive}`);
  };

  const handleSelectAllClick = (checked: boolean) => {
    setSelectAllChecked(checked);
    setSheet1Checked(checked);
    setSheet2Checked(checked);
    if (checked) setCurrentSheet(1);
  };

  const handleSheet1Click = (checked: boolean) => {
    setSheet1Checked(checked);
    setSelectAllChecked(checked && sheet2Checked);
    if (checked && (!sheet2Checked || currentSheet !== 2)) {
      setCurrentSheet(1);
    }
  };

  const handleSheet2Click = (checked: boolean) => {
    setSheet2Checked(checked);
    setSelectAllChecked(checked && sheet1Checked);
    if (checked && (!sheet1Checked || currentSheet !== 1)) {
      setCurrentSheet(2);
    }
  };

  if (!isDialogOpen) {
    return (
      <div className="size-full flex items-center justify-center">
        <ButtonPrimary onClick={() => setIsDialogOpen(true)}>
          Open Print Dialog
        </ButtonPrimary>
      </div>
    );
  }

  if (isPageLayoutManagerOpen) {
    return (
      <div className="relative size-full">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e2023] to-[#333538]" />
        <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-[770px] h-[360px]">
          <PageLayoutManager onClose={() => setIsPageLayoutManagerOpen(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative size-full">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e2023] to-[#333538]" />
      
      {/* Print Dialog */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[971px] h-[591px] bg-[#333538] shadow-dialog flex flex-col">
        
        {/* Dialog Header */}
        <div className="bg-[#1e2023] flex items-center justify-between px-3 py-2">
          <div className="text-[#d5d7e1] text-xs uppercase font-bold">Print to PDF</div>
          <button 
            onClick={() => setIsDialogOpen(false)}
            className="w-9 h-9 flex items-center justify-center hover:opacity-80 text-[#dfdfdf]"
          >
            ✕
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1">
          
          {/* Left Preview Panel */}
          <div className="w-[400px] bg-[#1e2023] p-5 flex flex-col items-center justify-center">
            {selectedCount === 0 ? (
              <NoPreview />
            ) : (
              <>
                <SheetPreview 
                  image="/placeholder-sheet.png"
                  sheetName={`Sheet ${currentSheet}`}
                  widthMm={currentSheet === 1 ? "707" : "841"}
                  heightMm={currentSheet === 1 ? "500" : "594"}
                />
                
                {/* Navigation arrows if multiple sheets selected */}
                {selectedCount > 1 && (
                  <div className="flex items-center gap-2 mt-4">
                    <SheetNavigationLeft 
                      disabled={selectedSheets.indexOf(currentSheet) === 0}
                      onClick={handlePrevSheet}
                    />
                    <span className="text-[#cfcfcf] text-xs px-2">
                      {selectedSheets.indexOf(currentSheet) + 1} of {selectedCount}
                    </span>
                    <SheetNavigationRight 
                      disabled={selectedSheets.indexOf(currentSheet) === selectedCount - 1}
                      onClick={handleNextSheet}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Config Panel */}
          {isLayoutEditorOpen ? (
            <LayoutEditor 
              sheetName={editingLayoutSheet}
              onClose={() => setIsLayoutEditorOpen(false)}
              onSave={() => setIsLayoutEditorOpen(false)}
            />
          ) : (
            <div className="flex-1 flex flex-col">
              
              {/* Main Config Area */}
              <div className="flex-1 p-5 space-y-5">
                
                {/* Search Section */}
                <div>
                  <div className="text-[#d5d7e1] text-xs font-semibold mb-2">Sheets</div>
                  <TextInput 
                    value={searchValue} 
                    onChange={setSearchValue} 
                    placeholder="Search sheets" 
                    showSearchIcon={true}
                  />
                </div>

                {/* Checkboxes and Selects */}
                <div className="space-y-3">
                  
                  {/* Sheet 1 */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Checkbox 
                        checked={sheet1Checked} 
                        onChange={handleSheet1Click} 
                        label="Sheet 1"
                      />
                    </div>
                    <div className="flex-1">
                      <Select 
                        itemCount={3}
                        itemName1="*Sheet1*"
                        itemName2="*Sheet2*"
                        itemName3="Custom Layout"
                        headerText="Sheet 1 Layout"
                        value={layoutValue}
                        onChange={setLayoutValue}
                        disabled={!sheet1Checked}
                      />
                    </div>
                    <ButtonIcon 
                      icon="edit-layout"
                      onClick={() => {
                        setEditingLayoutSheet('Sheet 1');
                        setIsLayoutEditorOpen(true);
                      }} 
                      disabled={!sheet1Checked}
                    />
                  </div>

                  {/* Sheet 2 */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Checkbox 
                        checked={sheet2Checked} 
                        onChange={handleSheet2Click} 
                        label="Sheet 2"
                      />
                    </div>
                    <div className="flex-1">
                      <Select 
                        itemCount={3}
                        itemName1="*Sheet1*"
                        itemName2="*Sheet2*"
                        itemName3="Custom Layout"
                        headerText="Sheet 2 Layout"
                        value={layout2Value}
                        onChange={setLayout2Value}
                        disabled={!sheet2Checked}
                      />
                    </div>
                    <ButtonIcon 
                      icon="edit-layout"
                      onClick={() => {
                        setEditingLayoutSheet('Sheet 2');
                        setIsLayoutEditorOpen(true);
                      }} 
                      disabled={!sheet2Checked}
                    />
                  </div>

                  {/* Select All */}
                  <Checkbox 
                    checked={selectAllChecked} 
                    onChange={handleSelectAllClick} 
                    label="Select all sheets"
                  />
                </div>
              </div>

              {/* Bottom Toolbar */}
              <div className="p-5 flex justify-end gap-3 bg-[#1e2023]">
                <ButtonSecondary onClick={() => setIsPageLayoutManagerOpen(true)}>
                  Page layout manager
                </ButtonSecondary>
                
                <ButtonPrimary onClick={() => console.log('Print clicked')} disabled={isPrintDisabled}>
                  Print
                </ButtonPrimary>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Toolbar */}
      <div className="absolute bottom-[100px] left-1/2 transform -translate-x-1/2 bg-[#1e2023] p-3 flex items-center justify-between w-[500px]">
        <div className="flex gap-2">
          <ButtonIcon 
            icon="approve"
            onClick={handleActivateAll}
            variant="secondary"
            className={isActivateAllActive ? 'activate-all-active' : ''}
          />
          <ButtonIcon 
            icon="deactivate"
            onClick={() => {
              setSelectAllChecked(false);
              setSheet1Checked(false);
              setSheet2Checked(false);
            }}
            variant="secondary"
          />
        </div>
        <ButtonSecondary onClick={() => console.log('Export PDF clicked')}>
          Export PDF
        </ButtonSecondary>
      </div>
    </div>
  );
}