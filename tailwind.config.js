const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      lgm: { max: "1023px" },
      mdm: { max: "877px" },
      clm: { max: "540px" },
      '1md': { max: "480px" },
      '2md': { max: "768px" },
      '3md': { max: "1024px" },
      '4md': { max: "1536px" },
      'sidebarMD': { min: "640px" },
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        'custom-blue': {
          DEFAULT: 'rgb(0, 49, 77)',
          lighter: 'rgba(0, 49, 77, 0.7)',
        },
        'custom-green': 'rgb(57, 169, 0)',
      },
    },
  },
  plugins: [],
};
