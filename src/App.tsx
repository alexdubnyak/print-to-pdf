import { useState } from 'react';
import svgPaths from "./imports/svg-uo6jg4qcws";
import { ButtonPrimary } from './components/button-primary';
import { ButtonSecondary } from './components/button-secondary';
import { ButtonIcon } from './components/button-icon';
import { Checkbox } from './components/checkbox';
import { TextInput } from './components/text-input';
import { Select, SelectOption } from './components/select';
import { SheetNavigationLeft } from './components/sheet-navigation-left';
import { SheetNavigationRight } from './components/sheet-navigation-right';
import { SheetPreview } from './components/sheet-preview';
import { NoPreview } from './components/no-preview';
import { LayoutEditor } from './components/layout-editor';
import { PageLayoutManager } from './components/page-layout-manager';

// ============================================
// IMAGE ASSETS - Technical Drawing References
// ============================================

// Заглушки для Figma assets - заменить на реальные изображения
const PLACEHOLDER_SHEET_IMAGE = "/placeholder-sheet.png";
const PLACEHOLDER_BACKGROUND = "/placeholder-background.png";

// Используем заглушки вместо Figma assets
const imgSheet1Drawing = PLACEHOLDER_SHEET_IMAGE;
const imgSheet2Drawing = PLACEHOLDER_SHEET_IMAGE; 
const imgMainBackground = PLACEHOLDER_BACKGROUND;

// ============================================
// SHEET CONFIGURATION
// ============================================

// Layout options for the select dropdown
const layoutOptions: SelectOption[] = [
  { value: 'sheet1', label: 'Sheet' },
  { value: 'sheet1_fit', label: 'Sheet 1 Layout (Fit to page)' },
];

// Sheet data configuration
const sheets = [
  {
    id: 1,
    name: 'Sheet 1',
    image: imgSheet1Drawing,
    widthMm: '707',
    heightMm: '500',
    description: 'Horizontal Technical Drawing'
  },
  {
    id: 2,
    name: 'Sheet 2', 
    image: imgSheet2Drawing,
    widthMm: '841',
    heightMm: '594',
    description: 'A1 Vertical Technical Drawing'
  }
];

// ============================================
// LAYOUT MAPPING CONFIGURATION
// ============================================

const layoutValueToName = {
  'item1': '*Sheet1*',
  'item2': '*Sheet2*', 
  'item3': 'Custom Layout'
};

const getLayoutNameFromValue = (value: string): string => {
  return layoutValueToName[value as keyof typeof layoutValueToName] || 'Unknown Layout';
};

