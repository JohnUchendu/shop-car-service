/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable React Query for Server Components
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
}

module.exports = nextConfig