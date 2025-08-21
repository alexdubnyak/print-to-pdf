import { forwardRef, useState, InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'secondary';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  value = '',
  onChange,
  placeholder = '',
  disabled = false,
  className = '',
  variant = 'default',
  ...inputProps
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Determine background color based on state (same as Select)
  const getBgColor = () => {
    if (disabled) {
      return 'bg-[#141518] opacity-50 cursor-not-allowed';
    }
    if (isFocused) {
      return 'bg-[#0a0a0c]'; // Same as pressed state in Select
    }
    if (isHovered) {
      return 'bg-[#1c1e21]'; // Same as hover state in Select
    }
    return 'bg-[#141518]'; // Same as default state in Select
  };

  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        ${getBgColor()}
        border-0
        cursor-text
        relative
        w-full
        transition-colors
        duration-150
        input-height-standard
        font-['Open_Sans:Regular',_sans-serif]
        text-[#d5d7e1]
        text-[12px]
        text-left
        leading-[0]
        not-italic
        px-2
        py-0
        outline-none
        ${disabled ? 'cursor-not-allowed text-[#8e8f90]' : ''}
        ${className}
      `}
      style={{ 
        height: '28px', 
        minHeight: '28px',
        boxSizing: 'border-box'
      }}
      {...inputProps}
    />
  );
});

Input.displayName = 'Input';

export default Input;