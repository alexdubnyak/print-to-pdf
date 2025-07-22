import { useState } from 'react';
import { CollapsibleSection } from './collapsible-section';
import { TextInput } from './text-input';
import { Select } from './select';
import { Checkbox } from './checkbox';
// Image removed to clean up component

export type OrientationType = 'portrait' | 'landscape' | 'inverse';
export type ScaleType = 'user-defined' | 'fit-to-paper' | 'custom';

interface PaperAndScaleSectionProps {
  className?: string;
  isInitiallyOpen?: boolean;
  onOrientationChange?: (value: OrientationType) => void;
  onPaperSizeChange?: (value: string) => void;
  onScaleTypeChange?: (value: string) => void;
  onScaleValueChange?: (value: string) => void;
  onUnitsValueChange?: (value: string) => void;
  onScaleLineWeightsChange?: (checked: boolean) => void;
  onFitToPaperSizeChange?: (checked: boolean) => void;
  
  // Current values
  orientation?: OrientationType;
  paperSize?: string;
  scaleType?: string;
  scaleValue?: string;
  unitsValue?: string;
  scaleLineWeights?: boolean;
  fitToPaperSize?: boolean;
}

export function PaperAndScaleSection({
  className = "",
  isInitiallyOpen = true,
  onOrientationChange,
  onPaperSizeChange,
  onScaleTypeChange,
  onScaleValueChange,
  onUnitsValueChange,
  onScaleLineWeightsChange,
  onFitToPaperSizeChange,
  
  orientation = 'portrait',
  paperSize = 'iso-a3',
  scaleType = 'User-defined',
  scaleValue = '1',
  unitsValue = '3.027',
  scaleLineWeights = false,
  fitToPaperSize = true
}: PaperAndScaleSectionProps) {
  const [internalOrientation, setInternalOrientation] = useState(orientation);
  const [internalPaperSize, setInternalPaperSize] = useState(paperSize);
  const [internalScaleType, setInternalScaleType] = useState(scaleType);
  const [internalScaleValue, setInternalScaleValue] = useState(scaleValue);
  const [internalUnitsValue, setInternalUnitsValue] = useState(unitsValue);
  const [internalScaleLineWeights, setInternalScaleLineWeights] = useState(scaleLineWeights);
  const [internalFitToPaperSize, setInternalFitToPaperSize] = useState(fitToPaperSize);

  const handleOrientationChange = (value: OrientationType) => {
    setInternalOrientation(value);
    onOrientationChange?.(value);
  };

  const handlePaperSizeChange = (value: string) => {
    setInternalPaperSize(value);
    onPaperSizeChange?.(value);
  };

  const handleScaleTypeChange = (value: string) => {
    setInternalScaleType(value);
    onScaleTypeChange?.(value);
  };

  const handleScaleValueChange = (value: string) => {
    setInternalScaleValue(value);
    onScaleValueChange?.(value);
  };

  const handleUnitsValueChange = (value: string) => {
    setInternalUnitsValue(value);
    onUnitsValueChange?.(value);
  };

  const handleScaleLineWeightsChange = (checked: boolean) => {
    setInternalScaleLineWeights(checked);
    onScaleLineWeightsChange?.(checked);
  };

  const handleFitToPaperSizeChange = (checked: boolean) => {
    setInternalFitToPaperSize(checked);
    onFitToPaperSizeChange?.(checked);
  };

  // Orientation Button Component
  function OrientationButton({ 
    label, 
    isSelected, 
    onClick, 
    shape = 'circle' 
  }: { 
    label: string; 
    isSelected: boolean; 
    onClick: () => void; 
    shape?: 'circle' | 'square';
  }) {
    return (
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={onClick}
      >
        <div 
          className={`w-4 h-4 border-2 flex items-center justify-center ${
            shape === 'circle' ? 'rounded-full' : 'rounded-sm'
          }`}
          style={{ 
            borderColor: '#d5d7e1',
            backgroundColor: isSelected ? '#4A90E2' : 'transparent'
          }}
        >
          {isSelected && (
            <div 
              className={`w-2 h-2 ${shape === 'circle' ? 'rounded-full' : 'rounded-sm'}`}
              style={{ backgroundColor: '#ffffff' }}
            />
          )}
        </div>
        <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left">
          {label}
        </div>
      </div>
    );
  }

  return (
    <CollapsibleSection 
      title="Paper and Scale" 
      isInitiallyOpen={isInitiallyOpen}
      className={className}
    >
      <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-[20px] relative w-full">
        
        {/* Orientation Section */}
        <div className="flex flex-row gap-4 items-center">
          <OrientationButton 
            label="Portrait" 
            isSelected={internalOrientation === 'portrait'}
            onClick={() => handleOrientationChange('portrait')}
            shape="circle"
          />
          <OrientationButton 
            label="Landscape" 
            isSelected={internalOrientation === 'landscape'}
            onClick={() => handleOrientationChange('landscape')}
            shape="circle"
          />
          <OrientationButton 
            label="Inverse" 
            isSelected={internalOrientation === 'inverse'}
            onClick={() => handleOrientationChange('inverse')}
            shape="square"
          />
        </div>

        {/* Paper Section */}
        <div className="w-full relative z-30">
          <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left mb-2">
            Paper
          </div>
          <Select
            itemCount={3}
            itemName1="ISO A3 (420.00 x 297.00 MM)"
            itemName2="ISO A4 (210.00 x 297.00 MM)"
            itemName3="US Letter (8.5 x 11 IN)"
            headerText="Paper Size"
            value="item1"
            onChange={handlePaperSizeChange}
            className="w-full"
          />
        </div>

        {/* Scale Section */}
        <div className="w-full">
          <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left mb-3">
            Scale
          </div>
          
          <div className="flex flex-row gap-4 items-start mb-4">
            <div className="basis-0 grow">
              <TextInput
                value={internalScaleType}
                onChange={handleScaleTypeChange}
                placeholder="User-defined"
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={internalScaleLineWeights}
                onChange={handleScaleLineWeightsChange}
                label="Scale LineWeights"
              />
            </div>
          </div>

          {/* Units Section */}
          <div className="w-full mb-4">
            <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left mb-3">
              Units
            </div>
            <div className="flex flex-row gap-2 items-center">
              <div className="w-16">
                <TextInput
                  value={internalScaleValue}
                  onChange={handleScaleValueChange}
                  placeholder="1"
                  className="w-full text-center"
                />
              </div>
              <div className="basis-0 grow relative z-20">
                <Select
                  itemCount={3}
                  itemName1="Millimeters"
                  itemName2="Inches"
                  itemName3="Centimeters"
                  headerText="Units"
                  value="item1"
                  onChange={(value) => console.log('Units changed:', value)}
                  className="w-full"
                />
              </div>
              <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px]">
                =
              </div>
              <div className="w-20">
                <TextInput
                  value={internalUnitsValue}
                  onChange={handleUnitsValueChange}
                  placeholder="3.027"
                  className="w-full text-center"
                />
              </div>
            </div>
          </div>

          {/* Fit to paper size */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={internalFitToPaperSize}
              onChange={handleFitToPaperSizeChange}
              label="Fit to paper size"
            />
          </div>
        </div>

      </div>
    </CollapsibleSection>
  );
}