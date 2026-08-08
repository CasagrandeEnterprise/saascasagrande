import { cpSync, existsSync, rmSync, symlinkSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

/**
 * Build do portal + espelha `.next` na raiz do monorepo.
 * Necessário quando a Vercel usa Root Directory = "." (espera `/vercel/path0/.next`).
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const portalNext = join(root, "apps", "portal", ".next");
const rootNext = join(root, ".next");

execSync("npm run build -w @casagrande/portal", {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

if (!existsSync(join(portalNext, "routes-manifest.json"))) {
  console.error(
    "Build do portal não gerou apps/portal/.next/routes-manifest.json"
  );
  process.exit(1);
}

rmSync(rootNext, { recursive: true, force: true });

try {
  symlinkSync(portalNext, rootNext, "junction");
  console.log("Linked .next -> apps/portal/.next");
} catch {
  mkdirSync(dirname(rootNext), { recursive: true });
  cpSync(portalNext, rootNext, { recursive: true });
  console.log("Copied apps/portal/.next -> .next");
}
