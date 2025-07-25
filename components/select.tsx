import { useState, MouseEvent, useMemo, useRef, useEffect, forwardRef } from "react";
import svgPaths from "../imports/svg-uo6jg4qcws";
import { DropdownPortal } from './dropdown-portal';

// Green checkmark SVG component
function GreenCheckmark({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <svg 
      width="15" 
      height="10" 
      viewBox="0 0 15 10" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-150`}
    >
      <path 
        d="M14.1729 1.00391L6.18652 8.99023L6.19238 8.99609L5.48535 9.70312L0 4.21777L0.707031 3.51074L5.47949 8.2832L13.4658 0.296875L14.1729 1.00391Z" 
        fill="#6EF01D"
      />
    </svg>
  );
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MenuItemProps {
  state?: "standard" | "hover" | "active" | "pressed";
  label: string;
  onSelect: () => void;
  isActive: boolean;
  disabled?: boolean;
}

function MenuItem({ state = "standard", label, onSelect, isActive, disabled = false }: MenuItemProps) {
  const [itemState, setItemState] = useState(state);
  const [isPressed, setIsPressed] = useState(false);
  
  const element = (
    <p className="block leading-[16px] whitespace-pre tracking-[0.36px]">
      {label}
    </p>
  );
  
  const handleClick = () => {
    if (!disabled) {
      onSelect();
    }
  };

  const handleMouseEnter = () => {
    if (!isActive && !disabled) {
      setItemState("hover");
    }
  };

  const handleMouseLeave = () => {
    if (!isActive && !disabled) {
      setItemState("standard");
    }
    setIsPressed(false);
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!disabled) {
      setIsPressed(true);
      setItemState("pressed");
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!disabled) {
      setIsPressed(false);
      if (!isActive) {
        setItemState("hover");
      }
    }
  };

  if (disabled) {
    return (
      <div className="bg-[#333538] relative size-full opacity-50 cursor-not-allowed">
        <div className="flex flex-row items-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start px-3.5 py-0 relative size-full">
            <div
              className="h-[10px] relative shrink-0 w-[15px] flex items-center justify-center"
              data-name="Checkmark"
            >
              <GreenCheckmark isVisible={false} />
            </div>
            <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cfcfcf] text-[12px] text-left text-nowrap tracking-[0.36px]">
              {element}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active state takes precedence
  if (isActive) {
    return (
      <div 
        className="bg-[#010101] relative size-full cursor-pointer transition-colors duration-150" 
        data-name="state=active"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="flex flex-row items-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start px-3.5 py-0 relative size-full">
            <div
              className="h-[10px] relative shrink-0 w-[15px] flex items-center justify-center"
              data-name="Checkmark"
            >
              <GreenCheckmark isVisible={true} />
            </div>
            <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap tracking-[0.36px]">
              {element}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pressed state
  if (isPressed) {
    return (
      <div 
        className="bg-[#000000] relative size-full cursor-pointer transition-colors duration-150" 
        data-name="state=pressed"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="flex flex-row items-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start px-3.5 py-0 relative size-full">
            <div
              className="h-[10px] relative shrink-0 w-[15px] flex items-center justify-center"
              data-name="Checkmark"
            >
              <GreenCheckmark isVisible={isActive} />
            </div>
            <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap tracking-[0.36px]">
              {element}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Hover state
  if (itemState === "hover") {
    return (
      <div 
        className="bg-[#1f2022] relative size-full cursor-pointer transition-colors duration-150" 
        data-name="state=hover"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div className="flex flex-row items-center relative size-full">
          <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start px-3.5 py-0 relative size-full">
            <div
              className="h-[10px] relative shrink-0 w-[15px] flex items-center justify-center"
              data-name="Checkmark"
            >
              <GreenCheckmark isVisible={isActive} />
            </div>
            <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap tracking-[0.36px]">
              {element}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Standard state (default)
  return (
    <div 
      className="bg-[#333538] relative size-full cursor-pointer transition-colors duration-150" 
      data-name="state=standard"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start px-3.5 py-0 relative size-full">
          <div
            className="h-[10px] relative shrink-0 w-[15px] flex items-center justify-center"
            data-name="Checkmark"
          >
            <GreenCheckmark isVisible={isActive} />
          </div>
          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cfcfcf] text-[12px] text-left text-nowrap tracking-[0.36px]">
            {element}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Frame273Props {
  isOpen: boolean;
  toggleDropdown: () => void;
  displayText: string;
  disabled?: boolean;
}

const Frame273 = forwardRef<HTMLButtonElement, Frame273Props>(({ isOpen, toggleDropdown, displayText, disabled = false }, ref) => {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isHeaderPressed, setIsHeaderPressed] = useState(false);
  
  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHeaderHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsHeaderHovered(false);
      setIsHeaderPressed(false);
    }
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsHeaderPressed(true);
    }
  };

  const handleMouseUp = () => {
    if (!disabled) {
      setIsHeaderPressed(false);
    }
  };

  // Determine the header background color based on state
  const headerBgColor = disabled 
    ? "bg-[#141518] opacity-50 cursor-not-allowed"
    : isHeaderPressed 
      ? "bg-[#0a0a0c]" 
      : isHeaderHovered 
        ? "bg-[#1c1e21]" 
        : "bg-[#141518]";

  return (
    <button 
      ref={ref}
      className={`${headerBgColor} cursor-pointer relative shrink-0 w-full transition-colors duration-150 input-height-standard`}
      style={{ height: '28px', minHeight: '28px' }}
      onClick={disabled ? undefined : toggleDropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled={disabled}
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between p-[8px] relative w-full" style={{ height: '28px' }}>
          <div className="font-['Open_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#d5d7e1] text-[12px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              {displayText}
            </p>
          </div>
          <div className="flex items-center justify-center relative shrink-0">
            <div className={`flex-none ${isOpen ? "rotate-[180deg]" : ""} transition-transform duration-200`}>
              <div
                className="h-[6.145px] relative w-[10.875px]"
                data-name="Union"
              >
                <div className="absolute bottom-[0.001%] left-0 right-0 top-0">
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 11 7"
                  >
                    <path
                      d={svgPaths.p31f4a400}
                      fill="var(--fill-0, #D5D7E1)"
                      id="Union"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
});

Frame273.displayName = 'Frame273';

interface DropdownMenuProps {
  activeItem: string;
  setActiveItem: (value: string) => void;
  menuItems: SelectOption[];
}

function DropdownMenu({ activeItem, setActiveItem, menuItems }: DropdownMenuProps) {
  return (
    <>
      {menuItems.map((item) => (
        <div
          key={item.value}
          className="relative w-full"
          style={{ height: '28px', minHeight: '28px' }}
          data-name="menu item"
        >
          <MenuItem 
            label={item.label}
            onSelect={() => setActiveItem(item.value)}
            isActive={activeItem === item.value}
            disabled={item.disabled}
          />
        </div>
      ))}
    </>
  );
}

// Type for dynamic item name props
type ItemNameProps = {
  [K in `itemName${number}`]?: string;
};

interface SelectProps extends ItemNameProps {
  // New props for dynamic menu generation
  itemCount?: number;
  headerText?: string;
  
  // Existing props for compatibility
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'secondary';
}

export function Select({ 
  // New props
  itemCount,
  headerText,
  
  // Existing props
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option', 
  disabled = false, 
  className = '',
  variant = 'default',
  
  // Dynamic item name props
  ...itemNameProps
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Generate menu items based on itemCount and itemName props
  const generatedItems = useMemo(() => {
    if (itemCount && itemCount > 0) {
      const items: SelectOption[] = [];
      for (let i = 1; i <= itemCount; i++) {
        const itemName = itemNameProps[`itemName${i}` as keyof ItemNameProps];
        items.push({
          value: `item${i}`,
          label: itemName || `Item ${i}`,
          disabled: false
        });
      }
      return items;
    }
    return [];
  }, [itemCount, itemNameProps]);

  // Use generated items if available, otherwise fall back to options prop
  const menuItems = generatedItems.length > 0 ? generatedItems : options;

  const selectedOption = menuItems.find(option => option.value === value);
  
  // Show selected option label if available, otherwise show headerText, otherwise show placeholder
  const displayText = selectedOption ? selectedOption.label : (headerText || placeholder);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemSelect = (itemValue: string) => {
    if (!disabled) {
      onChange?.(itemValue);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      const isClickInsideSelect = selectRef.current && selectRef.current.contains(target);
      const isClickInsidePortal = document.getElementById('portal-root')?.contains(target);
      
      if (!isClickInsideSelect && !isClickInsidePortal) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <div 
        ref={selectRef}
        className={`relative ${className}`}
        data-name="dropdown"
      >
        <Frame273 
          ref={triggerRef}
          isOpen={isOpen} 
          toggleDropdown={toggleDropdown} 
          displayText={displayText}
          disabled={disabled}
        />
      </div>
      <DropdownPortal
        isOpen={isOpen && !disabled}
        triggerRef={triggerRef}
      >
        <DropdownMenu 
          activeItem={value || ''} 
          setActiveItem={handleItemSelect} 
          menuItems={menuItems} 
        />
      </DropdownPortal>
    </>
  );
}