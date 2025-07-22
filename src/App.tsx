import React, { useState } from 'react';
import './styles/globals.css';

// Types
interface Sheet {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  layout: string;
  selected: boolean;
}

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  
  const [sheets, setSheets] = useState<Sheet[]>([
    { id: '1', name: 'Sheet 1', widthMm: 707, heightMm: 500, layout: '*Sheet1*', selected: false },
    { id: '2', name: 'Sheet 2', widthMm: 841, heightMm: 594, layout: '*Sheet2*', selected: false },
    { id: '3', name: 'Sheet 3', widthMm: 297, heightMm: 210, layout: 'Custom Layout', selected: false },
  ]);

  const selectedSheets = sheets.filter(sheet => sheet.selected);
  const currentSheet = selectedSheets[currentSheetIndex] || sheets[0];

  // Event handlers
  const handleSheetSelect = (sheetId: string, selected: boolean) => {
    setSheets(prev => prev.map(sheet => 
      sheet.id === sheetId ? { ...sheet, selected } : sheet
    ));
    
    if (selected && selectedSheets.length === 0) {
      setCurrentSheetIndex(0);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSheets(prev => prev.map(sheet => ({ ...sheet, selected: checked })));
    if (checked) setCurrentSheetIndex(0);
  };

  const handleLayoutChange = (sheetId: string, layout: string) => {
    setSheets(prev => prev.map(sheet => 
      sheet.id === sheetId ? { ...sheet, layout } : sheet
    ));
  };

  const handlePrevSheet = () => {
    if (currentSheetIndex > 0) {
      setCurrentSheetIndex(currentSheetIndex - 1);
    }
  };

  const handleNextSheet = () => {
    if (currentSheetIndex < selectedSheets.length - 1) {
      setCurrentSheetIndex(currentSheetIndex + 1);
    }
  };

  const handlePrint = () => {
    console.log('Printing sheets:', selectedSheets);
  };

  if (!isDialogOpen) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Print Dialog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-6xl h-[600px] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gray-900 px-6 py-3 flex justify-between items-center border-b border-gray-700">
          <h1 className="text-gray-100 font-semibold text-sm uppercase tracking-wide">Print to PDF</h1>
          <button 
            onClick={() => setIsDialogOpen(false)}
            className="text-gray-400 hover:text-white text-xl w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1">
          
          {/* Preview Panel */}
          <div className="w-96 bg-gray-900 p-6 flex flex-col">
            <h2 className="text-gray-300 text-sm font-medium mb-4">Preview</h2>
            
            {selectedSheets.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gray-700 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">Select sheets to preview</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center">
                {/* Sheet Preview */}
                <div className="bg-white rounded-lg shadow-lg mb-4" style={{
                  width: '280px',
                  height: '200px',
                  aspectRatio: `${currentSheet.widthMm}/${currentSheet.heightMm}`
                }}>
                  <div className="w-full h-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <p className="font-medium">{currentSheet.name}</p>
                      <p className="text-sm">{currentSheet.widthMm} × {currentSheet.heightMm} mm</p>
                    </div>
                  </div>
                </div>

                {/* Sheet Info */}
                <div className="text-center mb-4">
                  <h3 className="text-white font-medium">{currentSheet.name}</h3>
                  <p className="text-gray-400 text-sm">{currentSheet.widthMm} × {currentSheet.heightMm} mm</p>
                </div>

                {/* Navigation */}
                {selectedSheets.length > 1 && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrevSheet}
                      disabled={currentSheetIndex === 0}
                      className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                    >
                      ‹
                    </button>
                    <span className="text-gray-300 text-sm px-2">
                      {currentSheetIndex + 1} of {selectedSheets.length}
                    </span>
                    <button
                      onClick={handleNextSheet}
                      disabled={currentSheetIndex === selectedSheets.length - 1}
                      className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Configuration Panel */}
          <div className="flex-1 p-6 flex flex-col">
            <h2 className="text-gray-300 text-sm font-medium mb-4">Configuration</h2>
            
            {/* Search */}
            <div className="mb-6">
              <label className="block text-gray-400 text-xs font-medium mb-2">Search Sheets</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search sheets..."
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <svg className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Sheet List */}
            <div className="flex-1 space-y-3 mb-6">
              {sheets
                .filter(sheet => sheet.name.toLowerCase().includes(searchValue.toLowerCase()))
                .map(sheet => (
                <div key={sheet.id} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                  <label className="flex items-center gap-2 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sheet.selected}
                      onChange={(e) => handleSheetSelect(sheet.id, e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                    />
                    <span className="text-white">{sheet.name}</span>
                  </label>
                  
                  <select
                    value={sheet.layout}
                    onChange={(e) => handleLayoutChange(sheet.id, e.target.value)}
                    disabled={!sheet.selected}
                    className="px-2 py-1 bg-gray-600 border border-gray-500 rounded text-white text-sm disabled:opacity-50 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="*Sheet1*">*Sheet1*</option>
                    <option value="*Sheet2*">*Sheet2*</option>
                    <option value="Custom Layout">Custom Layout</option>
                  </select>
                  
                  <button
                    disabled={!sheet.selected}
                    className="w-8 h-8 bg-gray-600 border border-gray-500 rounded flex items-center justify-center text-white disabled:opacity-50 hover:bg-gray-500 transition-colors"
                  >
                    ⚙
                  </button>
                </div>
              ))}
              
              {/* Select All */}
              <div className="pt-3 border-t border-gray-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Select all sheets</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between">
              <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
                Page Layout Manager
              </button>
              <button
                onClick={handlePrint}
                disabled={selectedSheets.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Print ({selectedSheets.length})
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Toolbar */}
        <div className="bg-gray-900 px-6 py-3 border-t border-gray-700 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => handleSelectAll(true)}
              className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white hover:bg-green-700 transition-colors"
            >
              ✓
            </button>
            <button
              onClick={() => handleSelectAll(false)}
              className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white hover:bg-red-700 transition-colors"
            >
              ✕
            </button>
          </div>
          <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}