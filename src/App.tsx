import { useState } from 'react';
import { PageLayoutManager } from './components/page-layout-manager';
import { PDFButtonOverlay } from './components/pdf-button-overlay';
import { PrintToPdfDialog } from './components/print-to-pdf-dialog';
import ResponsiveBackground from './components/responsive-background';

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPageLayoutManagerOpen, setIsPageLayoutManagerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('sheet1'); // По умолчанию активна Sheet1
  const [sheets, setSheets] = useState([
    { id: 'sheet1', name: 'Sheet1', isActive: true },
    { id: 'sheet2', name: 'Sheet2' },
    { id: 'sheet3', name: 'Sheet3' },
    { id: 'sheet4', name: 'Sheet4' },
    { id: 'sheet5', name: 'Sheet5' },
  ]);

  const overlayActive = isDialogOpen || isPageLayoutManagerOpen;

  const openDialog = () => {
    console.log('Opening PrintToPdfDialog');
    setIsDialogOpen(true);
    setIsPageLayoutManagerOpen(false);
  };

  const closeDialog = () => {
    console.log('Closing PrintToPdfDialog');
    setIsDialogOpen(false);
  };

  const openPageLayoutManager = () => {
    console.log('Opening PageLayoutManager');
    setIsDialogOpen(false);
    setIsPageLayoutManagerOpen(true);
  };

  const closePageLayoutManager = () => {
    console.log('Closing PageLayoutManager and reopening PrintToPdfDialog');
    setIsPageLayoutManagerOpen(false);
    setIsDialogOpen(true);
  };

  const handleActiveTabChange = (tabId: string) => {
    console.log('Active tab changed to:', tabId);
    setActiveTab(tabId);
  };

  const handleSheetsChange = (
    newSheets: Array<{ id: string; name: string; isActive: boolean }>
  ) => {
    console.log('Sheets changed:', newSheets);
    setSheets(newSheets);
  };

  return (
    <div className="h-screen w-screen">
      <ResponsiveBackground
        overlay={overlayActive}
        onActiveTabChange={handleActiveTabChange}
        onSheetsChange={handleSheetsChange}
      >
        {/* Прозрачная кнопка запуска диалога */}
        {!overlayActive && <PDFButtonOverlay onClick={openDialog} />}

        {/* Оверлейная обёртка для модалок с полупрозрачным фоном */}
        {(isDialogOpen || isPageLayoutManagerOpen) && (
          <div
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 pointer-events-none overflow-auto"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              minHeight: '100vh',
              minWidth: '100vw',
            }}
          >
            <div
              className="pointer-events-auto mx-auto my-auto flex-shrink-0"
              style={{
                maxWidth: 'calc(100vw - 32px)',
                maxHeight: 'calc(100vh - 32px)',
              }}
            >
              {isDialogOpen && (
                <PrintToPdfDialog
                  onClose={closeDialog}
                  onPageLayoutManagerOpen={openPageLayoutManager}
                  activeTab={activeTab}
                  sheets={sheets}
                  onSheetsChange={handleSheetsChange}
                />
              )}

              {isPageLayoutManagerOpen && (
                <PageLayoutManager onClose={closePageLayoutManager} sheets={sheets} />
              )}
            </div>
          </div>
        )}
      </ResponsiveBackground>
    </div>
  );
}
