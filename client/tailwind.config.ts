import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultConfig');

//Colors
const blue = '#2C73AC';
const error = '#B3261E';
const white = '#FFFFFF';
const lightBlue = '#61B6DB';
const blueCrayola = '#78D6EF';
const deepBlue = '#3879B6';
const green = '#84BB46';
const comet = '#5D647C';
const mobster = '#79747E';
const cerise = '#E23A81';
const caret = '#61B6DB';
const swissCoffee = '#D0CBCB';
const lynch = '#687A95';
const lobLolly = '#BEC6D0';
const spunPearl = '#A8A8AD';

//Gradients
const blueCrayolaToDeepBlue = `linear-gradient(135deg, ${blueCrayola} 0%, ${deepBlue} 100%)`;

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      ...defaultTheme,
      colors: {
        white,
        lightBlue,
        'dark-blue': blue,
        input: {
          text: comet,
          error,
          star: cerise,
          hover: mobster,
          focus: blue,
          caret,
          disabled: swissCoffee,
          info: `${lynch}80`,
        },
        checkbox: {
          'default-border': lynch,
          'disabled-border': swissCoffee,
          'disabled-selected': lobLolly,
          // selected: blueCrayolaToDeepBlue,
          selected: {
            bluecrayola: blueCrayola,
            deepblue: deepBlue,
          },
          'default-text': comet,
          'disabled-text': swissCoffee,
          'link-default': caret,
          'link-disabled': swissCoffee,
          'link-disabled-selected': lobLolly,
          error: error,
          'link-error': error,
          check: spunPearl,
        },
        radio: {
          'default-border': lightBlue,
          'disabled-border': swissCoffee,
        },
        btn: {
          text: white,
          'secondary-text': blue,
          'secondary-hover': green,
          'secondary-hover-text': white,
          'secondary-active': blue,
          'secondary-disabled-text': lobLolly,
          'secondary-disabled-border': swissCoffee,
          'outline-border': white,
          'outline-hover-text': blue,
          'outline-disabled': 'rgba(104, 122, 149, 0.50)',
        },
        navItem: {
          disabled: '#A3AED0',
          hover: white,
          active: '#61B6DB',
        },
      },
      backgroundColor: {
        btn: {
          outline: white,
          secondary: white,
          disabled: '#C2C3C5',
          'outline-active': '#D2E1EF',
        },
        navItem: {
          hover: '#3B91BE',
          active: white,
        },
        boardHeader: '#F4F7FE',
      },
      backgroundImage: {
        burger: 'linear-gradient(315deg, #78D6EF 0%, #3879B6 100%)',
        boardAside: blueCrayolaToDeepBlue,
        'burger-tablet': 'linear-gradient(315deg, #3879B6 0%, #78D6EF 100%)',
        'header-gradient': blueCrayolaToDeepBlue,
        btnPrimaryGradient:
          'linear-gradient(135deg, #78D6EF 0%, #3879B6 40%,#0C6399 65%, #60ADF3 100%)',
        btnActiveGradient: 'linear-gradient(135deg, #0C6399 0%, #0C6399 100%)',
        bgAuthGradient:
          'linear-gradient(90.36deg, #cfedf8 0.31%, #ffffff 25.15%, #FFFFFF 74.85%, #cfeef7 99.69%)',
        bgAuthLinks: 'linear-gradient(135deg, #78D6EF 0%, #3879B6 100%)',
      },
      boxShadow: {
        btn: { inset: 'inset 0px 0px 5px 2px rgba(0,0,0,0.1)' },
        auth: '0px 0px 10px 4px rgba(0, 0, 0, 0.05)',
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
