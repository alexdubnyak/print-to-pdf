import React from 'react';

interface LandscapeIconProps {
  isActive?: boolean;
  isInverse?: boolean;
  className?: string;
}

export function LandscapeIcon({
  isActive = false,
  isInverse = false,
  className = '',
}: LandscapeIconProps) {
  // Определяем цвета в зависимости от состояния
  let strokeColor: string;
  let fillColor: string;
  let blackFill: string;
  let rectX: string;
  let rectY: string;

  if (isActive && !isInverse) {
    // active
    strokeColor = 'white';
    fillColor = 'white';
    blackFill = 'black';
    rectX = '24.7684';
    rectY = '19.0078';
  } else if (!isActive && !isInverse) {
    // unactive
    strokeColor = '#575E68';
    fillColor = '#A7A7A7';
    blackFill = 'black';
    rectX = '24.7684';
    rectY = '19.0078';
  } else if (isActive && isInverse) {
    // active inverse
    strokeColor = 'white';
    fillColor = 'white';
    blackFill = 'black';
    rectX = '5.75';
    rectY = '5.5';
  } else {
    // unactive inverse
    strokeColor = '#575E68';
    fillColor = '#A7A7A7';
    blackFill = 'black';
    rectX = '5.75';
    rectY = '5.5';
  }

  return (
    <svg
      width="39"
      height="30"
      viewBox="0 0 39 30"
      fill="none"
      style={{ display: 'block' }}
      className={className}
    >
      {/* Внешняя рамка */}
      <rect x="1.25" y="1" width="36.9999" height="27.697" stroke={strokeColor} />

      {/* Основная область документа */}
      <path
        d="M4.75 25.1895L34.75 25.1895V9.59263L29.562 4.4998L4.75 4.4998V25.1895Z"
        fill={fillColor}
      />

      {/* Прямоугольник - позиция зависит от inverse состояния */}
      <rect x={rectX} y={rectY} width="8.98161" height="5.18896" fill={blackFill} />
    </svg>
  );
}
