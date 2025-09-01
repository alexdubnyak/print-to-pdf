#!/bin/bash

echo "🚀 Настройка автоматического деплоя на AWS S3"
echo "==============================================="

# Проверяем AWS CLI
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI не установлен"
    echo "Установите его: https://aws.amazon.com/cli/"
    exit 1
fi

# Проверяем AWS креденшиалы
echo "🔐 Проверяем AWS креденшиалы..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS креденшиалы не настроены"
    echo "Запустите: aws configure"
    echo "Или используйте: aws configure set aws_access_key_id YOUR_KEY"
    exit 1
fi

echo "✅ AWS CLI настроен правильно"

# Получаем список bucket'ов
echo ""
echo "📁 Доступные S3 buckets:"
aws s3 ls | head -10

echo ""
echo "📝 Введите настройки для вашего проекта:"

# Спрашиваем имя проекта  
read -p "Имя проекта (будет использовано как папка в S3): " PROJECT_NAME
if [ -z "$PROJECT_NAME" ]; then
    echo "❌ Имя проекта обязательно"
    exit 1
fi

# Спрашиваем bucket
read -p "Имя S3 bucket: " BUCKET_NAME
if [ -z "$BUCKET_NAME" ]; then
    echo "❌ Имя bucket обязательно"
    exit 1
fi

# Проверяем доступ к bucket
echo "🔍 Проверяем доступ к bucket '$BUCKET_NAME'..."
if ! aws s3 ls "s3://$BUCKET_NAME" &> /dev/null; then
    echo "❌ Нет доступа к bucket '$BUCKET_NAME'"
    echo "Проверьте имя bucket и права доступа"
    exit 1
fi

echo "✅ Доступ к bucket подтвержден"

# Спрашиваем про CloudFront (опционально)
echo ""
read -p "CloudFront Distribution ID (опционально, Enter для пропуска): " CLOUDFRONT_ID

# Определяем BUILD_DIR на основе package.json
BUILD_DIR=""
if [ -f "package.json" ]; then
    # Пытаемся найти outDir в vite.config.js
    if [ -f "vite.config.js" ]; then
        BUILD_DIR=$(grep -o "outDir.*['\"].*['\"]" vite.config.js | sed -n "s/.*['\"]\\(.*\\)['\"].*/\\1/p" | head -1)
    fi
    
    if [ -z "$BUILD_DIR" ]; then
        BUILD_DIR="dist"  # default для Vite
    fi
else
    BUILD_DIR="build"  # default для Create React App
fi

echo ""
echo "📋 Настройки проекта:"
echo "- Имя проекта: $PROJECT_NAME"
echo "- S3 Bucket: $BUCKET_NAME"
echo "- Папка билда: $BUILD_DIR"
if [ ! -z "$CLOUDFRONT_ID" ]; then
    echo "- CloudFront ID: $CLOUDFRONT_ID"
fi

echo ""
read -p "Продолжить настройку? (y/N): " CONFIRM
if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
    echo "❌ Настройка отменена"
    exit 1
fi

echo ""
echo "⚙️  Обновляем файлы проекта..."

# Обновляем deploy.sh
if [ -f "deploy.sh" ]; then
    sed -i.bak "s/BUCKET_NAME=\".*\"/BUCKET_NAME=\"$BUCKET_NAME\"/" deploy.sh
    sed -i.bak "s/S3_PATH=\".*\"/S3_PATH=\"$PROJECT_NAME\"/" deploy.sh
    sed -i.bak "s/BUILD_DIR=\".*\"/BUILD_DIR=\"$BUILD_DIR\"/" deploy.sh
    
    if [ ! -z "$CLOUDFRONT_ID" ]; then
        sed -i.bak "s/CLOUDFRONT_DISTRIBUTION_ID=\".*\"/CLOUDFRONT_DISTRIBUTION_ID=\"$CLOUDFRONT_ID\"/" deploy.sh
    fi
    
    chmod +x deploy.sh
    echo "✅ deploy.sh обновлен"
else
    echo "⚠️  deploy.sh не найден - скопируйте из templates/"
fi

# Обновляем package.json
if [ -f "package.json" ]; then
    # Создаем резервную копию
    cp package.json package.json.bak
    
    # Обновляем scripts
    if grep -q '"deploy"' package.json; then
        sed -i.tmp "s|\"deploy\":.*|\"deploy\": \"./deploy.sh\",|" package.json
    else
        # Добавляем deploy script
        sed -i.tmp 's|"scripts": {|"scripts": {\n    "deploy": "./deploy.sh",|' package.json
    fi
    
    if grep -q '"deploy:aws"' package.json; then
        sed -i.tmp "s|\"deploy:aws\":.*|\"deploy:aws\": \"npm run build \&\& aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME/$PROJECT_NAME/ --delete\"|" package.json
    else
        # Добавляем deploy:aws script  
        sed -i.tmp "s|\"deploy\":.*|&\n    \"deploy:aws\": \"npm run build \&\& aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME/$PROJECT_NAME/ --delete\",|" package.json
    fi
    
    # Добавляем build:s3 если его нет
    if ! grep -q '"build:s3"' package.json; then
        sed -i.tmp "s|\"build\":.*|&\n    \"build:s3\": \"vite build --base=/$PROJECT_NAME/\",|" package.json
    fi
    
    rm -f package.json.tmp
    echo "✅ package.json обновлен"
fi

# Обновляем GitHub Actions
if [ -f ".github/workflows/deploy.yml" ]; then
    sed -i.bak "s|s3://.*|s3://$BUCKET_NAME/$PROJECT_NAME/ --delete|" .github/workflows/deploy.yml
    echo "✅ GitHub Actions обновлен"
else
    echo "⚠️  GitHub Actions не найден - скопируйте из templates/"
fi

# Обновляем .gitignore
if ! grep -q "^$BUILD_DIR$" .gitignore 2>/dev/null; then
    echo "" >> .gitignore
    echo "# Build output" >> .gitignore  
    echo "$BUILD_DIR" >> .gitignore
    echo "✅ .gitignore обновлен"
fi

echo ""
echo "🎉 Настройка завершена!"
echo ""
echo "📋 Что дальше:"
echo "1. Проверьте vite.config.js (base URL должен быть /$PROJECT_NAME/)"
echo "2. Запустите первый деплой: ./deploy.sh"
echo "3. Для автоматического деплоя: npm run deploy:aws"
echo ""
echo "🌐 Ваш сайт будет доступен:"
echo "https://$BUCKET_NAME.s3-website-eu-west-1.amazonaws.com/$PROJECT_NAME/"

# Удаляем временные файлы
rm -f *.bak
