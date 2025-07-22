import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
    validator?: (value: any) => value is T;
  } = {}
) {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    validator
  } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      const item = window.localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }

      const parsed = deserialize(item);
      if (validator && !validator(parsed)) {
        console.warn(`Invalid data in localStorage for key "${key}", using default value`);
        return defaultValue;
      }

      return parsed;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serialize(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, serialize, storedValue]);

  const removeValue = useCallback(() => {
    try {
      setStoredValue(defaultValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, defaultValue]);

  // Listen for changes to this key from other tabs/windows
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const parsed = deserialize(e.newValue);
          if (validator && !validator(parsed)) {
            return;
          }
          setStoredValue(parsed);
        } catch (error) {
          console.error(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserialize, validator]);

  return [storedValue, setValue, removeValue] as const;
}

// Specialized hooks for common use cases
export function useStringStorage(key: string, defaultValue = '') {
  return useLocalStorage(key, defaultValue, {
    serialize: (value) => value,
    deserialize: (value) => value,
    validator: (value): value is string => typeof value === 'string'
  });
}

export function useNumberStorage(key: string, defaultValue = 0) {
  return useLocalStorage(key, defaultValue, {
    validator: (value): value is number => typeof value === 'number' && !isNaN(value)
  });
}

export function useBooleanStorage(key: string, defaultValue = false) {
  return useLocalStorage(key, defaultValue, {
    validator: (value): value is boolean => typeof value === 'boolean'
  });
}

export function useArrayStorage<T>(key: string, defaultValue: T[] = []) {
  return useLocalStorage(key, defaultValue, {
    validator: (value): value is T[] => Array.isArray(value)
  });
}

// Hook for managing user preferences
export function useUserPreferences() {
  const [theme, setTheme] = useStringStorage('print-pdf-theme', 'dark');
  const [language, setLanguage] = useStringStorage('print-pdf-language', 'en');
  const [autoSave, setAutoSave] = useBooleanStorage('print-pdf-auto-save', true);
  const [recentSheets, setRecentSheets] = useArrayStorage<string>('print-pdf-recent-sheets', []);
  const [lastWindowSize, setLastWindowSize] = useLocalStorage('print-pdf-window-size', { width: 1200, height: 800 });
  const [defaultPrintSettings, setDefaultPrintSettings] = useLocalStorage('print-pdf-default-settings', {
    quality: 'normal' as const,
    colorMode: 'color' as const,
    paperSize: 'A4' as const,
  });

  const addRecentSheet = useCallback((sheetId: string) => {
    setRecentSheets(prev => {
      const filtered = prev.filter(id => id !== sheetId);
      return [sheetId, ...filtered].slice(0, 10); // Keep only last 10
    });
  }, [setRecentSheets]);

  const clearRecentSheets = useCallback(() => {
    setRecentSheets([]);
  }, [setRecentSheets]);

  const resetPreferences = useCallback(() => {
    setTheme('dark');
    setLanguage('en');
    setAutoSave(true);
    setRecentSheets([]);
    setLastWindowSize({ width: 1200, height: 800 });
    setDefaultPrintSettings({
      quality: 'normal',
      colorMode: 'color',
      paperSize: 'A4',
    });
  }, [setTheme, setLanguage, setAutoSave, setRecentSheets, setLastWindowSize, setDefaultPrintSettings]);

  return {
    theme,
    setTheme,
    language,
    setLanguage,
    autoSave,
    setAutoSave,
    recentSheets,
    setRecentSheets,
    addRecentSheet,
    clearRecentSheets,
    lastWindowSize,
    setLastWindowSize,
    defaultPrintSettings,
    setDefaultPrintSettings,
    resetPreferences,
  };
}

export default useLocalStorage;
