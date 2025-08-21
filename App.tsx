import { useState } from "react";
import { PageLayoutManager } from "./components/page-layout-manager";
import { PDFButtonOverlay } from "./components/pdf-button-overlay";
import { PrintToPdfDialog } from "./components/print-to-pdf-dialog";
import ResponsiveBackground from "./components/responsive-background";

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPageLayoutManagerOpen, setIsPageLayoutManagerOpen] = useState(false);

  const overlayActive = isDialogOpen || isPageLayoutManagerOpen;

  const openDialog = () => {
    console.log("Opening PrintToPdfDialog");
    setIsDialogOpen(true);
    setIsPageLayoutManagerOpen(false);
  };

  const closeDialog = () => {
    console.log("Closing PrintToPdfDialog");
    setIsDialogOpen(false);
  };

  const openPageLayoutManager = () => {
    console.log("Opening PageLayoutManager");
    setIsDialogOpen(false);
    setIsPageLayoutManagerOpen(true);
  };

  const closePageLayoutManager = () => {
    console.log("Closing PageLayoutManager and reopening PrintToPdfDialog");
    setIsPageLayoutManagerOpen(false);
    setIsDialogOpen(true);
  };

  return (
    <div className="h-screen w-screen">
      <ResponsiveBackground overlay={overlayActive}>
        {/* Прозрачная кнопка запуска диалога */}
        {!overlayActive && <PDFButtonOverlay onClick={openDialog} />}

        {/* Оверлейная обёртка для модалок с полупрозрачным фоном */}
        {(isDialogOpen || isPageLayoutManagerOpen) && (
          <div 
            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 pointer-events-none overflow-auto"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              minHeight: '100vh',
              minWidth: '100vw'
            }}
          >
            <div 
              className="pointer-events-auto mx-auto my-auto flex-shrink-0"
              style={{
                maxWidth: 'calc(100vw - 32px)',
                maxHeight: 'calc(100vh - 32px)'
              }}
            >
              {isDialogOpen && (
                <PrintToPdfDialog
                  onClose={closeDialog}
                  onPageLayoutManagerOpen={openPageLayoutManager}
                />
              )}

              {isPageLayoutManagerOpen && (
                <PageLayoutManager onClose={closePageLayoutManager} />
              )}
            </div>
          </div>
        )}
      </ResponsiveBackground>
    </div>
  );
}