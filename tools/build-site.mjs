import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = join(projectRoot, "dist");
const clientRoot = join(distRoot, "client");
const serverRoot = join(distRoot, "server");

await rm(distRoot, { recursive: true, force: true });
await Promise.all([
  mkdir(clientRoot, { recursive: true }),
  mkdir(serverRoot, { recursive: true }),
]);

await Promise.all([
  cp(join(projectRoot, "index.html"), join(clientRoot, "index.html")),
  cp(join(projectRoot, "assets"), join(clientRoot, "assets"), {
    recursive: true,
  }),
  cp(join(projectRoot, "worker", "index.js"), join(serverRoot, "index.js")),
]);

console.log("Sites build created in dist/");
