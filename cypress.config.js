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
  defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
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
      on('task', {
        log(message) {
          // eslint-disable-next-line no-console
          console.log(message);
          return null;
        },
      });
      // eslint-disable-next-line default-param-last
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push(
            `--proxy-bypass-list=<-loopback>,${
              process.env.CYPRESS_CI === 'true' ? 'firebase' : 'localhost'
            }:8080`,
          );
        }
        return launchOptions;
      });
    },
    baseUrl: 'http://localhost:3000',
    env: {
      EMULATOR_HOST: 'localhost',
      AUTH_EMULATOR_HOST: 'localhost',
    },
  },
});
