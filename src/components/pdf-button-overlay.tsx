interface PDFButtonOverlayProps {
  onClick: () => void;
  className?: string;
}

export function PDFButtonOverlay({ onClick, className = "" }: PDFButtonOverlayProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      // FIXED — поверх любых локальных stacking context'ов
      className={`fixed top-[8px] left-[403px] w-[30px] h-[30px] z-[9999] cursor-pointer pointer-events-auto ${className}`}
      // временно подсветим рамкой, чтобы точно увидеть область клика
      style={{ outline: "1px dashed rgba(0,0,0,0.3)" }}
      title="Open PDF Dialog"
    />
  );
}