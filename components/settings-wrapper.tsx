import { useState, ReactNode } from 'react';
import svgPaths from "../imports/svg-guscnum5ue";

interface SettingsWrapperProps {
  title: string;
  isInitiallyOpen?: boolean;
  children: ReactNode;
  className?: string;
}

export function SettingsWrapper({ 
  title, 
  isInitiallyOpen = true, 
  children, 
  className = "" 
}: SettingsWrapperProps) {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className={`box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full z-0 ${className}`}
      data-name={title.toLowerCase().replace(/\s+/g, '-')}
    >
      {/* Header */}
      <div className="bg-[#1e2023] relative shrink-0 w-full cursor-pointer settings-block-header" onClick={handleToggle}>
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
      {isOpen && (
        <div className="bg-[#333538] relative shrink-0 w-full overflow-hidden">
          <div className="absolute border-[#1e2023] border-[0px_1px_1px] border-solid inset-0 pointer-events-none" />
          <div className="relative size-full">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}