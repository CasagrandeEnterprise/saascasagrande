import path from "path";
import { fileURLToPath } from "url";
import { loadRootEnv } from "../../packages/auth/src/load-root-env.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

loadRootEnv(__dirname);

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/allativa",
  transpilePackages: ["@casagrande/auth"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
