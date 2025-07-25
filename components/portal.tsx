import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

export function Portal({ children, containerId = 'portal-root' }: PortalProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Try to find existing container
    let container = document.getElementById(containerId);
    
    // If not found, create it
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.position = 'absolute';
      container.style.top = '0';
      container.style.left = '0';
      container.style.zIndex = '99999';
      container.style.pointerEvents = 'none'; // Don't block interactions
      document.body.appendChild(container);
    }
    
    containerRef.current = container;
    
    // Cleanup - don't remove the container, just keep it for reuse
    return () => {
      // We don't remove the container to avoid recreation issues
      // The container will be reused for subsequent portals
    };
  }, [containerId]);

  if (!containerRef.current) {
    return null;
  }

  return createPortal(children, containerRef.current);
}