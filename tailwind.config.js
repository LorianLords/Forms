/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/components/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Добавляем шрифт Roboto
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      borderWidth: {
        6: '6px', // Добавляем новую ширину границы
      },
      colors: {
        // Добавьте свой кастомный цвет здесь
        'custom-green': '#c8ff3c', // Замените на ваш желаемый цвет
      },
      screens: {
        xs: '475px', // определяем кастомный медиаразмер для экрана 475px
      },
    },
  },
  plugins: [],
};
