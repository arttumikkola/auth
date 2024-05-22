/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bg: "#faeee7",
        headline: "#33272a",
        button: "#ff8ba7",
        hoverbtn: "#f25076",
        paragraph: "#594a4e",
        main: "#fffffe",
        secondary: "#ffc6c7",
        tertiary: "#c3f0ca",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
