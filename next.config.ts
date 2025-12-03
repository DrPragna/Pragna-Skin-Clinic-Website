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
};

export default nextConfig;
