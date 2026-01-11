import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Allow deploying to a subpath or local file system
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : undefined,
  trailingSlash: true, // Optional: creates folder structure /about/index.html
  // Optional: Disable image optimization since it requires server for optimize
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
