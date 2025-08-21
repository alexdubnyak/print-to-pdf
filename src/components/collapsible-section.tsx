import { useState, useEffect, useRef } from 'react';
import svgPaths from "../imports/svg-guscnum5ue";

interface CollapsibleSectionProps {
  title: string;
  isInitiallyOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

type AnimationState = 'closed' | 'opening' | 'open' | 'closing';

export function CollapsibleSection({ 
  title, 
  isInitiallyOpen = true, 
  children, 
  className = "" 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  const [animationState, setAnimationState] = useState<AnimationState>(isInitiallyOpen ? 'open' : 'closed');
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleToggle = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isOpen) {
      // Start closing animation
      setAnimationState('closing');
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        setAnimationState('closed');
      }, 250); // Match CSS animation duration
    } else {
      // Start opening animation
      setIsOpen(true);
      setAnimationState('opening');
      timeoutRef.current = setTimeout(() => {
        setAnimationState('open');
      }, 300); // Match CSS animation duration
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full z-0 ${className}`}
      data-name={title.toLowerCase().replace(/\s+/g, '-')}
    >
      {/* Header */}
      <div 
        className={`
          bg-[#1e2023] relative shrink-0 w-full cursor-pointer settings-header settings-block-header
          ${isOpen ? 'expanded' : ''}
        `} 
        onClick={handleToggle}
      >
        <div className="flex flex-row items-center relative size-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between px-5 py-2 relative w-full">
            <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
              <p className="block leading-[normal] whitespace-pre">{title}</p>
            </div>
            <div className="flex items-center justify-center relative shrink-0">
              <div 
                className={`flex-none settings-arrow ${isOpen ? 'expanded' : ''}`}
              >
                <div
                  className="h-[10.021px] relative w-[10.948px]"
                  data-name="Union"
                >
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 11 11"
                  >
                    <path
                      d={svgPaths.p26072c00}
                      fill="var(--fill-0, #CFCFCF)"
                      id="Union"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {(isOpen || animationState === 'closing') && (
        <div 
          ref={contentRef}
          className={`
            bg-[#333538] relative shrink-0 w-full
            ${animationState === 'opening' ? 'settings-expansion-enter' : ''}
            ${animationState === 'open' ? 'settings-expansion-enter-active' : ''}
            ${animationState === 'closing' ? 'settings-expansion-exit' : ''}
          `}
        >
          <div className="absolute border-[#1e2023] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
          <div 
            className={`
              relative size-full settings-content
              ${animationState === 'opening' ? 'entering' : ''}
              ${animationState === 'open' ? 'entered' : ''}
              ${animationState === 'closing' ? 'exiting' : ''}
            `}
          >
            <div className="settings-content-item">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}