import { useState } from "react";
import { PageLayoutManager } from "./components/page-layout-manager";
import { PDFButtonOverlay } from "./components/pdf-button-overlay";
import { PrintToPdfDialog } from "./components/print-to-pdf-dialog";
import { ResponsiveBackground } from "./components/responsive-background";

// ============================================
// MAIN APPLICATION COMPONENT
// ============================================

export default function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPageLayoutManagerOpen, setIsPageLayoutManagerOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    console.log("PDF Overlay clicked! Dialog opening...");
  };

  const handlePageLayoutManagerOpen = () => {
    setIsPageLayoutManagerOpen(true);
    console.log("Opening Page Layout Manager");
  };

  const handlePageLayoutManagerClose = () => {
    setIsPageLayoutManagerOpen(false);
    console.log("Page Layout Manager closed");
  };

  // Show Page Layout Manager when opened
  if (isPageLayoutManagerOpen) {
    return (
      <ResponsiveBackground overlay={true}>
        <div className="absolute top-[226px] translate-x-[-50%] print-dialog-position h-[362px] w-[770px]">
          <PageLayoutManager
            onClose={handlePageLayoutManagerClose}
          />
        </div>
      </ResponsiveBackground>
    );
  }

  // Show print dialog when opened
  if (isDialogOpen) {
    return (
      <ResponsiveBackground overlay={true}>
        <PrintToPdfDialog 
          onClose={handleClose}
          onPageLayoutManagerOpen={handlePageLayoutManagerOpen}
        />
      </ResponsiveBackground>
    );
  }

  // Main interface when dialog is closed - clean ARES background with PDF overlay
  return (
    <ResponsiveBackground overlay={false}>
      {/* PDF button overlay from separate component */}
      <PDFButtonOverlay onClick={handleOpenDialog} />
    </ResponsiveBackground>
  );
}