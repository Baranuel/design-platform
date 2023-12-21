/** @type {import('next').NextConfig} */
const nextConfig = {

  // logging: {
  //   fetches: {
  //     fullUrl: false,
  //   },
  // },
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
