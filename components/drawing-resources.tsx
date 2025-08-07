// ============================================
// РАСШИРЕННАЯ БИБЛИОТЕКА ТЕХНИЧЕСКИХ ЧЕРТЕЖЕЙ
// ============================================

export interface DrawingResource {
  id: string;
  name: string;
  url: string;
  widthMm: string;
  heightMm: string;
  format: string;
  category: 'mechanical' | 'architectural' | 'electrical' | 'civil';
  description: string;
  fallbackUrl?: string;
}

// Коллекция реальных технических чертежей из интернета
export const DRAWING_RESOURCES: DrawingResource[] = [
  // Механические чертежи
  {
    id: 'mech-001',
    name: 'Mechanical Part Drawing',
    url: 'https://dwgmodels.com/uploads/dwgs/DWGmodels-05-062.jpg',
    widthMm: '707',
    heightMm: '500',
    format: 'A2 Landscape',
    category: 'mechanical',
    description: 'Technical drawing of mechanical component with dimensions',
    fallbackUrl: 'https://cad-blocks.net/images/mechanical/part-drawing-sample.png'
  },
  {
    id: 'mech-002', 
    name: 'Assembly Drawing',
    url: 'https://dwgmodels.com/uploads/dwgs/DWGmodels-05-063.jpg',
    widthMm: '841',
    heightMm: '594',
    format: 'A1 Portrait',
    category: 'mechanical',
    description: 'Detailed assembly drawing with exploded view',
    fallbackUrl: 'https://freecad.com/images/assembly-sample.png'
  },

  // Архитектурные чертежи
  {
    id: 'arch-001',
    name: 'Floor Plan',
    url: 'https://cad-blocks.net/images/architectural/floor-plan-sample.png',
    widthMm: '594',
    heightMm: '420',
    format: 'A2 Portrait',
    category: 'architectural',
    description: 'Residential building floor plan with room layouts',
    fallbackUrl: 'https://dwg.ru/images/samples/floor-plan.png'
  },
  {
    id: 'arch-002',
    name: 'Building Elevation',
    url: 'https://free-dwg.com/images/samples/building-elevation.png',
    widthMm: '841',
    heightMm: '594',
    format: 'A1 Portrait',
    category: 'architectural',
    description: 'Building front elevation with detailed facade',
    fallbackUrl: 'https://bibliocad.com/images/elevation-sample.png'
  },

  // Электрические схемы
  {
    id: 'elec-001',
    name: 'Electrical Schematic',
    url: 'https://cadblocksfree.com/images/electrical/schematic-sample.png',
    widthMm: '420',
    heightMm: '297',
    format: 'A3 Landscape',
    category: 'electrical',
    description: 'Electrical circuit diagram with component symbols',
    fallbackUrl: 'https://arcat.com/images/electrical/circuit-sample.png'
  },

  // Гражданское строительство
  {
    id: 'civil-001',
    name: 'Site Plan',
    url: 'https://saitinpro.ru/images/samples/site-plan.png',
    widthMm: '841',
    heightMm: '594',
    format: 'A1 Portrait', 
    category: 'civil',
    description: 'Construction site plan with topography',
    fallbackUrl: 'https://chertezhi.ru/images/site-plan-sample.png'
  }
];

// Функция для получения чертежа по категории
export const getDrawingsByCategory = (category: DrawingResource['category']): DrawingResource[] => {
  return DRAWING_RESOURCES.filter(drawing => drawing.category === category);
};

// Функция для получения чертежа по формату
export const getDrawingsByFormat = (format: string): DrawingResource[] => {
  return DRAWING_RESOURCES.filter(drawing => drawing.format.includes(format));
};

