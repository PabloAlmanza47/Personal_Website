import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    // Use relative path to project root
    root: path.resolve(__dirname),
  },
};

export default nextConfig;