#!/usr/bin/env node

import { loadConfig } from "./config/loadConfig.js";
import { log } from "./core/logger.js";
import { createServer } from "./server/createServer.js";
import { SERVICE_NAME, SERVICE_VERSION } from "./version.js";

function shouldPrintVersion(argv: string[]): boolean {
  return argv.includes("-v") || argv.includes("--version");
}

function printVersion(): void {
  process.stdout.write(`${SERVICE_NAME} ${SERVICE_VERSION}\n`);
}

/**
 * Main entrypoint: load validated config, start the MCP server, and leave all
 * actual database work to per-request lazy adapters.
 */
async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  if (shouldPrintVersion(argv)) {
    printVersion();
    return;
  }

  const config = await loadConfig(argv, process.env);
  await createServer(config);
  log("info", "MCP database server started", {
    databaseCount: config.databases.length
  });
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  log("error", "Failed to start MCP database server", { message });
  process.exitCode = 1;
});
