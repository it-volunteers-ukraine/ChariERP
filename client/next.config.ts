/** @type {import('next').NextConfig} */

import next_intl from 'next-intl/plugin';
import { NextConfig } from 'next';

const withNextIntl = next_intl('./src/i18n.ts');

process.env.TZ = 'Europe/Kyiv';

const nextConfig: NextConfig = {
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tildacdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  webpack(config, { isServer }) {
    // Basic Node.js fallbacks for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        os: false,
        path: false,
      };
    }

    // Modify SVG handling to use @svgr/webpack
    const fileLoaderRule = config.module.rules.find((rule: { test: { test: (arg0: string) => never } }) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = withNextIntl(nextConfig);
