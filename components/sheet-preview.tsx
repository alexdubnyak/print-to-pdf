import svgPaths from "../imports/svg-uo6jg4qcws";

interface SheetPreviewProps {
  image: string;
  sheetName: string;
  widthMm: string;
  heightMm: string;
}

export function SheetPreview({ image, sheetName, widthMm, heightMm }: SheetPreviewProps) {
  // 🔍 ОТЛАДКА: Логируем все входящие пропсы
  console.log('🔍 SheetPreview props:', {
    image,
    sheetName,
    widthMm,
    heightMm
  });

  // 🔍 ОТЛАДКА: Проверяем URL изображения
  console.log('🖼️ Raw image prop:', image);

  return (
    <div className="h-[251.296px] relative shrink-0 w-[323.5px]">
      {/* Базовый лист (фон) */}
      <div className="absolute flex h-[251.281px] items-center justify-center left-[-0.45px] top-[0.434px] w-[324.391px]">
        <div className="flex-none rotate-[270deg]">
          <div className="h-[324.401px] w-[251.296px]" style={{ backgroundColor: 'var(--color-white)' }} />
        </div>
      </div>
      
      {/* Первый внутренний лист с пунктирной рамкой */}
      <div className="absolute flex h-[239.406px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[310.703px] sheet-preview-center-1">
        <div className="flex-none rotate-[270deg]">
          <div className="h-[310.707px] relative w-[239.417px]" style={{ backgroundColor: 'var(--color-white)' }}>
            <div className="absolute border-[0.456903px] border-dashed inset-0 pointer-events-none" style={{ borderColor: 'var(--color-border-muted)' }} />
          </div>
        </div>
      </div>
      
      {/* Второй внутренний лист с сплошной рамкой - здесь будет изображение */}
      <div className="absolute flex h-[214.734px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[286.938px] sheet-preview-center-2">
        <div className="flex-none rotate-[270deg]">
          <div className="h-[286.948px] relative w-[214.744px] overflow-hidden" style={{ backgroundColor: 'var(--color-white)' }}>
            {/* Рамка листа */}
            <div className="absolute border-[0.456903px] border-solid inset-0 pointer-events-none z-10" style={{ borderColor: 'var(--color-black)' }} />
            
            {/* 🖼️ ИЗОБРАЖЕНИЕ ЧЕРТЕЖА - встроенное на лист с сохранением пропорций + поворот на 90° */}
            <div className="absolute inset-[2px] flex items-center justify-center">
              <img
                src={image}
                alt={`Technical drawing for ${sheetName}`}
                className="max-w-full max-h-full object-contain"
                style={{
                  filter: 'brightness(0.95) contrast(1.1)', // Слегка затемняем для лучшей видимости на белом фоне
                  transform: 'rotate(90deg)', // 🔄 Поворот на 90 градусов по часовой стрелке
                  transformOrigin: 'center center', // Центр вращения
                }}
                onLoad={() => console.log('✅ Изображение загружено и повернуто на 90°:', image)}
                onError={(e) => {
                  console.error('❌ Ошибка загрузки изображения:', image, e);
                  // Fallback - показываем placeholder
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              
              {/* Fallback placeholder на случай ошибки загрузки */}
              <div 
                className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs pointer-events-none"
                style={{ display: 'none' }}
                id={`fallback-${sheetName}`}
              >
                <div className="text-center">
                  <div className="mb-1">📋</div>
                  <div>Technical Drawing</div>
                  <div className="text-[8px] mt-1">{widthMm}×{heightMm}mm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Размерные линии и метки - сохраняем как есть */}
      <div className="absolute flex h-[15.531px] items-center justify-center left-[0.463px] top-[-16.015px] w-[0px]">
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[15.535px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-0.914px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16 1"
              >
                <line
                  id="Line 12"
                  stroke="var(--color-text-light, #D5D7E1)"
                  strokeWidth="0.913805"
                  x2="15.5347"
                  y1="0.543097"
                  y2="0.543097"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[15.531px] items-center justify-center left-[323.95px] top-[-16.015px] w-[0px]">
        <div className="flex-none rotate-[270deg]">
          <div className="h-0 relative w-[15.535px]">
            <div className="absolute bottom-0 left-0 right-0 top-[-0.914px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 16 1"
              >
                <line
                  id="Line 12"
                  stroke="var(--color-text-light, #D5D7E1)"
                  strokeWidth="0.913805"
                  x2="15.5347"
                  y1="0.543097"
                  y2="0.543097"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic text-[9.13805px] text-left text-nowrap top-[-15.535px] sheet-label-position" style={{ color: 'var(--color-text-light)' }}>
        <p className="block leading-[normal] whitespace-pre">{widthMm} mm</p>
      </div>
      <div className="absolute flex h-[33px] items-center justify-center top-[106.435px] w-[10.5px] sheet-dimension-position">
        <div className="flex-none rotate-[90deg]">
          <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative text-[9.13805px] text-left text-nowrap" style={{ color: 'var(--color-text-light)' }}>
            <p className="block leading-[normal] whitespace-pre">{heightMm} mm</p>
          </div>
        </div>
      </div>
      <div className="absolute h-[0.914px] left-[1.377px] top-[-7.767px] w-[134.329px]">
        <div className="absolute bottom-[-268.198%] left-[-0.34%] right-0 top-[-368.198%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 136 8"
          >
            <path
              d={svgPaths.p38025800}
              fill="var(--color-text-light, #D5D7E1)"
              id="Line 14"
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[186.88px] top-[-7.767px] w-[135.243px]">
        <div className="absolute bottom-[-3.365px] left-0 right-[-0.338%] top-[-3.365px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 136 8"
          >
            <path
              d={svgPaths.p3fa11600}
              fill="var(--color-text-light, #D5D7E1)"
              id="Line 15"
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[324.864px] top-[1.828px] w-[11.88px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-0.914px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 12 1"
          >
            <line
              id="Line 16"
              stroke="var(--color-text-light, #D5D7E1)"
              strokeWidth="0.913805"
              x2="11.8795"
              y1="0.543097"
              y2="0.543097"
            />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[324.864px] top-[251.296px] w-[11.88px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-0.914px]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 12 1"
          >
            <line
              id="Line 16"
              stroke="var(--color-text-light, #D5D7E1)"
              strokeWidth="0.913805"
              x2="11.8795"
              y1="0.543097"
              y2="0.543097"
            />
          </svg>
        </div>
      </div>
      <div className="absolute flex h-[95.938px] items-center justify-center left-[330.804px] top-[1.828px] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[95.95px]">
            <div className="absolute bottom-[-3.365px] left-[-0.476%] right-0 top-[-3.365px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 97 8"
              >
                <path
                  d={svgPaths.pd5ba200}
                  fill="var(--color-text-light, #D5D7E1)"
                  id="Line 18"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[95.938px] items-center justify-center left-[330.804px] top-[152.605px] w-[0px]">
        <div className="flex-none rotate-[90deg]">
          <div className="h-0 relative w-[95.95px]">
            <div className="absolute bottom-[-3.365px] left-0 right-[-0.476%] top-[-3.365px]">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 97 8"
              >
                <path
                  d={svgPaths.pf09200}
                  fill="var(--stroke-0, white)"
                  id="Line 19"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] left-[144.388px] not-italic text-[10.9657px] text-left text-nowrap top-[-37.923px]" style={{ color: 'var(--color-text-light)' }}>
        <p className="block leading-[normal] whitespace-pre">{sheetName}</p>
      </div>
    </div>
  );
}