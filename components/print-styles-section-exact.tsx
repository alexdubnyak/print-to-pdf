import { useState } from 'react';
import { Select } from './select';
import svgPaths from "../imports/svg-244l69xx34";

interface PrintStylesSectionExactProps {
  className?: string;
  isInitiallyOpen?: boolean;
  onPrintStyleChange?: (value: string) => void;
  selectedPrintStyle?: string;
  availablePrintStyles?: string[];
}

function Frame237() {
  return (
    <div className="bg-[#1e2023] relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-5 py-1.5 relative w-full">
          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              Print Styles
            </p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none">
              <div
                className="h-[10.021px] relative w-[10.948px]"
                data-name="Union"
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 11 11"
                >
                  <path
                    d={svgPaths.p26072c00}
                    fill="var(--fill-0, #CFCFCF)"
                    id="Union"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame323({ 
  selectedPrintStyle, 
  availablePrintStyles, 
  onPrintStyleChange 
}: {
  selectedPrintStyle: string;
  availablePrintStyles: string[];
  onPrintStyleChange: (value: string) => void;
}) {
  return (
    <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
      {/* Print Style Select - используем существующий Select компонент */}
      <Select
        itemCount={availablePrintStyles.length}
        itemName1={availablePrintStyles[0] || 'PrintStyle.ctb'}
        itemName2={availablePrintStyles[1] || 'CustomStyle.ctb'}
        itemName3={availablePrintStyles[2] || 'TechnicalStyle.ctb'}
        headerText="Choose print style"
        value={selectedPrintStyle}
        onChange={onPrintStyleChange}
        className="w-full"
      />
      
      {/* Help Text */}
      <div className="font-['Open_Sans_Hebrew:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          * You can upload new print styles in the Resources section.
        </p>
      </div>
    </div>
  );
}

function Frame259({ 
  selectedPrintStyle, 
  availablePrintStyles, 
  onPrintStyleChange 
}: {
  selectedPrintStyle: string;
  availablePrintStyles: string[];
  onPrintStyleChange: (value: string) => void;
}) {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          Choose print style
        </p>
      </div>
      <Frame323 
        selectedPrintStyle={selectedPrintStyle}
        availablePrintStyles={availablePrintStyles}
        onPrintStyleChange={onPrintStyleChange}
      />
    </div>
  );
}

function Frame262({ 
  selectedPrintStyle, 
  availablePrintStyles, 
  onPrintStyleChange 
}: {
  selectedPrintStyle: string;
  availablePrintStyles: string[];
  onPrintStyleChange: (value: string) => void;
}) {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
      <Frame259 
        selectedPrintStyle={selectedPrintStyle}
        availablePrintStyles={availablePrintStyles}
        onPrintStyleChange={onPrintStyleChange}
      />
    </div>
  );
}

function Frame257({ 
  selectedPrintStyle, 
  availablePrintStyles, 
  onPrintStyleChange 
}: {
  selectedPrintStyle: string;
  availablePrintStyles: string[];
  onPrintStyleChange: (value: string) => void;
}) {
  return (
    <div className="bg-[#333538] relative shrink-0 w-full">
      <div className="absolute border-[#1e2023] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
          <Frame262 
            selectedPrintStyle={selectedPrintStyle}
            availablePrintStyles={availablePrintStyles}
            onPrintStyleChange={onPrintStyleChange}
          />
        </div>
      </div>
    </div>
  );
}

export function PrintStylesSectionExact({ 
  className = "",
  isInitiallyOpen = true, // Не используется, но оставляем для совместимости
  onPrintStyleChange,
  selectedPrintStyle = "PrintStyle.ctb",
  availablePrintStyles = ["PrintStyle.ctb", "CustomStyle.ctb", "TechnicalStyle.ctb"]
}: PrintStylesSectionExactProps) {
  const [internalSelectedStyle, setInternalSelectedStyle] = useState(selectedPrintStyle);

  const handlePrintStyleChange = (value: string) => {
    // Map select values back to actual print style names
    let styleName = "";
    if (value === "item1") styleName = availablePrintStyles[0] || "PrintStyle.ctb";
    else if (value === "item2") styleName = availablePrintStyles[1] || "CustomStyle.ctb";
    else if (value === "item3") styleName = availablePrintStyles[2] || "TechnicalStyle.ctb";
    else styleName = value; // fallback to direct value
    
    setInternalSelectedStyle(styleName);
    onPrintStyleChange?.(styleName);
    console.log('Print style changed to:', styleName);
  };

  // Map current style name to select value
  const getCurrentSelectValue = (): string => {
    const index = availablePrintStyles.indexOf(internalSelectedStyle);
    if (index === 0) return "item1";
    if (index === 1) return "item2";
    if (index === 2) return "item3";
    return "item1"; // default
  };

  console.log('PrintStylesSectionExact render:', {
    className,
    selectedPrintStyle,
    internalSelectedStyle,
    availablePrintStyles,
    currentSelectValue: getCurrentSelectValue()
  });

  return (
    <div
      className={`box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full ${className}`}
      data-name="print styles section"
    >
      <Frame237 />
      <Frame257 
        selectedPrintStyle={getCurrentSelectValue()}
        availablePrintStyles={availablePrintStyles}
        onPrintStyleChange={handlePrintStyleChange}
      />
    </div>
  );
}