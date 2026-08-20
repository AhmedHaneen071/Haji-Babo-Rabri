/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    useWasmBinary: true,
  },
};

module.exports = nextConfig;