import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Cache optimized images for 1 hour in production, disable in dev for immediate updates
    minimumCacheTTL: process.env.NODE_ENV === 'development' ? 0 : 3600,
  },
};

export default nextConfig;
