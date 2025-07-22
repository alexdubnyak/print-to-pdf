import { useState } from 'react';
import { CollapsibleSection } from './collapsible-section';
import { Select } from './select';
import svgPaths from "../imports/svg-674rqxjb79";

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
    setInternalSelectedStyle(value);
    onPrintStyleChange?.(value);
  };

  // Custom dropdown component to match the design
  function PrintStyleDropdown({ 
    selectedValue, 
    onValueChange, 
    options 
  }: { 
    selectedValue: string; 
    onValueChange: (value: string) => void;
    options: string[];
  }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative w-full">
        <div 
          className="bg-[#141518] h-[37px] relative shrink-0 w-full cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="absolute border border-[#000000] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-row items-center relative size-full">
            <div className="box-border content-stretch flex flex-row h-[37px] items-center justify-between p-[10px] relative w-full">
              <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                <p className="block leading-[normal] whitespace-pre">
                  {selectedValue}
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
                    d={svgPaths.p31f4a400}
                    fill="var(--fill-0, #D5D7E1)"
                    id="Union"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown options */}
        {isOpen && (
          <div className="absolute top-[37px] left-0 right-0 z-10 bg-[#141518] border border-[#000000] border-t-0">
            {options.map((option, index) => (
              <div
                key={option}
                className="px-[10px] py-2 hover:bg-[#2a2c2f] cursor-pointer border-b border-[#333] last:border-b-0"
                onClick={() => {
                  onValueChange(option);
                  setIsOpen(false);
                }}
              >
                <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left">
                  <p className="block leading-[normal]">{option}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <CollapsibleSection 
      title="Print Styles" 
      isInitiallyOpen={isInitiallyOpen}
      className={className}
    >
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
        <div className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
          <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              Choose print style
            </p>
          </div>
          
          <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
            <PrintStyleDropdown 
              selectedValue={internalSelectedStyle}
              onValueChange={handlePrintStyleChange}
              options={availablePrintStyles}
            />
            <div className="font-['Open_Sans_Hebrew:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
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