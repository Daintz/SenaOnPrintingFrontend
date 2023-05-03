const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      lgm: { max: "1023px" },
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
