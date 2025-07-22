/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}" // Включаем корневые файлы если нужно
  ],
  theme: {
    extend: {
      // Кастомные цвета из вашего проекта
      colors: {
        'dialog-bg-dark': '#1e2023',
        'dialog-bg-darker': '#333538',
        'text-light': '#d5d7e1',
        'text-muted': '#cfcfcf',
        'text-secondary': '#8e8f90',
        'border-muted': '#acacac',
        'arrow-bg': '#555555',
        'icon-fill': '#dfdfdf',
        'icon-disabled': '#8e8f90',
        'activate-all-active': '#2160D3',
        'activate-all-hover': '#1a4fb8',
      },
      // Кастомные размеры
      spacing: {
        '0.5': '2px',
        '1.5': '6px',
        '2.5': '10px',
        '7': '28px',
      },
      // Кастомные шрифты
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        'open-sans-hebrew': ['Open Sans Hebrew', 'Open Sans', 'sans-serif'],
      },
      // Кастомные размеры текста
      fontSize: {
        '11px': '11px',
        '12px': '12px',
      },
      // Кастомные z-index
      zIndex: {
        '100': '100',
        '999': '999',
        '9999': '9999',
        '99999': '99999',
      },
      // Кастомные тени
      boxShadow: {
        'dialog': '0px 4px 64px 0px rgba(0,0,0,0.25)',
      }
    },
  },
  plugins: [],
  // Важно для работы с существующими классами
  corePlugins: {
    preflight: false, // Отключаем сброс стилей если мешает
  }
}