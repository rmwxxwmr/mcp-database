import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

interface PackageMetadata {
  name?: string;
  version?: string;
}

const currentDir = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = resolve(currentDir, "../package.json");
const packageMetadata = JSON.parse(readFileSync(packageJsonPath, "utf8")) as PackageMetadata;

export const SERVICE_NAME = packageMetadata.name ?? "mcp-database-service";
export const SERVICE_VERSION = packageMetadata.version ?? "0.0.0";
