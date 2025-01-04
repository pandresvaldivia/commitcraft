import { select, input } from '@inquirer/prompts';

export async function getCommitValues(questions) {
  const answers = new Map();

  for (const question of questions) {
    let answer;

    if (question.type === 'select') {
      answer = await select({
        message: question.description,
        choices: question.options,
      });
    }

    if (question.type === 'input') {
      answer = await input({
        message: question.description,
        required: true,
      });
    }

    answers.set(question.name, answer);
  }

  return answers;
}

export function createCommitMessage(format, answers) {
  let commitMessage = format;

  answers.forEach((value, key) => {
    const regex = new RegExp(`{${key}}`, 'g');

    commitMessage = commitMessage.replace(regex, value);
  });

  return commitMessage;
}
