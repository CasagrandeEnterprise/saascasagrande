import path from "path";
import { fileURLToPath } from "url";
import { loadRootEnv } from "../../packages/auth/src/load-root-env.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

loadRootEnv(__dirname);

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/dona-lu",
  transpilePackages: ["@casagrande/auth"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
  images: {
    /**
     * URLs locais com query string (ex.: /api/file?pathname=...) exigem
     * localPatterns no Next 15+. Sem isso o otimizador rejeita a imagem
     * no painel admin.
     * `search` omitido = qualquer query permitida nesse pathname.
     */
    localPatterns: [
      {
        pathname: "/api/file",
      },
      {
        pathname: "/dona-lu/api/file",
      },
    ],
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
