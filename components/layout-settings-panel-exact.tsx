import { useState } from 'react';
import { PaperAndScaleSection, OrientationType } from './paper-and-scale-section';
import { OffsetSectionExact } from './offset-section-exact';
import { PrintStylesSectionExact } from './print-styles-section-exact';
import { RangeSectionExact, RangeType } from './range-section-exact';

export interface LayoutSettingsStateExact {
  // Paper and Scale settings
  orientation: OrientationType;
  paperSize: string;
  scaleType: string;
  scaleValue: string;
  unitsValue: string;
  scaleLineWeights: boolean;
  fitToPaperSize: boolean;
  
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

interface LayoutSettingsPanelExactProps {
  className?: string;
  onSettingsChange?: (settings: LayoutSettingsStateExact) => void;
  initialSettings?: Partial<LayoutSettingsStateExact>;
  availablePrintStyles?: string[];
  availableNamedViews?: string[];
}

const defaultSettingsExact: LayoutSettingsStateExact = {
  // Paper and Scale defaults
  orientation: 'portrait',
  paperSize: 'iso-a3',
  scaleType: 'User-defined',
  scaleValue: '1',
  unitsValue: '3.027',
  scaleLineWeights: false,
  fitToPaperSize: true,
  
  // Offset defaults
  printOnCenter: false,
  xOffset: "0",
  yOffset: "0",
  
  // Print style defaults
  selectedPrintStyle: "PrintStyle.ctb",
  
  // Range defaults
  selectedRange: 'sheet',
  selectedNamedView: ''
};

export function LayoutSettingsPanelExact({ 
  className = "",
  onSettingsChange,
  initialSettings = {},
  availablePrintStyles = ["PrintStyle.ctb", "CustomStyle.ctb", "TechnicalStyle.ctb"],
  availableNamedViews = ['Top View', 'Front View', 'Side View', 'Isometric']
}: LayoutSettingsPanelExactProps) {
  const [settings, setSettings] = useState<LayoutSettingsStateExact>({
    ...defaultSettingsExact,
    ...initialSettings
  });

  const updateSettings = (newSettings: Partial<LayoutSettingsStateExact>) => {
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
      {/* Paper and Scale Section */}
      <div className="layout-settings-section">
        <PaperAndScaleSection 
          orientation={settings.orientation}
          paperSize={settings.paperSize}
          scaleType={settings.scaleType}
          scaleValue={settings.scaleValue}
          unitsValue={settings.unitsValue}
          scaleLineWeights={settings.scaleLineWeights}
          fitToPaperSize={settings.fitToPaperSize}
          onOrientationChange={(value) => updateSettings({ orientation: value })}
          onPaperSizeChange={(value) => updateSettings({ paperSize: value })}
          onScaleTypeChange={(value) => updateSettings({ scaleType: value })}
          onScaleValueChange={(value) => updateSettings({ scaleValue: value })}
          onUnitsValueChange={(value) => updateSettings({ unitsValue: value })}
          onScaleLineWeightsChange={(checked) => updateSettings({ scaleLineWeights: checked })}
          onFitToPaperSizeChange={(checked) => updateSettings({ fitToPaperSize: checked })}
          isInitiallyOpen={true}
        />
      </div>
      
      {/* Offset Section */}
      <div className="layout-settings-section">
        <OffsetSectionExact 
          printOnCenter={settings.printOnCenter}
          xOffset={settings.xOffset}
          yOffset={settings.yOffset}
          onPrintOnCenterChange={(checked) => updateSettings({ printOnCenter: checked })}
          onXOffsetChange={(value) => updateSettings({ xOffset: value })}
          onYOffsetChange={(value) => updateSettings({ yOffset: value })}
          isInitiallyOpen={true}
        />
      </div>
      
      {/* Print Styles Section */}
      <div className="layout-settings-section">
        <PrintStylesSectionExact 
          selectedPrintStyle={settings.selectedPrintStyle}
          availablePrintStyles={availablePrintStyles}
          onPrintStyleChange={(value) => updateSettings({ selectedPrintStyle: value })}
          isInitiallyOpen={true}
        />
      </div>
      
      {/* Range Section */}
      <div className="layout-settings-section">
        <RangeSectionExact 
          selectedRange={settings.selectedRange}
          selectedNamedView={settings.selectedNamedView}
          availableNamedViews={availableNamedViews}
          onRangeChange={(value) => updateSettings({ selectedRange: value })}
          onNamedViewChange={(value) => updateSettings({ selectedNamedView: value })}
          onSpecifyWindowClick={handleSpecifyWindowClick}
          isInitiallyOpen={true}
        />
      </div>
    </div>
  );
}

// Export the state type for use in other components
export type { LayoutSettingsStateExact };