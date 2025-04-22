import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'], // 외부 이미지 도메인 허용
  },
};

export default nextConfig;
