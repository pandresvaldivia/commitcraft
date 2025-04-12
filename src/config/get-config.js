import { readFileSync } from 'node:fs';
import stripBom from 'strip-bom';
import { isUtf8 } from 'node:buffer';
import { CONFIG_FILES } from '../constants/config.constant.js';
import { findConfigFile } from './find-config.js';
import { isJsFile, isJsonFile } from '../helpers/file.helper.js';
import { isArrayEmpty } from '../helpers/array.helper.js';

/**
 * Loads the configuration file.
 * @returns {Promise<object>} The configuration object.
 * @throws {Error} When config file is missing, invalid, or can't be loaded
 */
export async function loadConfig() {
  const configDirectory = process.cwd();
  const configPath = findConfigFile(configDirectory, CONFIG_FILES);

  if (!configPath) {
    throw new Error(
      `Configuration file not found at: ${configDirectory}.\n` +
        `Expected one of these files:\n` +
        CONFIG_FILES.join('\n')
    );
  }

  try {
    const config = await getConfigContent(configPath, isJsFile(configPath));
    return config;
  } catch (error) {
    throw new Error(`Failed to load configuration:\n${error.message}`);
  }
}

/**
 * Gets the configuration content from either JS or JSON file
 * @param {string} path - Path to config file
 * @param {boolean} isJsFile - Whether the file is a JS module
 * @returns {Promise<object>} Parsed configuration object
 * @throws {Error} When config content is invalid or missing
 */
async function getConfigContent(path, isJsFile = false) {
  try {
    if (isJsFile) {
      const module = await import(path);

      if (!module.default) {
        throw new Error(
          `JavaScript configuration file must export the configuration object.\n` +
            `Found: ${typeof module.default}`
        );
      }

      return module.default;
    }

    if (isJsonFile(path)) {
      const json = await import(path, {
        with: { type: 'json' },
      });

      if (isArrayEmpty(Object.keys(json.default))) {
        throw new Error('JSON configuration is empty.');
      }

      return json.default;
    }

    const jsonString = readConfigFileContent(path);
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(`Invalid configuration file (${path}):\n${error.message}`);
  }
}

/**
 * Reads and validates a text configuration file
 * @param {string} path - Path to config file
 * @returns {string} File content
 * @throws {Error} When file is not UTF-8 or can't be read
 */
function readConfigFileContent(path) {
  const rawBufContent = readFileSync(path);

  if (!isUtf8(rawBufContent)) {
    throw new Error(
      `Configuration file error: The file at "${path}" is not UTF-8 encoded.\n` +
        `Non-UTF-8 files may contain unreadable characters or be corrupted.`
    );
  }

  return stripBom(rawBufContent.toString());
}
