#!/usr/bin/env node

const { execSync } = require("child_process");
const { parseEnv, parsePlatform } = require("./cli-utils");

// Parse and validate command line arguments
const env = parseEnv();
const platform = parsePlatform();

console.log(`Building for environment: ${env}, platform: ${platform}`);

// Execute commands sequentially for better cross-platform compatibility
try {
  execSync(`node scripts/load-env.js --env ${env} --platform ${platform}`, {
    stdio: "inherit",
    shell: true, // Explicitly use shell for cross-platform compatibility
  });

  let extraArgs = "";
  if (platform === "ios") {
    extraArgs = "--device";
  }
  execSync(`npx expo run:${platform} ${extraArgs}`, {
    stdio: "inherit",
    shell: true,
  });
} catch (error) {
  process.exit(error.status || 1);
}
