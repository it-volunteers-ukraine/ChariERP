/** @type {import('next').NextConfig} */

import next_intl from 'next-intl/plugin';
import { NextConfig } from 'next';

const withNextIntl = next_intl('./src/i18n.ts');

process.env.TZ = 'Europe/Kyiv';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    localPatterns: [
      {
        pathname: '/assets/**',
      },
      {
        pathname: '/_next/static/media/**',
      },
      {
        pathname: '/src/assets/icons/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tildacdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
