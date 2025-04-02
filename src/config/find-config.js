import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export function findConfigFile(directory, filanames) {
  for (const filename of filanames) {
    const configFile = resolve(directory, filename);

    if (existsSync(configFile)) return configFile;
  }

  return null;
}
