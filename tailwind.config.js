/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      flex: {
        hotProducts: 'calc(25% - 24px) 0 0'
      },
      keyframes: {
        cardFadeIn: {
          '0%': {
            opacity: 1
          },
          '10%': {
            opacity: 0
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(-30px)'
          }
        }
      },
      animation: {
        cardFadeInAnimate: 'cardFadeIn 0.5s ease-in-out both'
      }
    }
  },
  plugins: []
};