// Функция для создания fallback SVG чертежа
export const createFallbackDrawing = (
  name: string, 
  widthMm: string, 
  heightMm: string,
  category: string = 'technical'
): string => {
  const categoryColors = {
    mechanical: '#2563eb',
    architectural: '#059669', 
    electrical: '#dc2626',
    civil: '#7c3aed',
    technical: '#6b7280'
  };

  const color = categoryColors[category as keyof typeof categoryColors] || categoryColors.technical;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" stroke-width="0.5"/>
        </pattern>
      </defs>
      
      <!-- Background -->
      <rect width="400" height="300" fill="#ffffff" stroke="${color}" stroke-width="3"/>
      <rect width="400" height="300" fill="url(#grid)" opacity="0.3"/>
      
      <!-- Title block -->
      <rect x="250" y="220" width="140" height="70" fill="none" stroke="${color}" stroke-width="1"/>
      <line x1="250" y1="240" x2="390" y2="240" stroke="${color}" stroke-width="0.5"/>
      <line x1="250" y1="260" x2="390" y2="260" stroke="${color}" stroke-width="0.5"/>
      <line x1="320" y1="220" x2="320" y2="290" stroke="${color}" stroke-width="0.5"/>
      
      <!-- Drawing content -->
      <rect x="50" y="50" width="180" height="120" fill="none" stroke="${color}" stroke-width="2"/>
      <rect x="70" y="70" width="40" height="80" fill="none" stroke="${color}" stroke-width="1"/>
      <rect x="130" y="70" width="80" height="40" fill="none" stroke="${color}" stroke-width="1"/>
      <circle cx="180" cy="130" r="25" fill="none" stroke="${color}" stroke-width="1"/>
      
      <!-- Dimension lines -->
      <line x1="50" y1="30" x2="230" y2="30" stroke="${color}" stroke-width="0.5"/>
      <line x1="50" y1="25" x2="50" y2="35" stroke="${color}" stroke-width="0.5"/>
      <line x1="230" y1="25" x2="230" y2="35" stroke="${color}" stroke-width="0.5"/>
      
      <!-- Text -->
      <text x="255" y="235" font-family="Arial" font-size="10" fill="${color}">TITLE:</text>
      <text x="325" y="235" font-family="Arial" font-size="8" fill="#374151">${name}</text>
      <text x="255" y="255" font-family="Arial" font-size="10" fill="${color}">SIZE:</text>
      <text x="325" y="255" font-family="Arial" font-size="8" fill="#374151">${widthMm}×${heightMm}</text>
      <text x="255" y="275" font-family="Arial" font-size="10" fill="${color}">SCALE:</text>
      <text x="325" y="275" font-family="Arial" font-size="8" fill="#374151">1:1</text>
      
      <text x="140" y="25" font-family="Arial" font-size="8" fill="#374151" text-anchor="middle">${widthMm}</text>
      
      <!-- Logo/watermark -->
      <text x="20" y="280" font-family="Arial" font-size="12" fill="${color}" opacity="0.7">CAD DRAWING</text>
    </svg>
  `)}`;
};

// Предустановленные конфигурации для разных типов листов
export const SHEET_CONFIGS = {
  A4_PORTRAIT: { widthMm: '210', heightMm: '297', format: 'A4 Portrait' },
  A4_LANDSCAPE: { widthMm: '297', heightMm: '210', format: 'A4 Landscape' },
  A3_PORTRAIT: { widthMm: '297', heightMm: '420', format: 'A3 Portrait' },
  A3_LANDSCAPE: { widthMm: '420', heightMm: '297', format: 'A3 Landscape' },
  A2_PORTRAIT: { widthMm: '420', heightMm: '594', format: 'A2 Portrait' },
  A2_LANDSCAPE: { widthMm: '594', heightMm: '420', format: 'A2 Landscape' },
  A1_PORTRAIT: { widthMm: '594', heightMm: '841', format: 'A1 Portrait' },
  A1_LANDSCAPE: { widthMm: '841', heightMm: '594', format: 'A1 Landscape' },
  A0_PORTRAIT: { widthMm: '841', heightMm: '1189', format: 'A0 Portrait' },
  A0_LANDSCAPE: { widthMm: '1189', heightMm: '841', format: 'A0 Landscape' },
  
  // Американские форматы
  LETTER_PORTRAIT: { widthMm: '216', heightMm: '279', format: 'Letter Portrait' },
  LETTER_LANDSCAPE: { widthMm: '279', heightMm: '216', format: 'Letter Landscape' },
  LEGAL_PORTRAIT: { widthMm: '216', heightMm: '356', format: 'Legal Portrait' },
  TABLOID_LANDSCAPE: { widthMm: '432', heightMm: '279', format: 'Tabloid Landscape' },
} as const;

// Функция для получения случайного чертежа
export const getRandomDrawing = (): DrawingResource => {
  const randomIndex = Math.floor(Math.random() * DRAWING_RESOURCES.length);
  return DRAWING_RESOURCES[randomIndex];
};

// Функция для проверки доступности изображения
export const checkImageAvailability = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Массив дополнительных чертежей для демонстрации
export const DEMO_DRAWINGS = [
  {
    id: 'demo-1',
    name: 'Demo Sheet 1',
    image: DRAWING_RESOURCES[0].url,
    widthMm: '707',
    heightMm: '500',
    description: 'Horizontal Technical Drawing'
  },
  {
    id: 'demo-2', 
    name: 'Demo Sheet 2',
    image: DRAWING_RESOURCES[1].url,
    widthMm: '841',
    heightMm: '594',
    description: 'Vertical Technical Drawing (A1)'
  }
];