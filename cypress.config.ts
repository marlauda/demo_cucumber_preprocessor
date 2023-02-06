import { defineConfig } from 'cypress';

import { setupProcessorsAndPlugins } from './cypress/plugins/setup-processors-and-plugins.method';

export default defineConfig({
  retries: {
    runMode: 1
  },

  video: false,

  e2e: {
    supportFile: 'cypress/support/index.ts',
    specPattern: 'cypress/integration/**/*.feature',

    setupNodeEvents: setupProcessorsAndPlugins
  }
});
