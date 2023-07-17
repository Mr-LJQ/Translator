const path = require("path");
const fs = require("fs");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const manifest = require("./src/manifest.json");
module.exports = {
  target: "web",
  mode: "development",
  devtool: "source-map",
  entry: {
    backendScript: "./src/backend-script/index",
    contentScript: "./src/content-script/index",
    browserAction: {
      import: "./src/browser-action/index",
      dependOn: ["reactVendors"],
    },
    translationPage: {
      import: "./src/translation-page/main",
      dependOn: ["reactVendors"],
    },
    optionsPage: {
      import: "./src/options-page/index",
      dependOn: ["reactVendors"],
    },
    //修改此处需要同时修改 src/backend-script/index.ts 中 executeScript 输入的 URL
    injectScript: {
      import: "./src/inject-script/index",
    },
    reactVendors: ["react", "react-dom", "classnames", "immer"],
  },
  output: {
    filename: () => {
      return "[name].js";
      //if (data.chunk.name === "injectScript") return "[name].js"
      //return "[name].[contenthash].js"
    },
    path: path.resolve(__dirname, "./dist/"),
    clean: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".d.ts", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new HtmlWebpackPlugin({
      title: "Browser Action Page",
      template: "./src/index.html",
      chunks: ["browserAction", "reactVendors"],
      filename: manifest.action.default_popup,
    }),
    new HtmlWebpackPlugin({
      title: "Options Page",
      template: "./src/index.html",
      chunks: ["optionsPage", "reactVendors"],
      filename: manifest.options_ui.page,
    }),
    new HtmlWebpackPlugin({
      title: "Translation Page",
      template: "./src/index.html",
      chunks: ["translationPage", "reactVendors"],
      //修改此处需要同时修改 ./src/content-script/agent.ts 中的 getURL(path)"
      filename: "translationPage.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/public/"),
          to: path.resolve(__dirname, "./dist/"),
        },
      ],
    }),
    new WebpackManifestPlugin({
      publicPath: "./",
      serialize(sourceMap) {
        const manifest = JSON.parse(
          fs.readFileSync(path.join(__dirname, "./src/manifest.json"))
        );
        return JSON.stringify(
          manifest,
          (key, val) => {
            const reg = /\{\{(.+)\}\}/g;
            if (typeof val === "string") {
              return val.replace(reg, (_, name) => {
                return sourceMap[name];
              });
            }
            return val;
          },
          2
        );
      },
    }),
  ],
};
