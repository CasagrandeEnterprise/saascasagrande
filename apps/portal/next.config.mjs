/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const donaLuOrigin = process.env.DONA_LU_ORIGIN || "http://localhost:3001";
const allativaOrigin = process.env.ALLATIVA_ORIGIN || "http://localhost:3002";

const nextConfig = {
  transpilePackages: ["@casagrande/auth"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
  async rewrites() {
    return [
      {
        source: "/dona-lu",
        destination: `${donaLuOrigin}/dona-lu`,
      },
      {
        source: "/dona-lu/:path*",
        destination: `${donaLuOrigin}/dona-lu/:path*`,
      },
      {
        source: "/allativa",
        destination: `${allativaOrigin}/allativa`,
      },
      {
        source: "/allativa/:path*",
        destination: `${allativaOrigin}/allativa/:path*`,
      },
    ];
  },
};

export default nextConfig;
