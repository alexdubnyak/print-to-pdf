# 📄 Print to PDF - Layout Management System

React приложение для управления макетами печати и экспорта в PDF с поддержкой настроек листов, стилей печати и предварительного просмотра.

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18+ ([скачать](https://nodejs.org/))
- Git ([скачать](https://git-scm.com/))
- Visual Studio Code ([скачать](https://code.visualstudio.com/))

### Установка и запуск

```bash
# 1. Клонируем репозиторий
git clone https://github.com/alexdubnyak/print-to-pdf.git
cd print-to-pdf

# 2. Устанавливаем зависимости
npm install

# 3. Запускаем проект в режиме разработки
npm run dev
```

Приложение будет доступно по адресу: **http://localhost:5173**

## 📁 Структура проекта

```
print-to-pdf/
├── src/
│   ├── App.tsx                 # Главный компонент
│   ├── main.tsx               # Точка входа React
│   ├── components/            # React компоненты
│   ├── imports/               # SVG ассеты и импорты  
│   └── styles/
│       └── globals.css        # Глобальные стили
├── public/
├── .vscode/                   # Настройки VS Code
├── package.json               # Зависимости и скрипты
├── tsconfig.json              # Конфигурация TypeScript
├── vite.config.ts             # Конфигурация Vite
├── tailwind.config.js         # Конфигурация Tailwind CSS
└── index.html                 # HTML шаблон
```

## 🛠️ Доступные скрипты

```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для продакшена  
npm run preview      # Превью продакшен сборки
npm run type-check   # Проверка типов TypeScript
npm run lint         # Линтинг кода
npm run format       # Форматирование кода
```

## 🎯 Основные функции

- ✅ Выбор и предварительный просмотр листов
- ✅ Управление макетами печати
- ✅ Настройка стилей печати
- ✅ Редактор макетов с настройками
- ✅ Активация всех листов одним кликом
- ✅ Навигация между листами
- ✅ Поиск по листам
- ✅ Экспорт в PDF

## 🏗️ Технологический стек

- **React 18** - современная библиотека UI
- **TypeScript** - типизация для надежности
- **Vite** - быстрый сборщик и dev-server
- **Tailwind CSS** - утилитарные стили
- **PostCSS** - обработка CSS

## 🎨 Особенности дизайна

- Темная тема в стиле современных CAD приложений
- Точное воспроизведение Figma дизайна
- Поддержка кастомных шрифтов Open Sans
- Адаптивные компоненты с Tailwind CSS
- Анимации и переходы

## 🔧 Рекомендуемые расширения VS Code

При открытии проекта VS Code автоматически предложит установить:

- **ES7+ React/Redux/React-Native snippets**
- **TypeScript Importer** 
- **Tailwind CSS IntelliSense**
- **Auto Rename Tag**
- **Prettier - Code formatter**
- **ESLint**

## 🚨 Известные ограничения

### Figma Assets
В текущей версии Figma assets заменены на заглушки. Для полной функциональности:
1. Замените `PLACEHOLDER_SHEET_IMAGE` и `PLACEHOLDER_BACKGROUND` на реальные изображения
2. Добавьте изображения в папку `public/`
3. Обновите пути в `src/App.tsx`

### SVG импорты
Убедитесь что все SVG файлы в `src/imports/` экспортируют корректные объекты:
```typescript
export default {
  p4aac200: "M10 10 L20 20 M20 10 L10 20" // SVG path
};
```

## 🔄 Разработка

### Добавление новых компонентов
1. Создайте файл в `src/components/`
2. Следуйте существующим паттернам
3. Используйте TypeScript интерфейсы
4. Добавьте соответствующие стили

### Кастомизация стилей
Основные цвета в `tailwind.config.js`:
```javascript
colors: {
  'dialog-bg-dark': '#1e2023',
  'dialog-bg-darker': '#333538',
  'text-light': '#d5d7e1',
  // ...
}
```

## 🐛 Устранение проблем

### Ошибки установки
```bash
# Очистка кеша
rm -rf node_modules package-lock.json
npm install
```

### Проблемы с портами
Если порт 5173 занят, Vite автоматически найдет свободный или:
```bash
npm run dev -- --port 3000
```

### TypeScript ошибки
Проверьте что все импорты корректны:
```bash
npm run type-check
```

## 📱 Основные компоненты

- **PrintToPdf** - Главный диалог печати
- **LayoutCreator** - Создание и редактирование макетов
- **PrintStylesSection** - Выбор стилей печати
- **PageLayoutManager** - Управление макетами страниц
- **SheetPreview** - Предварительный просмотр листов
- **CollapsibleSection** - Сворачиваемые секции настроек

## 🌐 Развертывание

### Локальная сборка
```bash
npm run build
npm run preview
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Загрузить папку dist на Netlify
```

## 📞 Поддержка

- **Автор**: Alex Dubnyak (alexey.dubnyak@graebert.com)
- **Репозиторий**: [GitHub](https://github.com/alexdubnyak/print-to-pdf)
- **Вопросы**: Создавайте Issues в GitHub

## 📄 Лицензия

MIT License - свободное использование с указанием авторства.

---

**Готово к разработке! 🚀**

После клонирования выполните `npm install && npm run dev` для запуска проекта.