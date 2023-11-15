/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org/wikipedia/commons/f/f5/Typescript.svg',
      },
    ],
  },
};

module.exports = nextConfig;
