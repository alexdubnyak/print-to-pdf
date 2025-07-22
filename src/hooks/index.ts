// Export all custom hooks for easy importing
export { useSheetSelection } from './useSheetSelection';
export { useNavigation } from './useNavigation';
export { 
  useLocalStorage, 
  useStringStorage, 
  useNumberStorage, 
  useBooleanStorage, 
  useArrayStorage,
  useUserPreferences 
} from './useLocalStorage';
export { usePrintAPI } from './usePrintAPI';

// Re-export default exports
export { default as useNavigationDefault } from './useNavigation';
export { default as useLocalStorageDefault } from './useLocalStorage';
export { default as usePrintAPIDefault } from './usePrintAPI';
