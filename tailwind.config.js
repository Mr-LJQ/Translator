const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          loveEye: "#c7edcc",
          light: "#4CAF50",
          dark: "#45a049",
          viridity: "#76ff03",
        },
        blue: {
          gray: "#607d8b",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant("prior", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`prior${separator}${className}`)}`.repeat(2);
        });
      });
    }),
  ],
};
