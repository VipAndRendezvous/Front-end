import { truncateSync } from "fs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["k.kakaocdn.net", "t1.kakaocdn.net"],
    unoptimized: true,
  },
  reactStrictMode: false,
  output: "standalone",
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_KAKAO_API_KEY : process.env.NEXT_PUBLIC_KAKAO_API_KEY,
    AWS_S3_BUCKET_REGION:process.env.AWS_S3_BUCKET_REGION,
    AWS_S3_BUCKET_ACCESS_KEY_ID:process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
    AWS_S3_BUCKET_SECRET_ACCESS_KEY:process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,
    NEXT_PUBLIC_WS_PROXY:process.env.NEXT_PUBLIC_WS_PROXY,
  },
};

export default nextConfig;
