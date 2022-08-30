import { defineConfig } from 'cypress';
import { rmSync } from 'fs';

export default defineConfig({
  chromeWebSecurity: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/results/output.xml',
  },
  viewportWidth: 1920,
  viewportHeight: 1200,
  videoCompression: false,
  e2e: {
    setupNodeEvents(on) {
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === 'failed'),
          );
          if (!failures) {
            return rmSync(results.video);
          }
        }
        return false;
      });
    },
    baseUrl: 'http://localhost:3000',
  },
});
