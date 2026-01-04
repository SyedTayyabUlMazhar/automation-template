#!/usr/bin/env node

const { execSync } = require('child_process');
const { parseEnv } = require('./cli-utils');

// Parse and validate environment argument
const env = parseEnv();

console.log(`Starting with environment: ${env}`);

// Execute commands sequentially for better cross-platform compatibility
try {
  execSync(`node scripts/load-env.js --env ${env}`, { 
    stdio: "inherit",
    shell: true  // Explicitly use shell for cross-platform compatibility
  });
  
  execSync(`npx expo start`, { 
    stdio: "inherit",
    shell: true
  });
} catch (error) {
  process.exit(error.status || 1);
}
