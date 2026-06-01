import type { NextConfig } from "next";

// Online ordering destination for the Walthamstow branch. This proxies the
// `/locations/walthamstow/order/*` path to the standalone Next.js app deployed
// from ozrovi1/gunes-walthamstow-order. The standalone app sets basePath to
// `/locations/walthamstow/order`, so paths line up 1:1 — no rewrite stripping.
//
// To switch the destination (e.g. after the first Vercel deploy creates a
// stable production URL or a custom subdomain), set
// WALTHAMSTOW_ORDER_HOST in Vercel env. Until set, the rewrite uses the
// placeholder below and `/locations/walthamstow/order/*` will 404 in prod.
const WALTHAMSTOW_ORDER_HOST =
  process.env.WALTHAMSTOW_ORDER_HOST ||
  "https://gunes-walthamstow-order.vercel.app";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "gunes.estetikatolye.com", pathname: "/**" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/locations/walthamstow/order",
        destination: `${WALTHAMSTOW_ORDER_HOST}/locations/walthamstow/order`,
      },
      {
        source: "/locations/walthamstow/order/:path*",
        destination: `${WALTHAMSTOW_ORDER_HOST}/locations/walthamstow/order/:path*`,
      },
    ];
  },
};

export default nextConfig;
