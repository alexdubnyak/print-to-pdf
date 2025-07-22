import { useState } from 'react';
import { CollapsibleSection } from './collapsible-section';
import { Checkbox } from './checkbox';
import { TextInput } from './text-input';
import imgImage7 from "figma:asset/1be3d49abdbb316bd48a86a5037772a129eda379.png";

interface OffsetSectionProps {
  className?: string;
  isInitiallyOpen?: boolean;
  onPrintOnCenterChange?: (checked: boolean) => void;
  onXOffsetChange?: (value: string) => void;
  onYOffsetChange?: (value: string) => void;
  printOnCenter?: boolean;
  xOffset?: string;
  yOffset?: string;
}

export function OffsetSection({ 
  className = "",
  isInitiallyOpen = true,
  onPrintOnCenterChange,
  onXOffsetChange,
  onYOffsetChange,
  printOnCenter = false,
  xOffset = "0",
  yOffset = "0"
}: OffsetSectionProps) {
  const [internalPrintOnCenter, setInternalPrintOnCenter] = useState(printOnCenter);
  const [internalXOffset, setInternalXOffset] = useState(xOffset);
  const [internalYOffset, setInternalYOffset] = useState(yOffset);

  const handlePrintOnCenterChange = (checked: boolean) => {
    setInternalPrintOnCenter(checked);
    onPrintOnCenterChange?.(checked);
  };

  const handleXOffsetChange = (value: string) => {
    setInternalXOffset(value);
    onXOffsetChange?.(value);
  };

  const handleYOffsetChange = (value: string) => {
    setInternalYOffset(value);
    onYOffsetChange?.(value);
  };

  return (
    <CollapsibleSection 
      title="Offset" 
      isInitiallyOpen={isInitiallyOpen}
      className={className}
    >
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
        {/* Preview Image */}
        <div
          className="[background-size:108.19%_127.06%] bg-[40.78%_50%] bg-no-repeat h-[85px] shrink-0 w-[314.25px]"
          data-name="image 7"
          style={{ backgroundImage: `url('${imgImage7}')` }}
        />
        
        {/* Print on center checkbox */}
        <div className="flex flex-col gap-3 w-full">
          <div className="checkbox-row">
            <Checkbox 
              checked={internalPrintOnCenter}
              onChange={handlePrintOnCenterChange}
              label="Print on center of paper"
            />
          </div>
          
          {/* X/Y Offset inputs */}
          <div className="flex flex-row gap-4 items-center w-full">
            {/* X Offset */}
            <div className="flex flex-row gap-2 items-center">
              <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left">
                <p className="block leading-[normal]">X:</p>
              </div>
              <div className="w-[80px]">
                <TextInput 
                  value={internalXOffset}
                  onChange={handleXOffsetChange}
                  placeholder="0"
                  className="offset-input-field"
                />
              </div>
              <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left">
                <p className="block leading-[normal]">mm</p>
              </div>
            </div>
            
            {/* Y Offset */}
            <div className="flex flex-row gap-2 items-center">
              <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left">
                <p className="block leading-[normal]">Y:</p>
              </div>
              <div className="w-[80px]">
                <TextInput 
                  value={internalYOffset}
                  onChange={handleYOffsetChange}
                  placeholder="0"
                  className="offset-input-field"
                />
              </div>
              <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left">
                <p className="block leading-[normal]">mm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}