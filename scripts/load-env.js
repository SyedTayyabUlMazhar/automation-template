const fs = require('fs');
const dotenv = require('dotenv');
const { execSync } = require('child_process');
const { parseEnv, parsePlatform } = require('./cli-utils');

// Parse and validate environment argument
const env = parseEnv();

const envFile = `.env.${env}`;
/**
 * Load environment specific env (such as .env.dev) into .env file.
 * .env is read by expo, and it's values can be read using process.env.EXPO_PUBLIC_ format
 * 
 * 
 */
dotenv.config({ path: envFile });

if (!fs.existsSync(envFile)) {
  console.error(`Environment file not found: ${envFile}`);
  process.exit(1);
}

/**
 */
fs.copyFileSync(envFile, './.env');

console.log(`Loaded environment: ${envFile}`);

// Check if platform is provided, if so run prebuild
const args = process.argv.slice(2);
const platformIndex = args.indexOf('--platform');
if (platformIndex !== -1 && args[platformIndex + 1]) {
  const platform = parsePlatform();
  console.log(`Running prebuild for platform: ${platform}`);
  execSync(`npx expo prebuild --platform ${platform}`, { stdio: "inherit" });
}
