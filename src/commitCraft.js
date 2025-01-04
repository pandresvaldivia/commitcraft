import {
  createCommitMessage,
  getCommitValues,
} from './commit/commitMessage.js';
import { loadConfig } from './config/getConfig.js';
import { isArrayEmpty } from './helpers/array.helper.js';

export async function init() {
  let config;

  try {
    config = await loadConfig();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  if (isArrayEmpty(config.questions)) {
    console.error('No questions found in configuration file.');
    process.exit(1);
  }

  if (!config.format) {
    console.error('No format found in configuration file.');
    process.exit(1);
  }

  const { questions, format } = config;

  const answers = await getCommitValues(questions);

  const message = createCommitMessage(format, answers);

  console.log(message);
}
