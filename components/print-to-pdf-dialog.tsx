import { useState } from "react";
import svgPaths from "../imports/svg-uo6jg4qcws";
import { ButtonPrimary } from "./button-primary";
import { ButtonSecondary } from "./button-secondary";
import { ButtonIcon } from "./button-icon";
import { Checkbox } from "./checkbox";
import { TextInput } from "./text-input";
import { Select } from "./select";
import { SheetNavigationLeft } from "./sheet-navigation-left";
import { SheetNavigationRight } from "./sheet-navigation-right";
import { SheetPreview } from "./sheet-preview";
import { NoPreview } from "./no-preview";
import { LayoutEditor } from "./layout-editor";

// ============================================
// IMAGE ASSETS - Technical Drawing References
// ============================================

// Technical Drawing Images - Direct URLs to real technical drawings
const TECHNICAL_DRAWING_SHEET_1 =
  "https://dwgmodels.com/uploads/posts/2023-12/reception-desks-for-hotels_m.jpg"; // 707x500mm Horizontal Technical Drawing
const TECHNICAL_DRAWING_SHEET_2 =
  "https://dwgmodels.com/uploads/posts/2018-08/1534800474_facades-of-the-old-power-station_m.jpg"; // 841x594mm A1 Vertical Technical Drawing

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
    name: "Sheet 1",
    image: imgSheet1Drawing, // 707x500mm Reception Desks Technical Drawing
    widthMm: "707",
    heightMm: "500",
    description: "Reception Desks Technical Drawing",
  },
  {
    id: 2,
    name: "Sheet 2",
    image: imgSheet2Drawing, // 841x594mm Power Station Technical Drawing
    widthMm: "841",
    heightMm: "594",
    description: "Power Station Technical Drawing",
  },
];

// ============================================
// LAYOUT MAPPING CONFIGURATION
// ============================================

// Mapping between select values and layout names
const layoutValueToName = {
  item1: "*Sheet1*",
  item2: "*Sheet2*",
  item3: "Custom Layout",
};

// Helper function to get layout name from value
const getLayoutNameFromValue = (value: string): string => {
  return (
    layoutValueToName[
      value as keyof typeof layoutValueToName
    ] || "Unknown Layout"
  );
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
      className={isActive ? "activate-all-active" : ""}
    />
  );
}

function DeactivateButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <ButtonIcon
      icon="deactivate"
      onClick={onClick}
      variant="secondary"
    />
  );
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
      <ButtonSecondary onClick={onClick}>
        Export PDF
      </ButtonSecondary>
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
      className="absolute box-border content-stretch flex flex-row items-center justify-between left-[497px] p-[10px] top-[520px] w-[501px]"
      style={{ backgroundColor: "var(--color-dialog-bg-dark)" }}
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
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 37 37"
      >
        <g id="actions">
          <path
            d={svgPaths.p4aac200}
            fill="var(--color-icon-fill, #DFDFDF)"
            id="Union"
          />
        </g>
      </svg>
    </div>
  );
}

