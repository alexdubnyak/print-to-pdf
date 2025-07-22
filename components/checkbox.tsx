import svgPaths from "../imports/svg-uo6jg4qcws";

interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function Checkbox({ checked, onChange, disabled = false, className = '', label }: CheckboxProps) {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div 
      className={`flex items-center gap-2.5 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onClick={handleClick}
    >
      <div className="relative shrink-0 size-4">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 16 16"
        >
          <g>
            <rect
              fill={checked ? "#214B98" : "#141518"}
              height="15"
              width="15"
              x="0.5"
              y="0.5"
            />
            <rect
              className="checkbox-border"
              height="15"
              width="15"
              x="0.5"
              y="0.5"
            />
            <path
              d={svgPaths.p16124b80}
              fill="#D5D7E1"
              opacity={checked ? "1" : "0"}
            />
          </g>
        </svg>
      </div>
      {label && (
        <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
          <p className="block leading-[normal] whitespace-pre">{label}</p>
        </div>
      )}
    </div>
  );
}