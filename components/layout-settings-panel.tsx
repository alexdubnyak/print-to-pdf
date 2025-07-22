import { useState } from 'react';
import { OffsetSection } from './offset-section';
import { PrintStylesSection } from './print-styles-section';
import { RangeSection } from './range-section';

export type RangeType = 'all-geometry' | 'sheet' | 'specify' | 'named-view' | 'current-view';

interface LayoutSettingsState {
  // Offset settings
  printOnCenter: boolean;
  xOffset: string;
  yOffset: string;
  
  // Print style settings
  selectedPrintStyle: string;
  
  // Range settings
  selectedRange: RangeType;
  selectedNamedView: string;
}

interface LayoutSettingsPanelProps {
  className?: string;
  onSettingsChange?: (settings: LayoutSettingsState) => void;
  initialSettings?: Partial<LayoutSettingsState>;
  availablePrintStyles?: string[];
  availableNamedViews?: string[];
}

const defaultSettings: LayoutSettingsState = {
  printOnCenter: false,
  xOffset: "0",
  yOffset: "0",
  selectedPrintStyle: "PrintStyle.ctb",
  selectedRange: 'sheet',
  selectedNamedView: ''
};

export function LayoutSettingsPanel({ 
  className = "",
  onSettingsChange,
  initialSettings = {},
  availablePrintStyles = ["PrintStyle.ctb", "CustomStyle.ctb", "TechnicalStyle.ctb"],
  availableNamedViews = ['View 1', 'View 2', 'View 3']
}: LayoutSettingsPanelProps) {
  const [settings, setSettings] = useState<LayoutSettingsState>({
    ...defaultSettings,
    ...initialSettings
  });

  const updateSettings = (newSettings: Partial<LayoutSettingsState>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    onSettingsChange?.(updatedSettings);
  };

  const handleSpecifyWindowClick = () => {
    console.log('Opening specify window dialog...');
    // Here you would typically open a dialog for specifying the window/area
  };

  return (
    <div className={`flex flex-col gap-0 w-full ${className}`}>
      {/* Offset Section */}
      <OffsetSection 
        printOnCenter={settings.printOnCenter}
        xOffset={settings.xOffset}
        yOffset={settings.yOffset}
        onPrintOnCenterChange={(checked) => updateSettings({ printOnCenter: checked })}
        onXOffsetChange={(value) => updateSettings({ xOffset: value })}
        onYOffsetChange={(value) => updateSettings({ yOffset: value })}
      />
      
      {/* Print Styles Section */}
      <PrintStylesSection 
        selectedPrintStyle={settings.selectedPrintStyle}
        availablePrintStyles={availablePrintStyles}
        onPrintStyleChange={(value) => updateSettings({ selectedPrintStyle: value })}
      />
      
      {/* Range Section */}
      <RangeSection 
        selectedRange={settings.selectedRange}
        selectedNamedView={settings.selectedNamedView}
        availableNamedViews={availableNamedViews}
        onRangeChange={(value) => updateSettings({ selectedRange: value })}
        onNamedViewChange={(value) => updateSettings({ selectedNamedView: value })}
        onSpecifyWindowClick={handleSpecifyWindowClick}
      />
    </div>
  );
}

// Export the state type for use in other components
export type { LayoutSettingsState };