import { ReactNode } from 'react';

export interface RadioButtonProps {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string | ReactNode;
  name: string;
  disabled?: boolean;
  className?: string;
  shape?: 'circle' | 'square';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export function RadioButton({ 
  value, 
  checked, 
  onChange, 
  label,
  name,
  disabled = false,
  className = "",
  shape = 'circle',
  size = 'medium',
  color = 'primary'
}: RadioButtonProps) {
  const handleClick = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  // Size variants
  const sizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  const innerSizeClasses = {
    small: 'w-1.5 h-1.5',
    medium: 'w-2 h-2',
    large: 'w-2.5 h-2.5'
  };

  // Color variants
  const colorClasses = {
    primary: {
      checked: 'border-[#2160D3] bg-[#2160D3]',
      unchecked: 'border-[#666] hover:border-[#4A90E2]',
      checkedHover: 'hover:bg-[#1a4fb8] hover:border-[#1a4fb8]'
    },
    secondary: {
      checked: 'border-[#8e8f90] bg-[#8e8f90]',
      unchecked: 'border-[#666] hover:border-[#8e8f90]',
      checkedHover: 'hover:bg-[#6b6c6d] hover:border-[#6b6c6d]'
    },
    success: {
      checked: 'border-[#22c55e] bg-[#22c55e]',
      unchecked: 'border-[#666] hover:border-[#22c55e]',
      checkedHover: 'hover:bg-[#16a34a] hover:border-[#16a34a]'
    },
    warning: {
      checked: 'border-[#f59e0b] bg-[#f59e0b]',
      unchecked: 'border-[#666] hover:border-[#f59e0b]',
      checkedHover: 'hover:bg-[#d97706] hover:border-[#d97706]'
    },
    error: {
      checked: 'border-[#ef4444] bg-[#ef4444]',
      unchecked: 'border-[#666] hover:border-[#ef4444]',
      checkedHover: 'hover:bg-[#dc2626] hover:border-[#dc2626]'
    }
  };

  const currentColorClass = colorClasses[color];

  return (
    <label 
      className={`flex flex-row gap-2 items-center transition-opacity group ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'cursor-pointer hover:opacity-90'
      } ${className}`}
      onClick={handleClick}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => !disabled && onChange(value)}
        disabled={disabled}
        className="sr-only" // Hide the default radio button
      />
      
      {/* Custom radio button appearance */}
      <div className={`relative ${sizeClasses[size]} flex-shrink-0`}>
        <div className={`
          ${sizeClasses[size]} border-2 flex items-center justify-center
          transition-all duration-200 ease-out
          ${shape === 'circle' ? 'rounded-full' : 'rounded-sm'}
          ${checked 
            ? `${currentColorClass.checked} scale-110 ${!disabled && currentColorClass.checkedHover}` 
            : `bg-transparent ${!disabled ? currentColorClass.unchecked : 'border-[#666]'}`
          }
          ${disabled ? 'opacity-50 border-[#8e8f90] bg-transparent' : ''}
          ${!disabled ? 'group-hover:scale-105' : ''}
        `}>
          {checked && (
            <div className={`
              ${innerSizeClasses[size]} bg-white transition-all duration-150 ease-out
              ${shape === 'circle' ? 'rounded-full' : 'rounded-sm'}
              ${disabled ? 'bg-[#8e8f90]' : ''}
            `}></div>
          )}
        </div>
      </div>
      
      {/* Label */}
      <span className={`
        font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic 
        text-[12px] text-left select-none transition-colors duration-200
        ${disabled 
          ? 'text-[#8e8f90]' 
          : 'text-[#d5d7e1] group-hover:text-white'
        }
      `}>
        {label}
      </span>
    </label>
  );
}