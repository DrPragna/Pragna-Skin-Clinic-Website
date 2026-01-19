import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Disable caching for development - images update immediately
    minimumCacheTTL: 0,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.pragnaskinclinic.com',
          },
        ],
        destination: 'https://pragnaskinclinic.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
