# 📐 Development Guidelines - Print to PDF

Руководство по разработке для поддержания высокого качества кода и консистентности проекта.

## 🎯 Принципы разработки

### 1. **Простота и читаемость**
- Код должен быть самодокументируемым
- Предпочитайте явность неявности
- Избегайте чрезмерной вложенности

### 2. **Типобезопасность**
- Используйте TypeScript для всех новых компонентов
- Определяйте интерфейсы для всех props и state
- Избегайте `any` типов

### 3. **Производительность**
- Минимизируйте ненужные перерендеры
- Используйте мемоизацию для тяжелых вычислений
- Оптимизируйте bundle size

### 4. **Доступность**
- Поддерживайте навигацию с клавиатуры
- Используйте семантические HTML элементы
- Обеспечивайте контрастность цветов

## 🏗️ Архитектура проекта

### Структура компонентов
```
src/
├── App.tsx                 # Главный компонент - монолит для простоты
├── components/             # Переиспользуемые компоненты (будущее)
│   ├── ui/                # Базовые UI компоненты
│   ├── forms/             # Компоненты форм
│   └── layout/            # Компоненты макета
├── hooks/                 # Кастомные React хуки
├── types/                 # TypeScript типы и интерфейсы
├── utils/                 # Утилитарные функции
└── styles/               # Стили и темы
```

### Принципы компонентной архитектуры
1. **Единственная ответственность** - один компонент = одна задача
2. **Чистые функции** - предсказуемый результат для одинаковых props
3. **Композиция** вместо наследования
4. **Поднятие состояния** вверх для shared state

## 📝 Стандарты кодирования

### TypeScript
```typescript
// ✅ Правильно
interface SheetProps {
  id: string;
  name: string;
  selected: boolean;
  onSelect: (id: string, selected: boolean) => void;
}

const Sheet: React.FC<SheetProps> = ({ id, name, selected, onSelect }) => {
  return (
    <div className="sheet-item">
      <input 
        type="checkbox"
        checked={selected}
        onChange={(e) => onSelect(id, e.target.checked)}
      />
      <span>{name}</span>
    </div>
  );
};

// ❌ Неправильно
const Sheet = (props: any) => {
  return <div onClick={props.onClick}>{props.children}</div>;
};
```

### React Hooks
```typescript
// ✅ Правильно - кастомный хук для логики
const useSheetSelection = () => {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [selectedCount, setSelectedCount] = useState(0);

  const selectSheet = useCallback((id: string, selected: boolean) => {
    setSheets(prev => prev.map(sheet => 
      sheet.id === id ? { ...sheet, selected } : sheet
    ));
  }, []);

  useEffect(() => {
    setSelectedCount(sheets.filter(sheet => sheet.selected).length);
  }, [sheets]);

  return { sheets, selectedCount, selectSheet };
};

// ❌ Неправильно - вся логика в компоненте
const Component = () => {
  const [sheets, setSheets] = useState([]);
  // 100+ строк логики...
};
```

### Стилизация
```typescript
// ✅ Правильно - использование Tailwind классов
const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => {
  const baseClasses = "px-4 py-2 rounded-lg transition-colors";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-600"
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

// ❌ Неправильно - встроенные стили
const Button = () => (
  <button style={{ backgroundColor: '#3b82f6', padding: '8px 16px' }}>
    Click me
  </button>
);
```

## 🎨 Дизайн-система

### Цветовая палитра
```css
/* Основные цвета */
:root {
  --gray-50: #f9fafb;
  --gray-900: #111827;
  --blue-600: #2563eb;
  --green-600: #059669;
  --red-600: #dc2626;
}
```

### Spacing система (8px base)
```css
/* Используйте кратные 8px значения */
.spacing-xs { margin: 4px; }    /* 0.5 * 8px */
.spacing-sm { margin: 8px; }    /* 1 * 8px */
.spacing-md { margin: 16px; }   /* 2 * 8px */
.spacing-lg { margin: 24px; }   /* 3 * 8px */
.spacing-xl { margin: 32px; }   /* 4 * 8px */
```

### Типография
```css
/* Размеры шрифтов */
.text-xs { font-size: 12px; }
.text-sm { font-size: 14px; }
.text-base { font-size: 16px; }
.text-lg { font-size: 18px; }
.text-xl { font-size: 20px; }
```

## 🔧 Инструменты разработки

### ESLint правила
```json
{
  "extends": [
    "@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### Prettier конфигурация
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

## 🧪 Тестирование

### Структура тестов
```typescript
// Sheet.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Sheet } from './Sheet';

