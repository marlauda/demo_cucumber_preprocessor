export const webpackConfig = (pluginConfig: Cypress.PluginConfigOptions): {} => {
  return {
    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        fs: false,
        child_process: false,
        readline: false,
        path: false,
        util: false
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.feature$/,
          use: [
            {
              loader: '@badeball/cypress-cucumber-preprocessor/webpack',
              options: pluginConfig
            }
          ]
        }
      ]
    }
  };
};
