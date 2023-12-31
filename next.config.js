/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
          },
          {
            protocol: 'https',
            hostname: '*.public.blob.vercel-storage.com',
          },
        ],
      },
}

module.exports = nextConfig
