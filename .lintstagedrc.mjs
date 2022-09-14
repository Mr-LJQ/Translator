export default {
  "src/**/*.{js,jsx,ts,tsx}": "jest --bail --findRelatedTests",
  "src/**/*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write --ignore-unknown",
  ],
};
