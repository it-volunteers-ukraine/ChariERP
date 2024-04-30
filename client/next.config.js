/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './src/i18n.ts',
);

const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = withNextIntl(nextConfig);
