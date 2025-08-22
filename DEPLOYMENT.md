# Развертывание проекта

## Подготовка к передаче

### 1. Создание архива проекта

```bash
# Исключить node_modules и другие ненужные файлы
zip -r print-to-pdf-project.zip . -x "node_modules/*" ".git/*" "dist/*" ".vite/*"
```

### 2. Альтернативный способ (через tar)

```bash
tar --exclude='node_modules' --exclude='.git' --exclude='dist' --exclude='.vite' -czf print-to-pdf-project.tar.gz .
```

## Передача проекта

### Вариант 1: Git репозиторий

```bash
# Создать новый репозиторий
git init
git add .
git commit -m "Initial commit: Print to PDF Dialog Interface"
git remote add origin <repository-url>
git push -u origin main
```

### Вариант 2: Архив файлов

1. Создайте архив проекта (см. выше)
2. Передайте архив получателю
3. Получатель распаковывает и запускает установку

### Вариант 3: Облачное хранилище

- Google Drive
- Dropbox
- OneDrive
- GitHub Releases

## Инструкции для получателя

### Автоматическая установка

#### Windows

1. Распакуйте архив
2. Дважды кликните на `setup.bat`
3. Следуйте инструкциям

#### macOS/Linux

```bash
# Распакуйте архив
unzip print-to-pdf-project.zip
cd print-to-pdf

# Сделайте скрипт исполняемым и запустите
chmod +x setup.sh
./setup.sh
```

### Ручная установка

#### 1. Установите Node.js

- Скачайте с [nodejs.org](https://nodejs.org/)
- Версия 18 или выше

#### 2. Распакуйте проект

```bash
unzip print-to-pdf-project.zip
cd print-to-pdf
```

#### 3. Установите зависимости

```bash
npm install
```

#### 4. Запустите проект

```bash
npm run dev
```

#### 5. Откройте браузер

```
http://localhost:5173
```

## Проверка установки

### Тест функциональности

1. ✅ Открывается главная страница
2. ✅ Работает Print to PDF dialog
3. ✅ Переключение между Quick Print и Advanced
4. ✅ Sheets Manager открывается
5. ✅ Page Layout Manager работает
6. ✅ Bottom toolbar функционирует

### Проверка консоли

```bash
# Проверка версий
node --version  # Должно быть 18+
npm --version   # Должно быть 8+

# Проверка зависимостей
npm list --depth=0
```

## Устранение проблем при развертывании

### Проблема: "Module not found"

```bash
# Переустановка зависимостей
rm -rf node_modules package-lock.json
npm install
```

### Проблема: "Port already in use"

```bash
# Использование другого порта
npm run dev -- --port 3000
```

### Проблема: "Permission denied" (Linux/macOS)

```bash
# Исправление прав доступа
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

### Проблема: "Node.js not found" (Windows)

1. Переустановите Node.js
2. Перезапустите командную строку
3. Проверьте переменную PATH

## Создание продакшн сборки

### Локальная сборка

```bash
npm run build
```

### Проверка сборки

```bash
# Установка serve для тестирования
npm install -g serve

# Запуск продакшн версии
serve dist
```

### Размещение на хостинге

1. Соберите проект: `npm run build`
2. Загрузите содержимое папки `dist/` на хостинг
3. Настройте сервер для SPA (Single Page Application)

## Рекомендации по передаче

### Включить в архив

- ✅ Все исходные файлы
- ✅ package.json
- ✅ README.md
- ✅ INSTALL.md
- ✅ QUICK_START.md
- ✅ setup.sh и setup.bat
- ✅ .gitignore

### Исключить из архива

- ❌ node_modules/
- ❌ .git/
- ❌ dist/
- ❌ .vite/
- ❌ .env (если содержит секреты)

### Дополнительные файлы

- 📋 Список изменений (CHANGELOG.md)
- 📋 Лицензия (LICENSE)
- 📋 Контакты разработчика

## Поддержка

### Документация

- [README.md](README.md) - Основная документация
- [INSTALL.md](INSTALL.md) - Инструкции по установке
- [QUICK_START.md](QUICK_START.md) - Быстрый старт
- [VERSIONS.md](VERSIONS.md) - Версии и зависимости

### Контакты

- Создайте issue в репозитории
- Опишите проблему подробно
- Приложите скриншоты если необходимо
