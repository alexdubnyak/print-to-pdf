import { ReactNode } from 'react';
import { Icon, IconType } from './icon';

interface ButtonIconProps {
  icon?: IconType;
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'secondary';
}

export function ButtonIcon({ 
  icon, 
  children, 
  onClick, 
  disabled = false, 
  className = '', 
  variant = 'default' 
}: ButtonIconProps) {
  const variantClass = variant === 'secondary' ? 'button-icon-secondary' : 'button-icon-default';
  
  // Собираем все классы для кнопки
  const buttonClasses = [
    'box-border content-stretch flex flex-row gap-[7.568px] items-center justify-center p-[7.56757px] relative shrink-0 size-7 transition-colors',
    variantClass,
    disabled ? 'opacity-50' : '', // Применяем класс из CSS
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      disabled={disabled} // HTML атрибут disabled
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
    >
      <div className="absolute border-[0.756757px] border-solid button-icon-border inset-0 pointer-events-none" />
      {icon ? (
        <Icon type={icon} disabled={disabled} />
      ) : (
        children
      )}
    </button>
  );
}