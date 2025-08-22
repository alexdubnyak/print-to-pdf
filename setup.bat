@echo off
setlocal enabledelayedexpansion

echo 🚀 Запуск автоматической установки Print to PDF Dialog...

REM Проверка наличия Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js не найден.
    echo.
    echo Пожалуйста, установите Node.js вручную:
    echo 1. Перейдите на https://nodejs.org/
    echo 2. Скачайте LTS версию
    echo 3. Запустите установщик
    echo 4. Перезапустите командную строку
    echo 5. Запустите этот скрипт снова
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js найден: 
node --version

REM Проверка версии Node.js
for /f "tokens=1,2 delims=." %%a in ('node --version') do set NODE_VERSION=%%a
set NODE_VERSION=%NODE_VERSION:~1%
if %NODE_VERSION% LSS 18 (
    echo ❌ Требуется Node.js версии 18 или выше. Текущая версия: 
    node --version
    echo Обновите Node.js и запустите скрипт снова.
    pause
    exit /b 1
)

REM Проверка наличия npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm не найден. Установите npm вручную.
    pause
    exit /b 1
)

echo ✅ npm версии 
npm --version

REM Установка зависимостей
echo 📦 Установка зависимостей проекта...
npm install

if %errorlevel% neq 0 (
    echo ❌ Ошибка при установке зависимостей.
    pause
    exit /b 1
)

echo ✅ Зависимости установлены успешно!

REM Проверка наличия всех необходимых файлов
if not exist "src\App.tsx" (
    echo ❌ Файл src\App.tsx не найден. Убедитесь, что вы находитесь в корневой папке проекта.
    pause
    exit /b 1
)

if not exist "package.json" (
    echo ❌ Файл package.json не найден. Убедитесь, что вы находитесь в корневой папке проекта.
    pause
    exit /b 1
)

echo ✅ Все файлы проекта найдены

REM Создание .env файла если его нет
if not exist ".env" (
    echo 📝 Создание .env файла...
    (
        echo # Environment variables for Print to PDF Dialog
        echo NODE_ENV=development
        echo VITE_APP_TITLE=Print to PDF Dialog
    ) > .env
    echo ✅ .env файл создан
)

echo.
echo 🎉 Установка завершена успешно!
echo.
echo Для запуска проекта выполните:
echo   npm run dev
echo.
echo Затем откройте браузер и перейдите по адресу:
echo   http://localhost:5173
echo.
echo Для остановки сервера нажмите Ctrl+C
echo.

REM Спрашиваем пользователя, хочет ли он запустить проект сейчас
set /p "RUN_NOW=Запустить проект сейчас? (y/n): "
if /i "%RUN_NOW%"=="y" (
    echo 🚀 Запуск проекта...
    npm run dev
)

pause
