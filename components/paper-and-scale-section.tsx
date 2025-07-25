import { useState } from 'react';
import { CollapsibleSection } from './collapsible-section';
import { Input } from './input';
import { Select } from './select';
import { Checkbox } from './checkbox';
import { RadioButton } from './radio-button';
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
  const [internalUnitsType, setInternalUnitsType] = useState('item1'); // Default to Millimeters
  const [internalScaleLineWeights, setInternalScaleLineWeights] = useState(scaleLineWeights);
  const [internalFitToPaperSize, setInternalFitToPaperSize] = useState(fitToPaperSize);

  const handleOrientationChange = (value: OrientationType) => {
    setInternalOrientation(value);
    onOrientationChange?.(value);
  };

  const handlePaperSizeChange = (value: string) => {
    // Map item values to actual paper size identifiers  
    const paperSizeMap = {
      'item1': 'iso-a3',
      'item2': 'iso-a4', 
      'item3': 'us-letter'
    };
    const paperSize = paperSizeMap[value as keyof typeof paperSizeMap] || value;
    setInternalPaperSize(paperSize);
    onPaperSizeChange?.(paperSize);
  };

  // Map paper size back to item value for Select
  const getPaperSizeValue = () => {
    const paperSizeMap = {
      'iso-a3': 'item1',
      'iso-a4': 'item2', 
      'us-letter': 'item3'
    };
    return paperSizeMap[internalPaperSize as keyof typeof paperSizeMap] || 'item1';
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

  const handleUnitsTypeChange = (value: string) => {
    setInternalUnitsType(value);
    // Map item values to actual unit types if needed
    const unitTypeMap = {
      'item1': 'millimeters',
      'item2': 'inches',
      'item3': 'centimeters'
    };
    const unitType = unitTypeMap[value as keyof typeof unitTypeMap] || value;
    console.log('Units type changed to:', unitType);
  };

  const handleScaleLineWeightsChange = (checked: boolean) => {
    setInternalScaleLineWeights(checked);
    onScaleLineWeightsChange?.(checked);
  };

  const handleFitToPaperSizeChange = (checked: boolean) => {
    setInternalFitToPaperSize(checked);
    onFitToPaperSizeChange?.(checked);
  };

  // Helper function to handle orientation change
  const handleOrientationRadioChange = (value: string) => {
    const orientationValue = value as OrientationType;
    handleOrientationChange(orientationValue);
  };

  return (
    <CollapsibleSection 
      title="Paper and Scale" 
      isInitiallyOpen={isInitiallyOpen}
      className={className}
    >
      <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-[20px] relative w-full">
        
        {/* Orientation Section */}
        <div className="flex flex-row gap-4 items-center">
          <RadioButton 
            value="portrait"
            checked={internalOrientation === 'portrait'}
            onChange={handleOrientationRadioChange}
            label="Portrait"
            name="orientation"
            shape="circle"
          />
          <RadioButton 
            value="landscape"
            checked={internalOrientation === 'landscape'}
            onChange={handleOrientationRadioChange}
            label="Landscape"
            name="orientation"
            shape="circle"
          />
          <RadioButton 
            value="inverse"
            checked={internalOrientation === 'inverse'}
            onChange={handleOrientationRadioChange}
            label="Inverse"
            name="orientation"
            shape="circle"
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
            value={getPaperSizeValue()}
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
              <Input
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
                <Input
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
                  value={internalUnitsType}
                  onChange={handleUnitsTypeChange}
                  className="w-full"
                />
              </div>
              <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px]">
                =
              </div>
              <div className="w-20">
                <Input
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