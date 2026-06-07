import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["react-icons", "framer-motion"]
  }
};

export default nextConfig;
