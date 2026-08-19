/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Haji-Babo-Rabri',
  assetPrefix: '/Haji-Babo-Rabri/',
  images: {
    unoptimized: true,
  },
  experimental: {
    useWasmBinary: true,
  },
};

module.exports = nextConfig;