import { useEffect, useState, useRef, ReactNode } from 'react';
import { Portal } from './portal';

interface DropdownPortalProps {
  isOpen: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  children: ReactNode;
  offset?: { x: number; y: number };
  className?: string;
}

interface Position {
  top: number;
  left: number;
  width: number;
}

export function DropdownPortal({ 
  isOpen, 
  triggerRef, 
  children, 
  offset = { x: 0, y: 4 },
  className = ''
}: DropdownPortalProps) {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current) {
      return;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // For now, always position below the trigger with a small offset
    // This matches the original expected behavior
    const newPosition = {
      top: triggerRect.bottom + scrollY + offset.y,
      left: triggerRect.left + scrollX + offset.x,
      width: triggerRect.width
    };

    // Ensure dropdown doesn't go off-screen horizontally
    const maxLeft = window.innerWidth - triggerRect.width - 20;
    if (newPosition.left > maxLeft) {
      newPosition.left = maxLeft;
    }
    if (newPosition.left < 10) {
      newPosition.left = 10;
    }

    // Update position
    setPosition(newPosition);
  };

  // Update position when opened and handle scroll/resize
  useEffect(() => {
    if (isOpen) {
      updatePosition();

      // Update position on scroll and resize
      const handlePositionUpdate = () => updatePosition();
      
      window.addEventListener('scroll', handlePositionUpdate, true);
      window.addEventListener('resize', handlePositionUpdate);
      
      return () => {
        window.removeEventListener('scroll', handlePositionUpdate, true);
        window.removeEventListener('resize', handlePositionUpdate);
      };
    }
  }, [isOpen]);

  // Don't render if closed
  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        ref={dropdownRef}
        className={`absolute bg-[#333538] border border-[#000000] shadow-lg dropdown-portal ${className}`}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
          zIndex: 99999, // Increased z-index to ensure it's above everything
          pointerEvents: 'auto' // Enable interactions for the dropdown
        }}
      >
        {children}
      </div>
    </Portal>
  );
}