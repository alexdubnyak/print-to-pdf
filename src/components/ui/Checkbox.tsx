import React, { useId } from 'react';
import type { CheckboxProps } from '../../types';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  error,
  indeterminate = false,
  className = '',
  'data-testid': testId,
  ...props
}) => {
  const id = useId();
  const checkboxId = props.id || id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  const baseClasses = [
    'w-4',
    'h-4',
    'text-blue-600',
    'bg-gray-700',
    'border-gray-600',
    'rounded',
    'focus:ring-blue-500',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-gray-800',
    'transition-colors',
    'duration-200',
    'cursor-pointer',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ];

  const errorClasses = error
    ? ['border-red-500', 'focus:ring-red-500']
    : [];

  const checkboxClasses = [...baseClasses, ...errorClasses].join(' ');

  const labelClasses = [
    'text-white',
    'select-none',
    'cursor-pointer',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
  ].join(' ');

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <div className="flex items-center h-5">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          ref={(input) => {
            if (input) {
              input.indeterminate = indeterminate;
            }
          }}
          className={checkboxClasses}
          data-testid={testId}
          {...props}
        />
      </div>
      
      {label && (
        <div className="flex-1">
          <label
            htmlFor={checkboxId}
            className={labelClasses}
          >
            {label}
          </label>
          
          {error && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
