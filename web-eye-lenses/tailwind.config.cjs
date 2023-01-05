/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      white: colors.white,
      'primary': '#4e83f5',
      'primary-mid-dark': '#2563EB',
      'primary-dark': '#0F48C2',
      'full-black': '#121212',
      'mid-black': '#1E1E1F',
      'low-black': '#282829',
      'full-white': '#FAFAFA',
      'mid-white': 'rgb(255, 255, 255, .60)',
      'low-white': 'rgb(255, 255, 255, .38)',
      'extra-low-white': 'rgb(255, 255, 255, .12)',
      'black': '#222222',
      'error': '#FF5252',
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
