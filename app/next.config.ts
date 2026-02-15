import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arweave.net',
      },
      {
        protocol: 'https',
        hostname: '**.ipfs.w3s.link',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Experimental features
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      '@solana/web3.js',
      '@solana/wallet-adapter-react',
      '@solana/wallet-adapter-wallets',
      'react-icons',
      'posthog-js',
    ],
  },

  // Turbopack config (Next.js 16+ uses Turbopack by default)
  turbopack: {},

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Ignore problematic modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Tree shake unused code
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
      };
    }

    return config;
  },
};

// Apply bundle analyzer
let config = withBundleAnalyzer(nextConfig);

// Apply Sentry (only if DSN and org/project are configured)
const sentryOrg = process.env.SENTRY_ORG;
const sentryProject = process.env.SENTRY_PROJECT;
if (process.env.NEXT_PUBLIC_SENTRY_DSN && sentryOrg && sentryProject) {
  config = withSentryConfig(config, {
    // Sentry organization and project
    org: sentryOrg,
    project: sentryProject,

    // Suppress logs
    silent: !process.env.CI,

    // Upload source maps
    widenClientFileUpload: true,

    // Route browser requests through Next.js
    tunnelRoute: '/monitoring',

    // Disable logger in edge
    disableLogger: true,

    // Auto-instrument
    automaticVercelMonitors: true,
  });
}

export default config;
