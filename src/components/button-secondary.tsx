import { ReactNode } from "react";

interface ButtonSecondaryProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string; // ← ДОБАВИТЬ: поддержка тултипа
  className?: string;
}

export function ButtonSecondary({
  children,
  onClick,
  disabled = false,
  tooltip, // ← ДОБАВИТЬ: тултип
  className = "",
}: ButtonSecondaryProps) {
  return (
    <div
      className={`box-border content-stretch flex flex-row gap-1.5 h-full items-center justify-center px-3 py-1 relative shrink-0 cursor-pointer transition-colors button-secondary ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={disabled ? undefined : onClick}
      title={tooltip} // ← ДОБАВИТЬ: тултип
    >
      <div className="absolute border border-solid button-secondary-border inset-0 pointer-events-none" />
      <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          {children}
        </p>
      </div>
    </div>
  );
}