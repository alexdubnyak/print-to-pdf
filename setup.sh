#!/bin/bash

# Print to PDF Dialog - Автоматическая установка
# Этот скрипт автоматически установит все необходимые зависимости и запустит проект

set -e  # Остановка при ошибке

echo "🚀 Запуск автоматической установки Print to PDF Dialog..."

# Проверка наличия Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не найден. Установка Node.js..."
    
    # Определение операционной системы
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        if command -v apt-get &> /dev/null; then
            # Ubuntu/Debian
            echo "📦 Установка Node.js для Ubuntu/Debian..."
            curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
            sudo apt-get install -y nodejs
        elif command -v yum &> /dev/null; then
            # CentOS/RHEL
            echo "📦 Установка Node.js для CentOS/RHEL..."
            sudo yum install -y nodejs npm
        elif command -v dnf &> /dev/null; then
            # Fedora
            echo "📦 Установка Node.js для Fedora..."
            sudo dnf install -y nodejs npm
        else
            echo "❌ Неподдерживаемая версия Linux. Установите Node.js вручную."
            exit 1
        fi
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            echo "📦 Установка Node.js через Homebrew..."
            brew install node
        else
            echo "❌ Homebrew не найден. Установите Node.js вручную с https://nodejs.org/"
            exit 1
        fi
    else
        echo "❌ Неподдерживаемая операционная система. Установите Node.js вручную."
        exit 1
    fi
else
    echo "✅ Node.js уже установлен: $(node --version)"
fi

# Проверка версии Node.js
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Требуется Node.js версии 18 или выше. Текущая версия: $(node --version)"
    echo "Обновите Node.js и запустите скрипт снова."
    exit 1
fi

echo "✅ Node.js версии $(node --version) готов к использованию"

# Проверка наличия npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm не найден. Установите npm вручную."
    exit 1
fi

echo "✅ npm версии $(npm --version) готов к использованию"

# Установка зависимостей
echo "📦 Установка зависимостей проекта..."
npm install

echo "✅ Зависимости установлены успешно!"

# Проверка наличия всех необходимых файлов
if [ ! -f "src/App.tsx" ]; then
    echo "❌ Файл src/App.tsx не найден. Убедитесь, что вы находитесь в корневой папке проекта."
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "❌ Файл package.json не найден. Убедитесь, что вы находитесь в корневой папке проекта."
    exit 1
fi

echo "✅ Все файлы проекта найдены"

# Создание .env файла если его нет
if [ ! -f ".env" ]; then
    echo "📝 Создание .env файла..."
    cat > .env << EOF
# Environment variables for Print to PDF Dialog
NODE_ENV=development
VITE_APP_TITLE=Print to PDF Dialog
EOF
    echo "✅ .env файл создан"
fi

echo ""
echo "🎉 Установка завершена успешно!"
echo ""
echo "Для запуска проекта выполните:"
echo "  npm run dev"
echo ""
echo "Затем откройте браузер и перейдите по адресу:"
echo "  http://localhost:5173"
echo ""
echo "Для остановки сервера нажмите Ctrl+C"
echo ""

# Спрашиваем пользователя, хочет ли он запустить проект сейчас
read -p "Запустить проект сейчас? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Запуск проекта..."
    npm run dev
fi
