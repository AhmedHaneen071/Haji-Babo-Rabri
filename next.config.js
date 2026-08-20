/** @type {import('next').NextConfig} */
const ghBasePath = process.env.GH_PAGES_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  ...(ghBasePath
    ? { basePath: ghBasePath, assetPrefix: `${ghBasePath}/` }
    : {}),
  images: {
    unoptimized: true,
  },
  experimental: {
    useWasmBinary: true,
  },
};

module.exports = nextConfig;