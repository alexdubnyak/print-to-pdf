import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showPercentage?: boolean;
  label?: string;
  className?: string;
  'data-testid'?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showPercentage = false,
  label,
  className = '',
  'data-testid': testId,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600',
  };

  const baseClasses = [
    'w-full',
    'bg-gray-700',
    'rounded-full',
    'overflow-hidden',
    sizeClasses[size],
  ];

  const fillClasses = [
    'h-full',
    'transition-all',
    'duration-300',
    'ease-out',
    variantClasses[variant],
  ];

  return (
    <div className={`${className}`} data-testid={testId}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-300">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-gray-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      <div className={baseClasses.join(' ')} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
        <div
          className={fillClasses.join(' ')}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
