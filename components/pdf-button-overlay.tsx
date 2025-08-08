interface PDFButtonOverlayProps {
  onClick: () => void;
}

export function PDFButtonOverlay({ onClick }: PDFButtonOverlayProps) {
  return (
    <div 
      className="absolute top-[8px] left-[403px] w-[30px] h-[30px] z-50 cursor-pointer"
      onClick={onClick}
      title="Open PDF Dialog"
      style={{
        // Make it visible with red border for positioning
        backgroundColor: 'rgba(255, 0, 0, 0)',
        
        // Add slight visual feedback on hover
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(33, 96, 211, 0)';
        e.currentTarget.style.borderColor = 'blue';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0)';
        e.currentTarget.style.borderColor = 'red';
      }}
    />
  );
}