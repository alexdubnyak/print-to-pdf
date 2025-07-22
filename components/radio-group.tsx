import { useState } from 'react';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  className?: string;
  direction?: 'vertical' | 'horizontal';
}

export function RadioGroup({ 
  options, 
  value, 
  onChange, 
  name,
  className = "",
  direction = 'vertical'
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(value || '');

  const handleChange = (optionValue: string) => {
    setInternalValue(optionValue);
    onChange?.(optionValue);
  };

  const flexDirection = direction === 'vertical' ? 'flex-col' : 'flex-row';
  const gap = direction === 'vertical' ? 'gap-3' : 'gap-6';

  return (
    <div className={`flex ${flexDirection} ${gap} ${className}`} role="radiogroup">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          checked={internalValue === option.value}
          onChange={handleChange}
          label={option.label}
          name={name}
          disabled={option.disabled}
        />
      ))}
    </div>
  );
}

interface RadioButtonProps {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  name: string;
  disabled?: boolean;
  className?: string;
}

export function RadioButton({ 
  value, 
  checked, 
  onChange, 
  label,
  name,
  disabled = false,
  className = ""
}: RadioButtonProps) {
  return (
    <label 
      className={`flex flex-row gap-2 items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
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
      <div className="relative w-4 h-4 flex-shrink-0">
        <div className={`w-4 h-4 rounded-full border-2 transition-colors ${
          checked 
            ? 'border-[#2160D3] bg-[#2160D3]' 
            : 'border-[#666] bg-transparent'
        } flex items-center justify-center`}>
          {checked && (
            <div className="w-2 h-2 rounded-full bg-white transition-opacity"></div>
          )}
        </div>
      </div>
      
      {/* Label */}
      <span className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic text-[#d5d7e1] text-[12px] text-left select-none">
        {label}
      </span>
    </label>
  );
}