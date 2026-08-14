import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Tetap diizinin buat testing API lokal di laptop
    dangerouslyAllowLocalIP: true, 

    remotePatterns: [
      // 1. Ini yang PALING PENTING buat narik gambar dari Hostinger (Production)
      {
        protocol: 'https',
        hostname: 'api.kikaalsafar.id',
        pathname: '/**',
      },
      // 2. Buat testing API lokal
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
      // 3. Buat gambar dummy / placeholder
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;