import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/print-to-pdf/' : '/',
  publicDir: 'public',
  build: {
    outDir: 'build', // Используем существующую папку билда
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          // Сохраняем оригинальные пути для SVG иконок
          if (assetInfo.name && assetInfo.name.endsWith('.svg')) {
            return 'assets/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  // Обрабатываем ресурсы из public папки корректно
  assetsInclude: ['**/*.svg']
}))
