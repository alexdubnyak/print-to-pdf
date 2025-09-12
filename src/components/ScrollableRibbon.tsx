import React from 'react';
import imgRibbon from '../assets/e957f5dba6ea799dcbd1028743c639263f649749.png';

interface ScrollableRibbonProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollableRibbon({ className = '', style = {} }: ScrollableRibbonProps) {
  return (
    <div className={`h-[96px] ${className}`} data-name="scrollable-ribbon-wrapper" style={style}>
      <div
        className="w-full max-w-full h-full overflow-x-auto overflow-y-hidden scrollbar-bottom"
        data-name="scrollable-ribbon-container"
        style={{
          touchAction: 'pan-x',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div
          className="bg-center bg-cover bg-no-repeat h-[92px] flex-shrink-0"
          data-name="ribbon"
          style={{
            backgroundImage: `url('${imgRibbon}')`,
            width: '1882px',
            minWidth: '1882px',
          }}
        />
      </div>
    </div>
  );
}
