/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./data/**/*.json",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
      colors: {
        primary: "#1B53FE",
        secondary: "#AEAEAE",
        "app-black": "#222222",
        "app-grey": "#f7f6fb",
        "app-border": "#AEAEAE",
      },
    },
  },
  plugins: [],
};