function DialogHeader({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="relative shrink-0 w-full"
      style={{ backgroundColor: "var(--color-dialog-bg-dark)" }}
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-2.5 py-0 relative w-full">
          <div
            className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[11px] text-left text-nowrap uppercase"
            style={{ color: "var(--color-text-light)" }}
          >
            <p className="block leading-[normal] whitespace-pre">
              Print to pdf
            </p>
          </div>
          <CloseButton onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

function DialogHeaderWrapper({
  onClose,
}: {
  onClose: () => void;
}) {
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
        <p className="block leading-[normal]">
          ISO A3 (420.00 x 297.00 MM)
        </p>
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
        style={{ color: "var(--color-text-muted)" }}
      >
        <p className="block leading-[normal] whitespace-pre">
          Settings
        </p>
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
}: {
  selectedCount: number;
  currentSheet: number;
  onSheetChange: (sheet: number) => void;
  selectedSheets: number[];
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

  if (selectedCount === 0) {
    return (
      <div className="basis-0 box-border content-stretch flex flex-col grow h-full items-center justify-center min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0">
        <NoPreview />
      </div>
    );
  }

  const currentSheetData = sheets.find(
    (sheet) => sheet.id === currentSheet,
  );
  const currentIndex = selectedSheets.indexOf(currentSheet);

  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-10 grow h-full items-center justify-start min-h-px min-w-px pb-0 pt-10 px-0 relative shrink-0">
      {currentSheetData && (
        <SheetPreview
          image={currentSheetData.image}
          sheetName={currentSheetData.name}
          widthMm={currentSheetData.widthMm}
          heightMm={currentSheetData.heightMm}
        />
      )}
      <div className="flex flex-col gap-2 items-start">
        <div className="flex gap-2 items-center justify-center w-full">
          <SheetNavigationLeft
            disabled={selectedCount === 1 || currentIndex === 0}
            onClick={handlePrevious}
          />
          <SheetNavigationRight
            disabled={
              selectedCount === 1 ||
              currentIndex === selectedSheets.length - 1
            }
            onClick={handleNext}
          />
        </div>
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
}: {
  selectedCount: number;
  currentSheet: number;
  onSheetChange: (sheet: number) => void;
  selectedSheets: number[];
}) {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 h-full items-center justify-start p-[20px] relative shrink-0 w-[400px]"
      style={{ backgroundColor: "var(--color-dialog-bg-dark)" }}
    >
      <PreviewArea
        selectedCount={selectedCount}
        currentSheet={currentSheet}
        onSheetChange={onSheetChange}
        selectedSheets={selectedSheets}
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
        style={{ color: "var(--color-text-light)" }}
      >
        <p className="block leading-[normal] whitespace-pre">
          Search sheets
        </p>
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
    <div className="content-section">
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
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-5 py-0 relative w-full">
          <SearchSection
            searchValue={searchValue}
            onSearchChange={onSearchChange}
          />
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
      style={{ color: "var(--color-text-light)" }}
    >
      <p className="block leading-[normal] whitespace-pre">
        Sheets
      </p>
    </div>
  );
}

