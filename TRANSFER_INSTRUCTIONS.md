# 📦 Инструкции по передаче проекта

## 🎯 Цель

Сделать проект **Print to PDF Dialog** максимально простым для установки и
запуска на любом компьютере.

## ✅ Что уже готово

### 📚 Документация

- **[README.md](README.md)** - Полная документация проекта
- **[QUICK_START.md](QUICK_START.md)** - Быстрый старт за 5 минут
- **[INSTALL.md](INSTALL.md)** - Подробные инструкции для всех ОС
- **[VERSIONS.md](VERSIONS.md)** - Версии зависимостей
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Развертывание проекта
- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Обзор проекта

### 🔧 Автоматические скрипты

- **[setup.sh](setup.sh)** - Автоустановка для macOS/Linux
- **[setup.bat](setup.bat)** - Автоустановка для Windows

### ⚙️ Конфигурация

- **[.gitignore](.gitignore)** - Исключения для Git
- **[package.json](package.json)** - Зависимости и скрипты
- **[vite.config.ts](vite.config.ts)** - Конфигурация сборщика

## 🚀 Способы передачи проекта

### Вариант 1: Git репозиторий (рекомендуется)

```bash
# Создать репозиторий на GitHub/GitLab
# Клонировать на целевой компьютер
git clone <repository-url>
cd print-to-pdf
```

### Вариант 2: Архив файлов

```bash
# Создать архив (исключить ненужные файлы)
zip -r print-to-pdf-project.zip . -x "node_modules/*" ".git/*" "dist/*" ".vite/*"

# Или через tar
tar --exclude='node_modules' --exclude='.git' --exclude='dist' --exclude='.vite' -czf print-to-pdf-project.tar.gz .
```

### Вариант 3: Облачное хранилище

- Google Drive
- Dropbox
- OneDrive
- GitHub Releases

## 📋 Инструкции для получателя

### 🎯 Простой способ (автоматическая установка)

#### Windows

1. Распакуйте архив
2. **Дважды кликните на `setup.bat`**
3. Следуйте инструкциям на экране
4. Проект запустится автоматически

#### macOS/Linux

```bash
# Распакуйте архив
unzip print-to-pdf-project.zip
cd print-to-pdf

# Запустите автоустановку
chmod +x setup.sh
./setup.sh
```

### 🔧 Ручной способ

#### 1. Установите Node.js

- Скачайте с [nodejs.org](https://nodejs.org/)
- **Версия 18 или выше**
- Перезапустите терминал после установки

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

## ✅ Проверка установки

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

## 🐛 Устранение проблем

### Частые проблемы и решения

#### "Node.js не найден"

- Установите Node.js с [nodejs.org](https://nodejs.org/)
- Перезапустите терминал
- Проверьте переменную PATH

#### "Порт 5173 уже используется"

```bash
npm run dev -- --port 3000
```

#### "Permission denied" (Linux/macOS)

```bash
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

#### "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Поддержка

### Документация

- **[README.md](README.md)** - Основная документация
- **[INSTALL.md](INSTALL.md)** - Инструкции по установке
- **[QUICK_START.md](QUICK_START.md)** - Быстрый старт

### Создание issue

1. Опишите проблему подробно
2. Укажите операционную систему
3. Приложите скриншоты
4. Укажите версии Node.js и npm

## 🎉 Готово!

Теперь проект готов к передаче и может быть легко установлен на любом компьютере
с минимальными усилиями.

### Ключевые преимущества:

- ✅ **Автоматическая установка** через скрипты
- ✅ **Подробная документация** для всех случаев
- ✅ **Поддержка всех ОС** (Windows, macOS, Linux)
- ✅ **Проверка зависимостей** и версий
- ✅ **Устранение проблем** с пошаговыми инструкциями

### Время установки:

- **Автоматическая**: 2-5 минут
- **Ручная**: 5-10 минут
- **При проблемах**: 10-20 минут