// ============================================
// MAIN APPLICATION COMPONENT
// ============================================

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
  const [originalLayoutValues, setOriginalLayoutValues] = useState<{
    layout1: string;
    layout2: string;
  } | null>(null);

  // Calculate selected sheets
  const selectedSheets = [];
  if (sheet1Checked) selectedSheets.push(1);
  if (sheet2Checked) selectedSheets.push(2);
  
  const selectedCount = selectedSheets.length;
  const isPrintDisabled = selectedCount === 0;

  // Ensure current sheet is valid
  const isCurrentSheetValid = selectedSheets.includes(currentSheet);
  
  if (!isCurrentSheetValid && selectedSheets.length > 0) {
    setTimeout(() => {
      setCurrentSheet(selectedSheets[0]);
    }, 0);
  }

  // Get active layout name
  const getActiveLayoutName = (): string | null => {
    if (sheet1Checked && sheet2Checked) {
      const layout1Name = getLayoutNameFromValue(layoutValue);
      const layout2Name = getLayoutNameFromValue(layout2Value);
      
      if (layout1Name !== '*Sheet1*') return layout1Name;
      if (layout2Name !== '*Sheet1*') return layout2Name;
      return layout1Name;
    } else if (sheet1Checked) {
      return getLayoutNameFromValue(layoutValue);
    } else if (sheet2Checked) {
      return getLayoutNameFromValue(layout2Value);
    }
    
    return null;
  };

  const isActivateAllDisabled = selectedCount === 0;

  // Event handlers
  const handleActivateAll = () => {
    if (isActivateAllDisabled) return;

    if (!isActivateAllActive) {
      const activeLayoutName = getActiveLayoutName();
      
      if (activeLayoutName) {
        setOriginalLayoutValues({
          layout1: layoutValue,
          layout2: layout2Value
        });

        let targetValue = 'item1';
        
        if (activeLayoutName === '*Sheet1*') targetValue = 'item1';
        else if (activeLayoutName === '*Sheet2*') targetValue = 'item2';
        else if (activeLayoutName === 'Custom Layout') targetValue = 'item3';

        if (sheet1Checked) setLayoutValue(targetValue);
        if (sheet2Checked) setLayout2Value(targetValue);

        setIsActivateAllActive(true);
        console.log(`✅ Activated all sheets with layout: ${activeLayoutName}`);
      }
    } else {
      if (originalLayoutValues) {
        setLayoutValue(originalLayoutValues.layout1);
        setLayout2Value(originalLayoutValues.layout2);
        setOriginalLayoutValues(null);
      }
      
      setIsActivateAllActive(false);
      console.log('🔄 Deactivated all sheets');
    }
  };

  const handleSelectAllClick = (checked: boolean) => {
    setSelectAllChecked(checked);
    setSheet1Checked(checked);
    setSheet2Checked(checked);
    if (checked) setCurrentSheet(1);

    if (isActivateAllActive) {
      setIsActivateAllActive(false);
      if (originalLayoutValues) {
        setLayoutValue(originalLayoutValues.layout1);
        setLayout2Value(originalLayoutValues.layout2);
        setOriginalLayoutValues(null);
      }
    }
  };

  const handleSheet1Click = (checked: boolean) => {
    setSheet1Checked(checked);
    setSelectAllChecked(checked && sheet2Checked);

    if (checked) {
      if (currentSheet === 0 || (!sheet2Checked && currentSheet !== 1)) {
        setCurrentSheet(1);
      }
    } else if (currentSheet === 1 && sheet2Checked) {
      setCurrentSheet(2);
    }

    if (isActivateAllActive) {
      setIsActivateAllActive(false);
      if (originalLayoutValues) {
        setLayoutValue(originalLayoutValues.layout1);
        setLayout2Value(originalLayoutValues.layout2);
        setOriginalLayoutValues(null);
      }
    }
  };

  const handleSheet2Click = (checked: boolean) => {
    setSheet2Checked(checked);
    setSelectAllChecked(checked && sheet1Checked);

    if (checked) {
      if (currentSheet === 0 || (!sheet1Checked && currentSheet !== 2)) {
        setCurrentSheet(2);
      }
    } else if (currentSheet === 2 && sheet1Checked) {
      setCurrentSheet(1);
    }

    if (isActivateAllActive) {
      setIsActivateAllActive(false);
      if (originalLayoutValues) {
        setLayoutValue(originalLayoutValues.layout1);
        setLayout2Value(originalLayoutValues.layout2);
        setOriginalLayoutValues(null);
      }
    }
  };

  const appliedLayoutName = isActivateAllActive ? getActiveLayoutName() : undefined;

  if (!isDialogOpen) {
    return (
      <div className="size-full flex items-center justify-center bg-gray-100">
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Print Dialog
        </button>
      </div>
    );
  }

  if (isPageLayoutManagerOpen) {
    return (
      <div className="relative size-full" data-name="Page Layout Manager">
        <div
          className="bg-main-image absolute h-[813px] left-0 top-0 w-[1496px] bg-gradient-overlay"
          data-name="image"
          style={{ '--bg-image': `url('${imgMainBackground}')` } as React.CSSProperties}
        />
        <div className="absolute top-[226px] translate-x-[-50%] print-dialog-position h-[362px] w-[770px]">
          <PageLayoutManager 
            onClose={() => setIsPageLayoutManagerOpen(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative size-full" data-name="Print current sheet">
      <div
        className="bg-main-image absolute h-[813px] left-0 top-0 w-[1496px] bg-gradient-overlay"
        data-name="image"
        style={{ '--bg-image': `url('${imgMainBackground}')` } as React.CSSProperties}
      />
      
      {/* Print Dialog */}
      <div
        className="absolute box-border content-stretch flex flex-col h-[591px] items-start justify-between p-0 shadow-[0px_4px_64px_0px_rgba(0,0,0,0.25)] top-[147.5px] translate-x-[-50%] w-[971px] print-dialog-position"
        style={{ backgroundColor: 'var(--color-dialog-bg-darker)' }}
        data-name="Print to PDF"
      >
        {/* Dialog Header */}
        <div className="box-border content-stretch flex flex-col gap-px items-start justify-start p-0 relative shrink-0 w-full">
          <div className="relative shrink-0 w-full" style={{ backgroundColor: 'var(--color-dialog-bg-dark)' }}>
            <div className="flex flex-row items-center relative size-full">
              <div className="box-border content-stretch flex flex-row items-center justify-between px-2.5 py-0 relative w-full">
                <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[11px] text-left text-nowrap uppercase" style={{ color: 'var(--color-text-light)' }}>
                  <p className="block leading-[normal] whitespace-pre">Print to pdf</p>
                </div>
                <div className="relative shrink-0 size-[37px] cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setIsDialogOpen(false)}>
                  <div className="absolute inset-2 flex items-center justify-center text-[#DFDFDF]">✕</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 w-full">
          
          {/* Left Preview Panel */}
          <div className="box-border content-stretch flex flex-row gap-2.5 h-full items-center justify-start p-[20px] relative shrink-0 w-[400px]" style={{ backgroundColor: 'var(--color-dialog-bg-dark)' }}>
            <div className="basis-0 box-border content-stretch flex flex-col grow h-full items-center justify-center min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0">
              {selectedCount === 0 ? (
                <NoPreview />
              ) : (
                <div className="basis-0 box-border content-stretch flex flex-col gap-10 grow h-full items-center justify-start min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0">
                  {(() => {
                    const currentSheetData = sheets.find(sheet => sheet.id === currentSheet);
                    return currentSheetData ? (
                      <SheetPreview 
                        image={currentSheetData.image}
                        sheetName={currentSheetData.name}
                        widthMm={currentSheetData.widthMm}
                        heightMm={currentSheetData.heightMm}
                      />
                    ) : null;
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Right Config Panel */}
          <div className="box-border content-stretch flex flex-col-reverse gap-5 h-full items-start justify-start pb-0 pt-5 px-0 relative shrink-0 w-[571px]">
            
            {/* Sheets Configuration */}
            <div className="box-border content-stretch flex flex-col gap-5 items-start justify-start order-2 p-0 relative shrink-0 w-full">
              
              {/* Search Section */}
              <div className="relative shrink-0 w-full">
                <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-5 py-0 relative w-full">
                  <div className="content-section">
                    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative shrink-0">
                      <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap" style={{ color: 'var(--color-text-light)' }}>
                        <p className="block leading-[normal] whitespace-pre">Sheets</p>
                      </div>
                    </div>
                    <TextInput 
                      value={searchValue} 
                      onChange={setSearchValue} 
                      placeholder="Search sheets" 
                      showSearchIcon={true}
                    />
                  </div>
                </div>
              </div>

              {/* Checkboxes and Selects */}
              <div className="relative shrink-0 w-full">
                <div className="box-border content-stretch flex flex-col-reverse gap-2.5 items-start justify-start px-5 py-0 relative w-full">
                  
                  {/* Select All */}
                  <div className="checkbox-row order-3">
                    <Checkbox 
                      checked={selectAllChecked} 
                      onChange={handleSelectAllClick} 
                      label="Select all sheets"
                    />
                  </div>

                  {/* Sheet 1 */}
                  <div className="sheet-layout-row">
                    <div className="basis-grow-container">
                      <div className="flex-center-container">
                        <div className="padded-content">
                          <div className="checkbox-row">
                            <Checkbox 
                              checked={sheet1Checked} 
                              onChange={handleSheet1Click} 
                              label="Sheet 1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="select-container">
                      <Select 
                        itemCount={3}
                        itemName1={appliedLayoutName && appliedLayoutName.startsWith('*') && appliedLayoutName.endsWith('*') ? appliedLayoutName : "*Sheet1*"}
                        itemName2={appliedLayoutName && appliedLayoutName.startsWith('*') && appliedLayoutName.endsWith('*') ? appliedLayoutName : "*Sheet2*"}
                        itemName3={appliedLayoutName && !appliedLayoutName?.startsWith('*') ? appliedLayoutName : "Custom Layout"}
                        headerText="Sheet 1 Layout"
                        value={layoutValue}
                        onChange={setLayoutValue}
                        className="w-full"
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
                  <div className="sheet-layout-row-2">
                    <div className="basis-grow-container">
                      <div className="flex-center-container">
                        <div className="padded-content">
                          <div className="checkbox-row">
                            <Checkbox 
                              checked={sheet2Checked} 
                              onChange={handleSheet2Click} 
                              label="Sheet 2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="select-container">
                      <Select 
                        itemCount={3}
                        itemName1={appliedLayoutName && appliedLayoutName.startsWith('*') && appliedLayoutName.endsWith('*') ? appliedLayoutName : "*Sheet1*"}
                        itemName2={appliedLayoutName && appliedLayoutName.startsWith('*') && appliedLayoutName.endsWith('*') ? appliedLayoutName : "*Sheet2*"}
                        itemName3={appliedLayoutName && !appliedLayoutName?.startsWith('*') ? appliedLayoutName : "Custom Layout"}
                        headerText="Sheet 2 Layout"
                        value={layout2Value}
                        onChange={setLayout2Value}
                        className="w-full"
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
                </div>
              </div>
            </div>

            {/* Bottom Toolbar */}
            <div style={{
              display: 'flex',
              padding: '10px 20px',
              justifyContent: 'flex-end',
              alignItems: 'flex-end', 
              gap: '10px',
              flex: '1 0 0',
              alignSelf: 'stretch'
            }}>
              <ButtonSecondary onClick={() => setIsPageLayoutManagerOpen(true)}>
                Page layout manager
              </ButtonSecondary>
              
              <ButtonPrimary onClick={() => console.log('Print clicked')} disabled={isPrintDisabled}>
                Print
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Toolbar */}
      <div className="absolute box-border content-stretch flex flex-row items-center justify-between left-[497px] p-[10px] top-[520px] w-[501px]" style={{ backgroundColor: 'var(--color-dialog-bg-dark)' }}>
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0">
          <ButtonIcon 
            icon="approve"
            onClick={handleActivateAll}
            variant="secondary"
            disabled={isActivateAllDisabled}
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
        <div className="w-[107px]">
          <ButtonSecondary onClick={() => console.log('Export PDF clicked')}>
            Export PDF
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}