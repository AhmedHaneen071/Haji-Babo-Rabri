/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useWasmBinary: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
    ],
  },
};

module.exports = nextConfig;
