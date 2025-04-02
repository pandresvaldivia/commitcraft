## Config example:

```js
export default {
  format: '{type}({scope}): {message}',
  questions: [
    {
      name: 'type',
      description: "Select the type of change that you're committing:",
      type: 'select',
      options: [
        {
          name: 'feat',
          value: 'feat',
          description: 'A new feature',
        },
        {
          name: 'fix',
          value: 'fix',
          description: 'A bug fix',
        },
        {
          name: 'docs',
          value: 'docs',
          description: 'Documentation changes',
        },
        {
          name: 'style',
          value: 'style',
          description: 'Code style changes (formatting, no logic changes)',
        },
        {
          name: 'refactor',
          value: 'refactor',
          description: 'Code refactoring',
        },
        {
          name: 'test',
          value: 'test',
          description: 'Adding or fixing tests',
        },
      ],
    },
    {
      name: 'scope',
      description:
        'What is the scope of this change (e.g. component or file name):',
      type: 'select',
      options: ['frontend', 'backend', 'docs', 'infra'],
    },
    {
      name: 'message',
      description: 'Write a short, imperative tense description of the change:',
      type: 'input',
    },
  ],
};
```
