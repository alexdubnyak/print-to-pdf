import imgImage9 from 'figma:asset/7570a0196b27f18f336a34f1c7ff7a1826dd64a5.png';
import React, { useState } from 'react';
import svgPathsQuick from '../imports/svg-4xdfr98ovj';
import svgPaths from '../imports/svg-uo6jg4qcws';
import { ButtonIcon } from './button-icon';
import { ButtonPrimary } from './button-primary';
import { ButtonSecondary } from './button-secondary';
import { Checkbox } from './checkbox';
import { NoPreview } from './no-preview';

import { QuickPrintSettingsNew } from './quick-print-settings-new';
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
    id: 'sheet1',
    name: 'Sheet 1',
    image: imgSheet1Drawing, // 707x500mm Reception Desks Technical Drawing
    widthMm: '707',
    heightMm: '500',
    description: 'Reception Desks Technical Drawing',
  },
  {
    id: 'sheet2',
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
  isModelTabActive = false,
  inverse = false,
  xOffset = '1',
  yOffset = '1',
}: {
  selectedCount: number;
  currentSheet: number;
  onSheetChange: (sheet: number) => void;
  selectedSheets: number[];
  hideNavigationArrows?: boolean;
  isModelTabActive?: boolean;
  inverse?: boolean;
  xOffset?: string;
  yOffset?: string;
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

  // Показываем "No preview available" если ничего не выбрано И (не скрыты стрелки ИЛИ активна вкладка Model)
  if (selectedCount === 0 && (!hideNavigationArrows || isModelTabActive)) {
    return (
      <div className="basis-0 box-border content-stretch flex flex-col grow h-full items-center justify-center min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0 self-stretch">
        <NoPreview />
      </div>
    );
  }

  // In Quick print mode or Model tab, always show Sheet 1 even if nothing is selected
  if (hideNavigationArrows && selectedCount === 0) {
    const sheet1Data = sheets[0]; // Always show first sheet in Quick print
    return (
      <div className="basis-0 box-border content-stretch flex flex-col gap-10 grow items-center justify-start min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0 self-stretch">
        <SheetPreview
          image={sheet1Data.image}
          sheetName={sheet1Data.name}
          widthMm={sheet1Data.widthMm}
          heightMm={sheet1Data.heightMm}
          inverse={inverse}
          xOffset={xOffset}
          yOffset={yOffset}
        />
        <div className="flex flex-col gap-2 items-start">
          <SettingsSection />
        </div>
      </div>
    );
  }

  const currentSheetData = sheets.find(
    sheet => parseInt(sheet.id.replace('sheet', '')) === currentSheet
  );
  const currentIndex = selectedSheets.indexOf(currentSheet);

  // Логика ротации изображений для бесконечного количества листов
  const getSheetDataForCurrentSheet = () => {
    if (currentSheet <= 0) return null;

    // Ротируем между двумя существующими изображениями
    const sheetIndex = (currentSheet - 1) % 2; // 0 для нечетных, 1 для четных
    const baseSheet = sheets[sheetIndex];

    return {
      ...baseSheet,
      name: `Sheet ${currentSheet}`, // Динамическое имя листа
      id: `sheet${currentSheet}`, // Динамический ID
    };
  };

  const rotatedSheetData = getSheetDataForCurrentSheet();

  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-10 grow items-center justify-start min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0 self-stretch">
      {rotatedSheetData && (
        <SheetPreview
          image={rotatedSheetData.image}
          sheetName={rotatedSheetData.name}
          widthMm={rotatedSheetData.widthMm}
          heightMm={rotatedSheetData.heightMm}
          inverse={inverse}
          xOffset={xOffset}
          yOffset={yOffset}
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
  isModelTabActive = false,
  inverse = false,
  xOffset = '1',
  yOffset = '1',
}: {
  selectedCount: number;
  currentSheet: number;
  onSheetChange: (sheet: number) => void;
  selectedSheets: number[];
  hideNavigationArrows?: boolean;
  isModelTabActive?: boolean;
  inverse?: boolean;
  xOffset?: string;
  yOffset?: string;
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
        isModelTabActive={isModelTabActive}
        inverse={inverse}
        xOffset={xOffset}
        yOffset={yOffset}
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

function DynamicSheetCheckboxWrapper({
  sheet,
  isChecked,
  onSheetClick,
}: {
  sheet: { id: string; name: string; isActive: boolean };
  isChecked: boolean;
  onSheetClick: (checked: boolean) => void;
}) {
  return (
    <div className="basis-grow-container w-full">
      <div className="flex-center-container w-full">
        <div className="padded-content w-full">
          <div className="checkbox-row w-full">
            <Checkbox checked={isChecked} onChange={onSheetClick} label={sheet.name} />
          </div>
        </div>
      </div>
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
  onSelectAllClick,
  layoutValue,
  onLayoutChange,
  layout2Value,
  onLayout2Change,
  onLayoutEdit,
  onLayout2Edit,
  appliedLayoutName,
  activeTab,
  onTabChange,
  sheets,
  onSheetsChange,
  checkedSheets,
  onSheetClick,
}: {
  selectAllChecked: boolean;
  onSelectAllClick: (checked: boolean) => void;
  layoutValue: string;
  onLayoutChange: (value: string) => void;
  layout2Value: string;
  onLayout2Change: (value: string) => void;
  onLayoutEdit: () => void;
  onLayout2Edit: () => void;
  appliedLayoutName?: string;
  activeTab: 'quick' | 'advanced';
  onTabChange: (tab: 'quick' | 'advanced') => void;
  sheets: Array<{ id: string; name: string; isActive: boolean }>;
  onSheetsChange: (sheets: Array<{ id: string; name: string; isActive: boolean }>) => void;
  checkedSheets: Record<string, boolean>;
  onSheetClick: (sheetId: string, checked: boolean) => void;
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
                {sheets.map((sheet, index) => {
                  const isSheetChecked = checkedSheets[sheet.id] || false;
                  return (
                    <div key={sheet.id} className="flex flex-row gap-1.5 items-center w-full">
                      <div
                        className="flex-1 rounded h-[36px] flex items-center px-2"
                        style={{ backgroundColor: '#1E2023' }}
                      >
                        <Checkbox
                          checked={isSheetChecked}
                          onChange={checked => onSheetClick(sheet.id, checked)}
                          label={sheet.name}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Page layouts Column */}
            <div className="flex flex-col gap-2.5 flex-1 w-full">
              <PageLayoutsHeader />
              <div className="flex flex-col gap-2.5 w-full">
                {sheets.map((sheet, index) => {
                  const isSheetChecked = checkedSheets[sheet.id] || false;
                  return (
                    <div key={sheet.id} className="flex flex-row gap-1.5 items-center w-full">
                      <div className="flex-1">
                        <Select
                          itemCount={3}
                          itemName1={
                            appliedLayoutName &&
                            appliedLayoutName.startsWith('*') &&
                            appliedLayoutName.endsWith('*')
                              ? appliedLayoutName
                              : `*${sheet.name}*`
                          }
                          itemName2={
                            appliedLayoutName &&
                            appliedLayoutName.startsWith('*') &&
                            appliedLayoutName.endsWith('*')
                              ? appliedLayoutName
                              : `*${sheet.name}*`
                          }
                          itemName3={
                            appliedLayoutName && !appliedLayoutName.startsWith('*')
                              ? appliedLayoutName
                              : 'Custom Layout'
                          }
                          headerText={`${sheet.name} Layout`}
                          value={index === 0 ? layoutValue : layout2Value}
                          onChange={index === 0 ? onLayoutChange : onLayout2Change}
                          className="w-full"
                          disabled={!isSheetChecked}
                        />
                      </div>
                      <ButtonIcon
                        icon="edit-layout"
                        onClick={index === 0 ? onLayoutEdit : onLayout2Edit}
                        disabled={!isSheetChecked}
                      />
                    </div>
                  );
                })}
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

function QuickPrintSheetPreview({
  inverse = false,
  xOffset = '1',
  yOffset = '1',
}: {
  inverse?: boolean;
  xOffset?: string;
  yOffset?: string;
}) {
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
          transform: `${inverse ? 'scaleX(-1) scaleY(-1)' : ''} translateX(${
            parseFloat(xOffset) * 2
          }px) translateY(${parseFloat(yOffset) * 2}px)`.trim(),
          transformOrigin: 'center center',
        }}
      />
      <div className="absolute font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] left-[144.39px] not-italic text-[#d5d7e1] text-[10.966px] text-left text-nowrap top-[-37.92px]">
        <p className="block leading-[normal] whitespace-pre">Sheet 1</p>
      </div>
    </div>
  );
}

function QuickPrintLeftPanel({
  inverse = false,
  xOffset = '1',
  yOffset = '1',
}: {
  inverse?: boolean;
  xOffset?: string;
  yOffset?: string;
}) {
  return (
    <div className="bg-[#1e2023] box-border content-stretch flex flex-row gap-2.5 items-stretch justify-start p-[20px] relative shrink-0 w-[400px] self-stretch min-h-0">
      <div className="basis-0 box-border content-stretch flex flex-col gap-10 grow items-center justify-start min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0 self-stretch">
        <QuickPrintSheetPreview inverse={inverse} xOffset={xOffset} yOffset={yOffset} />
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
function QuickPrintSettings({
  inverse = false,
  onInverseChange,
  isModelTab = false,
  onOffsetChange,
}: {
  inverse?: boolean;
  onInverseChange?: (value: boolean) => void;
  isModelTab?: boolean;
  onOffsetChange?: (xOffset: string, yOffset: string) => void;
}) {
  return (
    <QuickPrintSettingsNew
      inverse={inverse}
      onInverseChange={onInverseChange}
      isModelTab={isModelTab}
      onOffsetChange={onOffsetChange}
    />
  );
}

function MainConfigArea({
  searchValue,
  onSearchChange,
  selectAllChecked,
  onSelectAllClick,
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
  hideTabs,
  sheets,
  onSheetsChange,
  checkedSheets,
  onSheetClick,
  inverse = false,
  onInverseChange,
  isModelTab = false,
  onOffsetChange,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectAllChecked: boolean;
  onSelectAllClick: (checked: boolean) => void;
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
  hideTabs?: boolean;
  sheets: Array<{ id: string; name: string; isActive: boolean }>;
  onSheetsChange: (sheets: Array<{ id: string; name: string; isActive: boolean }>) => void;
  checkedSheets: Record<string, boolean>;
  onSheetClick: (sheetId: string, checked: boolean) => void;
  inverse?: boolean;
  onInverseChange?: (value: boolean) => void;
  isModelTab?: boolean;
  onOffsetChange?: (xOffset: string, yOffset: string) => void;
}) {
  return (
    <div className="box-border content-stretch flex flex-col justify-between items-start p-0 relative w-full h-full min-h-0">
      {/* Top Content */}
      <div className="box-border content-stretch flex flex-col gap-5 items-start justify-start p-0 relative w-full flex-1 px-[20px] pt-[10px] pb-0">
        {/* Tabs Container above everything - скрываем если hideTabs = true */}
        {!hideTabs && (
          <div className="relative shrink-0 w-full">
            <div className="relative size-full">
              <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-0 py-0 relative w-full">
                <TabsContainer activeTab={activeTab} onTabChange={onTabChange} />
              </div>
            </div>
          </div>
        )}

        {/* Content based on active tab */}
        {activeTab === 'quick' ? (
          // Quick print: Show layout settings for current sheet
          <QuickPrintSettings
            inverse={inverse}
            onInverseChange={onInverseChange}
            isModelTab={isModelTab}
            onOffsetChange={onOffsetChange}
          />
        ) : (
          // Advanced print: Show all controls
          <div className="w-full flex flex-col gap-5">
            <SearchSectionWrapper searchValue={searchValue} onSearchChange={onSearchChange} />
            <SheetsConfigGroup
              selectAllChecked={selectAllChecked}
              onSelectAllClick={onSelectAllClick}
              layoutValue={layoutValue}
              onLayoutChange={onLayoutChange}
              layout2Value={layout2Value}
              onLayout2Change={onLayout2Change}
              onLayoutEdit={onLayoutEdit}
              onLayout2Edit={onLayout2Edit}
              appliedLayoutName={appliedLayoutName}
              activeTab={activeTab}
              onTabChange={onTabChange}
              sheets={sheets}
              onSheetsChange={onSheetsChange}
              checkedSheets={checkedSheets}
              onSheetClick={onSheetClick}
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
  activeTab = 'quick',
}: {
  onPageLayoutClick: () => void;
  onPrintClick: () => void;
  isPrintDisabled: boolean;
  activeTab?: 'quick' | 'advanced';
}) {
  const handleHelpClick = () => {
    console.log('Help button clicked');
  };

  const handleSaveLayoutClick = () => {
    console.log('Save layout button clicked');
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
        {activeTab === 'quick' && (
          <ButtonSecondary onClick={handleSaveLayoutClick}>Save layout</ButtonSecondary>
        )}
        <ButtonSecondary onClick={onPageLayoutClick}>Page layout manager</ButtonSecondary>

        <ButtonPrimary onClick={onPrintClick} disabled={isPrintDisabled}>
          Print
        </ButtonPrimary>
      </div>
    </div>
  );
}

// ============================================
// LAYOUT EDIT DIALOG COMPONENT
// ============================================

export function LayoutEditDialog({
  sheetName,
  onClose,
}: {
  sheetName: string;
  onClose: () => void;
}) {
  const [inverse, setInverse] = useState(false);
  const [xOffset, setXOffset] = useState('1');
  const [yOffset, setYOffset] = useState('1');

  const handleOffsetChange = (newXOffset: string, newYOffset: string) => {
    setXOffset(newXOffset);
    setYOffset(newYOffset);
  };

  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 shadow-[0px_4px_64px_0px_rgba(0,0,0,0.25)] w-[971px] h-[591px]"
      style={{
        backgroundColor: 'var(--color-dialog-bg-darker)',
      }}
      data-name="Layout Edit Dialog"
    >
      {/* Header */}
      <DialogHeaderWrapper onClose={onClose} />

      {/* Main Content */}
      <div className="basis-0 box-border content-stretch flex flex-row grow items-stretch justify-start min-h-0 min-w-px p-0 relative shrink-0 w-full">
        {/* Left Panel - Quick Print Preview */}
        <QuickPrintLeftPanel inverse={inverse} xOffset={xOffset} yOffset={yOffset} />

        {/* Right Panel - Settings without tabs */}
        <div className="flex flex-col grow min-h-0 w-full">
          {/* Custom header where tabs were */}
          <div className="box-border content-stretch flex flex-row items-center justify-start p-[20px] relative shrink-0 w-full">
            <div style={{ marginRight: '10px' }}>
              <SheetNavigationLeft disabled={false} onClick={onClose} />
            </div>
            <div
              className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[16px] text-left text-nowrap"
              style={{ marginLeft: '10px' }}
            >
              <p className="block leading-[normal] whitespace-pre">{sheetName} layout settings</p>
            </div>
          </div>

          {/* Settings content */}
          <div className="flex flex-col grow min-h-0 w-full px-[20px] pb-[20px]">
            <QuickPrintSettings
              inverse={inverse}
              onInverseChange={setInverse}
              isModelTab={false}
              onOffsetChange={handleOffsetChange}
            />
          </div>
          <div className="mt-auto">
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
              <ButtonIcon
                icon="help"
                onClick={() => console.log('Help button clicked')}
                size="medium"
              />

              {/* Action buttons on the right */}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-end',
                }}
              >
                <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
                <ButtonPrimary onClick={() => console.log('Save layout clicked')}>
                  Save layout
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
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
  activeTab,
  sheets,
  onSheetsChange,
}: {
  onClose: () => void;
  onPageLayoutManagerOpen: () => void;
  activeTab: string;
  sheets: Array<{ id: string; name: string; isActive: boolean }>;
  onSheetsChange: (sheets: Array<{ id: string; name: string; isActive: boolean }>) => void;
}) {
  // State management
  const [searchValue, setSearchValue] = useState('');
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [checkedSheets, setCheckedSheets] = useState<Record<string, boolean>>({});
  const [layoutValue, setLayoutValue] = useState('item1');
  const [layout2Value, setLayout2Value] = useState('item2');
  const [currentSheet, setCurrentSheet] = useState(1);
  const [appliedLayoutName, setAppliedLayoutName] = useState('');
  const [activeTabInternal, setActiveTabInternal] = useState<'quick' | 'advanced'>('quick');
  const [isLayoutEditOpen, setIsLayoutEditOpen] = useState(false);
  const [editingSheetName, setEditingSheetName] = useState('');
  const [inverse, setInverse] = useState(false);
  const [xOffset, setXOffset] = useState('1');
  const [yOffset, setYOffset] = useState('1');

  const handleOffsetChange = (newXOffset: string, newYOffset: string) => {
    setXOffset(newXOffset);
    setYOffset(newYOffset);
  };

  // Если активна вкладка Model, принудительно устанавливаем Quick print режим
  const isModelTabActive = activeTab === 'model';
  const effectiveActiveTab = isModelTabActive ? 'quick' : activeTabInternal;

  // Derived state
  const selectedSheets = sheets
    .filter(sheet => checkedSheets[sheet.id])
    .map(sheet => parseInt(sheet.id.replace('sheet', '')));
  const selectedCount = selectedSheets.length;
  const isActivateAllActive = selectAllChecked && selectedCount === sheets.length;
  const isActivateAllDisabled = selectedCount === sheets.length;
  const isPrintDisabled = activeTab === 'advanced' && selectedCount === 0;

  // Event handlers
  const handleSelectAllClick = (checked: boolean) => {
    setSelectAllChecked(checked);
    sheets.forEach(sheet => {
      setCheckedSheets(prev => ({ ...prev, [sheet.id]: checked }));
    });
    if (checked && currentSheet === 0) {
      setCurrentSheet(1);
    }
  };

  const handleSheetClick = (sheetId: string, checked: boolean) => {
    setCheckedSheets(prev => ({ ...prev, [sheetId]: checked }));

    if (checked && currentSheet === 0) {
      setCurrentSheet(parseInt(sheetId.replace('sheet', '')));
    }
    if (!checked && currentSheet === parseInt(sheetId.replace('sheet', ''))) {
      const nextCheckedSheet = sheets.find(
        sheet => checkedSheets[sheet.id] && sheet.id !== sheetId
      );
      setCurrentSheet(nextCheckedSheet ? parseInt(nextCheckedSheet.id.replace('sheet', '')) : 0);
    }

    // Обновляем selectAllChecked на основе состояния всех sheets
    const allChecked = sheets.every(sheet =>
      sheetId === sheet.id ? checked : checkedSheets[sheet.id]
    );
    setSelectAllChecked(allChecked);
  };

  const updateSelectAllState = (sheet1: boolean, sheet2: boolean) => {
    setSelectAllChecked(sheet1 && sheet2);
  };

  const handleActivateAll = () => {
    setSelectAllChecked(true);
    sheets.forEach(sheet => {
      setCheckedSheets(prev => ({ ...prev, [sheet.id]: true }));
    });
    if (currentSheet === 0) {
      setCurrentSheet(1);
    }
  };

  const handleClearAll = () => {
    setSelectAllChecked(false);
    setCheckedSheets({});
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
    setEditingSheetName('Sheet 1');
    setIsLayoutEditOpen(true);
  };

  const handleLayout2Edit = () => {
    console.log('Opening layout editor for sheet 2');
    setEditingSheetName('Sheet 2');
    setIsLayoutEditOpen(true);
  };

  const handleCloseLayoutEdit = () => {
    console.log('Closing layout editor');
    setIsLayoutEditOpen(false);
    setEditingSheetName('');
  };

  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 shadow-[0px_4px_64px_0px_rgba(0,0,0,0.25)] w-[971px] h-[591px]"
      style={{
        backgroundColor: 'var(--color-dialog-bg-darker)',
      }}
      data-name="Print to PDF"
    >
      {/* Show LayoutEditDialog if editing layout */}
      {isLayoutEditOpen ? (
        <LayoutEditDialog sheetName={editingSheetName} onClose={handleCloseLayoutEdit} />
      ) : (
        <>
          {/* Header */}
          <DialogHeaderWrapper onClose={onClose} />

          {/* Main Content */}
          <div className="basis-0 box-border content-stretch flex flex-row grow items-stretch justify-start min-h-0 min-w-px p-0 relative shrink-0 w-full">
            {/* Left Panel - используем LeftPreviewPanel для Model вкладки, QuickPrintLeftPanel для обычного Quick print */}
            {effectiveActiveTab === 'quick' && !isModelTabActive ? (
              <QuickPrintLeftPanel inverse={inverse} xOffset={xOffset} yOffset={yOffset} />
            ) : (
              <LeftPreviewPanel
                selectedCount={selectedCount}
                currentSheet={currentSheet}
                onSheetChange={setCurrentSheet}
                selectedSheets={selectedSheets}
                hideNavigationArrows={effectiveActiveTab === 'quick'}
                isModelTabActive={isModelTabActive}
                inverse={inverse}
                xOffset={xOffset}
                yOffset={yOffset}
              />
            )}

            {/* Right Panel */}
            <div className="flex flex-col grow min-h-0 w-full">
              <MainConfigArea
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                selectAllChecked={selectAllChecked}
                onSelectAllClick={handleSelectAllClick}
                layoutValue={layoutValue}
                onLayoutChange={setLayoutValue}
                layout2Value={layout2Value}
                onLayout2Change={setLayout2Value}
                onLayoutEdit={handleLayoutEdit}
                onLayout2Edit={handleLayout2Edit}
                appliedLayoutName={appliedLayoutName}
                activeTab={effectiveActiveTab}
                onTabChange={setActiveTabInternal}
                onPageLayoutClick={onPageLayoutManagerOpen}
                onPrintClick={handlePrint}
                isPrintDisabled={isPrintDisabled}
                hideTabs={isModelTabActive}
                sheets={sheets}
                onSheetsChange={onSheetsChange}
                checkedSheets={checkedSheets}
                onSheetClick={handleSheetClick}
                inverse={inverse}
                onInverseChange={setInverse}
                isModelTab={isModelTabActive}
                onOffsetChange={handleOffsetChange}
              />
              <div className="mt-auto">
                <ButtonToolbarBottom
                  onPageLayoutClick={onPageLayoutManagerOpen}
                  onPrintClick={handlePrint}
                  isPrintDisabled={isPrintDisabled}
                  activeTab={effectiveActiveTab}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
