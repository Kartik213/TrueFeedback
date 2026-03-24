import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  pageExtensions: ["ts", "tsx"],
  outputFileTracingRoot: process.cwd()
};

export default nextConfig;
