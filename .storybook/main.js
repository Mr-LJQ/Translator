const custom = require("../webpack.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    '@storybook/addon-a11y',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-pseudo-states",
  ],
  core: {
    builder: "webpack5",
    options: {
      fsCache: true,
      lazyCompilation: true,
    },
  },
  features: {
    interactionsDebugger: true,
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ["postcss-loader"],
    });
    return {
      ...config,
      resolve: { ...config.resolve, ...custom.resolve },
      module: { rules: custom.module.rules },
      plugins: config.plugins.concat(
        new MiniCssExtractPlugin({
          filename: "index.css",
        })
      ),
    };
  },
  framework: "@storybook/react",
};
