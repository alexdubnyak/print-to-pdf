import { Icon } from './icon';
import { useRef } from 'react';

interface TextInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  showSearchIcon?: boolean;
}

export function TextInput({ 
  value, 
  onChange, 
  placeholder = '', 
  disabled = false, 
  className = '', 
  showSearchIcon = false 
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleIconClick = () => {
    if (value && onChange) {
      onChange('');
      // Return focus to input after clearing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const getIconType = () => {
    return value ? 'cancel-creation' : 'search';
  };

  return (
    <div className={`bg-[#1e2023] relative shrink-0 w-full ${className}`}>
      <div className="absolute text-input-border inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between px-2.5 py-1.5 relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={`bg-transparent border-none outline-none font-['Open_Sans_Hebrew:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left flex-1 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          />
          {showSearchIcon && (
            <div 
              className={`flex items-center justify-center ${value ? 'cursor-pointer hover:opacity-80' : ''}`}
              onClick={handleIconClick}
            >
              <Icon 
                type={getIconType()} 
                disabled={disabled}
                className="transition-opacity"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}