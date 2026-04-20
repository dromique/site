import type { NextConfig } from "next";

const manualDeploymentBasePath = "/s4/portfolio";
const deploymentBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? manualDeploymentBasePath : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: deploymentBasePath === "/" ? undefined : deploymentBasePath,
  assetPrefix: deploymentBasePath === "/" ? undefined : deploymentBasePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: deploymentBasePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
