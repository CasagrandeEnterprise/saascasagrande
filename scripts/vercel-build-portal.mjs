import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

/**
 * Build do portal e CÓPIA (não symlink) de apps/portal/.next → .next na raiz.
 *
 * A Vercel com Root Directory="." espera /vercel/path0/.next/routes-manifest.json.
 * Symlink quebra o file tracing (resolve para /node_modules/... fora do projeto).
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const portalNext = join(root, "apps", "portal", ".next");
const rootNext = join(root, ".next");

execSync("npm run build -w @casagrande/portal", {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

const manifest = join(portalNext, "routes-manifest.json");
if (!existsSync(manifest)) {
  console.error("Build do portal não gerou apps/portal/.next/routes-manifest.json");
  process.exit(1);
}

rmSync(rootNext, { recursive: true, force: true });
cpSync(portalNext, rootNext, { recursive: true });
console.log("Copied apps/portal/.next -> .next (no symlink)");
