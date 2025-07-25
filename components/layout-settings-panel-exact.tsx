import { useState } from 'react';
import { SettingsWrapper } from './settings-wrapper';
import { PaperAndScaleContent, OrientationType } from './paper-and-scale-content';
import { OffsetContent } from './offset-content';
import { PrintStylesContent } from './print-styles-content';
import { RangeContent, RangeType } from './range-content';

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
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {/* Paper and Scale Section */}
      <SettingsWrapper title="Paper and Scale" isInitiallyOpen={true}>
        <PaperAndScaleContent 
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
        />
      </SettingsWrapper>
      
      {/* Offset Section */}
      <SettingsWrapper title="Offset" isInitiallyOpen={true}>
        <OffsetContent 
          printOnCenter={settings.printOnCenter}
          xOffset={settings.xOffset}
          yOffset={settings.yOffset}
          onPrintOnCenterChange={(checked) => updateSettings({ printOnCenter: checked })}
          onXOffsetChange={(value) => updateSettings({ xOffset: value })}
          onYOffsetChange={(value) => updateSettings({ yOffset: value })}
        />
      </SettingsWrapper>
      
      {/* Print Styles Section */}
      <SettingsWrapper title="Print Styles" isInitiallyOpen={true}>
        <PrintStylesContent 
          selectedPrintStyle={settings.selectedPrintStyle}
          availablePrintStyles={availablePrintStyles}
          onPrintStyleChange={(value) => updateSettings({ selectedPrintStyle: value })}
        />
      </SettingsWrapper>
      
      {/* Range Section */}
      <SettingsWrapper title="Range" isInitiallyOpen={true}>
        <RangeContent 
          selectedRange={settings.selectedRange}
          selectedNamedView={settings.selectedNamedView}
          availableNamedViews={availableNamedViews}
          onRangeChange={(value) => updateSettings({ selectedRange: value })}
          onNamedViewChange={(value) => updateSettings({ selectedNamedView: value })}
          onSpecifyWindowClick={handleSpecifyWindowClick}
        />
      </SettingsWrapper>
    </div>
  );
}

// Export the state type for use in other components
export type { LayoutSettingsStateExact };