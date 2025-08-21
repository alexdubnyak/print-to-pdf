import { useState } from 'react';
import { Select } from './select';

interface PrintStylesContentProps {
  onPrintStyleChange?: (value: string) => void;
  selectedPrintStyle?: string;
  availablePrintStyles?: string[];
}

export function PrintStylesContent({ 
  onPrintStyleChange,
  selectedPrintStyle = "PrintStyle.ctb",
  availablePrintStyles = ["PrintStyle.ctb", "CustomStyle.ctb", "TechnicalStyle.ctb"]
}: PrintStylesContentProps) {
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

  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
      
      {/* Choose print style title */}
      <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          Choose print style
        </p>
      </div>
      
      {/* Print Style Select */}
      <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
        <Select
          itemCount={availablePrintStyles.length}
          itemName1={availablePrintStyles[0] || 'PrintStyle.ctb'}
          itemName2={availablePrintStyles[1] || 'CustomStyle.ctb'}
          itemName3={availablePrintStyles[2] || 'TechnicalStyle.ctb'}
          headerText="Choose print style"
          value={getCurrentSelectValue()}
          onChange={handlePrintStyleChange}
          className="w-full"
        />
        
        {/* Help Text */}
        <div className="font-['Open_Sans_Hebrew:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre">
            * You can upload new print styles in the Resources section.
          </p>
        </div>
      </div>
    </div>
  );
}