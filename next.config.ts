import type { NextConfig } from "next";

const deploymentBasePath = process.env.CI === "true" ? "/s4/portfolio" : "/site";
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProduction ? deploymentBasePath : "",
  assetPrefix: isProduction ? deploymentBasePath : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? deploymentBasePath : "",
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
