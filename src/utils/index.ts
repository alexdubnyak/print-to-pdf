import { Sheet, PrintSettings } from '../types';

// Sheet utilities
export const sheetUtils = {
  /**
   * Calculate the aspect ratio of a sheet
   */
  getAspectRatio: (sheet: Sheet): number => {
    return sheet.widthMm / sheet.heightMm;
  },

  /**
   * Get the area of a sheet in square millimeters
   */
  getArea: (sheet: Sheet): number => {
    return sheet.widthMm * sheet.heightMm;
  },

  /**
   * Check if a sheet is landscape orientation
   */
  isLandscape: (sheet: Sheet): boolean => {
    return sheet.widthMm > sheet.heightMm;
  },

  /**
   * Check if a sheet is portrait orientation
   */
  isPortrait: (sheet: Sheet): boolean => {
    return sheet.heightMm > sheet.widthMm;
  },

  /**
   * Check if a sheet is square
   */
  isSquare: (sheet: Sheet): boolean => {
    return sheet.widthMm === sheet.heightMm;
  },

  /**
   * Get the orientation string
   */
  getOrientation: (sheet: Sheet): 'landscape' | 'portrait' | 'square' => {
    if (sheetUtils.isLandscape(sheet)) return 'landscape';
    if (sheetUtils.isPortrait(sheet)) return 'portrait';
    return 'square';
  },

  /**
   * Convert sheet dimensions to different units
   */
  convertDimensions: (
    sheet: Sheet,
    targetUnit: 'mm' | 'cm' | 'inch' | 'px'
  ): { width: number; height: number } => {
    const { widthMm, heightMm } = sheet;
    
    switch (targetUnit) {
      case 'mm':
        return { width: widthMm, height: heightMm };
      case 'cm':
        return { width: widthMm / 10, height: heightMm / 10 };
      case 'inch':
        return { width: widthMm / 25.4, height: heightMm / 25.4 };
      case 'px':
        // Assume 96 DPI
        return { 
          width: (widthMm / 25.4) * 96, 
          height: (heightMm / 25.4) * 96 
        };
      default:
        return { width: widthMm, height: heightMm };
    }
  },

  /**
   * Get a human-readable size description
   */
  getSizeDescription: (sheet: Sheet): string => {
    const area = sheetUtils.getArea(sheet);
    const orientation = sheetUtils.getOrientation(sheet);
    
    // Check for standard paper sizes
    const standardSizes = [
      { name: 'A0', width: 841, height: 1189 },
      { name: 'A1', width: 594, height: 841 },
      { name: 'A2', width: 420, height: 594 },
      { name: 'A3', width: 297, height: 420 },
      { name: 'A4', width: 210, height: 297 },
      { name: 'A5', width: 148, height: 210 },
      { name: 'Letter', width: 216, height: 279 },
      { name: 'Legal', width: 216, height: 356 },
      { name: 'Tabloid', width: 279, height: 432 },
    ];

    const tolerance = 5; // mm tolerance
    for (const size of standardSizes) {
      const isMatch = (
        Math.abs(sheet.widthMm - size.width) < tolerance &&
        Math.abs(sheet.heightMm - size.height) < tolerance
      ) || (
        Math.abs(sheet.widthMm - size.height) < tolerance &&
        Math.abs(sheet.heightMm - size.width) < tolerance
      );
      
      if (isMatch) {
        return `${size.name} (${orientation})`;
      }
    }

    // Custom size
    if (area < 50000) return `Small (${orientation})`;
    if (area < 200000) return `Medium (${orientation})`;
    if (area < 500000) return `Large (${orientation})`;
    return `Extra Large (${orientation})`;
  },

  /**
   * Validate sheet dimensions
   */
  validateDimensions: (sheet: Sheet): string[] => {
    const errors: string[] = [];
    
    if (sheet.widthMm <= 0) {
      errors.push('Width must be greater than 0');
    }
    if (sheet.heightMm <= 0) {
      errors.push('Height must be greater than 0');
    }
    if (sheet.widthMm > 10000) {
      errors.push('Width cannot exceed 10,000mm');
    }
    if (sheet.heightMm > 10000) {
      errors.push('Height cannot exceed 10,000mm');
    }
    
    return errors;
  },

  /**
   * Generate a unique sheet ID
   */
  generateId: (): string => {
    return `sheet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Create a new sheet with default values
   */
  createSheet: (overrides: Partial<Sheet> = {}): Sheet => {
    return {
      id: sheetUtils.generateId(),
      name: 'New Sheet',
      widthMm: 210, // A4 width
      heightMm: 297, // A4 height
      layout: '*Sheet1*',
      selected: false,
      lastModified: new Date(),
      ...overrides,
    };
  },

  /**
   * Duplicate a sheet with a new ID
   */
  duplicateSheet: (sheet: Sheet, nameSuffix = ' (Copy)'): Sheet => {
    return {
      ...sheet,
      id: sheetUtils.generateId(),
      name: `${sheet.name}${nameSuffix}`,
      selected: false,
      lastModified: new Date(),
    };
  },

  /**
   * Sort sheets by various criteria
   */
  sortSheets: (
    sheets: Sheet[],
    field: 'name' | 'size' | 'lastModified' | 'selected',
    direction: 'asc' | 'desc' = 'asc'
  ): Sheet[] => {
    const sorted = [...sheets].sort((a, b) => {
      let comparison = 0;
      
      switch (field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          const aSize = sheetUtils.getArea(a);
          const bSize = sheetUtils.getArea(b);
          comparison = aSize - bSize;
          break;
        case 'lastModified':
          const aDate = a.lastModified?.getTime() || 0;
          const bDate = b.lastModified?.getTime() || 0;
          comparison = aDate - bDate;
          break;
        case 'selected':
          comparison = Number(a.selected) - Number(b.selected);
          break;
      }
      
      return direction === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  },
};

// File utilities
export const fileUtils = {
  /**
   * Format file size in human readable format
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  },

  /**
   * Generate filename with timestamp
   */
  generateFilename: (
    baseName: string,
    extension: string,
    includeTimestamp = true
  ): string => {
    const cleanBaseName = baseName.replace(/[^a-zA-Z0-9-_]/g, '_');
    const timestamp = includeTimestamp 
      ? `_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}`
      : '';
    
    return `${cleanBaseName}${timestamp}.${extension}`;
  },

  /**
   * Validate file extension
   */
  validateExtension: (filename: string, allowedExtensions: string[]): boolean => {
    const extension = filename.split('.').pop()?.toLowerCase();
    return extension ? allowedExtensions.includes(extension) : false;
  },

  /**
   * Extract filename without extension
   */
  getFilenameWithoutExtension: (filename: string): string => {
    return filename.replace(/\.[^/.]+$/, '');
  },

  /**
   * Get file extension
   */
  getFileExtension: (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || '';
  },
};

// Format utilities
export const formatUtils = {
  /**
   * Format dimensions with units
   */
  formatDimensions: (
    width: number,
    height: number,
    unit = 'mm',
    precision = 1
  ): string => {
    const w = parseFloat(width.toFixed(precision));
    const h = parseFloat(height.toFixed(precision));
    return `${w} × ${h} ${unit}`;
  },

  /**
   * Format date in a readable format
   */
  formatDate: (date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string => {
    const options: Intl.DateTimeFormatOptions = {
      short: { month: 'short', day: 'numeric' },
      medium: { month: 'short', day: 'numeric', year: 'numeric' },
      long: { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      },
    };
    
    return date.toLocaleDateString('en-US', options[format]);
  },

  /**
   * Format time ago (relative time)
   */
  formatTimeAgo: (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return formatUtils.formatDate(date, 'short');
  },

  /**
   * Format number with thousands separator
   */
  formatNumber: (num: number, locale = 'en-US'): string => {
    return new Intl.NumberFormat(locale).format(num);
  },

  /**
   * Truncate text with ellipsis
   */
  truncateText: (text: string, maxLength: number, suffix = '...'): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length) + suffix;
  },

  /**
   * Capitalize first letter
   */
  capitalize: (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  /**
   * Convert to title case
   */
  titleCase: (text: string): string => {
    return text
      .split(' ')
      .map(word => formatUtils.capitalize(word))
      .join(' ');
  },
};

// Validation utilities
export const validationUtils = {
  /**
   * Validate sheet name
   */
  validateSheetName: (name: string): string[] => {
    const errors: string[] = [];
    
    if (!name.trim()) {
      errors.push('Sheet name is required');
    }
    if (name.length > 50) {
      errors.push('Sheet name must be 50 characters or less');
    }
    if (!/^[a-zA-Z0-9\s\-_().]+$/.test(name)) {
      errors.push('Sheet name contains invalid characters');
    }
    
    return errors;
  },

  /**
   * Validate print settings
   */
  validatePrintSettings: (settings: PrintSettings): string[] => {
    const errors: string[] = [];
    
    if (!['draft', 'normal', 'high'].includes(settings.quality)) {
      errors.push('Invalid quality setting');
    }
    if (!['color', 'grayscale', 'blackwhite'].includes(settings.colorMode)) {
      errors.push('Invalid color mode');
    }
    if (!['A4', 'A3', 'Letter', 'Legal', 'Custom'].includes(settings.paperSize)) {
      errors.push('Invalid paper size');
    }
    
    if (settings.paperSize === 'Custom' && settings.customSize) {
      const { width, height } = settings.customSize;
      if (width <= 0 || height <= 0) {
        errors.push('Custom paper size dimensions must be greater than 0');
      }
      if (width > 2000 || height > 2000) {
        errors.push('Custom paper size dimensions are too large');
      }
    }
    
    return errors;
  },

  /**
   * Check if email is valid
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Check if URL is valid
   */
  isValidUrl: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
};

// Color utilities
export const colorUtils = {
  /**
   * Convert hex to RGB
   */
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  /**
   * Convert RGB to hex
   */
  rgbToHex: (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  },

  /**
   * Get contrast color (black or white)
   */
  getContrastColor: (backgroundColor: string): string => {
    const rgb = colorUtils.hexToRgb(backgroundColor);
    if (!rgb) return '#000000';
    
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  },

  /**
   * Generate random color
   */
  randomColor: (): string => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  },
};

// Debug utilities
export const debugUtils = {
  /**
   * Log with timestamp
   */
  log: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] ${message}`, data || '');
    }
  },

  /**
   * Measure execution time
   */
  measureTime: <T>(label: string, fn: () => T): T => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    debugUtils.log(`${label} took ${(end - start).toFixed(2)}ms`);
    return result;
  },

  /**
   * Deep clone object
   */
  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Check if objects are equal
   */
  isEqual: (obj1: any, obj2: any): boolean => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  },
};
