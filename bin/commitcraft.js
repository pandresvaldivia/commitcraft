import { bootstrap } from '../src/cli/commitcraft.js';

// Handle ctrl + c manually ofr cross-platform compatibility
process.stdin.on('data', function (key) {
  if (key == '\u0003') {
    // 128 + signal number: 128 + 2 (SIGINT)
    process.exit(130);
  }
});

bootstrap();
