module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#030E50",
        secondary: "#3E69DF",
        red: "#F55858",
        green: "#08BD46",
      },
      fontFamily: {
        primary: ["Metropolis", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
