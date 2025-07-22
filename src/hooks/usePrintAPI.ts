import { useState, useCallback } from 'react';
import { Sheet, PrintSettings, ExportRequest, ExportResponse, NetworkError, FileError } from '../types';

interface PrintState {
  isLoading: boolean;
  progress: number;
  error: string | null;
  currentOperation: 'idle' | 'printing' | 'exporting' | 'processing';
}

export function usePrintAPI() {
  const [state, setState] = useState<PrintState>({
    isLoading: false,
    progress: 0,
    error: null,
    currentOperation: 'idle',
  });

  const setLoading = useCallback((loading: boolean, operation: PrintState['currentOperation'] = 'idle') => {
    setState(prev => ({
      ...prev,
      isLoading: loading,
      currentOperation: operation,
      progress: loading ? 0 : 100,
      error: loading ? null : prev.error,
    }));
  }, []);

  const setProgress = useCallback((progress: number) => {
    setState(prev => ({
      ...prev,
      progress: Math.max(0, Math.min(100, progress)),
    }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({
      ...prev,
      error,
      isLoading: false,
      currentOperation: 'idle',
      progress: error ? 0 : 100,
    }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  // Mock API functions - replace with real API calls
  const exportToPDF = useCallback(async (
    sheets: Sheet[],
    settings: PrintSettings,
    filename?: string
  ): Promise<ExportResponse> => {
    if (sheets.length === 0) {
      throw new Error('No sheets selected for export');
    }

    setLoading(true, 'exporting');
    setError(null);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setState(prev => {
          const newProgress = prev.progress + Math.random() * 20;
          return {
            ...prev,
            progress: Math.min(90, newProgress),
          };
        });
      }, 500);

      // Mock API request
      const request: ExportRequest = {
        sheets,
        settings,
        format: 'pdf',
        filename: filename || `sheets-${Date.now()}.pdf`,
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

      clearInterval(progressInterval);
      setProgress(100);

      // Mock response
      const response: ExportResponse = {
        fileUrl: `blob:${window.location.origin}/${request.filename}`,
        filename: request.filename!,
        size: Math.floor(Math.random() * 5000000) + 1000000, // 1-5MB
        pageCount: sheets.length,
      };

      // Simulate file download
      const blob = new Blob(['%PDF-1.4 Mock PDF content'], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = response.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setLoading(false);
      return response;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Export failed';
      setError(errorMessage);
      throw new NetworkError(errorMessage, 500, { originalError: error });
    }
  }, [setLoading, setError, setProgress]);

  const printSheets = useCallback(async (
    sheets: Sheet[],
    settings: PrintSettings
  ): Promise<void> => {
    if (sheets.length === 0) {
      throw new Error('No sheets selected for printing');
    }

    setLoading(true, 'printing');
    setError(null);

    try {
      // Check if browser supports printing
      if (!window.print) {
        throw new Error('Printing is not supported in this browser');
      }

      // Simulate preparation time
      setProgress(30);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProgress(60);
      
      // Create print window with sheets
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        throw new Error('Failed to open print window. Please allow popups.');
      }

      // Generate print content
      const printContent = generatePrintHTML(sheets, settings);
      printWindow.document.write(printContent);
      printWindow.document.close();

      setProgress(90);

      // Focus and print
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        setProgress(100);
        setLoading(false);
      }, 500);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Print failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [setLoading, setError, setProgress]);

  const validateSheets = useCallback((sheets: Sheet[]): string[] => {
    const errors: string[] = [];

    if (sheets.length === 0) {
      errors.push('No sheets selected');
    }

    sheets.forEach((sheet, index) => {
      if (!sheet.name.trim()) {
        errors.push(`Sheet ${index + 1} has no name`);
      }
      if (sheet.widthMm <= 0 || sheet.heightMm <= 0) {
        errors.push(`Sheet "${sheet.name}" has invalid dimensions`);
      }
      if (!sheet.layout) {
        errors.push(`Sheet "${sheet.name}" has no layout selected`);
      }
    });

    return errors;
  }, []);

  const quickExport = useCallback(async (
    sheets: Sheet[],
    format: 'pdf' | 'png' | 'jpg' = 'pdf'
  ) => {
    const errors = validateSheets(sheets);
    if (errors.length > 0) {
      throw new FileError(`Validation failed: ${errors.join(', ')}`);
    }

    const defaultSettings: PrintSettings = {
      quality: 'normal',
      colorMode: 'color',
      paperSize: 'A4',
    };

    return exportToPDF(sheets, defaultSettings);
  }, [validateSheets, exportToPDF]);

  return {
    // State
    isLoading: state.isLoading,
    progress: state.progress,
    error: state.error,
    currentOperation: state.currentOperation,

    // Actions
    exportToPDF,
    printSheets,
    quickExport,
    validateSheets,
    
    // Utilities
    clearError,
    setError,
    setProgress,
  };
}

// Helper function to generate HTML for printing
function generatePrintHTML(sheets: Sheet[], settings: PrintSettings): string {
  const { colorMode, quality } = settings;
  
  const styles = `
    <style>
      @media print {
        body { margin: 0; padding: 0; }
        .sheet-page { 
          page-break-after: always; 
          width: 100%; 
          height: 100vh; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          flex-direction: column;
          ${colorMode === 'grayscale' ? 'filter: grayscale(100%);' : ''}
          ${colorMode === 'blackwhite' ? 'filter: contrast(100%) brightness(200%) grayscale(100%);' : ''}
        }
        .sheet-page:last-child { page-break-after: avoid; }
        .sheet-info { 
          text-align: center; 
          font-family: Arial, sans-serif; 
          margin: 20px;
        }
        .sheet-content {
          border: 2px solid #333;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #666;
        }
      }
    </style>
  `;

  const sheetsHTML = sheets.map(sheet => `
    <div class="sheet-page">
      <div class="sheet-info">
        <h2>${sheet.name}</h2>
        <p>Size: ${sheet.widthMm} × ${sheet.heightMm} mm</p>
        <p>Layout: ${sheet.layout}</p>
      </div>
      <div class="sheet-content" style="width: ${Math.min(400, sheet.widthMm)}px; height: ${Math.min(300, sheet.heightMm)}px;">
        Sheet Preview
      </div>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Print Sheets</title>
      ${styles}
    </head>
    <body>
      ${sheetsHTML}
    </body>
    </html>
  `;
}

export default usePrintAPI;
