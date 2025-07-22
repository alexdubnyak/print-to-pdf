// Types for the Print to PDF application
export interface Sheet {
  id: string;
  name: string;
  widthMm: number;
  heightMm: number;
  layout: string;
  selected: boolean;
  thumbnail?: string;
  lastModified?: Date;
}

export interface Layout {
  id: string;
  name: string;
  description?: string;
  settings: LayoutSettings;
}

export interface LayoutSettings {
  orientation: 'portrait' | 'landscape';
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  scale: number;
  fitToPage: boolean;
}

export interface PrintSettings {
  quality: 'draft' | 'normal' | 'high';
  colorMode: 'color' | 'grayscale' | 'blackwhite';
  paperSize: 'A4' | 'A3' | 'Letter' | 'Legal' | 'Custom';
  customSize?: {
    width: number;
    height: number;
    unit: 'mm' | 'inch';
  };
}

export interface PreviewSettings {
  zoom: number;
  showGrid: boolean;
  showMargins: boolean;
  backgroundColor: string;
}

export interface AppState {
  sheets: Sheet[];
  selectedSheetIds: string[];
  currentSheetIndex: number;
  searchQuery: string;
  printSettings: PrintSettings;
  previewSettings: PreviewSettings;
  isDialogOpen: boolean;
  isLoading: boolean;
  error?: string;
}

export interface SheetActions {
  selectSheet: (id: string, selected: boolean) => void;
  selectAllSheets: (selected: boolean) => void;
  updateSheetLayout: (id: string, layout: string) => void;
  setCurrentSheet: (index: number) => void;
  searchSheets: (query: string) => void;
  addSheet: (sheet: Omit<Sheet, 'id'>) => void;
  removeSheet: (id: string) => void;
  duplicateSheet: (id: string) => void;
}

export interface PrintActions {
  updatePrintSettings: (settings: Partial<PrintSettings>) => void;
  exportToPDF: (sheets: Sheet[]) => Promise<void>;
  printSheets: (sheets: Sheet[]) => Promise<void>;
  savePreset: (name: string, settings: PrintSettings) => void;
  loadPreset: (name: string) => void;
}

export interface UIActions {
  toggleDialog: (open?: boolean) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  updatePreviewSettings: (settings: Partial<PreviewSettings>) => void;
}

// Event types
export interface SheetSelectEvent {
  sheetId: string;
  selected: boolean;
  timestamp: Date;
}

export interface SheetUpdateEvent {
  sheetId: string;
  changes: Partial<Sheet>;
  timestamp: Date;
}

export interface PrintEvent {
  sheets: Sheet[];
  settings: PrintSettings;
  timestamp: Date;
  success: boolean;
  error?: string;
}

// API types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
  timestamp: Date;
}

export interface ExportRequest {
  sheets: Sheet[];
  settings: PrintSettings;
  format: 'pdf' | 'png' | 'jpg';
  filename?: string;
}

export interface ExportResponse {
  fileUrl: string;
  filename: string;
  size: number;
  pageCount: number;
}

// Utility types
export type SheetId = string;
export type LayoutId = string;

export type SortDirection = 'asc' | 'desc';
export type SortField = 'name' | 'size' | 'lastModified' | 'selected';

export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}

export interface FilterOptions {
  selectedOnly?: boolean;
  sizeRange?: {
    min: { width: number; height: number };
    max: { width: number; height: number };
  };
  layouts?: string[];
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface InputProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
  type?: 'text' | 'number' | 'email' | 'password';
}

export interface SelectProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  required?: boolean;
}

export interface CheckboxProps extends BaseComponentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  indeterminate?: boolean;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
}

// Theme types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: {
      primary: string;
      secondary: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Configuration types
export interface AppConfig {
  maxSheets: number;
  maxFileSize: number; // in bytes
  supportedFormats: string[];
  defaultSettings: {
    print: PrintSettings;
    preview: PreviewSettings;
  };
  features: {
    dragAndDrop: boolean;
    cloudSync: boolean;
    realTimePreview: boolean;
    batchProcessing: boolean;
  };
}

// Error types
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string, public status?: number, details?: any) {
    super(message, 'NETWORK_ERROR', details);
    this.name = 'NetworkError';
  }
}

export class FileError extends AppError {
  constructor(message: string, public filename?: string, details?: any) {
    super(message, 'FILE_ERROR', details);
    this.name = 'FileError';
  }
}
