import { ReactNode } from 'react';
import { Icon, IconType } from './icon';

interface ButtonIconProps {
  icon?: IconType;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string;
  className?: string;
  variant?: 'default' | 'secondary';
  active?: boolean;
  activeColor?: string;
  size?: 'small' | 'medium'; // Новый prop для размера
}

export function ButtonIcon({ 
  icon, 
  children, 
  onClick, 
  disabled = false, 
  tooltip,
  className = '', 
  variant = 'default',
  active = false,
  activeColor = '#254CA9',
  size = 'small' // По умолчанию small (28x28)
}: ButtonIconProps) {
  const variantClass = variant === 'secondary' ? 'button-icon-secondary' : 'button-icon-default';
  
  // Определяем размер кнопки
  const sizeClasses = size === 'medium' 
    ? 'w-9 h-9' // 36x36px для medium
    : 'w-7 h-7'; // 28x28px для small
  
  // Определяем размер padding в зависимости от size
  const paddingClass = size === 'medium' 
    ? 'p-[8px]' // 8px padding для medium (36px)
    : 'p-[6px]'; // 6px padding для small (28px)
  
  // Собираем все классы для кнопки
  const buttonClasses = [
    'box-border content-stretch flex flex-row gap-[7.568px] items-center justify-center relative shrink-0 transition-colors',
    sizeClasses, // Размер кнопки
    paddingClass, // Padding
    size === 'small' ? 'input-height-standard' : '', // Применяем стандартную высоту только для small
    variantClass, // Всегда применяем variantClass для стилей
    disabled ? 'opacity-50' : '', // Применяем класс из CSS
    className
  ].filter(Boolean).join(' ');
  
  // Инлайн стиль для активного состояния
  const buttonStyle = active ? { 
    backgroundColor: activeColor,
    borderColor: activeColor 
  } : {};
  
  return (
    <button
      type="button"
      disabled={disabled} // HTML атрибут disabled
      className={buttonClasses}
      style={buttonStyle} // Применяем инлайн стиль
      onClick={disabled ? undefined : onClick}
      title={tooltip} 
    >
      <div 
        className="absolute border-[0.756757px] border-solid button-icon-border inset-0 pointer-events-none" 
        style={active ? { borderColor: activeColor } : {}} // Цвет границы для активного состояния
      />
      {icon ? (
        <Icon 
          type={icon} 
          disabled={disabled} 
          active={active} // Передаем состояние активности в Icon
          size={size} // ИСПРАВЛЕНИЕ: Передаем размер в Icon
        />
      ) : (
        children
      )}
    </button>
  );
}