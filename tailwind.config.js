/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        primary: colors.blue,
        gray: colors.gray,
        // lightBlack: '#34757b',
        // blackDark: '#43969e',
        lightBlack: '#2f2f2f',
        blackDark: '#252525',
        greenColor: '#5F9EA0',
        // designColor: '#0093d4',
        designColor: '#2563eb',
        // red: '#5F9EA0',
        lightGreen: '#f5f6fb', //this is for backend color need to change name
        darkGreen: '#fff',
        titleColorLM: '#000',
        txt: '#494949',
        txtWhite: '#fff',
        txtlightGrey: '#f5f5f5',
        subTitleLM: '#252525',
        descLM: '#252525',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
              font: 'Haffer, sans-serif',
            },
          },
        },
      }),
    },
  },
  plugins: [],
}

