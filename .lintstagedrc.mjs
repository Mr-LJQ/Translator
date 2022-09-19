export default {
  "src/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write --ignore-unknown",
    "jest --bail --findRelatedTests",
  ],
};
