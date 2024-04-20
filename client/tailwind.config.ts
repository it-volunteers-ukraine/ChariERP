import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultConfig');

const blue = '#2C73AC';
const white = '#FFFFFF';

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
        white: white,
        'dark-blue': blue,
        btn: {
          text: white,
          'secondary-text': blue,
          'secondary-hover': '#84BB46',
          'secondary-hover-text': white,
          'secondary-active': blue,
          'secondary-disabled-text': '#BEC6D0',
          'secondary-disabled-border': '#D0CBCB',
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
        burger: ' linear-gradient(315deg, #78D6EF 0%, #3879B6 100%)',
        'burger-tablet': 'linear-gradient(315deg, #3879B6 0%, #78D6EF 100%)',
        'header-gradient': 'linear-gradient(135deg, #78D6EF 0%, #3879B6 100%)',
        btn: {
          primary:
            'linear-gradient(135deg, #78D6EF 0%, #3879B6 40%,#0C6399 65%, #60ADF3 100%)',
          active: 'linear-gradient(135deg, #0C6399 0%, #0C6399 100%)',
        },
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
      screens: {
        //  @media (min-width: 768px)
        tablet: '768px',
        //  @media (min-width: 992px)
        laptop: '992px',
        //  @media (min-width: 1440px)
        desktop: '1440px',
        //  @media (min-width: 1919px)
        desktopXl: '1919px',
      },
      dropShadow: {
        logo: [
          '4px 2px 2px rgba(0, 0, 0, 0.25)',
          '-4px -2px 3px rgba(0, 0, 0, 0.15)',
        ],
      },
      transitionProperty: {
        rounded: 'border-radius',
      },
    },
  },
  plugins: [],
};
export default config;
