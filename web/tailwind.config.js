module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    minWidth: {
      screen: "100vw",
      max: "max-content",
    },
    maxWidth: {
      100: "100%",
      min: "min-content",
    },
    fontFamily: {
      oswald: ["Oswald"],
      mono: ["monospace"],
    },
    fontSize: {
      xxs: "0.6rem",
      xs: ".75rem",
      sm: ".875rem",
      tiny: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    extend: {},
  },
  plugins: [],
};
