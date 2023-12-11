/** @type {import('next').NextConfig} */
const nextConfig = {
  strictMode:false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
          },
        ],
      },
}

module.exports = nextConfig
