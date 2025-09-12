import { useState } from 'react';
import imgImage6 from '../assets/a4fd5120b625ecf09a5fd56aaa254b7821704881.png';
import { CollapsibleSection } from './collapsible-section';
import { RadioButton } from './radio-button';
import { Select } from './select';

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
  className = '',
  isInitiallyOpen = true,
  onRangeChange,
  onSpecifyWindowClick,
  onNamedViewChange,
  selectedRange = 'sheet',
  selectedNamedView = '',
  availableNamedViews = ['View 1', 'View 2', 'View 3'],
}: RangeSectionProps) {
  const [internalSelectedRange, setInternalSelectedRange] = useState(selectedRange);
  const [internalSelectedNamedView, setInternalSelectedNamedView] = useState(selectedNamedView);

  const handleRangeChange = (value: string) => {
    const rangeValue = value as RangeType;
    setInternalSelectedRange(rangeValue);
    onRangeChange?.(rangeValue);
  };

  const handleNamedViewChange = (value: string) => {
    // Map item values back to actual view names
    const viewIndex = parseInt(value.replace('item', '')) - 1;
    const selectedView = availableNamedViews[viewIndex] || '';
    setInternalSelectedNamedView(selectedView);
    onNamedViewChange?.(selectedView);
  };

  // Map selected view name to item value for Select
  const getSelectedViewValue = () => {
    const viewIndex = availableNamedViews.indexOf(internalSelectedNamedView);
    return viewIndex >= 0 ? `item${viewIndex + 1}` : '';
  };

  const handleSpecifyWindowClick = () => {
    console.log('Opening specify window dialog...');
    onSpecifyWindowClick?.();
  };

  const rangeOptions = [
    { value: 'all-geometry', label: 'All Geometry' },
    { value: 'sheet', label: 'Sheet' },
    { value: 'specify', label: 'Specify' },
    { value: 'named-view', label: 'Named view' },
    { value: 'current-view', label: 'Current view' },
  ];

  return (
    <CollapsibleSection title="Range" isInitiallyOpen={isInitiallyOpen} className={className}>
      <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
        {/* Preview Image */}
        <div
          className="[background-size:128.12%_132.77%] bg-[21.3%_43.97%] bg-no-repeat h-[177px] shrink-0 w-72"
          data-name="image 6"
          style={{ backgroundImage: `url('${imgImage6}')` }}
        />

        {/* Range Options */}
        <div className="flex flex-col gap-4 w-full">
          {rangeOptions.map(option => (
            <div key={option.value} className="flex flex-col gap-2 w-full">
              {/* Radio Button Row */}
              <div className="flex flex-row gap-2 items-center">
                <RadioButton
                  value={option.value}
                  checked={internalSelectedRange === option.value}
                  onChange={handleRangeChange}
                  label={option.label}
                  name="range-selection"
                />
              </div>

              {/* Additional controls for specific options */}
              {option.value === 'specify' && internalSelectedRange === 'specify' && (
                <div className="ml-6">
                  <button
                    className="bg-[#333538] border border-[#666] px-4 py-2 text-[#d5d7e1] text-[12px] hover:bg-[#3a3c3f] transition-colors cursor-pointer"
                    onClick={handleSpecifyWindowClick}
                  >
                    Specify Window &gt;
                  </button>
                </div>
              )}

              {option.value === 'named-view' && internalSelectedRange === 'named-view' && (
                <div className="ml-6 max-w-[200px] relative z-40">
                  <Select
                    itemCount={availableNamedViews.length}
                    itemName1={availableNamedViews[0] || ''}
                    itemName2={availableNamedViews[1] || ''}
                    itemName3={availableNamedViews[2] || ''}
                    headerText="Select Named View"
                    value={getSelectedViewValue()}
                    onChange={handleNamedViewChange}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}
