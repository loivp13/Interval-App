module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], //remove unused css styles *tree shaking*
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
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
        "th-needHelp": "var(--th-needHelp)",
        "th-transparent": "#00000000",
      },
      fill: {
        "th-none": "none",
      },
      stroke: {
        "th-none": "none",
      },
    },
  },
};
