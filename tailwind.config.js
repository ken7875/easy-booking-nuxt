/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
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
      borderWidth: {
        DEFAULT: '1px'
      },
      colors: {
        primary: 'rgb(239 68 68)'
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
        },
        changeBgMode: {
          '0%': {
            backgroundColor: '#FFFFFF'
          },
          '100%': {
            backgroundColor: '#000000'
          }
        }
      },
      animation: {
        cardFadeInAnimate: 'cardFadeIn 0.5s ease-in-out both',
        changeBgMode: 'changeBgMode 0.5s'
      }
    },
    perspectiveLevel: {
      1: '100px',
      2: '200px',
      3: '300px',
      4: '400px',
      5: '500px',
      6: '600px',
      7: '700px',
      8: '800px',
      9: '900px',
      10: '1000px',
      20: '2000px'
    }
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'translate-z': (value) => ({
            '--tw-translate-z': value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`
          }) // this is actual CSS
        },
        { values: theme('translate'), supportsNegativeValues: true }
      );
      // perspective
      matchUtilities(
        {
          perspective: (value) => ({
            perspective: value
          })
        },
        { values: theme('perspectiveLevel') }
      );
    })
  ]
};
