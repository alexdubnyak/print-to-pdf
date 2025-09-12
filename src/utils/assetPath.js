/**
 * Получает правильный путь к статическому ресурсу
 * Автоматически учитывает разные окружения (development/production)
 * 
 * @param {string} path - Путь к ресурсу относительно public/ папки
 * @returns {string} Корректный URL для текущего окружения
 * 
 * @example
 * // В development: /assets/icon.svg
 * // В production: /your-project-name/assets/icon.svg
 * assetPath("/assets/icon.svg")
 * 
 * @example
 * // Использование в компонентах:
 * <img src={assetPath("/assets/logo.png")} alt="Logo" />
 */
export const assetPath = (path) => {
  // Убираем ведущий слеш если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // В development возвращаем как есть (Vite dev server обрабатывает автоматически)
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // В production учитываем базовый URL (настроенный в vite.config.js)
  const base = import.meta.env.BASE_URL;
  return `${base}${cleanPath}`;
};
