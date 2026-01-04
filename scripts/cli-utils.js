#!/usr/bin/env node

/**
 * Shared utility for parsing and validating command line arguments
 * Used across build.js, load-env.js, and start.js scripts
 */

const VALID_ENVS = ['dev', 'qa', 'staging', 'prod'];
const VALID_PLATFORMS = ['android', 'ios'];

/**
 * Parse and validate environment argument from command line
 * @param {string} defaultValue - Default environment if not provided (default: 'dev')
 * @returns {string} - Validated environment value
 */
function parseEnv(defaultValue = VALID_ENVS[0]) {
  if(VALID_ENVS.length === 0){
    console.error(`VALID_ENVS are empty`);
    process.exit(1);
  }
  const args = process.argv.slice(2);
  const envIndex = args.indexOf('--env');
  const env = envIndex !== -1 && args[envIndex + 1] ? args[envIndex + 1] : defaultValue;

  if (!VALID_ENVS.includes(env)) {
    console.error(`Invalid environment: ${env}. Must be one of: ${VALID_ENVS.join(', ')}`);
    process.exit(1);
  }

  return env;
}

/**
 * Parse and validate platform argument from command line
 * @param {string} defaultValue - Default platform if not provided (default: 'ios')
 * @returns {string} - Validated platform value
 */
function parsePlatform(defaultValue = 'ios') {
  const args = process.argv.slice(2);
  const platformIndex = args.indexOf('--platform');
  const platform = platformIndex !== -1 && args[platformIndex + 1] ? args[platformIndex + 1] : defaultValue;

  if (!VALID_PLATFORMS.includes(platform)) {
    console.error(`Invalid platform: ${platform}. Must be one of: ${VALID_PLATFORMS.join(', ')}`);
    process.exit(1);
  }

  return platform;
}

module.exports = {
  parseEnv,
  parsePlatform,
  VALID_ENVS,
  VALID_PLATFORMS
};

