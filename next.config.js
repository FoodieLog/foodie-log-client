/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    // loader: "custom",
    // loaderFile: "./my/image/loader.js",
    // unoptimized: true,

    domains: ["https://foodielog-bucket.s3.ap-northeast-2.amazonaws.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "foodie-log-bucket.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "foodielog-bucket.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        // 후에 설명할 리소스 쿼리입니다.
        resourceQuery: { not: /components/ },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /components/,
        use: ["@svgr/webpack"],
      }
    );
    return config;
  },
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
