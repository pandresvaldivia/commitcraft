import path from 'node:path';
import fs from 'node:fs';

/**
 * Loads the configuration file.
 * @returns {Promise<object>} The configuration object.
 */
export async function loadConfig() {
  const configPath = path.resolve(process.cwd(), 'commitcraft.config.js');

  if (!fs.existsSync(configPath)) {
    throw new Error("Configuration file 'commitcraft.config.js' not found.");
  }

  try {
    const config = await readConfigFile(configPath);
    return config;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

/**
 * Reads the configuration file content.
 * @param {string} path - The configuration file path.
 * @returns {Promise<object>} The configuration object.
 */
async function readConfigFile(path) {
  const module = await import(path);

  if (!module.default) {
    throw new Error('No configuration found in configuration file.');
  }

  return module.default;
}
