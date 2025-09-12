#!/bin/bash

# Конфигурация проекта
BUCKET_NAME="graebert-dev-projects"
S3_PATH="print-to-pdf"
CLOUDFRONT_DISTRIBUTION_ID=""
BUILD_DIR="build"

echo "🚀 Начинаем деплой Print to PDF..."

# Проверяем, что AWS CLI установлен
if ! command -v aws &> /dev/null; then
  echo "❌ AWS CLI не установлен. Пожалуйста, установите его: https://aws.amazon.com/cli/"
  exit 1
fi

# Проверяем, что AWS настроен
if ! aws sts get-caller-identity &> /dev/null; then
  echo "❌ AWS CLI не настроен. Запустите: aws configure"
  exit 1
fi

# Создаем билд
echo "📦 Создаем production билд..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при создании билда"
    exit 1
fi

# Загружаем в S3
echo "☁️  Загружаем файлы в S3..."
aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME/$S3_PATH/ \
    --delete \
    --cache-control "max-age=31536000" \
    --exclude "*.html" \
    --exclude "*.json"

# HTML файлы с коротким кешем
aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME/$S3_PATH/ \
    --exclude "*" \
    --include "*.html" \
    --include "*.json" \
    --cache-control "max-age=300"

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при загрузке в S3"
    exit 1
fi

# Инвалидация CloudFront (опционально)
if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ] && [ "$CLOUDFRONT_DISTRIBUTION_ID" != "YOUR_CLOUDFRONT_ID" ]; then
    echo "🔄 Инвалидируем CloudFront кеш..."
    aws cloudfront create-invalidation \
        --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
        --paths "/*"
else
    echo "⏭️  CloudFront не настроен (опционально)"
fi

echo "✅ Деплой завершен успешно!"
echo "🌐 Ваш сайт доступен по адресу: https://projects.dev.graebert.com/print-to-pdf/"

