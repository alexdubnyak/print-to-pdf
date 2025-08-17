import imgImage9 from 'figma:asset/7570a0196b27f18f336a34f1c7ff7a1826dd64a5.png';
import { useState } from 'react';
import svgPathsQuick from '../imports/svg-4xdfr98ovj';
import svgPaths from '../imports/svg-uo6jg4qcws';
import { ButtonIcon } from './button-icon';
import { ButtonPrimary } from './button-primary';
import { ButtonSecondary } from './button-secondary';
import { Checkbox } from './checkbox';
import { NoPreview } from './no-preview';
import { Select } from './select';
import { SheetNavigationLeft } from './sheet-navigation-left';
import { SheetNavigationRight } from './sheet-navigation-right';
import { SheetPreview } from './sheet-preview';
import { TabsContainer } from './tabs-container';
import { TextInput } from './text-input';

// ============================================
// IMAGE ASSETS - Technical Drawing References
// ============================================

// Technical Drawing Images - Direct URLs to real technical drawings
const TECHNICAL_DRAWING_SHEET_1 =
  'https://dwgmodels.com/uploads/posts/2023-12/reception-desks-for-hotels_m.jpg'; // 707x500mm Horizontal Technical Drawing
const TECHNICAL_DRAWING_SHEET_2 =
  'https://dwgmodels.com/uploads/posts/2018-08/1534800474_facades-of-the-old-power-station_m.jpg'; // 841x594mm A1 Vertical Technical Drawing

// Direct image URLs replacing Figma assets
const imgSheet1Drawing = TECHNICAL_DRAWING_SHEET_1;
const imgSheet2Drawing = TECHNICAL_DRAWING_SHEET_2;

// ============================================
// SHEET CONFIGURATION
// ============================================

// Sheet data configuration with direct URLs
const sheets = [
  {
    id: 1,
    name: 'Sheet 1',
    image: imgSheet1Drawing, // 707x500mm Reception Desks Technical Drawing
    widthMm: '707',
    heightMm: '500',
    description: 'Reception Desks Technical Drawing',
  },
  {
    id: 2,
    name: 'Sheet 2',
    image: imgSheet2Drawing, // 841x594mm Power Station Technical Drawing
    widthMm: '841',
    heightMm: '594',
    description: 'Power Station Technical Drawing',
  },
];

// ============================================
// LAYOUT MAPPING CONFIGURATION
// ============================================

// Mapping between select values and layout names
const layoutValueToName = {
  item1: '*Sheet1*',
  item2: '*Sheet2*',
  item3: 'Custom Layout',
};

// Helper function to get layout name from value
const getLayoutNameFromValue = (value: string): string => {
  return layoutValueToName[value as keyof typeof layoutValueToName] || 'Unknown Layout';
};

// ============================================
// UI COMPONENT DEFINITIONS
// ============================================

// Action Buttons Components
function ActivateAllSheetsButton({
  onClick,
  isActive,
  isDisabled,
}: {
  onClick: () => void;
  isActive: boolean;
  isDisabled: boolean;
}) {
  return (
    <ButtonIcon
      icon="approve"
      onClick={onClick}
      variant="secondary"
      disabled={isDisabled}
      className={isActive ? 'activate-all-active' : ''}
    />
  );
}

function DeactivateButton({ onClick }: { onClick: () => void }) {
  return <ButtonIcon icon="deactivate" onClick={onClick} variant="secondary" />;
}

function ActionButtonsGroup({
  onActivateAll,
  onClearAll,
  isActivateAllActive,
  isActivateAllDisabled,
}: {
  onActivateAll: () => void;
  onClearAll: () => void;
  isActivateAllActive: boolean;
  isActivateAllDisabled: boolean;
}) {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0">
      <ActivateAllSheetsButton
        onClick={onActivateAll}
        isActive={isActivateAllActive}
        isDisabled={isActivateAllDisabled}
      />
      <DeactivateButton onClick={onClearAll} />
    </div>
  );
}

function ExportPdfButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-[107px]">
      <ButtonSecondary onClick={onClick}>Export PDF</ButtonSecondary>
    </div>
  );
}

function BottomActionToolbar({
  onActivateAll,
  onClearAll,
  onExportPDF,
  isActivateAllActive,
  isActivateAllDisabled,
}: {
  onActivateAll: () => void;
  onClearAll: () => void;
  onExportPDF: () => void;
  isActivateAllActive: boolean;
  isActivateAllDisabled: boolean;
}) {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-between p-[10px] w-full"
      style={{ backgroundColor: 'var(--color-dialog-bg-dark)' }}
    >
      <ActionButtonsGroup
        onActivateAll={onActivateAll}
        onClearAll={onClearAll}
        isActivateAllActive={isActivateAllActive}
        isActivateAllDisabled={isActivateAllDisabled}
      />
      <ExportPdfButton onClick={onExportPDF} />
    </div>
  );
}

