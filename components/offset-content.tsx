import { useState } from 'react';
import { Checkbox } from './checkbox';
import { Input } from './input';

interface OffsetContentProps {
  onPrintOnCenterChange?: (checked: boolean) => void;
  onXOffsetChange?: (value: string) => void;
  onYOffsetChange?: (value: string) => void;
  printOnCenter?: boolean;
  xOffset?: string;
  yOffset?: string;
}

export function OffsetContent({ 
  onPrintOnCenterChange,
  onXOffsetChange,
  onYOffsetChange,
  printOnCenter = false,
  xOffset = "0",
  yOffset = "0"
}: OffsetContentProps) {
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
    <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
      
      {/* Controls Section */}
      <div className="flex flex-col gap-3 w-full">
        {/* Print on center checkbox */}
        <div className="checkbox-row">
          <Checkbox 
            checked={internalPrintOnCenter}
            onChange={handlePrintOnCenterChange}
            label="Print on center of paper"
          />
        </div>
        
        {/* Offset fields with labels and units */}
        <div className="flex flex-col gap-2.5 w-full">
          {/* X Offset Row */}
          <div className="flex flex-row gap-2 items-center">
            <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left w-4">
              <p className="block leading-[normal]">X:</p>
            </div>
            <div className="w-[80px]">
              <Input 
                value={internalXOffset}
                onChange={handleXOffsetChange}
                placeholder="0"
                className="text-center"
              />
            </div>
            <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left">
              <p className="block leading-[normal]">mm</p>
            </div>
          </div>
          
          {/* Y Offset Row */}
          <div className="flex flex-row gap-2 items-center">
            <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left w-4">
              <p className="block leading-[normal]">Y:</p>
            </div>
            <div className="w-[80px]">
              <Input 
                value={internalYOffset}
                onChange={handleYOffsetChange}
                placeholder="0"
                className="text-center"
              />
            </div>
            <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left">
              <p className="block leading-[normal]">mm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}