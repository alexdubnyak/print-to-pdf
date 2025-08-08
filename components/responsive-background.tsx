import React, { ReactNode } from 'react';
import imgImage18 from "figma:asset/0fc685cd8f14f838f09ada3b1204362f5d241faf.png";
import imgImage20 from "figma:asset/0fc685cd8f14f838f09ada3b1204362f5d241faf.png";
import imgImage21 from "figma:asset/fc1aa20fa288627bfb8f77e052e2670c57b8a968.png";

interface RibbonItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

interface ResponsiveBackgroundProps {
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  ribbonItems?: RibbonItem[];
  customRibbonContent?: ReactNode;
  showDefaultButtons?: boolean;
}

const ResponsiveBackground: React.FC<ResponsiveBackgroundProps> = ({ 
  children, 
  className = "",
  overlay = false,
  ribbonItems = [],
  customRibbonContent,
  showDefaultButtons = true
}) => {
  // Дефолтные кнопки ribbon из CAD интерфейса
  const defaultRibbonItems: RibbonItem[] = [
    { id: 'file', label: 'File' },
    { id: 'edit', label: 'Edit' },
    { id: 'view', label: 'View' },
    { id: 'insert', label: 'Insert' },
    { id: 'annotate', label: 'Annotate' },
    { id: 'sheet', label: 'Sheet' },
    { id: 'manage', label: 'Manage' },
    { id: 'collaborate', label: 'Collaborate' },
    { id: 'bim', label: 'BIM' },
  ];

  const itemsToRender = showDefaultButtons ? [...defaultRibbonItems, ...ribbonItems] : ribbonItems;

  const renderRibbonButton = (item: RibbonItem) => (
    <button
      key={item.id}
      onClick={item.onClick}
      disabled={item.disabled}
      className={`
        flex-shrink-0 px-3 py-2 rounded text-sm whitespace-nowrap
        transition-colors duration-200 flex items-center space-x-2
        ${item.active 
          ? 'bg-[#214b98] text-white' 
          : 'bg-[#333538] hover:bg-[#404244] text-white'
        }
        ${item.disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer'
        }
      `}
    >
      {item.icon && <span className="w-4 h-4">{item.icon}</span>}
      <span>{item.label}</span>
    </button>
  );

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {/* Основной фоновый слой */}
      <div
        className="absolute bg-center bg-cover bg-no-repeat inset-0 z-0"
        style={{ backgroundImage: `url('${imgImage18}')` }}
      />
      
      {/* Верхняя темная полоса (header) */}
      <div className="absolute bg-[#1e2023] h-20 left-0 top-0 right-0 z-10" />
      
      {/* Ribbon с горизонтальным скроллом */}
      <div className="absolute h-[92px] left-0 top-20 right-0 z-20">
        <div 
          className="relative h-full overflow-x-auto overflow-y-hidden ribbon-scroll"
          style={{ scrollbarWidth: 'thin' }}
        >
          <div className="relative min-w-full h-full">
            {/* Фоновые изображения ribbon */}
            <div
              className="absolute bg-[0%_11.27%] bg-no-repeat bg-size-[100%_873.12%] h-[93px] left-0 top-px w-full min-w-[1496px]"
              style={{ backgroundImage: `url('${imgImage20}')` }}
            />
            
            {/* Правая часть ribbon */}
            <div
              className="absolute bg-[100%_79.25%] bg-no-repeat bg-size-[271.51%_157.61%] h-[92px] right-0 top-0 w-[551px] min-w-[551px]"
              style={{ backgroundImage: `url('${imgImage21}')` }}
            />
            
            {/* Контент ribbon с горизонтальным скроллом */}
            <div className="relative h-full flex items-center px-4 min-w-[1496px]">
              {customRibbonContent ? (
                customRibbonContent
              ) : (
                <div className="flex items-center space-x-2 h-full overflow-x-auto">
                  {itemsToRender.map(renderRibbonButton)}
                  
                  {/* Разделитель */}
                  <div className="h-8 w-px bg-gray-500 mx-2 flex-shrink-0" />
                  
                  {/* Дополнительные инструменты */}
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button className="p-2 rounded bg-[#333538] hover:bg-[#404244] text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded bg-[#333538] hover:bg-[#404244] text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Разделительная полоса */}
      <div className="absolute bg-[#1e2023] h-2.5 left-0 right-0 z-15" style={{ top: '172px' }} />
      
      {/* Основная рабочая область */}
      <div 
        className="absolute bg-[#dcdcdc] left-0 right-0 z-10" 
        style={{ top: '182px', bottom: '37px' }}
      />
      
      {/* Нижняя полоса статуса */}
      <div className="absolute bg-[#333538] h-[37px] left-0 bottom-0 right-0 z-20">
        <div className="flex items-center justify-between h-full px-4 text-white text-sm">
          <div className="flex items-center space-x-4">
            <span>Ready</span>
            <span>Model</span>
            <span>Sheet 1</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Snap: ON</span>
            <span>Grid: ON</span>
            <span>Ortho: OFF</span>
          </div>
        </div>
      </div>
      
      {/* Правые боковые элементы - расширенные для адаптивности */}
      <div className="absolute bg-no-repeat bg-size-[476.43%_1015%] bg-top-right h-20 right-0 top-0 w-[314px] z-15"
           style={{ backgroundImage: `url('${imgImage18}')` }} />
      
      <div className="absolute bg-[100%_82.96%] bg-no-repeat bg-size-[476.43%_137.86%] right-0 w-[314px] z-15"
           style={{ 
             top: '185px', 
             bottom: '37px',
             backgroundImage: `url('${imgImage18}')` 
           }} />
      
      {/* Overlay для диалогов */}
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-30" />
      )}
      
      {/* Контент приложения */}
      <div className="relative z-30 h-full">
        {children}
      </div>
      
      {/* Стили для кастомного скролла */}
      <style jsx>{`
        .ribbon-scroll {
          scrollbar-width: thin;
          scrollbar-color: #555 #1e2023;
        }
        
        .ribbon-scroll::-webkit-scrollbar {
          height: 8px;
        }
        
        .ribbon-scroll::-webkit-scrollbar-track {
          background: #1e2023;
          border-radius: 4px;
        }
        
        .ribbon-scroll::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 4px;
          border: 1px solid #1e2023;
        }
        
        .ribbon-scroll::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
        
        .ribbon-scroll::-webkit-scrollbar-corner {
          background: #1e2023;
        }
      `}</style>
    </div>
  );
};

// Экспорт как именованный и default для обратной совместимости
export { ResponsiveBackground };
export default ResponsiveBackground;