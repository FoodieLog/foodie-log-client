/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    // loader : "custom",
    // loaderFile : "./my/image/loader.js"
    // unoptimized: true,

    domains: ["https://foodielog-bucket.s3.ap-northeast-2.amazonaws.com/b65a31fc-9942-4117-9b3c-c8cd674bb88e.jpeg"],

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
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com",
        port: "",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/seed/**",
      },
    ],
  },
};

module.exports = nextConfig;