// Dialog Header Components
function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="relative shrink-0 size-[37px] cursor-pointer hover:opacity-80 transition-opacity"
      data-name="actions"
      onClick={onClick}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37 37">
        <g id="actions">
          <path d={svgPaths.p4aac200} fill="var(--color-icon-fill, #DFDFDF)" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function DialogHeader({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="relative shrink-0 w-full"
      style={{ backgroundColor: 'var(--color-dialog-bg-dark)' }}
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-2.5 py-0 relative w-full">
          <div
            className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[11px] text-left text-nowrap uppercase"
            style={{ color: 'var(--color-text-light)' }}
          >
            <p className="block leading-[normal] whitespace-pre">Print to pdf</p>
          </div>
          <CloseButton onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

function DialogHeaderWrapper({ onClose }: { onClose: () => void }) {
  return (
    <div className="box-border content-stretch flex flex-col gap-px items-start justify-start p-0 relative shrink-0 w-full">
      <DialogHeader onClose={onClose} />
    </div>
  );
}

// Settings Info Components
function PrinterTypeInfo() {
  return (
    <div className="settings-info-row">
      <div className="settings-info-label">
        <p className="block leading-[normal]">Printer type:</p>
      </div>
      <div className="settings-info-value">
        <p className="block leading-[normal]">PDF</p>
      </div>
    </div>
  );
}

function PaperSizeInfo() {
  return (
    <div className="settings-info-row">
      <div className="settings-info-label">
        <p className="block leading-[normal]">Paper size:</p>
      </div>
      <div className="settings-info-value">
        <p className="block leading-[normal]">ISO A3 (420.00 x 297.00 MM)</p>
      </div>
    </div>
  );
}

function OrientationInfo() {
  return (
    <div className="settings-info-row">
      <div className="settings-info-label">
        <p className="block leading-[normal]">Orientation:</p>
      </div>
      <div className="settings-info-value">
        <p className="block leading-[normal]">Landscape</p>
      </div>
    </div>
  );
}

function SettingsInfoGroup() {
  return (
    <div className="box-border content-stretch flex flex-col gap-px items-start justify-start overflow-clip p-0 relative shrink-0 w-full">
      <PrinterTypeInfo />
      <PaperSizeInfo />
      <OrientationInfo />
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="box-border content-start flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-[323.5px]">
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <p className="block leading-[normal] whitespace-pre">Settings</p>
      </div>
      <SettingsInfoGroup />
    </div>
  );
}

// Preview Area Components
function PreviewArea({
  selectedCount,
  currentSheet,
  onSheetChange,
  selectedSheets,
  hideNavigationArrows = false,
}: {
  selectedCount: number;
  currentSheet: number;
  onSheetChange: (sheet: number) => void;
  selectedSheets: number[];
  hideNavigationArrows?: boolean;
}) {
  const handlePrevious = () => {
    const currentIndex = selectedSheets.indexOf(currentSheet);
    if (currentIndex > 0) {
      onSheetChange(selectedSheets[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = selectedSheets.indexOf(currentSheet);
    if (currentIndex < selectedSheets.length - 1) {
      onSheetChange(selectedSheets[currentIndex + 1]);
    }
  };

  if (selectedCount === 0 && !hideNavigationArrows) {
    return (
      <div className="basis-0 box-border content-stretch flex flex-col grow h-full items-center justify-center min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0 self-stretch">
        <NoPreview />
      </div>
    );
  }

  // In Quick print mode, always show Sheet 1 even if nothing is selected
  if (hideNavigationArrows && selectedCount === 0) {
    const sheet1Data = sheets[0]; // Always show first sheet in Quick print
    return (
      <div className="basis-0 box-border content-stretch flex flex-col gap-10 grow items-center justify-start min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0 self-stretch">
        <SheetPreview
          image={sheet1Data.image}
          sheetName={sheet1Data.name}
          widthMm={sheet1Data.widthMm}
          heightMm={sheet1Data.heightMm}
        />
        <div className="flex flex-col gap-2 items-start">
          <SettingsSection />
        </div>
      </div>
    );
  }

  const currentSheetData = sheets.find(sheet => sheet.id === currentSheet);
  const currentIndex = selectedSheets.indexOf(currentSheet);

  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-10 grow items-center justify-start min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0 self-stretch">
      {currentSheetData && (
        <SheetPreview
          image={currentSheetData.image}
          sheetName={currentSheetData.name}
          widthMm={currentSheetData.widthMm}
          heightMm={currentSheetData.heightMm}
        />
      )}
      <div className="flex flex-col gap-2 items-start">
        {/* Navigation arrows - conditionally hidden in Quick print mode */}
        {!hideNavigationArrows && (
          <div className="flex gap-2 items-center justify-center w-full">
            <SheetNavigationLeft
              disabled={selectedCount === 1 || currentIndex === 0}
              onClick={handlePrevious}
            />
            <SheetNavigationRight
              disabled={selectedCount === 1 || currentIndex === selectedSheets.length - 1}
              onClick={handleNext}
            />
          </div>
        )}
        <SettingsSection />
      </div>
    </div>
  );
}

function LeftPreviewPanel({
  selectedCount,
  currentSheet,
  onSheetChange,
  selectedSheets,
  hideNavigationArrows = false,
}: {
  selectedCount: number;
  currentSheet: number;
  onSheetChange: (sheet: number) => void;
  selectedSheets: number[];
  hideNavigationArrows?: boolean;
}) {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 h-full items-stretch justify-start p-[20px] relative shrink-0 w-[400px] self-stretch min-h-0 h-full"
      style={{ backgroundColor: 'var(--color-dialog-bg-dark)' }}
    >
      <PreviewArea
        selectedCount={selectedCount}
        currentSheet={currentSheet}
        onSheetChange={onSheetChange}
        selectedSheets={selectedSheets}
        hideNavigationArrows={hideNavigationArrows}
      />
    </div>
  );
}

// Sheets Configuration Components
function SearchSheetsHeader() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative shrink-0">
      <div
        className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap"
        style={{ color: 'var(--color-text-light)' }}
      >
        <p className="block leading-[normal] whitespace-pre">Search sheets</p>
      </div>
    </div>
  );
}

function SearchSection({
  searchValue,
  onSearchChange,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="content-section w-full">
      <SearchSheetsHeader />
      <TextInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search sheets"
        showSearchIcon={true}
      />
    </div>
  );
}

function SearchSectionWrapper({
  searchValue,
  onSearchChange,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-0 py-0 relative w-full">
          <SearchSection searchValue={searchValue} onSearchChange={onSearchChange} />
        </div>
      </div>
    </div>
  );
}

// Section Headers Components
function SheetsHeader() {
  return (
    <div
      className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap"
      style={{ color: 'var(--color-text-light)' }}
    >
      <p className="block leading-[normal] whitespace-pre">Sheets</p>
    </div>
  );
}

function PageLayoutsHeader() {
  return (
    <div
      className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap"
      style={{ color: 'var(--color-text-light)' }}
    >
      <p className="block leading-[normal] whitespace-pre">Page layouts</p>
    </div>
  );
}

// Checkbox Components
function SelectAllCheckbox({
  selectAllChecked,
  onSelectAllClick,
}: {
  selectAllChecked: boolean;
  onSelectAllClick: (checked: boolean) => void;
}) {
  return (
    <div className="checkbox-row order-3 w-full">
      <Checkbox checked={selectAllChecked} onChange={onSelectAllClick} label="Select all sheets" />
    </div>
  );
}

function Sheet1Checkbox({
  sheet1Checked,
  onSheet1Click,
}: {
  sheet1Checked: boolean;
  onSheet1Click: (checked: boolean) => void;
}) {
  return (
    <div className="checkbox-row w-full">
      <Checkbox checked={sheet1Checked} onChange={onSheet1Click} label="Sheet 1" />
    </div>
  );
}

function Sheet1CheckboxWrapper({
  sheet1Checked,
  onSheet1Click,
}: {
  sheet1Checked: boolean;
  onSheet1Click: (checked: boolean) => void;
}) {
  return (
    <div className="basis-grow-container w-full">
      <div className="flex-center-container w-full">
        <div className="padded-content w-full">
          <Sheet1Checkbox sheet1Checked={sheet1Checked} onSheet1Click={onSheet1Click} />
        </div>
      </div>
    </div>
  );
}

function Sheet2Checkbox({
  sheet2Checked,
  onSheet2Click,
}: {
  sheet2Checked: boolean;
  onSheet2Click: (checked: boolean) => void;
}) {
  return (
    <div className="checkbox-row w-full">
      <Checkbox checked={sheet2Checked} onChange={onSheet2Click} label="Sheet 2" />
    </div>
  );
}

function Sheet2CheckboxWrapper({
  sheet2Checked,
  onSheet2Click,
}: {
  sheet2Checked: boolean;
  onSheet2Click: (checked: boolean) => void;
}) {
  return (
    <div className="basis-grow-container w-full">
      <div className="flex-center-container w-full">
        <div className="padded-content w-full">
          <Sheet2Checkbox sheet2Checked={sheet2Checked} onSheet2Click={onSheet2Click} />
        </div>
      </div>
    </div>
  );
}

function SheetsConfigGroup({
  selectAllChecked,
  sheet1Checked,
  sheet2Checked,
  onSelectAllClick,
  onSheet1Click,
  onSheet2Click,
  layoutValue,
  onLayoutChange,
  layout2Value,
  onLayout2Change,
  onLayoutEdit,
  onLayout2Edit,
  appliedLayoutName,
  activeTab,
  onTabChange,
}: {
  selectAllChecked: boolean;
  sheet1Checked: boolean;
  sheet2Checked: boolean;
  onSelectAllClick: (checked: boolean) => void;
  onSheet1Click: (checked: boolean) => void;
  onSheet2Click: (checked: boolean) => void;
  layoutValue: string;
  onLayoutChange: (value: string) => void;
  layout2Value: string;
  onLayout2Change: (value: string) => void;
  onLayoutEdit: () => void;
  onLayout2Edit: () => void;
  appliedLayoutName?: string;
  activeTab: 'quick' | 'advanced';
  onTabChange: (tab: 'quick' | 'advanced') => void;
}) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col-reverse gap-2.5 items-start justify-start px-0 py-0 relative w-full">
          <SelectAllCheckbox
            selectAllChecked={selectAllChecked}
            onSelectAllClick={onSelectAllClick}
          />

          {/* Main content row with Sheets and Page layouts columns */}
          <div className="flex flex-row gap-1.5 w-full">
            {/* Sheets Column */}
            <div className="flex flex-col gap-2.5 flex-1 w-full">
              <SheetsHeader />
              <div className="flex flex-col gap-2.5 w-full">
                <Sheet1CheckboxWrapper
                  sheet1Checked={sheet1Checked}
                  onSheet1Click={onSheet1Click}
                />
                <Sheet2CheckboxWrapper
                  sheet2Checked={sheet2Checked}
                  onSheet2Click={onSheet2Click}
                />
              </div>
            </div>

            {/* Page layouts Column */}
            <div className="flex flex-col gap-2.5 flex-1 w-full">
              <PageLayoutsHeader />
              <div className="flex flex-col gap-2.5 w-full">
                <div className="flex flex-row gap-1.5 items-center w-full">
                  <div className="flex-1">
                    <Select
                      itemCount={3}
                      itemName1={
                        appliedLayoutName &&
                        appliedLayoutName.startsWith('*') &&
                        appliedLayoutName.endsWith('*')
                          ? appliedLayoutName
                          : '*Sheet1*'
                      }
                      itemName2={
                        appliedLayoutName &&
                        appliedLayoutName.startsWith('*') &&
                        appliedLayoutName.endsWith('*')
                          ? appliedLayoutName
                          : '*Sheet2*'
                      }
                      itemName3={
                        appliedLayoutName && !appliedLayoutName.startsWith('*')
                          ? appliedLayoutName
                          : 'Custom Layout'
                      }
                      headerText="Sheet 1 Layout"
                      value={layoutValue}
                      onChange={onLayoutChange}
                      className="w-full"
                      disabled={!sheet1Checked}
                    />
                  </div>
                  <ButtonIcon icon="edit-layout" onClick={onLayoutEdit} disabled={!sheet1Checked} />
                </div>

                <div className="flex flex-row gap-1.5 items-center w-full">
                  <div className="flex-1">
                    <Select
                      itemCount={3}
                      itemName1={
                        appliedLayoutName &&
                        appliedLayoutName.startsWith('*') &&
                        appliedLayoutName.endsWith('*')
                          ? appliedLayoutName
                          : '*Sheet1*'
                      }
                      itemName2={
                        appliedLayoutName &&
                        appliedLayoutName.startsWith('*') &&
                        appliedLayoutName.endsWith('*')
                          ? appliedLayoutName
                          : '*Sheet2*'
                      }
                      itemName3={
                        appliedLayoutName && !appliedLayoutName.startsWith('*')
                          ? appliedLayoutName
                          : 'Custom Layout'
                      }
                      headerText="Sheet 2 Layout"
                      value={layout2Value}
                      onChange={onLayout2Change}
                      className="w-full"
                      disabled={!sheet2Checked}
                    />
                  </div>
                  <ButtonIcon
                    icon="edit-layout"
                    onClick={onLayout2Edit}
                    disabled={!sheet2Checked}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// QUICK PRINT COMPONENTS FROM FIGMA IMPORT
// ============================================

function QuickPrintSheetPreview() {
  return (
    <div className="h-[251.296px] relative shrink-0 w-[323.5px]">
      <div className="absolute flex h-[251.281px] items-center justify-center left-[-0.45px] top-[0.43px] w-[324.391px]">
        <div className="flex-none rotate-[270deg]">
          <div className="bg-[#ffffff] h-[324.401px] w-[251.296px]" />
        </div>
      </div>
      <div
        className="absolute flex h-[239.406px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[310.703px]"
        style={{ top: 'calc(50% - 0.105px)', left: 'calc(50% + 0.256px)' }}
      >
        <div className="flex-none rotate-[270deg]">
          <div className="bg-[#ffffff] h-[310.707px] relative w-[239.417px]">
            <div
              aria-hidden="true"
              className="absolute border-[#acacac] border-[0.457px] border-dashed inset-0 pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div
        className="absolute flex h-[214.734px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[286.938px]"
        style={{ top: 'calc(50% - 0.105px)', left: 'calc(50% + 0.256px)' }}
      >
        <div className="flex-none rotate-[270deg]">
          <div className="bg-[#ffffff] h-[286.948px] relative w-[214.744px]">
            <div
              aria-hidden="true"
              className="absolute border-[#000000] border-[0.457px] border-solid inset-0 pointer-events-none"
            />
          </div>
        </div>
      </div>
      <div
        className="absolute font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[9.138px] text-left text-nowrap top-[-15.54px]"
        style={{ left: 'calc(50% - 18.477px)' }}
      >
        <p className="block leading-[normal] whitespace-pre">707 mm</p>
      </div>
      <div
        className="absolute flex h-[35.953px] items-center justify-center top-[106.44px] w-[12.5px]"
        style={{ left: 'calc(50% + 164.621px)' }}
      >
        <div className="flex-none rotate-[90deg]">
          <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative text-[#d5d7e1] text-[9.138px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">500 mm</p>
          </div>
        </div>
      </div>
      <div
        className="absolute bg-[52.7%_33.61%] bg-no-repeat bg-size-[167.12%_118.26%] h-[152.605px] translate-x-[-50%] translate-y-[-50%] w-[88.182px]"
        data-name="image 9"
        style={{
          top: 'calc(50% - 0.105px)',
          left: 'calc(50% + 0.256px)',
          backgroundImage: `url('${imgImage9}')`,
        }}
      />
      <div className="absolute font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] left-[144.39px] not-italic text-[#d5d7e1] text-[10.966px] text-left text-nowrap top-[-37.92px]">
        <p className="block leading-[normal] whitespace-pre">Sheet 1</p>
      </div>
    </div>
  );
}

function QuickPrintLeftPanel() {
  return (
    <div className="bg-[#1e2023] box-border content-stretch flex flex-row gap-2.5 items-stretch justify-start p-[20px] relative shrink-0 w-[400px] self-stretch min-h-0">
      <div className="basis-0 box-border content-stretch flex flex-col gap-10 grow items-center justify-start min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0 self-stretch">
        <QuickPrintSheetPreview />
        <SettingsSection />
      </div>
    </div>
  );
}

function QuickDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange?: (value: string) => void;
}) {
  return (
    <div className="bg-[#141518] h-7 relative shrink-0 w-full" data-name="dropdown">
      <div
        aria-hidden="true"
        className="absolute border border-[#000000] border-solid inset-[-1px] pointer-events-none"
      />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row h-7 items-center justify-between p-[10px] relative w-full">
          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">{value}</p>
          </div>
          <div className="h-[6.145px] relative shrink-0 w-[10.875px]" data-name="Union">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              role="presentation"
              viewBox="0 0 11 7"
            >
              <path d={svgPathsQuick.p31f4a400} fill="var(--fill-0, #D5D7E1)" id="Union" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Deprecated QuickCheckbox replaced by reusable Checkbox component

// Quick Print Settings Component - обновленный согласно дизайну из Figma
function QuickPrintSettings() {
  // State for orientation selection
  const [orientation, setOrientation] = useState('landscape');
  // State for scale selection
  const [scale, setScale] = useState('1:1');
  // State for paper size selection
  const [paperSize, setPaperSize] = useState('ISO A3 (420.00 x 297.00 MM)');
  // State for checkboxes
  const [inverse, setInverse] = useState(true);
  const [fitToPaper, setFitToPaper] = useState(true);
  const [scaleLineweights, setScaleLineweights] = useState(true);
  const [centerOnPaper, setCenterOnPaper] = useState(true);

  const handleOrientationChange = (value: string) => {
    setOrientation(value);
    console.log('Orientation changed to:', value);
  };

  const handleScaleChange = (value: string) => {
    setScale(value);
    console.log('Scale changed to:', value);
  };

  return (
    <div className="relative w-full h-full min-h-0">
      <div className="relative size-full flex flex-col h-full min-h-0">
        {/* Main content with form controls */}
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
          {/* First Row: Orientation, Scale, Units */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-start relative size-full">
              <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start px-5 py-0 relative w-full">
                {/* Left Column - Orientation, Paper size, Checkboxes */}
                <div className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                  {/* Orientation */}
                  <div className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Orientation</p>
                    </div>
                    <Select
                      options={[
                        { value: 'landscape', label: 'Landscape' },
                        { value: 'portrait', label: 'Portrait' },
                      ]}
                      value={orientation}
                      onChange={handleOrientationChange}
                      placeholder="Select orientation"
                      className="w-full"
                    />
                  </div>

                  {/* Inverse checkbox */}
                  <div className="box-border content-stretch flex flex-row gap-1.5 items-end justify-start p-0 relative shrink-0 w-full">
                    <Checkbox checked={inverse} onChange={setInverse} label="Inverse" />
                  </div>

                  {/* Paper size */}
                  <div className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Paper size</p>
                    </div>
                    <Select
                      options={[
                        {
                          value: '700mm (700.00 x 1000.00 MM)',
                          label: '700mm (700.00 x 1000.00 MM)',
                        },
                        {
                          value: 'ANSI A (11.00 x 8.50 Inches)',
                          label: 'ANSI A (11.00 x 8.50 Inches)',
                        },
                        {
                          value: 'ANSI A (8.50 x 11.00 Inches)',
                          label: 'ANSI A (8.50 x 11.00 Inches)',
                        },
                        {
                          value: 'ANSI B (11.00 x 17.00 Inches)',
                          label: 'ANSI B (11.00 x 17.00 Inches)',
                        },
                        {
                          value: 'ANSI B (17.00 x 11.00 Inches)',
                          label: 'ANSI B (17.00 x 11.00 Inches)',
                        },
                        {
                          value: 'ANSI C (17.00 x 22.00 Inches)',
                          label: 'ANSI C (17.00 x 22.00 Inches)',
                        },
                        {
                          value: 'ANSI C (22.00 x 17.00 Inches)',
                          label: 'ANSI C (22.00 x 17.00 Inches)',
                        },
                        {
                          value: 'ANSI D (22.00 x 34.00 Inches)',
                          label: 'ANSI D (22.00 x 34.00 Inches)',
                        },
                        {
                          value: 'ANSI D (34.00 x 22.00 Inches)',
                          label: 'ANSI D (34.00 x 22.00 Inches)',
                        },
                        {
                          value: 'ANSI E (34.00 x 44.00 Inches)',
                          label: 'ANSI E (34.00 x 44.00 Inches)',
                        },
                        {
                          value: 'ANSI E (44.00 x 34.00 Inches)',
                          label: 'ANSI E (44.00 x 34.00 Inches)',
                        },
                        {
                          value: 'ARCH C (18.00 x 24.00 Inches)',
                          label: 'ARCH C (18.00 x 24.00 Inches)',
                        },
                        {
                          value: 'ARCH C (24.00 x 18.00 Inches)',
                          label: 'ARCH C (24.00 x 18.00 Inches)',
                        },
                        {
                          value: 'ARCH D (24.00 x 36.00 Inches)',
                          label: 'ARCH D (24.00 x 36.00 Inches)',
                        },
                        {
                          value: 'ARCH D (36.00 x 24.00 Inches)',
                          label: 'ARCH D (36.00 x 24.00 Inches)',
                        },
                        {
                          value: 'ARCH E (36.00 x 48.00 Inches)',
                          label: 'ARCH E (36.00 x 48.00 Inches)',
                        },
                        {
                          value: 'ARCH E (48.00 x 36.00 Inches)',
                          label: 'ARCH E (48.00 x 36.00 Inches)',
                        },
                        {
                          value: 'ARCH E1 (30.00 x 42.00 Inches)',
                          label: 'ARCH E1 (30.00 x 42.00 Inches)',
                        },
                        {
                          value: 'ARCH E1 (42.00 x 30.00 Inches)',
                          label: 'ARCH E1 (42.00 x 30.00 Inches)',
                        },
                        {
                          value: 'ISO A0 (1189.00 x 841.00 MM)',
                          label: 'ISO A0 (1189.00 x 841.00 MM)',
                        },
                        {
                          value: 'ISO A0 (841.00 x 1189.00 MM)',
                          label: 'ISO A0 (841.00 x 1189.00 MM)',
                        },
                        {
                          value: 'ISO A1 (594.00 x 841.00 MM)',
                          label: 'ISO A1 (594.00 x 841.00 MM)',
                        },
                        {
                          value: 'ISO A1 (841.00 x 594.00 MM)',
                          label: 'ISO A1 (841.00 x 594.00 MM)',
                        },
                        {
                          value: 'ISO A2 (420.00 x 594.00 MM)',
                          label: 'ISO A2 (420.00 x 594.00 MM)',
                        },
                        {
                          value: 'ISO A2 (594.00 x 420.00 MM)',
                          label: 'ISO A2 (594.00 x 420.00 MM)',
                        },
                        {
                          value: 'ISO A3 (297.00 x 420.00 MM)',
                          label: 'ISO A3 (297.00 x 420.00 MM)',
                        },
                        {
                          value: 'ISO A3 (420.00 x 297.00 MM)',
                          label: 'ISO A3 (420.00 x 297.00 MM)',
                        },
                        {
                          value: 'ISO A4 (210.00 x 297.00 MM)',
                          label: 'ISO A4 (210.00 x 297.00 MM)',
                        },
                        {
                          value: 'ISO A4 (297.00 x 210.00 MM)',
                          label: 'ISO A4 (297.00 x 210.00 MM)',
                        },
                        {
                          value: 'ISO B1 (1000.00 x 707.00 MM)',
                          label: 'ISO B1 (1000.00 x 707.00 MM)',
                        },
                        {
                          value: 'ISO B1 (707.00 x 1000.00 MM)',
                          label: 'ISO B1 (707.00 x 1000.00 MM)',
                        },
                        {
                          value: 'ISO B2 (500.00 x 707.00 MM)',
                          label: 'ISO B2 (500.00 x 707.00 MM)',
                        },
                        {
                          value: 'ISO B2 (707.00 x 500.00 MM)',
                          label: 'ISO B2 (707.00 x 500.00 MM)',
                        },
                        {
                          value: 'ISO B4 (250.00 x 354.00 MM)',
                          label: 'ISO B4 (250.00 x 354.00 MM)',
                        },
                        {
                          value: 'ISO B4 (354.00 x 250.00 MM)',
                          label: 'ISO B4 (354.00 x 250.00 MM)',
                        },
                        {
                          value: 'ISO B5 (182.00 x 237.00 MM)',
                          label: 'ISO B5 (182.00 x 237.00 MM)',
                        },
                        {
                          value: 'ISO B5 (237.00 x 182.00 MM)',
                          label: 'ISO B5 (237.00 x 182.00 MM)',
                        },
                        {
                          value: 'ISO C5 (229.00 x 162.00 MM)',
                          label: 'ISO C5 (229.00 x 162.00 MM)',
                        },
                        {
                          value: 'Legal (8.50 x 14.0 Inches)',
                          label: 'Legal (8.50 x 14.0 Inches)',
                        },
                        {
                          value: 'Letter (8.50 x 11.00 Inches)',
                          label: 'Letter (8.50 x 11.00 Inches)',
                        },
                        {
                          value: 'Sun Hi-Res (1280.00 x 1600.00 Pixels)',
                          label: 'Sun Hi-Res (1280.00 x 1600.00 Pixels)',
                        },
                        {
                          value: 'Sun Standard (900.00 x 1152.00 Pixels)',
                          label: 'Sun Standard (900.00 x 1152.00 Pixels)',
                        },
                        {
                          value: 'Super VGA (600.00 x 800.00 Pixels)',
                          label: 'Super VGA (600.00 x 800.00 Pixels)',
                        },
                        {
                          value: 'VGA (480.00 x 640.00 Pixels)',
                          label: 'VGA (480.00 x 640.00 Pixels)',
                        },
                        {
                          value: 'XGA (768.00 x 1024.00 Pixels)',
                          label: 'XGA (768.00 x 1024.00 Pixels)',
                        },
                        {
                          value: 'XGA Hi-Res (1200.00 x 1600.00 Pixels)',
                          label: 'XGA Hi-Res (1200.00 x 1600.00 Pixels)',
                        },
                      ]}
                      value={paperSize}
                      onChange={setPaperSize}
                      placeholder="Select paper size"
                      className="w-full"
                    />
                  </div>
                  {/* Empty space for layout consistency */}
                  <div className="basis-0 box-border content-stretch flex flex-row grow items-start justify-between min-h-px min-w-px p-0 relative shrink-0 w-full"></div>
                </div>

                {/* Right Column - Scale and Units */}
                <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                  <div className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow h-full items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                    {/* Scale */}
                    <div className="box-border content-stretch flex flex-row gap-2.5 items-end justify-start p-0 relative shrink-0 w-full">
                      <div className="basis-0 box-border content-stretch flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                        <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                          <p className="block leading-[normal] whitespace-pre">Scale</p>
                        </div>
                        <Select
                          options={[
                            { value: 'user-defined', label: 'User-defined' },
                            { value: '1:1', label: '1:1' },
                            { value: '1:2', label: '1:2' },
                            { value: '1:4', label: '1:4' },
                            { value: '1:5', label: '1:5' },
                            { value: '1:8', label: '1:8' },
                            { value: '1:10', label: '1:10' },
                            { value: '1:16', label: '1:16' },
                            { value: '1:20', label: '1:20' },
                            { value: '1:30', label: '1:30' },
                            { value: '1:40', label: '1:40' },
                            { value: '1:50', label: '1:50' },
                            { value: '1:100', label: '1:100' },
                            { value: '2:1', label: '2:1' },
                            { value: '4:1', label: '4:1' },
                            { value: '8:1', label: '8:1' },
                            { value: '10:1', label: '10:1' },
                            { value: '100:1', label: '100:1' },
                            { value: '1-128', label: '1/128 inch = 1 foot' },
                            { value: '1-64', label: '1/64 inch = 1 foot' },
                            { value: '1-32', label: '1/32 inch = 1 foot' },
                            { value: '1-16', label: '1/16 inch = 1 foot' },
                            { value: '3-32', label: '3/32 inch = 1 foot' },
                            { value: '1-8', label: '1/8 inch = 1 foot' },
                            { value: '3-16', label: '3/16 inch = 1 foot' },
                            { value: '1-4', label: '1/4 inch = 1 foot' },
                            { value: '3-8', label: '3/8 inch = 1 foot' },
                            { value: '1-2', label: '1/2 inch = 1 foot' },
                            { value: '3-4', label: '3/4 inch = 1 foot' },
                            { value: '1-inch', label: '1 inch = 1 foot' },
                            { value: '1-5-inch', label: '1-1/2 inch = 1 foot' },
                            { value: '3-inch', label: '3 inch = 1 foot' },
                            { value: '6-inch', label: '6 inch = 1 foot' },
                            { value: '12-inch', label: '1 foot = 1 foot' },
                          ]}
                          value={scale}
                          onChange={handleScaleChange}
                          placeholder="Select scale"
                          className="w-full"
                          disabled={fitToPaper}
                        />
                      </div>
                    </div>

                    {/* Checkboxes under Scale */}
                    <div className="box-border content-stretch flex flex-row gap-1.5 items-end justify-start p-0 relative shrink-0 w-full">
                      <Checkbox
                        checked={fitToPaper}
                        onChange={setFitToPaper}
                        label="Fit to paper size"
                      />
                    </div>

                    {/* Units */}
                    <div
                      className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start p-0 relative shrink-0 w-full"
                      style={{
                        opacity: fitToPaper ? 0.5 : undefined,
                        pointerEvents: fitToPaper ? 'none' : 'auto',
                      }}
                    >
                      <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                        <p className="block leading-[normal] whitespace-pre">Units</p>
                      </div>
                      <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0 w-full">
                        <div className="bg-[#141518] box-border content-stretch flex flex-row gap-3 h-7 items-center justify-start p-[10px] relative shrink-0">
                          <div
                            aria-hidden="true"
                            className="absolute border border-[#000000] border-solid inset-[-1px] pointer-events-none"
                          />
                          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                            <p className="block leading-[normal] whitespace-pre">1</p>
                          </div>
                        </div>
                        <div className="basis-0 bg-[#141518] grow h-7 min-h-px min-w-px relative shrink-0">
                          <div
                            aria-hidden="true"
                            className="absolute border border-[#000000] border-solid inset-[-1px] pointer-events-none"
                          />
                          <div className="flex flex-row items-center relative size-full">
                            <div className="box-border content-stretch flex flex-row h-7 items-center justify-between p-[10px] relative w-full">
                              <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                                <p className="block leading-[normal] whitespace-pre">
                                  Milimetres
                                </p>
                              </div>
                              <div
                                className="h-[6.145px] relative shrink-0 w-[10.875px]"
                                data-name="Union"
                              >
                                <svg
                                  className="block size-full"
                                  fill="none"
                                  preserveAspectRatio="none"
                                  role="presentation"
                                  viewBox="0 0 11 7"
                                >
                                  <path
                                    d={svgPathsQuick.p31f4a400}
                                    fill="var(--fill-0, #D5D7E1)"
                                    id="Union"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                          <p className="block leading-[normal] whitespace-pre">=</p>
                        </div>
                        <div className="bg-[#141518] box-border content-stretch flex flex-row gap-3 h-7 items-center justify-start p-[10px] relative shrink-0">
                          <div
                            aria-hidden="true"
                            className="absolute border border-[#000000] border-solid inset-[-1px] pointer-events-none"
                          />
                          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                            <p className="block leading-[normal] whitespace-pre">3.027</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Scale lineweights checkbox */}
                    <div className="box-border content-stretch flex flex-row gap-1.5 items-end justify-start p-0 relative shrink-0 w-full">
                      <Checkbox
                        checked={scaleLineweights}
                        onChange={setScaleLineweights}
                        label="Scale lineweights"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row: Range, Offset, Print Style */}
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-start relative size-full">
              <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start px-5 py-0 relative w-full">
                {/* Left Column - Range and Offset */}
                <div className="basis-0 box-border content-stretch flex flex-col gap-5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                  {/* Range */}
                  <div className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Range</p>
                    </div>
                    <QuickDropdown
                      value="All geometry"
                      options={['All geometry', 'Selected objects', 'Window']}
                    />
                  </div>

                  {/* Offset */}
                  <div className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Offset</p>
                    </div>
                    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0 w-full">
                      <div className="basis-0 box-border content-stretch flex flex-row gap-1.5 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
                        <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                          <p className="block leading-[normal] whitespace-pre">X:</p>
                        </div>
                        <div className="basis-0 bg-[#141518] grow h-7 min-h-px min-w-px relative shrink-0">
                          <div
                            aria-hidden="true"
                            className="absolute border border-[#000000] border-solid inset-[-1px] pointer-events-none"
                          />
                          <div className="flex flex-row items-center relative size-full">
                            <div className="box-border content-stretch flex flex-row font-['Open_Sans:Regular',_sans-serif] gap-1.5 h-7 items-center justify-start leading-[0] not-italic p-[10px] relative text-[12px] text-left text-nowrap w-full">
                              <div className="relative shrink-0 text-[#d5d7e1]">
                                <p className="block leading-[normal] text-nowrap whitespace-pre">
                                  1
                                </p>
                              </div>
                              <div className="relative shrink-0 text-[#898b8c]">
                                <p className="block leading-[normal] text-nowrap whitespace-pre">
                                  mm
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 box-border content-stretch flex flex-row gap-1.5 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
                        <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                          <p className="block leading-[normal] whitespace-pre">Y:</p>
                        </div>
                        <div className="basis-0 bg-[#141518] grow h-7 min-h-px min-w-px relative shrink-0">
                          <div
                            aria-hidden="true"
                            className="absolute border border-[#000000] border-solid inset-[-1px] pointer-events-none"
                          />
                          <div className="flex flex-row items-center relative size-full">
                            <div className="box-border content-stretch flex flex-row font-['Open_Sans:Regular',_sans-serif] gap-1.5 h-7 items-center justify-start leading-[0] not-italic p-[10px] relative text-[12px] text-left text-nowrap w-full">
                              <div className="relative shrink-0 text-[#d5d7e1]">
                                <p className="block leading-[normal] text-nowrap whitespace-pre">
                                  1
                                </p>
                              </div>
                              <div className="relative shrink-0 text-[#898b8c]">
                                <p className="block leading-[normal] text-nowrap whitespace-pre">
                                  mm
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Print Style and Center option */}
                <div className="basis-0 flex flex-row grow items-center self-stretch shrink-0">
                  <div className="basis-0 box-border content-stretch flex flex-col gap-5 grow h-full items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                    {/* Print Style */}
                    <div className="basis-0 box-border content-stretch flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 w-full">
                      <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                        <p className="block leading-[normal] whitespace-pre">Choose print style</p>
                      </div>
                      <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
                        <QuickDropdown
                          value="Print style.ctb"
                          options={['Print style.ctb', 'Other style']}
                        />
                        <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[10px] text-left w-full">
                          <p className="block leading-[normal] whitespace-pre-wrap">
                            You can upload new print style in the Resources section
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Print on center checkbox */}
                    <div className="box-border content-stretch flex flex-row gap-1.5 items-end justify-start p-0 relative shrink-0 w-full">
                      <Checkbox
                        checked={centerOnPaper}
                        onChange={setCenterOnPaper}
                        label="Print on center of paper"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="basis-0 grow min-h-px min-w-px shrink-0 w-full" />
      </div>
    </div>
  );
}