function PageLayoutsHeader() {
  return (
    <div
      className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap"
      style={{ color: "var(--color-text-light)" }}
    >
      <p className="block leading-[normal] whitespace-pre">
        Page layouts
      </p>
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
    <div className="checkbox-row order-3">
      <Checkbox
        checked={selectAllChecked}
        onChange={onSelectAllClick}
        label="Select all sheets"
      />
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
    <div className="checkbox-row">
      <Checkbox
        checked={sheet1Checked}
        onChange={onSheet1Click}
        label="Sheet 1"
      />
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
    <div className="basis-grow-container">
      <div className="flex-center-container">
        <div className="padded-content">
          <Sheet1Checkbox
            sheet1Checked={sheet1Checked}
            onSheet1Click={onSheet1Click}
          />
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
    <div className="checkbox-row">
      <Checkbox
        checked={sheet2Checked}
        onChange={onSheet2Click}
        label="Sheet 2"
      />
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
    <div className="basis-grow-container">
      <div className="flex-center-container">
        <div className="padded-content">
          <Sheet2Checkbox
            sheet2Checked={sheet2Checked}
            onSheet2Click={onSheet2Click}
          />
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
}) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col-reverse gap-2.5 items-start justify-start px-5 py-0 relative w-full">
          <SelectAllCheckbox
            selectAllChecked={selectAllChecked}
            onSelectAllClick={onSelectAllClick}
          />
          
          {/* Main content row with Sheets and Page layouts columns */}
          <div className="flex flex-row gap-1.5 w-full">
            {/* Sheets Column */}
            <div className="flex flex-col gap-2.5 flex-1">
              <SheetsHeader />
              <div className="flex flex-col gap-2.5">
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
            <div className="flex flex-col gap-2.5 flex-1">
              <PageLayoutsHeader />
              <div className="flex flex-col gap-2.5">
                <div className="flex flex-row gap-1.5 items-center">
                  <div className="flex-1">
                    <Select
                      itemCount={3}
                      itemName1={
                        appliedLayoutName &&
                        appliedLayoutName.startsWith("*") &&
                        appliedLayoutName.endsWith("*")
                          ? appliedLayoutName
                          : "*Sheet1*"
                      }
                      itemName2={
                        appliedLayoutName &&
                        appliedLayoutName.startsWith("*") &&
                        appliedLayoutName.endsWith("*")
                          ? appliedLayoutName
                          : "*Sheet2*"
                      }
                      itemName3={
                        appliedLayoutName &&
                        !appliedLayoutName.startsWith("*")
                          ? appliedLayoutName
                          : "Custom Layout"
                      }
                      headerText="Sheet 1 Layout"
                      value={layoutValue}
                      onChange={onLayoutChange}
                      className="w-full"
                      disabled={!sheet1Checked}
                    />
                  </div>
                  <ButtonIcon
                    icon="edit-layout"
                    onClick={onLayoutEdit}
                    disabled={!sheet1Checked}
                  />
                </div>
                
                <div className="flex flex-row gap-1.5 items-center">
                  <div className="flex-1">
                    <Select
                      itemCount={3}
                      itemName1={
                        appliedLayoutName &&
                        appliedLayoutName.startsWith("*") &&
                        appliedLayoutName.endsWith("*")
                          ? appliedLayoutName
                          : "*Sheet1*"
                      }
                      itemName2={
                        appliedLayoutName &&
                        appliedLayoutName.startsWith("*") &&
                        appliedLayoutName.endsWith("*")
                          ? appliedLayoutName
                          : "*Sheet2*"
                      }
                      itemName3={
                        appliedLayoutName &&
                        !appliedLayoutName.startsWith("*")
                          ? appliedLayoutName
                          : "Custom Layout"
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
}) {
  return (
    <div className="box-border content-stretch flex flex-col gap-5 items-start justify-start order-2 p-0 relative shrink-0 w-full">
      <SearchSectionWrapper
        searchValue={searchValue}
        onSearchChange={onSearchChange}
      />
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
      />
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
    console.log("Help button clicked");
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "10px 20px",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flex: "1 0 0",
        alignSelf: "stretch",
      }}
    >
      {/* Help button on the left */}
      <ButtonIcon
        icon="help"
        onClick={handleHelpClick}
        size="medium"
      />
      
      {/* Main action buttons on the right */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "flex-end",
        }}
      >
        <ButtonSecondary onClick={onPageLayoutClick}>
          Page layout manager
        </ButtonSecondary>

        <ButtonPrimary
          onClick={onPrintClick}
          disabled={isPrintDisabled}
        >
          Print
        </ButtonPrimary>
      </div>
    </div>
  );
}

function RightConfigPanel({
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
  onPageLayoutClick,
  onPrintClick,
  isPrintDisabled,
  onLayoutEdit,
  onLayout2Edit,
  appliedLayoutName,
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
  onPageLayoutClick: () => void;
  onPrintClick: () => void;
  isPrintDisabled: boolean;
  onLayoutEdit: () => void;
  onLayout2Edit: () => void;
  appliedLayoutName?: string;
}) {
  return (
    <div className="box-border content-stretch flex flex-col-reverse gap-5 h-full items-start justify-start pb-0 pt-5 px-0 relative shrink-0 w-[571px]">
      <MainConfigArea
        searchValue={searchValue}
        onSearchChange={onSearchChange}
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
      />
      <ButtonToolbarBottom
        onPageLayoutClick={onPageLayoutClick}
        onPrintClick={onPrintClick}
        isPrintDisabled={isPrintDisabled}
      />
    </div>
  );
}

