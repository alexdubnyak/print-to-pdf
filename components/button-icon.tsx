import { ReactNode } from 'react';
import { Icon, IconType } from './icon';

interface ButtonIconProps {
  icon?: IconType;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string;        // ← УЖЕ ЕСТЬ В ВАШЕМ КОДЕ
  className?: string;
  variant?: 'default' | 'secondary';
  active?: boolean;        // ← УЖЕ ЕСТЬ В ВАШЕМ КОДЕ
  activeColor?: string;    // ← УЖЕ ЕСТЬ В ВАШЕМ КОДЕ
}

export function ButtonIcon({ 
  icon, 
  children, 
  onClick, 
  disabled = false, 
  tooltip,                 // ← ТОЛЬКО ЭТО ДОБАВЛЯЮ В ПАРАМЕТРЫ
  className = '', 
  variant = 'default',
  active = false,          // ← ОСТАВЛЯЮ ВАШ ОРИГИНАЛЬНЫЙ КОД
  activeColor = '#254CA9'  // ← ОСТАВЛЯЮ ВАШ ОРИГИНАЛЬНЫЙ КОД
}: ButtonIconProps) {
  const variantClass = variant === 'secondary' ? 'button-icon-secondary' : 'button-icon-default';
  
  // Собираем все классы для кнопки
  const buttonClasses = [
    'box-border content-stretch flex flex-row gap-[7.568px] items-center justify-center p-[6px] relative shrink-0 transition-colors',
    'w-7 h-7', // 28x28px размер
    'input-height-standard', // Применяем стандартную высоту 28px
    variantClass, // ← ИСПРАВЛЕНИЕ: всегда применяем variantClass для размеров
    disabled ? 'opacity-50' : '', // Применяем класс из CSS
    className
  ].filter(Boolean).join(' ');

  // ← НОВОЕ: Инлайн стиль для активного состояния
  const buttonStyle = active ? { 
    backgroundColor: activeColor,
    borderColor: activeColor 
  } : {};

  return (
    <button
      type="button"
      disabled={disabled} // HTML атрибут disabled
      className={buttonClasses}
      style={buttonStyle}  // ← НОВОЕ: применяем инлайн стиль
      onClick={disabled ? undefined : onClick}
      title={tooltip} 
      
    >
      <div 
        className="absolute border-[0.756757px] border-solid button-icon-border inset-0 pointer-events-none" 
        style={active ? { borderColor: activeColor } : {}} // ← НОВОЕ: цвет границы для активного состояния
      />
      {icon ? (
        <Icon 
          type={icon} 
          disabled={disabled} 
          active={active}  // ← НОВОЕ: передаем состояние активности в Icon
        />
      ) : (
        children
      )}
    </button>
  );
}