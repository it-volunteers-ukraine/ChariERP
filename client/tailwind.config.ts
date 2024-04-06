import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultConfig');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      ...defaultTheme,
      backgroundImage: {
        'btn-primary':
          'linear-gradient(135deg, #78D6EF 0%, #3879B6 50%, #0C6399 75%,  #0C6399 100% )',
        'btn-primary-hover':
          'linear-gradient(135deg, #0C6399 0%, #60ADF3 100%)',
      },
      backgroundSize: {
        200: '200%',
      },
      backgroundPosition: {
        top: 'top',
        bottom: 'bottom',
      },
    },
  },
  plugins: [],
};
export default config;
