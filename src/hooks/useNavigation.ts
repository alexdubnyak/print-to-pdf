import { useState, useCallback, useEffect } from 'react';
import { Sheet } from '../types';

export const useNavigation = (sheets: Sheet[]) => {
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  
  const selectedSheets = sheets.filter(sheet => sheet.selected);
  const currentSheet = selectedSheets[currentSheetIndex];
  const hasMultipleSheets = selectedSheets.length > 1;
  const canGoBack = currentSheetIndex > 0;
  const canGoForward = currentSheetIndex < selectedSheets.length - 1;

  // Auto-reset index when selection changes
  useEffect(() => {
    if (currentSheetIndex >= selectedSheets.length) {
      setCurrentSheetIndex(Math.max(0, selectedSheets.length - 1));
    }
  }, [selectedSheets.length, currentSheetIndex]);

  const goToPrevious = useCallback(() => {
    if (canGoBack) {
      setCurrentSheetIndex(prev => prev - 1);
    }
  }, [canGoBack]);

  const goToNext = useCallback(() => {
    if (canGoForward) {
      setCurrentSheetIndex(prev => prev + 1);
    }
  }, [canGoForward]);

  const goToSheet = useCallback((index: number) => {
    if (index >= 0 && index < selectedSheets.length) {
      setCurrentSheetIndex(index);
    }
  }, [selectedSheets.length]);

  const goToSheetById = useCallback((sheetId: string) => {
    const index = selectedSheets.findIndex(sheet => sheet.id === sheetId);
    if (index !== -1) {
      setCurrentSheetIndex(index);
    }
  }, [selectedSheets]);

  const reset = useCallback(() => {
    setCurrentSheetIndex(0);
  }, []);

  return {
    currentSheetIndex,
    currentSheet,
    selectedSheets,
    hasMultipleSheets,
    canGoBack,
    canGoForward,
    goToPrevious,
    goToNext,
    goToSheet,
    goToSheetById,
    reset,
    setCurrentSheetIndex,
  };
};

export default useNavigation;
