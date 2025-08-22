# Инструкции по установке

## Windows

### 1. Установка Node.js

1. Скачайте Node.js с официального сайта: https://nodejs.org/
2. Выберите LTS версию (рекомендуется)
3. Запустите установщик и следуйте инструкциям
4. Проверьте установку:
   ```cmd
   node --version
   npm --version
   ```

### 2. Клонирование проекта

```cmd
git clone <repository-url>
cd print-to-pdf
```

### 3. Установка зависимостей

```cmd
npm install
```

### 4. Запуск проекта

```cmd
npm run dev
```

## macOS

### 1. Установка Node.js

#### Через Homebrew (рекомендуется):

```bash
# Установка Homebrew (если не установлен)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Установка Node.js
brew install node
```

#### Через официальный установщик:

1. Скачайте с https://nodejs.org/
2. Установите через .pkg файл

### 2. Клонирование проекта

```bash
git clone <repository-url>
cd print-to-pdf
```

### 3. Установка зависимостей

```bash
npm install
```

### 4. Запуск проекта

```bash
npm run dev
```

## Linux (Ubuntu/Debian)

### 1. Установка Node.js

```bash
# Обновление пакетов
sudo apt update

# Установка curl (если не установлен)
sudo apt install curl

# Установка Node.js через NodeSource
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверка установки
node --version
npm --version
```

### 2. Клонирование проекта

```bash
git clone <repository-url>
cd print-to-pdf
```

### 3. Установка зависимостей

```bash
npm install
```

### 4. Запуск проекта

```bash
npm run dev
```

## Linux (CentOS/RHEL/Fedora)

### 1. Установка Node.js

```bash
# CentOS/RHEL
sudo yum install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

### 2. Клонирование проекта

```bash
git clone <repository-url>
cd print-to-pdf
```

### 3. Установка зависимостей

```bash
npm install
```

### 4. Запуск проекта

```bash
npm run dev
```

## Альтернативные менеджеры пакетов

### Yarn

```bash
# Установка Yarn
npm install -g yarn

# Установка зависимостей
yarn install

# Запуск проекта
yarn dev
```

### pnpm

```bash
# Установка pnpm
npm install -g pnpm

# Установка зависимостей
pnpm install

# Запуск проекта
pnpm dev
```

## Проверка установки

После установки откройте браузер и перейдите по адресу:

```
http://localhost:5173
```

Вы должны увидеть интерфейс Print to PDF Dialog.

## Устранение проблем

### Ошибка "command not found: node"

- Убедитесь, что Node.js установлен
- Перезапустите терминал
- Проверьте переменную PATH

### Ошибка "EACCES: permission denied"

```bash
# На Linux/macOS
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

### Ошибка "Port 5173 is already in use"

- Закройте другие процессы на этом порту
- Или используйте другой порт:
  ```bash
  npm run dev -- --port 3000
  ```

### Проблемы с зависимостями

```bash
# Очистка кэша
npm cache clean --force

# Удаление node_modules и переустановка
rm -rf node_modules package-lock.json
npm install
```

## Требования к системе

- **Node.js**: 18.x или выше
- **npm**: 8.x или выше
- **RAM**: минимум 4GB (рекомендуется 8GB)
- **Дисковое пространство**: минимум 1GB свободного места
- **Браузер**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
