import { loadConfig } from '../config/get-config.js';

/**
 * Initializes and boots the application with configuration
 * @returns {Promise<void>}
 * @throws {Error} When configuration loading fails
 */
export async function bootstrap() {
  try {
    const config = await loadConfig();

    if (Object.keys(config).length === 0) {
      throw new Error(
        'Configuration loaded but appears to be empty or invalid'
      );
    }
    console.log(config);
    process.exit(0);
  } catch (error) {
    console.error(
      error.message +
        '\n\nTroubleshooting:' +
        '\n- Have you created a configuration file?' +
        '\n- Run "cmt init" to create default config'
    );
    process.exit(1);
  }
}
