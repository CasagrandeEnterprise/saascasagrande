/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";
import { loadRootEnv } from "../../packages/auth/src/load-root-env.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

loadRootEnv(__dirname);

/**
 * Rewrites só para desenvolvimento local (3 processos nas portas 3000/3001/3002).
 * Em produção o ideal é um único deploy / um único domínio — sem ORIGIN externos.
 * Se DONA_LU_ORIGIN / ALLATIVA_ORIGIN estiverem definidos, usamos (avançado).
 */
const isProd = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const donaLuOrigin = process.env.DONA_LU_ORIGIN?.trim();
const allativaOrigin = process.env.ALLATIVA_ORIGIN?.trim();

const nextConfig = {
  transpilePackages: ["@casagrande/auth"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
  async rewrites() {
    // Produção sem origins: sem proxy externo (mesmo host / estrutura única).
    if (isProd && !donaLuOrigin && !allativaOrigin) {
      return [];
    }

    const dona = donaLuOrigin || "http://localhost:3001";
    const alla = allativaOrigin || "http://localhost:3002";

    return [
      { source: "/dona-lu", destination: `${dona}/dona-lu` },
      { source: "/dona-lu/:path*", destination: `${dona}/dona-lu/:path*` },
      { source: "/allativa", destination: `${alla}/allativa` },
      { source: "/allativa/:path*", destination: `${alla}/allativa/:path*` },
    ];
  },
};

export default nextConfig;
