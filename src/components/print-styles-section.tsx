import { useState } from 'react';
import { CollapsibleSection } from './collapsible-section';
import { Select } from './select';

interface PrintStylesSectionProps {
  className?: string;
  isInitiallyOpen?: boolean;
  onPrintStyleChange?: (value: string) => void;
  selectedPrintStyle?: string;
  availablePrintStyles?: string[];
}

export function PrintStylesSection({ 
  className = "",
  isInitiallyOpen = true,
  onPrintStyleChange,
  selectedPrintStyle = "PrintStyle.ctb",
  availablePrintStyles = ["PrintStyle.ctb", "CustomStyle.ctb", "TechnicalStyle.ctb"]
}: PrintStylesSectionProps) {
  const [internalSelectedStyle, setInternalSelectedStyle] = useState(selectedPrintStyle);

  const handlePrintStyleChange = (value: string) => {
    // Map item values back to actual print style names
    const styleIndex = parseInt(value.replace('item', '')) - 1;
    const selectedStyle = availablePrintStyles[styleIndex] || availablePrintStyles[0];
    
    console.log('🎨 Print style changed to:', selectedStyle);
    setInternalSelectedStyle(selectedStyle);
    onPrintStyleChange?.(selectedStyle);
  };

  // Map selected style name to item value for Select
  const getSelectedStyleValue = () => {
    const styleIndex = availablePrintStyles.indexOf(internalSelectedStyle);
    return styleIndex >= 0 ? `item${styleIndex + 1}` : 'item1';
  };

  return (
    <CollapsibleSection 
      title="Print Styles" 
      isInitiallyOpen={isInitiallyOpen}
      className={`print-styles-section ${className}`}
    >
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
        <div className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
          {/* Choose print style label */}
          <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              Choose print style
            </p>
          </div>
          
          {/* Dropdown and help text container */}
          <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
            {/* Print Style Dropdown - using universal Select component */}
            <div className="w-full relative z-30">
              <Select
                itemCount={availablePrintStyles.length}
                itemName1={availablePrintStyles[0] || ''}
                itemName2={availablePrintStyles[1] || ''}
                itemName3={availablePrintStyles[2] || ''}
                headerText="Print Style"
                value={getSelectedStyleValue()}
                onChange={handlePrintStyleChange}
                className="w-full"
              />
            </div>
            
            {/* Help text */}
            <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">
                * You can upload new print styles in the Resources section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}

// Export the old component name for backward compatibility
export { PrintStylesSection as PrintStylesSectionExact };