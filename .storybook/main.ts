import custom from "../webpack.config.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-pseudo-states",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config) => {
    const { module = {}, plugins = [], resolve } = config;
    //过滤掉默认的 css 处理，如果不进行过滤，则会导致有两个对于 css 的处理，其会导致报错
    const rules =
      module.rules?.filter((ruleObject) => {
        const test = typeof ruleObject === "string" ? null : ruleObject.test;
        if (test == null) return true;
        if (test.toString().includes(".css$")) return false;
        return true;
      }) || [];
    return {
      ...config,
      resolve: {
        ...resolve,
        alias: {
          ...(resolve?.alias || {}),
          ...custom.resolve.alias,
        },
        extensions: [
          ...(resolve?.extensions || []),
          ...custom.resolve.extensions,
        ],
      },
      module: {
        ...module,
        rules: [...rules, ...custom.module.rules],
      },
      plugins: plugins.concat(
        new MiniCssExtractPlugin({
          filename: "index.css",
        })
      ),
    };
  },
};

export default config;
