import { useState, useRef, useEffect } from 'react';
import svgPaths from "../imports/svg-uo6jg4qcws";
import { ButtonSecondary } from './button-secondary';
import { ButtonIcon } from './button-icon';
import { Checkbox } from './checkbox';
import { LayoutCreator } from './layout-creator';

interface PageLayoutManagerProps {
  onClose: () => void;
}

// Sheet layout item component
function SheetLayoutItem({ 
  name, 
  isSelected, 
  onClick, 
  hasStars, 
  isInDeleteMode = false,
  isDeletingThisItem = false 
}: { 
  name: string; 
  isSelected: boolean; 
  onClick: () => void;
  hasStars?: boolean;
  isInDeleteMode?: boolean;
  isDeletingThisItem?: boolean;
}) {
  // Определяем цвет фона и текст в зависимости от режима
  let bgColor = 'bg-[#333538] hover:bg-[#2a2c2e]';
  let displayText = name;
  
  if (isDeletingThisItem) {
    bgColor = 'bg-[#d4183d]'; // Красный фон для удаляемого элемента
    displayText = 'Are you sure you want to delete layout?';
  } else if (isSelected) {
    bgColor = 'bg-[#000000]';
  }

  return (
    <div 
      className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-2 relative shrink-0 cursor-pointer transition-colors duration-200 h-8 w-full ${bgColor}`}
      onClick={onClick}
      title={hasStars ? `${name} - со звездочками (кнопки будут disabled)` : name}
    >
      <div className="font-['Open_Sans_Hebrew:Regular',_sans-serif] leading-[0] not-italic relative text-[#cfcfcf] text-[12px] text-left flex items-center gap-1 w-full min-w-0">
        <p className="block leading-[normal] truncate flex-1">{displayText}</p>
        {hasStars && !isDeletingThisItem && (
          <span className="text-[#ffd700] text-[10px] flex-shrink-0" title="Название со звездочками">⭐</span>
        )}
      </div>
    </div>
  );
}

export function PageLayoutManager({ onClose }: PageLayoutManagerProps) {
  const [selectedLayout, setSelectedLayout] = useState('*Sheet1*');
  const [showDialogOnCreate, setShowDialogOnCreate] = useState(true);
  const [currentSheetLayout, setCurrentSheetLayout] = useState('<None>');
  const [isCreatingLayout, setIsCreatingLayout] = useState(false);
  const [isEditingLayout, setIsEditingLayout] = useState(false);
  const [isDeletingLayout, setIsDeletingLayout] = useState(false);
  const [editingLayoutName, setEditingLayoutName] = useState('');
  const [deletingLayoutName, setDeletingLayoutName] = useState('');
  
  // Ref для контейнера со списком для автопрокрутки
  const listContainerRef = useRef<HTMLDivElement>(null);
  
  // Список layouts для тестирования - теперь состояние, чтобы можно было обновлять
  const [layouts, setLayouts] = useState([
    '*Sheet1*',           // Лист со звездочками - кнопки disabled
    '*Sheet2*',           // Лист со звездочками - кнопки disabled  
    'Custom Layout',      // Обычный layout для активации
  ]);
  
  // Состояние для LayoutCreator - выбранный "Based on" элемент
  const [layoutCreatorBasedOn, setLayoutCreatorBasedOn] = useState('*Sheet1*');
  
  // Автопрокрутка к inline элементам при их появлении
  useEffect(() => {
    if (listContainerRef.current) {
      let targetIndex = -1;
      let actionType = '';
      
      if (isDeletingLayout && deletingLayoutName) {
        targetIndex = layouts.findIndex(layout => layout === deletingLayoutName);
        actionType = 'удаления';
      } else if (isEditingLayout && editingLayoutName) {
        targetIndex = layouts.findIndex(layout => layout === editingLayoutName);
        actionType = 'редактирования';
      } else if (isCreatingLayout) {
        // Для создания - прокручиваем в конец списка
        targetIndex = layouts.length;
        actionType = 'создания';
      }
      
      if (targetIndex !== -1) {
        // Небольшая задержка, чтобы элемент успел отрендериться
        setTimeout(() => {
          if (listContainerRef.current) {
            // Высота одного элемента списка (32px) + высота inline компонента (58px)
            const itemHeight = 32;
            const inlineElementHeight = 58;
            const totalHeight = itemHeight + inlineElementHeight;
            
            // Позиция, где должен начинаться элемент + inline компонент
            const targetScrollTop = targetIndex * itemHeight;
            
            // Проверяем, нужна ли прокрутка
            const containerHeight = listContainerRef.current.clientHeight;
            const scrollTop = listContainerRef.current.scrollTop;
            const elementBottom = targetScrollTop + inlineElementHeight; // Для inline элемента
            
            // Если элемент не полностью виден, прокручиваем
            if (elementBottom > scrollTop + containerHeight || targetScrollTop < scrollTop) {
              const scrollPosition = Math.max(0, elementBottom - containerHeight + 10); // +10px для отступа
              
              listContainerRef.current.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
              });
              
              console.log(`📜 Автопрокрутка к элементу ${actionType}: позиция ${targetIndex}`);
              console.log(`🎯 Позиция прокрутки: ${scrollPosition}px`);
            } else {
              console.log(`✅ Элемент ${actionType} уже виден, прокрутка не нужна`);
            }
          }
        }, 100); // 100ms задержка для рендеринга
      }
    }
  }, [isDeletingLayout, deletingLayoutName, isEditingLayout, editingLayoutName, isCreatingLayout, layouts]);

  // Состояние для сохранения "Based on:" значений для каждого layout'а
  const [layoutBasedOnHistory, setLayoutBasedOnHistory] = useState<Record<string, string>>({});

  // ПРОСТАЯ функция проверки звездочек (ASCII 42) - ТОЛЬКО ЭТО НУЖНО!
  const isLayoutEnclosedInStars = (name: string): boolean => {
    if (!name || name.length < 3) return false;
    return name.charAt(0) === '*' && name.charAt(name.length - 1) === '*';
  };

  // ПРОСТАЯ логика disabled - ТОЛЬКО от selectedLayout зависит
  const selectedLayoutHasStars = isLayoutEnclosedInStars(selectedLayout);
  
  // Кнопки create и import - create disabled когда создаем, редактируем или удаляем layout
  const canCreateLayout = !isCreatingLayout && !isEditingLayout && !isDeletingLayout;
  const canImportLayout = !isEditingLayout && !isDeletingLayout;
  
  // Кнопка edit-layout - ВСЕГДА активна (если что-то выбрано)
  const canListLayout = !!selectedLayout;
  
  // ЭТИ 4 КНОПКИ disabled ТОЛЬКО если selectedLayout со звездочками или идет операция
  const canActivate = !selectedLayoutHasStars && !isDeletingLayout;              // activate
  const canActivateAllSheets = !selectedLayoutHasStars && !isDeletingLayout;     // activate-all-sheets  
  const canEditLayout = !selectedLayoutHasStars && !isCreatingLayout && !isDeletingLayout;            // edit
  const canDeleteLayout = !selectedLayoutHasStars && layouts.length > 1 && !isCreatingLayout && !isEditingLayout; // delete-layout

  // Отладочная информация
  console.log('🎯 ПРАВИЛЬНАЯ ЛОГИКА (как вы просили):');
  console.log({
    selectedLayout,
    selectedLayoutHasStars,
    isCreatingLayout,
    isEditingLayout,
    isDeletingLayout,
    editingLayoutName,
    deletingLayoutName,
    layoutBasedOnHistory,
    currentBasedOn: layoutCreatorBasedOn,
    '=== КНОПКИ ===': '---',
    'create-layout': canCreateLayout ? '✅ АКТИВНА' : '❌ DISABLED (создание/редактирование/удаление)',
    'import-layout': canImportLayout ? '✅ АКТИВНА' : '❌ DISABLED (редактирование/удаление)', 
    'edit-layout': canListLayout ? '✅ АКТИВНА' : '❌ DISABLED',
    'activate': canActivate ? '✅ АКТИВНА' : '❌ DISABLED (звездочки)',
    'activate-all-sheets': canActivateAllSheets ? '✅ АКТИВНА' : '❌ DISABLED (звездочки)',
    'edit': canEditLayout ? '✅ АКТИВНА' : '❌ DISABLED (звездочки)',
    'delete-layout': canDeleteLayout ? '✅ АКТИВНА' : '❌ DISABLED (звездочки)'
  });

  const handleLayoutSelect = (layout: string) => {
    // Блокируем выбор других элементов в режиме удаления
    if (isDeletingLayout) {
      console.log('🚫 Выбор заблокирован: идет процесс удаления');
      return;
    }
    
    setSelectedLayout(layout);
    console.log(`\n🔄 Выбран layout: "${layout}"`);
    console.log(`Имеет звездочки: ${isLayoutEnclosedInStars(layout) ? 'ДА ⭐' : 'НЕТ ⚪'}`);
  };

  // Переключение режима создания layout (инлайн)
  const handleAddLayout = () => {
    if (!isEditingLayout && !isDeletingLayout) { // Можно создавать только если не редактируем и не удаляем
      // Закрываем все другие режимы (на всякий случай)
      setIsEditingLayout(false);
      setIsDeletingLayout(false);
      setEditingLayoutName('');
      setDeletingLayoutName('');
      
      setIsCreatingLayout(true);
      // Сбрасываем "Based on" к первому доступному layout при открытии
      setLayoutCreatorBasedOn(layouts.length > 0 ? layouts[0] : '*Sheet1*');
      console.log('🔄 Открыт инлайн создатель layout');
      console.log(`🎬 Подготовка к автопрокрутке для видимости inline элемента создания`);
    }
  };
  
  // Подтверждение создания layout (из инлайн компонента)
  const handleApproveLayout = (name: string, basedOn: string) => {
    // Проверяем, что имя не пустое и не состоит только из пробелов
    const trimmedName = name.trim();
    if (!trimmedName) {
      console.warn('❌ Нельзя создать layout с пустым именем');
      return;
    }
    
    // Проверяем, существует ли уже layout с таким именем, и генерируем уникальное
    let uniqueName = trimmedName;
    let counter = 1;
    
    while (layouts.includes(uniqueName)) {
      uniqueName = `${trimmedName} ${counter}`;
      counter++;
    }
    
    // Добавляем новый layout в список
    setLayouts(prevLayouts => [...prevLayouts, uniqueName]);
    
    // Сохраняем выбранное "Based on:" значение для этого layout'а
    setLayoutBasedOnHistory(prev => ({
      ...prev,
      [uniqueName]: basedOn
    }));
    
    // Автоматически выбираем созданный layout
    setSelectedLayout(uniqueName);
    
    // Закрываем режим создания
    setIsCreatingLayout(false);
    
    console.log(`✅ Создан новый layout: "${uniqueName}" на основе "${basedOn}"`);
    console.log(`💾 Сохранено "Based on:" значение для "${uniqueName}": "${basedOn}"`);
  };
  
  // Обработчик изменения "Based on" в LayoutCreator
  const handleLayoutCreatorBasedOnChange = (basedOn: string) => {
    setLayoutCreatorBasedOn(basedOn);
    console.log(`🔄 LayoutCreator "Based on" изменен на: "${basedOn}"`);
  };

  // Обработчик редактирования layout
  const handleEditLayout = () => {
    if (selectedLayout && !selectedLayoutHasStars && !isCreatingLayout && !isDeletingLayout) { // Можно редактировать только если не создаем и не удаляем
      // Закрываем все другие режимы (на всякий случай)
      setIsCreatingLayout(false);
      setIsDeletingLayout(false);
      setDeletingLayoutName('');
      
      setEditingLayoutName(selectedLayout);
      
      // Используем сохраненное ранее "Based on:" значение, или дефолтное если не найдено
      const savedBasedOn = layoutBasedOnHistory[selectedLayout] || selectedLayout;
      setLayoutCreatorBasedOn(savedBasedOn);
      
      setIsEditingLayout(true);
      console.log(`🔄 Открыт инлайн редактор для layout: "${selectedLayout}"`);
      console.log(`📖 Загружено сохраненное "Based on:" значение: "${savedBasedOn}"`);
      console.log(`🎬 Подготовка к автопрокрутке для видимости inline элемента редактирования`);
    }
  };

  // Подтверждение редактирования layout (из инлайн компонента)
  const handleApproveEditLayout = (newName: string, basedOn: string) => {
    if (editingLayoutName) {
      // Проверяем, что имя не пустое и не состоит только из пробелов
      const trimmedName = newName.trim();
      if (!trimmedName) {
        console.warn('❌ Нельзя сохранить layout с пустым именем');
        return;
      }
      
      // Проверяем уникальность нового имени (но только если имя изменилось)
      let uniqueName = trimmedName;
      if (editingLayoutName !== trimmedName) {
        let counter = 1;
        
        while (layouts.includes(uniqueName) && uniqueName !== editingLayoutName) {
          uniqueName = `${trimmedName} ${counter}`;
          counter++;
        }
      }
      
      // Обновляем название layout в списке
      setLayouts(prevLayouts => 
        prevLayouts.map(layout => 
          layout === editingLayoutName ? uniqueName : layout
        )
      );
      
      // Обновляем историю "Based on:" значений
      setLayoutBasedOnHistory(prev => {
        const updated = { ...prev };
        // Если название изменилось, удаляем старую запись и добавляем новую
        if (editingLayoutName !== uniqueName) {
          delete updated[editingLayoutName];
        }
        updated[uniqueName] = basedOn;
        return updated;
      });
      
      // Обновляем выбранный layout на новое имя
      setSelectedLayout(uniqueName);
      
      // Закрываем режим редактирования
      setIsEditingLayout(false);
      setEditingLayoutName('');
      
      console.log(`✅ Отредактирован layout: "${editingLayoutName}" → "${uniqueName}" на основе "${basedOn}"`);
      console.log(`💾 Обновлено "Based on:" значение для "${uniqueName}": "${basedOn}"`);
    }
  };

  // Отмена редактирования layout (из инлайн компонента)
  const handleCancelEditLayout = () => {
    setIsEditingLayout(false);
    setEditingLayoutName('');
    // Сбрасываем состояние при отмене
    setLayoutCreatorBasedOn('*Sheet1*');
    console.log('❌ Отменено редактирование layout');
  };
  
  // Отмена создания layout (из инлайн компонента)
  const handleCancelLayout = () => {
    setIsCreatingLayout(false);
    // Сбрасываем состояние при отмене
    setLayoutCreatorBasedOn('*Sheet1*');
    console.log('❌ Отменено создание layout');
  };
  
  const handleImportLayout = () => console.log('Import layout');
  const handleListLayout = () => console.log('List layouts');
  
  // Проверяем, активирован ли уже layout для Sheet1
  const isLayoutActive = layouts.some(layout => layout.includes('*Sheet1 (') && layout.includes(')*'));
  
  // Проверяем, активирован ли layout для всех листов
  const isLayoutActiveForAllSheets = () => {
    const sheetsWithStars = layouts.filter(layout => isLayoutEnclosedInStars(layout));
    if (sheetsWithStars.length === 0) return false;
    
    // Проверяем, что все листы со звездочками содержат выбранный layout
    return sheetsWithStars.every(layout => 
      layout.includes(`(${selectedLayout})`) && selectedLayout && !selectedLayoutHasStars
    );
  };
  
  const allSheetsHaveLayout = isLayoutActiveForAllSheets();
  
  // Функция для активации/деактивации layout'а
  const handleActivateLayout = () => {
    if (selectedLayout && !selectedLayoutHasStars) {
      if (isLayoutActive) {
        // ДЕАКТИВАЦИЯ - возвращаем Sheet1 в исходное состояние
        setLayouts(prevLayouts => 
          prevLayouts.map(layout => {
            // Если это Sheet1 с активированным layout'ом, возвращаем к исходному виду
            if (layout.includes('*Sheet1 (') && layout.includes(')*')) {
              return '*Sheet1*';
            }
            return layout;
          })
        );
        
        // Сбрасываем текущий layout в правой панели
        setCurrentSheetLayout('<None>');
        
        console.log(`❌ Деактивирован layout для листа Sheet1`);
        console.log(`📋 Sheet1 возвращен к исходному состоянию: "*Sheet1*"`);
      } else {
        // АКТИВАЦИЯ - добавляем название layout'а к Sheet1
        setLayouts(prevLayouts => 
          prevLayouts.map(layout => {
            // Если это именно Sheet1 (со звездочками), добавляем к н��му название layout'а
            if (layout === '*Sheet1*') {
              return `*Sheet1 (${selectedLayout})*`;
            }
            return layout;
          })
        );
        
        // Формируем название для отображения в правой панели (без звездочек)
        const newLayoutName = `Sheet1 (${selectedLayout})`;
        setCurrentSheetLayout(newLayoutName);
        
        console.log(`✅ Активирован layout: "${selectedLayout}" для листа Sheet1`);
        console.log(`📋 Sheet1 обновлен в списке: "*Sheet1 (${selectedLayout})*"`);
      }
    }
  };
  
  // Функция для активации/деактивации layout'а для всех листов
  const handleActivateAllSheets = () => {
    if (selectedLayout && !selectedLayoutHasStars) {
      if (allSheetsHaveLayout) {
        // ДЕАКТИВАЦИЯ - возвращаем все листы к исходному состоянию
        setLayouts(prevLayouts => 
          prevLayouts.map(layout => {
            if (isLayoutEnclosedInStars(layout) && layout.includes(`(${selectedLayout})`)) {
              // Извлекаем исходное название листа (до первой скобки)
              const originalName = layout.split(' (')[0] + '*';
              return originalName;
            }
            return layout;
          })
        );
        
        // Сбрасываем текущий layout в правой панели
        setCurrentSheetLayout('<None>');
        
        console.log(`❌ Деактивирован layout "${selectedLayout}" для всех листов`);
      } else {
        // АКТИВАЦИЯ - добавляем название layout'а ко всем листам со звездочками
        setLayouts(prevLayouts => 
          prevLayouts.map(layout => {
            if (isLayoutEnclosedInStars(layout) && !layout.includes(`(${selectedLayout})`)) {
              // Убираем последнюю звездочку, добавляем layout, возвращаем звездочку
              const sheetName = layout.slice(0, -1); // Убираем последнюю *
              return `${sheetName} (${selectedLayout})*`;
            }
            return layout;
          })
        );
        
        // Обновляем текущий layout для Sheet1 если он есть в списке
        const sheet1WithLayout = `Sheet1 (${selectedLayout})`;
        setCurrentSheetLayout(sheet1WithLayout);
        
        console.log(`✅ Активирован layout "${selectedLayout}" для всех листов`);
      }
    }
  };
  
  const handleCopyLayout = () => console.log('Copy layout');
  
  // Обработчик начала удаления layout (открытие inline компонента)
  const handleDeleteLayout = () => {
    if (selectedLayout && !selectedLayoutHasStars && layouts.length > 1 && !isCreatingLayout && !isEditingLayout) {
      // Закрываем все другие режимы (на всякий случай)
      setIsCreatingLayout(false);
      setIsEditingLayout(false);
      setEditingLayoutName('');
      
      setDeletingLayoutName(selectedLayout);
      
      // Используем сохраненное ранее "Based on:" значение для отображения
      const savedBasedOn = layoutBasedOnHistory[selectedLayout] || selectedLayout;
      setLayoutCreatorBasedOn(savedBasedOn);
      
      setIsDeletingLayout(true);
      console.log(`🔄 Открыт инлайн удалятель для layout: "${selectedLayout}"`);
      console.log(`📖 Загружено сохраненное "Based on:" значение для отображения: "${savedBasedOn}"`);      
      console.log(`🔴 Элемент "${selectedLayout}" подсвечен красным цветом`);
      console.log(`💬 Текст изменен на: "Are you sure you want to delete layout?"`);
      console.log(`🎬 Подготовка к автопрокрутке для видимости inline элемента`);
    }
  };
  
  // Подтверждение удаления layout (из инлайн компонента)
  const handleConfirmDeleteLayout = (layoutName: string) => {
    // Удаляем layout из списка
    setLayouts(prevLayouts => prevLayouts.filter(layout => layout !== layoutName));
    
    // Удаляем сохраненное "Based on:" значение для этого layout'а
    setLayoutBasedOnHistory(prev => {
      const updated = { ...prev };
      delete updated[layoutName];
      return updated;
    });
    
    // Выбираем первый доступный layout
    const remainingLayouts = layouts.filter(layout => layout !== layoutName);
    if (remainingLayouts.length > 0) {
      setSelectedLayout(remainingLayouts[0]);
    }
    
    // Закрываем режим удаления
    setIsDeletingLayout(false);
    setDeletingLayoutName('');
    
    console.log(`🗑️ Удален layout: "${layoutName}"`);
    console.log(`🧹 Очищено "Based on:" значение для "${layoutName}"`);
    console.log('✅ Режим удаления завершен');
  };
  
  // Отмена удаления layout (из инлайн компонента)
  const handleCancelDeleteLayout = () => {
    setIsDeletingLayout(false);
    setDeletingLayoutName('');
    // Сбрасываем состояние при отмене
    setLayoutCreatorBasedOn('*Sheet1*');
    console.log('❌ Отменено удаление layout');
    console.log('🔄 Элемент вернулся к обычному отображению');
  };

  return (
    <div
      className="bg-[#333538] box-border content-stretch flex flex-col gap-px items-start justify-start p-0 relative shadow-[0px_4px_64px_0px_rgba(0,0,0,0.25)] h-[362px] w-[770px]"
      data-name="page layout manager"
    >
      {/* Header */}
      <div className="relative shrink-0 w-full" style={{ backgroundColor: 'var(--color-dialog-bg-dark)' }}>
        <div className="flex flex-row items-center relative size-full">
          <div className="box-border content-stretch flex flex-row items-center justify-between px-2.5 py-0 relative w-full">
            <div className="font-['Open_Sans_Hebrew:Bold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[11px] text-left text-nowrap uppercase" style={{ color: 'var(--color-text-light)' }}>
              <p className="block leading-[normal] whitespace-pre">
                Page layout manager
              </p>
            </div>
            <div className="relative shrink-0 size-[37px] cursor-pointer hover:opacity-80 transition-opacity" data-name="actions" onClick={onClose}>
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 37 37"
              >
                <g id="actions">
                  <path
                    d={svgPaths.p4aac200}
                    fill="var(--color-icon-fill, #DFDFDF)"
                    id="Union"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full flex-1">
        <div className="basis-0 box-border content-stretch flex flex-col-reverse gap-4 grow items-start justify-start min-h-px min-w-px pb-0 pt-4 px-0 relative self-stretch shrink-0">
          
          {/* Content Area */}
          <div className="order-2 relative shrink-0 w-full flex-1">
            <div className="relative size-full">
              <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start pl-0 pr-4 py-0 relative w-full h-full">
                
                {/* Page Layouts Section */}
                <div className="box-border content-stretch flex flex-col gap-3 items-start justify-start pl-4 pr-0 py-0 relative shrink-0 w-[290px]">
                  <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cfcfcf] text-[12px] text-left text-nowrap">
                    <p className="block leading-[normal] whitespace-pre">Page Layouts</p>
                  </div>
                  
                  {/* Layouts List с прокруткой */}
                  <div className="relative shrink-0 w-full h-[160px]">
                    <div 
                      ref={listContainerRef}
                      className="box-border content-stretch flex flex-col items-start justify-start overflow-y-auto overflow-x-hidden p-0 relative h-full border border-[#141518]"
                    >
                      {layouts.map((layout, index) => (
                        <div key={`layout-wrapper-${layout}-${index}`} className="w-full">
                          <SheetLayoutItem
                            key={`${layout}-${index}`}
                            name={layout}
                            isSelected={selectedLayout === layout}
                            onClick={() => handleLayoutSelect(layout)}
                            hasStars={isLayoutEnclosedInStars(layout)}
                            isInDeleteMode={isDeletingLayout}
                            isDeletingThisItem={isDeletingLayout && deletingLayoutName === layout}
                          />
                          
                          {/* Layout Deleter - появляется строго под удаляемым элементом */}
                          {isDeletingLayout && deletingLayoutName === layout && (
                            <div key={`layout-deleter-${layout}`} className="relative shrink-0 w-full h-[58px]">
                              <LayoutCreator
                                onDelete={handleConfirmDeleteLayout}
                                onCancel={handleCancelDeleteLayout}
                                onBasedOnChange={handleLayoutCreatorBasedOnChange}
                                initialLayoutName={deletingLayoutName}
                                initialBasedOn={layoutCreatorBasedOn}
                                availableLayouts={layouts}
                                className="w-full h-full"
                                mode="delete"
                              />
                            </div>
                          )}
                          
                          {/* Layout Editor - появляется строго под редактируемым элементом */}
                          {isEditingLayout && editingLayoutName === layout && (
                            <div key={`layout-editor-${layout}`} className="relative shrink-0 w-full h-[58px]">
                              <LayoutCreator
                                onApprove={handleApproveEditLayout}
                                onCancel={handleCancelEditLayout}
                                onBasedOnChange={handleLayoutCreatorBasedOnChange}
                                initialLayoutName={editingLayoutName}
                                initialBasedOn={layoutCreatorBasedOn}
                                availableLayouts={layouts}
                                className="w-full h-full"
                                mode="edit"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Layout Creator - появляется внизу списка как инлайн элемент для создания */}
                      {isCreatingLayout && (
                        <div key="layout-creator-inline" className="relative shrink-0 w-full h-[58px]">
                          <LayoutCreator
                            onApprove={handleApproveLayout}
                            onCancel={handleCancelLayout}
                            onBasedOnChange={handleLayoutCreatorBasedOnChange}
                            initialLayoutName="New Layout"
                            initialBasedOn={layoutCreatorBasedOn}
                            availableLayouts={layouts}
                            className="w-full h-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons - ПРАВИЛЬНАЯ ЛОГИКА */}
                  <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-full">
                    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
                      <ButtonIcon 
                        icon="create-layout"
                        onClick={handleAddLayout}
                        variant="default"
                        disabled={!canCreateLayout} // Disabled когда создаем или редактируем layout
                      />
                      <ButtonIcon 
                        icon="import-layout"
                        onClick={handleImportLayout}
                        variant="default"
                        disabled={!canImportLayout} // Disabled когда редактируем layout
                      />
                    </div>
                    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
                      <ButtonIcon 
                        icon="edit-layout"
                        onClick={handleListLayout}
                        variant="default"
                        disabled={!canListLayout} // Disabled если ничего не выбрано
                      />
                      <ButtonIcon 
                        icon={isLayoutActive ? "deactivate" : "activate"}
                        onClick={handleActivateLayout}
                        variant="default"
                        disabled={!canActivate} // Disabled если selectedLayout со звездочками
                      />
                      <ButtonIcon 
                        icon="activate-all-sheets"
                        onClick={handleActivateAllSheets}
                        variant="default"
                        disabled={!canActivateAllSheets} // Disabled если selectedLayout со звездочками
                      />
                      <ButtonIcon 
                        icon="edit"
                        onClick={handleEditLayout}
                        variant="default"
                        disabled={!canEditLayout} // Disabled если selectedLayout со звездочками
                      />
                      <ButtonIcon 
                        icon="delete-layout"
                        onClick={handleDeleteLayout}
                        variant="default"
                        disabled={!canDeleteLayout} // Disabled если selectedLayout со звездочками
                      />
                    </div>
                  </div>

                </div>

                {/* Right Side Panels */}
                <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                  
                  {/* General Section */}
                  <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cfcfcf] text-[12px] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">General</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                      <div className="box-border content-stretch flex flex-row font-['Open_Sans_Hebrew:Regular',_sans-serif] gap-2.5 items-start justify-center leading-[0] not-italic p-0 relative shrink-0 text-[#cfcfcf] text-[12px] text-left w-full">
                        <div className="relative shrink-0 w-[140px]">
                          <p className="block leading-[16px]">Apply page layout to:</p>
                        </div>
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <p className="block leading-[normal]">Sheet1</p>
                        </div>
                      </div>
                      <div className="box-border content-stretch flex flex-row font-['Open_Sans_Hebrew:Regular',_sans-serif] gap-2.5 items-start justify-center leading-[0] not-italic p-0 relative shrink-0 text-[#cfcfcf] text-[12px] text-left w-full">
                        <div className="relative shrink-0 text-nowrap">
                          <p className="block leading-[16px] whitespace-pre">
                            Page layout for current sheet:
                          </p>
                        </div>
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <p className="block leading-[normal]">{currentSheetLayout}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Settings Section */}
                  <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="font-['Open_Sans:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#cfcfcf] text-[12px] text-left text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Settings</p>
                    </div>
                    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                      <div className="box-border content-stretch flex flex-row font-['Open_Sans_Hebrew:Regular',_sans-serif] gap-2.5 items-center justify-center leading-[0] not-italic p-0 relative shrink-0 text-[#cfcfcf] text-[12px] text-left w-full">
                        <div className="relative shrink-0 w-[140px]">
                          <p className="block leading-[normal]">Printer type:</p>
                        </div>
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <p className="block leading-[normal]">PDF</p>
                        </div>
                      </div>
                      <div className="box-border content-stretch flex flex-row font-['Open_Sans_Hebrew:Regular',_sans-serif] gap-2.5 items-center justify-center leading-[0] not-italic p-0 relative shrink-0 text-[#cfcfcf] text-[12px] text-left w-full">
                        <div className="relative shrink-0 w-[140px]">
                          <p className="block leading-[normal]">Paper size:</p>
                        </div>
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <p className="block leading-[normal]">ISO A3 (420.00 x 297.00 MM)</p>
                        </div>
                      </div>
                      <div className="box-border content-stretch flex flex-row font-['Open_Sans_Hebrew:Regular',_sans-serif] gap-2.5 items-center justify-center leading-[0] not-italic p-0 relative shrink-0 text-[#cfcfcf] text-[12px] text-left w-full">
                        <div className="relative shrink-0 w-[140px]">
                          <p className="block leading-[normal]">Orientation:</p>
                        </div>
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                          <p className="block leading-[normal]">Landscape</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="order-1 relative shrink-0 w-full">
            <div className="flex flex-row items-center relative size-full">
              <div className="box-border content-stretch flex flex-row items-center justify-between px-4 py-2 relative w-full">
                
                {/* Checkbox */}
                <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0">
                  <Checkbox
                    checked={showDialogOnCreate}
                    onChange={setShowDialogOnCreate}
                    label="Show dialog box on creation of new sheets"
                  />
                </div>

                {/* Close Button */}
                <ButtonSecondary onClick={onClose}>
                  Close
                </ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}