import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './icon';

interface LayoutCreatorProps {
  onApprove?: (layoutName: string, basedOn: string) => void;
  onCancel?: () => void;
  onBasedOnChange?: (basedOn: string) => void; // Callback для изменения "Based on"
  onDelete?: (layoutName: string) => void; // Callback для удаления
  initialLayoutName?: string;
  initialBasedOn?: string;
  availableLayouts?: string[]; // Список доступных layouts
  className?: string;
  mode?: 'create' | 'edit' | 'delete'; // Режим работы
}

export function LayoutCreator({
  onApprove,
  onCancel,
  onBasedOnChange,
  onDelete,
  initialLayoutName = "New Layout",
  initialBasedOn = "*Sheet 1*",
  availableLayouts,
  className = "",
  mode = 'create'
}: LayoutCreatorProps) {
  const [layoutName, setLayoutName] = useState(initialLayoutName);
  const [basedOn, setBasedOn] = useState(initialBasedOn);
  const [isBasedOnDropdownOpen, setIsBasedOnDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  
  const dropdownTriggerRef = useRef<HTMLDivElement>(null);

  // Синхронизируем внутреннее состояние с пропами
  useEffect(() => {
    setLayoutName(initialLayoutName);
  }, [initialLayoutName]);

  useEffect(() => {
    console.log(`🔄 LayoutCreator: Обновляем basedOn с "${basedOn}" на "${initialBasedOn}"`);
    setBasedOn(initialBasedOn);
  }, [initialBasedOn]);

  // Определяем режимы работы
  const isCreateMode = mode === 'create';
  const isEditMode = mode === 'edit';
  const isDeleteMode = mode === 'delete';
  const isFieldsDisabled = isDeleteMode;
  
  // Отладочная информация о текущем состоянии
  console.log(`📊 LayoutCreator состояние:`, {
    layoutName,
    basedOn,
    initialLayoutName,
    initialBasedOn,
    mode,
    isCreateMode,
    isEditMode,
    isDeleteMode,
    isFieldsDisabled,
    isDropdownOpen: isBasedOnDropdownOpen,
    availableLayouts
  });

  const handleApprove = () => {
    if (isDeleteMode && onDelete) {
      onDelete(layoutName);
    } else if (onApprove) {
      onApprove(layoutName, basedOn);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleBasedOnSelect = (value: string) => {
    console.log(`🔄 LayoutCreator: Выбрано "${value}", было "${basedOn}"`);
    setBasedOn(value);
    setIsBasedOnDropdownOpen(false);
    
    // Уведомляем родительский компонент об изменении
    if (onBasedOnChange) {
      onBasedOnChange(value);
    }
  };

  // Обновляем позицию dropdown при открытии (только если не в режиме удаления)
  const handleToggleDropdown = () => {
    if (isFieldsDisabled) return; // Отключаем dropdown в режиме удаления
    
    if (!isBasedOnDropdownOpen && dropdownTriggerRef.current) {
      const rect = dropdownTriggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4, // 4px отступ от элемента
        left: rect.left,
        width: rect.width
      });
    }
    setIsBasedOnDropdownOpen(!isBasedOnDropdownOpen);
  };

  // Закрываем dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isBasedOnDropdownOpen && dropdownTriggerRef.current) {
        const target = event.target as Node;
        const dropdownElement = document.querySelector('[data-dropdown-portal]');
        
        // Проверяем, что клик не в trigger элементе и не в dropdown
        if (!dropdownTriggerRef.current.contains(target) && 
            (!dropdownElement || !dropdownElement.contains(target))) {
          console.log('👆 Клик вне dropdown - закрываем');
          setIsBasedOnDropdownOpen(false);
        }
      }
    };

    if (isBasedOnDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isBasedOnDropdownOpen]);

  // Обновляем позицию при скролле или ресайзе
  useEffect(() => {
    const updatePosition = () => {
      if (isBasedOnDropdownOpen && dropdownTriggerRef.current) {
        const rect = dropdownTriggerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width
        });
      }
    };

    if (isBasedOnDropdownOpen) {
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isBasedOnDropdownOpen]);

  // Используем переданный список или fallback к дефолтным опциям
  const basedOnOptions = availableLayouts || [
    "*Sheet 1*",
    "*Sheet 2*",
    "Custom Layout"
  ];

  console.log(`📋 LayoutCreator dropdown опции:`, basedOnOptions);

  // Portal dropdown компонент
  const PortalDropdown = () => {
    if (!isBasedOnDropdownOpen || isFieldsDisabled) return null;

    return createPortal(
      <div 
        data-dropdown-portal
        className="border border-[#000000] border-solid shadow-lg"
        style={{ 
          position: 'fixed',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
          width: `${dropdownPosition.width}px`,
          backgroundColor: '#141518',
          zIndex: 9999 // Очень высокий z-index
        }}
      >
        {basedOnOptions.map((option, index) => (
          <div
            key={index}
            className="p-[10px] cursor-pointer hover:bg-[#2a2c2f] font-['Open_Sans:Regular',_sans-serif] text-[#d5d7e1] text-[12px] border-b border-[#2a2c2f] last:border-b-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log(`👆 Клик по опции: "${option}"`);
              handleBasedOnSelect(option);
            }}
          >
            <span className="text-[#8e8f90]">Based on: </span>
            <span>{option}</span>
          </div>
        ))}
      </div>,
      document.body // Рендерим в body, вне всех контейнеров
    );
  };

  return (
    <div className={`relative size-full ${className}`}>
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-1.5 items-start justify-start pl-2 pr-1.5 py-2 relative size-full"
             style={{ backgroundColor: '#333538' }}>
          {/* Left side - Input fields */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-1.5 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
            {/* New Layout input */}
            <div
              className="h-7 relative shrink-0 w-full border border-[#000000]"
              style={{ backgroundColor: '#141518' }}
            >
              <div className="flex flex-row items-center relative size-full">
                <div className="box-border content-stretch flex flex-row gap-0.5 h-7 items-center justify-start p-[10px] relative w-full">
                  <input
                    type="text"
                    value={layoutName}
                    onChange={(e) => !isFieldsDisabled && setLayoutName(e.target.value)}
                    disabled={isFieldsDisabled}
                    className={`font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic bg-transparent border-none outline-none text-[12px] text-left flex-1 min-w-0 ${
                      isFieldsDisabled ? 'text-[#898B8C] cursor-not-allowed' : 'text-[#d5d7e1]'
                    }`}
                    placeholder="New Layout"
                  />
                </div>
              </div>
            </div>

            {/* Based on dropdown */}
            <div
              className="h-7 relative shrink-0 w-full border border-[#000000]"
              style={{ backgroundColor: '#141518' }}
            >
              <div className="flex flex-row items-center relative size-full">
                <div 
                  ref={dropdownTriggerRef}
                  className={`box-border content-stretch flex flex-row h-7 items-center justify-between p-[10px] relative w-full ${
                    isFieldsDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  onClick={handleToggleDropdown}
                >
                  <div className={`font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[12px] text-left ${
                    isFieldsDisabled ? 'text-[#898B8C]' : 'text-[#d5d7e1]'
                  }`}>
                    <span className={isFieldsDisabled ? 'text-[#898B8C]' : 'text-[#8e8f90]'}>Based on: </span>
                    <span>{basedOn}</span>
                  </div>
                  {!isFieldsDisabled && (
                    <div className="h-[6.145px] w-[10.875px] transform transition-transform duration-200" style={{ transform: isBasedOnDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 11 7"
                      >
                        <path
                          d="M10.875 0.707031L5.4375 6.14453L0 0.707031L0.707031 0L5.4375 4.73047L10.168 0L10.875 0.707031Z"
                          fill="#D5D7E1"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start p-0 relative shrink-0">
            {/* Approve/Delete button */}
            <div className="relative shrink-0 size-7">
              <div
                className="absolute inset-0 border border-black"
                style={{ backgroundColor: isDeleteMode ? '#d4183d' : '#141518' }}
              />
              <div className="absolute inset-2 flex items-center justify-center">
                <Icon type={isDeleteMode ? "delete-layout" : "approve"} className="size-4" />
              </div>
              <button
                type="button"
                className="absolute inset-0 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleApprove}
                title={isDeleteMode ? "Delete layout" : isEditMode ? "Save layout changes" : "Approve layout"}
              />
            </div>

            {/* Cancel button */}
            <div className="relative shrink-0 size-7">
              <div
                className="absolute inset-0 border border-black"
                style={{ backgroundColor: '#141518' }}
              />
              <div className="absolute inset-2 flex items-center justify-center">
                <Icon type="cancel-creation" className="size-4" />
              </div>
              <button
                type="button"
                className="absolute inset-0 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={handleCancel}
                title={isDeleteMode ? "Cancel layout deletion" : isEditMode ? "Cancel layout editing" : "Cancel layout creation"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Portal dropdown - рендерится вне DOM иерархии */}
      <PortalDropdown />
    </div>
  );
}