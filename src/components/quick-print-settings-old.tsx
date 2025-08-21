import React, { useState } from 'react';
import { Checkbox } from './checkbox';
import { Select } from './select';

export function QuickPrintSettingsOld() {
  // State management for all form controls
  const [orientation, setOrientation] = useState('landscape');
  const [inverse, setInverse] = useState(false);
  const [scale, setScale] = useState('1:1');
  const [fitToPaper, setFitToPaper] = useState(false);
  const [paperSize, setPaperSize] = useState('ISO A4 (210.00 x 297.00 MM)');
  const [scaleLineweights, setScaleLineweights] = useState(false);
  const [centerOnPaper, setCenterOnPaper] = useState(false);

  const handleOrientationChange = (value: string) => {
    setOrientation(value);
  };

  const handleScaleChange = (value: string) => {
    setScale(value);
  };

  return (
    <div className="relative w-full h-full min-h-0">
      <div className="relative size-full flex flex-col h-full min-h-0">
        {/* Main content with form controls */}
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
          {/* Exact Figma layout */}
          <div className="relative shrink-0 w-full px-5 px-[10px] p-[0px]">
            <div className="flex flex-col gap-3.5 w-full">
              {/* First row: Orientation | Scale */}
              <div className="flex flex-row gap-2.5 h-20 items-center justify-start w-full">
                <div className="basis-0 flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px">
                  <label className="text-[#d5d7e1] text-xs font-semibold">Orientation</label>
                  <Select
                    options={[
                      { value: 'landscape', label: 'Landscape' },
                      { value: 'portrait', label: 'Portrait' },
                    ]}
                    value={orientation}
                    onChange={handleOrientationChange}
                    placeholder="Select orientation"
                    className="w-full h-7"
                  />
                  <div className="flex flex-row gap-1.5 h-7 items-center justify-start">
                    <Checkbox checked={inverse} onChange={setInverse} label="Inverse" />
                  </div>
                </div>
                <div className="basis-0 flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px">
                  <label className="text-[#d5d7e1] text-xs font-semibold">Scale</label>
                  <Select
                    options={[
                      { value: 'user-defined', label: 'User-defined' },
                      { value: '1:1', label: '1:1' },
                      { value: '1:2', label: '1:2' },
                      { value: '1:4', label: '1:4' },
                      { value: '1:5', label: '1:5' },
                      { value: '1:8', label: '1:8' },
                      { value: '1:10', label: '1:10' },
                      { value: '1:16', label: '1:16' },
                      { value: '1:20', label: '1:20' },
                      { value: '1:30', label: '1:30' },
                      { value: '1:40', label: '1:40' },
                      { value: '1:50', label: '1:50' },
                      { value: '1:100', label: '1:100' },
                      { value: '2:1', label: '2:1' },
                      { value: '4:1', label: '4:1' },
                      { value: '8:1', label: '8:1' },
                      { value: '10:1', label: '10:1' },
                      { value: '100:1', label: '100:1' },
                      { value: '1-128', label: '1/128" = 1\'-0"' },
                      { value: '1-64', label: '1/64" = 1\'-0"' },
                      { value: '1-32', label: '1/32" = 1\'-0"' },
                      { value: '1-16', label: '1/16" = 1\'-0"' },
                      { value: '3-32', label: '3/32" = 1\'-0"' },
                      { value: '1-8', label: '1/8" = 1\'-0"' },
                      { value: '3-16', label: '3/16" = 1\'-0"' },
                      { value: '1-4', label: '1/4" = 1\'-0"' },
                      { value: '3-8', label: '3/8" = 1\'-0"' },
                      { value: '1-2', label: '1/2" = 1\'-0"' },
                      { value: '3-4', label: '3/4" = 1\'-0"' },
                      { value: '1-inch', label: '1" = 1\'-0"' },
                      { value: '1-5-inch', label: '1-1/2" = 1\'-0"' },
                      { value: '3-inch', label: '3" = 1\'-0"' },
                      { value: '6-inch', label: '6" = 1\'-0"' },
                      { value: '12-inch', label: '1\'-0" = 1\'-0"' },
                    ]}
                    value={scale}
                    onChange={handleScaleChange}
                    placeholder="Select scale"
                    className="w-full h-7"
                    disabled={fitToPaper}
                  />
                  <div className="flex flex-row gap-1.5 h-7 items-center justify-start">
                    <Checkbox
                      checked={fitToPaper}
                      onChange={setFitToPaper}
                      label="Fit to paper size"
                    />
                  </div>
                </div>
              </div>

              {/* Second row: Paper size | Units */}
              <div className="flex flex-row gap-2.5 h-[82px] items-start justify-start w-full">
                <div className="basis-0 flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px">
                  <label className="text-[#d5d7e1] text-xs font-semibold">Paper size</label>
                  <Select
                    options={[
                      {
                        value: '700mm (700.00 x 1000.00 MM)',
                        label: '700mm (700.00 x 1000.00 MM)',
                      },
                      {
                        value: 'ANSI A (11.00 x 8.50 Inches)',
                        label: 'ANSI A (11.00 x 8.50 Inches)',
                      },
                      {
                        value: 'ANSI A (8.50 x 11.00 Inches)',
                        label: 'ANSI A (8.50 x 11.00 Inches)',
                      },
                      {
                        value: 'ANSI B (11.00 x 17.00 Inches)',
                        label: 'ANSI B (11.00 x 17.00 Inches)',
                      },
                      {
                        value: 'ANSI B (17.00 x 11.00 Inches)',
                        label: 'ANSI B (17.00 x 11.00 Inches)',
                      },
                      {
                        value: 'ANSI C (17.00 x 22.00 Inches)',
                        label: 'ANSI C (17.00 x 22.00 Inches)',
                      },
                      {
                        value: 'ANSI C (22.00 x 17.00 Inches)',
                        label: 'ANSI C (22.00 x 17.00 Inches)',
                      },
                      {
                        value: 'ANSI D (22.00 x 34.00 Inches)',
                        label: 'ANSI D (22.00 x 34.00 Inches)',
                      },
                      {
                        value: 'ANSI D (34.00 x 22.00 Inches)',
                        label: 'ANSI D (34.00 x 22.00 Inches)',
                      },
                      {
                        value: 'ANSI E (34.00 x 44.00 Inches)',
                        label: 'ANSI E (34.00 x 44.00 Inches)',
                      },
                      {
                        value: 'ANSI E (44.00 x 34.00 Inches)',
                        label: 'ANSI E (44.00 x 34.00 Inches)',
                      },
                      {
                        value: 'ARCH C (18.00 x 24.00 Inches)',
                        label: 'ARCH C (18.00 x 24.00 Inches)',
                      },
                      {
                        value: 'ARCH C (24.00 x 18.00 Inches)',
                        label: 'ARCH C (24.00 x 18.00 Inches)',
                      },
                      {
                        value: 'ARCH D (24.00 x 36.00 Inches)',
                        label: 'ARCH D (24.00 x 36.00 Inches)',
                      },
                      {
                        value: 'ARCH D (36.00 x 24.00 Inches)',
                        label: 'ARCH D (36.00 x 24.00 Inches)',
                      },
                      {
                        value: 'ARCH E (36.00 x 48.00 Inches)',
                        label: 'ARCH E (36.00 x 48.00 Inches)',
                      },
                      {
                        value: 'ARCH E (48.00 x 36.00 Inches)',
                        label: 'ARCH E (48.00 x 36.00 Inches)',
                      },
                      {
                        value: 'ARCH E1 (30.00 x 42.00 Inches)',
                        label: 'ARCH E1 (30.00 x 42.00 Inches)',
                      },
                      {
                        value: 'ARCH E1 (42.00 x 30.00 Inches)',
                        label: 'ARCH E1 (42.00 x 30.00 Inches)',
                      },
                      {
                        value: 'ISO A0 (1189.00 x 841.00 MM)',
                        label: 'ISO A0 (1189.00 x 841.00 MM)',
                      },
                      {
                        value: 'ISO A0 (841.00 x 1189.00 MM)',
                        label: 'ISO A0 (841.00 x 1189.00 MM)',
                      },
                      {
                        value: 'ISO A1 (594.00 x 841.00 MM)',
                        label: 'ISO A1 (594.00 x 841.00 MM)',
                      },
                      {
                        value: 'ISO A1 (841.00 x 594.00 MM)',
                        label: 'ISO A1 (841.00 x 594.00 MM)',
                      },
                      {
                        value: 'ISO A2 (420.00 x 594.00 MM)',
                        label: 'ISO A2 (420.00 x 594.00 MM)',
                      },
                      {
                        value: 'ISO A2 (594.00 x 420.00 MM)',
                        label: 'ISO A2 (594.00 x 420.00 MM)',
                      },
                      {
                        value: 'ISO A3 (297.00 x 420.00 MM)',
                        label: 'ISO A3 (297.00 x 420.00 MM)',
                      },
                      {
                        value: 'ISO A3 (420.00 x 297.00 MM)',
                        label: 'ISO A3 (420.00 x 297.00 MM)',
                      },
                      {
                        value: 'ISO A4 (210.00 x 297.00 MM)',
                        label: 'ISO A4 (210.00 x 297.00 MM)',
                      },
                      {
                        value: 'ISO A4 (297.00 x 210.00 MM)',
                        label: 'ISO A4 (297.00 x 210.00 MM)',
                      },
                      {
                        value: 'ISO B1 (1000.00 x 707.00 MM)',
                        label: 'ISO B1 (1000.00 x 707.00 MM)',
                      },
                      {
                        value: 'ISO B1 (707.00 x 1000.00 MM)',
                        label: 'ISO B1 (707.00 x 1000.00 MM)',
                      },
                      {
                        value: 'ISO B2 (500.00 x 707.00 MM)',
                        label: 'ISO B2 (500.00 x 707.00 MM)',
                      },
                      {
                        value: 'ISO B2 (707.00 x 500.00 MM)',
                        label: 'ISO B2 (707.00 x 500.00 MM)',
                      },
                      {
                        value: 'ISO B4 (250.00 x 354.00 MM)',
                        label: 'ISO B4 (250.00 x 354.00 MM)',
                      },
                      {
                        value: 'ISO B4 (354.00 x 250.00 MM)',
                        label: 'ISO B4 (354.00 x 250.00 MM)',
                      },
                      {
                        value: 'ISO B5 (182.00 x 237.00 MM)',
                        label: 'ISO B5 (182.00 x 237.00 MM)',
                      },
                      {
                        value: 'ISO B5 (237.00 x 182.00 MM)',
                        label: 'ISO B5 (237.00 x 182.00 MM)',
                      },
                      {
                        value: 'ISO C5 (229.00 x 162.00 MM)',
                        label: 'ISO C5 (229.00 x 162.00 MM)',
                      },
                      {
                        value: 'Legal (8.50 x 14.0 Inches)',
                        label: 'Legal (8.50 x 14.0 Inches)',
                      },
                      {
                        value: 'Letter (8.50 x 11.00 Inches)',
                        label: 'Letter (8.50 x 11.00 Inches)',
                      },
                      {
                        value: 'Sun Hi-Res (1280.00 x 1600.00 Pixels)',
                        label: 'Sun Hi-Res (1280.00 x 1600.00 Pixels)',
                      },
                      {
                        value: 'Sun Standard (900.00 x 1152.00 Pixels)',
                        label: 'Sun Standard (900.00 x 1152.00 Pixels)',
                      },
                      {
                        value: 'Super VGA (600.00 x 800.00 Pixels)',
                        label: 'Super VGA (600.00 x 800.00 Pixels)',
                      },
                      {
                        value: 'VGA (480.00 x 640.00 Pixels)',
                        label: 'VGA (480.00 x 640.00 Pixels)',
                      },
                      {
                        value: 'XGA (768.00 x 1024.00 Pixels)',
                        label: 'XGA (768.00 x 1024.00 Pixels)',
                      },
                      {
                        value: 'XGA Hi-Res (1200.00 x 1600.00 Pixels)',
                        label: 'XGA Hi-Res (1200.00 x 1600.00 Pixels)',
                      },
                    ]}
                    value={paperSize}
                    onChange={setPaperSize}
                    placeholder="Select paper size"
                    className="w-full h-7"
                  />
                </div>
                <div
                  className="basis-0 flex flex-col gap-1 grow items-start justify-start min-h-px min-w-px"
                  style={{
                    opacity: fitToPaper ? 0.5 : undefined,
                    pointerEvents: fitToPaper ? 'none' : 'auto',
                  }}
                >
                  <div className="flex flex-row gap-1.5 items-end justify-start w-full">
                    <div className="basis-0 flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px">
                      <label className="text-[#d5d7e1] text-xs font-semibold">Units</label>
                      <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                        <div className="bg-[#141518] border border-[#000000] flex flex-row gap-3 h-7 items-center justify-start px-[10px] py-0">
                          <span className="text-[#d5d7e1] text-xs">1</span>
                        </div>
                        <div className="basis-0 bg-[#141518] border border-[#000000] grow h-7 min-h-px min-w-px flex flex-row items-center justify-between px-[10px] py-0">
                          <span className="text-[#d5d7e1] text-xs">Milimetres</span>
                          <svg className="w-[10.875px] h-[6.145px]" fill="none" viewBox="0 0 11 7">
                            <path d="M5.38 0l5.375 6.145H0L5.38 0z" fill="#D5D7E1" />
                          </svg>
                        </div>
                        <span className="text-[#d5d7e1] text-xs">=</span>
                        <div className="bg-[#141518] border border-[#000000] flex flex-row gap-3 h-7 items-center justify-start px-[10px] py-0">
                          <span className="text-[#d5d7e1] text-xs">3.027</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-1.5 h-7 items-center justify-start">
                    <Checkbox
                      checked={scaleLineweights}
                      onChange={setScaleLineweights}
                      label="Scale line-weights"
                      disabled={fitToPaper}
                    />
                  </div>
                </div>
              </div>

              {/* Third row: Range | Choose print style */}
              <div className="flex flex-row gap-2.5 items-start justify-start w-full">
                <div className="basis-0 flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px">
                  <label className="text-[#d5d7e1] text-xs font-semibold">Range</label>
                  <Select
                    options={[
                      { value: 'all-geometry', label: 'All geometry' },
                      { value: 'selected-objects', label: 'Selected objects' },
                      { value: 'window', label: 'Window' },
                    ]}
                    value="all-geometry"
                    onChange={() => {}}
                    placeholder="Select range"
                    className="w-full h-7"
                  />
                </div>
                <div className="basis-0 flex flex-col gap-5 grow h-[82px] items-start justify-start min-h-px min-w-px">
                  <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                    <label className="text-[#d5d7e1] text-xs font-semibold">
                      Choose print style
                    </label>
                    <div className="flex flex-col gap-1 items-start justify-start w-full">
                      <Select
                        options={[{ value: 'print-style-ctb', label: 'Print style.ctb' }]}
                        value="print-style-ctb"
                        onChange={() => {}}
                        placeholder="Select print style"
                        className="w-full h-7"
                      />
                      <p className="text-[#d5d7e1] text-[10px] leading-normal">
                        You can upload new print style in the Resources section
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fourth row: Offset (full width) */}
              <div className="flex flex-col gap-1.5 items-start justify-start">
                <label className="text-[#d5d7e1] text-xs font-semibold">Offset</label>
                <div className="flex flex-row gap-2.5 items-center justify-start">
                  <div className="flex flex-row gap-1.5 items-center justify-start w-[125.25px]">
                    <span className="text-[#d5d7e1] text-xs">X:</span>
                    <div className="basis-0 bg-[#141518] border border-[#000000] grow h-7 min-h-px min-w-px flex flex-row gap-1.5 items-center justify-start px-[10px] py-0">
                      <span className="text-[#d5d7e1] text-xs">1</span>
                      <span className="text-[#898b8c] text-xs">mm</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-1.5 items-center justify-start w-[125.25px]">
                    <span className="text-[#d5d7e1] text-xs">Y:</span>
                    <div className="basis-0 bg-[#141518] border border-[#000000] grow h-7 min-h-px min-w-px flex flex-row gap-1.5 items-center justify-start px-[10px] py-0">
                      <span className="text-[#d5d7e1] text-xs">1</span>
                      <span className="text-[#898b8c] text-xs">mm</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-1.5 h-7 items-center justify-start">
                    <Checkbox
                      checked={centerOnPaper}
                      onChange={setCenterOnPaper}
                      label="Print on center of paper"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="basis-0 grow min-h-px min-w-px shrink-0 w-full" />
      </div>
    </div>
  );
}
