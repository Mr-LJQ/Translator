const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  target: "web",
  entry: {
    background: "./src/background/index",
    foreground: "./src/foreground/index",
    popup: {
      import: "./src/browserAction/index",
      dependOn: "shared",
    },
    shower: {
      import: "./src/shower/index",
      dependOn: "shared",
    },
    options: {
      import: "./src/options/index",
      dependOn: "shared",
    },
    injectScript:{
      import:"./src/injectScript/index"
    },
    shared: ["react", "react-dom","classnames"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist/"),
    publicPath: "",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".d.ts", ".json"],
  },
  module: {
    rules: [
      // { test: /\.tsx?$/i, exclude: /node_modules/, use: "ts-loader" },
      {
        test: /\.(js|ts)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env",{
                exclude:["@babel/plugin-transform-regenerator"]
              }],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Popup",
      template: "./src/index.html",
      chunks: ["popup", "shared"],
      filename: "popup.html",
    }),
    new HtmlWebpackPlugin({
      title: "Options",
      template: "./src/index.html",
      chunks: ["options", "shared"],
      filename: "options.html",
    }),
    new HtmlWebpackPlugin({
      title: "Shower",
      template: "./src/index.html",
      chunks: ["shower", "shared"],
      filename: "shower.html", //此处必须与"./src/shower/Shower.ts中chrome.runtime.getURL(path)对应"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/public/"),
          to: path.resolve(__dirname, "./dist/"),
        },
      ],
    }),
  ],
};