function DialogMainContent({
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
  onPageLayoutClick,
  onPrintClick,
  isPrintDisabled,
  selectedCount,
  currentSheet,
  onSheetChange,
  selectedSheets,
  onLayoutEdit,
  onLayout2Edit,
  isLayoutEditorOpen,
  editingLayoutSheet,
  onLayoutEditorClose,
  onLayoutEditorSave,
  appliedLayoutName,
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
  onPageLayoutClick: () => void;
  onPrintClick: () => void;
  isPrintDisabled: boolean;
  selectedCount: number;
  currentSheet: number;
  onSheetChange: (sheet: number) => void;
  selectedSheets: number[];
  onLayoutEdit: () => void;
  onLayout2Edit: () => void;
  isLayoutEditorOpen: boolean;
  editingLayoutSheet: string;
  onLayoutEditorClose: () => void;
  onLayoutEditorSave: () => void;
  appliedLayoutName?: string;
}) {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 w-full">
      <LeftPreviewPanel
        selectedCount={selectedCount}
        currentSheet={currentSheet}
        onSheetChange={onSheetChange}
        selectedSheets={selectedSheets}
      />
      {isLayoutEditorOpen ? (
        <LayoutEditor
          sheetName={editingLayoutSheet}
          onClose={onLayoutEditorClose}
          onSave={onLayoutEditorSave}
        />
      ) : (
        <RightConfigPanel
          searchValue={searchValue}
          onSearchChange={onSearchChange}
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
          onPageLayoutClick={onPageLayoutClick}
          onPrintClick={onPrintClick}
          isPrintDisabled={isPrintDisabled}
          onLayoutEdit={onLayoutEdit}
          onLayout2Edit={onLayout2Edit}
          appliedLayoutName={appliedLayoutName}
        />
      )}
    </div>
  );
}

function DialogContainer({
  onClose,
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
  onPageLayoutClick,
  onPrintClick,
  isPrintDisabled,
  selectedCount,
  currentSheet,
  onSheetChange,
  selectedSheets,
  onLayoutEdit,
  onLayout2Edit,
  isLayoutEditorOpen,
  editingLayoutSheet,
  onLayoutEditorClose,
  onLayoutEditorSave,
  appliedLayoutName,
}: {
  onClose: () => void;
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
  onPageLayoutClick: () => void;
  onPrintClick: () => void;
  isPrintDisabled: boolean;
  selectedCount: number;
  currentSheet: number;
  onSheetChange: (sheet: number) => void;
  selectedSheets: number[];
  onLayoutEdit: () => void;
  onLayout2Edit: () => void;
  isLayoutEditorOpen: boolean;
  editingLayoutSheet: string;
  onLayoutEditorClose: () => void;
  onLayoutEditorSave: () => void;
  appliedLayoutName?: string;
}) {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-px grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0 w-full">
      <DialogHeaderWrapper onClose={onClose} />
      <DialogMainContent
        searchValue={searchValue}
        onSearchChange={onSearchChange}
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
        onPageLayoutClick={onPageLayoutClick}
        onPrintClick={onPrintClick}
        isPrintDisabled={isPrintDisabled}
        selectedCount={selectedCount}
        currentSheet={currentSheet}
        onSheetChange={onSheetChange}
        selectedSheets={selectedSheets}
        onLayoutEdit={onLayoutEdit}
        onLayout2Edit={onLayout2Edit}
        isLayoutEditorOpen={isLayoutEditorOpen}
        editingLayoutSheet={editingLayoutSheet}
        onLayoutEditorClose={onLayoutEditorClose}
        onLayoutEditorSave={onLayoutEditorSave}
        appliedLayoutName={appliedLayoutName}
      />
    </div>
  );
}

// ============================================
// PRINT TO PDF DIALOG MAIN COMPONENT
// ============================================

interface PrintToPdfDialogProps {
  onClose: () => void;
  onPageLayoutManagerOpen: () => void;
}