describe('Sheet component', () => {
  const mockProps = {
    id: '1',
    name: 'Test Sheet',
    selected: false,
    onSelect: jest.fn()
  };

  it('renders sheet name', () => {
    render(<Sheet {...mockProps} />);
    expect(screen.getByText('Test Sheet')).toBeInTheDocument();
  });

  it('calls onSelect when checkbox is clicked', () => {
    render(<Sheet {...mockProps} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockProps.onSelect).toHaveBeenCalledWith('1', true);
  });
});
```

### E2E тестирование
```typescript
// cypress/e2e/print-workflow.cy.ts
describe('Print workflow', () => {
  it('should select sheets and show preview', () => {
    cy.visit('/');
    cy.get('[data-testid="sheet-checkbox-1"]').click();
    cy.get('[data-testid="preview-panel"]').should('be.visible');
    cy.get('[data-testid="print-button"]').should('not.be.disabled');
  });
});
```

## 📱 Адаптивный дизайн

### Breakpoints
```css
/* Mobile first подход */
.responsive-layout {
  /* Mobile (до 640px) */
  flex-direction: column;
}

@media (min-width: 640px) {
  /* Tablet */
  .responsive-layout {
    flex-direction: row;
  }
}

@media (min-width: 1024px) {
  /* Desktop */
  .responsive-layout {
    max-width: 1200px;
  }
}
```

### Тестирование на устройствах
```bash
# Chrome DevTools размеры для тестирования
Mobile: 375x667 (iPhone SE)
Tablet: 768x1024 (iPad)
Desktop: 1440x900 (Standard laptop)
Large: 1920x1080 (Full HD)
```

## 🚀 Производительность

### React оптимизации
```typescript
// Мемоизация компонентов
const ExpensiveComponent = memo(({ data }: Props) => {
  return <div>{/* сложный рендеринг */}</div>;
});

// Мемоизация callback'ов
const ParentComponent = () => {
  const handleClick = useCallback((id: string) => {
    // обработчик
  }, []);

  return <Child onClick={handleClick} />;
};

// Мемоизация вычислений
const Component = ({ items }: Props) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
};
```

### Bundle optimization
```typescript
// Ленивая загрузка компонентов
const LazyComponent = lazy(() => import('./HeavyComponent'));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
);
```

## 🔍 Отладка

### React DevTools
```typescript
// Добавление displayName для лучшей отладки
const useSheetSelection = () => {
  // логика хука
};
useSheetSelection.displayName = 'useSheetSelection';

const Sheet = () => {
  // компонент
};
Sheet.displayName = 'Sheet';
```

### Console логирование
```typescript
// Использование debug флагов
const DEBUG = process.env.NODE_ENV === 'development';

const debugLog = (message: string, data?: any) => {
  if (DEBUG) {
    console.log(`🐛 ${message}`, data);
  }
};
```

## 📦 Управление зависимостями

### Принципы добавления зависимостей
1. **Необходимость** - действительно ли нужна библиотека?
2. **Размер** - проверить bundle size impact
3. **Поддержка** - активная разработка и community
4. **Безопасность** - отсутствие известных уязвимостей

### Проверка зависимостей
```bash
# Аудит безопасности
npm audit

# Проверка устаревших пакетов
npm outdated

# Анализ bundle size
npx webpack-bundle-analyzer dist
```

## 🔄 Git workflow

### Naming conventions
```bash
# Ветки
feature/add-drag-drop-sheets
fix/preview-sizing-issue
refactor/split-app-component
docs/update-readme

# Коммиты
feat: add drag and drop for sheet reordering
fix: correct preview aspect ratio calculation
refactor: extract sheet selection logic to custom hook
docs: update setup instructions
```

### PR checklist
- [ ] Код следует style guide
- [ ] Добавлены TypeScript типы
- [ ] Компоненты протестированы
- [ ] Обновлена документация
- [ ] Проверена accessibility
- [ ] Тестирование на мобильных устройствах

## 🎯 Best Practices

### State Management
```typescript
// ✅ Правильно - поднятие state вверх
const App = () => {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  
  return (
    <div>
      <SheetList sheets={sheets} onUpdate={setSheets} />
      <Preview sheets={sheets.filter(s => s.selected)} />
    </div>
  );
};

// ❌ Неправильно - дублирование state
const SheetList = () => {
  const [sheets, setSheets] = useState([]); // дубликат!
  return <div>...</div>;
};
```

### Error Handling
```typescript
// Error Boundary для отлова ошибок
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong!</div>;
    }
    return this.props.children;
  }
}
```

### Accessibility
```typescript
// ARIA labels и роли
const Button = ({ onClick, children, disabled }: Props) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={typeof children === 'string' ? children : undefined}
    role="button"
    tabIndex={disabled ? -1 : 0}
  >
    {children}
  </button>
);
```

## 📚 Ресурсы для изучения

### React
- [React Docs](https://react.dev/) - Официальная документация
- [React Patterns](https://reactpatterns.com/) - Паттерны разработки

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Полное руководство
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) - Шпаргалка

### Performance
- [React DevTools Profiler](https://react.dev/reference/react/Profiler) - Профилирование производительности
- [Web.dev](https://web.dev/) - Оптимизация веб-приложений

---

**💡 Помните:** Эти гайдлайны - живой документ. Обновляйте их по мере развития проекта и появления новых лучших практик!

