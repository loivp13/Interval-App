module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], //remove unused css styles *tree shaking*
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    fontFamily: {
      quicksand: ["Quicksand", "sans-serif;"],
      openSans: ["Open Sans", "sans-serif"],
    },
    colors: {
      "th-primary": "var(--th-primary)",
      "th-secondary": "var(--th-secondary)",
      "th-white": "var(--th-white)",
      "th-linkText": "var(--th-linkText)",
      "th-overlay": "var(--th-overlay)",
      "th-error": "var(--th-error)",
      "th-shadow": "var(--th-shadow)",
    },
  },
};
