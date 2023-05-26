/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors : {
        primary: "rgba(221, 176, 91, 0.7)"
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight: false,
  }
}