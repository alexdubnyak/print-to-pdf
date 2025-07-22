import { ReactNode } from 'react';

interface ButtonPrimaryProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function ButtonPrimary({ children, onClick, disabled = false, className = '' }: ButtonPrimaryProps) {
  return (
    <div
      className={`basis-0 button-primary grow h-full min-h-px min-w-px relative shrink-0 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-center px-3 py-1 relative size-full">
          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
}