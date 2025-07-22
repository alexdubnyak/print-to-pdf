import { useState } from 'react';
import { CollapsibleSection } from './collapsible-section';
import { RadioGroup } from './radio-group';
import { Select } from './select';
import imgImage6 from "figma:asset/a4fd5120b625ecf09a5fd56aaa254b7821704881.png";

export type RangeType = 'all-geometry' | 'sheet' | 'specify' | 'named-view' | 'current-view';

interface RangeSectionProps {
  className?: string;
  isInitiallyOpen?: boolean;
  onRangeChange?: (value: RangeType) => void;
  onSpecifyWindowClick?: () => void;
  onNamedViewChange?: (value: string) => void;
  selectedRange?: RangeType;
  selectedNamedView?: string;
  availableNamedViews?: string[];
}

export function RangeSection({ 
  className = "",
  isInitiallyOpen = true,
  onRangeChange,
  onSpecifyWindowClick,
  onNamedViewChange,
  selectedRange = 'sheet',
  selectedNamedView = '',
  availableNamedViews = ['View 1', 'View 2', 'View 3']
}: RangeSectionProps) {
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

  const rangeOptions = [
    { value: 'all-geometry', label: 'All Geometry' },
    { value: 'sheet', label: 'Sheet' },
    { value: 'specify', label: 'Specify' },
    { value: 'named-view', label: 'Named view' },
    { value: 'current-view', label: 'Current view' }
  ];

  return (
    <CollapsibleSection 
      title="Range" 
      isInitiallyOpen={isInitiallyOpen}
      className={className}
    >
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
        {/* Preview Image */}
        <div
          className="[background-size:128.12%_132.77%] bg-[21.3%_43.97%] bg-no-repeat h-[177px] shrink-0 w-72"
          data-name="image 6"
          style={{ backgroundImage: `url('${imgImage6}')` }}
        />
        
        {/* Range Options */}
        <div className="flex flex-col gap-3 w-full">
          {rangeOptions.map((option) => (
            <div key={option.value} className="flex flex-row gap-2 items-center w-full">
              <div className="flex flex-row gap-2 items-center">
                <label 
                  className="flex flex-row gap-2 items-center cursor-pointer"
                  onClick={() => handleRangeChange(option.value)}
                >
                  <input
                    type="radio"
                    name="range-selection"
                    value={option.value}
                    checked={internalSelectedRange === option.value}
                    onChange={() => handleRangeChange(option.value)}
                    className="sr-only"
                  />
                  
                  {/* Custom radio button */}
                  <div className="relative w-4 h-4 flex-shrink-0">
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
                      internalSelectedRange === option.value
                        ? 'border-[#2160D3] bg-[#2160D3]' 
                        : 'border-[#666] bg-transparent'
                    } flex items-center justify-center`}>
                      {internalSelectedRange === option.value && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  
                  <span className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left select-none">
                    {option.label}
                  </span>
                </label>
              </div>
              
              {/* Additional controls for specific options */}
              {option.value === 'specify' && (
                <div className="flex-1 ml-6">
                  <button 
                    className={`specify-window-button ${internalSelectedRange !== 'specify' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={onSpecifyWindowClick}
                    disabled={internalSelectedRange !== 'specify'}
                  >
                    Specify Window &gt;
                  </button>
                </div>
              )}
              
              {option.value === 'named-view' && (
                <div className="flex-1 ml-6">
                  <div className="w-full max-w-[200px]">
                    <Select 
                      itemCount={availableNamedViews.length}
                      itemName1={availableNamedViews[0] || ''}
                      itemName2={availableNamedViews[1] || ''}
                      itemName3={availableNamedViews[2] || ''}
                      headerText="Select Named View"
                      value={internalSelectedNamedView}
                      onChange={handleNamedViewChange}
                      className="w-full"
                      disabled={internalSelectedRange !== 'named-view'}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}