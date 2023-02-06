import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import webpack from '@cypress/webpack-preprocessor';

import { webpackConfig } from './webpack.config';

export const setupProcessorsAndPlugins: Cypress.ResolvedConfigOptions['setupNodeEvents'] = async (on, config) => {
  await addCucumberPreprocessorPlugin(on, config);

  on('task', {
    // ONLY FOR DEBUG PURPOSE
    displayLog: (log: string) => {
      console.log(log);
      return true;
    }
  });

  // use a Webpack loader to process feature files (cucumber's files)
  const options = {
    webpackOptions: webpackConfig(config)
  };
  on('file:preprocessor', webpack(options));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
};
