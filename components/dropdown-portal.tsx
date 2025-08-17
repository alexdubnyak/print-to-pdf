import { ReactNode, useEffect, useRef, useState } from 'react';
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
  className = '',
}: DropdownPortalProps) {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>(300);
  const [dynamicWidth, setDynamicWidth] = useState<number | null>(null);
  const lastTriggerWidthRef = useRef<number>(0);

  const updatePosition = () => {
    if (!triggerRef.current) {
      return;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Compute available space
    const availableBelow = window.innerHeight - (triggerRect.bottom + offset.y) - 10; // 10px margin
    const availableAbove = triggerRect.top - offset.y - 10; // 10px margin
    const desiredMax = 400; // cap dropdown height

    // Decide placement and max height
    let placeAbove = false;
    let computedMaxHeight = Math.min(Math.max(availableBelow, 0), desiredMax);
    if (computedMaxHeight < 150 && availableAbove > availableBelow) {
      placeAbove = true;
      computedMaxHeight = Math.min(Math.max(availableAbove, 0), desiredMax);
    }

    // Fallback minimal height if both spaces are tiny
    if (computedMaxHeight < 100) {
      computedMaxHeight = 100;
    }

    // Position either below or above the trigger
    const newPosition = {
      top: placeAbove
        ? triggerRect.top + scrollY - offset.y - computedMaxHeight
        : triggerRect.bottom + scrollY + offset.y,
      left: triggerRect.left + scrollX + offset.x,
      width: triggerRect.width,
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
    setMaxHeight(computedMaxHeight);
    setDynamicWidth(triggerRect.width);
    lastTriggerWidthRef.current = triggerRect.width;
  };
  // Measure content width and expand dropdown to fit content while avoiding viewport overflow
  useEffect(() => {
    if (!isOpen) return;
    const node = dropdownRef.current;
    if (!node) return;

    // Temporarily set width to auto to measure scrollWidth
    const prevWidth = node.style.width;
    node.style.width = 'auto';
    const contentWidth = node.scrollWidth;
    node.style.width = prevWidth;

    const margin = 10;
    const viewportWidth = window.innerWidth;
    const maxAllowedWidth = viewportWidth - margin * 2;
    const desiredWidth = Math.max(
      lastTriggerWidthRef.current,
      Math.min(contentWidth, maxAllowedWidth)
    );

    // Adjust left if overflow on right
    let newLeft = position.left;
    if (newLeft + desiredWidth > viewportWidth - margin) {
      newLeft = Math.max(margin, viewportWidth - margin - desiredWidth);
    }
    if (newLeft !== position.left) {
      setPosition(prev => ({ ...prev, left: newLeft }));
    }
    setDynamicWidth(desiredWidth);
  }, [isOpen, position.left]);

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
          width: dynamicWidth != null ? `${dynamicWidth}px` : `${position.width}px`,
          maxHeight: `${maxHeight}px`,
          overflowY: 'auto',
          overflowX: 'hidden',
          zIndex: 99999, // Increased z-index to ensure it's above everything
          pointerEvents: 'auto', // Enable interactions for the dropdown
        }}
      >
        {children}
      </div>
    </Portal>
  );
}
