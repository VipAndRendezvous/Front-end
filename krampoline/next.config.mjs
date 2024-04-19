import { truncateSync } from "fs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["k.kakaocdn.net", "t1.kakaocdn.net"],
    unoptimized: true,
  },
  reactStrictMode: false,
  output: "standalone",
};

export default nextConfig;
