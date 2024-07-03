import { truncateSync } from "fs";

/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack5: true,
  webpack: (config, options) => {
    config.cache = false;
    return config;
  },
  images: {
    domains: [
      "k.kakaocdn.net",
      "t1.kakaocdn.net",
      "varwonimgbucket.s3.ap-northeast-2.amazonaws.com",
    ],
    unoptimized: true,
  },
  reactStrictMode: false,
  output: "standalone",
};

export default nextConfig;
