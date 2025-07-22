import { useState, useEffect, useRef } from 'react';
import { CollapsibleSection } from './collapsible-section';
import svgPaths from "../imports/svg-674rqxjb79";

interface PrintStylesSectionExactProps {
  className?: string;
  isInitiallyOpen?: boolean;
  onPrintStyleChange?: (value: string) => void;
  selectedPrintStyle?: string;
  availablePrintStyles?: string[];
}

export function PrintStylesSectionExact({ 
  className = "",
  isInitiallyOpen = true,
  onPrintStyleChange,
  selectedPrintStyle = "PrintStyle.ctb",
  availablePrintStyles = ["PrintStyle.ctb", "CustomStyle.ctb", "TechnicalStyle.ctb"]
}: PrintStylesSectionExactProps) {
  const [internalSelectedStyle, setInternalSelectedStyle] = useState(selectedPrintStyle);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log('PrintStylesSectionExact render:', {
    className,
    isInitiallyOpen,
    selectedPrintStyle,
    internalSelectedStyle,
    availablePrintStyles,
    isDropdownOpen,
    svgPaths: svgPaths.p31f4a400
  });

  const handlePrintStyleChange = (value: string) => {
    setInternalSelectedStyle(value);
    onPrintStyleChange?.(value);
    setIsDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log('Dropdown toggle:', !isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <CollapsibleSection 
      title="Print Styles" 
      isInitiallyOpen={isInitiallyOpen}
      className={className}
    >
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
        <div className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
          {/* Choose print style label */}
          <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              Choose print style
            </p>
          </div>
          
          {/* Dropdown and help text container */}
          <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0 w-full">
            {/* Print Style Dropdown - точная копия из Figma */}
            <div className="relative w-full" ref={dropdownRef}>
              <div 
                className="bg-[#141518] h-[37px] relative shrink-0 w-full cursor-pointer"
                onClick={handleDropdownToggle}
              >
                <div className="absolute border border-[#000000] border-solid inset-0 pointer-events-none" />
                <div className="flex flex-row items-center relative size-full">
                  <div className="box-border content-stretch flex flex-row h-[37px] items-center justify-between p-[10px] relative w-full">
                    <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">
                        {internalSelectedStyle}
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
              {isDropdownOpen && (
                <div className="absolute top-[37px] left-0 right-0 z-50 bg-[#141518] border border-[#000000] border-t-0 shadow-lg">
                  {availablePrintStyles.map((style) => (
                    <div
                      key={style}
                      className="px-[10px] py-2 hover:bg-[#2a2c2f] cursor-pointer border-b border-[#333] last:border-b-0"
                      onClick={() => handlePrintStyleChange(style)}
                    >
                      <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left">
                        <p className="block leading-[normal]">{style}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Help text */}
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