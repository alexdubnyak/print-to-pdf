# Версии и зависимости

## Системные требования

### Node.js

- **Минимальная версия**: 18.0.0
- **Рекомендуемая версия**: 18.x LTS или 20.x LTS
- **Скачать**: https://nodejs.org/

### npm

- **Минимальная версия**: 8.0.0
- **Рекомендуемая версия**: 9.x или выше

### Браузеры

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Основные зависимости

### React

- **Версия**: 18.3.1
- **Назначение**: Основной фреймворк

### TypeScript

- **Версия**: 5.x (через Vite)
- **Назначение**: Типизация

### Vite

- **Версия**: 5.4.19
- **Назначение**: Сборщик и dev-сервер

### Tailwind CSS

- **Версия**: 3.x
- **Назначение**: Стилизация

### Radix UI

- **Версии**: 1.x - 2.x
- **Назначение**: UI компоненты

## Полный список зависимостей

### Production

```json
{
  "@radix-ui/react-accordion": "^1.2.3",
  "@radix-ui/react-alert-dialog": "^1.1.6",
  "@radix-ui/react-aspect-ratio": "^1.1.2",
  "@radix-ui/react-avatar": "^1.1.3",
  "@radix-ui/react-checkbox": "^1.1.4",
  "@radix-ui/react-collapsible": "^1.1.3",
  "@radix-ui/react-context-menu": "^2.2.6",
  "@radix-ui/react-dialog": "^1.1.6",
  "@radix-ui/react-dropdown-menu": "^2.1.6",
  "@radix-ui/react-hover-card": "^1.1.6",
  "@radix-ui/react-label": "^2.1.2",
  "@radix-ui/react-menubar": "^1.1.6",
  "@radix-ui/react-navigation-menu": "^1.2.5",
  "@radix-ui/react-popover": "^1.1.6",
  "@radix-ui/react-progress": "^1.1.2",
  "@radix-ui/react-radio-group": "^1.2.3",
  "@radix-ui/react-scroll-area": "^1.2.3",
  "@radix-ui/react-select": "^2.1.6",
  "@radix-ui/react-separator": "^1.1.2",
  "@radix-ui/react-slider": "^1.2.3",
  "@radix-ui/react-slot": "^1.1.2",
  "@radix-ui/react-switch": "^1.1.3",
  "@radix-ui/react-tabs": "^1.1.3",
  "@radix-ui/react-toggle": "^1.1.2",
  "@radix-ui/react-toggle-group": "^1.1.2",
  "@radix-ui/react-tooltip": "^1.1.8",
  "class-variance-authority": "^0.7.1",
  "clsx": "*",
  "cmdk": "^1.1.1",
  "embla-carousel-react": "^8.6.0",
  "input-otp": "^1.4.2",
  "lucide-react": "^0.487.0",
  "next-themes": "^0.4.6",
  "react": "^18.3.1",
  "react-day-picker": "^8.10.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.55.0",
  "react-resizable-panels": "^2.1.7",
  "recharts": "^2.15.2",
  "sonner": "^2.0.3",
  "tailwind-merge": "*",
  "vaul": "^1.1.2"
}
```

### Development

```json
{
  "@types/node": "^20.10.0",
  "@vitejs/plugin-react-swc": "^3.10.2",
  "vite": "^5.4.19"
}
```

## Обновление зависимостей

### Проверка устаревших пакетов

```bash
npm outdated
```

### Обновление всех зависимостей

```bash
npm update
```

### Обновление до последних версий

```bash
npx npm-check-updates -u
npm install
```

## Совместимость

### Node.js версии

- ✅ 18.x LTS
- ✅ 20.x LTS
- ❌ 16.x (не поддерживается)
- ❌ 14.x (не поддерживается)

### Операционные системы

- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Ubuntu 18.04+
- ✅ CentOS 7+
- ✅ Fedora 30+

## Безопасность

### Проверка уязвимостей

```bash
npm audit
```

### Исправление уязвимостей

```bash
npm audit fix
```

### Принудительное исправление

```bash
npm audit fix --force
```

## Производительность

### Размер бандла

- **Development**: ~50MB
- **Production**: ~2MB (gzipped)

### Время сборки

- **Development**: ~2-3 секунды
- **Production**: ~10-15 секунд

### Время загрузки

- **First Load**: ~1-2 секунды
- **Subsequent Loads**: ~200-500ms
