import { useState } from 'react';

// ============================================
// COMPONENT STUBS - Temporary placeholders
// ============================================

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

interface ButtonIconProps {
  icon: string;
  onClick?: () => void;
  variant?: 'default' | 'secondary';
  disabled?: boolean;
  className?: string;
}

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showSearchIcon?: boolean;
}

interface SelectProps {
  itemCount: number;
  itemName1?: string;
  itemName2?: string;
  itemName3?: string;
  headerText: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

// Component stubs
export function ButtonPrimary({ children, onClick, disabled, className }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`button-primary ${className || ''} ${disabled ? 'opacity-50' : ''}`}
    >
      {children}
    </button>
  );
}

export function ButtonSecondary({ children, onClick, className }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`button-secondary ${className || ''}`}
    >
      {children}
    </button>
  );
}

export function ButtonIcon({ icon, onClick, variant = 'default', disabled, className }: ButtonIconProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`w-7 h-7 button-icon-${variant} ${className || ''} ${disabled ? 'opacity-50' : ''}`}
    >
      <div className="w-4 h-4 flex items-center justify-center text-white">
        {icon === 'approve' && '✓'}
        {icon === 'deactivate' && '✕'}
        {icon === 'edit-layout' && '⚙'}
        {!['approve', 'deactivate', 'edit-layout'].includes(icon) && '●'}
      </div>
    </button>
  );
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 bg-[#141518] border border-[#333] rounded checked:bg-[#2160D3]"
      />
      <span className="text-[#d5d7e1] text-12px">{label}</span>
    </label>
  );
}

export function TextInput({ value, onChange, placeholder, showSearchIcon }: TextInputProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-7 bg-[#141518] border border-[#000] text-[#d5d7e1] text-12px px-2"
      />
      {showSearchIcon && (
        <div className="absolute right-2 top-1 text-[#8e8f90]">🔍</div>
      )}
    </div>
  );
}

export function Select({ itemName1, itemName2, itemName3, headerText, value, onChange, disabled, className }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const options = [itemName1, itemName2, itemName3].filter(Boolean);
  const values = ['item1', 'item2', 'item3'];
  
  const selectedLabel = value === 'item1' ? itemName1 : 
                       value === 'item2' ? itemName2 : 
                       value === 'item3' ? itemName3 : itemName1;

  return (
    <div className={`relative ${className || ''}`}>
      <div 
        className={`h-7 bg-[#141518] border border-[#000] px-2 flex items-center justify-between cursor-pointer ${disabled ? 'opacity-50' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="text-[#d5d7e1] text-12px">{selectedLabel}</span>
        <span className="text-[#d5d7e1]">▼</span>
      </div>
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 right-0 bg-[#141518] border border-[#000] z-50">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-2 py-1 hover:bg-[#2a2c2f] cursor-pointer text-[#d5d7e1] text-12px"
              onClick={() => {
                onChange(values[index]);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SheetNavigationLeft({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`w-7 h-7 bg-[#555] border border-[#000] flex items-center justify-center ${disabled ? 'opacity-50' : 'hover:opacity-80'}`}
    >
      <span className="text-white">←</span>
    </button>
  );
}

export function SheetNavigationRight({ disabled, onClick }: { disabled: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`w-7 h-7 bg-[#555] border border-[#000] flex items-center justify-center ${disabled ? 'opacity-50' : 'hover:opacity-80'}`}
    >
      <span className="text-white">→</span>
    </button>
  );
}

export function SheetPreview({ image, sheetName, widthMm, heightMm }: { 
  image: string; 
  sheetName: string; 
  widthMm: string; 
  heightMm: string; 
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-40 h-28 bg-[#333538] border border-[#666] flex items-center justify-center">
        <span className="text-[#d5d7e1] text-sm">{sheetName}</span>
      </div>
      <div className="text-[#cfcfcf] text-xs">
        {widthMm} × {heightMm} mm
      </div>
    </div>
  );
}

export function NoPreview() {
  return (
    <div className="flex items-center justify-center h-full text-[#8e8f90]">
      <span>No sheets selected</span>
    </div>
  );
}

export function LayoutEditor({ sheetName, onClose, onSave }: { 
  sheetName: string; 
  onClose: () => void; 
  onSave: () => void; 
}) {
  return (
    <div className="w-[571px] h-full bg-[#333538] flex flex-col items-center justify-center">
      <div className="text-[#d5d7e1] text-lg mb-4">Layout Editor</div>
      <div className="text-[#cfcfcf] mb-4">{sheetName}</div>
      <div className="flex gap-2">
        <ButtonSecondary onClick={onSave}>Save</ButtonSecondary>
        <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
      </div>
    </div>
  );
}

export function PageLayoutManager({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-full h-full bg-[#333538] flex flex-col items-center justify-center">
      <div className="text-[#d5d7e1] text-lg mb-4">Page Layout Manager</div>
      <ButtonSecondary onClick={onClose}>Close</ButtonSecondary>
    </div>
  );
}

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

  // Calculate selected sheets
  const selectedSheets = [];
  if (sheet1Checked) selectedSheets.push(1);
  if (sheet2Checked) selectedSheets.push(2);
  
  const selectedCount = selectedSheets.length;
  const isPrintDisabled = selectedCount === 0;

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
          <div className="w-[400px] bg-[#1e2023] p-5 flex items-center justify-center">
            {selectedCount === 0 ? (
              <NoPreview />
            ) : (
              <SheetPreview 
                image="/placeholder-sheet.png"
                sheetName={`Sheet ${currentSheet}`}
                widthMm={currentSheet === 1 ? "707" : "841"}
                heightMm={currentSheet === 1 ? "500" : "594"}
              />
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