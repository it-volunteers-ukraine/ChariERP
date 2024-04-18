import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultConfig');

const blue = '#2C73AC';
const error = '#B3261E';
const white = '#FFFFFF';
const green = '#84BB46';
const comet = '#5D647C';
const mobster = '#79747E';
const cerise = '#E23A81';
const caret = '#61B6DB';
const swissCoffee = '#D0CBCB';

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
        white,
        'dark-blue': blue,
        input: {
          text: comet,
          error,
          star: cerise,
          hover: mobster,
          focus: blue,
          caret,
          disabled: swissCoffee,
          info: '#687A9580',
        },
        btn: {
          text: white,
          'secondary-text': blue,
          'secondary-hover': green,
          'secondary-hover-text': white,
          'secondary-active': blue,
          'secondary-disabled-text': '#BEC6D0',
          'secondary-disabled-border': swissCoffee,
          'outline-border': white,
          'outline-hover-text': blue,
          'outline-disabled': 'rgba(104, 122, 149, 0.50)',
        },
      },
      backgroundColor: {
        btn: {
          outline: white,
          secondary: white,
          disabled: '#C2C3C5',
          'outline-active': '#D2E1EF',
        },
      },
      backgroundImage: {
        btn: {
          primary:
            'linear-gradient(135deg, #78D6EF 0%, #3879B6 40%,#0C6399 65%, #60ADF3 100%)',
          active: 'linear-gradient(135deg, #0C6399 0%, #0C6399 100%)',
        },
      },
      boxShadow: {
        btn: { inset: 'inset 0px 0px 5px 2px rgba(0,0,0,0.1)' },
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
