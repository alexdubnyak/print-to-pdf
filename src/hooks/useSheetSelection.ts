import { useState, useCallback, useEffect, useMemo } from 'react';
import { Sheet, SheetActions, SortOptions, FilterOptions } from '../types';

export const useSheetSelection = (initialSheets: Sheet[] = []) => {
  const [sheets, setSheets] = useState<Sheet[]>(initialSheets);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'name',
    direction: 'asc'
  });
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});

  // Computed values
  const selectedSheets = useMemo(() => 
    sheets.filter(sheet => sheet.selected), 
    [sheets]
  );

  const selectedCount = selectedSheets.length;

  const filteredAndSortedSheets = useMemo(() => {
    let result = [...sheets];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(sheet =>
        sheet.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply other filters
    if (filterOptions.selectedOnly) {
      result = result.filter(sheet => sheet.selected);
    }

    if (filterOptions.layouts?.length) {
      result = result.filter(sheet =>
        filterOptions.layouts!.includes(sheet.layout)
      );
    }

    if (filterOptions.sizeRange) {
      const { min, max } = filterOptions.sizeRange;
      result = result.filter(sheet =>
        sheet.widthMm >= min.width &&
        sheet.heightMm >= min.height &&
        sheet.widthMm <= max.width &&
        sheet.heightMm <= max.height
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const direction = sortOptions.direction === 'asc' ? 1 : -1;
      
      switch (sortOptions.field) {
        case 'name':
          return direction * a.name.localeCompare(b.name);
        case 'size':
          const aSize = a.widthMm * a.heightMm;
          const bSize = b.widthMm * b.heightMm;
          return direction * (aSize - bSize);
        case 'lastModified':
          const aDate = a.lastModified?.getTime() || 0;
          const bDate = b.lastModified?.getTime() || 0;
          return direction * (aDate - bDate);
        case 'selected':
          return direction * (Number(a.selected) - Number(b.selected));
        default:
          return 0;
      }
    });

    return result;
  }, [sheets, searchQuery, sortOptions, filterOptions]);

  // Actions
  const selectSheet = useCallback((id: string, selected: boolean) => {
    setSheets(prev => prev.map(sheet =>
      sheet.id === id ? { ...sheet, selected } : sheet
    ));
  }, []);

  const selectAllSheets = useCallback((selected: boolean) => {
    setSheets(prev => prev.map(sheet => ({ ...sheet, selected })));
  }, []);

  const updateSheetLayout = useCallback((id: string, layout: string) => {
    setSheets(prev => prev.map(sheet =>
      sheet.id === id ? { ...sheet, layout, lastModified: new Date() } : sheet
    ));
  }, []);

  const addSheet = useCallback((newSheet: Omit<Sheet, 'id'>) => {
    const sheet: Sheet = {
      ...newSheet,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setSheets(prev => [...prev, sheet]);
  }, []);

  const removeSheet = useCallback((id: string) => {
    setSheets(prev => prev.filter(sheet => sheet.id !== id));
  }, []);

  const duplicateSheet = useCallback((id: string) => {
    const originalSheet = sheets.find(sheet => sheet.id === id);
    if (originalSheet) {
      const duplicatedSheet: Sheet = {
        ...originalSheet,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: `${originalSheet.name} (Copy)`,
        selected: false,
        lastModified: new Date(),
      };
      setSheets(prev => [...prev, duplicatedSheet]);
    }
  }, [sheets]);

  const searchSheets = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const updateSheets = useCallback((newSheets: Sheet[]) => {
    setSheets(newSheets);
  }, []);

  const clearSelection = useCallback(() => {
    selectAllSheets(false);
  }, [selectAllSheets]);

  const invertSelection = useCallback(() => {
    setSheets(prev => prev.map(sheet => ({ ...sheet, selected: !sheet.selected })));
  }, []);

  const actions: SheetActions = {
    selectSheet,
    selectAllSheets,
    updateSheetLayout,
    setCurrentSheet: () => {}, // Will be implemented in useNavigation
    searchSheets,
    addSheet,
    removeSheet,
    duplicateSheet,
  };

  return {
    sheets,
    selectedSheets,
    selectedCount,
    filteredAndSortedSheets,
    searchQuery,
    sortOptions,
    filterOptions,
    actions,
    // Additional utilities
    clearSelection,
    invertSelection,
    updateSheets,
    setSortOptions,
    setFilterOptions,
  };
};
