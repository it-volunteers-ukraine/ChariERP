import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultConfig');

import { media } from './src/constants';

//Colors
const blue = '#2C73AC';
const error = '#B3261E';
const white = '#FFFFFF';
const whiteSecond = '#F4F7FE';
const lightBlue = '#61B6DB';
const blueCrayola = '#78D6EF';
const deepBlue = '#3879B6';
const disabled = '#C2C3C5';
const green = '#84BB46';
const greenNormal = '#5BC780';
const greenHover = '#34AB5D';
const greenActive = '#178D40';
const red = '#DD6B64';
const redHover = '#C83C34';
const redActive = '#B3261E';
const comet = '#5D647C';
const mobster = '#79747E';
const cerise = '#E23A81';
const caret = '#61B6DB';
const swissCoffee = '#D0CBCB';
const lynch = '#687A95';
const lobLolly = '#BEC6D0';
const spunPearl = '#A8A8AD';
const liteGray = '#A3A3A3';
const dimGray = '#656575B2';
const steelBlue = '#3B91BE';
const Magnolia = '#5D647CB2';
const superBlue = '#DFF0F8';
const midGray = '#656575';
const darkGray = '#49454F';
const arcticSky = '#D0DDEC';
const amethyst = '#A86CCC';
const emeraldGreen = '#40BC6A';

//Gradients
const blueCrayolaToDeepBlue = `linear-gradient(135deg, ${blueCrayola} 0%, ${deepBlue} 100%)`;

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      ...defaultTheme,

      colors: {
        white,
        whiteSecond,
        lightBlue,
        disabled,
        darkGray,
        dimGray,
        mobster,
        midGray,
        emeraldGreen,
        superBlue,
        steelBlue,
        arcticSky,
        'dark-blue': blue,
        error,
        green,
        purple: amethyst,
        greenNormal,
        title: {
          title: caret,
          media: Magnolia,
        },
        pagination: {
          color: Magnolia,
        },
        input: {
          text: comet,
          error,
          star: cerise,
          hover: mobster,
          focus: blue,
          caret,
          disabled: swissCoffee,
          info: `${lynch}80`,
          liteGray,
          infoDefault: lynch,
          link: lightBlue,
        },
        checkbox: {
          'default-border': lynch,
          'disabled-border': swissCoffee,
          'disabled-selected-bg': lobLolly,
          'default-text': comet,
          'disabled-text': swissCoffee,
          'disabled-selected-text': lobLolly,
          'link-default': caret,
          'link-disabled': swissCoffee,
          'link-disabled-selected': lobLolly,
          'disabled-check': spunPearl,
        },
        radio: {
          'default-border': lightBlue,
          'disabled-border': swissCoffee,
          error,
        },
        btn: {
          text: white,
          steelBlue,
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
          active: lightBlue,
        },
      },
      backgroundColor: {
        btn: {
          disabled,
          outline: white,
          secondary: white,
          'outline-active': '#D2E1EF',
          green: greenNormal,
          'green-hover': greenHover,
          'green-active': greenActive,
          red: red,
          'red-hover': redHover,
          'red-active': redActive,
        },
        navItem: {
          hover: steelBlue,
          active: white,
        },
        overlay: '#687a95',
      },
      backgroundImage: {
        burger: 'linear-gradient(315deg, #78D6EF 0%, #3879B6 100%)',
        boardAside: blueCrayolaToDeepBlue,
        'burger-tablet': 'linear-gradient(315deg, #3879B6 0%, #78D6EF 100%)',
        'header-gradient': blueCrayolaToDeepBlue,
        btnPrimaryGradient: 'linear-gradient(135deg, #78D6EF 0%, #3879B6 40%,#0C6399 65%, #60ADF3 100%)',
        btnActiveGradient: 'linear-gradient(135deg, #0C6399 0%, #0C6399 100%)',
        bgAuthGradient: 'linear-gradient(90.36deg, #cfedf8 0.31%, #ffffff 25.15%, #FFFFFF 74.85%, #cfeef7 99.69%)',
        bgAuthLinks: 'linear-gradient(135deg, #78D6EF 0%, #3879B6 100%)',
        outlineBlueBtnText: 'linear-gradient(135deg, #0c6399 0%, #60adf3 50%, #61b6db 100%)',
      },
      boxShadow: {
        btn: { inset: 'inset 0px 0px 5px 2px rgba(0,0,0,0.1)' },
        auth: '0px 0px 10px 4px rgba(0, 0, 0, 0.05)',
        circle: '0px 0px 3px 0px rgba(0, 0, 0, 0.13)',
        dashboard: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        buttonAside: '0px 0px 3px 2px rgba(97, 182, 219, 0.4)',
        switcher: '0px 0px 4px 0px rgba(0, 0, 0, 0.16)',
        employeeCard: ` 0px 0px 3px 1px #65657540`,
        innerBg: '0px 0px 10px 4px rgba(0, 0, 0, 0.05)',
      },
      backgroundSize: {
        200: '201%',
        150: '150%',
      },
      borderRadius: {
        50: '50px',
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        scada: ['var(--font-scada)', 'sans-serif'],
        robotoCondensed: ['var(--font-robotoCondensed)', 'sans-serif'],
      },
      screens: {
        //  @media (min-width: 768px)
        tablet: `${media.tablet}px`,
        //  @media (min-width: 992px)
        laptop: `${media.laptop}px`,
        //  @media (min-width: 1440px)
        desktop: `${media.desktop}px`,
        //  @media (min-width: 1919px)
        desktopXl: `${media.desktopXL}px`,
      },
      dropShadow: {
        logo: ['4px 2px 2px rgba(0, 0, 0, 0.25)', '-4px -2px 3px rgba(0, 0, 0, 0.15)'],
      },
      gridTemplateColumns: {
        tableRequests: 'minmax(170px, auto) 120px 74px 106px 154px',
        tableOrganization: 'minmax(170px, auto) 120px 74px 106px 252px',
      },
      transitionProperty: {
        rounded: 'border-radius',
      },
      keyframes: {
        appearBg: {
          '0%': { opacity: '0' },
          '100%': {
            background: 'linear-gradient(135deg, #78D6EF 0%, #3879B6 100%)',
            opacity: '1',
          },
        },
        appearanceOverlay: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        disappearanceOverlay: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        appearanceModal: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        disappearanceModal: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
      animation: {
        portalOpen: 'appearanceOverlay ease-in-out forwards',
        portalClose: 'disappearanceOverlay ease-in-out forwards',
        modalOpen: 'appearanceModal ease-in-out forwards',
        modalClose: 'disappearanceModal ease-in-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
