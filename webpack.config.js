const path = require("path");

module.exports = {
  mode: "development",
  target: "web",
  entry: {
    background: "./src/background/index.ts",
    foreground: "./src/foreground/index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist/"),
    publicPath:""
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/i, use: "ts-loader" },
      {
        test:/\.html$/i,
        type:"asset/resource",
        generator: {
          filename: 'display.html'
        }
      }
    ],
  }
};
