import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultConfig');

const blue = '#2C73AC';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      ...defaultTheme,
      colors: {
        white: '#FFFFFF',
        btn: {},
        'dark-blue': blue,
        'btn-text': '#FFFFFF',
        'btn-secondary-text': '#2C73AC',
        'btn-secondary-hover': '#84BB46',
        'btn-secondary-hover-text': '#FFFFFF',
        'btn-secondary-active': '#2C73AC',
        'btn-secondary-disabled-text': '#BEC6D0',
        'btn-secondary-disabled-border': '#D0CBCB',
        'btn-outline-border': '#FFFFFF',
        'btn-outline-hover-text': '#2C73AC',
        'btn-outline-disabled': 'rgba(104, 122, 149, 0.50)',
      },
      backgroundColor: {
        'btn-outline': '#FFFFFF',
        'btn-secondary': '#FFFFFF',
        'btn-disabled': '#C2C3C5',
        'btn-outline-active': '#D2E1EF',
      },
      backgroundImage: {
        'btn-primary':
          'linear-gradient(135deg, #78D6EF 0%, #3879B6 40%,#0C6399 65%, #60ADF3 100%)',
        'btn-active': 'linear-gradient(135deg, #0C6399 0%, #0C6399 100%)',
      },
      boxShadow: {
        'btn-inset': 'inset 0px 0px 5px 2px rgba(0,0,0,0.1)',
      },
      backgroundSize: {
        200: '201%',
      },
      borderRadius: {
        50: '50px',
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        scada: ['var(--font-scada)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
