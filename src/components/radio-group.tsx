import { useState } from 'react';
import { RadioButton } from './radio-button';

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

// RadioButton is now imported from radio-button.tsx - removed duplicate definition