import React, { useState } from 'react';
import { Checkbox } from './checkbox';
import { RadioGroup } from './radio-group';
import { Select } from './select';
import { TextInput } from './text-input';

export function QuickPrintSettingsNew() {
  // State management for all form controls
  const [fitToPaper, setFitToPaper] = useState(false);
  const [scale, setScale] = useState('1:1');
  const [unitsValue, setUnitsValue] = useState('1');
  const [unitsType, setUnitsType] = useState('Milimetres');
  const [unitsResult, setUnitsResult] = useState('3.027');
  const [scaleLineweights, setScaleLineweights] = useState(false);
  const [paperSize, setPaperSize] = useState('ANSI full bleed');
  const [orientation, setOrientation] = useState('landscape');
  const [inverse, setInverse] = useState(false);
  const [range, setRange] = useState('all-geometry');
  const [xOffset, setXOffset] = useState('1');
  const [yOffset, setYOffset] = useState('1');
  const [centerOnPaper, setCenterOnPaper] = useState(true);
  const [printStyle, setPrintStyle] = useState('Print style.ctb');

  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-0 py-0 relative size-full"
      data-node-id="894:6231"
    >
      <div
        className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full"
        data-node-id="894:6232"
      >
        <div
          className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full"
          data-node-id="894:6390"
        >
          {/* Left Column: Scale, Units, Range */}
          <div
            className="basis-0 bg-[#292b2d] box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-[10px] relative shrink-0"
            data-name="second row"
            data-node-id="894:6233"
          >
            {/* Fit to paper size checkbox */}
            <Checkbox checked={fitToPaper} onChange={setFitToPaper} label="Fit to paper size" />

            {/* Scale */}
            <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
              <label className="text-[#d5d7e1] text-xs font-semibold block">Scale</label>
              <Select
                options={[
                  { value: '1:1', label: '1:1' },
                  { value: '1:2', label: '1:2' },
                  { value: '2:1', label: '2:1' },
                  { value: '1:4', label: '1:4' },
                  { value: 'custom', label: 'Custom' },
                ]}
                value={scale}
                onChange={setScale}
                placeholder="Select scale"
                disabled={fitToPaper}
                className="w-full"
              />
            </div>

            {/* Units */}
            <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
              <label className="text-[#d5d7e1] text-xs font-semibold block">Units</label>
              <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0 w-full">
                <div className="flex-1">
                  <TextInput
                    value={unitsValue}
                    onChange={setUnitsValue}
                    placeholder="1"
                    disabled={fitToPaper}
                    className="w-full"
                  />
                </div>
                <Select
                  options={[
                    { value: 'Milimetres', label: 'Milimetres' },
                    { value: 'Inches', label: 'Inches' },
                    { value: 'Points', label: 'Points' },
                  ]}
                  value={unitsType}
                  onChange={setUnitsType}
                  placeholder="Units"
                  disabled={fitToPaper}
                  className="w-[120px]"
                />
                <span className="text-[#d5d7e1] text-xs">=</span>
                <div className="flex-1">
                  <TextInput
                    value={unitsResult}
                    onChange={setUnitsResult}
                    placeholder="0"
                    disabled={fitToPaper}
                    className="w-full"
                  />
                </div>
              </div>
              <Checkbox
                checked={scaleLineweights}
                onChange={setScaleLineweights}
                label="Scale line-weights"
                disabled={fitToPaper}
              />
            </div>
          </div>

          {/* Right Column: Paper size, Orientation */}
          <div
            className="basis-0 bg-[#292b2d] box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-[10px] relative self-stretch shrink-0"
            data-name="first row"
            data-node-id="894:6254"
          >
            {/* Paper size */}
            <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
              <label className="text-[#d5d7e1] text-xs font-semibold block">Paper size</label>
              <Select
                options={[
                  { value: 'ANSI full bleed', label: 'ANSI full bleed' },
                  { value: 'ISO A4 (210.00 x 297.00 MM)', label: 'ISO A4 (210.00 x 297.00 MM)' },
                  { value: 'ISO A4 (297.00 x 210.00 MM)', label: 'ISO A4 (297.00 x 210.00 MM)' },
                  { value: 'ISO A3 (297.00 x 420.00 MM)', label: 'ISO A3 (297.00 x 420.00 MM)' },
                  { value: 'Letter (8.50 x 11.00 Inches)', label: 'Letter (8.50 x 11.00 Inches)' },
                  { value: 'Legal (8.50 x 14.0 Inches)', label: 'Legal (8.50 x 14.0 Inches)' },
                ]}
                value={paperSize}
                onChange={setPaperSize}
                placeholder="Select paper size"
                className="w-full"
              />
            </div>

            {/* Orientation */}
            <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0">
              <label className="text-[#d5d7e1] text-xs font-semibold block">Orientation</label>
              <RadioGroup
                options={[
                  { value: 'landscape', label: 'Landscape' },
                  { value: 'portrait', label: 'Portrait' },
                ]}
                value={orientation}
                onChange={setOrientation}
                name="orientation"
                direction="horizontal"
                className="gap-5"
              />
              <Checkbox checked={inverse} onChange={setInverse} label="Inverse" />
            </div>
          </div>
        </div>

        {/* Second row: Range | Offset + Choose print style */}
        <div
          className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full"
          data-node-id="895:6398"
        >
          <div
            className="basis-0 bg-[#292b2d] box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-[10px] relative self-stretch shrink-0"
            data-name="third row"
            data-node-id="894:6264"
          >
            <label className="text-[#d5d7e1] text-xs font-semibold block">Range</label>
            <div className="content-stretch flex flex-col items-start justify-start relative size-full gap-2">
              {/* All geometry */}
              <div className="content-stretch flex gap-1.5 h-7 items-center justify-start relative shrink-0">
                <input
                  type="radio"
                  name="range"
                  value="all-geometry"
                  checked={range === 'all-geometry'}
                  onChange={e => setRange(e.target.value)}
                  className="relative shrink-0 size-4"
                />
                <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5d7e1] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">All geometry</p>
                </div>
              </div>

              {/* Sheet */}
              <div className="content-stretch flex gap-1.5 h-7 items-center justify-start relative shrink-0">
                <input
                  type="radio"
                  name="range"
                  value="sheet"
                  checked={range === 'sheet'}
                  onChange={e => setRange(e.target.value)}
                  className="relative shrink-0 size-4"
                />
                <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5d7e1] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Sheet</p>
                </div>
              </div>

              {/* Current view with checkbox */}
              <div className="content-stretch flex flex-col items-start justify-start relative size-full">
                <div className="content-stretch flex gap-1.5 h-7 items-center justify-start relative shrink-0">
                  <input
                    type="radio"
                    name="range"
                    value="current-view"
                    checked={range === 'current-view'}
                    onChange={e => setRange(e.target.value)}
                    className="relative shrink-0 size-4"
                  />
                  <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5d7e1] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Current view</p>
                  </div>
                </div>
              </div>

              {/* Specify with button */}
              <div className="content-stretch flex flex-col items-start justify-start relative size-full">
                <div className="content-stretch flex gap-1.5 h-7 items-center justify-start relative shrink-0">
                  <input
                    type="radio"
                    name="range"
                    value="specify"
                    checked={range === 'specify'}
                    onChange={e => setRange(e.target.value)}
                    className="relative shrink-0 size-4"
                  />
                  <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5d7e1] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Specify</p>
                  </div>
                </div>
                {range === 'specify' && (
                  <div
                    className="bg-[#141518] content-stretch flex h-7 items-center justify-center relative shrink-0 cursor-pointer hover:bg-[#1a1b1d] transition-colors"
                    onClick={() => console.log('Specify Window clicked')}
                  >
                    <div className="box-border content-stretch flex gap-1.5 h-full items-center justify-center px-3 py-1 relative shrink-0">
                      <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-nowrap">
                        <p className="leading-[normal] whitespace-pre">Specify window</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Named view */}
              <div className="content-stretch flex gap-1.5 h-7 items-center justify-start relative shrink-0">
                <input
                  type="radio"
                  name="range"
                  value="named-view"
                  checked={range === 'named-view'}
                  onChange={e => setRange(e.target.value)}
                  className="relative shrink-0 size-4"
                />
                <div className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#d5d7e1] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Named view</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="basis-0 bg-[#292b2d] box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-[10px] relative self-stretch shrink-0"
            data-name="fourth row"
            data-node-id="894:6274"
          >
            {/* Offset */}
            <div
              className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0 w-full"
              data-node-id="900:6584"
            >
              <label className="text-[#d5d7e1] text-xs font-semibold block">Offset</label>
              <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                <div className="basis-0 box-border content-stretch flex flex-row gap-1.5 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
                  <span className="text-[#d5d7e1] text-xs">X:</span>
                  <div className="relative flex-1">
                    <TextInput
                      value={xOffset}
                      onChange={setXOffset}
                      placeholder="1"
                      className="w-full pr-8"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#898b8c] text-xs">
                      mm
                    </span>
                  </div>
                </div>
                <div className="basis-0 box-border content-stretch flex flex-row gap-1.5 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
                  <span className="text-[#d5d7e1] text-xs">Y:</span>
                  <div className="relative flex-1">
                    <TextInput
                      value={yOffset}
                      onChange={setYOffset}
                      placeholder="1"
                      className="w-full pr-8"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#898b8c] text-xs">
                      mm
                    </span>
                  </div>
                </div>
              </div>
              <Checkbox
                checked={centerOnPaper}
                onChange={setCenterOnPaper}
                label="Print on center of paper"
              />
            </div>

            {/* Choose print style */}
            <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
              <label className="text-[#d5d7e1] text-xs font-semibold block">
                Choose print style
              </label>
              <Select
                options={[
                  { value: 'Print style.ctb', label: 'Print style.ctb' },
                  { value: 'Monochrome.ctb', label: 'Monochrome.ctb' },
                  { value: 'Color.ctb', label: 'Color.ctb' },
                  { value: 'Custom.ctb', label: 'Custom.ctb' },
                ]}
                value={printStyle}
                onChange={setPrintStyle}
                placeholder="Select print style"
                className="w-full"
              />
              <div className="text-[#d5d7e1] text-[10px] text-left">
                <p className="block leading-[normal] whitespace-pre-wrap">
                  You can upload new print style in the Resources section
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickPrintSettingsNew;
