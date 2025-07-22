import React, { useState, useId } from 'react';
import type { InputProps } from '../../types';

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  label,
  required = false,
  type = 'text',
  className = '',
  'data-testid': testId,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const id = useId();
  const inputId = props.id || id;

  const baseClasses = [
    'w-full',
    'px-3',
    'py-2',
    'bg-gray-700',
    'border',
    'rounded-lg',
    'text-white',
    'placeholder-gray-400',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-gray-800',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:bg-gray-800',
  ];

  const borderClasses = error
    ? ['border-red-500', 'focus:border-red-500', 'focus:ring-red-500']
    : focused
    ? ['border-blue-500', 'focus:border-blue-500', 'focus:ring-blue-500']
    : ['border-gray-600', 'hover:border-gray-500'];

  const inputClasses = [...baseClasses, ...borderClasses, className].join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClasses}
          data-testid={testId}
          {...props}
        />
        
        {type === 'search' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
