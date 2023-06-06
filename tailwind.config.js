const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      lgm: { max: "1023px" },
      ...defaultTheme.screens,
      mdm: { max: "877px" },
      ...defaultTheme.screens,
      clm: { max: "540px" },
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
