import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // INI DIA KUNCI JAWABANNYA: Ngizinin Next.js nampilin gambar dari localhost
    dangerouslyAllowLocalIP: true, 
    
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;