function MainConfigArea({
  searchValue,
  onSearchChange,
  selectAllChecked,
  sheet1Checked,
  sheet2Checked,
  onSelectAllClick,
  onSheet1Click,
  onSheet2Click,
  layoutValue,
  onLayoutChange,
  layout2Value,
  onLayout2Change,
  onLayoutEdit,
  onLayout2Edit,
  appliedLayoutName,
  activeTab,
  onTabChange,
  onPageLayoutClick,
  onPrintClick,
  isPrintDisabled,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectAllChecked: boolean;
  sheet1Checked: boolean;
  sheet2Checked: boolean;
  onSelectAllClick: (checked: boolean) => void;
  onSheet1Click: (checked: boolean) => void;
  onSheet2Click: (checked: boolean) => void;
  layoutValue: string;
  onLayoutChange: (value: string) => void;
  layout2Value: string;
  onLayout2Change: (value: string) => void;
  onLayoutEdit: () => void;
  onLayout2Edit: () => void;
  appliedLayoutName?: string;
  activeTab: 'quick' | 'advanced';
  onTabChange: (tab: 'quick' | 'advanced') => void;
  onPageLayoutClick: () => void;
  onPrintClick: () => void;
  isPrintDisabled: boolean;
}) {
  return (
    <div className="box-border content-stretch flex flex-col justify-between items-start p-0 relative w-full h-full min-h-0">
      {/* Top Content */}
      <div className="box-border content-stretch flex flex-col gap-5 items-start justify-start p-0 relative w-full flex-1 px-[20px] pt-[10px] pb-0">
        {/* Tabs Container above everything */}
        <div className="relative shrink-0 w-full">
          <div className="relative size-full">
            <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-0 py-0 relative w-full">
              <TabsContainer activeTab={activeTab} onTabChange={onTabChange} />
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'quick' ? (
          // Quick print: Show layout settings for current sheet
          <QuickPrintSettings />
        ) : (
          // Advanced print: Show all controls
          <div className="w-full flex flex-col gap-5">
            <SearchSectionWrapper searchValue={searchValue} onSearchChange={onSearchChange} />
            <SheetsConfigGroup
              selectAllChecked={selectAllChecked}
              sheet1Checked={sheet1Checked}
              sheet2Checked={sheet2Checked}
              onSelectAllClick={onSelectAllClick}
              onSheet1Click={onSheet1Click}
              onSheet2Click={onSheet2Click}
              layoutValue={layoutValue}
              onLayoutChange={onLayoutChange}
              layout2Value={layout2Value}
              onLayout2Change={onLayout2Change}
              onLayoutEdit={onLayoutEdit}
              onLayout2Edit={onLayout2Edit}
              appliedLayoutName={appliedLayoutName}
              activeTab={activeTab}
              onTabChange={onTabChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ButtonToolbarBottom({
  onPageLayoutClick,
  onPrintClick,
  isPrintDisabled,
}: {
  onPageLayoutClick: () => void;
  onPrintClick: () => void;
  isPrintDisabled: boolean;
}) {
  const handleHelpClick = () => {
    console.log('Help button clicked');
  };

  return (
    <div
      style={{
        display: 'flex',
        padding: '10px 20px',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flex: '1 0 0',
        alignSelf: 'stretch',
      }}
    >
      {/* Help button on the left */}
      <ButtonIcon icon="help" onClick={handleHelpClick} size="medium" />

      {/* Main action buttons on the right */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-end',
        }}
      >
        <ButtonSecondary onClick={onPageLayoutClick}>Page layout manager</ButtonSecondary>

        <ButtonPrimary onClick={onPrintClick} disabled={isPrintDisabled}>
          Print
        </ButtonPrimary>
      </div>
    </div>
  );
}

// ============================================
// MAIN PRINT TO PDF DIALOG COMPONENT
// ============================================

export function PrintToPdfDialog({
  onClose,
  onPageLayoutManagerOpen,
}: {
  onClose: () => void;
  onPageLayoutManagerOpen: () => void;
}) {
  // State management
  const [searchValue, setSearchValue] = useState('');
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [sheet1Checked, setSheet1Checked] = useState(false);
  const [sheet2Checked, setSheet2Checked] = useState(false);
  const [layoutValue, setLayoutValue] = useState('item1');
  const [layout2Value, setLayout2Value] = useState('item2');
  const [currentSheet, setCurrentSheet] = useState(1);
  const [appliedLayoutName, setAppliedLayoutName] = useState('');
  const [activeTab, setActiveTab] = useState<'quick' | 'advanced'>('quick');

  // Derived state
  const selectedSheets = [...(sheet1Checked ? [1] : []), ...(sheet2Checked ? [2] : [])];
  const selectedCount = selectedSheets.length;
  const isActivateAllActive = selectAllChecked && selectedCount === 2;
  const isActivateAllDisabled = selectedCount === 2;
  const isPrintDisabled = activeTab === 'advanced' && selectedCount === 0;

  // Event handlers
  const handleSelectAllClick = (checked: boolean) => {
    setSelectAllChecked(checked);
    setSheet1Checked(checked);
    setSheet2Checked(checked);
    if (checked && currentSheet === 0) {
      setCurrentSheet(1);
    }
  };

  const handleSheet1Click = (checked: boolean) => {
    setSheet1Checked(checked);
    if (checked && currentSheet === 0) {
      setCurrentSheet(1);
    }
    if (!checked && currentSheet === 1) {
      setCurrentSheet(sheet2Checked ? 2 : 0);
    }
    updateSelectAllState(checked, sheet2Checked);
  };

  const handleSheet2Click = (checked: boolean) => {
    setSheet2Checked(checked);
    if (checked && currentSheet === 0) {
      setCurrentSheet(2);
    }
    if (!checked && currentSheet === 2) {
      setCurrentSheet(sheet1Checked ? 1 : 0);
    }
    updateSelectAllState(sheet1Checked, checked);
  };

  const updateSelectAllState = (sheet1: boolean, sheet2: boolean) => {
    setSelectAllChecked(sheet1 && sheet2);
  };

  const handleActivateAll = () => {
    setSelectAllChecked(true);
    setSheet1Checked(true);
    setSheet2Checked(true);
    if (currentSheet === 0) {
      setCurrentSheet(1);
    }
  };

  const handleClearAll = () => {
    setSelectAllChecked(false);
    setSheet1Checked(false);
    setSheet2Checked(false);
    setCurrentSheet(0);
  };

  const handleExportPDF = () => {
    console.log('Exporting PDF...');
  };

  const handlePrint = () => {
    console.log('Printing...');
  };

  const handleLayoutEdit = () => {
    console.log('Opening layout editor for sheet 1');
    setAppliedLayoutName('Custom Layout from Sheet 1');
    onPageLayoutManagerOpen();
  };

  const handleLayout2Edit = () => {
    console.log('Opening layout editor for sheet 2');
    setAppliedLayoutName('Custom Layout from Sheet 2');
    onPageLayoutManagerOpen();
  };

  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 shadow-[0px_4px_64px_0px_rgba(0,0,0,0.25)] w-[971px] h-[591px]"
      style={{
        backgroundColor: 'var(--color-dialog-bg-darker)',
      }}
      data-name="Print to PDF"
    >
      {/* Header */}
      <DialogHeaderWrapper onClose={onClose} />

      {/* Main Content */}
      <div className="basis-0 box-border content-stretch flex flex-row grow items-stretch justify-start min-h-0 min-w-px p-0 relative shrink-0 w-full">
        {/* Left Panel - только для Quick print показываем новый дизайн */}
        {activeTab === 'quick' ? (
          <QuickPrintLeftPanel />
        ) : (
          <LeftPreviewPanel
            selectedCount={selectedCount}
            currentSheet={currentSheet}
            onSheetChange={setCurrentSheet}
            selectedSheets={selectedSheets}
            hideNavigationArrows={activeTab === 'quick'}
          />
        )}

        {/* Right Panel */}
        <div className="flex flex-col grow min-h-0 w-full">
          <MainConfigArea
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            selectAllChecked={selectAllChecked}
            sheet1Checked={sheet1Checked}
            sheet2Checked={sheet2Checked}
            onSelectAllClick={handleSelectAllClick}
            onSheet1Click={handleSheet1Click}
            onSheet2Click={handleSheet2Click}
            layoutValue={layoutValue}
            onLayoutChange={setLayoutValue}
            layout2Value={layout2Value}
            onLayout2Change={setLayout2Value}
            onLayoutEdit={handleLayoutEdit}
            onLayout2Edit={handleLayout2Edit}
            appliedLayoutName={appliedLayoutName}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onPageLayoutClick={onPageLayoutManagerOpen}
            onPrintClick={handlePrint}
            isPrintDisabled={isPrintDisabled}
          />
          <div className="mt-auto">
            <ButtonToolbarBottom
              onPageLayoutClick={onPageLayoutManagerOpen}
              onPrintClick={handlePrint}
              isPrintDisabled={isPrintDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
