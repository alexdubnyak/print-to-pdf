import React, { useState, useRef, useEffect, useId } from 'react';
import type { SelectProps } from '../../types';

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  disabled = false,
  error,
  label,
  required = false,
  className = '',
  'data-testid': testId,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const selectId = props.id || id;

  const selectedOption = options.find(option => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          if (highlightedIndex >= 0) {
            handleOptionSelect(options[highlightedIndex].value);
          }
          break;
        case 'Tab':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, highlightedIndex, options]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current) {
      const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        // Set initial highlight to current selection
        const currentIndex = options.findIndex(option => option.value === value);
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const baseClasses = [
    'relative',
    'w-full',
  ];

  const buttonClasses = [
    'w-full',
    'px-3',
    'py-2',
    'bg-gray-700',
    'border',
    'rounded-lg',
    'text-left',
    'text-white',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-offset-gray-800',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'cursor-pointer',
    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 
    isOpen ? 'border-blue-500 focus:border-blue-500 focus:ring-blue-500' : 
    'border-gray-600 hover:border-gray-500',
  ];

  const dropdownClasses = [
    'absolute',
    'z-50',
    'w-full',
    'mt-1',
    'bg-gray-700',
    'border',
    'border-gray-600',
    'rounded-lg',
    'shadow-lg',
    'max-h-60',
    'overflow-auto',
    'py-1',
    'animate-fade-in',
  ];

  return (
    <div className={`${baseClasses.join(' ')} ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <div ref={selectRef} className="relative">
        <button
          id={selectId}
          type="button"
          className={buttonClasses.join(' ')}
          onClick={handleToggle}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${selectId}-label` : undefined}
          data-testid={testId}
        >
          <span className="block truncate">
            {selectedOption ? selectedOption.label : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </span>
          
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            ref={listRef}
            className={dropdownClasses.join(' ')}
            role="listbox"
            aria-labelledby={selectId}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                className={`
                  px-3 py-2 cursor-pointer text-sm transition-colors duration-150
                  ${option.disabled ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:bg-gray-600'}
                  ${highlightedIndex === index ? 'bg-blue-600' : ''}
                  ${value === option.value ? 'bg-blue-500 text-white' : ''}
                `}
                onClick={() => !option.disabled && handleOptionSelect(option.value)}
                role="option"
                aria-selected={value === option.value}
                aria-disabled={option.disabled}
              >
                {option.label}
              </li>
            ))}
          </ul>
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

export default Select;
