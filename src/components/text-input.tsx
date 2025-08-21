import { Icon } from './icon';
import { Input } from './input';
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

  if (showSearchIcon) {
    // Search input with icon (maintaining original layout)
    return (
      <div className={`relative shrink-0 w-full ${className}`}>
        <div className="flex flex-row items-center relative w-full">
          <Input
            ref={inputRef}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className="pr-8" // Leave space for icon
          />
          <div 
            className={`absolute right-2 flex items-center justify-center ${value ? 'cursor-pointer hover:opacity-80' : ''}`}
            onClick={handleIconClick}
            style={{ height: '28px' }}
          >
            <Icon 
              type={getIconType()} 
              disabled={disabled}
              className="transition-opacity"
            />
          </div>
        </div>
      </div>
    );
  }

  // Simple input without icon
  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  );
}