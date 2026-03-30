import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "gunes.estetikatolye.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
