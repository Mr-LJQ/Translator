export default {
  "**/*.ts?(x)": (filenames) => {
    let filenamesSpace = filenames.join(" ");
    return [
      `eslint --fix ${filenamesSpace}`,
      `prettier --write ${filenamesSpace}`,
      `jest --bail --findRelatedTests ${filenamesSpace}`,
      "tsc --noEmit",
    ];
  },
  "src/**/*.js?(x)": [
    "eslint --fix",
    "prettier --write",
    "jest --bail --findRelatedTests",
  ],
  "src/**/*.!({js,jsx,ts,tsx})": "prettier --write --ignore-unknown",
};
