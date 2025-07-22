import { useState } from 'react';
import { CollapsibleSection } from './collapsible-section';
import { Select } from './select';
import { RadioButton } from './radio-group';
// Image removed to clean up component

export type RangeType = 'all-geometry' | 'sheet' | 'specify' | 'named-view' | 'current-view';

interface RangeSectionExactProps {
  className?: string;
  isInitiallyOpen?: boolean;
  onRangeChange?: (value: RangeType) => void;
  onSpecifyWindowClick?: () => void;
  onNamedViewChange?: (value: string) => void;
  selectedRange?: RangeType;
  selectedNamedView?: string;
  availableNamedViews?: string[];
}

export function RangeSectionExact({ 
  className = "",
  isInitiallyOpen = true,
  onRangeChange,
  onSpecifyWindowClick,
  onNamedViewChange,
  selectedRange = 'sheet',
  selectedNamedView = '',
  availableNamedViews = ['View 1', 'View 2', 'View 3']
}: RangeSectionExactProps) {
  const [internalSelectedRange, setInternalSelectedRange] = useState(selectedRange);
  const [internalSelectedNamedView, setInternalSelectedNamedView] = useState(selectedNamedView);

  const handleRangeChange = (value: string) => {
    const rangeValue = value as RangeType;
    setInternalSelectedRange(rangeValue);
    onRangeChange?.(rangeValue);
  };

  const handleNamedViewChange = (value: string) => {
    setInternalSelectedNamedView(value);
    onNamedViewChange?.(value);
  };

  const handleSpecifyWindowClick = () => {
    console.log('Opening specify window dialog...');
    onSpecifyWindowClick?.();
  };

  return (
    <CollapsibleSection 
      title="Range" 
      isInitiallyOpen={isInitiallyOpen}
      className={className}
    >
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
        
        {/* Range Options */}
        <div className="flex flex-col gap-4 w-full">
          {/* All Geometry */}
          <div className="flex flex-row gap-2 items-center">
            <RadioButton 
              value="all-geometry"
              checked={internalSelectedRange === 'all-geometry'}
              onChange={handleRangeChange}
              label="All Geometry"
              name="range-selection"
            />
          </div>
          
          {/* Sheet */}
          <div className="flex flex-row gap-2 items-center">
            <RadioButton 
              value="sheet"
              checked={internalSelectedRange === 'sheet'}
              onChange={handleRangeChange}
              label="Sheet"
              name="range-selection"
            />
          </div>
          
          {/* Specify with Button */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row gap-2 items-center">
              <RadioButton 
                value="specify"
                checked={internalSelectedRange === 'specify'}
                onChange={handleRangeChange}
                label="Specify"
                name="range-selection"
              />
            </div>
            {internalSelectedRange === 'specify' && (
              <div className="ml-6">
                <button 
                  className="bg-[#333538] border border-[#666] px-4 py-2 text-[#d5d7e1] text-[12px] hover:bg-[#3a3c3f] transition-colors cursor-pointer"
                  onClick={handleSpecifyWindowClick}
                >
                  Specify Window &gt;
                </button>
              </div>
            )}
          </div>
          
          {/* Named view with Dropdown */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row gap-2 items-center">
              <RadioButton 
                value="named-view"
                checked={internalSelectedRange === 'named-view'}
                onChange={handleRangeChange}
                label="Named view"
                name="range-selection"
              />
            </div>
            {internalSelectedRange === 'named-view' && (
              <div className="ml-6 max-w-[200px] relative z-40">
                <Select 
                  itemCount={availableNamedViews.length}
                  itemName1={availableNamedViews[0] || ''}
                  itemName2={availableNamedViews[1] || ''}
                  itemName3={availableNamedViews[2] || ''}
                  headerText="Select Named View"
                  value={internalSelectedNamedView}
                  onChange={handleNamedViewChange}
                  className="w-full"
                />
              </div>
            )}
          </div>
          
          {/* Current view */}
          <div className="flex flex-row gap-2 items-center">
            <RadioButton 
              value="current-view"
              checked={internalSelectedRange === 'current-view'}
              onChange={handleRangeChange}
              label="Current view"
              name="range-selection"
            />
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}