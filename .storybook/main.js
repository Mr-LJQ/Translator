const custom = require("../webpack.config.js");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  core: {
    builder: "webpack5",
    options: {
      fsCache: true,
      lazyCompilation: true,
    },
  },
  features: {
    storyStoreV7: true,
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ["postcss-loader"],
    });
    return {
      ...config,
      resolve: { ...config.resolve, alias: custom.resolve.alias },
    };
  },
  framework: "@storybook/react",
};
