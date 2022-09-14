module.exports = {
  root: true, //根目录，表明该文件所在目录是eslint向上查找并合并配置文件的终点
  env: {
    node: true,
    es2021: true,
    browser: true,
  },
  overrides: [
    //对于特定匹配的文件应用不同的配置
    {
      files: ["src/**/*.ts", "src/**/*.tsx"], //应用配置的匹配模式
      parser: "@typescript-eslint/parser", //用于解析 ts、tsx文件的解析器
      parserOptions: {
        //传递给解析器的参数
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "react/prop-types": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
      },
      settings: {
        react: {
          version: "detect", // React version. "detect" automatically picks the version you have installed.
        },
      },
    },
  ],
  extends: [
    "eslint:recommended",
    "plugin:jest-dom/recommended",
    "plugin:testing-library/react",
    "prettier",
  ],
  plugins: [
    "react",
    "@typescript-eslint",
    "react-hooks",
    "jest-dom",
    "testing-library",
  ],
  rules: {},
};
