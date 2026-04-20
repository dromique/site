import type { NextConfig } from "next";

const deploymentBasePath = "/s4/portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath: deploymentBasePath,
  assetPrefix: deploymentBasePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: deploymentBasePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
