import { useState } from 'react';
import { ButtonSecondary } from './button-secondary';
import { LayoutSettingsPanelExact, LayoutSettingsStateExact } from './layout-settings-panel-exact';

interface LayoutEditorProps {
  sheetName: string;
  onClose: () => void;
  onSave: (settings: LayoutSettingsStateExact) => void;
}

function Frame255({ sheetName }: { sheetName: string }) {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0">
      <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap" style={{ color: 'var(--color-text-light)' }}>
        <p className="block leading-[normal] whitespace-pre">{sheetName} Layout</p>
      </div>
    </div>
  );
}

function Frame240({ sheetName }: { sheetName: string }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-start px-5 py-0 relative w-full">
          <Frame255 sheetName={sheetName} />
        </div>
      </div>
    </div>
  );
}

function Frame263({ onSettingsChange }: { onSettingsChange: (settings: LayoutSettingsStateExact) => void }) {
  const [layoutSettings, setLayoutSettings] = useState<LayoutSettingsStateExact>();

  const handleSettingsChange = (settings: LayoutSettingsStateExact) => {
    setLayoutSettings(settings);
    onSettingsChange(settings);
  };

  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px overflow-x-clip overflow-y-auto p-0 relative shrink-0 w-full">
      {/* Layout Settings Panel - используем точные компоненты из Figma */}
      <LayoutSettingsPanelExact
        onSettingsChange={handleSettingsChange}
        availablePrintStyles={['PrintStyle.ctb', 'TechnicalStyle.ctb', 'CustomStyle.ctb']}
        availableNamedViews={['Top View', 'Front View', 'Side View', 'Isometric']}
        className="w-full"
      />
    </div>
  );
}

function Frame238({ onSettingsChange }: { onSettingsChange: (settings: LayoutSettingsStateExact) => void }) {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="overflow-x-clip overflow-y-auto relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-5 py-0 relative size-full">
          <Frame263 onSettingsChange={onSettingsChange} />
        </div>
      </div>
    </div>
  );
}

function Frame239({ 
  sheetName, 
  onSettingsChange 
}: { 
  sheetName: string; 
  onSettingsChange: (settings: LayoutSettingsStateExact) => void;
}) {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px order-2 overflow-clip p-0 relative shrink-0 w-full">
      <Frame240 sheetName={sheetName} />
      <Frame238 onSettingsChange={onSettingsChange} />
    </div>
  );
}

function Frame249({ 
  onClose, 
  onSave, 
  currentSettings 
}: { 
  onClose: () => void; 
  onSave: (settings: LayoutSettingsStateExact) => void;
  currentSettings?: LayoutSettingsStateExact;
}) {
  const handleSave = () => {
    if (currentSettings) {
      onSave(currentSettings);
    }
  };

  return (
    <div className="order-1 relative shrink-0 w-full">
      <div className="flex flex-row items-end justify-end relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-end justify-end px-5 py-2.5 relative w-full">
          <ButtonSecondary onClick={onClose}>
            Back
          </ButtonSecondary>
          <ButtonSecondary onClick={handleSave}>
            Save settings
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
}

export function LayoutEditor({ sheetName, onClose, onSave }: LayoutEditorProps) {
  const [currentSettings, setCurrentSettings] = useState<LayoutSettingsStateExact>();

  const handleSettingsChange = (settings: LayoutSettingsStateExact) => {
    setCurrentSettings(settings);
  };

  return (
    <div className="box-border content-stretch flex flex-col-reverse gap-5 h-full items-start justify-start pb-0 pt-5 px-0 relative shrink-0 w-[571px]">
      <Frame239 
        sheetName={sheetName} 
        onSettingsChange={handleSettingsChange}
      />
      <Frame249 
        onClose={onClose} 
        onSave={onSave} 
        currentSettings={currentSettings}
      />
    </div>
  );
}