export function PrintToPdfDialog({ onClose, onPageLayoutManagerOpen }: PrintToPdfDialogProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [sheet1Checked, setSheet1Checked] = useState(false);
  const [sheet2Checked, setSheet2Checked] = useState(false);
  const [layoutValue, setLayoutValue] = useState("item1");
  const [layout2Value, setLayout2Value] = useState("item1");
  const [currentSheet, setCurrentSheet] = useState(1);

  // Layout editor states
  const [isLayoutEditorOpen, setIsLayoutEditorOpen] = useState(false);
  const [editingLayoutSheet, setEditingLayoutSheet] = useState<string>("");

  // ============================================
  // ACTIVATE ALL SHEETS FUNCTIONALITY
  // ============================================

  const [isActivateAllActive, setIsActivateAllActive] = useState(false);
  const [originalLayoutValues, setOriginalLayoutValues] = useState<{
    layout1: string;
    layout2: string;
  } | null>(null);

  // Calculate selected sheets array and current sheet logic
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

  // Function to get the currently active layout from checked sheets
  const getActiveLayoutName = (): string | null => {
    if (sheet1Checked && sheet2Checked) {
      const layout1Name = getLayoutNameFromValue(layoutValue);
      const layout2Name = getLayoutNameFromValue(layout2Value);

      if (layout1Name !== "*Sheet1*") return layout1Name;
      if (layout2Name !== "*Sheet1*") return layout2Name;
      return layout1Name;
    } else if (sheet1Checked) {
      return getLayoutNameFromValue(layoutValue);
    } else if (sheet2Checked) {
      return getLayoutNameFromValue(layout2Value);
    }

    return null;
  };

  const isActivateAllDisabled = selectedCount === 0;

  const handleActivateAll = () => {
    if (isActivateAllDisabled) return;

    if (!isActivateAllActive) {
      const activeLayoutName = getActiveLayoutName();

      if (activeLayoutName) {
        setOriginalLayoutValues({
          layout1: layoutValue,
          layout2: layout2Value,
        });

        let targetValue = "item1";

        if (activeLayoutName === "*Sheet1*")
          targetValue = "item1";
        else if (activeLayoutName === "*Sheet2*")
          targetValue = "item2";
        else if (activeLayoutName === "Custom Layout")
          targetValue = "item3";

        if (sheet1Checked) {
          setLayoutValue(targetValue);
        }
        if (sheet2Checked) {
          setLayout2Value(targetValue);
        }

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
      console.log("🔄 Deactivated all sheets - restored original layouts");
    }
  };

  const appliedLayoutName = isActivateAllActive ? getActiveLayoutName() : undefined;

  const handleSelectAll = () => {
    console.log("Select All clicked");
  };

  const handleClearAll = () => {
    console.log("Clear All clicked");
  };

  const handleExportPDF = () => {
    console.log("Export PDF clicked");
  };

  const handleSelectAllClick = (checked: boolean) => {
    setSelectAllChecked(checked);
    setSheet1Checked(checked);
    setSheet2Checked(checked);
    if (checked) {
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

  const handleSheet1Click = (checked: boolean) => {
    setSheet1Checked(checked);

    if (checked && sheet2Checked) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }

    if (checked) {
      if (currentSheet === 0 || (!sheet2Checked && currentSheet !== 1)) {
        setCurrentSheet(1);
      }
    } else {
      if (currentSheet === 1) {
        if (sheet2Checked) {
          setCurrentSheet(2);
        }
      }
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

    if (checked && sheet1Checked) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }

    if (checked) {
      if (currentSheet === 0 || (!sheet1Checked && currentSheet !== 2)) {
        setCurrentSheet(2);
      }
    } else {
      if (currentSheet === 2) {
        if (sheet1Checked) {
          setCurrentSheet(1);
        }
      }
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

  const handleLayoutChange = (value: string) => {
    setLayoutValue(value);
    console.log("Layout 1 changed to:", value);

    if (isActivateAllActive) {
      setIsActivateAllActive(false);
      setOriginalLayoutValues(null);
    }
  };

  const handleLayout2Change = (value: string) => {
    setLayout2Value(value);
    console.log("Layout 2 changed to:", value);

    if (isActivateAllActive) {
      setIsActivateAllActive(false);
      setOriginalLayoutValues(null);
    }
  };

  const handlePageLayoutClick = () => {
    onPageLayoutManagerOpen();
    console.log("Opening Page Layout Manager");
  };

  const handlePrintClick = () => {
    if (!isPrintDisabled) {
      console.log("Print clicked");
    }
  };

  const handleSheetChange = (sheet: number) => {
    setCurrentSheet(sheet);
    console.log(`🔄 ПЕРЕКЛЮЧЕНИЕ НА SHEET ${sheet}`);
  };

  // Layout editor handlers
  const handleLayoutEdit = () => {
    setEditingLayoutSheet("Sheet 1");
    setIsLayoutEditorOpen(true);
    console.log("Opening layout editor for Sheet 1");
  };

  const handleLayout2Edit = () => {
    setEditingLayoutSheet("Sheet 2");
    setIsLayoutEditorOpen(true);
    console.log("Opening layout editor for Sheet 2");
  };

  const handleLayoutEditorClose = () => {
    setIsLayoutEditorOpen(false);
    setEditingLayoutSheet("");
    console.log("Layout editor closed");
  };

  const handleLayoutEditorSave = (settings?: any) => {
    console.log(`Layout settings saved for ${editingLayoutSheet}:`, settings);
    setIsLayoutEditorOpen(false);
    setEditingLayoutSheet("");
  };

  return (
    <>
      <div
        className="absolute h-[145.5px] left-[499px] top-[368.5px] w-[486.5px]"
        style={{
          backgroundColor: "var(--color-dialog-bg-darker)",
        }}
      />
      <BottomActionToolbar
        onActivateAll={handleActivateAll}
        onClearAll={handleClearAll}
        onExportPDF={handleExportPDF}
        isActivateAllActive={isActivateAllActive}
        isActivateAllDisabled={isActivateAllDisabled}
      />
      <div
        className="absolute box-border content-stretch flex flex-col h-[591px] items-start justify-between p-0 shadow-[0px_4px_64px_0px_rgba(0,0,0,0.25)] top-[147.5px] translate-x-[-50%] w-[971px] print-dialog-position"
        style={{
          backgroundColor: "var(--color-dialog-bg-darker)",
        }}
        data-name="Print to PDF"
      >
        <DialogContainer
          onClose={onClose}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          selectAllChecked={selectAllChecked}
          sheet1Checked={sheet1Checked}
          sheet2Checked={sheet2Checked}
          onSelectAllClick={handleSelectAllClick}
          onSheet1Click={handleSheet1Click}
          onSheet2Click={handleSheet2Click}
          layoutValue={layoutValue}
          onLayoutChange={handleLayoutChange}
          layout2Value={layout2Value}
          onLayout2Change={handleLayout2Change}
          onPageLayoutClick={handlePageLayoutClick}
          onPrintClick={handlePrintClick}
          isPrintDisabled={isPrintDisabled}
          selectedCount={selectedCount}
          currentSheet={currentSheet}
          onSheetChange={handleSheetChange}
          selectedSheets={selectedSheets}
          onLayoutEdit={handleLayoutEdit}
          onLayout2Edit={handleLayout2Edit}
          isLayoutEditorOpen={isLayoutEditorOpen}
          editingLayoutSheet={editingLayoutSheet}
          onLayoutEditorClose={handleLayoutEditorClose}
          onLayoutEditorSave={handleLayoutEditorSave}
          appliedLayoutName={appliedLayoutName}
        />
      </div>
    </>
  );
}