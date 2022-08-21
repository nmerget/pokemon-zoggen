/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        56: "56px",
        64: "64px",
      },
      colors: {
        normal: "#BBBBAA",
        fighting: "#BB5544",
        flying: "#6699FF",
        poison: "#AA5599",
        ground: "#DDBB55",
        rock: "#BBAA66",
        bug: "#AABB22",
        ghost: "#6666BB",
        steel: "#AAAABB",
        fire: "#F4563A",
        water: "#3399FF",
        plant: "#77CC55",
        electric: "#FFCC33",
        psycho: "#FF5599",
        ice: "#83D4EF",
        dragon: "#7766EE",
        dark: "#775544",
        fairy: "#FFAAFF",
        unknown: "#1c1c1c",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
